import { AssessmentData } from "./AssessmentEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Check } from "lucide-react";
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
        <div className="assessment-slide bg-gradient-to-br from-[#003366] via-[#004488] to-[#0066cc] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-12">
            <div className="bg-white rounded-full p-8 shadow-2xl">
              <img src={ventureLogo} alt="Venture Logo" className="w-32 h-32" />
            </div>
            <div className="space-y-6">
              <h1 className="text-8xl font-black text-white tracking-tight leading-tight">
                ASSESSMENT<br />REPORT
              </h1>
              <div className="h-2 w-32 bg-white/80 mx-auto rounded-full"></div>
              <p className="text-3xl font-semibold text-white/90 uppercase tracking-wider">Venture Sports</p>
            </div>
          </div>
        </div>

        {/* Player Profile Slide */}
        <div className="assessment-slide bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-r from-[#003366] to-[#0066cc]"></div>
          <div className="absolute top-12 left-12 z-20">
            <img src={ventureLogo} alt="Venture" className="w-20 h-20 rounded-full bg-white p-2 shadow-lg" />
          </div>
          
          <div className="relative z-10 pt-56 px-24 pb-24">
            <div className="grid grid-cols-5 gap-12 items-start">
              <div className="col-span-2">
                {data.playerPhoto ? (
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-[#003366] to-[#0066cc] rounded-3xl blur-xl opacity-30"></div>
                    <img
                      src={data.playerPhoto}
                      alt={data.playerName}
                      className="relative w-full aspect-square object-cover rounded-2xl shadow-2xl"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-xl">
                    <span className="text-gray-400 text-xl font-semibold">No Photo</span>
                  </div>
                )}
              </div>

              <div className="col-span-3 space-y-8">
                <div>
                  <h2 className="text-7xl font-black text-[#003366] mb-4 leading-tight">
                    {data.playerName || "(NAME OF PLAYER)"}
                  </h2>
                  <div className="h-1.5 w-24 bg-gradient-to-r from-[#003366] to-[#0066cc] rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Enrollment</p>
                    <p className="text-2xl font-bold text-[#003366]">{data.enrollmentYear || "August 2027"}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">School Year</p>
                    <p className="text-2xl font-bold text-[#003366]">{data.schoolYear || "Freshman"}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">GPA</p>
                    <p className="text-2xl font-bold text-[#003366]">{data.gpa || "3.5+ GPA"}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Manager</p>
                    <p className="text-2xl font-bold text-[#003366]">{data.manager || "(Agent Name)"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Department Recommendations Slide */}
        <div className="assessment-slide bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#003366]/5 to-[#0066cc]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-12 left-12">
            <img src={ventureLogo} alt="Venture" className="w-16 h-16 rounded-full" />
          </div>

          <div className="relative z-10 flex flex-col h-full px-24 py-20">
            <div className="mb-12">
              <h2 className="text-6xl font-black text-[#003366] mb-4">
                Venture Soccer Department<br />Recommendations
              </h2>
              <div className="h-1.5 w-32 bg-gradient-to-r from-[#003366] to-[#0066cc] rounded-full"></div>
            </div>
            
            <div className="flex-1 bg-white rounded-3xl shadow-2xl p-12 border border-gray-200">
              <div className="prose prose-lg max-w-none">
                {data.departmentNotes.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-xl leading-relaxed text-gray-700 mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Target Divisions Slide */}
        <div className="assessment-slide bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-br from-[#003366] to-[#0066cc] opacity-95" 
                 style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}>
            </div>
          </div>
          
          <div className="absolute top-12 left-12">
            <img src={ventureLogo} alt="Venture" className="w-16 h-16 rounded-full" />
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-12 h-full px-24 py-20">
            <div className="flex flex-col justify-center">
              <h2 className="text-7xl font-black text-[#003366] mb-8 leading-tight">
                TARGET<br />DIVISIONS
              </h2>
              <div className="h-2 w-32 bg-gradient-to-r from-[#003366] to-[#0066cc] rounded-full"></div>
            </div>

            <div className="flex flex-col justify-center space-y-8">
              {/* NAIA */}
              <div className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                data.targetDivisions.naia 
                  ? 'bg-white shadow-2xl scale-105' 
                  : 'bg-white/50 backdrop-blur-sm'
              }`}>
                <div className="p-8 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={`w-20 h-20 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      data.targetDivisions.naia
                        ? 'bg-gradient-to-br from-[#003366] to-[#0066cc]'
                        : 'bg-gray-200'
                    }`}>
                      {data.targetDivisions.naia && (
                        <Check className="w-10 h-10 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <div>
                      <h3 className={`text-4xl font-black transition-colors ${
                        data.targetDivisions.naia ? 'text-[#003366]' : 'text-gray-400'
                      }`}>NAIA</h3>
                      <p className="text-sm text-gray-500 mt-1">National Association of Intercollegiate Athletics</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* NCAA */}
              <div className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                data.targetDivisions.ncaa 
                  ? 'bg-white shadow-2xl scale-105' 
                  : 'bg-white/50 backdrop-blur-sm'
              }`}>
                <div className="p-8 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={`w-20 h-20 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      data.targetDivisions.ncaa
                        ? 'bg-gradient-to-br from-[#003366] to-[#0066cc]'
                        : 'bg-gray-200'
                    }`}>
                      {data.targetDivisions.ncaa && (
                        <Check className="w-10 h-10 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <div>
                      <h3 className={`text-4xl font-black transition-colors ${
                        data.targetDivisions.ncaa ? 'text-[#003366]' : 'text-gray-400'
                      }`}>NCAA</h3>
                      <p className="text-sm text-gray-500 mt-1">National Collegiate Athletic Association</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* JUCAA */}
              <div className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                data.targetDivisions.jucaa 
                  ? 'bg-white shadow-2xl scale-105' 
                  : 'bg-white/50 backdrop-blur-sm'
              }`}>
                <div className="p-8 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={`w-20 h-20 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      data.targetDivisions.jucaa
                        ? 'bg-gradient-to-br from-[#003366] to-[#0066cc]'
                        : 'bg-gray-200'
                    }`}>
                      {data.targetDivisions.jucaa && (
                        <Check className="w-10 h-10 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <div>
                      <h3 className={`text-4xl font-black transition-colors ${
                        data.targetDivisions.jucaa ? 'text-[#003366]' : 'text-gray-400'
                      }`}>JUCAA</h3>
                      <p className="text-sm text-gray-500 mt-1">National Junior College Athletic Association</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Costs Slide */}
        <div className="assessment-slide bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#003366] to-[#0066cc]"></div>
          <div className="absolute top-8 left-12">
            <img src={ventureLogo} alt="Venture" className="w-16 h-16 rounded-full bg-white p-2" />
          </div>

          <div className="relative z-10 pt-40 px-24 pb-20">
            <h2 className="text-6xl font-black text-[#003366] mb-12">Estimated Costs</h2>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">SAT</h3>
                  <span className="text-3xl font-black text-[#003366]">$160</span>
                </div>
                <span className="inline-block px-4 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">REQUIRED</span>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Eligibility Center (NAIA)</h3>
                  <span className="text-3xl font-black text-[#003366]">$160</span>
                </div>
                <span className="inline-block px-4 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">REQUIRED</span>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Visa & SEVIS</h3>
                  <span className="text-3xl font-black text-[#003366]">$550</span>
                </div>
                <span className="inline-block px-4 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">REQUIRED</span>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Transcripts Evaluation</h3>
                  <span className="text-3xl font-black text-[#003366]">$160</span>
                </div>
                <span className="inline-block px-4 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">REQUIRED</span>
              </div>

              <div className="col-span-2 bg-gradient-to-br from-[#003366] to-[#0066cc] rounded-2xl p-8 shadow-2xl text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">University Yearly Budget</h3>
                    <p className="text-white/80 text-lg">Depends on the school</p>
                  </div>
                  <span className="text-5xl font-black">$10K-$20K</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Slide */}
        <div className="assessment-slide bg-gradient-to-br from-[#003366] via-[#004488] to-[#0066cc] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-12">
            <div className="bg-white rounded-full p-10 shadow-2xl">
              <img src={ventureLogo} alt="Venture Logo" className="w-40 h-40" />
            </div>
            <div className="space-y-6">
              <h1 className="text-7xl font-black text-white tracking-tight">
                Thank You
              </h1>
              <div className="h-2 w-32 bg-white/80 mx-auto rounded-full"></div>
              <p className="text-2xl font-semibold text-white/90">Venture Sports - Assessment Report</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
