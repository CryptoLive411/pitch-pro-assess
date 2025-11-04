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
      <div className="print:hidden bg-[#003366] text-white p-4 sticky top-0 z-50 shadow-lg">
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
        {/* Slide 1: Cover */}
        <div className="assessment-slide bg-gradient-to-br from-[#003366] via-[#004488] to-[#0066cc] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-12 px-12">
            <div className="bg-white rounded-full p-8 shadow-2xl">
              <img src={ventureLogo} alt="Venture Logo" className="w-32 h-32" />
            </div>
            <h1 className="text-8xl font-black text-white tracking-tight leading-tight uppercase">
              Assessment<br />Report
            </h1>
            <div className="h-2 w-32 bg-white/80 mx-auto rounded-full"></div>
            <p className="text-4xl font-bold text-white/90 uppercase tracking-widest">Venture</p>
          </div>
        </div>

        {/* Slide 2: Player Info */}
        <div className="assessment-slide bg-[#f5f5f5] relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-[#003366] rounded-br-[120px] p-8 z-20">
            <img src={ventureLogo} alt="Venture" className="w-20 h-20 rounded-full bg-white p-2" />
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#003366] rounded-bl-[200px]"></div>
          
          <div className="relative z-10 h-full flex items-center px-24 py-16">
            <div className="grid grid-cols-2 gap-16 w-full items-center">
              <div className="flex justify-center">
                {data.playerPhoto ? (
                  <div className="relative">
                    <div className="absolute -inset-6 bg-gradient-to-br from-[#003366] to-[#0066cc] rounded-[40px] blur-2xl opacity-20"></div>
                    <div className="relative bg-[#003366] p-8 rounded-[40px]">
                      <img
                        src={data.playerPhoto}
                        alt={data.playerName}
                        className="w-[400px] h-[400px] object-cover rounded-[32px]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-[400px] h-[400px] rounded-[40px] bg-white flex items-center justify-center shadow-2xl border-8 border-[#003366]">
                    <span className="text-gray-400 text-2xl font-semibold">No Photo</span>
                  </div>
                )}
              </div>

              <div className="space-y-8 text-right pr-12">
                <h2 className="text-8xl font-black text-white leading-none mb-8">
                  {data.playerName || "(NAME OF PLAYER)"}
                </h2>
                <div className="space-y-4 text-2xl text-white">
                  <p>
                    <span className="font-bold">• Enrollment year/options:</span> {data.enrollmentYear || "August 2027"}
                  </p>
                  <p>
                    <span className="font-bold">• School Year:</span> {data.schoolYear || "Freshman"}
                  </p>
                  <p>
                    <span className="font-bold">• High School GPA:</span> {data.gpa || "3.5+ GPA"}
                  </p>
                  <p>
                    <span className="font-bold">• Manager:</span> {data.manager || "(NAME of AGENT)"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3: Player Recommendation Visual */}
        <div className="assessment-slide bg-white relative overflow-hidden">
          <div className="absolute top-8 left-12">
            <img src={ventureLogo} alt="Venture" className="w-16 h-16 rounded-full" />
          </div>
          <div className="absolute top-0 right-0 w-2/3 h-32 bg-[#003366] rounded-bl-full"></div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full px-24 space-y-12">
            <h2 className="text-7xl font-black text-[#003366] text-center">Player's Recommendation</h2>
            <div className="bg-gradient-to-br from-[#003366] to-[#0066cc] text-white px-20 py-12 rounded-3xl shadow-2xl">
              <p className="text-6xl font-black text-center">
                {data.targetDivisions.naia && "NAIA"}
                {data.targetDivisions.ncaa && (data.targetDivisions.naia ? " / NCAA" : "NCAA")}
                {data.targetDivisions.jucaa && ((data.targetDivisions.naia || data.targetDivisions.ncaa) ? " / JUCAA" : "JUCAA")}
              </p>
            </div>
            <p className="text-3xl text-center text-gray-600 font-semibold uppercase tracking-wider">
              Presented by Venture
            </p>
          </div>
        </div>

        {/* Slide 4: Department Recommendations */}
        <div className="assessment-slide bg-[#f5f5f5] relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-[#003366] rounded-br-[120px] p-8">
            <img src={ventureLogo} alt="Venture" className="w-16 h-16 rounded-full bg-white p-2" />
          </div>
          <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-[#003366] to-[#0066cc] rounded-tl-[250px] opacity-95"></div>

          <div className="relative z-10 h-full flex flex-col px-24 py-20">
            <h2 className="text-6xl font-black text-[#003366] mb-12 uppercase">
              Venture Soccer Department<br />Recommendations
            </h2>
            
            <div className="flex-1 bg-white rounded-3xl shadow-2xl p-12 max-w-5xl">
              <div className="space-y-6">
                {data.departmentNotes.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-xl leading-relaxed text-gray-800">
                    • {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Slide 5: Testimonials 1 */}
        <div className="assessment-slide bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-[#003366]"></div>
          <div className="absolute top-8 left-12">
            <img src={ventureLogo} alt="Venture" className="w-16 h-16 rounded-full bg-white p-2" />
          </div>

          <div className="relative z-10 pt-32 px-24 pb-20">
            <h2 className="text-6xl font-black text-[#003366] mb-16 text-center">What Our Players Say</h2>
            
            <div className="grid grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl shadow-xl border-l-8 border-[#003366]">
                <h3 className="text-3xl font-black text-[#003366] mb-6">JOAO DOMINGUES</h3>
                <p className="text-lg leading-relaxed text-gray-700 italic">
                  "Venture USA had an important impact in my life helping me get a good university to play soccer while studying. During the process, it was noticed their hard work on getting the best universities possible. They have very honest people, and always told me the real truth about the positive and negative things. Now I still keep a very good connection with them. At this point they are not only an 'agent' but a friend that I am really thankful for all the help."
                </p>
                <div className="mt-6 text-xl font-bold text-[#0066cc]">FIU NCAA</div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl shadow-xl border-l-8 border-[#0066cc]">
                <h3 className="text-3xl font-black text-[#003366] mb-6">FILIP JAUK</h3>
                <p className="text-lg leading-relaxed text-gray-700 italic">
                  "I really enjoyed working with Venture Soccer. Without them I wouldn't have been able to have a full scholarship at such a great school at one of the best soccer programs. They were with me from the beginning and every time made sure that everything is perfect for my education and my soccer improvement. I am really thankful for all the help."
                </p>
                <div className="mt-6 text-xl font-bold text-[#0066cc]">HOFSTRA NCAA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 6: Target Divisions */}
        <div className="assessment-slide bg-gradient-to-br from-[#003366] to-[#0066cc] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 h-full px-24 py-20">
            <div className="flex items-center justify-between mb-16">
              <h2 className="text-7xl font-black text-white uppercase">Target Divisions</h2>
              <img src={ventureLogo} alt="Venture" className="w-24 h-24 rounded-full bg-white p-3" />
            </div>

            <div className="grid grid-cols-3 gap-12">
              <div className={`bg-white rounded-3xl p-12 shadow-2xl transition-all duration-300 ${
                data.targetDivisions.naia ? 'scale-105' : 'opacity-70'
              }`}>
                <div className="flex flex-col items-center space-y-6">
                  <div className={`w-28 h-28 rounded-2xl flex items-center justify-center ${
                    data.targetDivisions.naia ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {data.targetDivisions.naia && <Check className="w-16 h-16 text-white" strokeWidth={4} />}
                  </div>
                  <h3 className="text-5xl font-black text-[#003366]">NAIA</h3>
                  <p className="text-center text-gray-600 font-semibold">National Association of<br />Intercollegiate Athletics</p>
                </div>
              </div>

              <div className={`bg-white rounded-3xl p-12 shadow-2xl transition-all duration-300 ${
                data.targetDivisions.ncaa ? 'scale-105' : 'opacity-70'
              }`}>
                <div className="flex flex-col items-center space-y-6">
                  <div className={`w-28 h-28 rounded-2xl flex items-center justify-center ${
                    data.targetDivisions.ncaa ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {data.targetDivisions.ncaa && <Check className="w-16 h-16 text-white" strokeWidth={4} />}
                  </div>
                  <h3 className="text-5xl font-black text-[#003366]">NCAA</h3>
                  <p className="text-center text-gray-600 font-semibold">National Collegiate<br />Athletic Association</p>
                </div>
              </div>

              <div className={`bg-white rounded-3xl p-12 shadow-2xl transition-all duration-300 ${
                data.targetDivisions.jucaa ? 'scale-105' : 'opacity-70'
              }`}>
                <div className="flex flex-col items-center space-y-6">
                  <div className={`w-28 h-28 rounded-2xl flex items-center justify-center ${
                    data.targetDivisions.jucaa ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {data.targetDivisions.jucaa && <Check className="w-16 h-16 text-white" strokeWidth={4} />}
                  </div>
                  <h3 className="text-5xl font-black text-[#003366]">JUCAA</h3>
                  <p className="text-center text-gray-600 font-semibold">National Junior College<br />Athletic Association</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 7: Success Stories Visual */}
        <div className="assessment-slide bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#003366] to-[#0066cc] rounded-bl-[300px]"></div>
          
          <div className="relative z-10 flex items-center justify-center h-full px-24">
            <div className="bg-white rounded-3xl shadow-2xl p-16 max-w-4xl">
              <h2 className="text-7xl font-black text-[#003366] text-center mb-12">Our Committed Players</h2>
              <div className="space-y-8 text-center">
                <div className="text-5xl font-black text-[#0066cc]">200+</div>
                <p className="text-3xl font-bold text-gray-700">Players Successfully Placed</p>
                <div className="h-2 w-48 bg-gradient-to-r from-[#003366] to-[#0066cc] rounded-full mx-auto"></div>
                <p className="text-2xl text-gray-600 font-semibold mt-8">
                  NCAA • NAIA • JUCAA Programs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 8: Estimated Costs */}
        <div className="assessment-slide bg-[#f5f5f5] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#003366] to-[#0066cc]"></div>
          <div className="absolute top-8 left-12">
            <img src={ventureLogo} alt="Venture" className="w-16 h-16 rounded-full bg-white p-2" />
          </div>

          <div className="relative z-10 pt-40 px-24 pb-20">
            <h2 className="text-6xl font-black text-[#003366] mb-12 uppercase">Estimated Costs</h2>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-red-500">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">SAT</h3>
                  <span className="text-4xl font-black text-[#003366]">$160</span>
                </div>
                <span className="inline-block px-6 py-2 bg-red-500 text-white text-sm font-bold rounded-full uppercase">Required</span>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-red-500">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Eligibility Center (NAIA)</h3>
                  <span className="text-4xl font-black text-[#003366]">$160</span>
                </div>
                <span className="inline-block px-6 py-2 bg-red-500 text-white text-sm font-bold rounded-full uppercase">Required</span>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-red-500">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Visa & SEVIS</h3>
                  <span className="text-4xl font-black text-[#003366]">$550</span>
                </div>
                <span className="inline-block px-6 py-2 bg-red-500 text-white text-sm font-bold rounded-full uppercase">Required</span>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-red-500">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Transcripts Evaluation</h3>
                  <span className="text-4xl font-black text-[#003366]">$160</span>
                </div>
                <span className="inline-block px-6 py-2 bg-red-500 text-white text-sm font-bold rounded-full uppercase">Required</span>
              </div>

              <div className="col-span-2 bg-gradient-to-br from-[#003366] to-[#0066cc] rounded-2xl p-10 shadow-2xl text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-4xl font-black mb-3">University Yearly Budget</h3>
                    <p className="text-white/90 text-xl font-semibold">Depends on the school</p>
                  </div>
                  <span className="text-6xl font-black">$10K-$20K</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 9: Testimonial 2 */}
        <div className="assessment-slide bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-[#003366]"></div>
          <div className="absolute top-8 right-12">
            <img src={ventureLogo} alt="Venture" className="w-16 h-16 rounded-full bg-white p-2" />
          </div>

          <div className="relative z-10 pt-32 px-24 pb-20 flex items-center justify-center">
            <div className="bg-gradient-to-br from-gray-50 to-white p-16 rounded-3xl shadow-2xl border-l-8 border-[#0066cc] max-w-5xl">
              <h3 className="text-4xl font-black text-[#003366] mb-8">GABRIEL / FABIO</h3>
              <p className="text-2xl leading-relaxed text-gray-700 italic mb-8">
                "Going to the US is not an easy move, but Joao and Venture Soccer made me feel comfortable even when I was not sure of my decision. They always supported me and pushed me back up when I needed to. It's much more than a relationship between player and company. For me it was like a second family, and I won't forget the work and trust they put on me, without them I wouldn't be living my dream."
              </p>
              <div className="text-3xl font-black text-[#0066cc]">HOFSTRA NCAA</div>
            </div>
          </div>
        </div>

        {/* Slide 10: Package Options */}
        <div className="assessment-slide bg-gradient-to-br from-[#f5f5f5] to-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#003366] to-[#0066cc]"></div>
          <div className="absolute top-8 left-12">
            <img src={ventureLogo} alt="Venture" className="w-16 h-16 rounded-full bg-white p-2" />
          </div>

          <div className="relative z-10 pt-40 px-24 pb-16">
            <h2 className="text-6xl font-black text-[#003366] mb-12 uppercase">Venture Packages</h2>
            
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#003366] to-[#0066cc] text-white">
                  <tr>
                    <th className="text-left p-6 text-2xl font-black">Services</th>
                    <th className="text-center p-6 text-2xl font-black">Package 1</th>
                    <th className="text-center p-6 text-2xl font-black">Package 2</th>
                    <th className="text-center p-6 text-2xl font-black">Package 3</th>
                  </tr>
                </thead>
                <tbody className="text-lg">
                  {[
                    ["English Exam", "INCLUDED", "NOT INCLUDED", "NOT INCLUDED"],
                    ["Video Editing", "INCLUDED", "INCLUDED", "NOT INCLUDED"],
                    ["University Admissions Support", "INCLUDED", "INCLUDED", "NOT INCLUDED"],
                    ["Documents Translation", "INCLUDED", "NOT INCLUDED", "NOT INCLUDED"],
                    ["Coaches Connections", "INCLUDED", "INCLUDED", "INCLUDED"],
                    ["Eligibility Center", "INCLUDED", "NOT INCLUDED", "NOT INCLUDED"],
                    ["University Offers", "INCLUDED", "INCLUDED", "INCLUDED"],
                    ["Visa Support", "INCLUDED", "INCLUDED", "NOT INCLUDED"],
                    ["Support in the USA", "INCLUDED", "INCLUDED", "NOT INCLUDED"],
                    ["Placement", "GUARANTEED", "GUARANTEED", "GUARANTEED"],
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-5 font-bold text-gray-900">{row[0]}</td>
                      <td className="p-5 text-center font-semibold">{row[1]}</td>
                      <td className="p-5 text-center font-semibold">{row[2]}</td>
                      <td className="p-5 text-center font-semibold">{row[3]}</td>
                    </tr>
                  ))}
                  <tr className="bg-gradient-to-r from-[#003366] to-[#0066cc] text-white">
                    <td className="p-6 font-black text-xl">Venture Fee</td>
                    <td className="p-6 text-center font-black text-2xl">Contact Us</td>
                    <td className="p-6 text-center font-black text-2xl">Contact Us</td>
                    <td className="p-6 text-center font-black text-2xl">Contact Us</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Slide 11: Success Logos */}
        <div className="assessment-slide bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#003366] to-[#0066cc] opacity-10"></div>
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-24 py-20">
            <h2 className="text-7xl font-black text-[#003366] mb-20 text-center">Our Players Across America</h2>
            
            <div className="grid grid-cols-4 gap-12 max-w-6xl">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-xl flex items-center justify-center border-2 border-[#003366]/20">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#003366] to-[#0066cc] rounded-xl flex items-center justify-center">
                    <span className="text-white font-black text-3xl">NCAA</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 12: Step by Step */}
        <div className="assessment-slide bg-[#f5f5f5] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#003366] to-[#0066cc]"></div>
          <div className="absolute top-8 left-12">
            <img src={ventureLogo} alt="Venture" className="w-16 h-16 rounded-full bg-white p-2" />
          </div>

          <div className="relative z-10 pt-40 px-24 pb-20">
            <h2 className="text-6xl font-black text-[#003366] mb-16 uppercase">Step by Step Timeline</h2>
            <h3 className="text-4xl font-bold text-[#0066cc] mb-12">2025 - 2027</h3>
            
            <div className="grid grid-cols-2 gap-8">
              {[
                "Start the Process",
                "Coaches Meetings",
                "Video Editing & Online Profile",
                "Recruitment Starts",
                "Transcripts Organization",
                "Coaches Connections",
                "Application Support",
                "Travel Preparation",
                "Start College Journey"
              ].map((step, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 shadow-xl flex items-center gap-6 border-l-4 border-[#003366]">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#003366] to-[#0066cc] flex items-center justify-center text-white text-2xl font-black flex-shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 13: Join Our Team */}
        <div className="assessment-slide bg-gradient-to-br from-[#003366] to-[#0066cc] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-1/3 w-[800px] h-[800px] bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-24 space-y-16">
            <img src={ventureLogo} alt="Venture" className="w-40 h-40 rounded-full bg-white p-6 shadow-2xl" />
            
            <div>
              <h1 className="text-9xl font-black text-white mb-8 uppercase leading-none">
                Join Our Team
              </h1>
              <div className="h-2 w-48 bg-white/80 mx-auto rounded-full mb-12"></div>
              <p className="text-4xl font-bold text-white/95 mb-8">Start Your Journey to College Soccer</p>
              <p className="text-3xl text-white/85">NCAA • NAIA • JUCAA</p>
            </div>
          </div>
        </div>

        {/* Slide 14: Back Cover */}
        <div className="assessment-slide bg-gradient-to-br from-[#003366] via-[#004488] to-[#0066cc] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-12">
            <div className="bg-white rounded-full p-10 shadow-2xl">
              <img src={ventureLogo} alt="Venture Logo" className="w-40 h-40" />
            </div>
            <div className="space-y-6">
              <h1 className="text-8xl font-black text-white tracking-tight uppercase">
                Assessment<br />Report
              </h1>
              <div className="h-2 w-32 bg-white/80 mx-auto rounded-full"></div>
              <p className="text-4xl font-bold text-white/90 uppercase tracking-widest">Venture</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
