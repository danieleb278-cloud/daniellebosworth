import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import robinLogo from "@/assets/robin/logo.jpg.asset.json";
import robinSurvey from "@/assets/robin/survey.jpg.asset.json";
import robinJourney from "@/assets/robin/journey_map.jpg.asset.json";
import robinHeuristics from "@/assets/robin/heuristics.png.asset.json";
import robinResumeFlow from "@/assets/robin/resume_flow.png.asset.json";
import robinResumeLibrary from "@/assets/robin/resume_library.png.asset.json";
import robinAnalytics from "@/assets/robin/analytics.png.asset.json";
import robinHomescreen from "@/assets/robin/homescreen.png.asset.json";
import robinMenu from "@/assets/robin/menu.jpg.asset.json";

const ORIGIN = "https://daniellebosworth.lovable.app";
const assetUrl = (path: string) => path.startsWith("http") ? path : `${ORIGIN}${path}`;
const HERO_VIDEO_SRC = "/final%20robin%20hero%20absolute.mp4";

const findings = [
  { label: "Relevance", title: "More listings did not create better choices.", body: "Job seekers struggled to identify opportunities that matched their goals, qualifications, and priorities." },
  { label: "Continuity", title: "The application journey felt fragmented.", body: "Search, resumes, applications, follow-ups, and interviews were handled as separate tasks with little sense of progress." },
  { label: "Confidence", title: "Unclear feedback increased uncertainty.", body: "Users needed stronger status visibility, clearer next steps, and more control during a high-stakes process." },
];

const priorities = [
  { number: "01", title: "Clarify what comes next", body: "A more useful home experience surfaces priorities, recruiter messages, interviews, and actions instead of making users reconstruct their progress." },
  { number: "02", title: "Connect application materials", body: "A guided resume workflow and reusable library make it easier to create, manage, and apply with the right version." },
  { number: "03", title: "Turn activity into feedback", body: "Application analytics help job seekers understand patterns and make more informed adjustments to their strategy." },
];

function RobinHero() {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return <figure className="w-full">
    <div className="relative w-full overflow-hidden bg-secondary" style={{ aspectRatio: "16/9" }}>
      {reducedMotion ? <img src={assetUrl(robinLogo.url)} alt="Robin job search platform" className="absolute inset-0 h-full w-full object-contain" /> :
      <video className="absolute inset-0 h-full w-full object-cover" src={HERO_VIDEO_SRC} poster={assetUrl(robinLogo.url)} autoPlay muted loop playsInline preload="metadata" aria-label="Robin job search experience walkthrough" />}
    </div>
    <figcaption className="eyebrow mt-4 flex items-center justify-between"><span>Fig. 01 · Proposed Robin experience shaped by research, feature definition, prototyping, and user testing</span><span aria-hidden>✦</span></figcaption>
  </figure>;
}

