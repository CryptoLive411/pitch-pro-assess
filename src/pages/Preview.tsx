import { useNavigate, useLocation } from "react-router-dom";
import { AssessmentPreview } from "@/components/AssessmentPreview";
import { AssessmentData } from "@/components/AssessmentEditor";

const Preview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data as AssessmentData;

  if (!data) {
    navigate("/");
    return null;
  }

  return <AssessmentPreview data={data} onBack={() => navigate("/")} />;
};

export default Preview;
