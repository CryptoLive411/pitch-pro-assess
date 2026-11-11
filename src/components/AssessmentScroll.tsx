import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AssessmentData } from "./AssessmentEditor";
import { Button } from "@/components/ui/button";
import ventureLogo from "@/assets/venture-logo-white.png";
import ventureLogoCircle from "@/assets/venture-logo-circle.png";
import pedroBaischFinal from "@/assets/pedro-baisch-final.png";
import miloPetersFinal from "@/assets/milo-peters-final.png";
import afonsoVaz from "@/assets/afonso-vaz.png";
import henriqueSantos from "@/assets/henrique-santos.jpg";
import bernardoMonteiro from "@/assets/bernardo-monteiro.jpg";
import filipJauk from "@/assets/filip-jauk.jpg";
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
import harvardLogo from "@/assets/logos/harvard-mark.png";
import yaleLogo from "@/assets/logos/yale-mark.png";
import bostonCollegeLogo from "@/assets/logos/boston-college-mark.png";
import ncaaLogo from "@/assets/logos/ncaa.png";
import naiaLogo from "@/assets/logos/naia.png";
import njcaaLogo from "@/assets/logos/njcaa-mark.png";
import ppHero from "@/assets/pro-pathway/hero.jpeg";
import ppStep1 from "@/assets/pro-pathway/step1.jpeg";
import ppStep2 from "@/assets/pro-pathway/step2.jpeg";
import ppStep3 from "@/assets/pro-pathway/step3.jpeg";
import ppStep4 from "@/assets/pro-pathway/step4.jpeg";
import ppFinnHarps from "@/assets/pro-pathway/finn-harps.png";
import ppKasimpasa from "@/assets/pro-pathway/kasimpasa.webp";
import ppFortWayne from "@/assets/pro-pathway/fort-wayne.svg";
import ppAlvercaB from "@/assets/pro-pathway/alverca-b.png";
import ppUdSantarem from "@/assets/pro-pathway/ud-santarem.png";
import ppSacavenen from "@/assets/pro-pathway/sacavenen.png";
import ppAthlone from "@/assets/pro-pathway/athlone.png";

const NAVY = "#06183A";
const INK = "#F2F1E8";
const PAPER = "#E6E6EA";
const ACCENTS = ["#c9aae6", "#f9fc72", "#6ec7f9", "#ff93ca"];

const UNIVERSITY_LOGOS = [
  creightonLogo, ncStateLogo, charlestonLogo, providenceLogo, caltechLogo,
  wakeForestLogo, ucfLogo, coastalCarolinaLogo, westVirginiaLogo, templeLogo,
  kentuckyLogo, georgiaStateLogo, ucIrvineLogo,
  harvardLogo, yaleLogo, bostonCollegeLogo,
];

type ProgramMode = "college" | "pro" | "both";

interface Props {
  data: AssessmentData;
  labels: Record<string, string>;
  programMode: ProgramMode;
  onBack: () => void;
  isPublicView?: boolean;
}

const t = (labels: Record<string, string>, key: string, fallback: string) =>
  labels[key] || fallback;

const money = (currency: string | undefined, amount: string | undefined, fallback: string) => {
  const sym = currency === "EUR" ? "€" : "$";
  const value = amount?.trim() ? amount : fallback;
  return `${sym}${value}`;
};

function Frame({ children, light = false }: { children: ReactNode; light?: boolean }) {
  const color = light ? NAVY : INK;
  return (
    <div className="max-w-[720px] mx-auto">
      <span className="block relative h-px" style={{ background: color }}>
        <span className="absolute left-0 top-0 h-[9px] w-px" style={{ background: color }} />
        <span className="absolute right-0 top-0 h-[9px] w-px" style={{ background: color }} />
      </span>
      <div className="py-6 md:py-8">{children}</div>
      <span className="block relative h-px" style={{ background: color }}>
        <span className="absolute left-0 -top-[9px] h-[9px] w-px" style={{ background: color }} />
        <span className="absolute right-0 -top-[9px] h-[9px] w-px" style={{ background: color }} />
      </span>
    </div>
  );
}

function Eyebrow({ children, color = INK }: { children: ReactNode; color?: string }) {
  return (
    <p className="font-label text-[11px] md:text-xs tracking-[0.35em] uppercase" style={{ color }}>
      {children}
    </p>
  );
}

const COLLEGE_SERVICES = [
  { id: "english", name: "English Exam Support", description: "Comprehensive preparation and guidance for English proficiency exams like TOEFL, helping you achieve the scores needed for university admission.", p: [true, false, false] },
  { id: "video", name: "Video Editing", description: "Professional editing of your soccer highlight videos to showcase your skills to college coaches in the most compelling way.", p: [true, true, true] },
  { id: "admissions", name: "Admissions Support", description: "Expert assistance with college applications, essays, and all required documentation to maximize your chances of acceptance.", p: [true, true, false] },
  { id: "translation", name: "Translation Services", description: "Professional translation of documents, transcripts, and communications to ensure accurate and effective communication.", p: [true, false, false] },
  { id: "coach", name: "Coach Connections", description: "Direct introductions and ongoing communication with college coaches who match your athletic and academic profile.", p: [true, true, true] },
  { id: "eligibility", name: "Eligibility Center", description: "Complete support with NCAA Eligibility Center registration and requirements to ensure you can compete collegiately.", p: [true, false, false] },
  { id: "scholarship", name: "Scholarship Offers", description: "Strategic guidance to secure the best possible scholarship offers and financial aid packages from universities.", p: [true, true, true] },
  { id: "visa", name: "VISA Support", description: "Complete assistance with F-1 Student Visa application process, documentation, and interview preparation.", p: [true, true, false] },
  { id: "arrival", name: "USA Arrival Support", description: "Help with logistics and orientation when arriving in the USA, ensuring a smooth transition to your new university.", p: [true, true, false] },
  { id: "placement", name: "University Placement", description: "End-to-end support to secure your final placement at a university that matches your athletic, academic, and personal goals.", p: [true, true, true] },
];

