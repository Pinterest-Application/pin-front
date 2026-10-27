import axios from 'axios';
import { redirect } from 'react-router';
import { BACKEND_URL, getAccessToken, setAccessToken } from '~/libs/auth';

export async function authClientMiddleware(
  _args: { request: Request; context: unknown },
  next: () => Promise<unknown>
): Promise<void> {
  // 1. If an access token already exists, allow navigation
  if (getAccessToken()) {
    await next();
    return;
  }

  // 2. Otherwise, attempt a silent refresh using the HttpOnly cookie
  try {
    const response = await axios.post<{ accessToken?: string; token?: string }>(
      `${BACKEND_URL}/auth/refresh`,
      {},
      { withCredentials: true }
    );

    const token = response.data.accessToken || response.data.token;
    if (!token) {
      throw new Error('No access token returned from refresh endpoint');
    }

    setAccessToken(token);
    await next();
  } catch {
    // 3. Unauthorized: redirect to landing/login
    throw redirect('/');
  }
}
