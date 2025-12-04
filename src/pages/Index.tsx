import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AssessmentEditor, AssessmentData } from "@/components/AssessmentEditor";
import { Button } from "@/components/ui/button";
import { FileText, LogOut } from "lucide-react";
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
      language: "English",
      translatedLabels: null,
    }
  );
  
  const pipedriveInfo = location.state?.pipedriveInfo || null;

  const handlePreview = () => {
    navigate("/preview", { state: { data: assessmentData } });
  };

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto max-w-5xl">
        <div className="flex justify-end gap-2 pt-4 pb-2 px-4">
          <Button
            onClick={() => navigate("/pending-assessments")}
            variant="outline"
            className="gap-2"
          >
            <FileText className="w-4 h-4" />
            Pending from Pipedrive
          </Button>
          <Button
            onClick={signOut}
            variant="ghost"
            className="gap-2 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
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
