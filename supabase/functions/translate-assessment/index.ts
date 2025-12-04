import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// All UI labels that need translation
const UI_LABELS = {
  // Cover slide
  assessmentReport: "ASSESSMENT REPORT",
  preparedFor: "Prepared for",
  
  // Player info slide
  playerInformation: "Player Information",
  enrollmentOptions: "Enrollment Options",
  academicYear: "Academic Year",
  highSchoolGpa: "High School GPA",
  targetDivisions: "Target Divisions",
  
  // Recommendation slide
  recommendation: "Recommendation",
  ventureRecommendation: "Venture Recommendation",
  
  // Target divisions slide
  targetDivisionsTitle: "Target Divisions",
  yourPathway: "Your Pathway to College Soccer",
  
  // Department notes slide
  departmentNotes: "Department Notes",
  
  // Costs slide
  estimatedCosts: "Estimated Costs",
  annualBudget: "Annual Budget",
  tuitionFees: "Tuition & Fees",
  roomBoard: "Room & Board",
  booksSupplies: "Books & Supplies",
  personalExpenses: "Personal Expenses",
  
  // Packages slide
  servicePackages: "Service Packages",
  package1: "Package 1",
  package2: "Package 2", 
  package3: "Package 3",
  fullService: "Full Service",
  standard: "Standard",
  basic: "Basic",
  mostPopular: "Most Popular",
  
  // Timeline slide
  timeline: "Timeline",
  recruitmentTimeline: "Recruitment Timeline",
  
  // Contact slide
  readyToStart: "Ready to Start?",
  getInTouch: "Get in Touch",
  contactUs: "Contact Us",
  scheduleCall: "Schedule a Call",
  
  // Common
  perYear: "per year",
  learnMore: "Learn More",
  next: "Next",
  previous: "Previous",
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
            content: `You are a professional translator. Translate all text to ${targetLanguage}. 

IMPORTANT RULES:
1. Keep the same formatting and structure
2. Maintain a professional tone appropriate for sports/college recruitment
3. For the UI_LABELS_JSON section, return valid JSON with the same keys but translated values
4. Return your response in this exact format:

DEPARTMENT_NOTES:
[translated department notes here]

UI_LABELS_JSON:
[translated JSON here]

If only one section was provided, only return that section.`
          },
          {
            role: "user",
            content: contentToTranslate
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("AI Gateway error:", errorData);
      throw new Error("Translation failed");
    }

    const data = await response.json();
    const responseText = data.choices?.[0]?.message?.content || "";
    
    console.log("AI Response:", responseText);

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
        const jsonStr = labelsMatch[1].trim();
        // Handle markdown code blocks
        const cleanJson = jsonStr.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        translatedLabels = JSON.parse(cleanJson);
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