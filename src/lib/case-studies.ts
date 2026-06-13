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
    slug: "northbound",
    index: "01",
    title: "Northbound",
    subtitle: "Repositioning a logistics platform from operator tool to revenue engine.",
    client: "Northbound Freight Co.",
    year: "2025",
    role: "Lead Product Strategist",
    discipline: "Product Strategy · UX",
    duration: "14 weeks",
    summary:
      "A category redefinition that moved a back-office dispatch tool into the procurement conversation, lifting qualified pipeline by 3.4×.",
    hero: "A weathered shipping manifest, reset as a living interface.",
    context:
      "Northbound had spent six years building best-in-class dispatch software for mid-market carriers, but every renewal felt like a fight. The product was beloved by operators and invisible to the executives who signed the checks.",
    challenge:
      "Reframe the product so buyers understood it as a revenue system — without alienating the operator base that made the brand credible in the first place.",
    approach: [
      {
        title: "Buyer research, 22 interviews",
        body: "Mapped procurement triggers across three carrier segments and identified the language CFOs used when describing operational drag.",
      },
      {
        title: "Narrative system",
        body: "Built a three-tier messaging architecture: operator promise, financial proof, executive vision — wired into the site, sales deck, and onboarding.",
      },
      {
        title: "Surface redesign",
        body: "Rebuilt the dashboard hierarchy around margin visibility, with operator workflows preserved underneath as a secondary mode.",
      },
    ],
    outcomes: [
      { metric: "3.4×", label: "Qualified pipeline, Q1 to Q3" },
      { metric: "+22 pts", label: "Net Revenue Retention" },
      { metric: "−38%", label: "Average sales cycle" },
    ],
    reflections:
      "The hard work wasn't the redesign — it was earning permission internally to retire language the team had been proud of for years.",
    tags: ["Repositioning", "B2B SaaS", "Pricing"],
  },
  {
    slug: "ember-health",
    index: "02",
    title: "Ember Health",
    subtitle: "Designing a first-run experience that turned a clinical tool into a daily ritual.",
    client: "Ember Health (Series B)",
    year: "2024",
    role: "UX & Product Lead",
    discipline: "UX · Activation",
    duration: "9 weeks",
    summary:
      "A patient onboarding redesign that doubled week-one adherence and gave the care team a calmer instrument to work with.",
    hero: "A morning routine reimagined as a quiet sequence of small commitments.",
    context:
      "Ember shipped a remote care app that worked beautifully — for the 31% of patients who made it past day three. Everyone else churned silently before their first clinician check-in.",
    challenge:
      "Replace a 14-step medical intake with an experience that earned trust quickly, set expectations honestly, and made the first week feel survivable.",
    approach: [
      {
        title: "Diary studies",
        body: "Twelve patients logged their first ten days. Patterns emerged around evenings, medication friction, and the silence between appointments.",
      },
      {
        title: "Ritual design",
        body: "Replaced the intake form with a five-day onboarding arc, each day shipping a single small win and a tactile recap.",
      },
      {
        title: "Clinician dashboard",
        body: "Surfaced the same signal to the care team — patients and clinicians now read the same week.",
      },
    ],
    outcomes: [
      { metric: "2.1×", label: "Week-one adherence" },
      { metric: "+46%", label: "30-day retention" },
      { metric: "4.8 / 5", label: "Patient NPS, first cohort" },
    ],
    reflections:
      "Healthcare onboarding rewards restraint. Every feature we left out of week one was a feature patients didn't have to defend to themselves at 10pm.",
    tags: ["Onboarding", "Healthcare", "Behavioral Design"],
  },
  {
    slug: "field-notes",
    index: "03",
    title: "Field Notes",
    subtitle: "A go-to-market system for a developer tool with strong product and a quiet launch.",
    client: "Field Notes (seed-stage)",
    year: "2024",
    role: "Fractional Head of Marketing",
    discipline: "Marketing · GTM",
    duration: "6 months",
    summary:
      "A content engine, pricing reset, and community motion that turned a 400-star side project into a profitable team subscription.",
    hero: "A field journal of decisions, shipped weekly to the people who needed them.",
    context:
      "Field Notes had real product affection and almost no commercial gravity. The founders were tired of writing announcement posts that didn't move anything.",
    challenge:
      "Build a marketing system that two technical founders could sustain without hiring — and that earned attention from buyers, not just builders.",
    approach: [
      {
        title: "Editorial cadence",
        body: "A weekly engineering essay with a recurring shape: one decision, one tradeoff, one artifact. Indexed, evergreen, and easy to write.",
      },
      {
        title: "Pricing rebuild",
        body: "Collapsed five tiers into two, anchored on team seats, and stopped apologizing for the paid plan in the docs.",
      },
      {
        title: "Quiet community",
        body: "Replaced the Discord with a moderated monthly roundtable. Higher signal, lower maintenance, better customers.",
      },
    ],
    outcomes: [
      { metric: "$32k", label: "MRR within six months" },
      { metric: "11×", label: "Inbound demo requests" },
      { metric: "1.2 hrs", label: "Founder time per week, sustained" },
    ],
    reflections:
      "The best marketing system is the one a tired founder will still run on a Friday. Everything else is theater.",
    tags: ["GTM", "Developer Tools", "Pricing"],
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
