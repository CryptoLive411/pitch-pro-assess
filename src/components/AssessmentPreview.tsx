import { AssessmentData } from "./AssessmentEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Check, Square } from "lucide-react";
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
      <div className="print:hidden bg-[#1e3a5f] text-white p-4 sticky top-0 z-50 shadow-lg">
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
        {/* Page 1: Cover */}
        <div className="assessment-slide relative overflow-hidden">
          {/* Background soccer image with overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-cyan-100 to-blue-100"></div>
          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-[#1e3a5f] rounded-tr-[200px]"></div>
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <img src={ventureLogo} alt="Venture Logo" className="w-48 h-48 mb-12" />
            <h1 className="text-8xl font-black text-[#1e3a5f] uppercase tracking-tight mb-2">
              ASSESSMENT REPORT
            </h1>
            <div className="text-6xl font-black text-[#1e3a5f] uppercase tracking-widest">
              VENTURE
            </div>
          </div>
        </div>

        {/* Page 2: Player Info */}
        <div className="assessment-slide bg-[#e8f4f8] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1e3a5f] rounded-bl-[200px]"></div>
          <div className="absolute top-0 left-0 bg-[#1e3a5f] w-40 h-40 rounded-br-full flex items-center justify-center">
            <img src={ventureLogo} alt="Venture" className="w-24 h-24" />
          </div>

          <div className="relative z-10 flex items-center h-full px-24 gap-20">
            <div className="flex-1 flex justify-center">
              {data.playerPhoto ? (
                <div className="bg-[#1e3a5f] p-6 rounded-[40px] shadow-2xl">
                  <img
                    src={data.playerPhoto}
                    alt={data.playerName}
                    className="w-[450px] h-[550px] object-cover rounded-[32px]"
                  />
                </div>
              ) : (
                <div className="bg-[#1e3a5f] p-6 rounded-[40px] shadow-2xl">
                  <div className="w-[450px] h-[550px] bg-white rounded-[32px] flex items-center justify-center">
                    <span className="text-gray-400 text-2xl">No Photo</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 text-white text-right space-y-8 pr-16">
              <h2 className="text-8xl font-black leading-none mb-12">
                {data.playerName || "(NAME OF PLAYER)"}
              </h2>
              <div className="space-y-6 text-3xl">
                <p>• <span className="font-bold">Enrollment year/options:</span> {data.enrollmentYear || "August 2027"}</p>
                <p>• <span className="font-bold">School Year:</span> {data.schoolYear || "Freshman"}</p>
                <p>• <span className="font-bold">High School GPA:</span> {data.gpa || "3.5+ GPA"}</p>
                <p>• <span className="font-bold">Manager:</span> {data.manager || "(NAME of AGENT)"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page 3: Recommendation Visual - Matching Original */}
        <div className="assessment-slide bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2/3 h-48 bg-[#1e3a5f] rounded-bl-full"></div>
          <div className="absolute top-8 left-12">
            <img src={ventureLogo} alt="Venture" className="w-20 h-20" />
          </div>

          <div className="relative z-10 flex items-center justify-center h-full px-24">
            <div className="text-center space-y-12">
              <div className="inline-block bg-[#1e3a5f] text-white px-24 py-16 rounded-3xl">
                <div className="text-8xl font-black mb-4">{data.playerName || "PLAYER NAME"}</div>
                <div className="text-5xl font-bold">{data.schoolYear || "SCHOOL"}</div>
              </div>
              
              <div className="flex items-center justify-center gap-8 text-6xl font-black text-[#1e3a5f]">
                <div className="bg-[#e8f4f8] px-12 py-8 rounded-2xl">
                  {data.targetDivisions.naia && "NAIA"}
                  {data.targetDivisions.ncaa && (data.targetDivisions.naia ? " / NCAA" : "NCAA")}
                  {data.targetDivisions.jucaa && "JUCAA"}
                </div>
              </div>

              <div className="text-4xl font-bold text-gray-600 uppercase">
                Player's recommendation
              </div>
              <div className="text-3xl text-gray-500">
                Presented by <span className="font-bold">venture</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page 4: Department Notes */}
        <div className="assessment-slide bg-[#e8f4f8] relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-[#1e3a5f] w-40 h-40 rounded-br-full flex items-center justify-center">
            <img src={ventureLogo} alt="Venture" className="w-24 h-24" />
          </div>
          <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-[#1e3a5f] to-[#2a4f7f] rounded-tl-[250px]"></div>

          <div className="relative z-10 px-24 py-20 h-full flex flex-col">
            <h2 className="text-6xl font-black text-[#1e3a5f] mb-12 uppercase">
              Venture Soccer Department Recommendations
            </h2>
            
            <div className="flex-1 bg-white rounded-2xl p-12 shadow-xl max-w-5xl">
              {data.departmentNotes.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-xl leading-relaxed text-gray-800 mb-4">
                  • {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Page 5: Testimonials */}
        <div className="assessment-slide bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-[#1e3a5f]"></div>
          <div className="absolute top-8 left-12">
            <img src={ventureLogo} alt="Venture" className="w-20 h-20" />
          </div>

          <div className="relative z-10 pt-40 px-24 pb-20 grid grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-4xl font-black text-[#1e3a5f]">JOAO DOMINGUES</h3>
              <p className="text-lg text-gray-700 leading-relaxed uppercase">
                FIU VENTURE USA HAD AN IMPORTANT IMPACT IN MY LIFE HELPING ME GET A GOOD UNIVERSITY TO PLAY SOCCER WHILE STUDYING.
                <br/><br/>
                DURING THE PROCESS, IT WAS NOTICED THEIR HARD WORK ON GETTING THE BEST UNIVERSITIES POSSIBLE. ALSO, THEY HAVE VERY HONEST PEOPLE, AND HE ALWAYS TOLD ME THE REAL TRUTH ABOUT THE POSITIVE AND NEGATIVE THINGS OF THE DIFFERENT UNIVERSITIES, COACHES AND FACILITIES.
                <br/><br/>
                NOW I STILL KEEP A VERY GOOD CONNECTION WITH THEM. AT THIS POINT HE IS NOT ONLY AN "AGENT" BUT A FRIEND THAT I AM REALLY THANKFUL FOR ALL THE HELP.
              </p>
              <div className="text-2xl font-black text-[#0099cc]">FIU NCAA</div>
            </div>

            <div className="space-y-6">
              <h3 className="text-4xl font-black text-[#1e3a5f]">FILIP JAUK</h3>
              <p className="text-lg text-gray-700 leading-relaxed uppercase">
                I REALLY ENJOYED WORKING WITH VENTURE SOCCER. WITHOUT THEM I WOULDN'T HAVE BEEN ABLE TO HAVE A FULL SCHOLARSHIP AT SUCH A GREAT SCHOOL AT ONE OF THE BEST SOCCER PROGRAMS. THEY WERE WITH ME FROM THE BEGINNING AND EVERY TIME MADE SURE THAT EVERYTHING IS PERFECT FOR MY EDUCATION AND MY SOCCER IMPROVEMENT.
                <br/><br/>
                AM REALLY THANKFUL FOR ALL THE HELP.
              </p>
              <div className="text-2xl font-black text-[#0099cc]">HOFSTRA NCAA</div>
            </div>
          </div>
        </div>

        {/* Page 6: Target Divisions */}
        <div className="assessment-slide bg-[#e8f4f8] relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-[#1e3a5f] w-40 h-40 rounded-br-full flex items-center justify-center">
            <img src={ventureLogo} alt="Venture" className="w-24 h-24" />
          </div>
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-[#1e3a5f] rounded-tl-[200px]"></div>

          <div className="relative z-10 px-24 py-20 h-full flex flex-col justify-center">
            <h2 className="text-7xl font-black text-[#1e3a5f] mb-20 uppercase">Target Divisions</h2>
            
            <div className="grid grid-cols-3 gap-12 max-w-6xl">
              <div className="bg-white rounded-2xl p-12 shadow-xl text-center">
                <div className={`w-32 h-32 mx-auto mb-6 border-8 rounded-2xl flex items-center justify-center ${
                  data.targetDivisions.naia ? 'border-[#1e3a5f] bg-[#1e3a5f]' : 'border-gray-300'
                }`}>
                  {data.targetDivisions.naia && <Check className="w-20 h-20 text-white" strokeWidth={4} />}
                </div>
                <h3 className="text-5xl font-black text-[#1e3a5f]">NAIA</h3>
              </div>

              <div className="bg-white rounded-2xl p-12 shadow-xl text-center">
                <div className={`w-32 h-32 mx-auto mb-6 border-8 rounded-2xl flex items-center justify-center ${
                  data.targetDivisions.ncaa ? 'border-[#1e3a5f] bg-[#1e3a5f]' : 'border-gray-300'
                }`}>
                  {data.targetDivisions.ncaa && <Check className="w-20 h-20 text-white" strokeWidth={4} />}
                </div>
                <h3 className="text-5xl font-black text-[#1e3a5f]">NCAA</h3>
              </div>

              <div className="bg-white rounded-2xl p-12 shadow-xl text-center">
                <div className={`w-32 h-32 mx-auto mb-6 border-8 rounded-2xl flex items-center justify-center ${
                  data.targetDivisions.jucaa ? 'border-[#1e3a5f] bg-[#1e3a5f]' : 'border-gray-300'
                }`}>
                  {data.targetDivisions.jucaa && <Check className="w-20 h-20 text-white" strokeWidth={4} />}
                </div>
                <h3 className="text-5xl font-black text-[#1e3a5f]">JUCAA</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Page 7: Committed */}
        <div className="assessment-slide bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50"></div>
          
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-9xl font-black text-[#1e3a5f] mb-8">200+</div>
              <h2 className="text-6xl font-black text-[#0099cc] uppercase">Committed</h2>
              <p className="text-4xl text-gray-600 mt-8">Players Successfully Placed</p>
            </div>
          </div>
        </div>

        {/* Page 8: Estimated Costs */}
        <div className="assessment-slide bg-[#e8f4f8] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-[#1e3a5f]"></div>
          <div className="absolute top-8 left-12">
            <img src={ventureLogo} alt="Venture" className="w-20 h-20" />
          </div>

          <div className="relative z-10 pt-40 px-24 pb-20">
            <h2 className="text-6xl font-black text-[#1e3a5f] mb-12 uppercase">Estimated Costs</h2>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#1e3a5f] text-white">
                  <tr>
                    <th className="text-left p-6 text-2xl font-bold">PRICE</th>
                    <th className="text-center p-6 text-2xl font-bold">REQUIRED</th>
                    <th className="text-right p-6 text-2xl font-bold"></th>
                  </tr>
                </thead>
                <tbody className="text-xl">
                  <tr className="border-b">
                    <td className="p-6 font-bold">SAT</td>
                    <td className="p-6 text-center">160</td>
                    <td className="p-6 text-right">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">REQUIRED</span>
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-6 font-bold">ELIGIBILITY CENTER (NAIA)</td>
                    <td className="p-6 text-center">160</td>
                    <td className="p-6 text-right">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">REQUIRED</span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-6 font-bold">VISA & SEVIS (NOT INCLUDED)</td>
                    <td className="p-6 text-center">350 + 200</td>
                    <td className="p-6 text-right">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">REQUIRED</span>
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-6 font-bold">SCHOOL TRANSCRIPTS</td>
                    <td className="p-6 text-center">Per page</td>
                    <td className="p-6 text-right">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">REQUIRED</span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-6 font-bold">TRANSCRIPTS EVALUATION</td>
                    <td className="p-6 text-center">160</td>
                    <td className="p-6 text-right">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">REQUIRED</span>
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-6 font-bold">UNIVERSITY YEARLY BUDGET</td>
                    <td className="p-6 text-center">$10,000 - $20,000</td>
                    <td className="p-6 text-right text-sm text-gray-600">DEPENDS ON THE SCHOOL</td>
                  </tr>
                  <tr className="bg-[#1e3a5f] text-white">
                    <td className="p-6 font-bold">VENTURE PACKAGE FEES</td>
                    <td className="p-6 text-center">Page 10</td>
                    <td className="p-6 text-right">
                      <span className="bg-white text-[#1e3a5f] px-4 py-2 rounded-full text-sm font-bold">REQUIRED</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Page 9: Gabriel Testimonial */}
        <div className="assessment-slide bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-[#1e3a5f]"></div>
          <div className="absolute top-8 right-12">
            <img src={ventureLogo} alt="Venture" className="w-20 h-20" />
          </div>

          <div className="relative z-10 pt-40 px-24 pb-20 flex items-center justify-center">
            <div className="max-w-5xl space-y-8">
              <h3 className="text-5xl font-black text-[#1e3a5f]">GABRIEL / FABIO</h3>
              <p className="text-2xl text-gray-700 leading-relaxed uppercase">
                GOING TO THE US IS NOT AN EASY MOVE, BUT JOAO AND VENTURE SOCCER MADE ME FEEL COMFORTABLE EVEN WHEN I WAS NOT SURE OF MY DECISION. THEY ALWAYS SUPPORTED ME AND PUSHED ME BACK UP WHEN I NEEDED TO.
                <br/><br/>
                IT'S MUCH MORE THAN A RELATIONSHIP BETWEEN PLAYER AND COMPANY. FOR ME IT WAS LIKE A SECOND FAMILY, AND I WON'T FORGET THE WORK AND TRUST THEY PUT ON ME, WITHOUT THEM I WOULDN'T BE LIVING MY DREAM.
              </p>
              <div className="text-3xl font-black text-[#0099cc]">HOFSTRA NCAA</div>
            </div>
          </div>
        </div>

        {/* Page 10: Package Options */}
        <div className="assessment-slide bg-[#e8f4f8] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-[#1e3a5f]"></div>
          <div className="absolute top-8 left-12">
            <img src={ventureLogo} alt="Venture" className="w-20 h-20" />
          </div>

          <div className="relative z-10 pt-40 px-16 pb-16">
            <h2 className="text-5xl font-black text-[#1e3a5f] mb-12 uppercase">Estimated Costs</h2>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#1e3a5f] text-white">
                  <tr>
                    <th className="text-left p-4 font-bold">ESTIMATED COSTS</th>
                    <th className="text-center p-4 font-bold">PACKAGE 1</th>
                    <th className="text-center p-4 font-bold">PACKAGE 2</th>
                    <th className="text-center p-4 font-bold">PACKAGE 3</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["ENGLISH EXAM", "INCLUDED", "NOT INCLUDED", "NOT INCLUDED"],
                    ["VIDEO EDITING", "INCLUDED", "INCLUDED", "NOT INCLUDED"],
                    ["UNIVERSITY ADMISSIONS SUPPORT", "INCLUDED", "INCLUDED", "NOT INCLUDED"],
                    ["DOCUMENTS TRANSLATION", "INCLUDED", "NOT INCLUDED", "NOT INCLUDED"],
                    ["COACHES CONNECTIONS", "INCLUDED", "INCLUDED", "INCLUDED"],
                    ["ELIGIBILITY CENTER", "INCLUDED", "NOT INCLUDED", "NOT INCLUDED"],
                    ["UNIVERSITY OFFERS", "INCLUDED", "INCLUDED", "INCLUDED"],
                    ["VISA SUPPORT ONLY", "INCLUDED", "INCLUDED", "NOT INCLUDED"],
                    ["SUPPORT IN THE USA", "INCLUDED", "INCLUDED", "NOT INCLUDED"],
                    ["PLACEMENT", "GUARANTEED", "GUARANTEED", "GUARANTEED"],
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-4 font-semibold">{row[0]}</td>
                      <td className="p-4 text-center">{row[1]}</td>
                      <td className="p-4 text-center">{row[2]}</td>
                      <td className="p-4 text-center">{row[3]}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#1e3a5f] text-white font-bold">
                    <td className="p-4">VENTURE FEE</td>
                    <td className="p-4 text-center">xx USD<br/>+ 7% TAXES</td>
                    <td className="p-4 text-center">xx USD</td>
                    <td className="p-4 text-center">xx USD</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Page 11: Success Logos */}
        <div className="assessment-slide bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50"></div>
          
          <div className="relative z-10 px-24 py-20">
            <h2 className="text-6xl font-black text-[#1e3a5f] text-center mb-20">Our Players Across America</h2>
            <div className="grid grid-cols-4 gap-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg flex items-center justify-center border-2 border-[#1e3a5f]/20">
                  <div className="text-center">
                    <div className="text-4xl font-black text-[#1e3a5f]">NCAA</div>
                    <div className="text-sm text-gray-600 mt-2">University</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page 12: Step by Step */}
        <div className="assessment-slide bg-[#e8f4f8] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-[#1e3a5f]"></div>
          <div className="absolute top-8 left-12">
            <img src={ventureLogo} alt="Venture" className="w-20 h-20" />
          </div>

          <div className="relative z-10 pt-40 px-24 pb-20">
            <h2 className="text-6xl font-black text-[#1e3a5f] mb-8 uppercase">Step by Step</h2>
            <h3 className="text-4xl font-bold text-[#0099cc] mb-16">2025 - 2027</h3>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                "START THE PROCESS",
                "COACHES MEETINGS",
                "VIDEO EDITING & ONLINE PROFILE",
                "RECRUITMENT STARTS",
                "TRANSCRIPTS ORGANIZATION",
                "COACHES CONNECTIONS",
                "APPLICATION SUPPORT",
                "TRAVEL PREPARATION",
                "START COLLEGE JOURNEY"
              ].map((step, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4 border-l-4 border-[#1e3a5f]">
                  <div className="w-12 h-12 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center text-xl font-black flex-shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-xl font-bold text-gray-800">• {step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page 13: Join Our Team */}
        <div className="assessment-slide bg-gradient-to-br from-[#1e3a5f] to-[#2a4f7f] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-1/3 w-[800px] h-[800px] bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-12">
            <img src={ventureLogo} alt="Venture" className="w-48 h-48" />
            <h1 className="text-9xl font-black text-white uppercase leading-none">
              Join Our<br/>Team
            </h1>
            <div className="h-2 w-48 bg-white/80 rounded-full"></div>
            <p className="text-4xl font-bold text-white/95">Start Your Journey</p>
          </div>
        </div>

        {/* Page 14: Back Cover */}
        <div className="assessment-slide relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-cyan-100 to-blue-100"></div>
          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-[#1e3a5f] rounded-tr-[200px]"></div>
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <img src={ventureLogo} alt="Venture Logo" className="w-48 h-48 mb-12" />
            <h1 className="text-8xl font-black text-[#1e3a5f] uppercase tracking-tight mb-2">
              ASSESSMENT REPORT
            </h1>
            <div className="text-6xl font-black text-[#1e3a5f] uppercase tracking-widest">
              VENTURE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
