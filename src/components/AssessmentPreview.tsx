import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AssessmentData } from "./AssessmentEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ChevronLeft, ChevronRight } from "lucide-react";
import ventureLogo from "@/assets/venture-logo-white.png";
import ventureLogoCircle from "@/assets/venture-logo-circle.png";
import pedroBaischFinal from "@/assets/pedro-baisch-final.png";
import miloPetersFinal from "@/assets/milo-peters-final.png";
import afonsoVaz from "@/assets/afonso-vaz.png";
import henriqueSantos from "@/assets/henrique-santos.jpg";
import bernardoMonteiro from "@/assets/bernardo-monteiro.jpg";
import filipJauk from "@/assets/filip-jauk.jpg";
import joaoDomingues from "@/assets/joao-domingues.jpg";
import pedroBaischCommitted from "@/assets/pedro-baisch-committed.png";
import creightonLogo from "@/assets/logos/creighton.png";
import ncStateLogo from "@/assets/logos/nc-state.png";
import charlestonLogo from "@/assets/logos/charleston-new.png";
import providenceLogo from "@/assets/logos/providence.png";
import caltechLogo from "@/assets/logos/caltech.png";
import wakeForestLogo from "@/assets/logos/wake-forest.png";
import ucfLogo from "@/assets/logos/ucf-new.png";
import coastalCarolinaLogo from "@/assets/logos/coastal-carolina.svg";
import westVirginiaLogo from "@/assets/logos/west-virginia.png";
import templeLogo from "@/assets/logos/temple.png";
import kentuckyLogo from "@/assets/logos/kentucky.png";
import georgiaStateLogo from "@/assets/logos/georgia-state.png";
import ucIrvineLogo from "@/assets/logos/uc-irvine.png";

interface AssessmentPreviewProps {
  data: AssessmentData;
  onBack: () => void;
}

