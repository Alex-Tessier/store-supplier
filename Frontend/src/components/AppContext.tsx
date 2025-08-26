import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getUserProfile } from 'services/userService';

interface User {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  userGuid: string;
}

interface AppContextType {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  refreshUserData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserProfile = async () => {
    try {
      const response = await getUserProfile();
      setUser(response.data);
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUserData = async () => {
    setIsLoading(true);
    await loadUserProfile();
    setIsLoading(false);
  };

  useEffect(() => {
    loadUserProfile();
  }, []);


  const value = {
    user,
    isLoading,
    setUser,
    refreshUserData
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