const SERVICE_KEYS: Record<string, [string, string]> = {
  english: ["englishExamSupport", "English Exam Support"],
  video: ["videoEditing", "Video Editing"],
  admissions: ["admissionsSupport", "Admissions Support"],
  translation: ["translationServices", "Translation Services"],
  coach: ["coachConnections", "Coach Connections"],
  eligibility: ["eligibilityCenter", "Eligibility Center"],
  scholarship: ["scholarshipOffers", "Scholarship Offers"],
  visa: ["visaSupport", "VISA Support"],
  arrival: ["usaArrivalSupport", "USA Arrival Support"],
  placement: ["universityPlacement", "University Placement"],
};

const SERVICE_DESC_KEYS: Record<string, [string, string]> = {
  english: ["englishExamSupportDescription", COLLEGE_SERVICES[0].description],
  video: ["videoEditingDescription", COLLEGE_SERVICES[1].description],
  admissions: ["admissionsSupportDescription", COLLEGE_SERVICES[2].description],
  translation: ["translationServicesDescription", COLLEGE_SERVICES[3].description],
  coach: ["coachConnectionsDescription", COLLEGE_SERVICES[4].description],
  eligibility: ["eligibilityCenterDescription", COLLEGE_SERVICES[5].description],
  scholarship: ["scholarshipOffersDescription", COLLEGE_SERVICES[6].description],
  visa: ["visaSupportDescription", COLLEGE_SERVICES[7].description],
  arrival: ["usaArrivalSupportDescription", COLLEGE_SERVICES[8].description],
  placement: ["universityPlacementDescription", COLLEGE_SERVICES[9].description],
};

const PHOTO_STORIES = [
  {
    name: "Henrique Santos",
    school: "NC State - D1 Soccer",
    image: henriqueSantos,
    quote: "I have worked with agents and people that tried to help my soccer career for a big part of my life and the focus and the personal touch that I get from João is exceptional. Along with myself I owe a lot of my success to João as it's been a great journey since we started working together. He is very experienced and has a deep knowledge about soccer because it's his passion and hungry for success. Due to his vast soccer background and wide range of connections around the world, not only he knows what it takes to make it, but he can also provide the best counseling and options.",
  },
  {
    name: "Bernardo Monteiro",
    school: "FIU - D1 Soccer",
    image: bernardoMonteiro,
    quote: "Meeting Delgado and working with him has been a pleasure. Since the first moment we started this journey together, he has always been there for me and in constant contact with me and my family to help in anything needed. He has always been committed with me and to help me to get a professional opportunity. Besides being a very professional person, he's also a great friend now. Any players working with him, will be lucky enough to achieve their goals.",
  },
  {
    name: "Filip Jauk",
    school: "FAU - D1 Soccer",
    image: filipJauk,
    quote: "I really enjoyed working with Joao. Without him I wouldn't have been able to have a full scholarship at such a great school at one of the best soccer programs. For everything that I have here in the US, he is the first man to say thank you! He was with me from the beginning and every time made sure that everything is perfect for my education and my soccer improvement.",
  },
];

const PLACED = [
  { name: "Pedro Baisch", school: "Merrimack College", tag: "Merrimack", image: pedroBaischFinal },
  { name: "Milo Peters", school: "Dartmouth", tag: "6% acceptance", image: miloPetersFinal },
  { name: "Afonso Vaz", school: "Davis & Elkins", tag: "D&E", image: afonsoVaz },
];

const MORE_QUOTES = [
  { name: "Nico Torres", school: "Utah Valley", quote: "Joao helped me find an incredible program in record time, my situation was not easy, and he was able in a couple of weeks to help me and give me the opportunity to compete at the best level in my last season." },
  { name: "Umberto Pela", school: "Lehigh", quote: "Working with Joao and Luca has been a great experience. Even though we had 9 hours difference due to the time zone, they were always available to chat and share his thoughts. Him and Luca provided me with great opportunities, suggestions, and understood my needs perfectly." },
  { name: "Jozo Cancar", school: "Tyler JC", quote: "I can live my dream because of one individual, who is essentially the reason I am in the US. He always thought I had potential and always had faith in me. Every time, he made sure to let me know that I meant more to him than just a soccer player." },
  { name: "Diego Castillo", school: "Utah Valley", quote: "Working with Joao and Rodrigo in particular was the best decision I could have made. They made the process of finding a university fast and beneficial for me, thanks to them and their team I found a place which I can now call my new home." },
  { name: "Alex Bamford", school: "Marshall", quote: "Joao was incredibly helpful in securing my move to Marshall university. He has a wide range of contacts across both d2 and d1 and having gone through the college game himself knows the system very well. He is also a great person who only wants the best for those he works with." },
  { name: "Tadej Pitvoresk", school: "Transfer Success", quote: "Working with Joao was amazing! Not only I got a great agent that provided me with everything I needed and wanted, I also got a great friend! He did exactly everything that he said he would, gave me great options with schools, some great advices." },
  { name: "Fernando Silva", school: "UTRGV", quote: "Delgado was a key person in the pathway I took for my life. Since the first day we met, he always showed me a high level of professionalism and excellence. And mainly and most important, a very honest and caring person." },
  { name: "Quenzi Heuerman", school: "Seton Hall", quote: "Joao helped me from the start looking for a new school as I entered the transfer portal. He was consistent by always giving me great updates and getting me in touch with top schools. Thanks to his service, I was able to contact multiple top programs." },
  { name: "Kostyantyn", school: "Student Athlete", quote: "When the first time I got on contact with Joao, I realized that he was the person I can trust. He didn't work with me as a businessman but as friend that look on everything from my perspective. Joao wasn't an agent for me but a friend that could help with everything!" },
];