export function RobinCaseStudy({ study }: { study: CaseStudy }) {
  return <>
    <section className="px-6 pb-20 md:px-12 md:pb-28"><div className="mx-auto max-w-[1400px]"><Reveal><RobinHero /></Reveal></div></section>

    <section className="bg-secondary px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel number="01 / 05" label="Overview" />
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">The project in 30 seconds</p>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
          <Summary label="The brief" text="An industry-sponsored RFP asked our team how the job-search experience could be improved — an open challenge, not a predefined solution." />
          <Summary label="What I did" text="I helped lead research and synthesis across surveys, journey mapping, a design sprint, prototyping, and user testing within a four-person team." />
          <Summary label="The direction" text="A human-centered, AI-assisted platform concept that centralizes applications, guides follow-ups, and makes progress visible." />
        </div>
        <div className="mt-14 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
          <Meta label="Role" value="UX Researcher, Experience Strategist & Synthesis Lead (team of 4)" />
          <Meta label="Duration" value="Spring semester" />
          <Meta label="Methods" value="Surveys, journey mapping, design sprint, prototyping, user testing" />
          <Meta label="Tools" value="Figma, Miro, Google Forms" />
        </div>
      </div>
    </section>

    <section className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel number="02 / 05" label="Discover" />
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Understanding the job-search journey</p>
        <div className="mt-14 grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 lg:col-span-8"><h2 className="font-display text-[clamp(2.6rem,6vw,6.5rem)] leading-[0.98] tracking-[-0.035em]">The friction wasn&apos;t only finding a job. It was maintaining <span className="text-accent">clarity and momentum.</span></h2></Reveal>
          <div className="col-span-12 lg:col-span-4 lg:pt-3"><p className="text-lg leading-relaxed text-muted-foreground">{study.challenge}</p><p className="mt-6 text-base leading-relaxed text-muted-foreground">{study.context}</p></div>
        </div>
        <div className="mt-16"><CaseFigure src={assetUrl(robinJourney.url)} alt="Robin job seeker journey map" caption="Fig. 02 · Journey mapping connected daily job-search behaviors to moments of friction and opportunity" /></div>
        <div className="mt-24 flex items-baseline gap-5"><span className="font-mono text-xs text-muted-foreground">Research findings</span><span className="eyebrow text-accent">What discovery revealed</span></div>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {findings.map((card,index)=><Reveal key={card.label} delay={index*80}><article className="h-full"><span className="eyebrow text-accent">{String(index+1).padStart(2,"0")} · {card.label}</span><h3 className="mt-7 font-display text-2xl leading-tight tracking-tight md:min-h-[10rem] md:text-3xl">{card.title}</h3><p className="mt-5 leading-relaxed text-muted-foreground">{card.body}</p></article></Reveal>)}
        </div>
      </div>
    </section>

    <section className="bg-foreground px-6 py-24 text-background md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel number="03 / 05" label="Define" tone="dark" />
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-background/60">Diagnosing the experience</p>
        <div className="grid gap-12 py-16 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="space-y-4 font-display text-2xl text-background/70 md:text-3xl"><p>Too much information</p><p>Disconnected application tasks</p><p>Limited status and feedback</p></div>
          <div className="hidden h-48 w-px bg-background/20 lg:block" />
          <Reveal><p className="font-display text-[clamp(2.4rem,5vw,5.5rem)] leading-[1.02] tracking-[-0.035em]">Job seekers did not need another list. They needed a system that made <span className="text-accent">progress visible</span> and decisions easier.</p></Reveal>
        </div>
        <div className="grid gap-4 border-t border-background/20 pt-10 sm:grid-cols-3">{["Relevant discovery","Connected workflow","Visible progress"].map(item=><div key={item} className="border-l border-accent pl-4 font-display text-xl">{item}</div>)}</div>
      </div>
    </section>

    <section className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div><span className="eyebrow text-accent">Competitive &amp; usability evidence</span><h2 className="mt-6 font-display text-4xl leading-tight tracking-tight md:text-5xl">Studying existing experiences showed where trust breaks down.</h2><p className="mt-6 text-lg leading-relaxed text-muted-foreground">Evaluating current platforms against usability principles exposed consistency, feedback, and control problems. Those patterns turned broad frustrations into specific design priorities for the concept.</p></div>
          <CaseFigure src={assetUrl(robinHeuristics.url)} alt="Heuristic evaluation examples from existing job-search experiences" caption="Fig. 03 · Evaluating existing experiences turned usability patterns into design priorities" />
        </div>
      </div>
    </section>

    <section className="bg-secondary px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel number="04 / 05" label="Design" />
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">A concept grounded in research</p>
        <div className="mt-10 max-w-4xl"><h2 className="font-display text-4xl leading-tight tracking-tight md:text-6xl">A job-search experience that helps people <span className="text-accent">move forward.</span></h2><p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">The proposed concept connects the moments job seekers previously managed alone: understanding priorities, preparing materials, tracking activity, and knowing what to do next.</p></div>
        <div className="mt-14 grid gap-10 lg:grid-cols-3">{priorities.map(item=><article key={item.number} className="border-t border-border pt-5"><span className="font-mono text-xs text-accent">{item.number}</span><h3 className="mt-4 font-display text-2xl leading-tight tracking-tight">{item.title}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{item.body}</p></article>)}</div>
        <Reveal><SolutionCarousel /></Reveal>
      </div>
    </section>

    <section className="px-6 py-24 md:px-12 md:py-32"><div className="mx-auto max-w-[1400px]">
      <SectionLabel number="05 / 05" label="Next" /><p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Client value & next validation</p>
      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div><h2 className="font-display text-4xl tracking-tight md:text-5xl">The work delivered</h2><div className="mt-8 grid grid-cols-2 gap-3">{["Research synthesis","Feature strategy","Product concept prototype","User testing analysis"].map(item=><div key={item} className="border-t border-border pt-4 font-display text-lg md:text-xl">{item}</div>)}</div></div>
        <div className="border-l border-border pl-0 lg:pl-10"><span className="eyebrow text-accent">What testing surfaced</span><p className="mt-6 font-display text-2xl leading-snug md:text-3xl">Users validated the calendar, AI-assisted resume builder, job board, and stored application credentials — and asked for skill assessments, resource integration, and resume review with ATS checking.</p><p className="mt-6 text-muted-foreground">The team presented research-backed product recommendations directly to the client. Outcomes are framed as intended value rather than invented product metrics.</p></div>
      </div>
    </div></section>

    <section className="px-6 py-24 md:px-12 md:py-32"><div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12"><div className="lg:col-span-8"><span className="eyebrow text-accent">Reflection</span><p className="mt-7 font-display text-3xl leading-snug tracking-tight md:text-5xl">{study.reflections}</p></div><div className="lg:col-span-4"><span className="eyebrow text-accent">This project demonstrates</span><div className="mt-7 flex flex-wrap gap-2">{["Product Discovery","User Research","Feature Strategy","Design Sprint","Prototyping & Testing"].map(skill=><span key={skill} className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider">{skill}</span>)}</div></div></div></section>
  </>;
}

