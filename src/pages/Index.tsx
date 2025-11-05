import { useState } from "react";
import { AssessmentEditor, AssessmentData } from "@/components/AssessmentEditor";
import { AssessmentPreview } from "@/components/AssessmentPreview";

const Index = () => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    playerName: "",
    enrollmentYear: "August 2027",
    schoolYear: "Freshman",
    gpa: "3.5+ GPA",
    manager: "",
    departmentNotes: "The Venture Soccer Department believes (NAME OF PLAYER) can play in different levels of the NAIA division.\n\nWith their football ability and playing at the level they are playing now and the time we have to work, it will generate good interest from college coaches. The Venture team believes the athlete can still find a team for (SEASON/SEMESTER YEAR) if they commit to this project with us.\n\nAcademically, (Name) has a good academic record, and finalized their high school with a respectable GPA. So, they will receive academic packages.\n\nDue to the timeline of the player and what we have to work on, as a team we advise the athlete to focus on NAIA teams if a good financial package is offered to the player and family.",
    playerPhoto: null,
    targetDivisions: ["NAIA D1"],
  });

  if (isPreviewMode) {
    return (
      <AssessmentPreview data={assessmentData} onBack={() => setIsPreviewMode(false)} />
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto max-w-5xl">
        <AssessmentEditor
          data={assessmentData}
          onChange={setAssessmentData}
          onPreview={() => setIsPreviewMode(true)}
        />
      </div>
    </div>
  );
};

export default Index;
