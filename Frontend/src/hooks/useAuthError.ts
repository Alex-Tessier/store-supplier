import { useEffect, useState } from 'react';

interface AuthErrorEvent extends CustomEvent {
  detail: {
    message: string;
  };
}

export const useAuthError = () => {
  const [authError, setAuthError] = useState<string>('');

  useEffect(() => {
    const handleAuthError = (event: AuthErrorEvent) => {
      setAuthError(event.detail.message);
    };

    window.addEventListener('authError', handleAuthError as EventListener);

    return () => {
      window.removeEventListener('authError', handleAuthError as EventListener);
    };
  }, []);

  const clearAuthError = () => {
    setAuthError('');
  };

  return { authError, clearAuthError };
};

export default useAuthError;
