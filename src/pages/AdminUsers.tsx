import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, UserPlus, Trash2, Loader2, Shield, Users } from "lucide-react";
import { toast } from "sonner";
import ventureLogo from "@/assets/venture-logo-circle.png";
import { useAuth } from "@/hooks/useAuth";

interface UserWithRole {
  id: string;
  email: string;
  created_at: string;
  role: string | null;
  role_id: string | null;
}

const AdminUsers = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Get all users with their roles using a custom RPC or direct query
      // Since we can't query auth.users directly from client, we'll get users from user_roles
      // and also check for pending users
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      // For now, show users who have roles
      // Admins can add new users by email
      const usersWithRoles = rolesData?.map(r => ({
        id: r.user_id,
        email: 'Loading...',
        created_at: r.created_at,
        role: r.role,
        role_id: r.id
      })) || [];

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const grantStaffAccess = async (email: string) => {
    setUpdating(email);
    try {
      // We need to use an edge function to look up user by email and grant role
      const { data, error } = await supabase.functions.invoke('manage-users', {
        body: { action: 'grantStaff', email }
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast.success(`Staff access granted to ${email}`);
      fetchUsers();
    } catch (error: any) {
      console.error('Error granting access:', error);
      toast.error(error.message || 'Failed to grant access');
    } finally {
      setUpdating(null);
    }
  };

  const revokeAccess = async (userId: string, roleId: string) => {
    if (userId === user?.id) {
      toast.error("You can't revoke your own access");
      return;
    }

    setUpdating(userId);
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('id', roleId);

      if (error) throw error;

      toast.success('Access revoked');
      fetchUsers();
    } catch (error) {
      console.error('Error revoking access:', error);
      toast.error('Failed to revoke access');
    } finally {
      setUpdating(null);
    }
  };

  const [newEmail, setNewEmail] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={ventureLogo} alt="Venture USA" className="h-10 w-10 md:h-12 md:w-12" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">User Management</h1>
                <p className="text-sm text-slate-600">Grant or revoke staff access</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate("/")} 
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-3xl">
        {/* Add New User */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Grant Staff Access
            </CardTitle>
            <CardDescription>
              Enter the email of a user who has already signed up
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="user@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button 
                onClick={() => {
                  if (newEmail) {
                    grantStaffAccess(newEmail);
                    setNewEmail('');
                  }
                }}
                disabled={!newEmail || updating === newEmail}
              >
                {updating === newEmail ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Grant Access'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Staff */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Current Staff Members
            </CardTitle>
            <CardDescription>
              Users with access to the assessment tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              </div>
            ) : users.length === 0 ? (
              <p className="text-center text-slate-500 py-8">No staff members found</p>
            ) : (
              <div className="space-y-3">
                {users.map((u) => (
                  <div 
                    key={u.role_id} 
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="font-medium text-slate-900">{u.id}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={u.role === 'admin' ? 'default' : 'secondary'}>
                            {u.role}
                          </Badge>
                          {u.id === user?.id && (
                            <Badge variant="outline">You</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    {u.id !== user?.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => revokeAccess(u.id, u.role_id!)}
                        disabled={updating === u.id}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        {updating === u.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminUsers;
