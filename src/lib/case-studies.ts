export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  role: string;
  discipline: string;
  duration: string;
  summary: string;
  hero: string;
  context: string;
  challenge: string;
  approach: { title: string; body: string }[];
  outcomes: { metric: string; label: string }[];
  reflections: string;
  tags: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "next-destination",
    index: "01",
    title: "Next Destination",
    subtitle:
      "A travel planning platform that translates personal preference into a short, confident itinerary.",
    client: "Next Destination (concept)",
    year: "2025",
    role: "Product Designer & Researcher",
    discipline: "UX Research · Product Design",
    duration: "10 weeks",
    summary:
      "A decision-fatigue study turned into a planning tool that proposes three trips, not three hundred — built around how travelers actually narrow down.",
    hero: "A planning surface that behaves like a thoughtful friend, not a search engine.",
    context:
      "Travel planning tools optimize for breadth. Travelers optimize for relief. Interviews surfaced a pattern: people open ten tabs, freeze, and ask a friend anyway.",
    challenge:
      "Design a planning experience that reduces decision load without flattening preference — and earns trust on the first session.",
    approach: [
      {
        title: "Behavioral interviews",
        body: "Twelve travelers walked through a recent trip from spark to booking. We mapped where momentum died and what restarted it.",
      },
      {
        title: "Preference primitives",
        body: "Distilled inputs to five honest sliders — pace, social density, novelty, budget shape, and weather tolerance.",
      },
      {
        title: "Three-itinerary frame",
        body: "Every search returns three full itineraries with their tradeoffs named out loud. No infinite scroll, no hidden ranking.",
      },
    ],
    outcomes: [
      { metric: "3.2×", label: "Faster to a saved itinerary" },
      { metric: "−61%", label: "Reported decision fatigue (post-test)" },
      { metric: "9 / 12", label: "Testers booked from their first session" },
    ],
    reflections:
      "Choice architecture is a kindness. The hardest part wasn't the algorithm — it was deciding what to hide.",
    tags: ["UX Research", "Product Design", "Behavioral"],
  },
  {
    slug: "robin",
    index: "02",
    title: "Robin",
    subtitle:
      "An all-in-one job search app — scoped from an RFP into a feature set, IA, and design system built for the realities of looking for work.",
    client: "Robin (RFP response)",
    year: "2024",
    role: "Product Designer (RFP lead)",
    discipline: "Product Strategy · UX · Design System",
    duration: "8 weeks",
    summary:
      "A response to an RFP asking what an all-in-one job search app should be: which features earn a place on the home screen, how the experience should flow, and what the design language should feel like.",
    hero: "One app for the messy middle of a job search — tracking, prepping, and applying in the same place.",
    context:
      "The RFP described candidates juggling four to six tools — a job board, a tracker spreadsheet, a notes app, a calendar, an email folder, and a resume builder. The brief asked for a single product opinionated enough to replace the stack without losing what each tool did well.",
    challenge:
      "Define the feature set, information architecture, and visual direction for an all-in-one job search app — and defend every decision with how a real candidate would use it on a Tuesday night.",
    approach: [
      {
        title: "Feature triage from the RFP",
        body: "Mapped the RFP's wishlist against candidate journeys and cut it to four load-bearing pillars: a unified tracker, tailored applications, interview prep, and a weekly review. Everything else became a setting, not a screen.",
      },
      {
        title: "IA & flows",
        body: "Designed a two-surface IA — a Today board for active applications and a Library for resumes, cover letters, and prep notes. Specified end-to-end flows for saving a role, tailoring a resume, scheduling prep, and logging an interview.",
      },
      {
        title: "Design language",
        body: "Proposed a calm, high-contrast visual system: serif headlines, monospaced metadata, and a single accent reserved for state changes. The point was to make the app feel like an instrument, not another inbox.",
      },
    ],
    outcomes: [
      { metric: "4", label: "Core pillars defined from a 22-item RFP wishlist" },
      { metric: "12", label: "End-to-end flows specified and prototyped" },
      { metric: "1", label: "Design system shipped with the proposal" },
    ],
    reflections:
      "An RFP is a design brief in disguise. The win wasn't adding features — it was naming, out loud, what a job-search app should refuse to do.",
    tags: ["Product Strategy", "RFP", "Design System"],
  },
  {
    slug: "joomla",
    index: "03",
    title: "Joomla Extension Directory",
    subtitle:
      "An information architecture project to make search and discovery legible inside a long-running open-source directory.",
    client: "Joomla (academic engagement)",
    year: "2024",
    role: "IA Lead",
    discipline: "Information Architecture · UX",
    duration: "12 weeks",
    summary:
      "A card sort, tree test, and IA rebuild that made the Extension Directory navigable by intent instead of legacy taxonomy.",
    hero: "Twenty years of contributions, re-shelved for the people arriving today.",
    context:
      "The directory hosts thousands of extensions classified by a taxonomy that made sense to maintainers in 2008. New developers searched by job, not by category.",
    challenge:
      "Rebuild the IA so that intent-based queries succeed on the first try, while preserving the existing URLs the community depends on.",
    approach: [
      {
        title: "Open card sort",
        body: "Forty-three participants grouped a representative sample of extensions. Clusters revealed five recurring intents.",
      },
      {
        title: "Tree test",
        body: "Two competing IA models tested head-to-head; the intent-led model won on success rate and time-to-find across every task.",
      },
      {
        title: "Search refactor",
        body: "Introduced faceted filters wired to the new intents, with legacy categories preserved as a secondary lens.",
      },
    ],
    outcomes: [
      { metric: "+72%", label: "Task success in tree test" },
      { metric: "−44%", label: "Time-to-find, mean" },
      { metric: "0", label: "URLs broken in the migration plan" },
    ],
    reflections:
      "Open-source IA is part design, part diplomacy. The taxonomy carries history — the redesign has to honor it while letting newcomers in.",
    tags: ["Information Architecture", "Open Source", "UX Research"],
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
