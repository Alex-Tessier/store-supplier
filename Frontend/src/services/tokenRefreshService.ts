import { getStoredTokens } from '../utils/tokenUtils';
import axios from 'axios';

export const refreshAccessToken = async (): Promise<{ accessToken: string, expiresAt: string } | null> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/refreshtoken`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const scheduleTokenRefresh = () => {
  // Refresh token 5 minutes before expiration
  const tokens = getStoredTokens();
  if (tokens.expiresAt) {
    const expirationTime = new Date(tokens.expiresAt).getTime();
    const currentTime = Date.now();
    const timeUntilRefresh = expirationTime - currentTime - (5 * 60 * 1000); // 5 minutes before

    if (timeUntilRefresh > 0) {
      setTimeout(async () => {
        const success = await refreshAccessToken();
        if (success) {
          scheduleTokenRefresh(); // Schedule next refresh
        }
      }, timeUntilRefresh);
    }
  }
};
