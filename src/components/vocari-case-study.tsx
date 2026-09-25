import { useState } from "react";
import { VocariOpening } from "@/components/vocari-opening";
import type { CaseStudy } from "@/lib/case-studies";

type Evidence = { label: string; description: string; src?: string; alt?: string; tall?: boolean };
type StoryBeat = {
  label: string;
  note: string;
  title: string;
  skim: string;
  details: string[];
  evidence: Evidence[];
};

const storyBeats: StoryBeat[] = [
  {
    label: "Build and pressure-test",
    note: "I already had a basic concept to build from.",
    title: "A rough working prototype gave us something real to test from the start.",
    skim: "Before the course began, I had already created a very basic version of Vocari in Lovable. My team and I decided to build our Experience Design project around that concept. They contributed to the research and testing while I continued owning the prototype itself.",
    details: [
      "Using Lovable meant we could work with an interactive prototype very early instead of waiting until the end of the project to put something in front of people.",
      "Participants could actually move through the experience, react to recommendations, and show us where the concept made sense or broke down. That feedback could then go directly back into the next version of the prototype.",
      "My teammates helped conduct research, gather participant feedback, and contribute to the analysis and academic deliverables. I owned the product design and build and translated what we learned into the evolving prototype.",
      "That early feedback eventually exposed a bigger issue than usability alone: people wanted to recognize themselves in the result, understand why a recommendation appeared, and have a way to question what the system believed."
    ],
    evidence: [
      { label: "Early prototype", description: "The early Lovable onboarding gave the research team a working experience to test instead of a static concept.", src: "/vocari/early-onboarding.png", alt: "Early Vocari onboarding prototype" },
      { label: "From assessment to discovery", description: "The experience evolved toward Progressive Discovery as research showed that people wanted continued reflection, context, and clearer reasoning behind recommendations.", src: "/vocari/discovery-journey.webp", alt: "Vocari Progressive Discovery journey" },
      { label: "Early Profile DNA", description: "An early Profile DNA view made the product's interpretation visible so users could inspect the patterns behind the experience.", src: "/vocari/profile-dna-phase1.png", alt: "Early Vocari Profile DNA interface" }
    ]
  },
  {
    label: "Research constraint",
    note: "The data was useful, but too aggregated.",
    title: "MorphCast created a research problem I had to design around.",
    skim: "The affective-computing work produced useful signals, but the aggregated output made it difficult to connect a response to the exact prototype moment that may have triggered it.",
    details: [
      "I created a Supabase event workaround so prototype activity could be interpreted alongside the research session instead of treating one broad session-level emotional result as proof about a specific screen.",
      "I kept the affective data exploratory rather than turning it into personalization ground truth.",
      "The research experience also needed an explicit privacy boundary: camera participation was optional, video was not stored, and anonymous identifiers kept the research record separate from the person's Vocari profile.",
      "That became an early lesson in responsible AI product work. A signal being technically collectible does not mean it belongs in the product's learning model."
    ],
    evidence: [
      { label: "MorphCast output", description: "Placeholder: strongest screenshot showing the aggregated-data limitation.", src: "/vocari/morphcast.webp", alt: "Vocari MorphCast research analytics" },
      { label: "Event workaround", description: "Placeholder: Supabase event record or diagram connecting prototype events to the research session." },
      { label: "Privacy statement", description: "Placeholder: consent/privacy screen showing no stored video, optional camera participation, and anonymous IDs." }
    ]
  },
  {
    label: "Define the system",
    note: "We needed one language for what Vocari knew.",
    title: "Before I could improve the intelligence, I had to define the product's language.",
    skim: "As the prototype grew, Profile DNA, patterns, discovery, reactions, and recommendations were all describing the same person in slightly different ways. I stopped adding screens and defined the concepts underneath them.",
    details: [
      "The Product Book and shared vocabulary forced me to define what a pattern meant, what counted as evidence, what was inference, where a signal came from, and what different parts of the product were allowed to change.",
      "Once those terms were explicit, the next problem became obvious: not every input should count equally.",
      "An explicit user correction should not have the same weight as a weak inferred pattern. Missing evidence should not be treated as negative evidence. Contradictory signals needed confidence and weighting rules instead of silent overwrites.",
      "This is where the work shifted from interface consistency to product rules, requirements, data structure, and a shared source of truth."
    ],
    evidence: [
      { label: "Product Book", description: "The Product Book became a working source of truth for vocabulary, product rules, and the concepts different parts of Vocari needed to share.", src: "/vocari/product-book.webp", alt: "Vocari Product Book" },
      { label: "Visible evidence", description: "Profile DNA exposes the answers behind a pattern rather than asking the user to trust an unexplained label.", src: "/vocari/Screenshot%202026-09-03%20233630.png", alt: "Vocari Profile DNA showing evidence behind a pattern" }
    ]
  },
  {
    label: "The AI gap",
    note: "The prototype said AI. Underneath, it wasn't.",
    title: "Defining the rules exposed that the intelligence was still deterministic.",
    skim: "Once I could trace how evidence became a recommendation, I realized much of the adaptive experience was still being produced by explicit rules rather than an AI model interpreting the person's context.",
    details: [
      "That discovery happened after the course. The interface had evolved faster than the intelligence underneath it.",
      "Instead of hiding the gap, I treated it as the next architecture problem. Vocari needed persistent evidence and memory before a model could interpret anything meaningful over time.",
      "I expanded the stack with Supabase, typed models, evidence metadata, migrations, synchronization, testing, and a real AI layer.",
      "I did not replace every deterministic rule with AI. Evidence storage, state changes, scoring constraints, eligibility, and other consistency-critical behavior still benefit from explicit logic. AI belongs where interpretation and ambiguity actually require it."
    ],
    evidence: [
      { label: "Hybrid decision flow", description: "The architecture now separates interpretation from persistence: AI can propose meaning, the user can approve or edit it, and deterministic logic controls the actual profile update.", src: "/vocari/vocari%20ai%20decision%20diagram.png", alt: "Vocari hybrid AI and deterministic decision flow" },
      { label: "AI vs. mocked behavior", description: "A development review made the boundary explicit: some discovery behavior still used a deliberately small deterministic interpreter while the bounded AI conversation architecture handled a narrower job safely.", src: "/vocari/Screenshot%202026-09-25%20025047.png", alt: "Development review explaining Vocari AI versus deterministic mocked behavior" },
      { label: "The revised next step", description: "Adding a model was not the finish line. The next work became hardening the existing AI conversation and testing whether it actually reveals useful context, proposes reasonable changes, and changes recommendations for understandable reasons.", src: "/vocari/Screenshot%202026-09-25%20024725.png", alt: "Vocari AI hardening and evaluation plan" }
    ]
  },
  {
    label: "Human in the loop",
    note: "One 'no' can mean very different things.",
    title: "Feedback only works if the system understands what the feedback is about.",
    skim: "A user rejecting Product Designer should not blindly remove a card or rewrite their entire profile. The reason for the rejection determines what, if anything, should ripple into other careers.",
    details: [
      "If the user says, 'I'm bad at computers,' replacing Product Designer with Software Engineer would ignore the meaning of the feedback. That reason may apply across a family of technology-heavy roles.",
      "A different reason, such as disliking visual design work, may be much more specific. The system needs to distinguish job-specific feedback from evidence that should affect broader attributes, environments, tasks, or adjacent careers.",
      "That creates rules around scope, strength, duration, propagation, contradiction, and reversal. What should this answer change? How strongly? For how long? What happens when later evidence disagrees? What unwinds if the user changes their mind?",
      "This is where I am now: implementing real AI interpretation with deterministic guardrails so the system can understand the reason behind feedback and decide what it should influence without letting one answer rewrite the person."
    ],
    evidence: [
      { label: "A reaction needs a reason", description: "A career-level reaction can include context, giving the system something more meaningful than a simple yes or no.", src: "/vocari/Screenshot%202026-09-04%20004341.png", alt: "Vocari career reaction with user context" },
      { label: "Scope before propagation", description: "Before saving, Vocari keeps the reaction attached to the specific career and asks what caused it instead of silently rewriting the person's broader profile.", src: "/vocari/Screenshot%202026-09-04%20004354.png", alt: "Vocari feedback preview before saving a career reaction" },
      { label: "Visible receipt", description: "When feedback does affect Profile DNA, the interface shows that consequence directly with an Updated from your feedback receipt.", src: "/vocari/Screenshot%202026-09-25%20023250.png", alt: "Vocari Profile DNA pattern updated from user feedback" },
      { label: "The ledger exposed a bug", description: "The recent-changes ledger makes downstream effects inspectable. It also exposed duplicate propagation events, which is one of the unresolved system behaviors I am working through now.", src: "/vocari/Screenshot%202026-09-25%20023206.png", alt: "Vocari recent changes ledger showing feedback propagation and duplicate events" }
    ]
  },
  {
    label: "Broaden the product",
    note: "A smart matcher can still have a biased library.",
    title: "Testing the logic exposed two bigger product gaps.",
    skim: "Product and design careers were overrepresented, and a career match still did not tell someone how to get from their current background to that career.",
    details: [
      "To test recommendations honestly, I needed a broader career base and a repeatable structure for every career profile. The prototype library grew to 35 careers, but the larger requirement is consistent career data across very different occupations.",
      "That work exposed the next gap: fit is not the same as a pathway. Education, work history, transferable skills, constraints, and existing qualifications change what guidance is realistic.",
      "The next product layer is connecting career requirements to a person's starting point, identifying gaps, and eventually connecting those gaps to education, training, and realistic next actions.",
      "I have identified these problems, but I am not presenting them as solved. They are part of the active prototype work ahead."
    ],
    evidence: [
      { label: "Broader library", description: "The prototype library expanded to 35 careers so recommendation behavior could be tested against more than a product-and-design-heavy set.", src: "/vocari/careers.webp", alt: "Vocari career library" },
      { label: "Structured career depth", description: "A full Marketing Manager record shows why career data needed a repeatable structure, not just a title and match score. The system needs enough depth to explain fit, requirements, tradeoffs, and eventually pathways.", src: "/vocari/marketing%20managwr%20career%20profile.png", alt: "Full Vocari Marketing Manager career profile", tall: true },
      { label: "Explainable fit", description: "Career cards connect recommendation evidence to the role while surfacing tradeoffs instead of presenting a match as certainty.", src: "/vocari/why-this-fits.webp", alt: "Vocari Why This Fits career explanation" }
    ]
  }
];

