import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AssessmentEditor, AssessmentData } from "@/components/AssessmentEditor";
import { Button } from "@/components/ui/button";
import { FileText, LogOut, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();
  const [assessmentData, setAssessmentData] = useState<AssessmentData>(
    location.state?.preservedData || {
      playerName: "",
      enrollmentYear: "",
      schoolYear: "",
      gpa: "",
      manager: "",
      budget: "",
      departmentNotes: "",
      playerPhoto: null,
      targetDivisions: [],
      packagePrice1: "5,395",
      packagePrice2: "4,795",
      packagePrice3: "4,495",
      currency: "USD",
      costSat: "",
      costApplications: "",
      costFlight: "",
      costVisa: "",
      costUniversity: "",
      language: "English",
      translatedLabels: null,
      includeProAcademy: false,
      proAcademyPrice: "",
    }
  );
  
  const pipedriveInfo = location.state?.pipedriveInfo || null;

  const handlePreview = () => {
    navigate("/preview", { state: { data: assessmentData } });
  };

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-wrap justify-end gap-2 pt-4 pb-2 px-4">
          <Button
            onClick={() => navigate("/pending-assessments")}
            variant="outline"
            size="sm"
            className="gap-1 md:gap-2 text-xs md:text-sm"
          >
            <FileText className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Pending from Pipedrive</span>
            <span className="sm:hidden">Pending</span>
          </Button>
          <Button
            onClick={() => navigate("/admin/users")}
            variant="outline"
            size="sm"
            className="gap-1 md:gap-2 text-xs md:text-sm"
          >
            <Users className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Manage Users</span>
            <span className="sm:hidden">Users</span>
          </Button>
          <Button
            onClick={signOut}
            variant="ghost"
            size="sm"
            className="gap-1 md:gap-2 text-xs md:text-sm text-muted-foreground hover:text-destructive"
          >
            <LogOut className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Sign Out</span>
            <span className="sm:hidden">Out</span>
          </Button>
        </div>
        <AssessmentEditor
          data={assessmentData}
          onChange={setAssessmentData}
          onPreview={handlePreview}
          pipedriveInfo={pipedriveInfo}
        />
      </div>
    </div>
  );
};

export default Index;
