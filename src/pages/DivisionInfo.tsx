import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ventureLogo from "@/assets/venture-logo-white.png";
import ventureLogoCircle from "@/assets/venture-logo-circle.png";
import ncaaLogo from "@/assets/logos/ncaa.png";
import naiaLogo from "@/assets/logos/naia.png";
import njcaaLogo from "@/assets/logos/njcaa-mark.png";

const ACCENTS = ["#c9aae6", "#f9fc72", "#6ec7f9", "#ff93ca"];

const DIVISION_LOGOS: Record<string, { src: string; className: string }> = {
  "ncaa-d1": { src: ncaaLogo, className: "h-16 md:h-20 w-auto" },
  "ncaa-d2": { src: ncaaLogo, className: "h-16 md:h-20 w-auto" },
  "ncaa-d3": { src: ncaaLogo, className: "h-16 md:h-20 w-auto" },
  naia: { src: naiaLogo, className: "h-16 md:h-20 w-auto" },
  juco: { src: njcaaLogo, className: "h-16 md:h-20 w-auto" },
  "gap-year": { src: ventureLogoCircle, className: "h-20 w-20" },
};

// Helper to get translated label
const getLabel = (labels: Record<string, string> | null, key: string, fallback: string): string => {
  if (labels && labels[key]) return labels[key];
  return fallback;
};

