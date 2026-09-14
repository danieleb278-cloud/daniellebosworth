import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BriefcaseBusiness,
  Download,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/connect")({
  head: () => ({
    meta: [
      { title: "Connect with Danielle Bosworth" },
      {
        name: "description",
        content:
          "Connect with Danielle Bosworth for product, customer experience, AI, operations, and marketing opportunities.",
      },
      { property: "og:title", content: "Connect with Danielle Bosworth" },
      {
        property: "og:description",
        content:
          "Product, customer experience, AI, operations, and marketing strategy.",
      },
      { property: "og:url", content: "https://madebydanielleb.com/connect" },
    ],
    links: [{ rel: "canonical", href: "https://madebydanielleb.com/connect" }],
  }),
  component: ConnectPage,
});

const careerPaths: Array<{
  title: string;
  themes: string;
  resumeLabel: string;
  resumeTarget: string;
  resumeUrl: string | null;
}> = [
  {
    title: "PRODUCT, AI & SYSTEMS",
    themes: "Product strategy • Human-AI experience • UX • AI implementation",
    resumeLabel: "View Product, AI & Systems Resume",
    resumeTarget: "product-ai-systems-resume",
    resumeUrl: null,
  },
  {
    title: "CUSTOMER EXPERIENCE & ENGAGEMENT",
    themes: "Customer journeys • Service design • Voice of Customer • Engagement strategy",
    resumeLabel: "View Customer Experience & Engagement Resume",
    resumeTarget: "customer-experience-engagement-resume",
    resumeUrl: null,
  },
  {
    title: "PROJECTS & OPERATIONS",
    themes:
      "Project coordination • Process improvement • Cross-functional execution • Systems thinking",
    resumeLabel: "View Projects & Operations Resume",
    resumeTarget: "projects-operations-resume",
    resumeUrl: null,
  },
];

const contactLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/daniellelbosworth",
    icon: Linkedin,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:contact.madebydanielleb@gmail.com",
    icon: Mail,
    external: false,
  },
] as const;

