## Goal

Make the Contact section actually contactable: clickable email + LinkedIn links, plus a working contact form.

## Changes (all in `src/routes/index.tsx`, Contact section only)

### 1. Make existing links behave like real links
- Email: already `mailto:Danieleb278@gmail.com` — keep, just confirm it triggers the mail client on click (it does, no change needed beyond making sure nothing blocks it).
- LinkedIn: already points to `https://linkedin.com/in/daniellelbosworth` but needs `target="_blank"` and `rel="noopener noreferrer"` so it opens your real LinkedIn profile in a new tab.

### 2. Add a "Send a message" form
Going with the **simple mailto approach** — zero setup, no backend, no API keys, no DNS. The form lives on the page; when the visitor hits Send, it opens their email client with a prefilled message addressed to Danieleb278@gmail.com.

Fields:
- Name (required)
- Email (required)
- Phone (optional)
- Message (required)

Behavior:
- Client-side validation (required fields, valid email format, length limits via zod).
- On submit, build a `mailto:Danieleb278@gmail.com?subject=...&body=...` URL with the form values URL-encoded and open it.
- Show a small "Opening your email app…" confirmation under the button.

### 3. Layout
Place the form in a new right-hand column of the Contact grid, with Email / LinkedIn / Based-in stacked on the left. On mobile the form sits below the contact info. Styling matches the existing design tokens (teal accent, charcoal border, eyebrow labels, font-display headings) — no new colors or fonts.

### Why mailto over a backend form
You asked for "whatever works easiest." Mailto needs nothing turned on, no domain verification, no third-party account — submissions land in your inbox the same way as someone clicking your email link, but with all their info already filled in. If you later want a real form-to-inbox pipeline (so visitors without a mail client can still reach you), we can swap in Lovable Emails or a Google Form embed — say the word and I'll upgrade it.

## Technical notes
- Add `zod` schema for validation (already installed).
- Use existing `eyebrow` / `font-display` / `border-teal` utility classes for consistent styling.
- No new files, no new dependencies, no routing changes.