import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Comprehensive UI labels that need translation
const UI_LABELS = {
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { text, targetLanguage, translateLabels } = await req.json();

    // Skip translation if already English
    if (targetLanguage === "English") {
      return new Response(
        JSON.stringify({ 
          translatedText: text || "",
          translatedLabels: translateLabels ? UI_LABELS : null 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Prepare content to translate
    let contentToTranslate = "";
    
    if (text) {
      contentToTranslate += `DEPARTMENT_NOTES:\n${text}\n\n`;
    }
    
    if (translateLabels) {
      contentToTranslate += `UI_LABELS_JSON:\n${JSON.stringify(UI_LABELS, null, 2)}`;
    }

    console.log("Translating to:", targetLanguage);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a professional translator specializing in sports and education content. Translate all text to ${targetLanguage}. 

CRITICAL RULES:
1. Keep the same formatting, structure, and line breaks
2. Maintain a professional tone appropriate for sports/college recruitment
3. Keep proper nouns like "NCAA", "NAIA", "JUCO", "TOEFL", "SAT", "F-1" unchanged
4. For the UI_LABELS_JSON section, return valid JSON with the EXACT same keys but translated values
5. Return your response in this EXACT format:

DEPARTMENT_NOTES:
[translated department notes here - if provided]

UI_LABELS_JSON:
[translated JSON object here - if provided]

IMPORTANT: The JSON must be valid and parseable. Keep all keys in English, only translate the values.`
          },
          {
            role: "user",
            content: contentToTranslate
          }
        ],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("AI Gateway error:", errorData);
      throw new Error("Translation failed");
    }

    const data = await response.json();
    const responseText = data.choices?.[0]?.message?.content || "";
    
    console.log("AI Response length:", responseText.length);

    // Parse the response
    let translatedText = text || "";
    let translatedLabels = translateLabels ? UI_LABELS : null;

    // Extract department notes
    const notesMatch = responseText.match(/DEPARTMENT_NOTES:\s*([\s\S]*?)(?=UI_LABELS_JSON:|$)/);
    if (notesMatch && notesMatch[1]) {
      translatedText = notesMatch[1].trim();
    }

    // Extract UI labels JSON
    const labelsMatch = responseText.match(/UI_LABELS_JSON:\s*([\s\S]*?)$/);
    if (labelsMatch && labelsMatch[1]) {
      try {
        // Try to extract JSON from the response
        let jsonStr = labelsMatch[1].trim();
        // Handle markdown code blocks
        jsonStr = jsonStr.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        // Find the JSON object
        const jsonStart = jsonStr.indexOf('{');
        const jsonEnd = jsonStr.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
          jsonStr = jsonStr.substring(jsonStart, jsonEnd + 1);
        }
        translatedLabels = JSON.parse(jsonStr);
        console.log("Successfully parsed translated labels");
      } catch (e) {
        console.error("Failed to parse translated labels:", e);
        // Keep original labels if parsing fails
        translatedLabels = UI_LABELS;
      }
    }

    return new Response(
      JSON.stringify({ translatedText, translatedLabels }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Translation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Translation failed";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});