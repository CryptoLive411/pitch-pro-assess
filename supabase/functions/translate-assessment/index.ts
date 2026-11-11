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
  fullService: "Elite",
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
  usaArrivalSupport: "University Arrival Support",
  usaArrivalSupportDescription: "Help with logistics and orientation when arriving in the USA, ensuring a smooth transition to your new university.",
  universityPlacement: "University Placement",
  universityPlacementDescription: "End-to-end support to secure your final placement at a university that matches your athletic, academic, and personal goals.",
  placementGuarantee: "100% Placement Guarantee or Full Refund",
  contactUs: "Contact us",
  contactUsPackageNote: "to discuss which package best fits your needs and goals.",
  
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
  
  // Division info page - UI labels
  divisionOverview: "DIVISION OVERVIEW",
  scholarships: "Scholarships",
  academicRequirements: "Academic Requirements",
  keyBenefits: "Key Benefits",
  keyDifferences: "Key Differences",
  idealFor: "Ideal For",
  backToAssessment: "Back to Assessment",
  divisionNotFound: "Division not found",
  goBack: "Go Back",
  readyToExplore: "Ready to explore",
  contactVenture: "Contact Venture USA to discuss your college soccer placement options",
  returnToAssessment: "Return to Assessment",
  
  // Division content - NCAA D1
  ncaaD1Name: "NCAA Division I",
  ncaaD1ShortName: "NCAA D1",
  ncaaD1Description: "The highest level of collegiate athletics featuring top-tier competition, comprehensive athletic programs, and the largest budgets and resources in college sports.",
  ncaaD1Benefit1: "Full athletic scholarships available (headcount or equivalency depending on sport)",
  ncaaD1Benefit2: "Largest budgets with state-of-the-art facilities and training resources",
  ncaaD1Benefit3: "Highest level of competition and national exposure",
  ncaaD1Benefit4: "National television coverage and extensive media attention",
  ncaaD1Benefit5: "Professional scouts actively recruiting from programs",
  ncaaD1Benefit6: "Comprehensive support staff including trainers, nutritionists, and sports psychologists",
  ncaaD1Benefit7: "Recent expanded scholarship protections and benefits (health/academic support)",
  ncaaD1Scholarships: "Full athletic scholarships available. Some sports offer 'headcount' scholarships (full rides only), while most are 'equivalency' scholarships (can be split/partial). Amounts vary by sport and school budget.",
  ncaaD1Academic: "16 core courses with minimum 2.3 core-GPA. Standardized test scores (SAT/ACT) not required for initial eligibility since 2023. Certification through NCAA Eligibility Center required.",
  ncaaD1Diff1: "Unlike D2/D3, offers full athletic scholarships with largest financial aid packages",
  ncaaD1Diff2: "Highest time commitment with rigorous year-round training schedules and extensive travel",
  ncaaD1Diff3: "National competition schedule vs. more regional focus in other divisions",
  ncaaD1Diff4: "Most extensive compliance and recruiting regulations compared to other divisions",
  ncaaD1IdealFor: "Elite athletes seeking the highest competition level, professional aspirations, full scholarship opportunities, and maximum exposure to scouts and media.",
  
  // Division content - NCAA D2
  ncaaD2Name: "NCAA Division II",
  ncaaD2ShortName: "NCAA D2",
  ncaaD2Description: "A balanced approach between athletics and academics, offering competitive sports with partial scholarship opportunities and emphasis on well-rounded college experience.",
  ncaaD2Benefit1: "Partial athletic scholarships available (equivalency-based)",
  ncaaD2Benefit2: "Strong balance between athletics, academics, and campus life",
  ncaaD2Benefit3: "Quality coaching and competitive facilities",
  ncaaD2Benefit4: "Regional competition with select national tournaments",
  ncaaD2Benefit5: "More flexibility for academic pursuits and other campus activities",
  ncaaD2Benefit6: "Strong sense of community and campus involvement",
  ncaaD2Benefit7: "Better work-life balance compared to Division I",
  ncaaD2Scholarships: "Partial athletic scholarships available. Most sports use equivalency system where coaches can split scholarships across the roster. Typically covers 30-60% of total costs depending on the sport and program.",
  ncaaD2Academic: "16 core courses with minimum 2.2 core-GPA. Standardized test scores (SAT/ACT) not required for initial eligibility since August 2023. Certification through NCAA Eligibility Center required.",
  ncaaD2Diff1: "Unlike D1, offers partial (not full) scholarships with more limited budgets",
  ncaaD2Diff2: "Unlike D3, athletic scholarships are available and permitted",
  ncaaD2Diff3: "Less time-intensive than D1, allowing better balance for academics and social life",
  ncaaD2Diff4: "More regional competition focus vs. D1's extensive national travel",
  ncaaD2Diff5: "Smaller program budgets but still competitive athletic experience",
  ncaaD2IdealFor: "Strong athletes wanting competitive college sports with athletic financial aid while prioritizing academic success, campus involvement, and a well-rounded college experience.",
  
  // Division content - NCAA D3
  ncaaD3Name: "NCAA Division III",
  ncaaD3ShortName: "NCAA D3",
  ncaaD3Description: "Emphasizes the complete student-athlete experience with strong academic focus, personal development, and integration of athletics into broader college life.",
  ncaaD3Benefit1: "Strong emphasis on academic excellence and educational outcomes",
  ncaaD3Benefit2: "Better balance between sports, academics, social life, and personal growth",
  ncaaD3Benefit3: "Academic merit scholarships and need-based financial aid available",
  ncaaD3Benefit4: "Excellent coaching with competitive, well-organized programs",
  ncaaD3Benefit5: "Smaller class sizes with personalized academic attention",
  ncaaD3Benefit6: "Freedom to pursue double majors, internships, study abroad, and campus activities",
  ncaaD3Benefit7: "Regional competition schedule allows for manageable time commitments",
  ncaaD3Scholarships: "NO athletic scholarships permitted by rule. However, students can receive academic merit scholarships and/or need-based financial aid like any other student. Many D3 athletes receive substantial non-athletic aid packages.",
  ncaaD3Academic: "Academic standards are set by each individual institution (not by NCAA). Generally higher academic expectations than D1/D2. NCAA Eligibility Center is only used for international students (amateurism verification only).",
  ncaaD3Diff1: "NO athletic scholarships - this is the major difference from D1/D2 and NAIA",
  ncaaD3Diff2: "Can receive generous academic merit aid and need-based aid instead",
  ncaaD3Diff3: "Significantly more flexibility to pursue academic interests, double majors, and internships",
  ncaaD3Diff4: "Less time commitment than D1/D2 allows for broader college experience and personal development",
  ncaaD3Diff5: "Institution-set academic standards rather than NCAA-mandated minimums",
  ncaaD3IdealFor: "Student-athletes who prioritize academics and well-rounded personal development, have strong academic credentials for merit scholarships, and want to fully integrate athletics into a comprehensive college experience.",
  
  // Division content - NAIA
  naiaName: "NAIA",
  naiaShortName: "NAIA",
  naiaDescription: "Character-driven competitive athletics at smaller institutions with flexible scholarship opportunities, streamlined eligibility requirements, and emphasis on student-athlete development. (Note: NAIA merged divisions in 2020 and now operates as a single division.)",
  naiaBenefit1: "Athletic scholarships available with flexible distribution across team rosters",
  naiaBenefit2: "More flexible and streamlined eligibility requirements than NCAA",
  naiaBenefit3: "Character-driven athletics philosophy emphasizing values and personal growth",
  naiaBenefit4: "Smaller school environment providing personal attention and close relationships",
  naiaBenefit5: "Strong sense of community, team culture, and campus connection",
  naiaBenefit6: "Faster, less bureaucratic decision-making and recruiting process",
  naiaBenefit7: "Can receive athletic aid immediately without redshirt year requirements",
  naiaBenefit8: "Competitive programs that can match or exceed some D2 level play",
  naiaScholarships: "Athletic scholarships available. NAIA uses sport-by-sport financial aid limits (equivalency system). Teams can split awards flexibly across roster. Aid generally counts toward limits only if athlete competes in more than 20% of season.",
  naiaAcademic: "Instant eligibility with 2.3+ final high school GPA. Alternatively, meet 2 of 3: (1) 2.0 HS GPA, (2) top 50% class rank, or (3) test score of ACT 18 or SAT 970. Progress-toward-degree and GPA rules apply after first year. Verification through NAIA Eligibility Center.",
  naiaDiff1: "More flexible eligibility requirements compared to NCAA's strict regulations",
  naiaDiff2: "Smaller institutions provide more personalized attention and mentorship than large universities",
  naiaDiff3: "Can receive athletic aid and compete immediately without redshirt requirements unlike some NCAA situations",
  naiaDiff4: "Less bureaucratic recruiting and compliance process than NCAA divisions",
  naiaDiff5: "Character-driven mission emphasizing values and holistic development alongside athletics",
  naiaDiff6: "No longer has Division I/Division II (merged in 2020) - now operates as single competitive division",
  naiaIdealFor: "Athletes seeking competitive sports at smaller, community-focused institutions with flexible academic requirements, athletic scholarship opportunities, personalized attention, and character-based athletic philosophy.",
  
  // Division content - JUCO
  jucoName: "Junior College (JUCO)",
  jucoShortName: "JUCO",
  jucoDescription: "Two-year community college programs offering an accessible pathway to four-year institutions with cost-effective education, athletic development opportunities, and second chances for late bloomers.",
  jucoBenefit1: "Athletic scholarships available (full or partial depending on program)",
  jucoBenefit2: "Clear pathway and transfer opportunities to four-year colleges",
  jucoBenefit3: "Cost-effective education with significantly lower tuition than universities",
  jucoBenefit4: "Opportunity to improve academic standing (GPA, test scores) before transferring",
  jucoBenefit5: "Develop athletic skills and physical maturity with quality coaching",
  jucoBenefit6: "Build impressive highlight film and recruitment profile for four-year programs",
  jucoBenefit7: "Flexible transfer options to multiple four-year institutions",
  jucoBenefit8: "Second chance for athletes who need additional development time",
  jucoScholarships: "Full or partial athletic scholarships available depending on the program and sport. JUCO programs vary widely in scholarship budgets and offerings.",
  jucoAcademic: "High school diploma or GED required. Specific requirements vary by institution and are generally more accessible than four-year programs. Open-door admission policies at many community colleges.",
  jucoDiff1: "Two-year commitment vs. traditional four-year programs",
  jucoDiff2: "Provides opportunity to improve grades, test scores, and skills before transferring to four-year schools",
  jucoDiff3: "Significantly lower overall tuition costs compared to universities",
  jucoDiff4: "Acts as 'second chance' or development pathway for athletes who need more time",
  jucoDiff5: "More flexible admission standards and academic requirements than four-year institutions",
  jucoDiff6: "Opportunity to reassess goals and build stronger recruitment profile for transfer",
  jucoIdealFor: "Athletes needing academic improvement, physical/skill development, or a cost-effective second chance to showcase abilities and build a strong recruitment profile before transferring to a four-year college program.",
  
  // Division content - Gap Year
  gapYearName: "Gap Year / Post-Grad",
  gapYearShortName: "Gap Year",
  gapYearDescription: "Take an additional year between high school and college to train intensively, improve academically, mature personally, and enhance recruitment profile before enrolling in college athletics.",
  gapYearBenefit1: "Extra year of physical development, strength training, and technical skill refinement",
  gapYearBenefit2: "Time to improve academic credentials including GPA and standardized test scores",
  gapYearBenefit3: "Gain emotional maturity, life experience, and mental readiness for college demands",
  gapYearBenefit4: "Extended recruitment period with more time to connect with coaches and showcase abilities",
  gapYearBenefit5: "Opportunity to build stronger, more compelling highlight footage and recruitment materials",
  gapYearBenefit6: "Work with professional coaches, trainers, and attend showcases for maximum exposure",
  gapYearBenefit7: "Reduce injury risk by arriving at college physically and mentally prepared",
  gapYearBenefit8: "Clarify college and career goals with more time for reflection and planning",
  gapYearScholarships: "Not applicable during gap year - this is a preparation year focused on positioning for better scholarship opportunities when enrolling in college the following year.",
  gapYearAcademic: "Not applicable during gap year - use this time strategically to improve academic standing, retake standardized tests for better scores, and strengthen overall academic profile.",
  gapYearDiff1: "Not enrolling in college immediately - strategic pause for development and preparation",
  gapYearDiff2: "Additional time for physical maturation, skill development, and mental/emotional growth",
  gapYearDiff3: "Opportunity to significantly improve academic credentials by retaking SAT/ACT for higher scores",
  gapYearDiff4: "Extended recruitment timeline providing more opportunities to connect with coaches and programs",
  gapYearDiff5: "Can attend post-graduate prep programs, train professionally, or work while preparing",
  gapYearDiff6: "Arrive at college more physically developed, emotionally mature, and academically prepared",
  gapYearIdealFor: "Athletes who need additional physical, academic, or emotional development time; want extended recruitment exposure; or seek to significantly improve their profile and positioning for better college opportunities and scholarship offers.",
  
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