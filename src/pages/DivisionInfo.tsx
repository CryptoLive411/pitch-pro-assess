import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, DollarSign, GraduationCap, Users, Target, Award, BookOpen } from "lucide-react";
import ventureLogoCircle from "@/assets/venture-logo-circle.png";

const divisionData = {
  "ncaa-d1": {
    name: "NCAA Division I",
    shortName: "NCAA D1",
    description: "The highest level of collegiate athletics featuring top-tier competition, comprehensive athletic programs, and the largest budgets and resources in college sports.",
    benefits: [
      "Full athletic scholarships available (headcount or equivalency depending on sport)",
      "Largest budgets with state-of-the-art facilities and training resources",
      "Highest level of competition and national exposure",
      "National television coverage and extensive media attention",
      "Professional scouts actively recruiting from programs",
      "Comprehensive support staff including trainers, nutritionists, and sports psychologists",
      "Recent expanded scholarship protections and benefits (health/academic support)",
    ],
    scholarships: "Full athletic scholarships available. Some sports offer 'headcount' scholarships (full rides only), while most are 'equivalency' scholarships (can be split/partial). Amounts vary by sport and school budget.",
    academicRequirements: "16 core courses with minimum 2.3 core-GPA. Standardized test scores (SAT/ACT) not required for initial eligibility since 2023. Certification through NCAA Eligibility Center required.",
    differences: [
      "Unlike D2/D3, offers full athletic scholarships with largest financial aid packages",
      "Highest time commitment with rigorous year-round training schedules and extensive travel",
      "National competition schedule vs. more regional focus in other divisions",
      "Most extensive compliance and recruiting regulations compared to other divisions",
    ],
    idealFor: "Elite athletes seeking the highest competition level, professional aspirations, full scholarship opportunities, and maximum exposure to scouts and media.",
  },
  "ncaa-d2": {
    name: "NCAA Division II",
    shortName: "NCAA D2",
    description: "A balanced approach between athletics and academics, offering competitive sports with partial scholarship opportunities and emphasis on well-rounded college experience.",
    benefits: [
      "Partial athletic scholarships available (equivalency-based)",
      "Strong balance between athletics, academics, and campus life",
      "Quality coaching and competitive facilities",
      "Regional competition with select national tournaments",
      "More flexibility for academic pursuits and other campus activities",
      "Strong sense of community and campus involvement",
      "Better work-life balance compared to Division I",
    ],
    scholarships: "Partial athletic scholarships available. Most sports use equivalency system where coaches can split scholarships across the roster. Typically covers 30-60% of total costs depending on the sport and program.",
    academicRequirements: "16 core courses with minimum 2.2 core-GPA. Standardized test scores (SAT/ACT) not required for initial eligibility since August 2023. Certification through NCAA Eligibility Center required.",
    differences: [
      "Unlike D1, offers partial (not full) scholarships with more limited budgets",
      "Unlike D3, athletic scholarships are available and permitted",
      "Less time-intensive than D1, allowing better balance for academics and social life",
      "More regional competition focus vs. D1's extensive national travel",
      "Smaller program budgets but still competitive athletic experience",
    ],
    idealFor: "Strong athletes wanting competitive college sports with athletic financial aid while prioritizing academic success, campus involvement, and a well-rounded college experience.",
  },
  "ncaa-d3": {
    name: "NCAA Division III",
    shortName: "NCAA D3",
    description: "Emphasizes the complete student-athlete experience with strong academic focus, personal development, and integration of athletics into broader college life.",
    benefits: [
      "Strong emphasis on academic excellence and educational outcomes",
      "Better balance between sports, academics, social life, and personal growth",
      "Academic merit scholarships and need-based financial aid available",
      "Excellent coaching with competitive, well-organized programs",
      "Smaller class sizes with personalized academic attention",
      "Freedom to pursue double majors, internships, study abroad, and campus activities",
      "Regional competition schedule allows for manageable time commitments",
    ],
    scholarships: "NO athletic scholarships permitted by rule. However, students can receive academic merit scholarships and/or need-based financial aid like any other student. Many D3 athletes receive substantial non-athletic aid packages.",
    academicRequirements: "Academic standards are set by each individual institution (not by NCAA). Generally higher academic expectations than D1/D2. NCAA Eligibility Center is only used for international students (amateurism verification only).",
    differences: [
      "NO athletic scholarships - this is the major difference from D1/D2 and NAIA",
      "Can receive generous academic merit aid and need-based aid instead",
      "Significantly more flexibility to pursue academic interests, double majors, and internships",
      "Less time commitment than D1/D2 allows for broader college experience and personal development",
      "Institution-set academic standards rather than NCAA-mandated minimums",
    ],
    idealFor: "Student-athletes who prioritize academics and well-rounded personal development, have strong academic credentials for merit scholarships, and want to fully integrate athletics into a comprehensive college experience.",
  },
  "naia": {
    name: "NAIA",
    shortName: "NAIA",
    description: "Character-driven competitive athletics at smaller institutions with flexible scholarship opportunities, streamlined eligibility requirements, and emphasis on student-athlete development. (Note: NAIA merged divisions in 2020 and now operates as a single division.)",
    benefits: [
      "Athletic scholarships available with flexible distribution across team rosters",
      "More flexible and streamlined eligibility requirements than NCAA",
      "Character-driven athletics philosophy emphasizing values and personal growth",
      "Smaller school environment providing personal attention and close relationships",
      "Strong sense of community, team culture, and campus connection",
      "Faster, less bureaucratic decision-making and recruiting process",
      "Can receive athletic aid immediately without redshirt year requirements",
      "Competitive programs that can match or exceed some D2 level play",
    ],
    scholarships: "Athletic scholarships available. NAIA uses sport-by-sport financial aid limits (equivalency system). Teams can split awards flexibly across roster. Aid generally counts toward limits only if athlete competes in more than 20% of season.",
    academicRequirements: "Instant eligibility with 2.3+ final high school GPA. Alternatively, meet 2 of 3: (1) 2.0 HS GPA, (2) top 50% class rank, or (3) test score of ACT 18 or SAT 970. Progress-toward-degree and GPA rules apply after first year. Verification through NAIA Eligibility Center.",
    differences: [
      "More flexible eligibility requirements compared to NCAA's strict regulations",
      "Smaller institutions provide more personalized attention and mentorship than large universities",
      "Can receive athletic aid and compete immediately without redshirt requirements unlike some NCAA situations",
      "Less bureaucratic recruiting and compliance process than NCAA divisions",
      "Character-driven mission emphasizing values and holistic development alongside athletics",
      "No longer has Division I/Division II (merged in 2020) - now operates as single competitive division",
    ],
    idealFor: "Athletes seeking competitive sports at smaller, community-focused institutions with flexible academic requirements, athletic scholarship opportunities, personalized attention, and character-based athletic philosophy.",
  },
  "juco": {
    name: "Junior College (JUCO)",
    shortName: "JUCO",
    description: "Two-year community college programs offering an accessible pathway to four-year institutions with cost-effective education, athletic development opportunities, and second chances for late bloomers.",
    benefits: [
      "Athletic scholarships available (full or partial depending on program)",
      "Clear pathway and transfer opportunities to four-year colleges",
      "Cost-effective education with significantly lower tuition than universities",
      "Opportunity to improve academic standing (GPA, test scores) before transferring",
      "Develop athletic skills and physical maturity with quality coaching",
      "Build impressive highlight film and recruitment profile for four-year programs",
      "Flexible transfer options to multiple four-year institutions",
      "Second chance for athletes who need additional development time",
    ],
    scholarships: "Full or partial athletic scholarships available depending on the program and sport. JUCO programs vary widely in scholarship budgets and offerings.",
    academicRequirements: "High school diploma or GED required. Specific requirements vary by institution and are generally more accessible than four-year programs. Open-door admission policies at many community colleges.",
    differences: [
      "Two-year commitment vs. traditional four-year programs",
      "Provides opportunity to improve grades, test scores, and skills before transferring to four-year schools",
      "Significantly lower overall tuition costs compared to universities",
      "Acts as 'second chance' or development pathway for athletes who need more time",
      "More flexible admission standards and academic requirements than four-year institutions",
      "Opportunity to reassess goals and build stronger recruitment profile for transfer",
    ],
    idealFor: "Athletes needing academic improvement, physical/skill development, or a cost-effective second chance to showcase abilities and build a strong recruitment profile before transferring to a four-year college program.",
  },
  "gap-year": {
    name: "Gap Year / Post-Grad",
    shortName: "Gap Year",
    description: "Take an additional year between high school and college to train intensively, improve academically, mature personally, and enhance recruitment profile before enrolling in college athletics.",
    benefits: [
      "Extra year of physical development, strength training, and technical skill refinement",
      "Time to improve academic credentials including GPA and standardized test scores",
      "Gain emotional maturity, life experience, and mental readiness for college demands",
      "Extended recruitment period with more time to connect with coaches and showcase abilities",
      "Opportunity to build stronger, more compelling highlight footage and recruitment materials",
      "Work with professional coaches, trainers, and attend showcases for maximum exposure",
      "Reduce injury risk by arriving at college physically and mentally prepared",
      "Clarify college and career goals with more time for reflection and planning",
    ],
    scholarships: "Not applicable during gap year - this is a preparation year focused on positioning for better scholarship opportunities when enrolling in college the following year.",
    academicRequirements: "Not applicable during gap year - use this time strategically to improve academic standing, retake standardized tests for better scores, and strengthen overall academic profile.",
    differences: [
      "Not enrolling in college immediately - strategic pause for development and preparation",
      "Additional time for physical maturation, skill development, and mental/emotional growth",
      "Opportunity to significantly improve academic credentials by retaking SAT/ACT for higher scores",
      "Extended recruitment timeline providing more opportunities to connect with coaches and programs",
      "Can attend post-graduate prep programs, train professionally, or work while preparing",
      "Arrive at college more physically developed, emotionally mature, and academically prepared",
    ],
    idealFor: "Athletes who need additional physical, academic, or emotional development time; want extended recruitment exposure; or seek to significantly improve their profile and positioning for better college opportunities and scholarship offers.",
  },
};

