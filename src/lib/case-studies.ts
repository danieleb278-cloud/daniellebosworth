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
      "A task manager redesigned through usability testing into a calmer, faster daily workflow.",
    client: "Robin (case study)",
    year: "2024",
    role: "UX Designer",
    discipline: "Usability · Interaction Design",
    duration: "8 weeks",
    summary:
      "A heuristic teardown and four rounds of usability testing turned a feature-heavy task app into a focused instrument for daily planning.",
    hero: "A workflow trimmed until only the load-bearing pieces remained.",
    context:
      "Robin had grown by accretion. Power users tolerated it; new users bounced within a session. Most friction lived in the gap between capture and triage.",
    challenge:
      "Redesign the daily flow so a new user could capture, prioritize, and finish a day's plan in under three minutes — without removing what loyalists relied on.",
    approach: [
      {
        title: "Heuristic audit",
        body: "Catalogued forty-one friction points and grouped them by the user state in which they hurt most.",
      },
      {
        title: "Usability rounds",
        body: "Four rounds of moderated tests, five participants each, with the next prototype shipped within a week.",
      },
      {
        title: "Two-mode interface",
        body: "A Today surface for momentum, a System surface for power. Each mode hides the other's complexity by default.",
      },
    ],
    outcomes: [
      { metric: "−54%", label: "Time to first completed task" },
      { metric: "+38%", label: "Day-7 active retention" },
      { metric: "4.7 / 5", label: "SUS score, final round" },
    ],
    reflections:
      "Loyal users don't want fewer features. They want the right feature to be louder than the rest.",
    tags: ["Usability", "Interaction", "Productivity"],
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