export const AssessmentPreview = ({ data, onBack }: AssessmentPreviewProps) => {
  const location = useLocation();
  const initialSlide = location.state?.returnToSlide ?? 0;
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  
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
const CoverSlide = ({ data }: { data: AssessmentData }) => {
  // University logos for the ticker
  const universityLogos = [
    creightonLogo, ncStateLogo, charlestonLogo,
    providenceLogo, caltechLogo, wakeForestLogo, ucfLogo, 
    coastalCarolinaLogo, westVirginiaLogo, templeLogo, kentuckyLogo,
    georgiaStateLogo, ucIrvineLogo,
  ];
  
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(147,51,234,0.08),transparent_50%)]"></div>
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      {/* Floating orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

      {/* University Logo Ticker at Top - Continuous seamless scroll */}
      <div className="absolute top-0 left-0 right-0 py-3 overflow-hidden border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="flex animate-scroll-continuous items-center gap-6">
          {/* Repeat logos 4 times for truly seamless infinite scroll */}
          {[...Array(4)].map((_, setIdx) => (
            universityLogos.map((logo, idx) => (
              <div 
                key={`logo-${setIdx}-${idx}`}
                className="flex-shrink-0 hover:scale-110 transition-transform duration-300"
              >
                <img 
                  src={logo} 
                  alt={`University ${idx + 1}`}
                  className="h-10 w-auto object-contain drop-shadow-lg opacity-90 hover:opacity-100"
                />
              </div>
            ))
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-start h-full px-8 pt-24 pb-32">
        {/* Venture Logo with holographic glow */}
        <div className="mt-8 mb-6 relative group">
          {/* Animated holographic rings */}
          <div className="absolute inset-0 rounded-full animate-ping-slow opacity-30">
            <div className="w-full h-full rounded-full border-2 border-blue-400"></div>
          </div>
          <div className="absolute inset-0 rounded-full animate-ping-slow opacity-20" style={{animationDelay: '1s'}}>
            <div className="w-full h-full rounded-full border-2 border-cyan-400"></div>
          </div>
          
          {/* Multi-layer glow effect */}
          <div className="absolute -inset-8 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
          <div className="absolute -inset-6 rounded-full bg-purple-400 opacity-15 blur-2xl"></div>
          <div className="absolute -inset-4 rounded-full bg-blue-400 opacity-25 blur-xl"></div>
          
          {/* Logo container with animated border */}
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full shadow-2xl group-hover:scale-105 transition-all duration-700">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/30 via-purple-500/20 to-blue-700/30 animate-spin-slow"></div>
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-slate-900 to-blue-950 backdrop-blur"></div>
            <img 
              src={ventureLogoCircle} 
              alt="Venture USA" 
              className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-contain rounded-full" 
            />
          </div>
        </div>
        
        {/* Title with modern glow effect */}
        <div className="relative mb-4">
          <div className="absolute inset-0 blur-2xl">
            <h1 className="text-6xl md:text-8xl font-black text-blue-500 uppercase tracking-tighter text-center leading-none opacity-50">
              ASSESSMENT REPORT
            </h1>
          </div>
          <h1 className="relative text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-300 uppercase tracking-tighter text-center leading-none">
            ASSESSMENT
          </h1>
          <h1 className="relative text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-300 via-purple-200 to-white uppercase tracking-tighter text-center leading-none -mt-2">
            REPORT
          </h1>
          
          {/* Animated underline */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-400 animate-pulse"></div>
          </div>
        </div>
        
        {/* Divider with glow */}
        <div className="relative my-4">
          <div className="h-px w-64 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-blue-400 blur-sm"></div>
        </div>
        
        <p className="text-lg md:text-xl text-blue-200/80 font-light text-center max-w-2xl tracking-wider mb-4">
          College Soccer Placement Consulting
        </p>
        
        {/* Player Name with modern card */}
        {data.playerName && (
          <div className="mt-4 mb-8 relative group">
            {/* Card glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
            
            {/* Card */}
            <div className="relative bg-gradient-to-br from-slate-900/90 to-blue-950/90 backdrop-blur-xl rounded-xl border border-blue-400/30 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              <p className="relative text-2xl md:text-4xl font-black text-white uppercase tracking-widest text-center px-10 py-5 break-words">
                {data.playerName}
              </p>
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes scroll-continuous {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .animate-scroll-continuous {
          animation: scroll-continuous 60s linear infinite;
        }
        @keyframes ping-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

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
  <div className="w-full h-full bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden p-8 md:p-16">
    {/* Soccer field lines pattern - subtle background */}
    <div className="absolute inset-0 opacity-[0.03]">
      {/* Horizontal lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[hsl(var(--venture-navy))]"></div>
      <div className="absolute top-1/4 left-0 right-0 h-px bg-[hsl(var(--venture-navy))]"></div>
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-[hsl(var(--venture-navy))]"></div>
      <div className="absolute top-3/4 left-0 right-0 h-px bg-[hsl(var(--venture-navy))]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[hsl(var(--venture-navy))]"></div>
      
      {/* Center circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-[hsl(var(--venture-navy))]"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[hsl(var(--venture-navy))]"></div>
      
      {/* Corner arcs */}
      <div className="absolute top-0 left-0 w-16 h-16 border-b-2 border-r-2 border-[hsl(var(--venture-navy))] rounded-br-full"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-b-2 border-l-2 border-[hsl(var(--venture-navy))] rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-t-2 border-r-2 border-[hsl(var(--venture-navy))] rounded-tr-full"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-t-2 border-l-2 border-[hsl(var(--venture-navy))] rounded-tl-full"></div>
    </div>
    
    {/* Floating soccer ball hexagons - decorative */}
    <div className="absolute top-20 right-20 w-12 h-12 opacity-5">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="currentColor" className="text-[hsl(var(--venture-navy))]"/>
      </svg>
    </div>
    <div className="absolute bottom-32 left-32 w-8 h-8 opacity-5">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="currentColor" className="text-[hsl(var(--venture-blue))]"/>
      </svg>
    </div>
    
    <div className="relative z-10 h-full flex flex-col">
      {/* Header with soccer accent */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-[hsl(var(--venture-blue))]/10 text-[hsl(var(--venture-navy))] text-sm font-bold rounded-full border border-[hsl(var(--venture-blue))]/20">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2a10 10 0 0 0 0 20"/>
              <path d="M2 12h20"/>
              <path d="M12 2C9.5 6 9.5 18 12 22"/>
              <path d="M12 2c2.5 4 2.5 16 0 20"/>
            </svg>
            PLACEMENT TARGETS
          </div>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-[hsl(var(--venture-navy))] uppercase tracking-tight">
          Target Divisions
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[hsl(var(--venture-blue))] to-transparent rounded-full mt-3"></div>
      </div>
      
      {/* Division cards with enhanced soccer theme */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in overflow-auto">
        {["NCAA D1", "NCAA D2", "NCAA D3", "NAIA", "JUCO", "Gap Year"].map((division, idx) => {
          const isSelected = data.targetDivisions.includes(division);
          const divisionSlug = division.toLowerCase().replace(/ /g, '-');
          return (
            <Link
              key={division}
              to={`/division/${divisionSlug}`}
              state={{ fromSlide: 3, data: data }}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-500 block ${
                isSelected
                  ? 'bg-gradient-to-br from-[hsl(var(--venture-navy))] via-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] shadow-2xl scale-[1.02]' 
                  : 'bg-white shadow-lg hover:shadow-2xl hover:scale-[1.02]'
              }`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Field line pattern overlay for selected cards */}
              {isSelected && (
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-white"></div>
                </div>
              )}
              
              {/* Corner accent lines */}
              <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-2xl transition-colors ${
                isSelected ? 'border-white/30' : 'border-[hsl(var(--venture-blue))]/20'
              }`}></div>
              <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-2xl transition-colors ${
                isSelected ? 'border-white/30' : 'border-[hsl(var(--venture-blue))]/20'
              }`}></div>
              
              {/* Glow effect for selected */}
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              )}
              
              <div className="relative p-6 text-center space-y-4">
                {/* Icon container with soccer theme */}
                <div className={`relative w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl font-black transition-all duration-300 ${
                  isSelected
                    ? 'bg-white/20 text-white backdrop-blur-sm' 
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-300 group-hover:from-[hsl(var(--venture-blue))]/5 group-hover:to-[hsl(var(--venture-blue))]/10'
                }`}>
                {isSelected ? (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 2a10 10 0 0 0 0 20"/>
                      <path d="M2 12h20"/>
                    </svg>
                  )}
                </div>
                
                {/* Division name */}
                <h3 className={`text-xl md:text-2xl font-black transition-colors ${
                  isSelected ? 'text-white' : 'text-[hsl(var(--venture-navy))] group-hover:text-[hsl(var(--venture-blue))]'
                }`}>
                  {division}
                </h3>
                
                {/* Status indicator */}
                {isSelected && (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <p className="text-white/90 text-sm font-semibold uppercase tracking-wider">Recommended</p>
                  </div>
                )}
                
                {!isSelected && (
                  <div className="flex items-center justify-center gap-2 text-[hsl(var(--venture-blue))] opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm font-semibold uppercase tracking-wider">Click to learn more</p>
                  </div>
                )}
              </div>
              
              {/* Hover effect overlay */}
              {!isSelected && (
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--venture-blue))]/0 to-[hsl(var(--venture-blue))]/0 group-hover:from-[hsl(var(--venture-blue))]/5 group-hover:to-[hsl(var(--venture-blue))]/10 transition-all duration-300 rounded-2xl"></div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  </div>
);

const DepartmentNotesSlide = ({ data }: { data: AssessmentData }) => (
  <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden p-6 md:p-12">
    {/* Decorative Background Elements */}
    <div className="absolute top-10 right-10 w-64 h-64 opacity-5">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" className="text-[hsl(var(--venture-navy))]" />
        <path d="M50 5 L50 95 M5 50 L95 50" stroke="currentColor" strokeWidth="1" className="text-[hsl(var(--venture-navy))]" />
      </svg>
    </div>
    <div className="absolute bottom-10 left-10 w-48 h-48 opacity-5">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="currentColor" className="text-[hsl(var(--venture-blue))]"/>
      </svg>
    </div>

    <div className="h-full flex flex-col relative z-10">
      {/* Header Section with Icon */}
      <div className="mb-6 flex items-start gap-4">
        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] rounded-2xl flex items-center justify-center shadow-lg">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[hsl(var(--venture-blue))]/10 to-[hsl(var(--venture-navy))]/10 text-[hsl(var(--venture-navy))] text-xs font-bold rounded-full mb-3 border border-[hsl(var(--venture-blue))]/20">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            SCOUTING REPORT
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-[hsl(var(--venture-navy))] leading-tight">
            Department Assessment
          </h2>
          <p className="text-sm md:text-base text-[hsl(var(--venture-blue))] font-bold mt-1">
            Professional Evaluation & Recommendations
          </p>
        </div>
      </div>
      
      {/* Main Content Card with Scouting Report Theme */}
      <div className="flex-1 relative overflow-hidden">
        <div className="h-full bg-white rounded-2xl shadow-2xl border-2 border-blue-100 overflow-hidden">
          {/* Top accent bar */}
          <div className="h-2 bg-gradient-to-r from-[hsl(var(--venture-navy))] via-[hsl(var(--venture-blue))] to-[hsl(var(--venture-navy))]"></div>
          
          <div className="p-6 md:p-8 h-[calc(100%-0.5rem)] overflow-auto">
            {/* Report Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-dashed border-blue-200">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Prepared by Venture Soccer Department</span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-[hsl(var(--venture-navy))]">
                  Player Evaluation Summary
                </h3>
              </div>
              <div className="flex-shrink-0 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-200">
                ASSESSED
              </div>
            </div>

            {/* Notes Content with Enhanced Design */}
            <div className="space-y-4">
              {data.departmentNotes.split('\n\n').map((paragraph, idx) => (
                <div 
                  key={idx} 
                  className="group relative"
                >
                  <div className="flex gap-4 items-start p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-transparent border-l-4 border-[hsl(var(--venture-blue))] hover:shadow-md hover:bg-blue-50/80 transition-all duration-200">
                    {/* Icon/Number Badge */}
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[hsl(var(--venture-blue))]/20 to-[hsl(var(--venture-navy))]/10 rounded-lg flex items-center justify-center border border-[hsl(var(--venture-blue))]/30">
                      <span className="text-[hsl(var(--venture-blue))] font-black text-sm">{idx + 1}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <p className="text-sm md:text-base leading-relaxed text-gray-700 font-medium">
                        {paragraph}
                      </p>
                    </div>

                    {/* Checkmark indicator */}
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[hsl(var(--venture-blue))]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-3 h-3 text-[hsl(var(--venture-blue))]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Signature/Seal */}
            <div className="mt-8 pt-6 border-t-2 border-dashed border-blue-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-[hsl(var(--venture-navy))]">Official Assessment</p>
                  <p className="text-xs text-gray-500">Venture USA Soccer Department</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-[hsl(var(--venture-blue))]">Recruitment Ready</p>
                <p className="text-xs text-gray-500">Verified Evaluation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TestimonialJoaoSlide = () => (
  <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 p-8 md:p-16 flex items-center justify-center">
    <div className="max-w-6xl w-full">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--venture-blue))]/20 to-[hsl(var(--venture-navy))]/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform"></div>
          <img 
            src={henriqueSantos} 
            alt="Henrique Santos" 
            className="relative rounded-2xl shadow-2xl w-full h-[500px] object-contain border-4 border-white"
          />
        </div>
        <div className="space-y-6">
          <div className="inline-block px-4 py-1 bg-[hsl(var(--venture-blue))]/10 text-[hsl(var(--venture-navy))] text-sm font-bold rounded-full">
            SUCCESS STORY
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-[hsl(var(--venture-navy))]">HENRIQUE SANTOS</h3>
          <p className="text-lg font-semibold text-[hsl(var(--venture-blue))]">NC State - D1 Soccer</p>
          <blockquote className="text-base md:text-lg text-gray-700 leading-relaxed border-l-4 border-[hsl(var(--venture-blue))] pl-6 italic">
            "I have worked with agents and people that tried to help my soccer career for a big part of my life and the focus and the personal touch that I get from João is exceptional. Along with myself I owe a lot of my success to João as it's been a great journey since we started working together. He is very experienced and has a deep knowledge about soccer because it's his passion and hungry for success. Due to his vast soccer background and wide range of connections around the world, not only he knows what it takes to make it, but he can also provide the best counseling and options."
          </blockquote>
        </div>
      </div>
    </div>
  </div>
);

const TestimonialFilipSlide = () => (
  <div className="w-full h-full bg-gradient-to-br from-white to-blue-50 p-8 md:p-16 flex items-center justify-center">
    <div className="max-w-6xl w-full">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 md:order-2">
          <div className="inline-block px-4 py-1 bg-[hsl(var(--venture-blue))]/10 text-[hsl(var(--venture-navy))] text-sm font-bold rounded-full">
            SUCCESS STORY
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-[hsl(var(--venture-navy))]">BERNARDO MONTEIRO</h3>
          <p className="text-lg font-semibold text-[hsl(var(--venture-blue))]">FIU - D1 Soccer</p>
          <blockquote className="text-base md:text-lg text-gray-700 leading-relaxed border-l-4 border-[hsl(var(--venture-blue))] pl-6 italic">
            "Meeting Delgado and working with him has been a pleasure. Since the first moment we started this journey together, he has always been there for me and in constant contact with me and my family to help in anything needed. He has always been committed with me and to help me to get a professional opportunity. Besides being a very professional person, he's also a great friend now. Any players working with him, will be lucky enough to achieve their goals."
          </blockquote>
        </div>
        <div className="relative group md:order-1">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--venture-navy))]/20 to-[hsl(var(--venture-blue))]/20 rounded-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform"></div>
          <img 
            src={bernardoMonteiro} 
            alt="Bernardo Monteiro" 
            className="relative rounded-2xl shadow-2xl w-full h-[500px] object-contain border-4 border-white"
          />
        </div>
      </div>
    </div>
  </div>
);

const CommittedSlide = () => (
  <div className="w-full h-full bg-gradient-to-br from-[hsl(var(--venture-navy))] via-blue-900 to-[hsl(var(--venture-blue))] p-4 md:p-6 relative overflow-hidden flex flex-col">
    {/* Modern layered background with Venture colors */}
    <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(var(--venture-blue))]/20 via-transparent to-blue-500/10"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/8 via-transparent to-transparent"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500/8 via-transparent to-transparent"></div>
    
    {/* Animated geometric shapes */}
    <div className="absolute top-20 right-20 w-72 h-72 border border-white/5 rounded-full animate-pulse"></div>
    <div className="absolute top-40 right-40 w-48 h-48 border border-white/10 rounded-full"></div>
    <div className="absolute bottom-20 left-20 w-64 h-64 border border-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
    
    {/* Diagonal light streaks */}
    <div className="absolute top-0 right-0 w-96 h-1 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent rotate-45 transform translate-x-32"></div>
    <div className="absolute bottom-0 left-0 w-96 h-1 bg-gradient-to-r from-transparent via-green-400/20 to-transparent -rotate-45 transform -translate-x-32"></div>
    
    {/* Subtle grid pattern */}
    <div className="absolute inset-0 opacity-5" style={{ 
      backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
      backgroundSize: '100px 100px'
    }}></div>
    
    <div className="relative z-10 flex flex-col h-full pb-2">
      {/* Header - Without 350+ */}
      <div className="text-center mb-3">
        <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-white via-[hsl(var(--venture-blue))] to-white bg-clip-text text-transparent uppercase tracking-wide drop-shadow-lg mb-2">The Athlete First</h2>
        <div className="flex items-center justify-center gap-2">
          <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-[hsl(var(--venture-blue))] to-transparent rounded-full"></div>
          <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"></div>
          <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-[hsl(var(--venture-blue))] to-transparent rounded-full"></div>
        </div>
      </div>
      
      {/* Featured Athletes Grid */}
      <div className="flex-1 flex items-center justify-center px-2 py-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 max-w-6xl w-full">
          <div className="group relative overflow-hidden rounded-3xl shadow-2xl shadow-yellow-500/20 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-yellow-400/40 hover:border-yellow-400/80 bg-gradient-to-b from-[hsl(var(--venture-navy))]/80 to-blue-950">
            <div className="aspect-[3/4] relative">
              <img src={pedroBaischFinal} alt="Pedro Baisch" className="w-full h-full object-contain" />
              <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-3 py-1.5 rounded-full text-xs font-black uppercase shadow-lg">Merrimack</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-950/95 via-black/20 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-black text-lg mb-1 drop-shadow-lg">Pedro Baisch</p>
                <p className="text-yellow-300 text-sm font-bold">Merrimack College</p>
              </div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-3xl shadow-2xl shadow-green-500/20 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-green-400/40 hover:border-green-400/80 bg-gradient-to-b from-[hsl(var(--venture-navy))]/80 to-blue-950">
            <div className="aspect-[3/4] relative">
              <img src={miloPetersFinal} alt="Milo Peters" className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-emerald-500 text-black px-3 py-1.5 rounded-full text-xs font-black uppercase shadow-lg">Dartmouth</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/95 via-black/20 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-black text-lg mb-1 drop-shadow-lg">Milo Peters</p>
                <p className="text-green-300 text-sm font-bold">Dartmouth</p>
                <p className="text-green-200/80 text-xs mt-1">6% Acceptance Rate ⭐</p>
              </div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-3xl shadow-2xl shadow-red-500/20 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-red-400/40 hover:border-red-400/80 bg-gradient-to-b from-[hsl(var(--venture-navy))]/80 to-blue-950">
            <div className="aspect-[3/4] relative">
              <img src={afonsoVaz} alt="Afonso Vaz" className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-400 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-black uppercase shadow-lg">D&E</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/95 via-black/20 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-black text-lg mb-1 drop-shadow-lg">Afonso Vaz</p>
                <p className="text-red-300 text-sm font-bold">Davis & Elkins</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Bar - Moved up more */}
      <div className="text-center mt-6">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[hsl(var(--venture-navy))]/80 via-[hsl(var(--venture-blue))]/80 to-[hsl(var(--venture-navy))]/80 backdrop-blur-md border border-white/20 rounded-full px-6 md:px-8 py-2 shadow-2xl">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse shadow-lg shadow-red-400/50" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="text-white font-black text-xl md:text-2xl">+347</span>
          <span className="text-gray-200 text-xs md:text-sm font-bold uppercase tracking-wider">More Success Stories</span>
        </div>
      </div>
    </div>
  </div>
);

const TestimonialGabrielSlide = () => (
  <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 p-8 md:p-16 flex items-center justify-center">
    <div className="max-w-6xl w-full">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--venture-blue))]/20 to-[hsl(var(--venture-navy))]/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform"></div>
          <img 
            src={filipJauk} 
            alt="Filip Jauk" 
            className="relative rounded-2xl shadow-2xl w-full h-[500px] object-contain border-4 border-white"
          />
        </div>
        <div className="space-y-6">
          <div className="inline-block px-4 py-1 bg-[hsl(var(--venture-blue))]/10 text-[hsl(var(--venture-navy))] text-sm font-bold rounded-full">
            SUCCESS STORY
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-[hsl(var(--venture-navy))]">FILIP JAUK</h3>
          <p className="text-lg font-semibold text-[hsl(var(--venture-blue))]">FAU - D1 Soccer</p>
          <blockquote className="text-base md:text-lg text-gray-700 leading-relaxed border-l-4 border-[hsl(var(--venture-blue))] pl-6 italic">
            "I really enjoyed working with Joao. Without him I wouldn't have been able to have a full scholarship at such a great school at one of the best soccer programs. For everything that I have here in the US, he is the first man to say thank you! He was with me from the beginning and every time made sure that everything is perfect for my education and my soccer improvement."
          </blockquote>
        </div>
      </div>
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
            <tr className="border-b bg-gray-50 hover:bg-blue-50/50 transition-colors">
              <td className="p-3 md:p-4 font-bold text-[hsl(var(--venture-navy))]">Exams (SAT/ACT/TOEFL)</td>
              <td className="text-center p-3 md:p-4 font-bold">$200-$400</td>
              <td className="text-right p-3 md:p-4 text-xs text-gray-600">1-3 exams</td>
            </tr>
            <tr className="border-b bg-white hover:bg-blue-50/50 transition-colors">
              <td className="p-3 md:p-4 font-bold text-[hsl(var(--venture-navy))]">Applications (4-6 unis)</td>
              <td className="text-center p-3 md:p-4 font-bold">$300-$500</td>
              <td className="text-right p-3 md:p-4 text-xs text-gray-600">Varies per school</td>
            </tr>
            <tr className="border-b bg-gray-50 hover:bg-blue-50/50 transition-colors">
              <td className="p-3 md:p-4 font-bold text-[hsl(var(--venture-navy))]">Flight Ticket USA</td>
              <td className="text-center p-3 md:p-4 font-bold">$600-$1,000</td>
              <td className="text-right p-3 md:p-4 text-xs text-gray-600">One-way</td>
            </tr>
            <tr className="border-b bg-white hover:bg-blue-50/50 transition-colors">
              <td className="p-3 md:p-4 font-bold text-[hsl(var(--venture-navy))]">VISA Approval</td>
              <td className="text-center p-3 md:p-4 font-bold">$350</td>
              <td className="text-right p-3 md:p-4 text-xs text-gray-600">F-1 Student Visa</td>
            </tr>
            <tr className="border-b bg-gray-50 hover:bg-blue-50/50 transition-colors">
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
