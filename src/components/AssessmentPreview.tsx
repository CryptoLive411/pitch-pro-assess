import { AssessmentScroll } from "./AssessmentScroll";
import { AssessmentData } from "./AssessmentEditor";

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
  satExams: "English Exams",
  satExamsStatus: "1-3 exams",
  satExamsDescription: "English exams students may have to take to get accepted into certain schools. These scores help universities evaluate academic readiness.",
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
  costsNote: "All costs are estimates and may vary.",
  note: "Note",
  
  // Packages slide
  serviceOptions: "SERVICE OPTIONS",
  servicePackages: "Service Packages",
  choosePackage: "Choose the right package for your journey",
  service: "SERVICE",
  package1: "PACKAGE 1",
  package2: "PACKAGE 2",
  package3: "PACKAGE 3",
  fullService: "Elite",
  standard: "Standard",
  essential: "Essential",
  package4: "PACKAGE 4",
  customPackage: "Custom",
  yearlySupport: "Yearly Support",
  yearlySupportDescription: "Elite includes four years of support, Standard includes two years, and Essential includes one year.",
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
  usaArrivalSupport: "University Arrival Support",
  usaArrivalSupportDescription: "Help with logistics and orientation when arriving in the USA, ensuring a smooth transition to your new university.",
  universityPlacement: "University Placement",
  universityPlacementDescription: "End-to-end support to secure your final placement at a university that matches your athletic, academic, and personal goals.",
  transferSupport: "Transfer Support",
  transferSupportDescription: "Support through one college transfer if you move to a new program. Included with Elite and Standard.",
  
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
  joinAthletes: "600+ athletes placed",
  
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
  const labels: Record<string, string> = { ...(data.translatedLabels || DEFAULT_LABELS), fullService: "Elite", usaArrivalSupport: "University Arrival Support", satExams: "English Exams" };
  for (const key of ["yearlySupportDescription", "transferSupportDescription"]) {
    if (labels[key]?.includes("Full Service")) labels[key] = labels[key].split("Full Service").join("Elite");
  }
  if (labels.satExamsDescription?.includes("The SAT is a standardized test")) {
    labels.satExamsDescription = DEFAULT_LABELS.satExamsDescription;
  }
  const programMode: 'college' | 'pro' | 'both' =
    data.programMode || (data.includeProAcademy ? 'both' : 'college');

  return (
    <AssessmentScroll
      data={data}
      labels={labels}
      programMode={programMode}
      onBack={onBack}
      isPublicView={isPublicView}
    />
  );
};
