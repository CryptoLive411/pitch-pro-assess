import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Clock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ventureLogo from '@/assets/venture-logo-white.png';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireStaff?: boolean;
}

export function ProtectedRoute({ children, requireStaff = false }: ProtectedRouteProps) {
  const { user, isLoading, isStaff, signOut } = useAuth();

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="text-center text-white max-w-md">
          <img src={ventureLogo} alt="Venture Sports" className="h-16 mx-auto mb-6 bg-slate-800 rounded-lg p-2" />
          <div className="bg-slate-800/50 rounded-xl p-8 backdrop-blur border border-slate-700">
            <Clock className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Pending Approval</h1>
            <p className="text-gray-300 mb-2">Your account is awaiting admin approval.</p>
            <p className="text-gray-400 text-sm mb-6">
              Please wait for an administrator to grant you access to the assessment tools.
            </p>
            <Button 
              onClick={signOut} 
              variant="outline" 
              className="gap-2 text-white border-slate-600 hover:bg-slate-700"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
