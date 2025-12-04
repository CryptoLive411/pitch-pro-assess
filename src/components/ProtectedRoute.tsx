import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireStaff?: boolean;
}

export function ProtectedRoute({ children, requireStaff = false }: ProtectedRouteProps) {
  const { user, isLoading, isStaff } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requireStaff && !isStaff) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-300">You don't have permission to access this page.</p>
          <p className="text-gray-400 text-sm mt-4">Contact an administrator to get staff access.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
