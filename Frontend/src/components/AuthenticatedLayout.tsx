import React from 'react';
import type { ReactNode } from 'react';
import { useApp } from 'components/AppContext';
import { logout } from 'utils/tokenUtils';

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  const { user } = useApp();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen w-screen bg-white flex">
      <nav className="bg-gray-800 text-white w-64 p-4 flex-shrink-0">
        <ul className="space-y-2">
          <li>
            <a href="/settings" className="block px-4 py-2 rounded hover:bg-gray-700">
              Settings
            </a>
          </li>
        </ul>
      </nav>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm border-b flex-shrink-0">
          <div className="flex justify-between items-center h-16 px-4">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">AppTitle</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {user && (
                <div className="text-sm text-gray-700">
                  {user.firstName} {user.lastName}
                </div>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;