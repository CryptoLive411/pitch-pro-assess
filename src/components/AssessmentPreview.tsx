import { useState } from "react";
import { AssessmentData } from "./AssessmentEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ChevronLeft, ChevronRight } from "lucide-react";

interface AssessmentPreviewProps {
  data: AssessmentData;
  onBack: () => void;
}

export const AssessmentPreview = ({ data, onBack }: AssessmentPreviewProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { type: "cover", editable: false },
    { type: "player-info", editable: true },
    { type: "recommendation", editable: true },
    { type: "department-notes", editable: true },
    { type: "testimonials-1", editable: false },
    { type: "target-divisions", editable: true },
    { type: "committed", editable: false },
    { type: "costs", editable: false },
    { type: "testimonial-2", editable: false },
    { type: "packages", editable: false },
    { type: "logos", editable: false },
    { type: "timeline", editable: false },
    { type: "join", editable: false },
    { type: "back-cover", editable: false },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top Navigation */}
      <div className="print:hidden bg-[#1e3a5f] text-white p-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="secondary" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Editor
          </Button>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">
              Slide {currentSlide + 1} of {slides.length}
            </span>
            <Button variant="secondary" onClick={handlePrint} className="gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Container */}
      <div className="relative flex items-center justify-center min-h-[calc(100vh-72px)] p-8">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="icon"
          className="print:hidden absolute left-8 z-10 w-16 h-16 rounded-full bg-white shadow-2xl hover:bg-gray-100"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        {/* Slide Card */}
        <div className="relative w-full max-w-7xl aspect-[16/9] bg-white rounded-2xl shadow-2xl overflow-hidden">
          {currentSlide === 0 && <CoverSlide />}
          {currentSlide === 1 && <PlayerInfoSlide data={data} />}
          {currentSlide === 2 && <RecommendationSlide data={data} />}
          {currentSlide === 3 && <DepartmentNotesSlide data={data} />}
          {currentSlide === 4 && <TestimonialsSlide1 />}
          {currentSlide === 5 && <TargetDivisionsSlide data={data} />}
          {currentSlide === 6 && <CommittedSlide />}
          {currentSlide === 7 && <CostsSlide />}
          {currentSlide === 8 && <TestimonialSlide2 />}
          {currentSlide === 9 && <PackagesSlide />}
          {currentSlide === 10 && <LogosSlide />}
          {currentSlide === 11 && <TimelineSlide />}
          {currentSlide === 12 && <JoinSlide />}
          {currentSlide === 13 && <BackCoverSlide />}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="icon"
          className="print:hidden absolute right-8 z-10 w-16 h-16 rounded-full bg-white shadow-2xl hover:bg-gray-100"
          onClick={nextSlide}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="print:hidden flex justify-center gap-2 pb-8">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentSlide ? "bg-[#1e3a5f] w-8" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
};

// Slide Components
const CoverSlide = () => (
  <div className="w-full h-full relative bg-gradient-to-br from-cyan-50 via-cyan-100 to-blue-100">
    <div className="absolute bottom-0 left-0 w-full h-2/3 bg-[#1e3a5f] rounded-tr-[200px]"></div>
    <div className="relative z-10 flex flex-col items-center justify-center h-full">
      <div className="w-40 h-40 mb-8 bg-white rounded-full flex items-center justify-center">
        <div className="w-32 h-32 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white font-black text-4xl">V</div>
      </div>
      <h1 className="text-7xl font-black text-[#1e3a5f] uppercase tracking-tight mb-2">
        ASSESSMENT REPORT
      </h1>
      <div className="text-5xl font-black text-[#1e3a5f] uppercase tracking-widest">
        VENTURE
      </div>
    </div>
  </div>
);

