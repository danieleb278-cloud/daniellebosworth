import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/placeholder-image";
import { JoomlaCaseStudy } from "@/components/joomla-case-study";
import { NextDestinationCaseStudy } from "@/components/next-destination-case-study";
import { RobinCaseStudy } from "@/components/robin-case-study";
import { VocariCaseStudy } from "@/components/vocari-case-study";
import { ContentStrategyCaseStudy } from "@/components/content-strategy-case-study";
import { SupercutsCaseStudy } from "@/components/supercuts-case-study";
import { caseStudies, getCaseStudy, type Block, type Section } from "@/lib/case-studies";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Case study — Danielle Bosworth" }] };
    const url = `https://madebydanielleb.com/work/${params.slug}`;
    const title = `${loaderData.study.title} — Danielle Bosworth`;
    const desc = loaderData.study.subtitle;
    const coverSrc = loaderData.study.cover?.src;
    const imageUrl = coverSrc ? (coverSrc.startsWith("http") ? coverSrc : `https://madebydanielleb.com${coverSrc}`) : undefined;
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:type", content: "article" }, { property: "og:url", content: url },
        ...(imageUrl ? [{ property: "og:image", content: imageUrl }, { property: "og:image:alt", content: loaderData.study.cover?.alt ?? title }, { name: "twitter:image", content: imageUrl }] : []),
        { name: "twitter:title", content: title }, { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => <div className="flex min-h-screen items-center justify-center bg-background px-6"><div className="text-center"><span className="eyebrow">404</span><h1 className="mt-4 font-display text-4xl">Case study not found</h1><Link to="/" className="eyebrow mt-6 inline-block link-underline">Back to index →</Link></div></div>,
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { study } = Route.useLoaderData() as { study: (typeof caseStudies)[number] };
  const currentIndex = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(currentIndex + 1) % caseStudies.length];
  const isJoomla = study.slug === "joomla";
  const isNextDestination = study.slug === "next-destination";
  const isRobin = study.slug === "robin";
  const isVocari = study.slug === "vocari";
  const isContentStrategy = study.slug === "content-strategy";
  const isSupercuts = study.slug === "supercuts";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="px-6 pt-40 pb-14 md:px-12 md:pt-52 md:pb-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex items-center justify-between border-b border-border pb-6">
            <Link to="/" className="eyebrow link-underline">← Index</Link>
            <span className="eyebrow">Case {study.index} / {String(caseStudies.length).padStart(2, "0")}</span>
          </div>
          <Reveal>
            <h1 className="font-display text-[clamp(2.75rem,8vw,8rem)] leading-[0.95] tracking-[-0.03em]">{study.title}<span className="text-accent">.</span></h1>
            <p className="mt-8 max-w-3xl font-display text-2xl leading-snug text-muted-foreground md:text-3xl">{study.subtitle}</p>
          </Reveal>
        </div>
      </section>

      {isSupercuts ? <SupercutsCaseStudy study={study} /> : isVocari ? <VocariCaseStudy study={study} /> : isContentStrategy ? <ContentStrategyCaseStudy study={study} /> : isJoomla ? <JoomlaCaseStudy study={study} /> : isNextDestination ? <NextDestinationCaseStudy study={study} /> : isRobin ? <RobinCaseStudy study={study} /> : <LegacyCaseStudy study={study} />}

      <section className="border-t border-border">
        <Link to="/work/$slug" params={{ slug: next.slug }} className="group block px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex items-center justify-between"><span className="eyebrow">Next case — {next.index}</span><span className="eyebrow link-underline">Continue →</span></div>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em] transition-transform duration-500 group-hover:-translate-y-1">{next.title}<span className="text-accent">.</span></h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">{next.subtitle}</p>
          </div>
        </Link>
      </section>
      <footer className="border-t border-border px-6 py-10 md:px-12"><div className="mx-auto flex max-w-[1400px] items-center justify-between"><span className="eyebrow">© {new Date().getFullYear()} Danielle Bosworth</span><Link to="/" className="eyebrow link-underline">Back to index ↑</Link></div></footer>
    </div>
  );
}

function LegacyCaseStudy({ study }: { study: (typeof caseStudies)[number] }) {
  return <>
    {study.snapshot && <section className="border-t border-border px-6 py-16 md:px-12 md:py-20"><div className="mx-auto max-w-[1400px]"><h2 className="eyebrow mb-10 text-accent">Project Snapshot</h2><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{[["Project Type", study.snapshot.projectType],["Duration", study.snapshot.duration],["Team Size", study.snapshot.teamSize],["My Role", study.snapshot.myRole],["Methods Used", study.snapshot.methodsUsed],["Tools Used", study.snapshot.toolsUsed],["Deliverables", study.snapshot.deliverables],["Outcome", study.snapshot.outcome]].map(([label,value]) => <div key={label}><div className="eyebrow text-accent">{label}</div><div className="mt-2 font-display text-base leading-snug md:text-lg">{value}</div></div>)}</div></div></section>}
    <section className="border-y border-border bg-foreground px-6 py-20 text-background md:px-12 md:py-28"><div className="mx-auto max-w-[1400px]"><p className="max-w-4xl font-display text-2xl leading-snug tracking-tight md:text-5xl">“{study.hero}”</p></div></section>
    {study.sections ? <SectionsAccordion sections={study.sections} /> : <ShortStudy study={study} />}
  </>;
}

