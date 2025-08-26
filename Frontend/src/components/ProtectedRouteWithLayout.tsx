import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from './AppContext';
import AuthenticatedLayout from './AuthenticatedLayout';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useApp();

  if (isLoading) {
    return (
      <div className="min-h-screen w-screen bg-white flex items-center justify-center">
        <div className="text-xl">Loading</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AuthenticatedLayout>
      {children}
    </AuthenticatedLayout>
  );
};

export default ProtectedRoute;
