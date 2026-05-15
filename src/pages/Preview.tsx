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

  // Set OG meta tags dynamically when data is available
  useEffect(() => {
    if (data) {
      // Set page title
      document.title = `${data.playerName} - Venture Soccer Assessment`;
      
      // Update or create OG meta tags
      const setMetaTag = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };
      
      const setTwitterMeta = (name: string, content: string) => {
        let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };

      // Use static OG image for consistent link previews
      const ogImageUrl = `${window.location.origin}/og-preview.png`;
      
      // Set OG tags
      setMetaTag('og:title', `${data.playerName} - Venture Soccer Assessment`);
      setMetaTag('og:description', `Professional soccer assessment for ${data.playerName}. View detailed analysis and recruitment pathway.`);
      setMetaTag('og:image', ogImageUrl);
      setMetaTag('og:type', 'website');
      
      // Set Twitter tags
      setTwitterMeta('twitter:card', 'summary_large_image');
      setTwitterMeta('twitter:title', `${data.playerName} - Venture Soccer Assessment`);
      setTwitterMeta('twitter:description', `Professional soccer assessment for ${data.playerName}. View detailed analysis and recruitment pathway.`);
      setTwitterMeta('twitter:image', ogImageUrl);
    }

    // Cleanup on unmount
    return () => {
      document.title = 'Venture Sports Assessment Tool';
    };
  }, [data]);

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
              targetDivisions: assessment.target_divisions || [],
              packagePrice1: assessment.package_price_1 || '',
              packagePrice2: assessment.package_price_2 || '',
              packagePrice3: assessment.package_price_3 || '',
              currency: (assessment as any).currency || 'USD',
              costSat: (assessment as any).cost_sat || '',
              costApplications: (assessment as any).cost_applications || '',
              costFlight: (assessment as any).cost_flight || '',
              costVisa: (assessment as any).cost_visa || '',
              costUniversity: (assessment as any).cost_university || '',
              language: assessment.language || 'English',
              translatedLabels: assessment.translated_labels as Record<string, string> | null,
              includeProAcademy: (assessment as any).include_pro_academy || false,
              proAcademyPrice: (assessment as any).pro_academy_price || '',
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
