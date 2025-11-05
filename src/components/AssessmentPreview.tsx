import { useState } from "react";
import { AssessmentData } from "./AssessmentEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ChevronLeft, ChevronRight } from "lucide-react";
import ventureLogo from "@/assets/venture-logo-white.png";
import ventureLogoCircle from "@/assets/venture-logo-circle.png";

interface AssessmentPreviewProps {
  data: AssessmentData;
  onBack: () => void;
}

export const AssessmentPreview = ({ data, onBack }: AssessmentPreviewProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { type: "cover", title: "Cover" },
    { type: "player-info", title: "Player Information" },
    { type: "recommendation", title: "Recommendation" },
    { type: "target-divisions", title: "Target Divisions" },
    { type: "department-notes", title: "Department Notes" },
    { type: "testimonial-joao", title: "Testimonial - Joao" },
    { type: "testimonial-filip", title: "Testimonial - Filip" },
    { type: "committed", title: "Success Stats" },
    { type: "costs", title: "Estimated Costs" },
    { type: "testimonial-gabriel", title: "Testimonial - Gabriel" },
    { type: "packages", title: "Service Packages" },
    { type: "timeline", title: "Timeline" },
    { type: "contact", title: "Ready to Start?" },
    { type: "back-cover", title: "Back Cover" },
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation */}
      <div className="print:hidden bg-[hsl(var(--venture-navy))] text-white p-4 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto flex items-center justify-between">
          <Button 
            onClick={onBack} 
            className="gap-2 bg-white/10 hover:bg-white/20 border border-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Editor
          </Button>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold tracking-wide">
              {slides[currentSlide].title} • {currentSlide + 1} / {slides.length}
            </span>
            <Button 
              onClick={handlePrint} 
              className="gap-2 bg-white/10 hover:bg-white/20 border border-white/20"
            >
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Container */}
      <div className="relative flex items-center justify-center min-h-[calc(100vh-72px)] p-4 md:p-8">
        {/* Previous Button */}
        <Button
          variant="ghost"
          size="icon"
          className="print:hidden absolute left-2 md:left-8 z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 backdrop-blur shadow-xl hover:bg-white hover:scale-110 transition-all duration-200"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8 text-[hsl(var(--venture-navy))]" />
        </Button>

        {/* Slide Card with Animation */}
        <div className="relative w-full max-w-7xl aspect-[16/9] bg-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
          <div className="w-full h-full animate-fade-in">
            {currentSlide === 0 && <CoverSlide data={data} />}
            {currentSlide === 1 && <PlayerInfoSlide data={data} />}
            {currentSlide === 2 && <RecommendationSlide data={data} />}
            {currentSlide === 3 && <TargetDivisionsSlide data={data} />}
            {currentSlide === 4 && <DepartmentNotesSlide data={data} />}
            {currentSlide === 5 && <TestimonialJoaoSlide />}
            {currentSlide === 6 && <TestimonialFilipSlide />}
            {currentSlide === 7 && <CommittedSlide />}
            {currentSlide === 8 && <CostsSlide />}
            {currentSlide === 9 && <TestimonialGabrielSlide />}
            {currentSlide === 10 && <PackagesSlide />}
            {currentSlide === 11 && <TimelineSlide />}
            {currentSlide === 12 && <ContactSlide />}
            {currentSlide === 13 && <BackCoverSlide />}
          </div>
        </div>

        {/* Next Button */}
        <Button
          variant="ghost"
          size="icon"
          className="print:hidden absolute right-2 md:right-8 z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 backdrop-blur shadow-xl hover:bg-white hover:scale-110 transition-all duration-200"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8 text-[hsl(var(--venture-navy))]" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="print:hidden flex justify-center gap-2 pb-8">
        {slides.map((slide, idx) => (
          <button
            key={idx}
            title={slide.title}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide 
                ? "bg-[hsl(var(--venture-navy))] w-8" 
                : "bg-gray-300 w-2 hover:bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
};

// Slide Components
const CoverSlide = ({ data }: { data: AssessmentData }) => (
  <div className="w-full h-full relative bg-gradient-to-br from-gray-100 via-blue-50 to-cyan-50 overflow-hidden">
    {/* Decorative curved shape */}
    <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[hsl(var(--venture-navy))] rounded-full opacity-10"></div>
    <div className="absolute -top-20 -right-20 w-96 h-96 bg-[hsl(var(--venture-blue))] rounded-full opacity-10"></div>
    
    <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
      {/* Venture Logo with Glow Effect */}
      <div className="mb-8 relative group animate-scale-in">
        {/* Glowing rings */}
        <div className="absolute inset-0 rounded-full bg-[hsl(var(--venture-blue))] opacity-30 blur-2xl animate-pulse"></div>
        <div className="absolute inset-0 rounded-full bg-[hsl(var(--venture-blue))] opacity-20 blur-3xl scale-110 animate-pulse"></div>
        <div className="absolute inset-0 rounded-full bg-white opacity-40 blur-xl scale-90 animate-pulse"></div>
        
        {/* Logo container */}
        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full shadow-2xl group-hover:scale-105 transition-transform duration-300">
          <img 
            src={ventureLogoCircle} 
            alt="Venture USA" 
            className="w-full h-full object-contain rounded-full" 
          />
        </div>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black text-[hsl(var(--venture-navy))] uppercase tracking-tight mb-4 text-center animate-fade-in">
        ASSESSMENT REPORT
      </h1>
      
      <div className="h-1 w-32 bg-[hsl(var(--venture-blue))] rounded-full mb-6 animate-fade-in"></div>
      
      <p className="text-xl md:text-2xl text-gray-600 font-semibold text-center max-w-2xl animate-fade-in">
        College Soccer Placement Consulting
      </p>
      
      {/* Player Name */}
      {data.playerName && (
        <div className="mt-6 animate-fade-in">
          <p className="text-3xl md:text-4xl font-black text-[hsl(var(--venture-blue))] uppercase tracking-wide text-center">
            {data.playerName}
          </p>
        </div>
      )}
    </div>
  </div>
);

const PlayerInfoSlide = ({ data }: { data: AssessmentData }) => (
  <div className="w-full h-full bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
    {/* Decorative elements */}
    <div className="absolute top-0 right-0 w-1/3 h-full bg-[hsl(var(--venture-navy))] opacity-5 rounded-bl-[100px]"></div>
    
    <div className="relative z-10 flex flex-col md:flex-row items-center h-full px-8 md:px-16 py-8 gap-8">
      {/* Player Photo */}
      <div className="flex-1 flex justify-center items-center">
        {data.playerPhoto ? (
          <div className="relative group">
            <div className="absolute inset-0 bg-[hsl(var(--venture-blue))] rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] p-2 rounded-3xl shadow-2xl">
              <img
                src={data.playerPhoto}
                alt={data.playerName}
                className="w-64 h-80 md:w-80 md:h-96 object-cover rounded-2xl"
              />
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] p-2 rounded-3xl shadow-2xl">
            <div className="w-64 h-80 md:w-80 md:h-96 bg-white/90 rounded-2xl flex items-center justify-center">
              <span className="text-gray-400 text-lg font-semibold">Player Photo</span>
            </div>
          </div>
        )}
      </div>

      {/* Player Info */}
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <div className="inline-block px-4 py-1 bg-[hsl(var(--venture-blue))]/10 text-[hsl(var(--venture-navy))] text-sm font-bold rounded-full mb-2">
            PLAYER PROFILE
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[hsl(var(--venture-navy))] leading-tight">
            {data.playerName || "Player Name"}
          </h2>
        </div>
        
        <div className="space-y-4 text-base md:text-lg">
          <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--venture-blue))] mt-2"></div>
            <div>
              <span className="font-bold text-[hsl(var(--venture-navy))]">Enrollment:</span>
              <p className="text-gray-700">{data.enrollmentYear || "August 2027"}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--venture-blue))] mt-2"></div>
            <div>
              <span className="font-bold text-[hsl(var(--venture-navy))]">School Year:</span>
              <p className="text-gray-700">{data.schoolYear || "Freshman"}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--venture-blue))] mt-2"></div>
            <div>
              <span className="font-bold text-[hsl(var(--venture-navy))]">GPA:</span>
              <p className="text-gray-700">{data.gpa || "3.5+"}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--venture-blue))] mt-2"></div>
            <div>
              <span className="font-bold text-[hsl(var(--venture-navy))]">Manager:</span>
              <p className="text-gray-700">{data.manager || "Venture Team"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RecommendationSlide = ({ data }: { data: AssessmentData }) => (
  <div className="w-full h-full bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] relative overflow-hidden">
    {/* Animated decorative elements */}
    <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full animate-pulse"></div>
    <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
    <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-white/3 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
    <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-white/3 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
    
    {/* Floating dots */}
    <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full"></div>
    <div className="absolute top-40 right-32 w-2 h-2 bg-white/30 rounded-full"></div>
    <div className="absolute bottom-32 left-40 w-2 h-2 bg-white/30 rounded-full"></div>
    <div className="absolute bottom-20 right-20 w-2 h-2 bg-white/30 rounded-full"></div>
    
    {/* Diagonal lines pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-0 left-0 w-full h-px bg-white transform -rotate-45 origin-top-left" style={{ width: '141%' }}></div>
      <div className="absolute top-20 left-0 w-full h-px bg-white transform -rotate-45 origin-top-left" style={{ width: '141%' }}></div>
      <div className="absolute top-40 left-0 w-full h-px bg-white transform -rotate-45 origin-top-left" style={{ width: '141%' }}></div>
    </div>
    
    <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 md:px-16 text-center">
      <div className="space-y-8 max-w-4xl">
        {/* Badge with glow */}
        <div className="inline-block relative animate-fade-in">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
          <div className="relative px-6 py-2 bg-white/10 backdrop-blur text-white text-sm font-bold rounded-full mb-4 border border-white/20">
            OUR RECOMMENDATION
          </div>
        </div>
        
        {/* Player name with underline effect */}
        <div className="relative animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
            {data.playerName || "Player Name"}
          </h2>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
        </div>
        
        {/* Division cards with enhanced styling */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in">
          {data.targetDivisions.map((division, idx) => (
            <div key={division} className="relative group" style={{ animationDelay: `${idx * 100}ms` }}>
              {/* Glow effect behind card */}
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-white/10 rounded-2xl blur-2xl scale-110"></div>
              
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white/40 rounded-tl-lg"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white/40 rounded-tr-lg"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white/40 rounded-bl-lg"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white/40 rounded-br-lg"></div>
              
              {/* Main card */}
              <div className="relative px-8 py-4 bg-white text-[hsl(var(--venture-navy))] rounded-2xl shadow-2xl font-black text-2xl md:text-3xl transform group-hover:scale-105 transition-all duration-300 border-2 border-white/20">
                {division}
              </div>
            </div>
          ))}
        </div>
        
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 my-6 animate-fade-in">
          <div className="w-12 h-px bg-white/30"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-12 h-px bg-white/30"></div>
        </div>
        
        <p className="text-xl md:text-2xl text-white/90 font-semibold animate-fade-in">
          Player Assessment & Recommendation
        </p>
        
        <p className="text-lg text-white/70 animate-fade-in">
          Presented by <span className="font-bold text-white">Venture USA</span>
        </p>
      </div>
    </div>
  </div>
);

const TargetDivisionsSlide = ({ data }: { data: AssessmentData }) => (
  <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 relative overflow-hidden p-8 md:p-16">
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <div className="inline-block px-4 py-1 bg-[hsl(var(--venture-blue))]/10 text-[hsl(var(--venture-navy))] text-sm font-bold rounded-full mb-4">
          PLACEMENT TARGETS
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-[hsl(var(--venture-navy))] uppercase">
          Target Divisions
        </h2>
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {["NCAA D1", "NCAA D2", "NCAA D3", "NAIA D1", "NAIA D2", "JUCO", "Gap Year"].map((division) => {
          const isSelected = data.targetDivisions.includes(division);
          return (
            <div key={division} className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 ${
              isSelected
                ? 'bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] shadow-2xl scale-105' 
                : 'bg-white shadow-lg hover:shadow-xl'
            }`}>
              <div className="text-center space-y-6">
                <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl font-black transition-colors ${
                  isSelected
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {isSelected ? '✓' : ''}
                </div>
                <h3 className={`text-2xl md:text-3xl font-black ${
                  isSelected ? 'text-white' : 'text-[hsl(var(--venture-navy))]'
                }`}>
                  {division}
                </h3>
                {isSelected && (
                  <p className="text-white/80 text-sm">Recommended Division</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const DepartmentNotesSlide = ({ data }: { data: AssessmentData }) => (
  <div className="w-full h-full bg-gradient-to-br from-white to-blue-50 relative overflow-hidden p-8 md:p-16">
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <div className="inline-block px-4 py-1 bg-[hsl(var(--venture-blue))]/10 text-[hsl(var(--venture-navy))] text-sm font-bold rounded-full mb-4">
          DEPARTMENT ASSESSMENT
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-[hsl(var(--venture-navy))]">
          Venture Soccer Department
          <br />
          <span className="text-[hsl(var(--venture-blue))]">Recommendations</span>
        </h2>
      </div>
      
      <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-xl overflow-auto border border-gray-100">
        <div className="space-y-4">
          {data.departmentNotes.split('\n\n').map((paragraph, idx) => (
            <div key={idx} className="flex gap-3 items-start group hover:bg-blue-50/50 p-3 rounded-lg transition-colors">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--venture-blue))] mt-2 flex-shrink-0"></div>
              <p className="text-sm md:text-base leading-relaxed text-gray-700">
                {paragraph}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TestimonialJoaoSlide = () => (
  <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 p-8 md:p-16 flex items-center justify-center">
    <div className="max-w-4xl space-y-6">
      <div className="inline-block px-4 py-1 bg-[hsl(var(--venture-blue))]/10 text-[hsl(var(--venture-navy))] text-sm font-bold rounded-full mb-4">
        SUCCESS STORY
      </div>
      <h3 className="text-3xl md:text-4xl font-black text-[hsl(var(--venture-navy))]">JOAO DOMINGUES</h3>
      <p className="text-sm font-semibold text-[hsl(var(--venture-blue))]">Florida International University</p>
      <blockquote className="text-base md:text-lg text-gray-700 leading-relaxed border-l-4 border-[hsl(var(--venture-blue))] pl-6 italic">
        "Venture USA had an important impact in my life helping me get a good university to play soccer while studying. During the process, it was noticed their hard work on getting the best universities possible. Also, they have very honest people, and they always told me the real truth about the positive and negative things of the different universities, coaches and facilities. Now I still keep a very good connection with them. At this point they are not only an 'agent' but a friend that I am really thankful for all the help."
      </blockquote>
    </div>
  </div>
);

const TestimonialFilipSlide = () => (
  <div className="w-full h-full bg-gradient-to-br from-white to-blue-50 p-8 md:p-16 flex items-center justify-center">
    <div className="max-w-4xl space-y-6">
      <div className="inline-block px-4 py-1 bg-[hsl(var(--venture-blue))]/10 text-[hsl(var(--venture-navy))] text-sm font-bold rounded-full mb-4">
        SUCCESS STORY
      </div>
      <h3 className="text-3xl md:text-4xl font-black text-[hsl(var(--venture-navy))]">FILIP JAUK</h3>
      <p className="text-sm font-semibold text-[hsl(var(--venture-blue))]">Florida Atlantic University</p>
      <blockquote className="text-base md:text-lg text-gray-700 leading-relaxed border-l-4 border-[hsl(var(--venture-blue))] pl-6 italic">
        "I really enjoyed working with Venture Soccer. Without them I wouldn't have been able to have a full scholarship at such a great school at one of the best soccer programs. They were with me from the beginning and every time made sure that everything is perfect for my education and my soccer improvement. I am really thankful for all the help."
      </blockquote>
    </div>
  </div>
);

const CommittedSlide = () => (
  <div className="w-full h-full bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] flex items-center justify-center relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
    <div className="text-center relative z-10">
      <div className="text-7xl md:text-9xl font-black text-white mb-6 animate-scale-in">200+</div>
      <h2 className="text-4xl md:text-6xl font-black text-white/90 uppercase tracking-wide">Athletes Placed</h2>
      <p className="text-xl text-white/70 mt-4">Successfully committed to US universities</p>
    </div>
  </div>
);

const CostsSlide = () => (
  <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 p-8 md:p-16">
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <div className="inline-block px-4 py-1 bg-[hsl(var(--venture-blue))]/10 text-[hsl(var(--venture-navy))] text-sm font-bold rounded-full mb-4">
          INVESTMENT
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-[hsl(var(--venture-navy))] uppercase">Estimated Costs</h2>
      </div>
      
      <div className="flex-1 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <table className="w-full text-xs md:text-sm">
          <thead className="bg-gradient-to-r from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] text-white">
            <tr>
              <th className="text-left p-3 md:p-4 font-bold">ITEM</th>
              <th className="text-center p-3 md:p-4 font-bold">AMOUNT</th>
              <th className="text-right p-3 md:p-4 font-bold">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-blue-50/50 transition-colors">
              <td className="p-3 md:p-4 font-semibold">SAT</td>
              <td className="text-center p-3 md:p-4">$160</td>
              <td className="text-right p-3 md:p-4">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">REQUIRED</span>
              </td>
            </tr>
            <tr className="border-b bg-gray-50 hover:bg-blue-50/50 transition-colors">
              <td className="p-3 md:p-4 font-semibold">Eligibility Center (NAIA)</td>
              <td className="text-center p-3 md:p-4">$160</td>
              <td className="text-right p-3 md:p-4">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">REQUIRED</span>
              </td>
            </tr>
            <tr className="border-b hover:bg-blue-50/50 transition-colors">
              <td className="p-3 md:p-4 font-semibold">VISA & SEVIS</td>
              <td className="text-center p-3 md:p-4">$550</td>
              <td className="text-right p-3 md:p-4">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">REQUIRED</span>
              </td>
            </tr>
            <tr className="border-b bg-gray-50 hover:bg-blue-50/50 transition-colors">
              <td className="p-3 md:p-4 font-semibold">Transcripts Evaluation</td>
              <td className="text-center p-3 md:p-4">$160</td>
              <td className="text-right p-3 md:p-4">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">REQUIRED</span>
              </td>
            </tr>
            <tr className="hover:bg-blue-50/50 transition-colors">
              <td className="p-3 md:p-4 font-bold text-[hsl(var(--venture-navy))]">University Yearly Budget</td>
              <td className="text-center p-3 md:p-4 font-bold">$10K-$20K</td>
              <td className="text-right p-3 md:p-4 text-xs text-gray-600">Depends on school</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const TestimonialGabrielSlide = () => (
  <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 p-8 md:p-16 flex items-center justify-center">
    <div className="max-w-4xl space-y-6">
      <div className="inline-block px-4 py-1 bg-[hsl(var(--venture-blue))]/10 text-[hsl(var(--venture-navy))] text-sm font-bold rounded-full mb-4">
        SUCCESS STORY
      </div>
      <h3 className="text-3xl md:text-4xl font-black text-[hsl(var(--venture-navy))]">GABRIEL / FABIO</h3>
      <p className="text-sm font-semibold text-[hsl(var(--venture-blue))]">Hofstra University - NCAA</p>
      <blockquote className="text-base md:text-lg text-gray-700 leading-relaxed border-l-4 border-[hsl(var(--venture-blue))] pl-6 italic">
        "Going to the US is not an easy move, but Joao and Venture Soccer made me feel comfortable even when I was not sure of my decision. They always supported me and pushed me back up when I needed to. It's much more than a relationship between player and company. For me it was like a second family, and I won't forget the work and trust they put on me. Without them I wouldn't be living my dream."
      </blockquote>
    </div>
  </div>
);

const PackagesSlide = () => (
  <div className="w-full h-full bg-gradient-to-br from-white to-blue-50 p-8 md:p-12">
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <div className="inline-block px-4 py-1 bg-[hsl(var(--venture-blue))]/10 text-[hsl(var(--venture-navy))] text-sm font-bold rounded-full mb-4">
          SERVICE OPTIONS
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-[hsl(var(--venture-navy))] uppercase">Service Packages</h2>
      </div>
      
      <div className="flex-1 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <table className="w-full text-xs md:text-sm">
          <thead className="bg-gradient-to-r from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] text-white">
            <tr>
              <th className="text-left p-2 md:p-3 font-bold">SERVICE</th>
              <th className="text-center p-2 md:p-3 font-bold">PACKAGE 1</th>
              <th className="text-center p-2 md:p-3 font-bold">PACKAGE 2</th>
              <th className="text-center p-2 md:p-3 font-bold">PACKAGE 3</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["English Exam Support","✓","✗","✗"],
              ["Video Editing","✓","✓","✗"],
              ["Admissions Support","✓","✓","✗"],
              ["Translation Services","✓","✗","✗"],
              ["Coach Connections","✓","✓","✓"],
              ["Eligibility Center","✓","✗","✗"],
              ["Scholarship Offers","✓","✓","✓"],
              ["VISA Support","✓","✓","✗"],
              ["USA Arrival Support","✓","✓","✗"],
              ["University Placement","✓","✓","✓"]
            ].map((r,i)=>(
              <tr key={i} className={`border-b ${i%2===0?"bg-gray-50":"bg-white"} hover:bg-blue-50/50 transition-colors`}>
                <td className="p-2 md:p-3 font-semibold">{r[0]}</td>
                <td className="text-center p-2 md:p-3 text-lg">{r[1]}</td>
                <td className="text-center p-2 md:p-3 text-lg">{r[2]}</td>
                <td className="text-center p-2 md:p-3 text-lg">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const TimelineSlide = () => (
  <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 p-8 md:p-16">
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <div className="inline-block px-4 py-1 bg-[hsl(var(--venture-blue))]/10 text-[hsl(var(--venture-navy))] text-sm font-bold rounded-full mb-4">
          YOUR JOURNEY
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-[hsl(var(--venture-navy))] uppercase mb-2">Step by Step</h2>
        <p className="text-xl font-bold text-[hsl(var(--venture-blue))]">2025 - 2027</p>
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 content-start">
        {[
          "Start Process",
          "Coach Meetings",
          "Video Editing",
          "Active Recruitment",
          "Transcript Evaluation",
          "University Connections",
          "Applications Submitted",
          "Travel Preparation",
          "Start College Journey"
        ].map((step,i)=>(
          <div key={i} className="group bg-white rounded-xl p-4 md:p-5 flex items-center gap-4 shadow-sm hover:shadow-lg border-l-4 border-[hsl(var(--venture-blue))] transition-all hover:scale-105">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] text-white rounded-full flex items-center justify-center text-base md:text-lg font-black shadow-lg flex-shrink-0">
              {i+1}
            </div>
            <span className="text-sm md:text-base font-bold text-gray-700">{step}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ContactSlide = () => (
  <div className="w-full h-full bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] relative overflow-hidden flex items-center justify-center">
    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
    
    <div className="relative z-10 text-center px-8 space-y-8">
      <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl mb-8">
        <img src={ventureLogo} alt="Venture" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black text-white uppercase leading-tight">
        Ready to Start<br/>Your Journey?
      </h1>
      
      <div className="h-1 w-32 bg-white/80 rounded-full mx-auto"></div>
      
      <p className="text-xl md:text-2xl text-white/90 font-semibold max-w-2xl mx-auto">
        Let's make your college soccer dream a reality
      </p>
      
      <div className="text-white/70 text-lg">
        <p>Contact: nexusgloballc@gmail.com</p>
      </div>
    </div>
  </div>
);

const BackCoverSlide = () => (
  <div className="w-full h-full relative bg-gradient-to-br from-gray-100 via-blue-50 to-cyan-50 overflow-hidden">
    <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[hsl(var(--venture-navy))] rounded-full opacity-10"></div>
    <div className="absolute -top-20 -left-20 w-96 h-96 bg-[hsl(var(--venture-blue))] rounded-full opacity-10"></div>
    
    <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
      <div className="mb-8 w-32 h-32 bg-[hsl(var(--venture-navy))] rounded-full flex items-center justify-center shadow-2xl">
        <img src={ventureLogo} alt="Venture" className="w-20 h-20 object-contain" />
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black text-[hsl(var(--venture-navy))] uppercase tracking-tight mb-4 text-center">
        Thank You
      </h1>
      
      <div className="h-1 w-32 bg-[hsl(var(--venture-blue))] rounded-full mb-6"></div>
      
      <p className="text-xl md:text-2xl text-gray-600 font-semibold text-center">
        Venture USA Soccer
      </p>
      
      <p className="text-gray-500 mt-4">College Soccer Placement Consulting</p>
    </div>
  </div>
);
