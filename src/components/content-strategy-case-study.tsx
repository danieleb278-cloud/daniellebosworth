import { useState } from "react";
import { Reveal } from "@/components/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import contentHero from "@/assets/content/hero.png.asset.json";
import contentProcess from "@/assets/content/process.jpg.asset.json";
import contentShortform from "@/assets/content/shortform.png.asset.json";
import contentEmail from "@/assets/content/email.png.asset.json";
import contentBlogPost from "@/assets/content/blogpost.png.asset.json";
import contentCarousel1 from "@/assets/content/carousel1.png.asset.json";
import contentCarousel2 from "@/assets/content/carousel2.png.asset.json";
import contentCarousel3 from "@/assets/content/carousel3.png.asset.json";
import contentCarousel4 from "@/assets/content/carousel4.png.asset.json";
import contentCarousel5 from "@/assets/content/carousel5.png.asset.json";
import contentCarousel6 from "@/assets/content/carousel6.png.asset.json";
import contentCarousel7 from "@/assets/content/carousel7.png.asset.json";

const insightCards = [
  {
    label: "Source",
    title: "Customer questions are reusable content inputs.",
    body: "Starting with a real audience need produced a stronger foundation than beginning with a platform format or a blank content calendar.",
  },
  {
    label: "Adaptation",
    title: "Repurposing is not simply resizing.",
    body: "Each asset needed a different hook, hierarchy, pacing, and level of detail to match how people engage with that channel.",
  },
  {
    label: "System",
    title: "Consistency comes from a repeatable workflow.",
    body: "A shared message, visual language, and production sequence made it possible to create more touchpoints without rebuilding the idea every time.",
  },
];

const solutionGroups = [
  {
    number: "01",
    title: "Establish one useful source",
    body: "A long-form educational article captured the complete idea, audience problem, supporting guidance, and primary call to action.",
  },
  {
    number: "02",
    title: "Translate the message visually",
    body: "The article became a seven-slide carousel with concise copy, deliberate hierarchy, and a visual rhythm designed for sequential discovery.",
  },
  {
    number: "03",
    title: "Extend the system across channels",
    body: "Short-form video, email, captions, and supporting assets adapted the same idea for different attention patterns while preserving a consistent message.",
  },
];

const slides = [
  { src: contentBlogPost.url, alt: "Long-form article about social media content for hairstylists", caption: "Fig. 04 · Source article establishes the complete educational message" },
  { src: contentCarousel1.url, alt: "First slide of a social media carousel", caption: "Fig. 05 · Carousel cover uses a direct audience-focused hook" },
  { src: contentCarousel2.url, alt: "Second slide of a social media carousel", caption: "Fig. 06 · Sequential design turns the article into a scannable narrative" },
  { src: contentCarousel3.url, alt: "Third slide of a social media carousel", caption: "Fig. 07 · Visual hierarchy keeps each takeaway focused" },
  { src: contentCarousel4.url, alt: "Fourth slide of a social media carousel", caption: "Fig. 08 · Supporting graphics reinforce the message without replacing it" },
  { src: contentCarousel5.url, alt: "Fifth slide of a social media carousel", caption: "Fig. 09 · Consistent structure helps the audience anticipate the rhythm" },
  { src: contentCarousel6.url, alt: "Sixth slide of a social media carousel", caption: "Fig. 10 · Practical guidance moves the audience toward action" },
  { src: contentCarousel7.url, alt: "Final slide of a social media carousel", caption: "Fig. 11 · Closing slide completes the story with a clear next step" },
  { src: contentShortform.url, alt: "Short-form video storyboard", caption: "Fig. 12 · Short-form storyboard adapts the message for motion and pacing" },
  { src: contentEmail.url, alt: "Email newsletter design", caption: "Fig. 13 · Email design reconnects the audience to the long-form article" },
];

