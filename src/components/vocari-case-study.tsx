import { useState } from "react";
import { VocariOpening } from "@/components/vocari-opening";
import type { CaseStudy } from "@/lib/case-studies";

type Evidence = { label: string; description: string; src?: string; alt?: string };
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
    label: "Build something real",
    note: "I had the idea before the class.",
    title: "I needed something people could actually react to.",
    skim: "Vocari began as my independent concept. I built the prototype in Lovable, then brought the working idea into a course where it became the subject of structured group research.",
    details: [
      "I owned the product design and build. My teammates used the prototype with participants, gathered feedback, and contributed to the research, analysis, and academic deliverables.",
      "That distinction matters because the course did not create Vocari. It gave me a structured environment to pressure-test a product I had already started.",
      "The final academic project earned a perfect score, but finishing the assignment did not mean I considered the product finished."
    ],
    evidence: [{ label: "Early independent prototype", description: "Placeholder: early Lovable screens, first concept notes, or the earliest onboarding flow.", src: "/vocari/early-onboarding.png", alt: "Early Vocari onboarding prototype" }]
  },
  {
    label: "Research changed the experience",
    note: "People could use it. Trust was harder.",
    title: "The real problem was not getting someone through an assessment.",
    skim: "Course research showed that people wanted to recognize themselves in the result, understand why a recommendation appeared, and have a way to question what the system believed.",
    details: [
      "The research included surveys, usability and experience testing, emotional and cognitive evaluation, and exploratory affective-computing work. Those methods were useful because they exposed different parts of the same problem: completion was not the same as trust.",
      "The experience evolved toward Progressive Discovery, Profile DNA, clearer recommendation explanations, user feedback, and Understand, Clarify, Challenge interactions.",
      "By the end of the course, the product direction had moved away from a one-time career assessment toward an experience that could keep learning with the user.",
      "The group research helped shape that direction. I translated the findings into the working prototype."
    ],
    evidence: [
      { label: "Research evidence", description: "Placeholder: survey findings, testing notes, PANAS/SAM/NASA-TLX evidence, or a research synthesis image.", src: "/vocari/morphcast.webp", alt: "Vocari research analytics" },
      { label: "Design evolution", description: "Placeholder: before/after showing the move from assessment results toward Profile DNA and Progressive Discovery.", src: "/vocari/discovery-journey.webp", alt: "Vocari Progressive Discovery journey" }
    ]
  },
  {
    label: "The post-course discovery",
    note: "The prototype said AI. Underneath, it wasn't.",
    title: "The interface had evolved faster than the intelligence underneath it.",
    skim: "After the course ended, I kept building and discovered that much of the experience I had designed as adaptive and AI-driven was still being produced through deterministic rules.",
    details: [
      "That was the point where Vocari changed for me. The interface could describe a learning relationship, but the system underneath it did not yet have the memory, evidence model, or interpretation layer needed to support that promise.",
      "Instead of hiding that limitation, I treated it as the next product problem.",
      "If Vocari was supposed to learn over time, I first had to define what it should remember, where that information came from, how reliable it was, and how later evidence could change an earlier belief.",
      "This is where the work moved beyond improving screens and into product architecture."
    ],
    evidence: [{ label: "Implementation gap", description: "Placeholder: old deterministic recommendation logic, early architecture, or a comparison between the interface promise and the original implementation." }]
  },
  {
    label: "Give the product memory",
    note: "Before it could learn, it had to remember.",
    title: "I rebuilt the foundation around evidence instead of screens.",
    skim: "I introduced persistent data and a shared evidence model so Profile DNA, discovery, reactions, and recommendations could operate from the same underlying understanding of the user.",
    details: [
      "Supabase became part of the architecture so evidence and profile state could persist instead of existing only inside disconnected interface behavior.",
      "I started defining evidence by source and purpose: what the user explicitly told Vocari, what the system inferred, what came from discovery, what came from reactions, and what a piece of evidence was actually allowed to support.",
      "I created shared structures for profile state, evidence metadata, recommendation behavior, and synchronization so different features were not quietly maintaining different versions of the same person.",
      "The Product Book and shared vocabulary became product-governance tools. They forced me to define terms and relationships before adding more behavior.",
      "This work also pushed me deeper into the codebase, GitHub, TypeScript, migrations, testing, and the implementation details behind the experience."
    ],
    evidence: [
      { label: "Product architecture", description: "Placeholder: Product Book, data model, evidence schema, or architecture map.", src: "/vocari/product-book.webp", alt: "Vocari Product Book" },
      { label: "Persistent evidence", description: "Placeholder: Supabase schema or evidence record showing source-aware persistence." }
    ]
  },
  {
    label: "One answer can ripple",
    note: "What should this change, and for how long?",
    title: "A reaction could not be allowed to rewrite the person.",
    skim: "Once feedback became evidence, every reaction needed rules for scope, strength, duration, propagation, contradiction, and reversal.",
    details: [
      "If someone says Product Designer is not for me, that may be evidence about the role, a work environment, a motivation, or something else entirely. It should not automatically erase every underlying strength that helped produce the recommendation.",
      "I had to ask what a signal should affect, how strongly it should count, whether it should influence adjacent careers, how long it should remain meaningful, and what happens when later evidence disagrees.",
      "Reversal mattered too. If a user changes their reaction, the system should be able to unwind the effect without erasing the history that explains why the recommendation changed.",
      "This led to weighting, confidence, source-aware evidence, structured reactions, and reversal-safe behavior.",
      "It also clarified where deterministic logic is valuable. State changes and rules that need consistency and traceability should not depend on an AI model improvising the answer."
    ],
    evidence: [
      { label: "Refinement loop", description: "Placeholder: reaction, preview, confirm, receipt, undo sequence.", src: "/vocari/profile-refinement.webp", alt: "Vocari profile refinement interaction" },
      { label: "Ripple example", description: "Placeholder: Product Designer rejection and the resulting profile/recommendation changes." }
    ]
  },
  {
    label: "Add real AI deliberately",
    note: "Not everything should become AI.",
    title: "The next question was what AI should actually be responsible for.",
    skim: "With persistent evidence and explicit rules underneath the product, I could introduce real AI where interpretation benefits from nuance while keeping deterministic behavior where consistency matters.",
    details: [
      "Flexible conversation, clarification, and interpretation are places where an AI model can add value because human context is messy and language is ambiguous.",
      "Evidence storage, scoring rules, profile state, eligibility, synchronization, and other consistency-critical behavior need explicit constraints and testable fallbacks.",
      "The goal became a hybrid system, not an AI system for its own sake.",
      "That separation also makes it easier to explain why something happened and to keep the user in control when the model's interpretation is wrong."
    ],
    evidence: [{ label: "Hybrid intelligence", description: "Placeholder: diagram showing AI interpretation layered over deterministic evidence, scoring, and state rules." }]
  },
  {
    label: "The dataset can bias the answer",
    note: "The logic can work and the library can still be wrong.",
    title: "I realized Vocari was too heavily biased toward the careers I had modeled best.",
    skim: "To test recommendations honestly, I needed a broader career base and a repeatable structure for describing every career consistently.",
    details: [
      "Product and design careers were overrepresented and more deeply described in the early prototype. That gave those careers more opportunities to match against user evidence.",
      "Expanding the library was not just a content task. Every career needed a consistent profile so the recommendation system could compare very different occupations using the same kinds of information.",
      "That work grew the prototype career library to 35 careers and exposed another requirement: the quality of a recommendation depends on the quality and coverage of the career data underneath it.",
      "A smarter matching system cannot compensate for a narrow or uneven career universe."
    ],
    evidence: [
      { label: "Career profile structure", description: "Placeholder: one structured career record showing the fields shared across the library." },
      { label: "Career library", description: "Placeholder: broader career library and filters.", src: "/vocari/careers.webp", alt: "Vocari career library" }
    ]
  },
  {
    label: "A match is not a path",
    note: "Okay, this fits. Now how do I get there?",
    title: "Career recommendations exposed the gap between fit and education.",
    skim: "A useful career product cannot stop at telling someone what might fit. It eventually has to understand where that person is starting and what a realistic path forward could look like.",
    details: [
      "Two people can have similar strengths and preferences but very different education, work history, transferable skills, constraints, and access to training.",
      "That means background is not just profile decoration. It changes what guidance is useful and what next step is realistic.",
      "The next product problem is connecting career fit to requirements, existing qualifications, missing qualifications, education or training pathways, and realistic next actions.",
      "I have identified this gap, but I have not treated it as solved. It is part of the work still ahead."
    ],
    evidence: [{ label: "Pathway gap", description: "Placeholder: future-state flow from user background → career requirements → gaps → education/training → next action." }]
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
              Vocari did not move through a clean design process. Each version exposed something the previous version could not answer. The skim tells the story. Open any moment to see the research, reasoning, rules, and implementation underneath it.
            </p>
          </div>

          <div className="mt-14 border-t border-border">
            {storyBeats.map((beat, index) => <StoryRow key={beat.label} beat={beat} index={index} />)}
          </div>
        </div>
      </section>

      <section id="research-constraint" className="bg-secondary px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <span className="eyebrow text-accent">Research constraint → product decision</span>
              <h2 className="mt-6 font-display text-4xl leading-tight md:text-6xl">MorphCast gave us signals. It also exposed a data problem.</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">The affective-computing study became useful for more than the emotional signals themselves. Working with the data forced me to think about what could actually be connected back to an experience, what should remain exploratory, and what privacy boundaries the prototype needed.</p>
            </div>
            <div className="space-y-5">
              <details className="group border-y border-border py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6"><div><span className="eyebrow text-accent">The issue</span><h3 className="mt-2 font-display text-2xl">The data arrived too aggregated to answer the question we were asking.</h3></div><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-muted-foreground/50 font-mono text-xl group-open:rotate-45">+</span></summary><div className="mt-5 space-y-4 leading-relaxed text-muted-foreground"><p>MorphCast could provide useful emotional and behavioral signals, but the aggregated output made it difficult to connect those signals cleanly to the specific prototype moments we wanted to understand.</p><p>That meant I could not responsibly treat a broad emotional score as proof that one screen, recommendation, or interaction caused a particular response.</p></div></details>
              <details className="group border-b border-border py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6"><div><span className="eyebrow text-accent">The workaround</span><h3 className="mt-2 font-display text-2xl">I created an event layer so the research could be interpreted in context.</h3></div><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-muted-foreground/50 font-mono text-xl group-open:rotate-45">+</span></summary><div className="mt-5 space-y-4 leading-relaxed text-muted-foreground"><p>I used Supabase to record prototype events alongside the research session so we could better understand what the participant was doing when a signal occurred instead of relying on one undifferentiated session-level result.</p><p>The workaround did not turn exploratory affective data into ground truth. It made the evidence more interpretable while preserving the limitations of what the study could actually tell us.</p></div></details>
              <details className="group border-b border-border py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6"><div><span className="eyebrow text-accent">The privacy boundary</span><h3 className="mt-2 font-display text-2xl">The prototype needed to explain what was being measured, and what was not being stored.</h3></div><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-muted-foreground/50 font-mono text-xl group-open:rotate-45">+</span></summary><div className="mt-5 space-y-4 leading-relaxed text-muted-foreground"><p>I added explicit privacy language around the research experience: video was not stored, participation in camera-based analysis was optional, and research records used anonymous identifiers rather than turning the camera feed into part of the user's Vocari profile.</p><p>That distinction became an early lesson in responsible AI product work. Just because a signal can be collected does not mean it belongs in the product's personalization model.</p></div></details>
            </div>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {["MorphCast aggregated-data view", "Supabase event workaround", "Privacy / consent statement"].map((label, index) => <div key={label} className="flex min-h-[220px] items-center justify-center border border-dashed border-border bg-background p-8 text-center"><div><span className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Evidence placeholder {String(index + 1).padStart(2,"0")}</span><p className="mt-4 font-display text-2xl">{label}</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Replace with the strongest screenshot or artifact after the narrative review.</p></div></div>)}
          </div>
        </div>
      </section>

      <section id="system" className="bg-foreground px-6 py-24 text-background md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <span className="eyebrow text-accent">Where the prototype is now</span>
              <h2 className="mt-6 font-display text-4xl leading-tight md:text-6xl">The hard parts are the project now.</h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-background/70">
              <p>Vocari is an unfinished working prototype under active development. It now includes persistent evidence, structured career data, recommendation logic, user refinement behavior, progressive discovery, and AI-assisted interpretation, but I do not present it as a finished product.</p>
              <p>The problems I am working through now are requirements, constraints, rules, data structure, recommendation calibration, broader career coverage, user background, education pathways, and the safeguards a fuller product would need.</p>
              <p className="text-background">I could start another product and repeat the parts I already know. I would rather keep pushing this one into the parts I do not know yet.</p>
            </div>
          </div>

          <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Persistent evidence", "Remember what the product knows, where it came from, and what it is allowed to affect."],
              ["Hybrid intelligence", "Use AI for nuance and interpretation, explicit rules for behavior that must stay consistent."],
              ["Structured careers", "Represent different careers consistently enough to test recommendations beyond a narrow domain."],
              ["Pathway requirements", "Connect fit to a person's starting point, gaps, education, training, and realistic next actions."]
            ].map(([title, text]) => (
              <div key={title} className="border border-background/20 p-6">
                <h3 className="font-display text-2xl">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-background/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <span className="eyebrow text-accent">Current prototype</span>
              <h2 className="mt-6 font-display text-4xl leading-tight md:text-6xl">The interface is only the visible layer.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">Profile DNA, discovery, career exploration, explanations, reactions, and refinement now sit on top of a much more deliberate product model than the original prototype. These screens will be replaced with the strongest final evidence set after the narrative is locked.</p>
          </div>
          <PrototypeGallery />
        </div>
      </section>

      <section id="delivery" className="bg-secondary px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <details className="group border-y border-border py-7">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-8">
              <div>
                <span className="eyebrow text-accent">Build workflow · optional detail</span>
                <h2 className="mt-3 font-display text-3xl md:text-4xl">When one development path hit limits, I built another.</h2>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-muted-foreground/50 font-mono text-2xl group-open:rotate-45">+</span>
            </summary>
            <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <p className="text-lg leading-relaxed text-muted-foreground">During high-intensity prototyping, platform resource limits began interrupting iteration. I moved relevant codebase context into ChatGPT to reason through targeted changes, worked through GitHub version control, and used automated deployment workflows to keep the prototype available for continued testing.</p>
              <div>
                <p className="leading-relaxed text-muted-foreground">That workflow reduced dependency on a single prototyping tool and forced me to understand the architecture I was making product decisions on top of. It also made version history, targeted code changes, testing, and deployment part of the product work instead of something hidden behind the builder.</p>
                <div className="mt-6 flex flex-wrap gap-3">{["Lovable", "GitHub", "ChatGPT", "Supabase", "Vercel", "TypeScript", "Testing"].map(tool => <span key={tool} className="border border-border bg-background px-4 py-2 font-mono text-xs uppercase tracking-wider">{tool}</span>)}</div>
              </div>
            </div>
          </details>
        </div>
      </section>

      <section id="reflection" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-24">
            <div>
              <span className="eyebrow text-accent">Why I'm still building it</span>
              <h2 className="mt-6 font-display text-[clamp(2.8rem,5.8vw,6rem)] leading-[1] tracking-[-0.035em]">The easy problems are mostly behind me.</h2>
              <div className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-muted-foreground">
                <p>I could start another product and repeat the parts of the process I already know. Instead, I am continuing with Vocari because the questions left are harder: requirements, constraints, evidence, recommendation logic, AI behavior, career coverage, education pathways, and what happens when one new piece of information needs to ripple through an interconnected system.</p>
                <p>Those are exactly the problems I want to get better at solving. My goal is to keep pushing Vocari toward a fuller product, not because I need another portfolio project, but because building through the difficult parts is expanding what I am capable of building next.</p>
              </div>
            </div>
            <div className="space-y-8 lg:pt-10">
              <ReasonCell label="Current state" text="Active, unfinished working prototype. It works, but I am not presenting it as a finished or production-ready product." />
              <ReasonCell label="What I'm solving now" text="Broader career coverage, recommendation calibration, background and starting-point context, education pathways, requirements, constraints, and safeguards." />
              <ReasonCell label="The bigger question" text="How do you build a system that can keep learning about a person without treating that person as static?" />
            </div>
          </div>

          <div className="mt-20 border-t border-border pt-12">
            <p className="font-display text-3xl md:text-5xl">The idea was straightforward.</p>
            <p className="mt-3 font-display text-3xl text-muted-foreground md:text-5xl">Building it wasn't.</p>
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
      <div className="mb-5 flex items-start justify-between gap-4"><div><span className="eyebrow text-accent">Evidence placeholder</span><h4 className="mt-2 font-display text-2xl">{item.label}</h4></div><button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full border border-border font-mono text-xl">×</button></div>
      {item.src ? <img src={item.src} alt={item.alt || ""} className="mx-auto block max-h-[62vh] w-auto max-w-full border border-border object-contain" /> : <div className="flex min-h-[360px] items-center justify-center border border-dashed border-border bg-secondary p-10 text-center"><div><span className="font-mono text-3xl text-accent">▧</span><p className="mt-4 font-display text-2xl">Image placeholder</p></div></div>}
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
