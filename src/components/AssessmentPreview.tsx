import { AssessmentData } from "./AssessmentEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Check, X } from "lucide-react";
import ventureLogo from "@/assets/venture-logo.jpg";

interface AssessmentPreviewProps {
  data: AssessmentData;
  onBack: () => void;
}

export const AssessmentPreview = ({ data, onBack }: AssessmentPreviewProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="print:hidden bg-primary text-primary-foreground p-4 sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="secondary" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Editor
          </Button>
          <Button variant="secondary" onClick={handlePrint} className="gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="assessment-slides">
        {/* Cover Slide */}
        <div className="assessment-slide bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 rounded-bl-[200px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/10 rounded-tr-[200px]"></div>
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
            <img src={ventureLogo} alt="Venture Logo" className="w-32 h-32 mb-8 rounded-full" />
            <h1 className="text-6xl font-black text-primary-foreground mb-4 tracking-tight">
              VENTURE ASSESSMENT REPORT
            </h1>
          </div>
        </div>

        {/* Player Info Slide */}
        <div className="assessment-slide bg-muted relative overflow-hidden">
          <div className="absolute top-0 left-0 w-48 h-48 bg-primary rounded-br-[100px] flex items-center justify-center">
            <img src={ventureLogo} alt="Venture" className="w-24 h-24 rounded-full" />
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary rounded-bl-[200px]"></div>

          <div className="relative z-10 h-full flex items-center px-24">
            <div className="flex items-center gap-16 w-full">
              <div className="flex-shrink-0">
                {data.playerPhoto ? (
                  <div className="w-80 h-80 rounded-3xl overflow-hidden border-8 border-primary shadow-2xl">
                    <img
                      src={data.playerPhoto}
                      alt={data.playerName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-80 h-80 rounded-3xl bg-primary/20 flex items-center justify-center border-8 border-primary">
                    <span className="text-primary text-lg font-semibold">No Photo</span>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-6">
                <h2 className="text-7xl font-black text-primary mb-12">
                  {data.playerName || "(NAME OF PLAYER)"}
                </h2>
                <div className="space-y-4 text-xl">
                  <div>
                    <span className="font-bold text-foreground">Enrollment year/options:</span>{" "}
                    <span className="text-muted-foreground">
                      {data.enrollmentYear || "August 2027"}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-foreground">School Year:</span>{" "}
                    <span className="text-muted-foreground">{data.schoolYear || "Freshman"}</span>
                  </div>
                  <div>
                    <span className="font-bold text-foreground">High School GPA:</span>{" "}
                    <span className="text-muted-foreground">{data.gpa || "3.5+ GPA"}</span>
                  </div>
                  <div>
                    <span className="font-bold text-foreground">Manager:</span>{" "}
                    <span className="text-muted-foreground">
                      {data.manager || "(NAME of AGENT)"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Department Notes Slide */}
        <div className="assessment-slide bg-muted relative overflow-hidden">
          <div className="absolute top-0 left-0 w-48 h-48 bg-primary rounded-br-[100px] flex items-center justify-center">
            <img src={ventureLogo} alt="Venture" className="w-24 h-24 rounded-full" />
          </div>
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-primary rounded-tl-[200px]"></div>

          <div className="relative z-10 h-full flex flex-col justify-center px-24 py-16">
            <h2 className="text-6xl font-black text-primary mb-12">DEPARTMENT NOTES</h2>
            <div className="bg-card p-12 rounded-3xl shadow-2xl max-w-5xl">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-foreground whitespace-pre-wrap">
                  {data.departmentNotes ||
                    "The Venture Soccer Department believes the player can excel at multiple division levels..."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Target Divisions Slide */}
        <div className="assessment-slide bg-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/20 rounded-bl-[200px]"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-center px-24">
            <h2 className="text-6xl font-black text-primary-foreground mb-16">TARGET DIVISIONS</h2>
            
            <div className="grid grid-cols-1 gap-8 max-w-2xl">
              <div className="bg-card p-8 rounded-2xl shadow-xl flex items-center justify-between">
                <span className="text-3xl font-bold text-foreground">NAIA</span>
                <div className="w-16 h-16 rounded-xl border-4 border-primary flex items-center justify-center bg-background">
                  {data.targetDivisions.naia ? (
                    <Check className="w-10 h-10 text-primary" strokeWidth={3} />
                  ) : (
                    <X className="w-10 h-10 text-muted-foreground" strokeWidth={3} />
                  )}
                </div>
              </div>

              <div className="bg-card p-8 rounded-2xl shadow-xl flex items-center justify-between">
                <span className="text-3xl font-bold text-foreground">NCAA</span>
                <div className="w-16 h-16 rounded-xl border-4 border-primary flex items-center justify-center bg-background">
                  {data.targetDivisions.ncaa ? (
                    <Check className="w-10 h-10 text-primary" strokeWidth={3} />
                  ) : (
                    <X className="w-10 h-10 text-muted-foreground" strokeWidth={3} />
                  )}
                </div>
              </div>

              <div className="bg-card p-8 rounded-2xl shadow-xl flex items-center justify-between">
                <span className="text-3xl font-bold text-foreground">JUCAA</span>
                <div className="w-16 h-16 rounded-xl border-4 border-primary flex items-center justify-center bg-background">
                  {data.targetDivisions.jucaa ? (
                    <Check className="w-10 h-10 text-primary" strokeWidth={3} />
                  ) : (
                    <X className="w-10 h-10 text-muted-foreground" strokeWidth={3} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-8">
            <img src={ventureLogo} alt="Venture" className="w-20 h-20 rounded-full opacity-90" />
          </div>
        </div>
      </div>
    </div>
  );
};
