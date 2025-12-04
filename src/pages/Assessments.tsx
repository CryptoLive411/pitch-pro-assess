import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, ExternalLink, Copy, Check, FileText, X, LogOut } from "lucide-react";
import { toast } from "sonner";
import ventureLogo from "@/assets/venture-logo-circle.png";
import { useAuth } from "@/hooks/useAuth";

interface Assessment {
  id: string;
  player_name: string;
  player_name_slug: string;
  grad_year: string | null;
  current_level: string | null;
  created_at: string;
}

const Assessments = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assessmentToDelete, setAssessmentToDelete] = useState<Assessment | null>(null);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const { data, error } = await supabase
        .from('assessments')
        .select('id, player_name, player_name_slug, grad_year, current_level, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAssessments(data || []);
    } catch (error) {
      console.error('Error fetching assessments:', error);
      toast.error('Failed to load assessments');
    } finally {
      setLoading(false);
    }
  };

  const getAssessmentUrl = (slug: string) => {
    return `${window.location.origin}/ventureassessment/${slug}`;
  };

  const copyToClipboard = async (slug: string, assessmentId: string) => {
    const url = getAssessmentUrl(slug);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(assessmentId);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDeleteClick = (assessment: Assessment) => {
    setAssessmentToDelete(assessment);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!assessmentToDelete) return;

    try {
      const { error } = await supabase
        .from('assessments')
        .delete()
        .eq('id', assessmentToDelete.id);

      if (error) throw error;

      toast.success(`Assessment for ${assessmentToDelete.player_name} deleted successfully`);
      fetchAssessments(); // Refresh the list
    } catch (error) {
      console.error('Error deleting assessment:', error);
      toast.error('Failed to delete assessment');
    } finally {
      setDeleteDialogOpen(false);
      setAssessmentToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={ventureLogo} alt="Venture USA" className="h-10 w-10 md:h-12 md:w-12" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Assessments</h1>
                <p className="text-sm text-slate-600">Manage your player assessments</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => navigate("/")} 
                className="gap-2"
                variant="outline"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Editor</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <Button
                onClick={signOut}
                variant="ghost"
                className="gap-2 text-slate-500 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">
              Total assessments: <span className="font-semibold text-slate-900">{assessments.length}</span>
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading assessments...</p>
            </div>
          </div>
        ) : assessments.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="pt-6">
              <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No assessments yet</h3>
              <p className="text-slate-600 mb-4">Create your first assessment to get started</p>
              <Button onClick={() => navigate("/")}>
                Create Assessment
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {assessments.map((assessment) => (
              <Card key={assessment.id} className="hover:shadow-lg transition-shadow duration-200 relative">
                {/* Delete Button */}
                <Button
                  onClick={() => handleDeleteClick(assessment)}
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>

                <CardHeader>
                  <CardTitle className="text-xl truncate pr-8">{assessment.player_name}</CardTitle>
                  <CardDescription className="space-y-1">
                    {assessment.grad_year && (
                      <div className="text-xs">Graduation: {assessment.grad_year}</div>
                    )}
                    {assessment.current_level && (
                      <div className="text-xs">Level: {assessment.current_level}</div>
                    )}
                    <div className="text-xs text-slate-500">
                      Created: {formatDate(assessment.created_at)}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => navigate(`/ventureassessment/${assessment.player_name_slug}`)}
                      className="w-full gap-2"
                      variant="default"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Assessment
                    </Button>
                    <Button
                      onClick={() => copyToClipboard(assessment.player_name_slug, assessment.id)}
                      className="w-full gap-2"
                      variant="outline"
                    >
                      {copiedId === assessment.id ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy Link
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="pt-2 border-t border-slate-200">
                    <p className="text-xs text-slate-500 font-mono break-all">
                      {getAssessmentUrl(assessment.player_name_slug)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Assessment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the assessment for{" "}
              <span className="font-semibold">{assessmentToDelete?.player_name}</span>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Assessments;