// Division data with label keys for translation
const getDivisionData = (labels: Record<string, string> | null) => ({
  "ncaa-d1": {
    name: getLabel(labels, "ncaaD1Name", "NCAA Division I"),
    shortName: getLabel(labels, "ncaaD1ShortName", "NCAA D1"),
    description: getLabel(labels, "ncaaD1Description", "The highest level of collegiate athletics featuring top-tier competition, comprehensive athletic programs, and the largest budgets and resources in college sports."),
    benefits: [
      getLabel(labels, "ncaaD1Benefit1", "Full athletic scholarships available (headcount or equivalency depending on sport)"),
      getLabel(labels, "ncaaD1Benefit2", "Largest budgets with state-of-the-art facilities and training resources"),
      getLabel(labels, "ncaaD1Benefit3", "Highest level of competition and national exposure"),
      getLabel(labels, "ncaaD1Benefit4", "National television coverage and extensive media attention"),
      getLabel(labels, "ncaaD1Benefit5", "Professional scouts actively recruiting from programs"),
      getLabel(labels, "ncaaD1Benefit6", "Comprehensive support staff including trainers, nutritionists, and sports psychologists"),
      getLabel(labels, "ncaaD1Benefit7", "Recent expanded scholarship protections and benefits (health/academic support)"),
    ],
    scholarships: getLabel(labels, "ncaaD1Scholarships", "Full athletic scholarships available. Some sports offer 'headcount' scholarships (full rides only), while most are 'equivalency' scholarships (can be split/partial). Amounts vary by sport and school budget."),
    academicRequirements: getLabel(labels, "ncaaD1Academic", "16 core courses with minimum 2.3 core-GPA. Standardized test scores (SAT/ACT) not required for initial eligibility since 2023. Certification through NCAA Eligibility Center required."),
    differences: [
      getLabel(labels, "ncaaD1Diff1", "Unlike D2/D3, offers full athletic scholarships with largest financial aid packages"),
      getLabel(labels, "ncaaD1Diff2", "Highest time commitment with rigorous year-round training schedules and extensive travel"),
      getLabel(labels, "ncaaD1Diff3", "National competition schedule vs. more regional focus in other divisions"),
      getLabel(labels, "ncaaD1Diff4", "Most extensive compliance and recruiting regulations compared to other divisions"),
    ],
    idealFor: getLabel(labels, "ncaaD1IdealFor", "Elite athletes seeking the highest competition level, professional aspirations, full scholarship opportunities, and maximum exposure to scouts and media."),
  },
  "ncaa-d2": {
    name: getLabel(labels, "ncaaD2Name", "NCAA Division II"),
    shortName: getLabel(labels, "ncaaD2ShortName", "NCAA D2"),
    description: getLabel(labels, "ncaaD2Description", "A balanced approach between athletics and academics, offering competitive sports with partial scholarship opportunities and emphasis on well-rounded college experience."),
    benefits: [
      getLabel(labels, "ncaaD2Benefit1", "Partial athletic scholarships available (equivalency-based)"),
      getLabel(labels, "ncaaD2Benefit2", "Strong balance between athletics, academics, and campus life"),
      getLabel(labels, "ncaaD2Benefit3", "Quality coaching and competitive facilities"),
      getLabel(labels, "ncaaD2Benefit4", "Regional competition with select national tournaments"),
      getLabel(labels, "ncaaD2Benefit5", "More flexibility for academic pursuits and other campus activities"),
      getLabel(labels, "ncaaD2Benefit6", "Strong sense of community and campus involvement"),
      getLabel(labels, "ncaaD2Benefit7", "Better work-life balance compared to Division I"),
    ],
    scholarships: getLabel(labels, "ncaaD2Scholarships", "Partial athletic scholarships available. Most sports use equivalency system where coaches can split scholarships across the roster. Typically covers 30-60% of total costs depending on the sport and program."),
    academicRequirements: getLabel(labels, "ncaaD2Academic", "16 core courses with minimum 2.2 core-GPA. Standardized test scores (SAT/ACT) not required for initial eligibility since August 2023. Certification through NCAA Eligibility Center required."),
    differences: [
      getLabel(labels, "ncaaD2Diff1", "Unlike D1, offers partial (not full) scholarships with more limited budgets"),
      getLabel(labels, "ncaaD2Diff2", "Unlike D3, athletic scholarships are available and permitted"),
      getLabel(labels, "ncaaD2Diff3", "Less time-intensive than D1, allowing better balance for academics and social life"),
      getLabel(labels, "ncaaD2Diff4", "More regional competition focus vs. D1's extensive national travel"),
      getLabel(labels, "ncaaD2Diff5", "Smaller program budgets but still competitive athletic experience"),
    ],
    idealFor: getLabel(labels, "ncaaD2IdealFor", "Strong athletes wanting competitive college sports with athletic financial aid while prioritizing academic success, campus involvement, and a well-rounded college experience."),
  },
  "ncaa-d3": {
    name: getLabel(labels, "ncaaD3Name", "NCAA Division III"),
    shortName: getLabel(labels, "ncaaD3ShortName", "NCAA D3"),
    description: getLabel(labels, "ncaaD3Description", "Emphasizes the complete student-athlete experience with strong academic focus, personal development, and integration of athletics into broader college life."),
    benefits: [
      getLabel(labels, "ncaaD3Benefit1", "Strong emphasis on academic excellence and educational outcomes"),
      getLabel(labels, "ncaaD3Benefit2", "Better balance between sports, academics, social life, and personal growth"),
      getLabel(labels, "ncaaD3Benefit3", "Academic merit scholarships and need-based financial aid available"),
      getLabel(labels, "ncaaD3Benefit4", "Excellent coaching with competitive, well-organized programs"),
      getLabel(labels, "ncaaD3Benefit5", "Smaller class sizes with personalized academic attention"),
      getLabel(labels, "ncaaD3Benefit6", "Freedom to pursue double majors, internships, study abroad, and campus activities"),
      getLabel(labels, "ncaaD3Benefit7", "Regional competition schedule allows for manageable time commitments"),
    ],
    scholarships: getLabel(labels, "ncaaD3Scholarships", "NO athletic scholarships permitted by rule. However, students can receive academic merit scholarships and/or need-based financial aid like any other student. Many D3 athletes receive substantial non-athletic aid packages."),
    academicRequirements: getLabel(labels, "ncaaD3Academic", "Academic standards are set by each individual institution (not by NCAA). Generally higher academic expectations than D1/D2. NCAA Eligibility Center is only used for international students (amateurism verification only)."),
    differences: [
      getLabel(labels, "ncaaD3Diff1", "NO athletic scholarships - this is the major difference from D1/D2 and NAIA"),
      getLabel(labels, "ncaaD3Diff2", "Can receive generous academic merit aid and need-based aid instead"),
      getLabel(labels, "ncaaD3Diff3", "Significantly more flexibility to pursue academic interests, double majors, and internships"),
      getLabel(labels, "ncaaD3Diff4", "Less time commitment than D1/D2 allows for broader college experience and personal development"),
      getLabel(labels, "ncaaD3Diff5", "Institution-set academic standards rather than NCAA-mandated minimums"),
    ],
    idealFor: getLabel(labels, "ncaaD3IdealFor", "Student-athletes who prioritize academics and well-rounded personal development, have strong academic credentials for merit scholarships, and want to fully integrate athletics into a comprehensive college experience."),
  },
  "naia": {
    name: getLabel(labels, "naiaName", "NAIA"),
    shortName: getLabel(labels, "naiaShortName", "NAIA"),
    description: getLabel(labels, "naiaDescription", "Character-driven competitive athletics at smaller institutions with flexible scholarship opportunities, streamlined eligibility requirements, and emphasis on student-athlete development. (Note: NAIA merged divisions in 2020 and now operates as a single division.)"),
    benefits: [
      getLabel(labels, "naiaBenefit1", "Athletic scholarships available with flexible distribution across team rosters"),
      getLabel(labels, "naiaBenefit2", "More flexible and streamlined eligibility requirements than NCAA"),
      getLabel(labels, "naiaBenefit3", "Character-driven athletics philosophy emphasizing values and personal growth"),
      getLabel(labels, "naiaBenefit4", "Smaller school environment providing personal attention and close relationships"),
      getLabel(labels, "naiaBenefit5", "Strong sense of community, team culture, and campus connection"),
      getLabel(labels, "naiaBenefit6", "Faster, less bureaucratic decision-making and recruiting process"),
      getLabel(labels, "naiaBenefit7", "Can receive athletic aid immediately without redshirt year requirements"),
      getLabel(labels, "naiaBenefit8", "Competitive programs that can match or exceed some D2 level play"),
    ],
    scholarships: getLabel(labels, "naiaScholarships", "Athletic scholarships available. NAIA uses sport-by-sport financial aid limits (equivalency system). Teams can split awards flexibly across roster. Aid generally counts toward limits only if athlete competes in more than 20% of season."),
    academicRequirements: getLabel(labels, "naiaAcademic", "Instant eligibility with 2.3+ final high school GPA. Alternatively, meet 2 of 3: (1) 2.0 HS GPA, (2) top 50% class rank, or (3) test score of ACT 18 or SAT 970. Progress-toward-degree and GPA rules apply after first year. Verification through NAIA Eligibility Center."),
    differences: [
      getLabel(labels, "naiaDiff1", "More flexible eligibility requirements compared to NCAA's strict regulations"),
      getLabel(labels, "naiaDiff2", "Smaller institutions provide more personalized attention and mentorship than large universities"),
      getLabel(labels, "naiaDiff3", "Can receive athletic aid and compete immediately without redshirt requirements unlike some NCAA situations"),
      getLabel(labels, "naiaDiff4", "Less bureaucratic recruiting and compliance process than NCAA divisions"),
      getLabel(labels, "naiaDiff5", "Character-driven mission emphasizing values and holistic development alongside athletics"),
      getLabel(labels, "naiaDiff6", "No longer has Division I/Division II (merged in 2020) - now operates as single competitive division"),
    ],
    idealFor: getLabel(labels, "naiaIdealFor", "Athletes seeking competitive sports at smaller, community-focused institutions with flexible academic requirements, athletic scholarship opportunities, personalized attention, and character-based athletic philosophy."),
  },
  "juco": {
    name: getLabel(labels, "jucoName", "Junior College (JUCO)"),
    shortName: getLabel(labels, "jucoShortName", "JUCO"),
    description: getLabel(labels, "jucoDescription", "Two-year community college programs offering an accessible pathway to four-year institutions with cost-effective education, athletic development opportunities, and second chances for late bloomers."),
    benefits: [
      getLabel(labels, "jucoBenefit1", "Athletic scholarships available (full or partial depending on program)"),
      getLabel(labels, "jucoBenefit2", "Clear pathway and transfer opportunities to four-year colleges"),
      getLabel(labels, "jucoBenefit3", "Cost-effective education with significantly lower tuition than universities"),
      getLabel(labels, "jucoBenefit4", "Opportunity to improve academic standing (GPA, test scores) before transferring"),
      getLabel(labels, "jucoBenefit5", "Develop athletic skills and physical maturity with quality coaching"),
      getLabel(labels, "jucoBenefit6", "Build impressive highlight film and recruitment profile for four-year programs"),
      getLabel(labels, "jucoBenefit7", "Flexible transfer options to multiple four-year institutions"),
      getLabel(labels, "jucoBenefit8", "Second chance for athletes who need additional development time"),
    ],
    scholarships: getLabel(labels, "jucoScholarships", "Full or partial athletic scholarships available depending on the program and sport. JUCO programs vary widely in scholarship budgets and offerings."),
    academicRequirements: getLabel(labels, "jucoAcademic", "High school diploma or GED required. Specific requirements vary by institution and are generally more accessible than four-year programs. Open-door admission policies at many community colleges."),
    differences: [
      getLabel(labels, "jucoDiff1", "Two-year commitment vs. traditional four-year programs"),
      getLabel(labels, "jucoDiff2", "Provides opportunity to improve grades, test scores, and skills before transferring to four-year schools"),
      getLabel(labels, "jucoDiff3", "Significantly lower overall tuition costs compared to universities"),
      getLabel(labels, "jucoDiff4", "Acts as 'second chance' or development pathway for athletes who need more time"),
      getLabel(labels, "jucoDiff5", "More flexible admission standards and academic requirements than four-year institutions"),
      getLabel(labels, "jucoDiff6", "Opportunity to reassess goals and build stronger recruitment profile for transfer"),
    ],
    idealFor: getLabel(labels, "jucoIdealFor", "Athletes needing academic improvement, physical/skill development, or a cost-effective second chance to showcase abilities and build a strong recruitment profile before transferring to a four-year college program."),
  },
  "gap-year": {
    name: getLabel(labels, "gapYearName", "Gap Year / Post-Grad"),
    shortName: getLabel(labels, "gapYearShortName", "Gap Year"),
    description: getLabel(labels, "gapYearDescription", "Take an additional year between high school and college to train intensively, improve academically, mature personally, and enhance recruitment profile before enrolling in college athletics."),
    benefits: [
      getLabel(labels, "gapYearBenefit1", "Extra year of physical development, strength training, and technical skill refinement"),
      getLabel(labels, "gapYearBenefit2", "Time to improve academic credentials including GPA and standardized test scores"),
      getLabel(labels, "gapYearBenefit3", "Gain emotional maturity, life experience, and mental readiness for college demands"),
      getLabel(labels, "gapYearBenefit4", "Extended recruitment period with more time to connect with coaches and showcase abilities"),
      getLabel(labels, "gapYearBenefit5", "Opportunity to build stronger, more compelling highlight footage and recruitment materials"),
      getLabel(labels, "gapYearBenefit6", "Work with professional coaches, trainers, and attend showcases for maximum exposure"),
      getLabel(labels, "gapYearBenefit7", "Reduce injury risk by arriving at college physically and mentally prepared"),
      getLabel(labels, "gapYearBenefit8", "Clarify college and career goals with more time for reflection and planning"),
    ],
    scholarships: getLabel(labels, "gapYearScholarships", "Not applicable during gap year - this is a preparation year focused on positioning for better scholarship opportunities when enrolling in college the following year."),
    academicRequirements: getLabel(labels, "gapYearAcademic", "Not applicable during gap year - use this time strategically to improve academic standing, retake standardized tests for better scores, and strengthen overall academic profile."),
    differences: [
      getLabel(labels, "gapYearDiff1", "Not enrolling in college immediately - strategic pause for development and preparation"),
      getLabel(labels, "gapYearDiff2", "Additional time for physical maturation, skill development, and mental/emotional growth"),
      getLabel(labels, "gapYearDiff3", "Opportunity to significantly improve academic credentials by retaking SAT/ACT for higher scores"),
      getLabel(labels, "gapYearDiff4", "Extended recruitment timeline providing more opportunities to connect with coaches and programs"),
      getLabel(labels, "gapYearDiff5", "Can attend post-graduate prep programs, train professionally, or work while preparing"),
      getLabel(labels, "gapYearDiff6", "Arrive at college more physically developed, emotionally mature, and academically prepared"),
    ],
    idealFor: getLabel(labels, "gapYearIdealFor", "Athletes who need additional physical, academic, or emotional development time; want extended recruitment exposure; or seek to significantly improve their profile and positioning for better college opportunities and scholarship offers."),
  },
});