export function VocariCaseStudy({ study }: { study: CaseStudy }) {
  return (
    <>
      <VocariOpening />

      <section id="story" className="px-6 pb-24 md:px-12 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <span className="eyebrow text-accent">What building exposed</span>
              <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,5rem)] leading-[1.02] tracking-[-0.035em]">Every answer created a harder question.</h2>
            </div>
            <p className="border-l border-border pl-6 text-lg leading-relaxed text-muted-foreground">
              Vocari started as a passion project, then became the focus of a group project in an Experience Design course. I kept owning and building the prototype while my team and I used the course to research, test, and challenge the idea. The build was anything but easy, but what I learned from each problem was irreplaceable. Every limitation exposed something new to understand, and each lesson shaped what I built next.
            </p>
          </div>

          <div className="mt-14 border-t border-border">
            {storyBeats.map((beat, index) => <StoryRow key={beat.label} beat={beat} index={index} />)}
          </div>
        </div>
      </section>

      <section id="current-state" className="bg-foreground px-6 py-24 text-background md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-24">
            <div>
              <span className="eyebrow text-accent">Active prototype · 2026–Present</span>
              <h2 className="mt-6 font-display text-[clamp(2.8rem,5.8vw,6rem)] leading-[1] tracking-[-0.035em]">I'm still building it because the hard parts are the project now.</h2>
              <div className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-background/70">
                <p>Vocari is an unfinished working prototype under active development. I could start another product and repeat the parts I already know: research, flows, interfaces, prototyping, testing, and iteration. Instead, I am continuing with Vocari because the questions left are the ones I want to learn from.</p>
                <p>Right now that means implementing AI-assisted interpretation for human-in-the-loop feedback, refining the rules that control how evidence ripples through the system, broadening and standardizing career coverage, and defining how a person's background can connect a career match to realistic education and training pathways.</p>
                <p className="text-background">Requirements, constraints, rules, structure, calibration, and safeguards are not cleanup after the product. They are the product work I am doing now.</p>
              </div>
            </div>
            <div className="space-y-8 lg:pt-10">
              <ReasonCell label="Working now" text="Persistent evidence, Profile DNA, Progressive Discovery, structured reactions, career exploration, recommendation logic, and an expanding AI interpretation layer." />
              <ReasonCell label="Not finished" text="The current prototype is not production-ready, and I do not present unresolved pathway, calibration, career-coverage, or safeguard questions as solved." />
              <details className="group border-y border-background/20 py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6"><div><span className="eyebrow text-accent">Build workflow · optional detail</span><p className="mt-3 font-display text-xl">Lovable → GitHub → ChatGPT → Supabase → Vercel → testing</p></div><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-background/40 font-mono text-xl group-open:rotate-45">+</span></summary>
                <p className="mt-5 leading-relaxed text-background/65">When prototyping limits interrupted iteration, I moved relevant codebase context into ChatGPT for targeted changes, worked through GitHub version control, and used deployment workflows to keep the prototype available. That workaround also pushed me deeper into the architecture behind my product decisions.</p>
              </details>
            </div>
          </div>
          <div className="mt-20 border-t border-background/20 pt-12">
            <p className="font-display text-3xl md:text-5xl">The idea was straightforward.</p>
            <p className="mt-3 font-display text-3xl text-background/55 md:text-5xl">Building it wasn't.</p>
            <p className="mt-3 font-display text-3xl text-accent md:text-5xl">That's why I'm still building it.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function StoryRow({ beat, index }: { beat: StoryBeat; index: number }) {
  const [open, setOpen] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const tones = ["bg-[oklch(0.91_0.09_88)]","bg-[oklch(0.91_0.07_315)]","bg-[oklch(0.91_0.065_20)]","bg-[oklch(0.91_0.055_190)]"];
  return (
    <article className="border-b border-border">
      <div className="grid gap-6 py-8 md:grid-cols-[10.5rem_0.85fr_1.35fr_6rem_auto] md:items-center md:gap-8">
        <button type="button" onClick={() => setOpen(!open)} className="group relative w-fit text-left" aria-expanded={open}>
          <span className="absolute left-1/2 top-[-5px] h-3 w-11 -translate-x-1/2 -rotate-2 bg-muted/70" aria-hidden="true" />
          <span className={`block max-w-[10rem] rotate-[-2deg] border border-foreground/10 px-5 py-5 font-handwriting text-[1.55rem] leading-[0.98] shadow-[0_12px_24px_-18px_rgba(0,0,0,0.55)] transition-transform group-hover:rotate-0 ${tones[index % tones.length]}`}>{beat.note}</span>
        </button>
        <div>
          <span className="eyebrow text-accent">{String(index + 1).padStart(2, "0")} / {beat.label}</span>
          <h3 className="mt-4 font-display text-[clamp(1.65rem,2.3vw,2.5rem)] leading-[1.04]">{beat.title}</h3>
        </div>
        <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{beat.skim}</p>
        <button type="button" onClick={() => setEvidenceOpen(true)} className="group justify-self-start md:justify-self-center" aria-label={`View evidence for ${beat.title}`}>
          <span className="relative block h-16 w-16"><span className="absolute left-0 top-1 h-12 w-12 border border-border bg-secondary" /><span className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center border border-border bg-background transition-transform group-hover:-translate-y-1"><span className="font-mono text-xl text-muted-foreground">▧</span></span></span>
          <span className="mt-2 block font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">Evidence</span>
        </button>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex h-12 w-12 items-center justify-center rounded-full border border-muted-foreground/50 font-mono text-2xl text-muted-foreground transition-colors hover:border-accent hover:text-accent" aria-label={`${open ? "Collapse" : "Expand"} details for ${beat.title}`}>{open ? "−" : "+"}</button>
      </div>
      {open && <div className="grid gap-6 pb-10 md:grid-cols-[10.5rem_0.85fr_1.35fr_6rem_auto] md:gap-8"><div className="hidden md:block" /><div className="space-y-5 border-l border-accent pl-5 md:col-span-2"><span className="eyebrow text-accent">The deeper story</span>{beat.details.map((detail, i) => <p key={i} className={i === 0 ? "font-display text-xl leading-snug" : "leading-relaxed text-muted-foreground"}>{detail}</p>)}</div></div>}
      {evidenceOpen && <EvidenceModal beat={beat} onClose={() => setEvidenceOpen(false)} />}
    </article>
  );
}

