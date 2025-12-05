import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AssessmentData } from "./AssessmentEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
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
  isPublicView?: boolean;
}

// Default English labels
const DEFAULT_LABELS: Record<string, string> = {
  // Cover slide
  assessmentReport: "ASSESSMENT REPORT",
  collegeSoccerPlacementConsulting: "College Soccer Placement Consulting",
  preparedFor: "Prepared for",
  
  // Player info slide
  playerProfile: "PLAYER PROFILE",
  playerInformation: "Player Information",
  enrollment: "Enrollment",
  schoolYear: "School Year",
  gpa: "GPA",
  manager: "Manager",
  playerPhoto: "Player Photo",
  
  // Recommendation slide
  ourRecommendation: "OUR RECOMMENDATION",
  recommendation: "Recommendation",
  
  // Target divisions slide
  placementTargets: "PLACEMENT TARGETS",
  targetDivisions: "Target Divisions",
  recommended: "Recommended",
  clickToLearnMore: "Click to learn more",
  
  // Department notes slide
  scoutingReport: "SCOUTING REPORT",
  departmentAssessment: "Department Assessment",
  professionalEvaluation: "Professional Evaluation & Recommendations",
  departmentNotes: "Department Notes",
  
  // Costs slide
  investment: "INVESTMENT",
  estimatedCosts: "Estimated Costs",
  yourPathToCollegeSoccer: "Your path to college soccer in the USA",
  satExams: "SAT Exams",
  satExamsStatus: "1-3 exams",
  satExamsDescription: "The SAT is a standardized test that students may have to take to get accepted into certain schools. This score helps universities evaluate academic readiness.",
  applications: "Applications",
  applicationsStatus: "4-6 schools",
  applicationsDescription: "Application fees for submitting your profile to multiple universities. Each school charges an application fee to process your admission materials.",
  flightTicket: "Flight Ticket to USA",
  flightTicketStatus: "One-way",
  flightTicketDescription: "Cost of your flight from your home country to the United States. This is a one-way ticket to begin your college journey.",
  visaApproval: "Visa Approval",
  visaApprovalStatus: "F-1 Student",
  visaApprovalDescription: "The F-1 Student Visa approval process and associated fees required for international students to study in the United States.",
  universityYearlyBudget: "University Yearly Budget",
  universityYearlyBudgetStatus: "Varies",
  universityYearlyBudgetDescription: "Average yearly cost after scholarships, discussed with family. Some students earn full scholarships while others may not receive any financial aid.",
  costsNote: "All costs are estimates and may vary. Click the info buttons for details.",
  note: "Note",
  
  // Packages slide
  serviceOptions: "SERVICE OPTIONS",
  servicePackages: "Service Packages",
  choosePackage: "Choose the right package for your journey",
  service: "SERVICE",
  package1: "PACKAGE 1",
  package2: "PACKAGE 2",
  package3: "PACKAGE 3",
  fullService: "Full Service",
  standard: "Standard",
  essential: "Essential",
  englishExamSupport: "English Exam Support",
  englishExamSupportDescription: "Comprehensive preparation and guidance for English proficiency exams like TOEFL, helping you achieve the scores needed for university admission.",
  videoEditing: "Video Editing",
  videoEditingDescription: "Professional editing of your soccer highlight videos to showcase your skills to college coaches in the most compelling way.",
  admissionsSupport: "Admissions Support",
  admissionsSupportDescription: "Expert assistance with college applications, essays, and all required documentation to maximize your chances of acceptance.",
  translationServices: "Translation Services",
  translationServicesDescription: "Professional translation of documents, transcripts, and communications to ensure accurate and effective communication.",
  coachConnections: "Coach Connections",
  coachConnectionsDescription: "Direct introductions and ongoing communication with college coaches who match your athletic and academic profile.",
  eligibilityCenter: "Eligibility Center",
  eligibilityCenterDescription: "Complete support with NCAA Eligibility Center registration and requirements to ensure you can compete collegiately.",
  scholarshipOffers: "Scholarship Offers",
  scholarshipOffersDescription: "Strategic guidance to secure the best possible scholarship offers and financial aid packages from universities.",
  visaSupport: "VISA Support",
  visaSupportDescription: "Complete assistance with F-1 Student Visa application process, documentation, and interview preparation.",
  usaArrivalSupport: "USA Arrival Support",
  usaArrivalSupportDescription: "Help with logistics and orientation when arriving in the USA, ensuring a smooth transition to your new university.",
  universityPlacement: "University Placement",
  universityPlacementDescription: "End-to-end support to secure your final placement at a university that matches your athletic, academic, and personal goals.",
  
  // Timeline slide
  yourJourney: "YOUR JOURNEY",
  stepByStep: "Step by Step",
  timeline: "Timeline",
  startProcess: "Start Process",
  startProcessDescription: "Initial consultation to understand your goals, assess your profile, and create a personalized roadmap for your college soccer journey.",
  coachMeetings: "Coach Meetings",
  coachMeetingsDescription: "Direct connections with college coaches across multiple divisions, introducing your athletic and academic profile to programs that match your goals.",
  videoEditingTimeline: "Video Editing",
  videoEditingTimelineDescription: "Professional editing of your soccer highlight videos to showcase your skills, positioning, and game intelligence to college coaches.",
  activeRecruitment: "Active Recruitment",
  activeRecruitmentDescription: "Ongoing communication with college coaches, managing interest from programs, and coordinating campus visits or virtual meetings.",
  transcriptEvaluation: "Transcript Evaluation",
  transcriptEvaluationDescription: "Complete academic evaluation and transcript preparation to meet NCAA eligibility requirements and university admission standards.",
  universityConnections: "University Connections",
  universityConnectionsDescription: "Building strong relationships with universities that are the best fit for your athletic ability, academic interests, and scholarship needs.",
  applicationsSubmitted: "Applications Submitted",
  applicationsSubmittedDescription: "Complete and submit applications to selected universities with all required documents, essays, and supporting materials.",
  travelPreparation: "Travel Preparation",
  travelPreparationDescription: "Visa processing, flight arrangements, accommodation planning, and all logistics for your move to the United States.",
  startCollegeJourney: "Start College Journey",
  startCollegeJourneyDescription: "Arrival at your university, orientation, meeting your team, and beginning your college soccer and academic career in the USA.",
  
  // Contact slide
  readyToStart: "Ready to Start",
  yourJourneyQuestion: "Your Journey?",
  letsMakeYourDream: "Let's make your college soccer dream a reality",
  emailUs: "Email Us",
  getStarted: "Get Started",
  callYourAgent: "Call Your Agent",
  joinAthletes: "Join 350+ athletes who have successfully placed at top universities across the United States",
  
  // Division info page
  divisionOverview: "DIVISION OVERVIEW",
  scholarships: "Scholarships",
  academicRequirements: "Academic Requirements",
  keyBenefits: "Key Benefits",
  keyDifferences: "Key Differences",
  idealFor: "Ideal For",
  backToAssessment: "Back to Assessment",
  divisionNotFound: "Division not found",
  goBack: "Go Back",
  
  // Common
  perYear: "per year",
  learnMore: "Learn More",
  backToEditor: "Back to Editor",
};

