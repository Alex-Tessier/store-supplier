import axios from 'axios';
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig  } from 'axios';
import { getStoredTokens, saveTokens, clearTokens } from '../utils/tokenUtils';
import { refreshAccessToken } from 'services/tokenRefreshService';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const handleAuthFailure = () => {
  clearTokens();
  
  if (window.location.pathname === '/login' || window.location.pathname === '/register') {
    return;
  }

  window.location.href = '/login';
};

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    async (config: CustomAxiosRequestConfig) => {
      const tokens = getStoredTokens();
      
      if (tokens.accessToken && !config.url?.includes('/auth/login')) {
        config.headers.Authorization = `Bearer ${tokens.accessToken}`;
      }
      
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;
      

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshResult = await refreshAccessToken();
          if (refreshResult && refreshResult.accessToken) {
            saveTokens({
              accessToken: refreshResult.accessToken,
              expiresAt: refreshResult.expiresAt
            });
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${refreshResult.accessToken}`;
            }
            return instance(originalRequest);
          } else {
            handleAuthFailure();
            return Promise.reject(new Error('Session expired please login again.'));
          }
        } catch (refreshError) {
          handleAuthFailure();
          return Promise.reject(new Error('Session expired please login again.'));
        }
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

export const axiosInstance = createAxiosInstance();