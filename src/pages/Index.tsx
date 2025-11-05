import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AssessmentEditor, AssessmentData } from "@/components/AssessmentEditor";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    }
  );

  const handlePreview = () => {
    navigate("/preview", { state: { data: assessmentData } });
  };

  return (
    <AssessmentEditor
      data={assessmentData}
      onChange={setAssessmentData}
      onPreview={handlePreview}
    />
  );
};

export default Index;
