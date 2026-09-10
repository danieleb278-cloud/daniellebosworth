import { Reveal } from "@/components/reveal";
import contentBlogPost from "@/assets/content/blogpost.png.asset.json";
import contentCarousel1 from "@/assets/content/carousel1.png.asset.json";
import contentShortform from "@/assets/content/shortform.png.asset.json";
import contentEmail from "@/assets/content/email.png.asset.json";
import contentCarousel4 from "@/assets/content/carousel4.png.asset.json";
import noiseHierarchy from "@/assets/noise/Hierarchy_Noise.png.asset.json";
import noiseDisruption from "@/assets/noise/Distruption_Noise.png.asset.json";
import noiseLoudQuiet from "@/assets/noise/Loud_v_Quiet_Noise.png.asset.json";
import noiseSignal from "@/assets/noise/Signal_Noise.png.asset.json";
import noiseIsolation from "@/assets/noise/Isolation_Noise.png.asset.json";
import noiseDirection from "@/assets/noise/Direction_Noise.png.asset.json";

const repurposingFlow = [
  "Source article",
  "Social / carousel",
  "Short-form video",
  "Email",
  "Supporting social",
];

const contentAssets = [
  {
    src: contentBlogPost.url,
    alt: "Long-form source article about social media for hairstylists",
    label: "Source article",
    caption: "The complete idea, written once as the foundation for everything else.",
  },
  {
    src: contentCarousel1.url,
    alt: "Opening slide of a social media carousel",
    label: "Social carousel",
    caption: "A sequential, scannable translation with a direct audience hook.",
  },
  {
    src: contentShortform.url,
    alt: "Short-form video storyboard",
    label: "Short-form video",
    caption: "The same message re-paced for motion and quick attention.",
  },
  {
    src: contentEmail.url,
    alt: "Email newsletter design",
    label: "Email",
    caption: "A slower format that reconnects readers to the full article.",
  },
  {
    src: contentCarousel4.url,
    alt: "Supporting social graphic from the carousel set",
    label: "Supporting social",
    caption: "Single-idea graphics extend the system between longer pieces.",
  },
];

const noiseConstants = ["NOISE", "A Visual Attention Experiment", "What makes you look?", "Event & date context"];
const noiseVariables = [
  "Typographic scale",
  "Type personality",
  "Contrast",
  "Repetition",
  "Visual density",
  "Color",
  "Composition",
  "Hierarchy",
  "Pattern disruption",
];