function SolutionCarousel() {
 const slides=[
  {src:assetUrl(robinResumeFlow.url),alt:"Guided Robin resume builder flow",caption:"Fig. 04 · A connected resume-building flow reduces fragmentation across application materials",portrait:false},
  {src:assetUrl(robinResumeLibrary.url),alt:"Robin resume template and library screens",caption:"Fig. 05 · A reusable resume library helps users manage the right version for each opportunity",portrait:true},
  {src:assetUrl(robinAnalytics.url),alt:"Robin application analytics",caption:"Fig. 06 · Analytics turn application activity into feedback users can act on",portrait:true},
  {src:assetUrl(robinHomescreen.url),alt:"Robin home screen",caption:"Fig. 07 · The home screen makes interviews, messages, and next actions visible",portrait:true},
  {src:assetUrl(robinMenu.url),alt:"Robin navigation menu",caption:"Fig. 08 · Clear navigation connects the core job-search workflow",portrait:true},
 ]; const [active,setActive]=useState(0);
 return <div className="mt-14"><div className="mx-auto max-w-5xl">{slides.map((slide,index)=><div key={slide.src} className={index===active?"block":"hidden"} aria-hidden={index!==active}><CaseFigure {...slide}/></div>)}</div><div className="mx-auto mt-6 flex max-w-5xl items-center justify-between border-t border-border pt-5"><span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Solution visual {String(active+1).padStart(2,"0")} / {String(slides.length).padStart(2,"0")}</span><div className="flex items-center gap-3"><button type="button" onClick={()=>setActive((active-1+slides.length)%slides.length)} className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] hover:border-accent hover:text-accent">Previous</button><button type="button" onClick={()=>setActive((active+1)%slides.length)} className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] hover:border-accent hover:text-accent">Next</button></div></div></div>;
}
function CaseFigure({src,alt,caption,portrait=false}:{src:string;alt:string;caption:string;portrait?:boolean}) { return <figure className="w-full"><div className="flex w-full items-center justify-center border border-border bg-secondary p-4 md:p-6"><img src={src} alt={alt} className={portrait?"block max-h-[760px] w-auto max-w-full":"block h-auto w-full"} loading="lazy" decoding="async"/></div><figcaption className="eyebrow mt-3 flex items-center justify-between border-t border-border pt-2"><span>{caption}</span><span aria-hidden>✦</span></figcaption></figure>; }
function Summary({label,text}:{label:string;text:string}) { return <div><span className="eyebrow text-accent">{label}</span><p className="mt-5 font-display text-2xl leading-snug tracking-tight md:text-3xl">{text}</p></div>; }
function Meta({label,value}:{label:string;value:string}) { return <div className="min-h-32 border-border px-0 py-6 sm:px-6 sm:first:pl-0 lg:border-r lg:last:border-r-0"><span className="eyebrow text-muted-foreground">{label}</span><p className="mt-3 max-w-[24ch] text-sm leading-relaxed">{value}</p></div>; }
function SectionLabel({number,label,tone="light"}:{number:string;label:string;tone?:"light"|"dark"}) { return <div className="flex items-baseline gap-5"><span className={`font-mono text-xs ${tone==="dark"?"text-background/60":"text-muted-foreground"}`}>{number}</span><span className="eyebrow text-accent">{label}</span></div>; }