const PRO_STEPS = [
  { title: "Free Consultation", desc: "We evaluate your athletic level and pro goals to create your personalized roadmap.", img: ppStep1 },
  { title: "Profile Creation", desc: "We build a profile that reflects your true potential and target opportunities.", img: ppStep2 },
  { title: "Club Connection", desc: "Direct connections with professional coaches and clubs internationally.", img: ppStep3 },
  { title: "Tryout Opportunity", desc: "We help you secure professional tryouts to pursue your athletic goals.", img: ppStep4 },
];

const PRO_WHY = [
  "We don't sell dreams — only honest evaluations",
  "We manage the pressure of chasing pro opportunities",
  "We know real opportunities from empty promises",
  "Our +20 club network is built on relationships",
  "No hidden agendas. No false guarantees.",
  "The athlete is never left without direction",
];

const PRO_INCLUDED = [
  { title: "Player Evaluation", desc: "Honest, professional assessment from club coaches." },
  { title: "Tryout Support", desc: "On-ground guidance before, during and after every session." },
  { title: "Accommodation", desc: "Comfortable lodging close to training facilities." },
  { title: "Meal Plan", desc: "Performance nutrition planned around training load." },
  { title: "Transportation", desc: "Door-to-door transfers between clubs and lodging." },
  { title: "On-Ground Staff", desc: "Venture team with you in-country, every step." },
];

const PRO_CLUBS = [
  { name: "Finn Harps", logo: ppFinnHarps, country: "Ireland" },
  { name: "Kasımpaşa", logo: ppKasimpasa, country: "Turkey" },
  { name: "Fort Wayne", logo: ppFortWayne, country: "USA" },
  { name: "Alverca B", logo: ppAlvercaB, country: "Portugal" },
  { name: "UD Santarém", logo: ppUdSantarem, country: "Portugal" },
  { name: "Sacavenense", logo: ppSacavenen, country: "Portugal" },
  { name: "Athlone Town", logo: ppAthlone, country: "Ireland" },
];

const DIVISION_CARDS = [
  { name: "NCAA D1", slug: "ncaa-d1", logo: ncaaLogo },
  { name: "NCAA D2", slug: "ncaa-d2", logo: ncaaLogo },
  { name: "NCAA D3", slug: "ncaa-d3", logo: ncaaLogo },
  { name: "NAIA", slug: "naia", logo: naiaLogo },
  { name: "JUCO", slug: "juco", logo: njcaaLogo },
  { name: "Gap Year", slug: "gap-year", logo: ventureLogoCircle },
];

export const AssessmentScroll = ({ data, labels, programMode, onBack, isPublicView = false }: Props) => {
  const location = useLocation();
  const showCollege = programMode !== "pro";
  const showPro = programMode !== "college";
  const name = data.playerName?.trim() || "Player";
  const sym = data.currency === "EUR" ? "€" : "$";

  useEffect(() => {
    if (location.state?.returnToSlide != null) {
      document.getElementById("targets")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state]);

  return (
    <div className="assessment-scroll font-label">
      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 px-4 md:px-8 py-3 bg-[#06183A] border-b border-white/10">
        <div className="flex items-center gap-3 min-w-0">
          {!isPublicView && (
            <Button onClick={onBack} variant="ghost" className="text-[#F2F1E8] hover:bg-white/10 hover:text-white px-2 md:px-3">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Back to editor</span>
            </Button>
          )}
          <img src={ventureLogo} alt="Venture" className="h-7 md:h-8 w-auto" />
        </div>
        <p className="font-label text-[10px] md:text-xs tracking-[0.28em] uppercase text-[#F2F1E8]/70 truncate">
          {name}
        </p>
      </header>

      <Hero labels={labels} showPro={showPro} showCollege={showCollege} />
      {showCollege && <LogoRail title="Programs we place into" logos={UNIVERSITY_LOGOS} />}
      <Profile data={data} labels={labels} />
      <Recommendation data={data} labels={labels} name={name} />

      {showCollege && <WhatWeDo data={data} labels={labels} showProAddon={showPro} sym={sym} />}
      {showPro && !showCollege && <ProProcess />}
      {showPro && <LogoRail title="Pro club partners" logos={PRO_CLUBS.map((c) => c.logo)} />}

      {showCollege && <Stories />}
      {showCollege && <Impact labels={labels} />}
      <Statement labels={labels} showCollege={showCollege} />

      <Report data={data} labels={labels} />
      {showCollege && <Costs data={data} labels={labels} />}
      {showCollege && <Timeline labels={labels} />}

      {showPro && <ProWhy />}
      {showPro && <ProIncluded />}
      {showPro && <ProClubs />}
      {showPro && <ProPricing price={showCollege ? data.proAcademyAddonPrice : data.proAcademyPrice} sym={sym} addon={showCollege} />}

      {showCollege && <QuoteRail />}
      <Close labels={labels} manager={data.manager} />
    </div>
  );
};

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video || !frame) return;

    video.muted = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      video.pause();
      return;
    }

    const play = () => {
      const attempt = video.play();
      if (attempt) attempt.catch(() => {});
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) play();
      else video.pause();
    }, { threshold: 0.15 });
    observer.observe(frame);
    play();

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className="absolute inset-0 overflow-hidden" aria-hidden>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        src="/venture-assessment.mp4"
        poster="/venture-assessment-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
      />
    </div>
  );
}

