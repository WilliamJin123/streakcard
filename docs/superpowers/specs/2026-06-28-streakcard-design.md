# StreakCard — Design Spec

**Date:** 2026-06-28
**Source:** `spec.md` (Batch Build Spec, Product #1)
**Goal:** Ship the smallest thing that can take a real ask. One live URL, one real ask (email), wired to analytics. No second feature.

## What it is

A shareable "Day N" consistency-streak card generator. User types a habit + day count, picks one of 3 templates, sees a live preview, and downloads a clean PNG — including a **transparent-background** PNG for overlaying on Reels/TikToks. The output is itself shareable (looks postable), driving the owned-audience channel.

## The one real ask

Free to use. Below the export button: *"Want custom colors, multiple streaks, and HD exports? → [email] Get notified when Pro drops."* Captures emails via Formspree.

## Stack

- Next.js (App Router) + TypeScript + Tailwind, **fully client-side**, deployed on Vercel (free `*.vercel.app`).
- PNG export: `html-to-image` (`toPng`), client-side. No backend, no DB, no auth.
- Email: Formspree `POST https://formspree.io/f/mqevbjda` (env `NEXT_PUBLIC_FORMSPREE_ID=mqevbjda`).
- Analytics: Vercel Analytics. Custom events: `email_signup` (primary success metric), `card_download` (engagement).

## Page (single, top → bottom)

1. **Header** — `StreakCard` wordmark + headline *"Show off your streak."* + one line of subtext.
2. **Live card preview** — fixed render size; exports crisp at **1080×1080** via `pixelRatio`. Updates instantly as inputs change.
3. **Controls** — habit name (text), day count (number), optional start date (when set, auto-computes day count from today), template picker (3 thumbnails), **Transparent background** toggle.
4. **Export** — "Download PNG" button.
5. **The ask** — email field → Formspree. Success + error states inline.

## Card design

- Three templates, each with a fixed, polished palette (color/design customization is reserved as the Pro pitch — deliberately NOT in free v1, to stay honest to the spec's prime directive):
  - **Bold & loud** — huge day number, vibrant gradient, high contrast, flame.
  - **Clean & minimal** — whitespace, refined type, single accent, subtle.
  - **Aesthetic gradient** — soft duotone gradient, rounded, calm.
- **Flame is a custom inline SVG**, not the 🔥 emoji (emoji render inconsistently in `html-to-image` and across devices).
- Foreground content: big "Day N", habit name, flame, subtle low-opacity `streakcard.app` watermark in a corner (free distribution when reshared).
- **Transparent mode:** toggling it strips the card's background fill so the export has real alpha transparency; foreground text gets drop-shadows so it stays legible overlaid on video.

## Key modules

- `lib/templates.ts` — template definitions (id, label, palette, style tokens).
- `lib/streak.ts` — `daysSince(startDate)` day-count computation (testable, pure).
- `lib/export.ts` — `exportCardPng(node, { transparent })` using `html-to-image`; awaits `document.fonts.ready`; sets `pixelRatio` to hit 1080; `backgroundColor` undefined when transparent.
- `components/StreakCard.tsx` — the rendered card (props: habit, day, templateId, transparent).
- `components/Controls.tsx`, `components/TemplatePicker.tsx`, `components/EmailCapture.tsx`, `components/ExportButton.tsx`.
- `app/page.tsx` — composes the above, holds state.

## Testing

- Unit-test pure logic: `daysSince` (today vs start, same-day = Day 1, future date guarded).
- Manual/visual verification: live preview updates, PNG downloads, transparent PNG has real alpha, looks postable.

## Explicitly NOT building (per spec)

Auth, accounts, DB for app data, dashboards, settings, multi-page nav, dark-mode toggle, color picker, multi-streak, size selector, a second feature. Color customization, multi-streak, and HD are the *Pro* pitch, not v1.

## Definition of done

- [ ] Deployed to a live `*.vercel.app` URL.
- [ ] PNG export works; transparent-background export produces real alpha.
- [ ] Email-capture ask live (Formspree) with success/error states.
- [ ] Vercel Analytics wired with `email_signup` event.
- [ ] Output card looks good enough to post.
