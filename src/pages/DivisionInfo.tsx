import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, DollarSign, GraduationCap, Users, Target } from "lucide-react";
import ventureLogo from "@/assets/venture-logo-white.png";

const divisionData = {
  "ncaa-d1": {
    name: "NCAA Division I",
    shortName: "NCAA D1",
    description: "The highest level of collegiate athletics, featuring top-tier competition and comprehensive athletic programs.",
    benefits: [
      "Full athletic scholarships available",
      "Highest level of competition and exposure",
      "State-of-the-art facilities and training resources",
      "National television coverage and media attention",
      "Professional scouts actively recruiting",
      "Extensive support staff (trainers, nutritionists, sports psychologists)",
    ],
    scholarships: "Full athletic scholarships available - covers tuition, room, board, and books",
    academicRequirements: "Minimum 2.3 GPA in core courses, qualifying SAT/ACT scores",
    differences: [
      "Unlike D2/D3, offers full athletic scholarships",
      "Highest time commitment - essentially a full-time job",
      "More travel and national competition schedule",
      "Larger roster sizes and more competitive tryouts",
    ],
    idealFor: "Elite athletes seeking the highest competition level, professional aspirations, and full scholarship opportunities",
  },
  "ncaa-d2": {
    name: "NCAA Division II",
    shortName: "NCAA D2",
    description: "A balance between athletics and academics, offering competitive sports with partial scholarship opportunities.",
    benefits: [
      "Partial athletic scholarships available",
      "Strong balance of athletics and academics",
      "Quality facilities and coaching",
      "Regional competition with some national tournaments",
      "More focus on overall college experience",
      "Strong community and campus involvement",
    ],
    scholarships: "Partial athletic scholarships available - typically covers 30-60% of costs",
    academicRequirements: "Minimum 2.2 GPA in core courses, qualifying SAT/ACT scores",
    differences: [
      "Unlike D1, offers partial (not full) scholarships",
      "Unlike D3, athletic scholarships are available",
      "Less time-intensive than D1, better work-life balance",
      "More regional focus vs. D1's national scope",
    ],
    idealFor: "Strong athletes wanting competitive sports with athletic aid while prioritizing academics and campus life",
  },
  "ncaa-d3": {
    name: "NCAA Division III",
    shortName: "NCAA D3",
    description: "Emphasizes the student-athlete experience with a strong focus on academics and personal development.",
    benefits: [
      "Strong emphasis on academic excellence",
      "Better balance between sports, academics, and social life",
      "Academic and need-based financial aid available",
      "Excellent coaching and competitive programs",
      "Smaller class sizes and personalized attention",
      "Opportunity to pursue other campus activities",
    ],
    scholarships: "NO athletic scholarships - only academic merit and need-based financial aid",
    academicRequirements: "Varies by institution, typically higher academic standards than D1/D2",
    differences: [
      "NO athletic scholarships (major difference from D1/D2)",
      "Can receive academic merit scholarships instead",
      "More flexibility to pursue double majors, internships",
      "Less time commitment allows for broader college experience",
    ],
    idealFor: "Student-athletes prioritizing academics and well-rounded college experience, with strong academic credentials for merit aid",
  },
  "naia-d1": {
    name: "NAIA Division I",
    shortName: "NAIA D1",
    description: "Competitive athletics with a character-driven approach and more flexible scholarship opportunities.",
    benefits: [
      "Athletic scholarships available",
      "More flexible eligibility requirements",
      "Character-driven athletics philosophy",
      "Smaller school environment with personal attention",
      "Strong sense of community and team culture",
      "Faster decision-making and recruiting process",
    ],
    scholarships: "Athletic scholarships available - flexible distribution across team",
    academicRequirements: "Minimum 2.0 GPA, or 18 ACT/970 SAT, varies by institution",
    differences: [
      "More flexible eligibility than NCAA",
      "Smaller schools provide more personal attention",
      "Can receive athletic aid immediately (no redshirt requirements)",
      "Less bureaucratic process than NCAA",
    ],
    idealFor: "Athletes seeking competitive sports at smaller institutions with more flexible requirements and scholarship opportunities",
  },
  "naia-d2": {
    name: "NAIA Division II",
    shortName: "NAIA D2",
    description: "Smaller school athletics with athletic scholarships and emphasis on student-athlete development.",
    benefits: [
      "Athletic scholarships available",
      "Intimate team environment",
      "Strong academic support systems",
      "Balance of athletics and academics",
      "Close-knit campus community",
      "More playing time opportunities",
    ],
    scholarships: "Athletic scholarships available - typically smaller amounts distributed across team",
    academicRequirements: "Minimum 2.0 GPA, or 18 ACT/970 SAT, varies by institution",
    differences: [
      "Similar to NAIA D1 but typically smaller schools",
      "More playing time opportunities vs. larger divisions",
      "Less travel than D1 programs",
      "More manageable time commitments",
    ],
    idealFor: "Athletes wanting to compete and receive athletic aid at smaller, community-focused institutions",
  },
  "juco": {
    name: "Junior College (JUCO)",
    shortName: "JUCO",
    description: "Two-year programs offering a pathway to four-year institutions with cost-effective education and athletic development.",
    benefits: [
      "Athletic scholarships available",
      "Pathway to four-year colleges",
      "Cost-effective education",
      "Improve academics and athletic skills",
      "Build highlight film for recruiting",
      "Flexible transfer opportunities",
    ],
    scholarships: "Full or partial athletic scholarships available",
    academicRequirements: "High school diploma or GED, varies by institution",
    differences: [
      "Two-year commitment vs. four-year programs",
      "Opportunity to improve grades and skills before transferring",
      "Lower tuition costs overall",
      "Second chance for athletes who need development",
    ],
    idealFor: "Athletes needing academic improvement, skill development, or a second chance to showcase abilities before transferring to a four-year program",
  },
  "gap-year": {
    name: "Gap Year / Post-Grad",
    shortName: "Gap Year",
    description: "Take a year to train, improve academically, and enhance recruitment profile before enrolling in college.",
    benefits: [
      "Extra year of physical and mental development",
      "Improve academic credentials (GPA, test scores)",
      "Gain maturity and life experience",
      "Extended recruitment period with coaches",
      "Build stronger highlight footage",
      "Work or train with professional coaches",
    ],
    scholarships: "Not applicable - preparation year for future scholarship opportunities",
    academicRequirements: "Not applicable - use year to improve academic standing",
    differences: [
      "Not enrolling in college immediately",
      "More time to develop physically and mentally",
      "Opportunity to retake SAT/ACT for better scores",
      "Extended recruitment timeline",
    ],
    idealFor: "Athletes who need additional development time, academic improvement, or extended recruitment exposure before committing to a college program",
  },
};