function Hero({ labels, showPro, showCollege }: { labels: Record<string, string>; showPro: boolean; showCollege: boolean }) {
  const subtitle = showCollege && showPro
    ? "College placement, with a Pro Pathway alongside it."
    : showPro
      ? "Your path to the professional game — built on real connections, not promises."
      : t(labels, "collegeSoccerPlacementConsulting", "College Soccer Placement Consulting");

  return (
    <section className="relative min-h-[calc(100svh-4rem)] flex items-center justify-center px-5 py-16 overflow-hidden">
      <HeroVideo />
      <div className="absolute inset-0 bg-gradient-to-b from-[#06183A]/55 via-[#06183A]/40 to-[#06183A]/75" />
      <div className="relative z-10 w-full text-center">
        <Frame>
          <Eyebrow>Assessment Report</Eyebrow>
          <h1 className="font-display font-bold italic uppercase leading-[0.88] tracking-tight text-[clamp(2.15rem,6.2vw,5.4rem)] mt-4 whitespace-nowrap">
            Venture Sports USA
          </h1>
          <p className="mt-5 text-sm md:text-base text-[#F2F1E8]/80 max-w-md mx-auto leading-relaxed">
            {subtitle}
          </p>
        </Frame>
      </div>
    </section>
  );
}

function WhatWeDo({ data, labels, showProAddon, sym }: { data: AssessmentData; labels: Record<string, string>; showProAddon: boolean; sym: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const packages = [
    { key: "p1", num: "01", title: t(labels, "fullService", "Full Service"), price: data.packagePrice1, image: ppStep1, idx: 0 },
    { key: "p2", num: "02", title: t(labels, "standard", "Standard"), price: data.packagePrice2, image: ppStep2, idx: 1 },
    { key: "p3", num: "03", title: t(labels, "essential", "Essential"), price: data.packagePrice3, image: ppStep3, idx: 2 },
  ];

  return (
    <section className="bg-[#E6E6EA] text-[#06183A]">
      <div className="px-5 md:px-10 pt-12 md:pt-16">
        <Eyebrow color={NAVY}>{t(labels, "serviceOptions", "What we do")}</Eyebrow>
        <h2 className="font-display font-bold uppercase italic text-5xl md:text-7xl leading-none mt-2">
          {t(labels, "servicePackages", "Service packages")}
        </h2>
        <p className="mt-3 max-w-xl text-sm md:text-base text-[#06183A]/70">
          {t(labels, "choosePackage", "Choose the right package for your journey")}
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3">
        {packages.map((pkg) => (
          <article key={pkg.key} className="relative min-h-[70vh] overflow-hidden">
            <img src={pkg.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
            <div className="relative z-10 h-full min-h-[70vh] flex flex-col justify-end p-6 md:p-8 text-[#F2F1E8]">
              <p className="font-display font-bold text-5xl md:text-6xl leading-none" style={{ color: ACCENTS[pkg.idx] }}>{pkg.num}.</p>
              <h3 className="font-display font-bold uppercase italic text-5xl md:text-6xl leading-[0.9] mt-2">{pkg.title}</h3>
              {pkg.price?.trim() && (
                <p className="mt-4 font-display text-3xl font-semibold">
                  {sym}{pkg.price}
                  <span className="block font-label text-[10px] tracking-[0.2em] uppercase text-white/70 mt-1">+7% for tax</span>
                </p>
              )}
              <ul className="mt-5 space-y-1">
                {COLLEGE_SERVICES.filter((s) => s.p[pkg.idx]).map((s) => (
                  <li key={s.id}>
                    <button
                      className="text-left text-sm text-white/85 hover:text-white"
                      onClick={() => setOpen(open === `${pkg.key}-${s.id}` ? null : `${pkg.key}-${s.id}`)}
                    >
                      {t(labels, SERVICE_KEYS[s.id][0], SERVICE_KEYS[s.id][1])}
                    </button>
                    {open === `${pkg.key}-${s.id}` && (
                      <p className="mt-1 mb-2 text-xs text-white/70 leading-relaxed max-w-sm">
                        {t(labels, SERVICE_DESC_KEYS[s.id][0], SERVICE_DESC_KEYS[s.id][1])}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      {showProAddon && (
        <div className="relative min-h-[60vh] overflow-hidden">
          <img src={ppHero} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/25" />
          <div className="relative z-10 min-h-[60vh] flex flex-col justify-end p-6 md:p-12 text-[#F2F1E8]">
            <p className="font-display font-bold text-5xl leading-none" style={{ color: ACCENTS[3] }}>04.</p>
            <h3 className="font-display font-bold uppercase italic text-5xl md:text-7xl leading-[0.9] mt-2">Pro<br />Pathway</h3>
            <p className="mt-4 max-w-lg text-sm md:text-base text-white/80">
              Train with European pro academy clubs while we recruit you to college. Add to any package above.
            </p>
            {data.proAcademyAddonPrice?.trim() && (
              <p className="mt-4 font-display text-3xl">{sym}{data.proAcademyAddonPrice}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function ProProcess() {
  return (
    <section className="bg-[#E6E6EA] text-[#06183A]">
      <div className="px-5 md:px-10 pt-12 md:pt-16 pb-6">
        <Eyebrow color={NAVY}>Pro Pathway</Eyebrow>
        <h2 className="font-display font-bold uppercase italic text-5xl md:text-7xl leading-none mt-2">The process<br />to a tryout</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {PRO_STEPS.map((step, i) => (
          <article key={step.title} className="relative min-h-[58vh] overflow-hidden">
            <img src={step.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
            <div className="relative z-10 min-h-[58vh] flex flex-col justify-end p-6 md:p-8 text-[#F2F1E8]">
              <p className="font-display font-bold text-5xl leading-none" style={{ color: ACCENTS[i] }}>{String(i + 1).padStart(2, "0")}.</p>
              <h3 className="font-display font-bold uppercase italic text-4xl md:text-6xl leading-[0.9] mt-2">{step.title}</h3>
              <p className="mt-3 max-w-md text-sm text-white/80">{step.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function LogoRail({ title, logos }: { title: string; logos: string[] }) {
  const loop = [...logos, ...logos];
  return (
    <section className="bg-[#E6E6EA] text-[#06183A] py-12 md:py-16 overflow-hidden border-t border-[#06183A]/10">
      <div className="px-5 md:px-10 mb-8">
        <h2 className="font-display font-bold uppercase text-2xl md:text-4xl">{title}</h2>
      </div>
      <div className="overflow-hidden">
        <div className="logo-marquee flex items-center gap-10 w-max px-6">
          {loop.map((logo, i) => (
            <img key={`${logo}-${i}`} src={logo} alt="" className="h-12 md:h-16 w-auto object-contain" />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stories() {
  return (
    <section className="bg-[#06183A]">
      <div className="px-5 md:px-10 pt-14 md:pt-20">
        <Eyebrow>How we've helped</Eyebrow>
        <h2 className="font-display font-bold uppercase italic text-5xl md:text-7xl leading-none mt-2">The athlete<br />first</h2>
      </div>
      <div className="assessment-rail mt-8 flex gap-4 px-5 md:px-10 pb-14">
        {PHOTO_STORIES.map((story) => (
          <article key={story.name} className="shrink-0 w-[86vw] md:w-[640px] bg-white text-[#06183A]">
            <img src={story.image} alt={story.name} className="w-full h-[360px] object-cover object-top" />
            <div className="p-6 md:p-8">
              <p className="font-label text-[10px] tracking-[0.28em] uppercase text-[#06183A]/50">Success story</p>
              <h3 className="font-display font-bold uppercase italic text-4xl leading-none mt-2">{story.name}</h3>
              <p className="mt-2 text-sm font-semibold" style={{ color: "#1d4ed8" }}>{story.school}</p>
              <p className="mt-4 text-sm leading-relaxed text-[#06183A]/80">"{story.quote}"</p>
            </div>
          </article>
        ))}
        {PLACED.map((player) => (
          <article key={player.name} className="shrink-0 w-[78vw] md:w-[420px] relative min-h-[560px] bg-black">
            <img src={player.image} alt={player.name} className="absolute inset-0 w-full h-full object-contain" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-6 text-[#F2F1E8]">
              <p className="font-label text-[10px] tracking-[0.28em] uppercase text-[#f9fc72]">{player.tag}</p>
              <h3 className="font-display font-bold uppercase italic text-4xl leading-none mt-1">{player.name}</h3>
              <p className="mt-2 text-sm text-white/80">{player.school}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Impact({ labels }: { labels: Record<string, string> }) {
  return (
    <section className="min-h-[70vh] bg-[#06183A] px-5 md:px-10 py-20 flex flex-col justify-end">
      <Eyebrow>Our impact</Eyebrow>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <p className="font-display font-bold italic text-[clamp(4rem,12vw,9rem)] leading-none text-[#f9fc72]">350+</p>
          <p className="mt-2 max-w-sm text-sm md:text-base text-[#F2F1E8]/75">
            {t(labels, "joinAthletes", "Athletes who have successfully placed at top universities across the United States")}
          </p>
        </div>
        <div>
          <p className="font-display font-bold italic text-[clamp(4rem,12vw,9rem)] leading-none">+347</p>
          <p className="mt-2 text-sm md:text-base text-[#F2F1E8]/75">More success stories beyond the ones on this page.</p>
        </div>
      </div>
    </section>
  );
}

function Statement({ labels, showCollege }: { labels: Record<string, string>; showCollege: boolean }) {
  const line = showCollege
    ? t(labels, "letsMakeYourDream", "Let's make your college soccer dream a reality")
    : "Your path to the professional game";
  const words = line.split(" ");
  return (
    <section className="min-h-[80vh] bg-[#06183A] px-5 md:px-10 py-20 flex items-center">
      <h2 className="font-display font-bold uppercase italic leading-[0.86] text-[clamp(3.4rem,9vw,8rem)] max-w-5xl">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="block">{word}</span>
        ))}
      </h2>
    </section>
  );
}

function Profile({ data, labels }: { data: AssessmentData; labels: Record<string, string> }) {
  const rows = [
    [t(labels, "enrollment", "Enrollment"), data.enrollmentYear || "—"],
    [t(labels, "schoolYear", "School Year"), data.schoolYear || "—"],
    [t(labels, "gpa", "GPA"), data.gpa || "—"],
    [t(labels, "manager", "Manager"), data.manager || "—"],
    ...(data.budget?.trim() ? [[t(labels, "budget", "Budget"), data.budget]] : []),
  ];
  return (
    <section id="profile" className="bg-[#F2F1E8] text-[#06183A] px-5 md:px-10 py-16 md:py-24">
      <Eyebrow color={NAVY}>{t(labels, "playerProfile", "Player profile")}</Eyebrow>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="bg-[#06183A] min-h-[420px] flex items-center justify-center overflow-hidden">
          {data.playerPhoto ? (
            <img src={data.playerPhoto} alt={data.playerName} className="w-full h-full max-h-[640px] object-cover" />
          ) : (
            <img src={ventureLogoCircle} alt="Venture" className="w-40 h-40 object-contain opacity-80" />
          )}
        </div>
        <div>
          <h2 className="font-display font-bold uppercase italic text-5xl md:text-7xl leading-[0.9]">{data.playerName || "Player"}</h2>
          <dl className="mt-8 divide-y divide-[#06183A]/15">
            {rows.map(([label, value], i) => (
              <div key={label} className="py-4 grid grid-cols-[auto_1fr] gap-4 items-baseline">
                <dt className="font-display text-3xl text-[#c9aae6]">{String(i + 1).padStart(2, "0")}</dt>
                <div>
                  <p className="font-label text-[10px] tracking-[0.28em] uppercase text-[#06183A]/50">{label}</p>
                  <dd className="font-display text-2xl md:text-3xl uppercase">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Recommendation({ data, labels, name }: { data: AssessmentData; labels: Record<string, string>; name: string }) {
  const chosen = new Set(data.targetDivisions || []);
  return (
    <section id="targets" className="bg-[#06183A] px-5 md:px-10 py-16 md:py-24">
      <Eyebrow>{t(labels, "ourRecommendation", "Our recommendation")}</Eyebrow>
      <h2 className="font-display font-bold uppercase italic text-5xl md:text-8xl leading-[0.88] mt-4 max-w-4xl">{name}</h2>
      <p className="mt-4 max-w-xl text-[#F2F1E8]/70">
        The divisions chosen for this player are marked. Open any card to see scholarships, academics, and who it fits.
      </p>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DIVISION_CARDS.map((division, i) => {
          const selected = chosen.has(division.name);
          return (
            <Link
              key={division.name}
              to={`/division/${division.slug}`}
              state={{ fromSlide: 3, data, labels }}
              className={`group min-h-[230px] p-6 flex flex-col justify-between border transition-transform duration-200 hover:-translate-y-1 ${
                selected
                  ? "bg-[#F2F1E8] text-[#06183A] border-[#F2F1E8]"
                  : "bg-transparent text-[#F2F1E8] border-white/20 hover:border-white/70"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-3xl leading-none" style={{ color: ACCENTS[i % ACCENTS.length] }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <img src={division.logo} alt="" className="h-14 w-16 object-contain" />
              </div>
              <div>
                <p className="font-display font-bold uppercase italic text-4xl md:text-5xl leading-none">{division.name}</p>
                <p className={`mt-3 font-label text-[10px] tracking-[0.22em] uppercase ${selected ? "text-[#06183A]/60" : "text-white/55 group-hover:text-white"}`}>
                  {selected ? t(labels, "recommended", "Recommended") : t(labels, "clickToLearnMore", "Click to learn more")}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function Report({ data, labels }: { data: AssessmentData; labels: Record<string, string> }) {
  const paragraphs = (data.departmentNotes || "").split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  return (
    <section className="bg-[#F2F1E8] text-[#06183A] px-5 md:px-10 py-16 md:py-24 border-t border-[#06183A]/10">
      <Eyebrow color={NAVY}>{t(labels, "scoutingReport", "Scouting report")}</Eyebrow>
      <h2 className="font-display font-bold uppercase italic text-5xl md:text-7xl leading-[0.9] mt-2 max-w-3xl">
        {t(labels, "departmentAssessment", "Department assessment")}
      </h2>
      <p className="mt-3 text-sm text-[#06183A]/60">{t(labels, "professionalEvaluation", "Professional evaluation and recommendations")}</p>
      <div className="mt-10 max-w-3xl space-y-8">
        {paragraphs.length === 0 && <p className="text-[#06183A]/50">Department notes will appear here.</p>}
        {paragraphs.map((paragraph, i) => (
          <div key={i} className="grid grid-cols-[auto_1fr] gap-4">
            <span className="font-display text-3xl text-[#c9aae6]">{String(i + 1).padStart(2, "0")}</span>
            <p className="text-base md:text-lg leading-relaxed whitespace-pre-wrap">{paragraph}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 font-label text-[10px] tracking-[0.22em] uppercase text-[#06183A]/50">Venture USA Soccer Department · Official assessment</p>
    </section>
  );
}

function Costs({ data, labels }: { data: AssessmentData; labels: Record<string, string> }) {
  const items = [
    { name: t(labels, "satExams", "SAT Exams"), amount: money(data.currency, data.costSat, "200-400"), status: t(labels, "satExamsStatus", "1-3 exams"), description: t(labels, "satExamsDescription", "The SAT is a standardized test that students may have to take to get accepted into certain schools. This score helps universities evaluate academic readiness.") },
    { name: t(labels, "applications", "Applications"), amount: money(data.currency, data.costApplications, "300-500"), status: t(labels, "applicationsStatus", "4-6 schools"), description: t(labels, "applicationsDescription", "Application fees for submitting your profile to multiple universities. Each school charges an application fee to process your admission materials.") },
    { name: t(labels, "flightTicket", "Flight Ticket to USA"), amount: money(data.currency, data.costFlight, "600-1,000"), status: t(labels, "flightTicketStatus", "One-way"), description: t(labels, "flightTicketDescription", "Cost of your flight from your home country to the United States. This is a one-way ticket to begin your college journey.") },
    { name: t(labels, "visaApproval", "Visa Approval"), amount: money(data.currency, data.costVisa, "350"), status: t(labels, "visaApprovalStatus", "F-1 Student"), description: t(labels, "visaApprovalDescription", "The F-1 Student Visa approval process and associated fees required for international students to study in the United States.") },
    { name: t(labels, "universityYearlyBudget", "University Yearly Budget"), amount: money(data.currency, data.costUniversity, "10K-20K"), status: t(labels, "universityYearlyBudgetStatus", "Varies"), description: t(labels, "universityYearlyBudgetDescription", "Average yearly cost after scholarships, discussed with family. Some students earn full scholarships while others may not receive any financial aid.") },
  ];
  return (
    <section className="bg-[#06183A] px-5 md:px-10 py-16 md:py-24">
      <Eyebrow>{t(labels, "investment", "Investment")}</Eyebrow>
      <h2 className="font-display font-bold uppercase italic text-5xl md:text-7xl leading-none mt-2">
        {t(labels, "estimatedCosts", "Estimated costs")}
      </h2>
      <p className="mt-3 text-sm text-[#F2F1E8]/70">{t(labels, "yourPathToCollegeSoccer", "Your path to college soccer in the USA")}</p>
      <div className="mt-10 divide-y divide-white/15 max-w-4xl">
        {items.map((item, i) => (
          <div key={item.name} className="py-6 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-3 md:gap-8 items-start">
            <span className="font-display text-3xl text-[#6ec7f9]">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="font-display font-bold uppercase text-2xl md:text-3xl">{item.name}</p>
              <p className="font-label text-[10px] tracking-[0.22em] uppercase text-white/50 mt-1">{item.status}</p>
              <p className="mt-2 text-sm text-white/70 max-w-xl leading-relaxed">{item.description}</p>
            </div>
            <p className="font-display text-3xl md:text-4xl text-[#f9fc72]">{item.amount}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-xs text-white/50 max-w-xl">{t(labels, "costsNote", "All costs are estimates and may vary.")}</p>
    </section>
  );
}

function Timeline({ labels }: { labels: Record<string, string> }) {
  const steps = [
    [t(labels, "startProcess", "Start Process"), "Week 1-2", t(labels, "startProcessDescription", "Initial consultation to understand your goals, assess your profile, and create a personalized roadmap for your college soccer journey.")],
    [t(labels, "coachMeetings", "Coach Meetings"), "Month 1-3", t(labels, "coachMeetingsDescription", "Direct connections with college coaches across multiple divisions, introducing your athletic and academic profile to programs that match your goals.")],
    [t(labels, "videoEditingTimeline", "Video Editing"), "Month 1-2", t(labels, "videoEditingTimelineDescription", "Professional editing of your soccer highlight videos to showcase your skills, positioning, and game intelligence to college coaches.")],
    [t(labels, "activeRecruitment", "Active Recruitment"), "Month 2-8", t(labels, "activeRecruitmentDescription", "Ongoing communication with college coaches, managing interest from programs, and coordinating campus visits or virtual meetings.")],
    [t(labels, "transcriptEvaluation", "Transcript Evaluation"), "Month 3-4", t(labels, "transcriptEvaluationDescription", "Complete academic evaluation and transcript preparation to meet NCAA eligibility requirements and university admission standards.")],
    [t(labels, "universityConnections", "University Connections"), "Month 4-8", t(labels, "universityConnectionsDescription", "Building strong relationships with universities that are the best fit for your athletic ability, academic interests, and scholarship needs.")],
    [t(labels, "applicationsSubmitted", "Applications Submitted"), "Month 6-9", t(labels, "applicationsSubmittedDescription", "Complete and submit applications to selected universities with all required documents, essays, and supporting materials.")],
    [t(labels, "travelPreparation", "Travel Preparation"), "Month 10-12", t(labels, "travelPreparationDescription", "Visa processing, flight arrangements, accommodation planning, and all logistics for your move to the United States.")],
    [t(labels, "startCollegeJourney", "Start College Journey"), "August", t(labels, "startCollegeJourneyDescription", "Arrival at your university, orientation, meeting your team, and beginning your college soccer and academic career in the USA.")],
  ];
  return (
    <section className="bg-[#F2F1E8] text-[#06183A] px-5 md:px-10 py-16 md:py-24">
      <Eyebrow color={NAVY}>{t(labels, "yourJourney", "Your journey")}</Eyebrow>
      <h2 className="font-display font-bold uppercase italic text-5xl md:text-7xl leading-none mt-2">
        {t(labels, "stepByStep", "Step by step")}
      </h2>
      <p className="mt-3 text-sm text-[#06183A]/60">2025 – 2027 {t(labels, "timeline", "Timeline")}</p>
      <ol className="mt-10 max-w-3xl">
        {steps.map(([name, when, desc], i) => (
          <li key={name} className="grid grid-cols-[auto_1fr] gap-4 py-5 border-t border-[#06183A]/15">
            <span className="font-display text-3xl" style={{ color: ACCENTS[i % 4] }}>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display font-bold uppercase text-2xl md:text-3xl">{name}</h3>
                <span className="font-label text-[10px] tracking-[0.2em] uppercase text-[#06183A]/50">{when}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#06183A]/75">{desc}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-xs text-[#06183A]/50">Timeline may vary based on individual circumstances and university schedules.</p>
    </section>
  );
}

function ProWhy() {
  return (
    <section className="bg-[#06183A] px-5 md:px-10 py-16 md:py-24">
      <Eyebrow>Pro Pathway</Eyebrow>
      <h2 className="font-display font-bold uppercase italic text-5xl md:text-7xl leading-[0.9] mt-2">Why working<br />with us</h2>
      <p className="mt-3 text-sm text-white/60">Honest evaluation — even when it's hard.</p>
      <ol className="mt-10 max-w-3xl">
        {PRO_WHY.map((item, i) => (
          <li key={item} className="grid grid-cols-[auto_1fr] gap-4 py-4 border-t border-white/15">
            <span className="font-display text-3xl" style={{ color: ACCENTS[i % 4] }}>{String(i + 1).padStart(2, "0")}</span>
            <p className="font-display uppercase text-2xl md:text-3xl leading-tight">{item}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ProIncluded() {
  return (
    <section className="bg-[#E6E6EA] text-[#06183A] px-5 md:px-10 py-16 md:py-24">
      <Eyebrow color={NAVY}>Pro Pathway</Eyebrow>
      <h2 className="font-display font-bold uppercase italic text-5xl md:text-7xl leading-none mt-2">Everything<br />included</h2>
      <p className="mt-3 max-w-xl text-sm text-[#06183A]/70">Every tryout package covers the essentials so the only thing on your mind is football.</p>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRO_INCLUDED.map((item, i) => (
          <article key={item.title} className="bg-[#06183A] text-[#F2F1E8] p-6 min-h-[200px] flex flex-col justify-between">
            <span className="font-display text-3xl" style={{ color: ACCENTS[i % 4] }}>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-display font-bold uppercase italic text-3xl leading-none">{item.title}</h3>
              <p className="mt-2 text-sm text-white/70">{item.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProClubs() {
  return (
    <section className="bg-[#F2F1E8] text-[#06183A] px-5 md:px-10 py-16 md:py-20">
      <Eyebrow color={NAVY}>Pro Pathway</Eyebrow>
      <h2 className="font-display font-bold uppercase italic text-5xl md:text-7xl leading-none mt-2">+20 pro<br />club partners</h2>
      <p className="mt-3 max-w-xl text-sm text-[#06183A]/70">A growing international network creating real opportunities for evaluation, development and progression.</p>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PRO_CLUBS.map((club) => (
          <div key={club.name} className="bg-white border border-[#06183A]/10 p-4 flex flex-col items-center text-center min-h-[160px] justify-center">
            <img src={club.logo} alt={club.name} className="h-16 w-auto object-contain" />
            <p className="mt-3 font-display uppercase text-lg leading-none">{club.name}</p>
            <p className="font-label text-[10px] tracking-[0.18em] uppercase text-[#06183A]/50 mt-1">{club.country}</p>
          </div>
        ))}
        <div className="bg-[#06183A] text-[#F2F1E8] p-4 flex flex-col items-center justify-center min-h-[160px]">
          <p className="font-display font-bold italic text-5xl text-[#f9fc72]">+13</p>
          <p className="font-label text-[10px] tracking-[0.2em] uppercase mt-2">More partners</p>
        </div>
      </div>
    </section>
  );
}

function ProPricing({ price, sym, addon }: { price?: string; sym: string; addon: boolean }) {
  const tiers = [
    { name: "1 Club Exposure", duration: "Minimum 5 days", featured: false },
    { name: "2 Clubs Exposure", duration: "Minimum 10 days", featured: true },
  ];
  const perks = ["Player Evaluation", "Transportation", "Accommodation", "Meal Plan", "Tryout Support"];
  return (
    <section className="bg-[#06183A] px-5 md:px-10 py-16 md:py-24">
      <Eyebrow>{addon ? "Pro Pathway add-on" : "Pro Pathway · packages"}</Eyebrow>
      <h2 className="font-display font-bold uppercase italic text-5xl md:text-7xl leading-none mt-2">Tryout<br />packages</h2>
      {price?.trim() && (
        <p className="mt-4 text-white/75">Investment from <span className="text-[#f9fc72] font-display text-3xl">{sym}{price}</span></p>
      )}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
        {tiers.map((tier) => (
          <article key={tier.name} className={`p-6 md:p-8 ${tier.featured ? "bg-[#F2F1E8] text-[#06183A]" : "border border-white/20"}`}>
            <h3 className="font-display font-bold uppercase italic text-4xl leading-none">{tier.name}</h3>
            <p className="mt-2 font-label text-[10px] tracking-[0.22em] uppercase opacity-60">{tier.duration}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {perks.map((perk) => <li key={perk}>{perk}</li>)}
            </ul>
            {tier.featured && <p className="mt-6 font-label text-[10px] tracking-[0.22em] uppercase text-[#1d4ed8]">Recommended</p>}
          </article>
        ))}
      </div>
      <p className="mt-6 text-xs text-white/50">Flights, taxes and wire fees not included. Final pricing confirmed after consultation.</p>
    </section>
  );
}

function QuoteRail() {
  return (
    <section className="bg-[#E6E6EA] text-[#06183A] py-16">
      <div className="px-5 md:px-10 mb-8">
        <Eyebrow color={NAVY}>More from our athletes</Eyebrow>
        <h2 className="font-display font-bold uppercase italic text-5xl md:text-6xl leading-none mt-2">Hear from<br />even more</h2>
      </div>
      <div className="assessment-rail flex gap-4 px-5 md:px-10 pb-2">
        {MORE_QUOTES.map((quote) => (
          <article key={quote.name} className="shrink-0 w-[84vw] md:w-[460px] bg-[#06183A] text-[#F2F1E8] p-6 md:p-8 min-h-[280px] flex flex-col justify-between">
            <p className="text-sm leading-relaxed text-white/85">"{quote.quote}"</p>
            <div className="mt-6">
              <p className="font-display uppercase italic text-2xl leading-none">{quote.name}</p>
              <p className="font-label text-[10px] tracking-[0.22em] uppercase text-[#f9fc72] mt-2">{quote.school}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Close({ labels, manager }: { labels: Record<string, string>; manager?: string }) {
  return (
    <section className="min-h-[100svh] bg-[#06183A] px-5 py-20 flex items-center">
      <div className="w-full">
        <Frame>
          <h2 className="font-display font-bold uppercase italic text-center leading-[0.88] text-[clamp(3rem,8vw,6.5rem)]">
            {t(labels, "readyToStart", "Ready to start")}<br />{t(labels, "yourJourneyQuestion", "Your journey?")}
          </h2>
          <p className="text-center mt-4 text-sm md:text-base text-[#F2F1E8]/75">
            {t(labels, "letsMakeYourDream", "Let's make your college soccer dream a reality")}
          </p>
        </Frame>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <div className="border border-white/20 p-5">
            <p className="font-label text-[10px] tracking-[0.22em] uppercase text-white/50">{t(labels, "emailUs", "Email us")}</p>
            <a href="mailto:admin@venturesportsusa.com" className="font-display text-2xl uppercase">admin@venturesportsusa.com</a>
          </div>
          <div className="border border-white/20 p-5">
            <p className="font-label text-[10px] tracking-[0.22em] uppercase text-white/50">{t(labels, "getStarted", "Get started")}</p>
            <p className="font-display text-2xl uppercase">{t(labels, "callYourAgent", "Call your agent")}{manager ? ` · ${manager}` : ""}</p>
          </div>
        </div>
        <p className="text-center mt-8 text-xs text-white/50 max-w-lg mx-auto">
          {t(labels, "joinAthletes", "Join 350+ athletes who have successfully placed at top universities across the United States")}
        </p>
      </div>
    </section>
  );
}