export default function DivisionInfo() {
  const { division } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const divisionKey = division || "ncaa-d1";
  const fromSlide = location.state?.fromSlide;
  const labels = location.state?.labels as Record<string, string> | null;
  const assessment = location.state?.data as { playerName?: string; targetDivisions?: string[] } | undefined;

  const divisionData = getDivisionData(labels);
  const info = divisionData[divisionKey as keyof typeof divisionData];
  const logo = DIVISION_LOGOS[divisionKey];
  const recommended = !!info && (assessment?.targetDivisions || []).includes(info.shortName);

  const handleBack = () => {
    const returnTo = location.state?.returnTo as string | undefined;
    if (returnTo) {
      navigate(returnTo, {
        state: {
          returnToSlide: fromSlide ?? 3,
          data: location.state?.data,
        },
      });
      return;
    }
    navigate(-1);
  };

  if (!info) {
    return (
      <div className="min-h-screen bg-[#06183A] text-[#F2F1E8] font-body flex flex-col">
        <header className="flex items-center justify-between px-4 md:px-8 py-3 border-b border-white/10">
          <button type="button" onClick={handleBack} className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em]">
            <ArrowLeft className="h-4 w-4" />
            {getLabel(labels, "goBack", "Go back")}
          </button>
          <img src={ventureLogo} alt="Venture" className="h-7 md:h-8 w-auto" />
        </header>
        <div className="flex-1 flex items-center px-5 md:px-10">
          <h1 className="font-display font-bold uppercase italic text-5xl md:text-7xl">
            {getLabel(labels, "divisionNotFound", "Division not found")}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06183A] text-[#F2F1E8] font-body">
      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 px-4 md:px-8 py-3 bg-[#06183A] border-b border-white/10">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{getLabel(labels, "backToAssessment", "Back to assessment")}</span>
        </button>
        <img src={ventureLogo} alt="Venture" className="h-7 md:h-8 w-auto" />
      </header>

      <section className="px-5 md:px-10 py-16 md:py-24">
        <p className="font-label text-[11px] md:text-xs tracking-[0.35em] uppercase text-[#F2F1E8]">
          {getLabel(labels, "divisionOverview", "Division overview")}
        </p>
        <div className="mt-6 flex items-end justify-between gap-6">
          <h1 className="font-display font-bold uppercase italic leading-[0.86] text-[clamp(3.4rem,9vw,7.5rem)] max-w-4xl">
            {info.name}
          </h1>
          {logo && <img src={logo.src} alt="" className={`${logo.className} object-contain shrink-0`} />}
        </div>
        {recommended && (
          <p className="mt-6 font-label text-[11px] tracking-[0.28em] uppercase text-[#f9fc72]">
            {getLabel(labels, "recommended", "Recommended")}
            {assessment?.playerName ? ` · ${assessment.playerName}` : ""}
          </p>
        )}
        <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-[#F2F1E8]/75">{info.description}</p>
      </section>

      <section className="bg-[#F2F1E8] text-[#06183A] px-5 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-5xl">
          <div>
            <p className="font-display text-4xl text-[#c9aae6]">01</p>
            <h2 className="mt-2 font-display font-bold uppercase italic text-4xl md:text-5xl leading-none">
              {getLabel(labels, "scholarships", "Scholarships")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#06183A]/80">{info.scholarships}</p>
          </div>
          <div>
            <p className="font-display text-4xl text-[#6ec7f9]">02</p>
            <h2 className="mt-2 font-display font-bold uppercase italic text-4xl md:text-5xl leading-none">
              {getLabel(labels, "academicRequirements", "Academic requirements")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#06183A]/80">{info.academicRequirements}</p>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 py-16 md:py-24">
        <p className="font-label text-[11px] md:text-xs tracking-[0.35em] uppercase">{getLabel(labels, "keyBenefits", "Key benefits")}</p>
        <div className="mt-8 divide-y divide-white/15 max-w-4xl">
          {info.benefits.map((benefit, idx) => (
            <div key={benefit} className="py-5 grid grid-cols-[auto_1fr] gap-4 md:gap-8 items-baseline">
              <span className="font-display text-3xl" style={{ color: ACCENTS[idx % ACCENTS.length] }}>
                {String(idx + 1).padStart(2, "0")}
              </span>
              <p className="text-base md:text-lg leading-relaxed text-[#F2F1E8]/85">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F2F1E8] text-[#06183A] px-5 md:px-10 py-16 md:py-24">
        <p className="font-label text-[11px] md:text-xs tracking-[0.35em] uppercase text-[#06183A]/60">
          {getLabel(labels, "keyDifferences", "Key differences")}
        </p>
        <div className="mt-8 max-w-4xl space-y-8">
          {info.differences.map((diff, idx) => (
            <div key={diff} className="grid grid-cols-[auto_1fr] gap-4 md:gap-8 items-baseline">
              <span className="font-display text-3xl text-[#c9aae6]">{String(idx + 1).padStart(2, "0")}</span>
              <p className="text-base md:text-lg leading-relaxed">{diff}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 md:px-10 py-16 md:py-24">
        <p className="font-label text-[11px] md:text-xs tracking-[0.35em] uppercase text-[#ff93ca]">
          {getLabel(labels, "idealFor", "Ideal for")}
        </p>
        <p className="mt-4 max-w-4xl font-display font-bold uppercase italic leading-[0.92] text-[clamp(2rem,5vw,4.2rem)]">
          {info.idealFor}
        </p>
      </section>

      <section className="bg-[#F2F1E8] text-[#06183A] px-5 md:px-10 py-16 md:py-20">
        <h2 className="font-display font-bold uppercase italic text-4xl md:text-6xl leading-none">
          {getLabel(labels, "readyToExplore", "Ready to explore")} {info.shortName}
        </h2>
        <p className="mt-4 max-w-xl text-[#06183A]/70">
          {getLabel(labels, "contactVenture", "Contact Venture USA to discuss your college soccer placement options")}
        </p>
        <button
          type="button"
          onClick={handleBack}
          className="mt-8 inline-flex items-center gap-2 font-label text-[11px] tracking-[0.28em] uppercase border border-[#06183A] px-5 py-3 hover:bg-[#06183A] hover:text-[#F2F1E8]"
        >
          <ArrowLeft className="h-4 w-4" />
          {getLabel(labels, "returnToAssessment", "Return to assessment")}
        </button>
      </section>
    </div>
  );
}