function EvidenceModal({ beat, onClose }: { beat: StoryBeat; onClose: () => void }) {
  const [active, setActive] = useState(0);
  const item = beat.evidence[active];
  return <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/80 p-5" onClick={onClose}>
    <div className="max-h-[90vh] w-full max-w-5xl overflow-auto bg-background p-5 md:p-7" onClick={e => e.stopPropagation()}>
      <div className="mb-5 flex items-start justify-between gap-4"><div><span className="eyebrow text-accent">Evidence</span><h4 className="mt-2 font-display text-2xl">{item.label}</h4></div><button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full border border-border font-mono text-xl">×</button></div>
      {item.src ? <img src={item.src} alt={item.alt || ""} className={item.tall ? "mx-auto block h-auto w-full max-w-4xl border border-border" : "mx-auto block max-h-[62vh] w-auto max-w-full border border-border object-contain"} /> : <div className="flex min-h-[360px] items-center justify-center border border-dashed border-border bg-secondary p-10 text-center"><div><span className="font-mono text-3xl text-accent">▧</span><p className="mt-4 font-display text-2xl">Image placeholder</p></div></div>}
      <p className="mt-5 leading-relaxed text-muted-foreground">{item.description}</p>
      {beat.evidence.length > 1 && <div className="mt-6 flex items-center justify-between border-t border-border pt-4"><span className="font-mono text-xs text-muted-foreground">{active + 1} / {beat.evidence.length}</span><div className="flex gap-2"><button type="button" onClick={() => setActive((active - 1 + beat.evidence.length) % beat.evidence.length)} className="border border-border px-4 py-2 font-mono text-xs uppercase">Previous</button><button type="button" onClick={() => setActive((active + 1) % beat.evidence.length)} className="border border-border px-4 py-2 font-mono text-xs uppercase">Next</button></div></div>}
    </div>
  </div>;
}

