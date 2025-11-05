import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AssessmentPreview } from "@/components/AssessmentPreview";
import { AssessmentData } from "@/components/AssessmentEditor";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Preview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  const [data, setData] = useState<AssessmentData | null>(location.state?.data || null);
  const [loading, setLoading] = useState(!!slug && !data);

  useEffect(() => {
    // If we have a slug and no data, fetch from database
    if (slug && !data) {
      const fetchAssessment = async () => {
        try {
          const { data: assessment, error } = await supabase
            .from('assessments')
            .select('*')
            .eq('player_name_slug', slug)
            .single();

          if (error) throw error;

          if (assessment) {
            // Convert database format to AssessmentData format
            const assessmentData: AssessmentData = {
              playerName: assessment.player_name || '',
              enrollmentYear: assessment.grad_year || '',
              schoolYear: assessment.current_level || '',
              gpa: assessment.gpa || '',
              manager: assessment.recommendation || '',
              budget: assessment.budget || '',
              departmentNotes: assessment.department_notes || '',
              playerPhoto: assessment.player_photo || null,
              targetDivisions: assessment.target_divisions || []
            };
            setData(assessmentData);
          } else {
            navigate("/");
          }
        } catch (error) {
          console.error('Error fetching assessment:', error);
          navigate("/");
        } finally {
          setLoading(false);
        }
      };

      fetchAssessment();
    }
  }, [slug, data, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) {
    navigate("/");
    return null;
  }

  // If accessed via slug (custom link), hide the back button
  const isPublicView = !!slug;

  return (
    <AssessmentPreview 
      data={data} 
      onBack={() => navigate("/", { state: { preservedData: data } })}
      isPublicView={isPublicView}
    />
  );
};

export default Preview;
