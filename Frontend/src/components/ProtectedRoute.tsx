import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/tokenUtils';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Si l'utilisateur n'est pas connecté ou si le token est expiré, redirige vers login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Si l'utilisateur est connecté et le token est valide, affiche le composant
  return <>{children}</>;
};

export default ProtectedRoute;