export default function DivisionInfo() {
  const { division } = useParams();
  const navigate = useNavigate();
  
  const divisionKey = division || "ncaa-d1";
  const info = divisionData[divisionKey as keyof typeof divisionData];

  if (!info) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Division not found</h1>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-[hsl(var(--venture-navy))] text-white py-6 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Button 
              onClick={() => navigate(-1)} 
              variant="ghost"
              className="gap-2 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <img src={ventureLogo} alt="Venture USA" className="h-8" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] rounded-3xl p-8 md:p-12 mb-8 text-white shadow-2xl">
          <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur text-white text-sm font-bold rounded-full mb-4">
            DIVISION OVERVIEW
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">{info.name}</h1>
          <p className="text-xl md:text-2xl text-white/90">{info.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Scholarships Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-black text-[hsl(var(--venture-navy))]">Scholarships</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{info.scholarships}</p>
          </div>

          {/* Academic Requirements Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] rounded-xl flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-black text-[hsl(var(--venture-navy))]">Academic Requirements</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{info.academicRequirements}</p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] rounded-xl flex items-center justify-center">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-black text-[hsl(var(--venture-navy))]">Key Benefits</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {info.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--venture-blue))] mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Differences Section */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] rounded-xl flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-black text-[hsl(var(--venture-navy))]">Key Differences</h2>
          </div>
          <div className="space-y-3">
            {info.differences.map((diff, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-blue-100">
                <div className="w-6 h-6 bg-[hsl(var(--venture-blue))]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[hsl(var(--venture-blue))] font-bold text-sm">{idx + 1}</span>
                </div>
                <p className="text-gray-700">{diff}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ideal For Section */}
        <div className="bg-gradient-to-br from-[hsl(var(--venture-blue))]/10 to-[hsl(var(--venture-navy))]/10 rounded-2xl p-8 shadow-lg border-2 border-[hsl(var(--venture-blue))]/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-black text-[hsl(var(--venture-navy))]">Ideal For</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">{info.idealFor}</p>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-black text-[hsl(var(--venture-navy))] mb-4">
              Ready to explore {info.shortName} opportunities?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact Venture USA to discuss your college soccer placement options
            </p>
            <Button 
              onClick={() => navigate(-1)}
              className="bg-[hsl(var(--venture-navy))] hover:bg-[hsl(var(--venture-blue))] text-white px-8 py-6 text-lg"
            >
              Return to Assessment
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