const prototypeSlides = [
  { src: "/vocari/dashboard.webp", alt: "Vocari dashboard", caption: "Dashboard" },
  { src: "/vocari/profile-refinement.webp", alt: "Vocari Profile DNA refinement", caption: "Profile refinement" },
  { src: "/vocari/why-this-fits.webp", alt: "Vocari recommendation explanation", caption: "Why this fits" },
  { src: "/vocari/careers.webp", alt: "Vocari career library", caption: "Career library" }
];

function PrototypeGallery() {
  const [active, setActive] = useState(0);
  const slide = prototypeSlides[active];
  return <div className="mt-14">
    <div className="mx-auto max-w-5xl border border-border bg-background p-4 md:p-6"><img src={slide.src} alt={slide.alt} className="mx-auto block max-h-[760px] w-auto max-w-full" loading="lazy" /></div>
    <div className="mx-auto mt-5 flex max-w-5xl items-center justify-between border-t border-border pt-5"><div><span className="eyebrow text-accent">{String(active + 1).padStart(2,"0")} / {String(prototypeSlides.length).padStart(2,"0")}</span><p className="mt-2 font-display text-xl">{slide.caption}</p></div><div className="flex gap-3"><button type="button" onClick={() => setActive((active - 1 + prototypeSlides.length) % prototypeSlides.length)} className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em]">Previous</button><button type="button" onClick={() => setActive((active + 1) % prototypeSlides.length)} className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em]">Next</button></div></div>
  </div>;
}

function ReasonCell({ label, text }: { label: string; text: string }) {
  return <div><span className="eyebrow text-accent">{label}</span><p className="mt-4 font-display text-xl leading-snug md:text-2xl">{text}</p></div>;
}
