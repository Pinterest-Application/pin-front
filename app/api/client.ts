import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { BACKEND_URL, getAccessToken, logout, setAccessToken } from '~/libs/auth';

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function toApiError(error: unknown, fallbackMessage: string): ApiError {
  if (axios.isAxiosError(error)) {
    const message = (error.response?.data as { message?: string } | undefined)?.message ?? fallbackMessage;

    return new ApiError(message, error.response?.status);
  }

  return new ApiError(fallbackMessage);
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface QueuedPromise {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

interface RefreshResponse {
  accessToken?: string;
  token?: string;
}

let isRefreshing = false;
let failedQueue: QueuedPromise[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

export const apiClient = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach bearer token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401s and token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined;

    if (!originalRequest || !error.response) {
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      // Prevent loop if the refresh endpoint itself failed with 401
      if (originalRequest.url?.includes('/auth/refresh')) {
        logout();
        return Promise.reject(error);
      }

      // If already retried, do not retry again
      if (originalRequest._retry) {
        logout();
        return Promise.reject(error);
      }

      // If a refresh is already in flight, queue this request
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Direct call to refresh endpoint using base axios instance with credentials
        const response = await axios.post<RefreshResponse>(
          `${BACKEND_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken || response.data.token;

        if (!newAccessToken) {
          throw new Error('No access token returned from refresh endpoint');
        }

        setAccessToken(newAccessToken);

        // Update default Authorization header for subsequent requests
        apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        // Process all queued requests
        processQueue(null, newAccessToken);

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
