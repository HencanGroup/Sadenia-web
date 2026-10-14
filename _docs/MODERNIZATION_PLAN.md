# Website Modernization Plan

**Date:** October 14, 2026
**Scope:** Visual and UX refresh of the Sadenia Systems site (Next.js 16, Tailwind v4, shadcn/ui, motion). Content and page structure stay as they are; this plan changes how they look and feel.

---

## Why it looks dated

1. **Small, sharp corners everywhere.** `--radius: 0.35rem` combined with `border-l-2 border-l-steel` accent stripes (ServiceCard, About mission) reads like a 2016–2018 corporate template.
2. **Every section uses the same layout.** Uppercase tracked kicker → centered H2 → 3-column grid of identical icon cards, on alternating white / `dot-pattern` surface backgrounds. Nothing changes the rhythm, so the page reads as one long template.
3. **One gradient everywhere.** The navy→steel gradient with `grid-pattern` overlay is used on the hero, every PageHero, the CTA banner, the Stats band and every project card placeholder.
4. **Typography.** Poppins headings + Inter body at modest sizes (`text-3xl/4xl` H2s). The type is too small and too "default" to carry the design.
5. **No imagery.** Project cards are a gradient with a `Layers` icon; Solutions, Technology and Hardware are text-only. Modern B2B tech sites lean on product UI shots, diagrams and photography.
6. **Heavy hover lift.** `card-lift` moves cards up 6px with a large navy shadow; current practice is subtler (border/glow change, 1–2px).
7. **Inner pages repeat themselves.** Every page opens with the same PageHero; Solutions repeats its hero title/subtitle in a SectionHeading directly below; SystemCards are long text stacks.
8. **Chrome.** 7 nav links + CTA in a full-width bar; footer puts the logo in a white box on navy.

Small bugs found along the way:
- `SolutionsView.tsx` hardcodes English labels ("The challenge", "Our purpose", "Key capabilities", "Sectors"), so they don't translate on `/fr`.
- `.dark` theme is the stock shadcn palette, not the brand, and isn't used anywhere.
- Hero video uses `preload="auto"` with no `poster`, so first paint is an empty gradient.

---

## Direction

A clean, confident "modern infrastructure company" look (think Vercel / Linear / Stripe for structure, not copying their style):

- Mostly-white / near-white surfaces with **navy as an accent, not a background**. Dark sections used sparingly (hero, one feature band, footer).
- **Bigger, tighter type**: display headings at 48–72px with negative tracking.
- **Larger radii** (12–16px cards, full-pill buttons), hairline borders, soft layered shadows.
- **Varied layouts**: bento grids, split text/visual sections, sticky side-nav, horizontal timeline.
- **Real visuals**: product screenshots, device mockups, or at least branded abstract illustrations per system.
- Motion kept, but quieter: fade-ups only on section entry, no movement on every card.

---

## Phase 0 — Design foundations

Files: `app/globals.css`, `app/layout.tsx`, `components/ui/*`

- [ ] **Tokens**: raise `--radius` to `0.75rem`; add a neutral grey scale; keep navy/steel/sky as brand accents; rework `--shadow-card`/`--shadow-lift` into subtle layered shadows; add a soft glow token for highlighted cards.
- [ ] **Type**: replace Poppins with a modern grotesk for headings (recommend **Geist** or **Manrope**; Inter Tight is a safe alternative), keep Inter for body. Define a scale (display / h1 / h2 / h3 / lead / body / small) as utilities.
- [ ] **Shared primitives** so the look is consistent and easy to change later:
  - `Button` variants via `cva` (primary pill, secondary, ghost, on-dark) — replaces the ~10 hand-styled `<Link className="rounded-md bg-…">` buttons.
  - `Container` and `Section` (consistent max-width, padding, vertical spacing, `tone="default|muted|dark"`).
  - `Eyebrow` (small pill badge instead of the uppercase tracked kicker).
  - Update `SectionHeading` to support left-aligned + larger sizes.
- [ ] **Retire** `grid-pattern` / `dot-pattern` as defaults; keep one subtle background treatment (radial glow or fine noise) for the hero and CTA only.
- [ ] Replace `card-lift` with a subtle hover (border colour + small shadow, no 6px jump).

