import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/placeholder-image";
import { caseStudies, getCaseStudy, type Block, type Section } from "@/lib/case-studies";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Case study — Danielle Bosworth" }] };
    const url = `https://daniellebosworth.lovable.app/work/${params.slug}`;
    const title = `${loaderData.study.title} — Danielle Bosworth`;
    const desc = loaderData.study.subtitle;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            headline: loaderData.study.title,
            description: desc,
            url,
            author: { "@type": "Person", name: "Danielle Bosworth" },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <span className="eyebrow">404</span>
        <h1 className="mt-4 font-display text-4xl">Case study not found</h1>
        <Link to="/" className="eyebrow mt-6 inline-block link-underline">
          Back to index →
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    console.error(error);
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
        <div>
          <h1 className="font-display text-3xl">Something went wrong.</h1>
          <button onClick={reset} className="eyebrow mt-4 link-underline">
            Try again
          </button>
        </div>
      </div>
    );
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { study } = Route.useLoaderData() as { study: (typeof caseStudies)[number] };
  const currentIndex = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Header */}
      <section className="px-6 pt-40 pb-16 md:px-12 md:pt-56 md:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex items-center justify-between border-b border-border pb-6">
            <Link to="/" className="eyebrow link-underline">
              ← Index
            </Link>
            <span className="eyebrow">
              Case {study.index} / {String(caseStudies.length).padStart(2, "0")}
            </span>
          </div>
          <Reveal>
            <h1 className="font-display text-[clamp(2.75rem,8vw,8rem)] leading-[0.95] tracking-[-0.03em]">
              {study.title}
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-8 max-w-2xl font-display text-2xl leading-snug text-muted-foreground md:text-3xl">
              {study.subtitle}
            </p>
          </Reveal>

        </div>
      </section>

      {/* Project Snapshot */}
      {study.snapshot && (
        <section className="border-t border-border px-6 py-16 md:px-12 md:py-20">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="eyebrow text-accent mb-10 block">Project Snapshot</h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Project Type", study.snapshot.projectType],
                ["Duration", study.snapshot.duration],
                ["Team Size", study.snapshot.teamSize],
                ["My Role", study.snapshot.myRole],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="eyebrow text-accent">{label}</div>
                  <div className="mt-2 font-display text-base leading-snug md:text-lg">
                    {value}
                  </div>
                </div>
              ))}
              <div className="sm:col-span-2">
                <div className="eyebrow text-accent">Methods Used</div>
                <div className="mt-2 font-display text-base leading-snug md:text-lg">
                  {study.snapshot.methodsUsed}
                </div>
              </div>
              {study.snapshot.toolsUsed && (
                <div className="sm:col-span-2">
                  <div className="eyebrow text-accent">Tools Used</div>
                  <div className="mt-2 font-display text-base leading-snug md:text-lg">
                    {study.snapshot.toolsUsed}
                  </div>
                </div>
              )}
              <div className="sm:col-span-2">
                <div className="eyebrow text-accent">Deliverables</div>
                <div className="mt-2 font-display text-base leading-snug md:text-lg">
                  {study.snapshot.deliverables}
                </div>
              </div>
              <div className="sm:col-span-2 lg:col-span-4">
                <div className="eyebrow text-accent">Outcome</div>
                <div className="mt-2 font-display text-base leading-snug md:text-lg">
                  {study.snapshot.outcome}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pull quote */}
      <section className="border-y border-border bg-foreground px-6 py-20 text-background md:px-12 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <p className="max-w-4xl font-display text-2xl leading-snug tracking-tight md:text-5xl">
            "{study.hero}"
          </p>
        </div>
      </section>

      {study.sections ? (
        <SectionsAccordion sections={study.sections} />
      ) : (
        <>
          {/* Context & challenge */}
          <section className="px-6 py-28 md:px-12 md:py-32">
            <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6">
              <Reveal className="col-span-12 md:col-span-5">
                <h2 className="eyebrow">§ Context</h2>
                <p className="mt-6 text-lg leading-relaxed">{study.context}</p>
              </Reveal>
              <Reveal delay={120} className="col-span-12 md:col-span-6 md:col-start-7">
                <h2 className="eyebrow">§ The challenge</h2>
                <p className="mt-6 font-display text-2xl leading-snug md:text-3xl">
                  {study.challenge}
                </p>
              </Reveal>
            </div>
          </section>

          {/* Approach */}
          <section className="border-t border-border px-6 py-28 md:px-12 md:py-32">
            <div className="mx-auto max-w-[1400px]">
              <div className="mb-16 grid grid-cols-12 gap-6">
                <h2 className="eyebrow col-span-12 md:col-span-2">§ Approach</h2>
                <p className="col-span-12 font-display text-4xl tracking-tight md:col-span-10 md:text-5xl">
                  Three moves, in sequence.
                </p>
              </div>
              <ol className="divide-y divide-border">
                {study.approach.map((a, i) => (
                  <Reveal key={a.title} delay={i * 80}>
                    <li className="grid grid-cols-12 gap-6 py-10">
                      <div className="col-span-2 md:col-span-1">
                        <span className="font-mono text-sm text-muted-foreground">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="col-span-10 font-display text-2xl tracking-tight md:col-span-5 md:text-3xl">
                        {a.title}
                      </h3>
                      <p className="col-span-10 col-start-3 text-base leading-relaxed text-muted-foreground md:col-span-5 md:col-start-8">
                        {a.body}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </section>

          {/* Gallery */}
          <section className="border-t border-border px-6 py-20 md:px-12 md:py-28">
            <div className="mx-auto max-w-[1400px]">
              <div className="mb-10 flex items-end justify-between border-b border-border pb-4">
                <h2 className="eyebrow">§ Selected Artifacts</h2>
                <span className="eyebrow">Fig. 02 — 04</span>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
                {study.approach.map((a, i) => (
                  <Reveal key={a.title} delay={i * 80}>
                    <PlaceholderImage
                      label={`0${i + 2}`}
                      caption={a.title}
                      ratio={i === 1 ? "1/1" : "4/5"}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Outcomes */}
          <section className="border-t border-border bg-secondary px-6 py-28 md:px-12 md:py-32">
            <div className="mx-auto max-w-[1400px]">
              <h2 className="eyebrow">§ Outcomes</h2>
              <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
                {study.outcomes.map((o, i) => (
                  <Reveal key={o.label} delay={i * 100}>
                    <div className="border-t border-border pt-6">
                      <div className="font-display text-[clamp(3rem,7vw,6rem)] leading-none tracking-tight">
                        {o.metric}
                      </div>
                      <div className="eyebrow mt-4">{o.label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Reflections */}
          <section className="px-6 py-28 md:px-12 md:py-32">
            <div className="mx-auto max-w-[1400px]">
              <div className="grid grid-cols-12 gap-6">
                <span className="eyebrow col-span-12 md:col-span-2">§ Reflection</span>
                <p className="col-span-12 font-display text-3xl leading-snug tracking-tight md:col-span-9 md:text-5xl">
                  {study.reflections}
                </p>
              </div>
            </div>
          </section>
        </>
      )}
      <section className="border-t border-border">
        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          className="group block px-6 py-20 md:px-12 md:py-28"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Next case — {next.index}</span>
              <span className="eyebrow link-underline">Continue →</span>
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em] transition-transform duration-500 group-hover:-translate-y-1">
              {next.title}
              <span className="text-accent">.</span>
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              {next.subtitle}
            </p>
          </div>
        </Link>
      </section>

      <footer className="border-t border-border px-6 py-10 md:px-12">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <span className="eyebrow">© {new Date().getFullYear()} Danielle Bosworth</span>
          <Link to="/" className="eyebrow link-underline">
            Back to index ↑
          </Link>
        </div>
      </footer>
    </div>
  );
}

function SectionsAccordion({ sections }: { sections: Section[] }) {
  return (
    <section className="border-t border-border px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex items-end justify-between border-b border-border pb-4">
          <span className="eyebrow">§ Case Study</span>
          <span className="eyebrow">Tap a section to expand</span>
        </div>
        <Accordion
          type="multiple"
          defaultValue={[sections[0]?.id].filter(Boolean) as string[]}
          className="w-full"
        >
          {sections.map((s, i) => (
            <Reveal key={s.id} delay={Math.min(i * 40, 240)}>
              <AccordionItem value={s.id} className="border-border">
                <AccordionTrigger className="group py-8 hover:no-underline">
                  <div className="flex w-full items-baseline gap-6 text-left">
                    <span className="font-mono text-sm text-muted-foreground shrink-0 w-8">
                      {s.number}
                    </span>
                    <span className="font-display text-2xl tracking-tight md:text-4xl transition-transform duration-300 group-hover:-translate-y-0.5">
                      {s.title}
                      <span className="text-accent">.</span>
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-10">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-10 md:col-start-2 space-y-6">
                      {s.blocks.map((b, bi) => (
                        <BlockView key={bi} block={b} />
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function BlockView({ block }: { block: Block }) {
  if (block.kind === "p") {
    return (
      <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
        {block.text}
      </p>
    );
  }
  if (block.kind === "list") {
    return (
      <div>
        {block.heading && (
          <h4 className="font-display text-lg tracking-tight md:text-xl">
            {block.heading}
          </h4>
        )}
        <ul className="mt-3 space-y-2">
          {block.items.map((it) => (
            <li
              key={it}
              className="flex gap-3 text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              <span className="text-accent shrink-0 mt-2 block h-px w-4 bg-accent" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (block.kind === "image") {
    return (
    <div className={`my-2 ${block.className ?? ""}`}>
        <PlaceholderImage
          label={block.label}
          caption={block.caption}
          ratio={block.ratio ?? "16/9"}
          src={block.src}
          alt={block.alt}
          fit={block.fit ?? "cover"}
        />
      </div>
    );
  }
  if (block.kind === "gallery") {
    return (
      <div className="my-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {block.items.map((it, i) => (
          <PlaceholderImage
            key={i}
            label={it.label}
            caption={it.caption}
            ratio={it.ratio ?? "4/5"}
            src={it.src}
            alt={it.alt}
          />
        ))}
      </div>
    );
  }
  if (block.kind === "carousel") {
    return <CarouselBlock block={block} />;
  }

  // group
  return (
    <div className="border-l border-border pl-5">
      <h4 className="font-display text-xl tracking-tight md:text-2xl">
        {block.heading}
      </h4>
      <div className="mt-4 space-y-4">
        {block.blocks.map((b, i) => (
          <BlockView key={i} block={b} />
        ))}
      </div>
    </div>
  );
}

function CarouselBlock({
  block,
}: {
  block: Extract<Block, { kind: "carousel" }>;
}) {
  const [i, setI] = useState(0);
  const total = block.slides.length;
  const go = (n: number) => setI(((n % total) + total) % total);
  return (
    <figure className="w-full">
      <div className="relative mx-auto max-w-md">
        <div
          style={{ aspectRatio: block.ratio ?? "4/5" }}
          className="relative w-full overflow-hidden border border-border bg-secondary"
        >
          {block.slides.map((s, idx) => (
            <img
              key={idx}
              src={s.src}
              alt={s.alt ?? ""}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                idx === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
            <button
              type="button"
              onClick={() => go(i - 1)}
              aria-label="Previous slide"
              className="eyebrow rounded-full bg-background/85 px-3 py-1.5 backdrop-blur-sm hover:bg-background"
            >
              ←
            </button>
            <span className="eyebrow rounded-full bg-background/85 px-3 py-1.5 backdrop-blur-sm">
              {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => go(i + 1)}
              aria-label="Next slide"
              className="eyebrow rounded-full bg-background/85 px-3 py-1.5 backdrop-blur-sm hover:bg-background"
            >
              →
            </button>
          </div>
        </div>
        <div className="mt-3 flex justify-center gap-1.5">
          {block.slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => go(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 w-6 transition-colors ${
                idx === i ? "bg-foreground" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
      {block.caption ? (
        <figcaption className="eyebrow mt-3 flex items-center justify-between border-t border-border pt-2">
          <span>{block.caption}</span>
          <span aria-hidden>✦</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
