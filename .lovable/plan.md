## New Case Study: Content Strategy & Multi-Channel Content Development

Add a 4th project alongside Next Destination, Joomla, and Robin that showcases content creation, graphic design, and marketing skills.

### 1. Data — `src/lib/case-studies.ts`

Append a new entry with:

- **slug**: `content-strategy` (or your preference)
- **index**: `04`
- **title / subtitle**: e.g. "Content Strategy" / "Multi-channel content development from a single source."
- **hero pull quote**: a short line about turning one idea into many assets across formats and platforms (open to your wording).
- **snapshot**: exactly the fields you pasted — Project Type, Duration (2025–Present), Team Size (Individual Project), My Role, Methods Used, Tools Used (Canva, CapCut, Adobe Express, ChatGPT, Google Workspace, Social Media Platforms, Analytics & Performance Reporting Tools), Deliverables, Outcome.
- **sections** (accordion, replacing the default Research/Insights structure):
  1. `01 — Challenge`
  2. `02 — Content Strategy`
  3. `03 — Asset Development`
  4. `04 — Content Repurposing`
  5. `05 — Reflection`

Each section gets paragraph + bullet blocks. I'll write placeholder copy aligned with your snapshot wording, ready for you to refine or replace. Image blocks left as placeholders until you send assets.

### 2. Homepage card — `src/routes/index.tsx`

Add a 4th entry to the Selected Work list so it appears in the index alongside the other three, linking to `/work/content-strategy`.

### 3. Next-case loop

Already cycles through `caseStudies` automatically — the new entry will slot into the rotation with no extra work.

### What I need from you next (after the scaffold lands)

- Final title + subtitle wording if you don't like my draft
- The pull-quote line
- Any images / graphic samples to drop into Asset Development and Content Repurposing sections
- Whether you want a real outcome metric block (like Robin's) or skip it for this one
