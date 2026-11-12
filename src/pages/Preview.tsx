import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AssessmentPreview } from "@/components/AssessmentPreview";
import { AssessmentData } from "@/components/AssessmentEditor";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import samplePhoto from "@/assets/henrique-santos.jpg";

async function loadPackageChoices(slug: string) {
  const { data: file, error } = await supabase.storage.from("player-photos").download(`package-choices/${slug}.json`);
  if (error || !file) return null;
  try {
      const parsed = JSON.parse(await file.text()) as { services?: Record<string, boolean>; extras?: string[]; supportYears?: number };
      const supportYears = parsed.supportYears === 2 || parsed.supportYears === 4 ? parsed.supportYears : 1;
      return {
        services: parsed.services && typeof parsed.services === "object" ? parsed.services : {},
        extras: Array.isArray(parsed.extras) ? parsed.extras.filter((item) => typeof item === "string") : [],
        supportYears: supportYears as 1 | 2 | 4,
      };
  } catch {
    return null;
  }
}

const SAMPLE_ASSESSMENT: AssessmentData = {
  playerName: "Henrique Santos",
  enrollmentYear: "August 2027",
  schoolYear: "Freshman",
  gpa: "3.8",
  manager: "João Delgado",
  budget: "$18,000",
  departmentNotes: "The Venture Soccer Department believes Henrique Santos has the ability to successfully compete at the NCAA D1 level, with an estimated budget of $18,000 per year.\n\nSoccer Ability & Development:\nHenrique is a versatile player with solid fundamentals and good game understanding. Continued development in technical skills, positioning, and consistency will help make an immediate impact at the college level.\n\nAcademic Standing:\nHenrique maintains strong academic eligibility with a 3.8 and is well-prepared for the demands of college-level coursework. Projected enrollment: August 2027.\n\nRecruitment Strategy & Pathway:\nBased on current level and budget, Henrique fits the NCAA D1 pathway. NC State is the kind of program this route is built to reach.\n\nBudget & Financial Planning:\nEstimated annual budget: $18,000 (covering tuition, housing, meals, insurance, and equipment). The Venture team will secure placement and pursue scholarship options to reduce total cost.\n\nCommitment to Placement:\nThe Venture Soccer Department is confident in Henrique Santos's ability to compete, develop, and grow within the U.S. college system. We will support throughout the entire process—from initial placement to potential transfer opportunities at higher divisions.",
  playerPhoto: samplePhoto,
  targetDivisions: ["NCAA D1", "NCAA D2"],
  packagePrice1: "5,395",
  packagePrice2: "4,795",
  packagePrice3: "4,495",
  currency: "USD",
  language: "English",
  translatedLabels: null,
  includeProAcademy: false,
  programMode: "college",
};

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
    if (slug === "sample" && import.meta.env.DEV) {
      setData(SAMPLE_ASSESSMENT);
      setLoading(false);
      return;
    }

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
              proAcademyAddonPrice: (assessment as any).pro_academy_addon_price || '',
              programMode: ((assessment as any).program_mode as 'college' | 'pro' | 'both') || 'college',
              slug,
              packageChoices: await loadPackageChoices(slug),
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