export default function DivisionInfo() {
  const { division } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const divisionKey = division || "ncaa-d1";
  const info = divisionData[divisionKey as keyof typeof divisionData];
  const fromPreview = location.state?.fromPreview;

  if (!info) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Division not found</h1>
          <Button onClick={() => navigate(fromPreview ? "/preview" : "/")}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header with Soccer Field Pattern */}
      <header className="relative bg-gradient-to-r from-[hsl(var(--venture-navy))] via-[hsl(var(--venture-blue))] to-[hsl(var(--venture-navy))] text-white py-6 sticky top-0 z-50 shadow-2xl overflow-hidden">
        {/* Subtle soccer field lines pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 right-0 h-px bg-white"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white"></div>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <Button 
              onClick={() => navigate(fromPreview ? "/preview" : "/")} 
              variant="ghost"
              className="gap-2 text-white hover:bg-white/10 transition-all hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Assessment
            </Button>
            <img src={ventureLogoCircle} alt="Venture USA" className="h-14 w-14 rounded-full shadow-lg border-2 border-white/20" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section with Soccer Theme */}
        <div className="relative bg-gradient-to-br from-[hsl(var(--venture-navy))] via-[hsl(var(--venture-blue))] to-[hsl(var(--venture-navy))] rounded-3xl p-8 md:p-16 mb-10 text-white shadow-2xl overflow-hidden">
          {/* Decorative soccer elements */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M50 5 L50 95 M5 50 L95 50" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-bold rounded-full mb-6 border border-white/30">
              <Trophy className="h-4 w-4" />
              DIVISION OVERVIEW
            </div>
            <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight tracking-tight">{info.name}</h1>
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-4xl">{info.description}</p>
          </div>
        </div>

        {/* Scholarships & Academic Requirements Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Scholarships Card */}
          <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-black text-[hsl(var(--venture-navy))]">Scholarships</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{info.scholarships}</p>
          </div>

          {/* Academic Requirements Card */}
          <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-black text-[hsl(var(--venture-navy))]">Academic Requirements</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{info.academicRequirements}</p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-3xl p-8 md:p-10 shadow-lg mb-10 border border-blue-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] rounded-2xl flex items-center justify-center shadow-lg">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-black text-[hsl(var(--venture-navy))]">Key Benefits</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {info.benefits.map((benefit, idx) => (
              <div key={idx} className="group flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-blue-100 hover:border-blue-200">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[hsl(var(--venture-blue))]/20 to-[hsl(var(--venture-navy))]/10 rounded-full flex items-center justify-center mt-1 group-hover:scale-110 transition-transform">
                  <Award className="h-4 w-4 text-[hsl(var(--venture-blue))]" />
                </div>
                <p className="text-gray-700 leading-relaxed flex-1">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Differences Section */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-slate-50 rounded-3xl p-8 md:p-10 shadow-lg mb-10 border-2 border-blue-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-black text-[hsl(var(--venture-navy))]">Key Differences</h2>
          </div>
          <div className="space-y-4">
            {info.differences.map((diff, idx) => (
              <div key={idx} className="group flex items-start gap-5 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-blue-100 hover:border-[hsl(var(--venture-blue))]/40">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[hsl(var(--venture-blue))]/20 to-[hsl(var(--venture-navy))]/10 rounded-xl flex items-center justify-center border-2 border-[hsl(var(--venture-blue))]/20 group-hover:scale-110 transition-transform">
                  <span className="text-[hsl(var(--venture-blue))] font-black text-lg">{idx + 1}</span>
                </div>
                <p className="text-gray-700 leading-relaxed flex-1 pt-1.5 text-lg">{diff}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ideal For Section */}
        <div className="relative bg-gradient-to-br from-[hsl(var(--venture-blue))]/10 via-white to-[hsl(var(--venture-navy))]/5 rounded-3xl p-8 md:p-10 shadow-lg border-2 border-[hsl(var(--venture-blue))]/30 mb-10 overflow-hidden">
          {/* Soccer corner decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M0 0 Q100 0 100 100" fill="currentColor" className="text-[hsl(var(--venture-navy))]" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl font-black text-[hsl(var(--venture-navy))]">Ideal For</h2>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-[hsl(var(--venture-blue))]/20">
              <BookOpen className="h-6 w-6 text-[hsl(var(--venture-blue))] flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-800 leading-relaxed font-medium">{info.idealFor}</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="relative bg-gradient-to-br from-white via-blue-50 to-white rounded-3xl p-10 md:p-12 shadow-xl border border-blue-200 overflow-hidden">
            {/* Soccer field center circle decoration */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <div className="w-96 h-96 border-4 border-[hsl(var(--venture-navy))] rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black text-[hsl(var(--venture-navy))] mb-4">
                Ready to explore {info.shortName}?
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Contact Venture USA to discuss your college soccer placement options and find the perfect program for your goals.
              </p>
              <Button 
                onClick={() => navigate(fromPreview ? "/preview" : "/")}
                className="bg-gradient-to-r from-[hsl(var(--venture-navy))] to-[hsl(var(--venture-blue))] hover:opacity-90 text-white px-10 py-7 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 font-bold"
              >
                Return to Assessment
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
