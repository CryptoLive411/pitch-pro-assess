import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AssessmentEditor, AssessmentData } from "@/components/AssessmentEditor";

const Index = () => {
  const navigate = useNavigate();
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    playerName: "",
    enrollmentYear: "August 2027",
    schoolYear: "Freshman",
    gpa: "3.5+ GPA",
    manager: "",
    departmentNotes: "",
    playerPhoto: null,
    targetDivisions: [],
  });

  const handlePreview = () => {
    navigate("/preview", { state: { data: assessmentData } });
  };

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto max-w-5xl">
        <AssessmentEditor
          data={assessmentData}
          onChange={setAssessmentData}
          onPreview={handlePreview}
        />
      </div>
    </div>
  );
};

export default Index;