// Helper to get label with fallback
const getLabel = (labels: Record<string, string> | null | undefined, key: string): string => {
  return labels?.[key] || DEFAULT_LABELS[key] || key;
};

export const AssessmentPreview = ({ data, onBack, isPublicView = false }: AssessmentPreviewProps) => {
  const location = useLocation();
  const initialSlide = location.state?.returnToSlide ?? 0;
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  
  // Get translated labels or use defaults
  const labels = data.translatedLabels || DEFAULT_LABELS;
  
  const slides = [
    { type: "cover", title: getLabel(labels, "assessmentReport") },
    { type: "player-info", title: getLabel(labels, "playerInformation") },
    { type: "recommendation", title: getLabel(labels, "recommendation") },
    { type: "target-divisions", title: getLabel(labels, "targetDivisions") },
    { type: "department-notes", title: getLabel(labels, "departmentNotes") },
    { type: "testimonial-joao", title: "Testimonial - Joao" },
    { type: "testimonial-filip", title: "Testimonial - Filip" },
    { type: "committed", title: "Success Stats" },
    { type: "costs", title: getLabel(labels, "estimatedCosts") },
    { type: "testimonial-gabriel", title: "Testimonial - Gabriel" },
    { type: "packages", title: getLabel(labels, "servicePackages") },
    { type: "timeline", title: getLabel(labels, "timeline") },
    { type: "testimonials-slider", title: "More Testimonials" },
    { type: "contact", title: getLabel(labels, "readyToStart") },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation - Only show for editors, not public viewers */}
      {!isPublicView && (
        <div className="print:hidden bg-[hsl(var(--venture-navy))] text-white p-2 md:p-4 sticky top-0 z-50 shadow-xl">
          <div className="container mx-auto flex items-center justify-between gap-2">
            <Button 
              onClick={onBack} 
              className="gap-1 md:gap-2 text-xs md:text-sm bg-white/10 hover:bg-white/20 border border-white/20 px-2 md:px-4 py-1 md:py-2"
            >
              <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Back to Editor</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="flex items-center gap-2 md:gap-4">
              <span className="text-xs md:text-sm font-semibold tracking-wide">
                <span className="hidden sm:inline">{slides[currentSlide].title} • </span>
                {currentSlide + 1} / {slides.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Slide Container */}
      <div className={`relative flex items-center justify-center ${isPublicView ? 'min-h-screen' : 'min-h-[calc(100vh-72px)]'} px-14 md:px-20 lg:px-24 py-2 md:py-4 lg:py-8`}>
        {/* Slide Card with Animation - flexible height on mobile, aspect ratio on desktop */}
        <div className="relative w-full max-w-7xl min-h-[500px] md:aspect-[16/9] bg-white rounded-lg md:rounded-xl lg:rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
          <div className="w-full h-full animate-fade-in">
            {currentSlide === 0 && <CoverSlide data={data} labels={labels} />}
            {currentSlide === 1 && <PlayerInfoSlide data={data} labels={labels} />}
            {currentSlide === 2 && <RecommendationSlide data={data} labels={labels} />}
            {currentSlide === 3 && <TargetDivisionsSlide data={data} labels={labels} />}
            {currentSlide === 4 && <DepartmentNotesSlide data={data} labels={labels} />}
            {currentSlide === 5 && <TestimonialJoaoSlide />}
            {currentSlide === 6 && <TestimonialFilipSlide />}
            {currentSlide === 7 && <CommittedSlide />}
            {currentSlide === 8 && <CostsSlide labels={labels} />}
            {currentSlide === 9 && <TestimonialGabrielSlide />}
            {currentSlide === 10 && <PackagesSlide packagePrice1={data.packagePrice1} packagePrice2={data.packagePrice2} packagePrice3={data.packagePrice3} labels={labels} />}
            {currentSlide === 11 && <TimelineSlide labels={labels} />}
            {currentSlide === 12 && <TestimonialsSliderSlide />}
            {currentSlide === 13 && <ContactSlide labels={labels} />}
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Fixed to viewport edges, outside slide content */}
      <Button
        variant="ghost"
        size="icon"
        className="print:hidden fixed left-1 md:left-2 lg:left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 border border-gray-200"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-[hsl(var(--venture-navy))]" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="print:hidden fixed right-1 md:right-2 lg:right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 border border-gray-200"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-[hsl(var(--venture-navy))]" />
      </Button>

      {/* Slide Indicators - Only show for editors, not public viewers */}
      {!isPublicView && (
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
      )}
    </div>
  );
};

