export const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8020';

const TOKEN_KEY = 'accessToken';

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeAccessToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
}

export function loginWithGoogle(): void {
  window.location.href = `${BACKEND_URL}/auth/login`;
}

export function logout(): void {
  removeAccessToken();
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
}