export function ContentStrategyCaseStudy({ study }: { study: CaseStudy }) {
  return (
    <>
      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal><div className="overflow-hidden bg-secondary p-3 md:p-5"><CaseFigure src={contentHero.url} alt="Content strategy project hero graphic" caption="Fig. 01 · One educational idea developed into a coordinated visual content system" /></div></Reveal>
        </div>
      </section>

      <section className="bg-secondary px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="01 / 05" label="Overview" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">The project in 30 seconds</p>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
            <Summary label="The problem" text="Creating every post from scratch makes consistent content expensive, fragmented, and difficult to sustain." />
            <Summary label="What I did" text="I developed the strategy, writing, visual direction, and graphics for a multi-channel content system built from one source idea." />
            <Summary label="The direction" text="Treat one strong audience insight as a reusable foundation, then adapt it intentionally for each format and channel." />
          </div>
          <div className="mt-14 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
            <Meta label="Role" value="Content Strategist, Writer & Visual Content Designer" />
            <Meta label="Project type" value="Independent content-system demonstration" />
            <Meta label="Methods" value="Audience insight analysis, message development, visual hierarchy, content repurposing" />
            <Meta label="Tools" value="Canva, Adobe Express, CapCut, Google Workspace, ChatGPT" />
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="02 / 05" label="Discover" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">The challenge</p>
          <div className="mt-14 grid grid-cols-12 gap-8">
            <Reveal className="col-span-12 lg:col-span-8"><h2 className="font-display text-[clamp(2.6rem,6vw,6.5rem)] leading-[0.98] tracking-[-0.035em]">The constraint was not a lack of ideas. It was the absence of a <span className="text-accent">content system.</span></h2></Reveal>
            <div className="col-span-12 lg:col-span-4 lg:pt-3"><p className="text-lg leading-relaxed text-muted-foreground">{study.challenge}</p><p className="mt-6 text-base leading-relaxed text-muted-foreground">{study.context}</p></div>
          </div>
          <div className="mt-16 grid gap-10 md:grid-cols-3">{insightCards.map((card,i)=><article key={card.label}><span className="eyebrow text-accent">{String(i+1).padStart(2,"0")} · {card.label}</span><h3 className="mt-7 font-display text-2xl leading-tight md:text-3xl">{card.title}</h3><p className="mt-5 leading-relaxed text-muted-foreground">{card.body}</p></article>)}</div>
        </div>
      </section>

      <section className="bg-foreground px-6 py-24 text-background md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="03 / 05" label="Define" tone="dark" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-background/60">Connecting strategy to production</p>
          <div className="grid gap-12 py-16 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <div className="space-y-4 font-display text-2xl text-background/70 md:text-3xl"><p>One audience question</p><p>One complete source</p><p>One visual language</p></div>
            <div className="hidden h-48 w-px bg-background/20 lg:block" />
            <div><span className="eyebrow text-accent">Content opportunity</span><p className="mt-6 font-display text-3xl leading-snug md:text-5xl">Design a connected family of assets instead of isolated posts.</p></div>
          </div>
          <CaseFigure src={contentProcess.url} alt="Content marketing process from research through measurement" caption="Fig. 02 · Repeatable workflow connects research, strategy, creation, optimization, and measurement" dark />
        </div>
      </section>

      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="04 / 05" label="Design" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">The visual content system</p>
          <div className="mt-14 grid gap-12 md:grid-cols-3">{solutionGroups.map(group=><div key={group.number}><span className="font-mono text-xs text-accent">{group.number}</span><h3 className="mt-6 font-display text-2xl leading-tight md:text-3xl">{group.title}</h3><p className="mt-5 leading-relaxed text-muted-foreground">{group.body}</p></div>)}</div>
          <VisualCarousel />
        </div>
      </section>

      <section className="bg-secondary px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="05 / 05" label="Next" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Outcome & reflection</p>
          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <div><span className="eyebrow text-accent">What the project demonstrates</span><h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">Visual execution becomes more valuable when every asset belongs to a system.</h2><p className="mt-7 text-lg leading-relaxed text-muted-foreground">The deliverable was a coordinated set of original graphics and channel-specific assets supported by a repeatable production workflow. It demonstrates design and content capability; it was not presented as a measured performance campaign.</p></div>
            <div className="space-y-8"><ReasonCell label="Visual capability" text="Typography, hierarchy, composition, pacing, and consistency across long-form, carousel, video, and email formats." /><ReasonCell label="Strategic capability" text="Turning an audience need into a source message, then preserving its meaning across multiple touchpoints." /><ReasonCell label="Reflection" text="Repurposing works when each format has a distinct job. Repetition alone creates volume; thoughtful adaptation creates a system." /></div>
          </div>
          <div className="mt-16 border-t border-border pt-12"><span className="eyebrow text-accent">Capabilities demonstrated</span><div className="mt-7 flex flex-wrap gap-3">{["Graphic design","Content systems","Copywriting","Visual hierarchy","Content repurposing","Communication design"].map(skill=><span key={skill} className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider">{skill}</span>)}</div></div>
        </div>
      </section>
    </>
  );
}

function VisualCarousel() {
  const [active,setActive]=useState(0);
  return <div className="mt-14"><div className="mx-auto max-w-3xl">{slides.map((slide,index)=><div key={slide.caption} className={index===active?"block":"hidden"} aria-hidden={index!==active}><CaseFigure src={slide.src} alt={slide.alt} caption={slide.caption} portrait /></div>)}</div><div className="mx-auto mt-6 flex max-w-3xl items-center justify-between border-t border-border pt-5"><span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Visual asset {String(active+1).padStart(2,"0")} / {String(slides.length).padStart(2,"0")}</span><div className="flex gap-3"><button type="button" onClick={()=>setActive((active-1+slides.length)%slides.length)} className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] hover:border-accent hover:text-accent">Previous</button><button type="button" onClick={()=>setActive((active+1)%slides.length)} className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] hover:border-accent hover:text-accent">Next</button></div></div></div>;
}
function CaseFigure({src,alt,caption,portrait=false,dark=false}:{src:string;alt:string;caption:string;portrait?:boolean;dark?:boolean}) { return <figure className="w-full"><div className={`flex w-full items-center justify-center border p-4 md:p-6 ${dark?"border-background/20 bg-background/5":"border-border bg-secondary"}`}><img src={src} alt={alt} className={portrait?"block max-h-[780px] w-auto max-w-full":"block h-auto w-full"} loading="lazy" /></div><figcaption className={`eyebrow mt-3 flex items-center justify-between border-t pt-2 ${dark?"border-background/20 text-background/70":"border-border"}`}><span>{caption}</span><span aria-hidden>✦</span></figcaption></figure>; }
function Summary({label,text}:{label:string;text:string}) { return <div><span className="eyebrow text-accent">{label}</span><p className="mt-5 font-display text-2xl leading-snug tracking-tight md:text-3xl">{text}</p></div>; }
function Meta({label,value}:{label:string;value:string}) { return <div className="min-h-32 border-border px-0 py-6 sm:px-6 sm:first:pl-0 lg:border-r lg:last:border-r-0"><span className="eyebrow text-muted-foreground">{label}</span><p className="mt-3 max-w-[28ch] text-sm leading-relaxed">{value}</p></div>; }
function SectionLabel({number,label,tone="light"}:{number:string;label:string;tone?:"light"|"dark"}) { return <div className="flex items-baseline gap-5"><span className={`font-mono text-xs ${tone==="dark"?"text-background/60":"text-muted-foreground"}`}>{number}</span><span className="eyebrow text-accent">{label}</span></div>; }
function ReasonCell({label,text}:{label:string;text:string}) { return <div><span className="eyebrow text-accent">{label}</span><p className="mt-4 font-display text-xl leading-snug md:text-2xl">{text}</p></div>; }