// Slide Components
const CoverSlide = ({ data, labels }: { data: AssessmentData; labels: Record<string, string> }) => {
  // University logos for the ticker
  const universityLogos = [
    creightonLogo, ncStateLogo, charlestonLogo,
    providenceLogo, caltechLogo, wakeForestLogo, ucfLogo, 
    coastalCarolinaLogo, westVirginiaLogo, templeLogo, kentuckyLogo,
    georgiaStateLogo, ucIrvineLogo,
  ];
  
  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-slate-50">
      {/* Large gradient orbs with color - creating depth */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-conic from-blue-200/30 via-slate-200/20 to-blue-300/30 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-conic from-slate-300/30 via-blue-100/20 to-slate-200/30 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-gradient-radial from-blue-300/25 via-transparent to-transparent rounded-full blur-2xl"></div>
      
      {/* Geometric shapes - circles */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute top-0 left-0 w-96 h-96 border-2 border-slate-900 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/4 right-0 w-64 h-64 border-2 border-blue-900 rounded-full transform translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 border-2 border-slate-900 rounded-full transform translate-y-1/2"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 border-2 border-blue-800 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/4 w-56 h-56 border border-slate-800 rounded-full"></div>
      </div>
      
      {/* Geometric shapes - squares and rectangles */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute top-1/2 left-1/4 w-40 h-40 border-2 border-slate-900 rotate-45"></div>
        <div className="absolute top-1/3 right-1/4 w-60 h-60 border-2 border-blue-900 rotate-12"></div>
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 border border-slate-800 -rotate-12"></div>
        <div className="absolute top-2/3 left-1/3 w-28 h-28 border border-blue-800 rotate-45"></div>
      </div>
      
      {/* Diagonal stripes - multiple angles */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 60px,
            #1e293b 60px,
            #1e293b 61px
          )`
        }}
      ></div>
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 80px,
            #3b82f6 80px,
            #3b82f6 81px
          )`
        }}
      ></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(#1e293b 1px, transparent 1px),
            linear-gradient(90deg, #1e293b 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      ></div>
      
      {/* Dots pattern - varied sizes */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, #1e293b 1.5px, transparent 1.5px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          backgroundPosition: '30px 30px'
        }}
      ></div>
      
      {/* Hexagon shapes scattered */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-[0.04] animate-pulse-slow">
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
          <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 opacity-[0.04] rotate-45">
        <svg viewBox="0 0 100 100" className="w-full h-full text-blue-900">
          <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>
      <div className="absolute top-2/3 left-1/2 w-20 h-20 opacity-[0.03] -rotate-12">
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-800">
          <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>
      
      {/* Star/burst patterns */}
      <div className="absolute top-1/3 right-1/3 w-20 h-20 opacity-[0.03]">
        <svg viewBox="0 0 100 100" className="w-full h-full text-blue-900">
          <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>
      
      {/* Soccer/sports themed elements */}
      <div className="absolute top-1/4 right-1/2 w-16 h-16 opacity-[0.03] rotate-12">
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M50 5 L50 95 M5 50 L95 50" stroke="currentColor" strokeWidth="1"/>
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>
      <div className="absolute bottom-1/4 left-1/3 w-14 h-14 opacity-[0.03] -rotate-45">
        <svg viewBox="0 0 100 100" className="w-full h-full text-blue-800">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"/>
          <polygon points="50 15 35 35 35 65 50 85 65 65 65 35" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>
      
      {/* Triangle patterns */}
      <div className="absolute top-1/2 left-1/5 w-24 h-24 opacity-[0.03] rotate-30">
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
          <polygon points="50 10 90 90 10 90" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>
      <div className="absolute bottom-1/3 right-1/5 w-20 h-20 opacity-[0.03] -rotate-15">
        <svg viewBox="0 0 100 100" className="w-full h-full text-blue-900">
          <polygon points="50 10 90 90 10 90" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>
      
      {/* University Logo Ticker at Top - Continuous seamless scroll */}
      <div className="absolute top-0 left-0 right-0 py-2 md:py-3 overflow-hidden border-b border-slate-200 bg-white shadow-sm z-20">
        <div className="flex animate-scroll-continuous items-center gap-4 md:gap-6">
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
                  className="h-6 md:h-10 w-auto object-contain drop-shadow-sm opacity-80 hover:opacity-100"
                />
              </div>
            ))
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-8 pt-16 md:pt-20 py-8">
        {/* Venture Logo - Enhanced with Multiple Layers */}
        <div className="mb-6 md:mb-12 relative group">
          {/* Outer glow ring - animated */}
          <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-slate-900/20 animate-ping-slow"></div>
            <div className="absolute inset-0 rounded-full border-2 border-slate-900/10 animate-ping-slow" style={{animationDelay: '1s'}}></div>
          </div>
          
          {/* Shadow layers for depth */}
          <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-auto">
            <div className="absolute inset-0 rounded-full bg-slate-900/5 blur-2xl transform translate-y-2"></div>
            <div className="absolute inset-0 rounded-full bg-slate-900/10 blur-xl"></div>
          </div>
          
          {/* Main logo container with gradient border */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 p-1 rounded-full bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 shadow-2xl group-hover:scale-105 transition-all duration-300">
            <div className="w-full h-full rounded-full bg-white shadow-inner p-3 md:p-4 border-2 border-slate-100">
              <img 
                src={ventureLogoCircle} 
                alt="Venture USA" 
                className="w-full h-full object-contain drop-shadow-lg" 
              />
            </div>
          </div>
          
          {/* Corner accents */}
          <div className="absolute -top-2 -left-2 w-3 h-3 md:w-4 md:h-4 border-t-4 border-l-4 border-slate-900 opacity-30"></div>
          <div className="absolute -top-2 -right-2 w-3 h-3 md:w-4 md:h-4 border-t-4 border-r-4 border-slate-900 opacity-30"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 md:w-4 md:h-4 border-b-4 border-l-4 border-slate-900 opacity-30"></div>
          <div className="absolute -bottom-2 -right-2 w-3 h-3 md:w-4 md:h-4 border-b-4 border-r-4 border-slate-900 opacity-30"></div>
        </div>
        
        {/* Title - Clean and Professional */}
        <div className="mb-4 md:mb-6 relative">
          {/* Subtle text shadow for depth */}
          <div className="absolute inset-0 blur-sm">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-slate-300 text-center leading-tight mb-2">
              {labels.assessmentReport || "ASSESSMENT REPORT"}
            </h1>
          </div>
          <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 text-center leading-tight mb-2 px-2">
            {labels.assessmentReport || "ASSESSMENT REPORT"}
          </h1>
          <div className="relative h-0.5 md:h-1 w-32 md:w-48 mx-auto bg-gradient-to-r from-transparent via-slate-900 to-transparent rounded-full shadow-lg"></div>
        </div>
        
        <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-slate-600 font-medium text-center mb-6 md:mb-12 tracking-wide px-4">
          College Soccer Placement Consulting
        </p>
        
        {/* Player Name - Enhanced Professional Card */}
        {data.playerName && (
          <div className="mt-2 md:mt-4 relative group w-full max-w-xl px-4">
            {/* Card shadow layers */}
            <div className="absolute inset-0 bg-slate-900/10 blur-xl rounded-lg transform translate-y-2"></div>
            <div className="absolute inset-0 bg-slate-900/5 blur-2xl rounded-lg transform translate-y-3"></div>
            
            <div className="relative bg-gradient-to-br from-white via-white to-slate-50 rounded-lg border-2 border-slate-900 shadow-xl px-6 py-4 md:px-12 md:py-6 group-hover:scale-[1.02] transition-transform duration-300">
              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-2 h-2 md:w-3 md:h-3 border-t-2 border-l-2 border-slate-900"></div>
              <div className="absolute top-2 right-2 w-2 h-2 md:w-3 md:h-3 border-t-2 border-r-2 border-slate-900"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 md:w-3 md:h-3 border-b-2 border-l-2 border-slate-900"></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 md:w-3 md:h-3 border-b-2 border-r-2 border-slate-900"></div>
              
              <p className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 text-center uppercase tracking-wide break-words">
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
            transform: scale(1.15);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.04;
          }
          50% {
            opacity: 0.08;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const PlayerInfoSlide = ({ data, labels }: { data: AssessmentData; labels: Record<string, string> }) => (
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
              <span className="font-bold text-[hsl(var(--venture-navy))]">{labels.enrollmentOptions || "Enrollment"}:</span>
              <p className="text-gray-700">{data.enrollmentYear || "August 2027"}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--venture-blue))] mt-2"></div>
            <div>
              <span className="font-bold text-[hsl(var(--venture-navy))]">{labels.academicYear || "School Year"}:</span>
              <p className="text-gray-700">{data.schoolYear || "Freshman"}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--venture-blue))] mt-2"></div>
            <div>
              <span className="font-bold text-[hsl(var(--venture-navy))]">{labels.highSchoolGpa || "GPA"}:</span>
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

