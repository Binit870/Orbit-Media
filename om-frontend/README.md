# Orbit Media — Website

A React + Vite site for Orbit Media: black/white base with an orange
(primary) + violet (secondary) accent system, Playfair Display + Inter
typography, and a light/dark toggle. Routes below `/` are code-split
(`React.lazy`) so the landing page ships a small first-load bundle.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

## Pages

- `/` — Home (hero, trusted-by marquee, stats, What We Do, process, testimonials, FAQ)
- `/services/:slug` — one dynamic template for all 4 services (`podcasting`,
  `launch-videos`, `founder-brands`, `ai-ugc-commercials`)
- `/case-studies` — placeholder frame, ready for real client results
- `/contact` — contact form (front-end only) + Book a Call card

## Theme system

Colors and fonts live in `src/styles/theme.css` as CSS variables under
`[data-theme="dark"]` / `[data-theme="light"]`. The toggle button
(`src/components/ui/ThemeToggle.jsx`) flips `data-theme` on `<html>` and
persists the choice to `localStorage` via `src/context/ThemeContext.jsx`.

Every component reads color through the variables below — never a hardcoded
hex — so the whole site re-themes from this one file:

| Token | Role |
| --- | --- |
| `--bg` / `--bg-soft` / `--bg-elevated` | black → white surfaces (theme-dependent) |
| `--text` / `--text-body` / `--text-muted` / `--text-faint` | type hierarchy |
| `--accent`, `--accent-strong`, `--accent-soft` | primary orange (buttons, links, italic type) |
| `--accent-2`, `--accent-2-strong`, `--accent-2-soft` | secondary violet (gradients, ornament glow) |
| `--btn-accent` / `--btn-accent-hover` / `--btn-text` | fixed brand button colors (same in both themes) |

`.om-heading-gradient` melts orange into violet across text (`background-clip`)
for the one or two spots per page that need extra weight — used on the hero's
second line. Don't overuse it; it's a signature, not a default heading style.

The hero's ambient animation (`src/components/ui/HeroOrnament.jsx`) reuses the
same broken-arc shape as `OrbitIcon`/the favicon, scaled up into three rings
that drift at different speeds behind a slow-breathing orange→violet glow —
pure CSS `@keyframes`, no per-frame JS, and it turns off under
`prefers-reduced-motion`.

## What's still a placeholder

A few things were intentionally left as polished placeholders since the
source files weren't available yet:

- **Trusted-by logos & service videos** — the Drive folder linked in the
  brief wasn't shared with anything this build could reach, so every video
  slot uses `src/components/ui/VideoCard.jsx` (a styled placeholder, not a
  broken embed). Swap in real `<iframe>`/`<video>` embeds once footage is
  ready. The trusted-by marquee (`src/data/trustedBy.js`) currently reuses
  the handles from the old site.
- **Case studies** — `/case-studies` is the frame only, per the brief.
- **Testimonials** — placeholder quote cards in `src/data/testimonials.js`.
- **Contact form** — `src/pages/Contact.jsx` is front-end only right now;
  wire `handleSubmit` to an email service (Formspree, Resend, etc.) or your
  CRM before launch.
- **Book a Call** — every button currently points at `/contact` or `#`;
  swap in your real scheduling link (Calendly, Cal.com, etc.) — it's a
  single prop change in `src/components/ui/Button.jsx` / `Contact.jsx`.

## Content & structure

Service copy, the homepage stats (100M+ views / 1000+ videos / 120+ client
relationships) and FAQ entries are all in `src/data/`, so copy edits don't
require touching component code.
