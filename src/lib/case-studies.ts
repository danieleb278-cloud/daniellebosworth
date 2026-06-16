export type Block =
  | { kind: "p"; text: string }
  | { kind: "list"; heading?: string; items: string[] }
  | { kind: "group"; heading: string; blocks: Block[] };

export type Section = {
  id: string;
  number: string;
  title: string;
  blocks: Block[];
};

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
  /** Optional long-form 12-section case study. When present, the work page
   *  renders these as a collapsible accordion instead of the short layout. */
  sections?: Section[];
};

const nextDestinationSections: Section[] = [
  {
    id: "overview",
    number: "01",
    title: "Project Overview",
    blocks: [
      {
        kind: "p",
        text: "Next Destination is a travel planning platform designed to simplify the vacation planning process by combining trip discovery, budgeting, itinerary creation, group coordination, and personalized recommendations into a single experience.",
      },
      {
        kind: "p",
        text: "The project was created to address the fragmented nature of travel planning, where users often rely on multiple websites and apps to research destinations, compare prices, coordinate with travel companions, and organize activities. The goal was to create an all-in-one solution that reduces planning stress while helping travelers discover experiences that align with their interests, budget, and travel style.",
      },
    ],
  },
  {
    id: "role",
    number: "02",
    title: "My Role & Responsibilities",
    blocks: [
      {
        kind: "p",
        text: "As part of a cross-functional product development team, I contributed to:",
      },
      {
        kind: "list",
        items: [
          "Opportunity identification",
          "User research",
          "Survey creation and analysis",
          "Customer needs analysis",
          "Affinity diagramming",
          "Competitive analysis",
          "Concept generation",
          "Feature prioritization",
          "Product strategy",
          "User experience planning",
          "Documentation and reporting",
        ],
      },
    ],
  },
  {
    id: "goals",
    number: "03",
    title: "Project Goals",
    blocks: [
      {
        kind: "list",
        heading: "Business Goals",
        items: [
          "Create a differentiated travel platform",
          "Support local businesses",
          "Promote sustainable travel options",
          "Increase convenience through an integrated experience",
        ],
      },
      {
        kind: "list",
        heading: "User Goals",
        items: [
          "Save time planning trips",
          "Stay within budget",
          "Coordinate travel with groups",
          "Discover personalized recommendations",
          "Access all travel information in one place",
        ],
      },
    ],
  },
  {
    id: "research",
    number: "04",
    title: "Research & Discovery",
    blocks: [
      {
        kind: "p",
        text: "Research included surveys, customer interviews, competitive analysis, affinity mapping, and customer needs analysis.",
      },
      {
        kind: "list",
        heading: "Research Methods",
        items: [
          "User surveys",
          "Customer interviews",
          "Competitive analysis",
          "Gap analysis",
          "Affinity mapping",
          "Opportunity assessment",
        ],
      },
      {
        kind: "list",
        heading: "Key Findings — five major needs emerged",
        items: [
          "Users want a centralized travel planning platform.",
          "Budget management and price comparison are critical.",
          "Group coordination is a major challenge.",
          "Personalized recommendations improve confidence and decision making.",
          "Travelers want to reduce planning time and complexity.",
        ],
      },
    ],
  },
  {
    id: "problem",
    number: "05",
    title: "Problem Statement",
    blocks: [
      {
        kind: "p",
        text: "Travel planning is often fragmented across multiple tools, making it difficult for users to compare options, manage budgets, coordinate with groups, and build personalized itineraries.",
      },
      {
        kind: "p",
        text: "Users need a simpler way to organize every stage of trip planning in one place while still maintaining control over their travel decisions.",
      },
    ],
  },
  {
    id: "personas",
    number: "06",
    title: "Personas & User Insights",
    blocks: [
      { kind: "p", text: "Research revealed several recurring traveler types:" },
      {
        kind: "list",
        heading: "Budget-Conscious Travelers",
        items: ["Need affordable accommodations, transportation, and activities."],
      },
      {
        kind: "list",
        heading: "Group Travelers",
        items: ["Need collaboration tools and easier coordination."],
      },
      {
        kind: "list",
        heading: "Independent Planners",
        items: ["Want control over planning while reducing research time."],
      },
      {
        kind: "list",
        heading: "Experience Seekers",
        items: ["Want local recommendations and unique activities."],
      },
      {
        kind: "list",
        heading: "Eco-Conscious Travelers",
        items: ["Prefer sustainable travel options when available."],
      },
    ],
  },
  {
    id: "ia",
    number: "07",
    title: "Information Architecture & Feature Planning",
    blocks: [
      {
        kind: "p",
        text: "The platform was organized around five core feature categories:",
      },
      {
        kind: "list",
        heading: "Budgeting Tools",
        items: [
          "Vacation savings calculator",
          "Savings planning",
          "Price comparison tools",
        ],
      },
      {
        kind: "list",
        heading: "Personalized Recommendations",
        items: [
          "Tailored destinations",
          "Activity recommendations",
          "Restaurant suggestions",
        ],
      },
      {
        kind: "list",
        heading: "Group Travel Coordination",
        items: [
          "Shared itineraries",
          "Group planning",
          "Collaborative decision making",
        ],
      },
      {
        kind: "list",
        heading: "Sustainable Travel",
        items: [
          "Eco-friendly accommodations",
          "Sustainable transportation options",
        ],
      },
      {
        kind: "list",
        heading: "Itinerary Planning",
        items: ["Custom itineraries", "Scheduling tools", "Travel reminders"],
      },
      {
        kind: "p",
        text: "These categories were developed from customer research and feature prioritization exercises.",
      },
    ],
  },
  {
    id: "design",
    number: "08",
    title: "Design Process",
    blocks: [
      {
        kind: "group",
        heading: "Opportunity Identification",
        blocks: [
          {
            kind: "p",
            text: "The team evaluated multiple product concepts before selecting travel planning as the strongest opportunity.",
          },
        ],
      },
      {
        kind: "group",
        heading: "Competitive Analysis",
        blocks: [
          { kind: "p", text: "Competitors reviewed included:" },
          {
            kind: "list",
            items: [
              "Airbnb",
              "TripAdvisor",
              "Google Travel",
              "Booking.com",
              "Expedia",
            ],
          },
          {
            kind: "p",
            text: "The analysis revealed opportunities around personalization, budgeting, sustainability, and group travel features.",
          },
        ],
      },
      {
        kind: "group",
        heading: "Concept Development",
        blocks: [
          { kind: "p", text: "Several concepts were explored and evaluated through:" },
          {
            kind: "list",
            items: [
              "Feature matrices",
              "Concept scoring",
              "Feasibility analysis",
              "User value assessments",
            ],
          },
          {
            kind: "list",
            heading: "The strongest concepts included",
            items: [
              "Personalized itineraries",
              "Group planning tools",
              "Budget management features",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "solution",
    number: "09",
    title: "Final Solution",
    blocks: [
      {
        kind: "p",
        text: "Next Destination combines travel planning, budgeting, personalization, and collaboration into a unified platform.",
      },
      {
        kind: "p",
        text: "The experience begins with a short onboarding questionnaire that captures travel preferences, budget constraints, interests, and group information. The system then generates customized recommendations, accommodations, activities, and itineraries tailored to each traveler.",
      },
      {
        kind: "p",
        text: "The platform also supports collaborative planning, allowing multiple users to contribute to a shared trip while maintaining individual preferences.",
      },
    ],
  },
  {
    id: "features",
    number: "10",
    title: "Key Features",
    blocks: [
      {
        kind: "list",
        heading: "Personalized Itineraries",
        items: ["AI-assisted recommendations based on preferences and travel goals."],
      },
      {
        kind: "list",
        heading: "Group Planning Tools",
        items: ["Shared itineraries, voting, collaboration, and communication features."],
      },
      {
        kind: "list",
        heading: "Budget Management",
        items: ["Savings goals, price comparisons, and cost tracking."],
      },
      {
        kind: "list",
        heading: "Local Experience Discovery",
        items: ["Recommendations focused on authentic local businesses and attractions."],
      },
      {
        kind: "list",
        heading: "Sustainable Travel Filters",
        items: ["Eco-friendly accommodations and transportation options."],
      },
      {
        kind: "list",
        heading: "Real-Time Updates",
        items: ["Travel alerts, itinerary adjustments, and planning assistance."],
      },
    ],
  },
  {
    id: "outcomes",
    number: "11",
    title: "Outcomes & Impact",
    blocks: [
      {
        kind: "p",
        text: "Next Destination addresses several key travel planning challenges:",
      },
      {
        kind: "list",
        items: [
          "Reduces planning complexity",
          "Improves coordination among travelers",
          "Supports informed decision making",
          "Encourages exploration of local businesses",
          "Makes travel planning more personalized and accessible",
        ],
      },
      {
        kind: "p",
        text: "The concept differentiates itself from existing travel platforms through its combination of budgeting, personalization, sustainability, and collaboration features.",
      },
    ],
  },
  {
    id: "reflection",
    number: "12",
    title: "Reflection & Lessons Learned",
    blocks: [
      {
        kind: "p",
        text: "This project reinforced the importance of designing from research rather than assumptions. User feedback revealed that group coordination and planning complexity were often larger pain points than destination discovery itself.",
      },
      {
        kind: "p",
        text: "One of the most valuable lessons was learning how to balance business goals with user needs while evaluating technical feasibility. The project also demonstrated how personalization, collaboration, and thoughtful feature prioritization can transform a fragmented experience into a cohesive product ecosystem.",
      },
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "next-destination",
    index: "01",
    title: "Next Destination",
    subtitle:
      "An all-in-one travel planning platform that combines discovery, budgeting, group coordination, and personalized recommendations.",
    client: "Cross-functional product team (academic)",
    year: "2025",
    role: "UX Researcher & Product Strategy",
    discipline: "UX Research · Product Strategy",
    duration: "Semester project",
    summary:
      "A travel platform concept built from surveys, interviews, and competitive analysis to address the fragmented nature of modern trip planning.",
    hero: "Travel planning is fragmented. Next Destination puts discovery, budget, group, and itinerary into one place.",
    context:
      "Most travelers juggle five-plus tools to plan a single trip. Research surfaced five recurring needs: centralization, budgeting, group coordination, personalization, and lower planning effort.",
    challenge:
      "Design an all-in-one travel platform that reduces planning complexity without sacrificing personal control over decisions.",
    approach: [
      {
        title: "Research & discovery",
        body: "Surveys, interviews, gap analysis, affinity mapping, and competitive review across Airbnb, TripAdvisor, Google Travel, Booking.com, and Expedia.",
      },
      {
        title: "Feature prioritization",
        body: "Organized the platform around five categories: budgeting, personalization, group coordination, sustainability, and itinerary planning.",
      },
      {
        title: "Concept synthesis",
        body: "Evaluated concepts through feature matrices, scoring, feasibility, and user value — landing on personalized itineraries, group planning, and budget tools as the load-bearing pillars.",
      },
    ],
    outcomes: [
      { metric: "5", label: "Core feature categories defined" },
      { metric: "5", label: "Recurring traveler personas identified" },
      { metric: "1", label: "Unified planning experience" },
    ],
    reflections:
      "Design from research, not assumptions. Group coordination turned out to be a bigger pain point than destination discovery itself.",
    tags: ["UX Research", "Product Strategy", "Travel"],
    sections: nextDestinationSections,
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