## Phase 1 — Global chrome

Files: `components/layout/Navbar.tsx`, `Footer.tsx`, `LanguageSwitcher.tsx`, `ScrollUtils.tsx`

- [ ] **Navbar**: floating, centered pill bar with blurred background that shrinks on scroll; group links (e.g. "Solutions" dropdown containing Solutions / Technology / Hardware) to cut 7 items to ~5; pill CTA.
- [ ] **Mobile menu**: full-height animated sheet (shadcn `Sheet` already available) instead of the inline dropdown.
- [ ] **Footer**: large closing CTA block on top, then a clean link grid; use a white/mono logo variant on navy instead of the white box; add a subtle divider and compact bottom bar.

## Phase 2 — Homepage

Files: `components/sections/*`, `components/pages/HomeView.tsx`

- [ ] **Hero**: larger left-aligned headline (one highlighted phrase with `gradient-text`), short lead, two pill buttons, and a small trust row (years active, project count, sectors served) — this absorbs the current 2-item Stats band, which looks sparse on its own. Keep the video, add a `poster` frame and `preload="metadata"`.
- [ ] **Solutions → bento grid**: replace 6 identical cards with a bento layout (1–2 large tiles with a visual, the rest compact) linking to each system.
- [ ] **Why Us → split section**: statement on the left, 3 numbered points on the right (no centred icon circles).
- [ ] **Featured projects**: cards with real cover images (or branded illustrations), category pill overlaid on the image, cleaner carousel controls.
- [ ] **Roadmap preview**: horizontal connected timeline (steps on a line) instead of 4 boxed cards.
- [ ] **CTA banner**: contained rounded panel with soft glow, not full-bleed gradient.

## Phase 3 — Inner pages

Files: `components/layout/PageHero.tsx`, `components/pages/*`, `app/[locale]/about/page.tsx`

- [ ] **PageHero**: lighter variant (white/near-white with glow, breadcrumb, larger title) so inner pages don't all look like the homepage hero; keep the dark variant as an option.
- [ ] **Solutions**: remove the duplicate heading; sticky left nav listing systems, each system as an alternating text/visual section (problem → purpose → capabilities as a check grid → sector chips → CTA). Move the hardcoded labels into `messages/en.json` / `fr.json`.
- [ ] **Technology / Hardware**: split layouts with diagrams or icon grids; the Hardware phases become a stepped timeline matching the roadmap style.
- [ ] **Projects**: segmented-control filter, image-led cards, optional case-study detail drawer.
- [ ] **Roadmap**: vertical timeline with status chips (done / in progress / planned).
- [ ] **About**: mission as a big pull-quote, values as a bento, timeline restyled, team cards with photos (or initials avatars until photos exist).
- [ ] **Contact**: two-column layout — form in a card on one side, contact methods as tappable cards on the other; modern input styling (larger, rounded, clear focus ring).

## Phase 4 — Polish & quality

- [ ] Motion pass: one entrance animation per section, stagger only within grids, respect reduced motion (already handled globally).
- [ ] Accessibility: contrast check on new palette, visible focus states, `aria-expanded` on the mobile menu button.
- [ ] Performance: compress/serve hero video as WebM + MP4 with poster, use `next/image` for logo and new imagery, check Lighthouse on mobile.
- [ ] Optional: brand-correct dark mode (rewrite `.dark` tokens) with a toggle.
- [ ] QA both locales (`/en`, `/fr`) — French strings run longer, check buttons and nav.

---

## Assets needed from the team

- Product screenshots or photos for each system (OS, Android, Microfinance, RCS, IHMS) and for featured projects.
- White / monochrome logo variant (SVG preferred).
- Team photos (About page), if the team section stays.
- Confirmation of heading font choice.

## Rollout

The repo is connected to Lovable and `main` syncs to it, so work on a branch (e.g. `redesign`) and merge phase by phase, keeping each merge in a working state. Suggested order: Phase 0 + 1 together (they change every page at once), then Phase 2, then Phase 3 page by page, then Phase 4.