export function ConnectPage() {
  const saveContact = () => {
    const vCard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:Danielle Bosworth",
      "N:Bosworth;Danielle;;;",
      "TITLE:Product, Customer Experience, AI & Operations",
      "EMAIL;TYPE=INTERNET:contact.madebydanielleb@gmail.com",
      "URL:https://madebydanielleb.com",
      "X-SOCIALPROFILE;TYPE=linkedin:https://linkedin.com/in/daniellelbosworth",
      "END:VCARD",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([vCard], { type: "text/vcard" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "Danielle-Bosworth.vcf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-5xl px-5 pb-10 pt-5 sm:px-8 sm:pb-14 sm:pt-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-border pb-4">
          <Link to="/" className="group flex items-center gap-2.5" aria-label="Danielle Bosworth portfolio home">
            <img src="/home/site-logo.png" alt="" className="h-9 w-9" />
            <span className="font-display text-lg tracking-tight">Danielle Bosworth</span>
          </Link>
          <span className="eyebrow hidden text-teal sm:block">Open to opportunities</span>
        </header>

        <section className="grid gap-7 border-b border-border py-9 sm:py-12 md:grid-cols-[minmax(0,1fr)_13rem] md:items-center md:gap-12">
          <div>
            <div className="mb-5 flex items-center gap-4 md:hidden">
              <ProfilePhoto className="h-20 w-20" />
              <span className="eyebrow text-teal">Let&apos;s connect</span>
            </div>
            <p className="eyebrow mb-3 hidden text-teal md:block">Let&apos;s connect</p>
            <h1 className="max-w-3xl font-display text-[clamp(2.55rem,9vw,5.4rem)] leading-[0.94] tracking-[-0.045em]">
              Danielle Bosworth<span className="text-accent">.</span>
            </h1>
            <p className="mt-4 text-base font-medium tracking-tight sm:text-lg">
              Product <span className="text-teal">•</span> Customer Experience{" "}
              <span className="text-teal">•</span> AI <span className="text-teal">•</span> Operations
            </p>
            <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-muted-foreground sm:text-lg">
              I connect customer needs, business operations, and technology to design better products,
              experiences, and systems.
            </p>
            <a
              href="https://madebydanielleb.com"
              className="group mt-6 inline-flex min-h-12 w-full items-center justify-between rounded-sm bg-foreground px-5 py-3.5 text-sm font-medium text-background transition-colors hover:bg-teal focus-visible:outline-offset-4 sm:w-auto sm:min-w-48"
            >
              View My Work
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <ProfilePhoto className="hidden aspect-[4/5] w-full md:block" />
        </section>

        <section aria-labelledby="hiring-heading" className="border-b border-border py-9 sm:py-12">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2 text-teal">Choose a focus</p>
              <h2 id="hiring-heading" className="font-display text-3xl tracking-tight sm:text-4xl">
                What are you hiring for?
              </h2>
            </div>
            <BriefcaseBusiness aria-hidden className="hidden h-6 w-6 text-teal sm:block" />
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {careerPaths.map((path, index) => {
              const card = (
                <>
                  <span className="font-mono text-[0.65rem] tracking-[0.18em] text-teal">0{index + 1}</span>
                  <span className="mt-5 block font-display text-2xl leading-tight tracking-tight md:min-h-[3.75rem]">{path.title}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted-foreground md:min-h-[4.5rem]">{path.themes}</span>
                  <span className="mt-5 flex items-center justify-between border-t border-border pt-3 text-xs font-medium md:mt-auto">
                    {path.resumeLabel}
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </span>
                </>
              );

              return path.resumeUrl ? (
                <a
                  key={path.title}
                  href={path.resumeUrl}
                  className="group card-lift flex min-h-44 flex-col rounded-sm border border-border bg-card p-5 focus-visible:outline-offset-4"
                >
                  {card}
                </a>
              ) : (
                <div
                  key={path.title}
                  data-resume-target={path.resumeTarget}
                  className="flex min-h-44 flex-col rounded-sm border border-border bg-card p-5"
                >
                  {card}
                </div>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="proof-heading" className="border-b border-border py-9 sm:py-12">
          <p id="proof-heading" className="eyebrow mb-5 text-teal">Selected proof</p>
          <div className="grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-[0.7fr_0.7fr_1.6fr]">
            <Proof value="4×+" label="Monthly location revenue" />
            <Proof value="32%" label="Increase in client retention" />
            <Proof
              value="AI Knowledge System"
              label="Designed and implemented to centralize product, customer, and operational knowledge"
              wide
            />
          </div>
        </section>

        <section aria-labelledby="contact-heading" className="py-9 sm:py-12">
          <div className="mb-5">
            <p className="eyebrow mb-2 text-teal">Next step</p>
            <h2 id="contact-heading" className="font-display text-3xl tracking-tight sm:text-4xl">
              Keep in touch<span className="text-accent">.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {contactLinks.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="group flex min-h-14 items-center justify-between rounded-sm border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-teal hover:text-teal"
              >
                {label}
                <Icon aria-hidden className="h-4 w-4" />
              </a>
            ))}
            <a
              href="https://madebydanielleb.com"
              className="group flex min-h-14 items-center justify-between rounded-sm border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-teal hover:text-teal"
            >
              Portfolio
              <Sparkles aria-hidden className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={saveContact}
              className="group flex min-h-14 items-center justify-between rounded-sm border border-foreground bg-foreground px-4 py-3 text-left text-sm font-medium text-background transition-colors hover:border-teal hover:bg-teal"
            >
              Save Contact
              <Download aria-hidden className="h-4 w-4" />
            </button>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
          <span className="eyebrow">Made by Danielle B.</span>
          <span className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
            madebydanielleb.com/connect
          </span>
        </footer>
      </div>
    </main>
  );
}

function ProfilePhoto({ className }: { className: string }) {
  return (
    <div className={`${className} relative shrink-0 overflow-hidden rounded-sm border border-border bg-muted`}>
      {/* Replace this src when the final /connect portrait is selected. */}
      <img
        src="/home/portrait.svg"
        alt="Danielle Bosworth"
        className="h-full w-full object-cover object-top grayscale"
      />
      <span className="absolute bottom-2 right-2 rounded-sm bg-background/90 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
        Photo placeholder
      </span>
    </div>
  );
}

function Proof({ value, label, wide = false }: { value: string; label: string; wide?: boolean }) {
  return (
    <div className={`${wide ? "col-span-2 sm:col-span-1" : ""} border-t border-border pt-3`}>
      <p className={`font-display leading-tight tracking-tight text-teal ${wide ? "text-2xl" : "text-4xl"}`}>
        {value}
      </p>
      <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-muted-foreground sm:text-sm">{label}</p>
    </div>
  );
}