function ShortStudy({ study }: { study: (typeof caseStudies)[number] }) {
  return <>
    <section className="px-6 py-28 md:px-12"><div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-2"><div><h2 className="eyebrow">§ Context</h2><p className="mt-6 text-lg leading-relaxed">{study.context}</p></div><div><h2 className="eyebrow">§ The challenge</h2><p className="mt-6 font-display text-2xl leading-snug md:text-3xl">{study.challenge}</p></div></div></section>
    <section className="border-t border-border px-6 py-28 md:px-12"><div className="mx-auto max-w-[1400px]"><h2 className="eyebrow">§ Approach</h2><div className="mt-10 divide-y divide-border">{study.approach.map((a,i)=><div key={a.title} className="grid gap-5 py-8 md:grid-cols-[80px_1fr_1fr]"><span className="font-mono text-sm text-muted-foreground">0{i+1}</span><h3 className="font-display text-2xl">{a.title}</h3><p className="text-muted-foreground">{a.body}</p></div>)}</div></div></section>
  </>;
}

function SectionsAccordion({ sections }: { sections: Section[] }) {
  return <section className="border-t border-border px-6 py-20 md:px-12 md:py-28"><div className="mx-auto max-w-[1400px]"><div className="mb-10 flex items-end justify-between border-b border-border pb-4"><h2 className="eyebrow">§ Case Study</h2><span className="eyebrow">Tap a section to expand</span></div><Accordion type="multiple" defaultValue={[sections[0]?.id].filter(Boolean) as string[]} className="w-full">{sections.map((s,i)=><Reveal key={s.id} delay={Math.min(i*40,240)}><AccordionItem value={s.id} className="border-border"><AccordionTrigger className="group py-8 hover:no-underline"><div className="flex w-full items-baseline gap-6 text-left"><span className="w-8 shrink-0 font-mono text-sm text-muted-foreground">{s.number}</span><span className="font-display text-2xl tracking-tight md:text-4xl">{s.title}<span className="text-accent">.</span></span></div></AccordionTrigger><AccordionContent className="pb-10"><div className="grid grid-cols-12 gap-6"><div className="col-span-12 space-y-6 md:col-span-10 md:col-start-2">{s.blocks.map((b,bi)=><BlockView key={bi} block={b}/>)}</div></div></AccordionContent></AccordionItem></Reveal>)}</Accordion></div></section>;
}

function BlockView({ block }: { block: Block }) {
  if (block.kind === "p") return <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{block.text}</p>;
  if (block.kind === "list") return <div>{block.heading && <h4 className="font-display text-lg md:text-xl">{block.heading}</h4>}<ul className="mt-3 space-y-2">{block.items.map((it)=><li key={it} className="flex gap-3 text-base leading-relaxed text-muted-foreground md:text-lg"><span className="mt-2 block h-px w-4 shrink-0 bg-accent"/><span>{it}</span></li>)}</ul></div>;
  if (block.kind === "image") return <div className={`my-2 ${block.className ?? ""}`}><PlaceholderImage label={block.label} caption={block.caption} ratio={block.ratio ?? "16/9"} src={block.src} alt={block.alt} fit={block.fit ?? "cover"}/></div>;
  if (block.kind === "gallery") return <div className="my-2 grid gap-5 sm:grid-cols-2">{block.items.map((it,i)=><PlaceholderImage key={i} label={it.label} caption={it.caption} ratio={it.ratio ?? "4/5"} src={it.src} alt={it.alt}/>)}</div>;
  if (block.kind === "carousel") return <CarouselBlock block={block}/>;
  return <div className="border-l border-border pl-5"><h4 className="font-display text-xl md:text-2xl">{block.heading}</h4><div className="mt-4 space-y-4">{block.blocks.map((b,i)=><BlockView key={i} block={b}/>)}</div></div>;
}

function CarouselBlock({ block }: { block: Extract<Block,{kind:"carousel"}> }) {
  const [i,setI]=useState(0); const total=block.slides.length; const go=(n:number)=>setI(((n%total)+total)%total);
  return <figure className="w-full"><div className="relative mx-auto max-w-md"><div style={{aspectRatio:block.ratio ?? "4/5"}} className="relative w-full overflow-hidden border border-border bg-secondary">{block.slides.map((s,idx)=><img key={idx} src={s.src} alt={s.alt ?? ""} loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${idx===i?"opacity-100":"opacity-0"}`}/>)}<div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3"><button type="button" onClick={()=>go(i-1)} className="eyebrow rounded-full bg-background/85 px-3 py-1.5">←</button><span className="eyebrow rounded-full bg-background/85 px-3 py-1.5">{i+1} / {total}</span><button type="button" onClick={()=>go(i+1)} className="eyebrow rounded-full bg-background/85 px-3 py-1.5">→</button></div></div></div>{block.caption && <figcaption className="eyebrow mt-3 border-t border-border pt-2">{block.caption}</figcaption>}</figure>;
}