const PlayerInfoSlide = ({ data }: { data: AssessmentData }) => (
  <div className="w-full h-full bg-[#e8f4f8] relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1e3a5f] rounded-bl-[200px]"></div>
    <div className="absolute top-0 left-0 bg-[#1e3a5f] w-32 h-32 rounded-br-full"></div>

    <div className="relative z-10 flex items-center h-full px-16 gap-12">
      <div className="flex-1 flex justify-center">
        {data.playerPhoto ? (
          <div className="bg-[#1e3a5f] p-4 rounded-[32px] shadow-2xl">
            <img
              src={data.playerPhoto}
              alt={data.playerName}
              className="w-[350px] h-[450px] object-cover rounded-[24px]"
            />
          </div>
        ) : (
          <div className="bg-[#1e3a5f] p-4 rounded-[32px] shadow-2xl">
            <div className="w-[350px] h-[450px] bg-white rounded-[24px] flex items-center justify-center">
              <span className="text-gray-400 text-xl">No Photo</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 text-white text-right space-y-6 pr-12">
        <h2 className="text-6xl font-black leading-none mb-8">
          {data.playerName || "(NAME OF PLAYER)"}
        </h2>
        <div className="space-y-4 text-xl">
          <p>• <span className="font-bold">Enrollment year/options:</span><br/>{data.enrollmentYear || "August 2027"}</p>
          <p>• <span className="font-bold">School Year:</span> {data.schoolYear || "Freshman"}</p>
          <p>• <span className="font-bold">High School GPA:</span> {data.gpa || "3.5+ GPA"}</p>
          <p>• <span className="font-bold">Manager:</span> {data.manager || "(NAME of AGENT)"}</p>
        </div>
      </div>
    </div>
  </div>
);

const RecommendationSlide = ({ data }: { data: AssessmentData }) => (
  <div className="w-full h-full bg-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-2/3 h-40 bg-[#1e3a5f] rounded-bl-full"></div>
    
    <div className="relative z-10 flex flex-col items-center justify-center h-full px-16 space-y-8">
      <div className="text-center">
        <div className="text-5xl font-black text-[#1e3a5f] mb-6">{data.playerName || "PLAYER NAME"}</div>
        <div className="inline-block bg-[#1e3a5f] text-white px-16 py-8 rounded-2xl mb-8">
          <div className="text-4xl font-black">
            {data.targetDivisions.naia && "NAIA"}
            {data.targetDivisions.ncaa && (data.targetDivisions.naia ? " / NCAA" : "NCAA")}
            {data.targetDivisions.jucaa && " / JUCAA"}
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-600 mb-4">Player's recommendation</div>
        <div className="text-2xl text-gray-500">Presented by <span className="font-bold">venture</span></div>
      </div>
    </div>
  </div>
);

const DepartmentNotesSlide = ({ data }: { data: AssessmentData }) => (
  <div className="w-full h-full bg-[#e8f4f8] relative overflow-hidden">
    <div className="absolute top-0 left-0 bg-[#1e3a5f] w-32 h-32 rounded-br-full"></div>
    <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-[#1e3a5f] to-[#2a4f7f] rounded-tl-[200px]"></div>

    <div className="relative z-10 px-16 py-12 h-full flex flex-col">
      <h2 className="text-4xl font-black text-[#1e3a5f] mb-8">
        Venture Soccer Department<br />Recommendations
      </h2>
      
      <div className="flex-1 bg-white rounded-2xl p-8 shadow-xl overflow-auto">
        {data.departmentNotes.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="text-base leading-relaxed text-gray-800 mb-3">
            • {paragraph}
          </p>
        ))}
      </div>
    </div>
  </div>
);

const TestimonialsSlide1 = () => (
  <div className="w-full h-full bg-white relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-24 bg-[#1e3a5f]"></div>

    <div className="relative z-10 pt-32 px-16 pb-12 grid grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-2xl font-black text-[#1e3a5f]">JOAO DOMINGUES</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          FIU VENTURE USA HAD AN IMPORTANT IMPACT IN MY LIFE HELPING ME GET A GOOD UNIVERSITY TO PLAY SOCCER WHILE STUDYING. DURING THE PROCESS, IT WAS NOTICED THEIR HARD WORK ON GETTING THE BEST UNIVERSITIES POSSIBLE. ALSO, THEY HAVE VERY HONEST PEOPLE, AND HE ALWAYS TOLD ME THE REAL TRUTH ABOUT THE POSITIVE AND NEGATIVE THINGS OF THE DIFFERENT UNIVERSITIES, COACHES AND FACILITIES. NOW I STILL KEEP A VERY GOOD CONNECTION WITH THEM. AT THIS POINT HE IS NOT ONLY AN "AGENT" BUT A FRIEND THAT I AM REALLY THANKFUL FOR ALL THE HELP.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-black text-[#1e3a5f]">FILIP JAUK</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          I REALLY ENJOYED WORKING WITH VENTURE SOCCER. WITHOUT THEM I WOULDN'T HAVE BEEN ABLE TO HAVE A FULL SCHOLARSHIP AT SUCH A GREAT SCHOOL AT ONE OF THE BEST SOCCER PROGRAMS. THEY WERE WITH ME FROM THE BEGINNING AND EVERY TIME MADE SURE THAT EVERYTHING IS PERFECT FOR MY EDUCATION AND MY SOCCER IMPROVEMENT. AM REALLY THANKFUL FOR ALL THE HELP.
        </p>
      </div>
    </div>
  </div>
);

const TargetDivisionsSlide = ({ data }: { data: AssessmentData }) => (
  <div className="w-full h-full bg-[#e8f4f8] relative overflow-hidden">
    <div className="absolute top-0 left-0 bg-[#1e3a5f] w-32 h-32 rounded-br-full"></div>
    <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-[#1e3a5f] rounded-tl-[200px]"></div>

    <div className="relative z-10 px-16 py-12 h-full flex flex-col justify-center">
      <h2 className="text-5xl font-black text-[#1e3a5f] mb-12 uppercase">Target Divisions</h2>
      
      <div className="grid grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
          <div className={`w-24 h-24 mx-auto mb-4 border-8 rounded-2xl flex items-center justify-center ${
            data.targetDivisions.naia ? 'border-[#1e3a5f] bg-[#1e3a5f]' : 'border-gray-300'
          }`}>
            {data.targetDivisions.naia && <span className="text-white text-4xl font-black">✓</span>}
          </div>
          <h3 className="text-4xl font-black text-[#1e3a5f]">NAIA</h3>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
          <div className={`w-24 h-24 mx-auto mb-4 border-8 rounded-2xl flex items-center justify-center ${
            data.targetDivisions.ncaa ? 'border-[#1e3a5f] bg-[#1e3a5f]' : 'border-gray-300'
          }`}>
            {data.targetDivisions.ncaa && <span className="text-white text-4xl font-black">✓</span>}
          </div>
          <h3 className="text-4xl font-black text-[#1e3a5f]">NCAA</h3>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
          <div className={`w-24 h-24 mx-auto mb-4 border-8 rounded-2xl flex items-center justify-center ${
            data.targetDivisions.jucaa ? 'border-[#1e3a5f] bg-[#1e3a5f]' : 'border-gray-300'
          }`}>
            {data.targetDivisions.jucaa && <span className="text-white text-4xl font-black">✓</span>}
          </div>
          <h3 className="text-4xl font-black text-[#1e3a5f]">JUCAA</h3>
        </div>
      </div>
    </div>
  </div>
);

const CommittedSlide = () => (
  <div className="w-full h-full bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center">
    <div className="text-center">
      <div className="text-8xl font-black text-[#1e3a5f] mb-6">200+</div>
      <h2 className="text-5xl font-black text-[#0099cc] uppercase">Committed</h2>
    </div>
  </div>
);

const CostsSlide = () => (
  <div className="w-full h-full bg-[#e8f4f8] relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-24 bg-[#1e3a5f]"></div>

    <div className="relative z-10 pt-32 px-16 pb-12">
      <h2 className="text-4xl font-black text-[#1e3a5f] mb-8 uppercase">Estimated Costs</h2>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#1e3a5f] text-white">
            <tr>
              <th className="text-left p-3 font-bold">PRICE</th>
              <th className="text-center p-3 font-bold">AMOUNT</th>
              <th className="text-right p-3 font-bold">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-3">SAT</td><td className="text-center p-3">160</td><td className="text-right p-3"><span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">REQUIRED</span></td></tr>
            <tr className="border-b bg-gray-50"><td className="p-3">ELIGIBILITY CENTER (NAIA)</td><td className="text-center p-3">160</td><td className="text-right p-3"><span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">REQUIRED</span></td></tr>
            <tr className="border-b"><td className="p-3">VISA & SEVIS</td><td className="text-center p-3">550</td><td className="text-right p-3"><span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">REQUIRED</span></td></tr>
            <tr className="border-b bg-gray-50"><td className="p-3">TRANSCRIPTS EVALUATION</td><td className="text-center p-3">160</td><td className="text-right p-3"><span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">REQUIRED</span></td></tr>
            <tr className="border-b"><td className="p-3 font-bold">UNIVERSITY YEARLY BUDGET</td><td className="text-center p-3">$10K-$20K</td><td className="text-right p-3 text-xs">DEPENDS ON SCHOOL</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const TestimonialSlide2 = () => (
  <div className="w-full h-full bg-white flex items-center justify-center px-16">
    <div className="max-w-4xl space-y-6">
      <h3 className="text-3xl font-black text-[#1e3a5f]">GABRIEL / FABIO</h3>
      <p className="text-lg text-gray-700 leading-relaxed">
        GOING TO THE US IS NOT AN EASY MOVE, BUT JOAO AND VENTURE SOCCER MADE ME FEEL COMFORTABLE EVEN WHEN I WAS NOT SURE OF MY DECISION. THEY ALWAYS SUPPORTED ME AND PUSHED ME BACK UP WHEN I NEEDED TO. IT'S MUCH MORE THAN A RELATIONSHIP BETWEEN PLAYER AND COMPANY. FOR ME IT WAS LIKE A SECOND FAMILY, AND I WON'T FORGET THE WORK AND TRUST THEY PUT ON ME, WITHOUT THEM I WOULDN'T BE LIVING MY DREAM.
      </p>
      <div className="text-2xl font-black text-[#0099cc]">HOFSTRA NCAA</div>
    </div>
  </div>
);

const PackagesSlide = () => (
  <div className="w-full h-full bg-[#e8f4f8] relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-24 bg-[#1e3a5f]"></div>

    <div className="relative z-10 pt-32 px-12 pb-8">
      <h2 className="text-3xl font-black text-[#1e3a5f] mb-6">PACKAGES</h2>
      
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-[#1e3a5f] text-white">
            <tr>
              <th className="text-left p-2 font-bold">SERVICE</th>
              <th className="text-center p-2 font-bold">PKG 1</th>
              <th className="text-center p-2 font-bold">PKG 2</th>
              <th className="text-center p-2 font-bold">PKG 3</th>
            </tr>
          </thead>
          <tbody>
            {[["ENGLISH EXAM","✓","✗","✗"],["VIDEO EDITING","✓","✓","✗"],["ADMISSIONS","✓","✓","✗"],["TRANSLATION","✓","✗","✗"],["COACHES","✓","✓","✓"],["ELIGIBILITY","✓","✗","✗"],["OFFERS","✓","✓","✓"],["VISA","✓","✓","✗"],["USA SUPPORT","✓","✓","✗"],["PLACEMENT","✓","✓","✓"]].map((r,i)=>(
              <tr key={i} className={i%2===0?"bg-gray-50":""}><td className="p-2">{r[0]}</td><td className="text-center p-2">{r[1]}</td><td className="text-center p-2">{r[2]}</td><td className="text-center p-2">{r[3]}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const LogosSlide = () => (
  <div className="w-full h-full bg-gradient-to-br from-cyan-50 to-blue-50 px-16 py-12">
    <h2 className="text-4xl font-black text-[#1e3a5f] text-center mb-12">Our Network</h2>
    <div className="grid grid-cols-4 gap-6">
      {Array.from({length:12}).map((_,i)=>(
        <div key={i} className="bg-white rounded-xl p-4 shadow-lg flex items-center justify-center">
          <div className="text-center"><div className="text-2xl font-black text-[#1e3a5f]">NCAA</div></div>
        </div>
      ))}
    </div>
  </div>
);

const TimelineSlide = () => (
  <div className="w-full h-full bg-[#e8f4f8] relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-24 bg-[#1e3a5f]"></div>

    <div className="relative z-10 pt-32 px-16 pb-12">
      <h2 className="text-4xl font-black text-[#1e3a5f] mb-4">STEP BY STEP</h2>
      <h3 className="text-2xl font-bold text-[#0099cc] mb-8">2025 - 2027</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {["START PROCESS","COACHES MEETINGS","VIDEO EDITING","RECRUITMENT","TRANSCRIPTS","CONNECTIONS","APPLICATIONS","TRAVEL PREP","START COLLEGE"].map((s,i)=>(
          <div key={i} className="bg-white rounded-xl p-4 flex items-center gap-3 border-l-4 border-[#1e3a5f]">
            <div className="w-8 h-8 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center text-sm font-black">{i+1}</div>
            <span className="text-sm font-bold">• {s}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const JoinSlide = () => (
  <div className="w-full h-full bg-gradient-to-br from-[#1e3a5f] to-[#2a4f7f] flex flex-col items-center justify-center">
    <h1 className="text-7xl font-black text-white uppercase mb-8">Join Our<br/>Team</h1>
    <div className="h-2 w-40 bg-white/80 rounded-full"></div>
  </div>
);

const BackCoverSlide = () => (
  <div className="w-full h-full relative bg-gradient-to-br from-cyan-50 via-cyan-100 to-blue-100">
    <div className="absolute bottom-0 left-0 w-full h-2/3 bg-[#1e3a5f] rounded-tr-[200px]"></div>
    <div className="relative z-10 flex flex-col items-center justify-center h-full">
      <div className="w-40 h-40 mb-8 bg-white rounded-full flex items-center justify-center">
        <div className="w-32 h-32 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white font-black text-4xl">V</div>
      </div>
      <h1 className="text-7xl font-black text-[#1e3a5f] uppercase">ASSESSMENT REPORT</h1>
      <div className="text-5xl font-black text-[#1e3a5f] uppercase">VENTURE</div>
    </div>
  </div>
);
