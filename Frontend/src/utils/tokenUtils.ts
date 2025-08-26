import type { LoginResponse } from '../types/auth';

export interface DecodedToken {
  sub: string;
  email: string;
  jti: string;
  UserGuid: string;
  iss: string;
  aud: string;
  exp: number;
  iat: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

export const getTokenExpirationTime = (token: string): Date | null => {
  const decoded = decodeToken(token);
  if (!decoded) return null;

  return new Date(decoded.exp * 1000);
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('accessToken');
  if (!token) return false;
  
  return !isTokenExpired(token);
};

export const saveTokens = (loginResponse: LoginResponse): void => {
  localStorage.setItem('accessToken', loginResponse.accessToken);
  localStorage.setItem('tokenExpiresAt', loginResponse.expiresAt);
};

export const getStoredTokens = () => {
  return {
    accessToken: localStorage.getItem('accessToken'),
    expiresAt: localStorage.getItem('tokenExpiresAt')
  };
};

export const clearTokens = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('tokenExpiresAt');
};

export const logout = async (): Promise<void> => {
  clearTokens();

  if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
    window.location.href = '/login';
    return;
  }
};