const RecommendationSlide = ({ data, labels }: { data: AssessmentData; labels: Record<string, string> }) => (
  <div className="w-full h-full min-h-[500px] bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] relative overflow-hidden">
    {/* Animated decorative elements */}
    <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full animate-pulse hidden md:block"></div>
    <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/5 rounded-full animate-pulse hidden md:block" style={{ animationDelay: '1s' }}></div>
    <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-white/3 rounded-full animate-pulse hidden md:block" style={{ animationDelay: '2s' }}></div>
    <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-white/3 rounded-full animate-pulse hidden md:block" style={{ animationDelay: '1.5s' }}></div>
    
    {/* Floating dots - hidden on mobile */}
    <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full hidden md:block"></div>
    <div className="absolute top-40 right-32 w-2 h-2 bg-white/30 rounded-full hidden md:block"></div>
    <div className="absolute bottom-32 left-40 w-2 h-2 bg-white/30 rounded-full hidden md:block"></div>
    <div className="absolute bottom-20 right-20 w-2 h-2 bg-white/30 rounded-full hidden md:block"></div>
    
    {/* Diagonal lines pattern */}
    <div className="absolute inset-0 opacity-5 hidden md:block">
      <div className="absolute top-0 left-0 w-full h-px bg-white transform -rotate-45 origin-top-left" style={{ width: '141%' }}></div>
      <div className="absolute top-20 left-0 w-full h-px bg-white transform -rotate-45 origin-top-left" style={{ width: '141%' }}></div>
      <div className="absolute top-40 left-0 w-full h-px bg-white transform -rotate-45 origin-top-left" style={{ width: '141%' }}></div>
    </div>
    
    <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-16 py-6 md:py-8 text-center">
      <div className="space-y-4 md:space-y-8 max-w-4xl">
        {/* Badge with glow */}
        <div className="inline-block relative animate-fade-in">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
          <div className="relative px-4 md:px-6 py-1.5 md:py-2 bg-white/10 backdrop-blur text-white text-xs md:text-sm font-bold rounded-full mb-2 md:mb-4 border border-white/20">
            {labels.recommendation?.toUpperCase() || "OUR RECOMMENDATION"}
          </div>
        </div>
        
        {/* Player name with underline effect */}
        <div className="relative animate-fade-in">
          <h2 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-8">
            {data.playerName || "Player Name"}
          </h2>
          <div className="absolute -bottom-2 md:-bottom-4 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-0.5 md:h-1 bg-white/30 rounded-full"></div>
        </div>
        
        {/* Division cards with enhanced styling */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-4 md:mb-8 animate-fade-in">
          {data.targetDivisions.map((division, idx) => (
            <div key={division} className="relative group" style={{ animationDelay: `${idx * 100}ms` }}>
              {/* Glow effect behind card */}
              <div className="absolute inset-0 bg-white/20 rounded-xl md:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-white/10 rounded-xl md:rounded-2xl blur-2xl scale-110"></div>
              
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white/40 rounded-tl-lg hidden md:block"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white/40 rounded-tr-lg hidden md:block"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white/40 rounded-bl-lg hidden md:block"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white/40 rounded-br-lg hidden md:block"></div>
              
              {/* Main card */}
              <div className="relative px-5 md:px-8 py-2.5 md:py-4 bg-white text-[hsl(var(--venture-navy))] rounded-xl md:rounded-2xl shadow-2xl font-black text-xl md:text-3xl transform group-hover:scale-105 transition-all duration-300 border-2 border-white/20">
                {division}
              </div>
            </div>
          ))}
        </div>
        
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 my-4 md:my-6 animate-fade-in">
          <div className="w-12 h-px bg-white/30"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-12 h-px bg-white/30"></div>
        </div>
        
        <p className="text-lg md:text-2xl text-white/90 font-semibold animate-fade-in">
          Player Assessment & Recommendation
        </p>
        
        <p className="text-base md:text-lg text-white/70 animate-fade-in">
          Presented by <span className="font-bold text-white">Venture USA</span>
        </p>
      </div>
    </div>
  </div>
);

const TargetDivisionsSlide = ({ data, labels }: { data: AssessmentData; labels: Record<string, string> }) => (
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
            {labels.targetDivisions?.toUpperCase() || "PLACEMENT TARGETS"}
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
              state={{ fromSlide: 3, data: data, labels: labels }}
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
                    <p className="text-white/90 text-sm font-semibold uppercase tracking-wider">{labels.recommended || "Recommended"}</p>
                  </div>
                )}
                
                {!isSelected && (
                  <div className="flex items-center justify-center gap-2 text-[hsl(var(--venture-blue))] opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm font-semibold uppercase tracking-wider">{labels.clickToLearnMore || "Click to learn more"}</p>
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

const DepartmentNotesSlide = ({ data, labels }: { data: AssessmentData; labels: Record<string, string> }) => (
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
            {labels.departmentNotes || "Department Assessment"}
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

const CostsSlide = ({ labels }: { labels: Record<string, string> }) => {
  const [showInfo, setShowInfo] = useState<string | null>(null);
  
  const costItems = [
    {
      id: 'sat',
      name: labels.satExams || 'SAT Exams',
      amount: '$200-$400',
      status: labels.satExamsStatus || '1-3 exams',
      description: labels.satExamsDescription || 'The SAT is a standardized test that students may have to take to get accepted into certain schools. This score helps universities evaluate academic readiness.'
    },
    {
      id: 'applications',
      name: labels.applications || 'Applications',
      amount: '$300-$500',
      status: labels.applicationsStatus || '4-6 schools',
      description: labels.applicationsDescription || 'Application fees for submitting your profile to multiple universities. Each school charges an application fee to process your admission materials.'
    },
    {
      id: 'flight',
      name: labels.flightTicket || 'Flight Ticket to USA',
      amount: '$600-$1,000',
      status: labels.flightTicketStatus || 'One-way',
      description: labels.flightTicketDescription || 'Cost of your flight from your home country to the United States. This is a one-way ticket to begin your college journey.'
    },
    {
      id: 'visa',
      name: labels.visaApproval || 'Visa Approval',
      amount: '$350',
      status: labels.visaApprovalStatus || 'F-1 Student',
      description: labels.visaApprovalDescription || 'The F-1 Student Visa approval process and associated fees required for international students to study in the United States.'
    },
    {
      id: 'budget',
      name: labels.universityYearlyBudget || 'University Yearly Budget',
      amount: '$10K-$20K',
      status: labels.universityYearlyBudgetStatus || 'Varies',
      description: labels.universityYearlyBudgetDescription || 'Average yearly cost after scholarships, discussed with family. Some students earn full scholarships while others may not receive any financial aid.'
    }
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-6 md:p-8 relative overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(var(--venture-blue))]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[hsl(var(--venture-navy))]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header with Logo */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="inline-block px-3 py-1 bg-[hsl(var(--venture-blue))]/10 text-[hsl(var(--venture-navy))] text-xs font-bold rounded-full mb-2">
              {labels.investment || "INVESTMENT"}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[hsl(var(--venture-navy))] uppercase tracking-tight">
              {labels.estimatedCosts || "Estimated Costs"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">{labels.yourPathToCollegeSoccer || "Your path to college soccer in the USA"}</p>
          </div>
          <img 
            src={ventureLogoCircle}
            alt="Venture USA" 
            className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-90" 
          />
        </div>
        
        {/* Modern Card Grid */}
        <div className="flex-1 grid grid-cols-1 gap-3 content-start overflow-y-auto pr-2 pb-2">
          {costItems.map((item, index) => (
            <div 
              key={item.id}
              className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-[hsl(var(--venture-blue))]/30"
            >
              {/* Gradient accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(var(--venture-navy))] via-[hsl(var(--venture-blue))] to-[hsl(var(--venture-navy))]"></div>
              
              <div className="p-3 md:p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {/* Number badge */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] flex items-center justify-center text-white font-black text-sm shadow-lg">
                    {index + 1}
                  </div>
                  
                  {/* Item info */}
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-black text-[hsl(var(--venture-navy))] mb-0.5">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">{item.status}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Amount */}
                  <div className="text-right">
                    <div className="text-xl md:text-2xl font-black bg-gradient-to-r from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] bg-clip-text text-transparent">
                      {item.amount}
                    </div>
                  </div>

                  {/* Info button */}
                  <button
                    onClick={() => setShowInfo(showInfo === item.id ? null : item.id)}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(var(--venture-blue))]/10 hover:bg-[hsl(var(--venture-blue))]/20 flex items-center justify-center transition-all duration-200 group"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 text-[hsl(var(--venture-blue))]" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Info panel */}
              {showInfo === item.id && (
                <div className="px-3 md:px-4 pb-3 md:pb-4">
                  <div className="bg-gradient-to-r from-[hsl(var(--venture-blue))]/10 to-blue-50 rounded-lg p-3 border-l-4 border-[hsl(var(--venture-blue))]">
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-3 bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200">
          <p className="text-xs md:text-sm text-gray-600 text-center">
            <span className="font-bold text-[hsl(var(--venture-navy))]">{labels.note || "Note"}:</span> {labels.costsNote || "All costs are estimates and may vary. Click the info buttons for details."}
          </p>
        </div>
      </div>
    </div>
  );
};

const PackagesSlide = ({ packagePrice1, packagePrice2, packagePrice3, labels }: { packagePrice1?: string; packagePrice2?: string; packagePrice3?: string; labels: Record<string, string> }) => {
  const [showInfo, setShowInfo] = useState<string | null>(null);
  
  const services = [
    {
      id: 'english',
      name: labels.englishExamSupport || 'English Exam Support',
      description: labels.englishExamSupportDescription || 'Comprehensive preparation and guidance for English proficiency exams like TOEFL, helping you achieve the scores needed for university admission.',
      pkg1: true,
      pkg2: false,
      pkg3: false
    },
    {
      id: 'video',
      name: labels.videoEditing || 'Video Editing',
      description: labels.videoEditingDescription || 'Professional editing of your soccer highlight videos to showcase your skills to college coaches in the most compelling way.',
      pkg1: true,
      pkg2: true,
      pkg3: true
    },
    {
      id: 'admissions',
      name: labels.admissionsSupport || 'Admissions Support',
      description: labels.admissionsSupportDescription || 'Expert assistance with college applications, essays, and all required documentation to maximize your chances of acceptance.',
      pkg1: true,
      pkg2: true,
      pkg3: false
    },
    {
      id: 'translation',
      name: labels.translationServices || 'Translation Services',
      description: labels.translationServicesDescription || 'Professional translation of documents, transcripts, and communications to ensure accurate and effective communication.',
      pkg1: true,
      pkg2: false,
      pkg3: false
    },
    {
      id: 'coach',
      name: labels.coachConnections || 'Coach Connections',
      description: labels.coachConnectionsDescription || 'Direct introductions and ongoing communication with college coaches who match your athletic and academic profile.',
      pkg1: true,
      pkg2: true,
      pkg3: true
    },
    {
      id: 'eligibility',
      name: labels.eligibilityCenter || 'Eligibility Center',
      description: labels.eligibilityCenterDescription || 'Complete support with NCAA Eligibility Center registration and requirements to ensure you can compete collegiately.',
      pkg1: true,
      pkg2: false,
      pkg3: false
    },
    {
      id: 'scholarship',
      name: labels.scholarshipOffers || 'Scholarship Offers',
      description: labels.scholarshipOffersDescription || 'Strategic guidance to secure the best possible scholarship offers and financial aid packages from universities.',
      pkg1: true,
      pkg2: true,
      pkg3: true
    },
    {
      id: 'visa',
      name: labels.visaSupport || 'VISA Support',
      description: labels.visaSupportDescription || 'Complete assistance with F-1 Student Visa application process, documentation, and interview preparation.',
      pkg1: true,
      pkg2: true,
      pkg3: false
    },
    {
      id: 'arrival',
      name: labels.usaArrivalSupport || 'USA Arrival Support',
      description: labels.usaArrivalSupportDescription || 'Help with logistics and orientation when arriving in the USA, ensuring a smooth transition to your new university.',
      pkg1: true,
      pkg2: true,
      pkg3: false
    },
    {
      id: 'placement',
      name: labels.universityPlacement || 'University Placement',
      description: labels.universityPlacementDescription || 'End-to-end support to secure your final placement at a university that matches your athletic, academic, and personal goals.',
      pkg1: true,
      pkg2: true,
      pkg3: true
    }
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-4 md:p-8 relative overflow-auto">
      {/* Subtle background patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(var(--venture-blue))]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[hsl(var(--venture-navy))]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-full flex flex-col">
        {/* Header with Logo */}
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div>
            <div className="inline-block px-3 py-1 bg-[hsl(var(--venture-blue))]/10 text-[hsl(var(--venture-navy))] text-xs font-bold rounded-full mb-2">
              {labels.serviceOptions || "SERVICE OPTIONS"}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-[hsl(var(--venture-navy))] uppercase tracking-tight">
              {labels.servicePackages || "Service Packages"}
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-1">{labels.choosePackage || "Choose the right package for your journey"}</p>
          </div>
          <img 
            src={ventureLogoCircle} 
            alt="Venture USA" 
            className="w-12 h-12 md:w-20 md:h-20 object-contain opacity-90" 
          />
        </div>
        
        {/* Package headers */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="text-xs font-bold text-gray-600">{labels.service || "SERVICE"}</div>
          <div className="text-center">
            <div className="bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] text-white rounded-lg px-2 py-1.5 md:py-2">
              <div className="text-[10px] md:text-xs font-black">{labels.package1 || "PACKAGE 1"}</div>
              <div className="text-[8px] md:text-[10px] opacity-80 hidden sm:block">{labels.fullService || "Full Service"}</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg px-2 py-1.5 md:py-2">
              <div className="text-[10px] md:text-xs font-black">{labels.package2 || "PACKAGE 2"}</div>
              <div className="text-[8px] md:text-[10px] opacity-80 hidden sm:block">{labels.standard || "Standard"}</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-br from-slate-600 to-slate-800 text-white rounded-lg px-2 py-1.5 md:py-2">
              <div className="text-[10px] md:text-xs font-black">{labels.package3 || "PACKAGE 3"}</div>
              <div className="text-[8px] md:text-[10px] opacity-80 hidden sm:block">{labels.essential || "Essential"}</div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="flex-1 overflow-y-auto pr-2 pb-2 space-y-1.5 md:space-y-2">
          {services.map((service, index) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-1 md:gap-2 p-2 md:p-3 items-center">
                {/* Service name with info button */}
                <div className="flex items-center gap-1 md:gap-2 min-w-0 pr-1">
                  <span className="text-[9px] md:text-sm font-bold text-[hsl(var(--venture-navy))] leading-tight line-clamp-2">
                    {service.name}
                  </span>
                  <button
                    onClick={() => setShowInfo(showInfo === service.id ? null : service.id)}
                    className="flex-shrink-0 w-4 h-4 md:w-6 md:h-6 rounded-full bg-[hsl(var(--venture-blue))]/10 hover:bg-[hsl(var(--venture-blue))]/20 flex items-center justify-center transition-all duration-200"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-2 w-2 md:h-3 md:w-3 text-[hsl(var(--venture-blue))]" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </button>
                </div>

                {/* Package checkmarks */}
                <div className="flex justify-center">
                  {service.pkg1 ? (
                    <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-sm md:shadow-md">
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  ) : (
                    <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  {service.pkg2 ? (
                    <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-sm md:shadow-md">
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  ) : (
                    <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  {service.pkg3 ? (
                    <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-sm md:shadow-md">
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  ) : (
                    <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Info panel */}
              {showInfo === service.id && (
                <div className="px-3 pb-3 col-span-4">
                  <div className="bg-gradient-to-r from-[hsl(var(--venture-blue))]/10 to-blue-50 rounded-lg p-3 border-l-4 border-[hsl(var(--venture-blue))]">
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Package Prices at Bottom */}
        {(packagePrice1?.trim() || packagePrice2?.trim() || packagePrice3?.trim()) && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            {packagePrice1?.trim() && (
              <div className="bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] text-white rounded-lg p-2 md:p-3 text-center shadow-lg">
                <div className="text-[9px] md:text-[10px] font-bold opacity-80 mb-0.5">PACKAGE 1</div>
                <div className="text-base md:text-xl font-black">${packagePrice1}</div>
                <div className="text-[8px] md:text-[9px] opacity-70">+7% for tax</div>
              </div>
            )}
            {packagePrice2?.trim() && (
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg p-2 md:p-3 text-center shadow-lg">
                <div className="text-[9px] md:text-[10px] font-bold opacity-80 mb-0.5">PACKAGE 2</div>
                <div className="text-base md:text-xl font-black">${packagePrice2}</div>
                <div className="text-[8px] md:text-[9px] opacity-70">+7% for tax</div>
              </div>
            )}
            {packagePrice3?.trim() && (
              <div className="bg-gradient-to-br from-slate-600 to-slate-800 text-white rounded-lg p-2 md:p-3 text-center shadow-lg">
                <div className="text-[9px] md:text-[10px] font-bold opacity-80 mb-0.5">PACKAGE 3</div>
                <div className="text-base md:text-xl font-black">${packagePrice3}</div>
                <div className="text-[8px] md:text-[9px] opacity-70">+7% for tax</div>
              </div>
            )}
          </div>
        )}

        {/* Guarantee Badge */}
        <div className="mt-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-2 md:p-3 shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <p className="text-xs md:text-base font-bold text-white text-center">
              {labels.placementGuarantee || "100% Placement Guarantee or Full Refund"}
            </p>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-2 md:mt-3 bg-white/80 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-gray-200">
          <p className="text-[10px] md:text-sm text-gray-600 text-center">
            <span className="font-bold text-[hsl(var(--venture-navy))]">{labels.contactUs || "Contact us"}</span> {labels.contactUsPackageNote || "to discuss which package best fits your needs and goals."}
          </p>
        </div>
      </div>
    </div>
  );
};

const TimelineSlide = ({ labels }: { labels: Record<string, string> }) => {
  const [showInfo, setShowInfo] = useState<string | null>(null);
  
  const steps = [
    {
      id: 'start',
      name: labels.startProcess || 'Start Process',
      description: labels.startProcessDescription || 'Initial consultation to understand your goals, assess your profile, and create a personalized roadmap for your college soccer journey.',
      timeframe: 'Week 1-2'
    },
    {
      id: 'coach',
      name: labels.coachMeetings || 'Coach Meetings',
      description: labels.coachMeetingsDescription || 'Direct connections with college coaches across multiple divisions, introducing your athletic and academic profile to programs that match your goals.',
      timeframe: 'Month 1-3'
    },
    {
      id: 'video',
      name: labels.videoEditingTimeline || 'Video Editing',
      description: labels.videoEditingTimelineDescription || 'Professional editing of your soccer highlight videos to showcase your skills, positioning, and game intelligence to college coaches.',
      timeframe: 'Month 1-2'
    },
    {
      id: 'recruitment',
      name: labels.activeRecruitment || 'Active Recruitment',
      description: labels.activeRecruitmentDescription || 'Ongoing communication with college coaches, managing interest from programs, and coordinating campus visits or virtual meetings.',
      timeframe: 'Month 2-8'
    },
    {
      id: 'transcript',
      name: labels.transcriptEvaluation || 'Transcript Evaluation',
      description: labels.transcriptEvaluationDescription || 'Complete academic evaluation and transcript preparation to meet NCAA eligibility requirements and university admission standards.',
      timeframe: 'Month 3-4'
    },
    {
      id: 'connections',
      name: labels.universityConnections || 'University Connections',
      description: labels.universityConnectionsDescription || 'Building strong relationships with universities that are the best fit for your athletic ability, academic interests, and scholarship needs.',
      timeframe: 'Month 4-8'
    },
    {
      id: 'applications',
      name: labels.applicationsSubmitted || 'Applications Submitted',
      description: labels.applicationsSubmittedDescription || 'Complete and submit applications to selected universities with all required documents, essays, and supporting materials.',
      timeframe: 'Month 6-9'
    },
    {
      id: 'travel',
      name: labels.travelPreparation || 'Travel Preparation',
      description: labels.travelPreparationDescription || 'Visa processing, flight arrangements, accommodation planning, and all logistics for your move to the United States.',
      timeframe: 'Month 10-12'
    },
    {
      id: 'journey',
      name: labels.startCollegeJourney || 'Start College Journey',
      description: labels.startCollegeJourneyDescription || 'Arrival at your university, orientation, meeting your team, and beginning your college soccer and academic career in the USA.',
      timeframe: 'August'
    }
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-6 md:p-8 relative overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(var(--venture-blue))]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[hsl(var(--venture-navy))]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header with Logo */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="inline-block px-3 py-1 bg-[hsl(var(--venture-blue))]/10 text-[hsl(var(--venture-navy))] text-xs font-bold rounded-full mb-2">
              {labels.yourJourney || "YOUR JOURNEY"}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[hsl(var(--venture-navy))] uppercase tracking-tight">
              {labels.stepByStep || "Step by Step"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">2025 - 2027 {labels.timeline || "Timeline"}</p>
          </div>
          <img 
            src={ventureLogoCircle} 
            alt="Venture USA" 
            className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-90" 
          />
        </div>
        
        {/* Timeline Steps */}
        <div className="flex-1 overflow-y-auto pr-2 pb-2">
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[hsl(var(--venture-navy))] via-[hsl(var(--venture-blue))] to-[hsl(var(--venture-navy))]"></div>
            
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={step.id} className="relative pl-12">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-3 w-9 h-9 rounded-full bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] flex items-center justify-center text-white font-black text-xs shadow-lg z-10">
                    {index + 1}
                  </div>
                  
                  {/* Step card */}
                  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[hsl(var(--venture-blue))]">
                    <div className="p-3 md:p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="text-base md:text-lg font-black text-[hsl(var(--venture-navy))] mb-1">
                            {step.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-semibold">{step.timeframe}</span>
                          </div>
                        </div>
                        
                        {/* Info button */}
                        <button
                          onClick={() => setShowInfo(showInfo === step.id ? null : step.id)}
                          className="flex-shrink-0 w-7 h-7 rounded-full bg-[hsl(var(--venture-blue))]/10 hover:bg-[hsl(var(--venture-blue))]/20 flex items-center justify-center transition-all duration-200"
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 text-[hsl(var(--venture-blue))]" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path 
                              fillRule="evenodd" 
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                              clipRule="evenodd" 
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Info panel */}
                      {showInfo === step.id && (
                        <div className="mt-3">
                          <div className="bg-gradient-to-r from-[hsl(var(--venture-blue))]/10 to-blue-50 rounded-lg p-3 border-l-4 border-[hsl(var(--venture-blue))]">
                            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-3 bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200">
          <p className="text-xs md:text-sm text-gray-600 text-center">
            <span className="font-bold text-[hsl(var(--venture-navy))]">Timeline may vary</span> based on individual circumstances and university schedules.
          </p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSliderSlide = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      name: "Nico Torres", 
      school: "Utah Valley",
      quote: "Joao helped me find an incredible program in record time, my situation was not easy, and he was able in a couple of weeks to help me and give me the opportunity to compete at the best level in my last season."
    },
    {
      name: "Umberto Pela",
      school: "Lehigh",
      quote: "Working with Joao and Luca has been a great experience. Even though we had 9 hours difference due to the time zone, they were always available to chat and share his thoughts. Him and Luca provided me with great opportunities, suggestions, and understood my needs perfectly."
    },
    {
      name: "Jozo Cancar",
      school: "Tyler JC",
      quote: "I can live my dream because of one individual, who is essentially the reason I am in the US. He always thought I had potential and always had faith in me. Every time, he made sure to let me know that I meant more to him than just a soccer player."
    },
    {
      name: "Diego Castillo",
      school: "Utah Valley",
      quote: "Working with Joao and Rodrigo in particular was the best decision I could have made. They made the process of finding a university fast and beneficial for me, thanks to them and their team I found a place which I can now call my new home."
    },
    {
      name: "Alex Bamford",
      school: "Marshall",
      quote: "Joao was incredibly helpful in securing my move to Marshall university. He has a wide range of contacts across both d2 and d1 and having gone through the college game himself knows the system very well. He is also a great person who only wants the best for those he works with."
    },
    {
      name: "Tadej Pitvoresk",
      school: "Transfer Success",
      quote: "Working with Joao was amazing! Not only I got a great agent that provided me with everything I needed and wanted, I also got a great friend! He did exactly everything that he said he would, gave me great options with schools, some great advices."
    },
    {
      name: "Fernando Silva",
      school: "UTRGV",
      quote: "Delgado was a key person in the pathway I took for my life. Since the first day we met, he always showed me a high level of professionalism and excellence. And mainly and most important, a very honest and caring person."
    },
    {
      name: "Quenzi Heuerman",
      school: "Seton Hall",
      quote: "Joao helped me from the start looking for a new school as I entered the transfer portal. He was consistent by always giving me great updates and getting me in touch with top schools. Thanks to his service, I was able to contact multiple top programs."
    },
    {
      name: "Kostyantyn",
      school: "Student Athlete",
      quote: "When the first time I got on contact with Joao, I realized that he was the person I can trust. He didn't work with me as a businessman but as friend that look on everything from my perspective. Joao wasn't an agent for me but a friend that could help with everything!"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-6 md:p-8 relative overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(var(--venture-blue))]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[hsl(var(--venture-navy))]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header with Logo */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="inline-block px-3 py-1 bg-[hsl(var(--venture-blue))]/10 text-[hsl(var(--venture-navy))] text-xs font-bold rounded-full mb-2">
              TESTIMONIALS
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[hsl(var(--venture-navy))] uppercase tracking-tight">
              Hear from Even More<br/>of Our Athletes
            </h2>
          </div>
          <img 
            src={ventureLogoCircle} 
            alt="Venture USA" 
            className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-90" 
          />
        </div>

        {/* Testimonial Slider */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-4xl">
            {/* Main testimonial card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-gray-100 relative overflow-hidden">
              {/* Quote decoration */}
              <div className="absolute top-6 left-6 text-8xl text-[hsl(var(--venture-blue))]/10 font-serif leading-none">
                "
              </div>
              
              <div className="relative z-10">
                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                
                {/* Attribution */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl md:text-2xl font-black text-[hsl(var(--venture-navy))]">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-sm md:text-base text-[hsl(var(--venture-blue))] font-semibold">
                      {testimonials[currentTestimonial].school}
                    </p>
                  </div>
                  
                  {/* Counter */}
                  <div className="text-sm text-gray-400 font-semibold">
                    {currentTestimonial + 1} / {testimonials.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[hsl(var(--venture-blue))] hover:text-white transition-all duration-200 group"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[hsl(var(--venture-blue))] hover:text-white transition-all duration-200 group"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? "bg-[hsl(var(--venture-blue))] w-8" 
                      : "bg-gray-300 w-2 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactSlide = ({ labels }: { labels: Record<string, string> }) => (
  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-[hsl(var(--venture-navy))] to-blue-950 relative overflow-auto">
    {/* Modern geometric background */}
    <div className="absolute inset-0">
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[hsl(var(--venture-blue))]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>
    
    {/* Grid pattern overlay */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>
    </div>

    <div className="relative z-10 min-h-full flex flex-col items-center justify-center px-4 md:px-8 py-6 md:py-8">
      {/* Logo */}
      <div className="mb-4 md:mb-6 relative group">
        <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="relative w-20 h-20 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white/20">
          <img src={ventureLogoCircle} alt="Venture USA" className="w-16 h-16 md:w-28 md:h-28 object-contain" />
        </div>
      </div>

      {/* Main heading */}
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-white uppercase text-center leading-tight mb-3 md:mb-4">
        {labels.readyToStart || "Ready to Start"}<br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
          {labels.yourJourneyQuestion || "Your Journey?"}
        </span>
      </h1>
      
      {/* Decorative line */}
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
        <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-white/50"></div>
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
        <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-white/50"></div>
      </div>
      
      {/* Subheading */}
      <p className="text-sm md:text-xl text-blue-100 font-semibold text-center max-w-2xl mb-5 md:mb-6 px-2">
        {labels.letsMakeYourDream || "Let's make your college soccer dream a reality"}
      </p>

      {/* Contact cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full max-w-3xl mb-4 md:mb-4 px-2">
        <div className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div className="text-left min-w-0">
              <p className="text-white/70 text-xs md:text-sm font-semibold">{labels.emailUs || "Email Us"}</p>
              <p className="text-white font-bold text-sm md:text-base truncate">admin@venturesportsusa.com</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-white/70 text-xs md:text-sm font-semibold">{labels.getStarted || "Get Started"}</p>
              <p className="text-white font-bold text-sm md:text-base">{labels.callYourAgent || "Call Your Agent"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Note */}
      <p className="text-white/60 text-xs md:text-sm text-center max-w-lg px-4">
        {labels.joinAthletes || "Join 350+ athletes who have successfully placed at top universities across the United States"}
      </p>
    </div>
  </div>
);