function Art({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="min-w-0">
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden border border-background/20 bg-background/5 p-2 transition-colors hover:border-teal"
        aria-label={`Open full-size artwork: ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.01]"
        />
      </a>
      <figcaption className="mt-3 text-xs leading-relaxed text-background/60">{caption}</figcaption>
    </figure>
  );
}

export function ContentVisualCase({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-charcoal/80 p-0 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="content-visual-heading"
        onClick={(e) => e.stopPropagation()}
        className="page-fade max-h-full w-full max-w-[1100px] overflow-y-auto border border-background/20 bg-charcoal text-background"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-background/20 bg-charcoal px-6 py-5 md:px-9">
          <div>
            <span className="eyebrow text-teal">§ Content &amp; Visual Communication</span>
            <h3
              id="content-visual-heading"
              className="mt-2 max-w-3xl font-display text-2xl leading-[1.05] tracking-tight text-background md:text-3xl"
            >
              Different messages. Different mediums. The same question:{" "}
              <span className="italic text-teal">what earns attention?</span>
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 border border-background/25 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-background/70 hover:border-teal hover:text-teal"
          >
            Close ✕
          </button>
        </div>

        <div className="px-6 pb-14 pt-10 md:px-9">
          <Reveal>
            <p className="max-w-4xl text-base leading-relaxed text-background/80 md:text-lg">
              These two projects explore different sides of communication: how one idea can become a coordinated system
              across channels, and how visual choices can change what the eye notices first.
            </p>
          </Reveal>

          {/* ---------- MINI CASE 01 ---------- */}
          <div className="mt-16 border-t border-background/20 pt-10">
            <span className="eyebrow text-teal">01 · Content strategy &amp; repurposing</span>
            <h4 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-background md:text-4xl">
              One idea, designed to work across multiple channels
              <span className="text-teal">.</span>
            </h4>
            <p className="eyebrow mt-4 text-background/50">
              Individual project · Content strategy &amp; multichannel communication
            </p>

            <div className="mt-10 grid gap-px border border-background/20 bg-background/20 md:grid-cols-2">
              <div className="bg-charcoal p-7">
                <span className="eyebrow text-teal">The challenge</span>
                <p className="mt-4 text-sm leading-relaxed text-background/75">
                  Creating separate ideas for every platform is inefficient and often creates disconnected messaging.
                  The challenge was to develop one useful source topic and translate it into formats appropriate for
                  different audience touchpoints while preserving a consistent message.
                </p>
              </div>
              <div className="bg-charcoal p-7">
                <span className="eyebrow text-teal">The source topic</span>
                <p className="mt-4 font-display text-xl leading-snug text-background md:text-2xl">
                  “5 Ways Hairstylists Can Use Social Media to Attract More Clients”
                </p>
              </div>
            </div>

            <div className="mt-10">
              <span className="eyebrow text-teal">The principle</span>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-background/70">
                {["One core idea", "Adapt the message", "Design for the channel", "A connected content system"].map(
                  (stepLabel, i) => (
                    <span key={stepLabel} className="flex items-center gap-3">
                      {i > 0 && <span className="text-teal" aria-hidden>→</span>}
                      <span className="border border-background/20 px-3 py-2">{stepLabel}</span>
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="mt-10">
              <span className="eyebrow text-teal">The approach</span>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-background/70">
                {repurposingFlow.map((stepLabel, i) => (
                  <span key={stepLabel} className="flex items-center gap-3">
                    {i > 0 && <span className="text-teal" aria-hidden>→</span>}
                    <span className="border border-background/20 px-3 py-2">{stepLabel}</span>
                  </span>
                ))}
              </div>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-background/70">
                The core message stays consistent while the presentation, amount of information, visual treatment, and
                call to action change according to the channel.
              </p>
            </div>

            <div className="mt-12">
              <span className="eyebrow text-teal">What I created</span>
              <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {contentAssets.map((asset) => (
                  <figure key={asset.label} className="min-w-0">
                    <div className="flex items-center justify-center overflow-hidden border border-background/20 bg-background/5 p-2">
                      <img
                        src={asset.src}
                        alt={asset.alt}
                        loading="lazy"
                        className="block max-h-72 w-auto max-w-full object-contain"
                      />
                    </div>
                    <figcaption className="mt-3">
                      <span className="eyebrow text-teal">{asset.label}</span>
                      <p className="mt-1 text-xs leading-relaxed text-background/60">{asset.caption}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {[
                "Content Strategy",
                "Message Architecture",
                "Content Repurposing",
                "Visual Communication",
                "Multichannel Design",
              ].map((t) => (
                <span key={t} className="eyebrow rounded-full border border-background/25 px-3 py-1 text-background/70">
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-8 max-w-3xl border-l-2 border-teal pl-5 font-display text-xl leading-snug text-background md:text-2xl">
              The value was not simply creating more content. It was designing a repeatable way for one useful idea to
              become multiple connected audience touchpoints.
            </p>
          </div>

          {/* ---------- MINI CASE 02 — NOISE ---------- */}
          <div className="mt-20 border-t-2 border-teal pt-12">
            <span className="eyebrow text-teal">02 · Visual exploration</span>
            <h4 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-background md:text-7xl">
              NOISE
            </h4>
            <p className="mt-4 font-display text-xl text-background/70 md:text-2xl">A Visual Attention Experiment</p>
            <p className="eyebrow mt-3 text-teal">What makes you look?</p>

            <p className="mt-8 max-w-3xl text-base leading-relaxed text-background/80">
              NOISE explores a simple question: when people are surrounded by competing visual information, what makes
              something interrupt the pattern and demand attention? It is a visual-design exploration — changes in
              scale, repetition, contrast, typography, spacing, color, density, and pattern disruption shift what the
              eye notices first.
            </p>

            <div className="mt-10">
              <Art
                src={noiseHierarchy.url}
                alt="NOISE poster with nested blue and purple rectangles and large white NOISE lettering"
                caption="Clean control · the concept stated plainly, before any disruption."
              />
            </div>

            <p className="mt-10 max-w-3xl text-sm leading-relaxed text-background/70">
              From that baseline, each direction pushes a different variable. Two contrasting treatments: one loud and
              asymmetric, one quiet and elegant — the same words, opposite strategies for holding a viewer.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <Art
                src={noiseDisruption.url}
                alt="Yellow NOISE poster with irregular letterforms and an elongated i"
                caption="Typographic disruption · scale, asymmetry and an interrupted letterform."
              />
              <Art
                src={noiseLoudQuiet.url}
                alt="Black poster with large white script Noise lettering"
                caption="Quiet direction · restraint and negative space as the attention device."
              />
            </div>

            <div className="mt-14">
              <Art
                src={noiseSignal.url}
                alt="Black and white poster with repeated NOISE typography behind a massive black NOISE"
                caption="Maximum visual noise · repetition, layering and overload competing with a single dominant form."
              />
            </div>

            <div className="mt-14 grid gap-10 border-y border-background/20 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
              <div>
                <span className="eyebrow text-teal">What changed?</span>
                <p className="mt-4 text-sm leading-relaxed text-background/70">
                  The concept stayed constant while the visual system changed, to see how differently the same idea
                  could compete for attention.
                </p>
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <span className="eyebrow text-background/50">Constant</span>
                  <ul className="mt-3 space-y-1 text-sm text-background/75">
                    {noiseConstants.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="eyebrow text-background/50">Variable</span>
                  <ul className="mt-3 space-y-1 text-sm text-background/75">
                    {noiseVariables.map((v) => (
                      <li key={v}>{v}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-end">
              <p className="text-sm leading-relaxed text-background/70">
                A final direction leaves flat graphic design behind entirely — illustration, motion cues and gestural
                marks carry the same line of copy.
              </p>
              <Art
                src={noiseIsolation.url}
                alt="Minimal white poster with a small orange noise word inside a blue scribble"
                caption="Isolation · one small element inside empty space still pulls the eye."
              />
            </div>

            <div className="mt-14">
              <Art
                src={noiseDirection.url}
                alt="Illustrated NOISE artwork with a road through the lettering, arrows and explosive marks"
                caption="Illustrative direction · path, arrows and eruption steer the eye left to right."
              />
            </div>

            <p className="mt-12 max-w-3xl border-l-2 border-teal pl-5 font-display text-xl leading-snug text-background md:text-2xl">
              NOISE reinforced that visual communication is not only about making something attractive. Hierarchy,
              contrast, repetition, scale, and disruption influence where attention goes and what information gets
              processed first.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Visual Design", "Typography", "Visual Hierarchy", "Concept Development", "Creative Exploration"].map(
                (t) => (
                  <span
                    key={t}
                    className="eyebrow rounded-full border border-background/25 px-3 py-1 text-background/70"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* ---------- CONNECTION ---------- */}
          <div className="mt-16 grid grid-cols-12 gap-6 border-t border-background/20 pt-10">
            <div className="col-span-12 md:col-span-3">
              <span className="eyebrow text-teal">The connection</span>
            </div>
            <p className="col-span-12 max-w-4xl font-display text-xl leading-relaxed text-background md:col-span-9 md:text-2xl">
              One project starts with a message and asks how it should change across channels. The other starts with a
              visual system and asks what makes the eye stop. Both are ultimately about designing communication around
              how people encounter information.
            </p>
          </div>

          <div className="mt-8 flex justify-end">
            <button type="button" onClick={onClose} className="eyebrow text-teal link-underline">
              Close ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
