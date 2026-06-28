# StreakCard

Turn any habit streak into a clean, shareable **"Day N"** card. Free, instant, fully
client-side — and it exports a **transparent-background PNG** you can overlay on a Reel
or TikTok.

> Product #1 of the validation-sprint batch (see `spec.md`). The goal is one live URL
> making one real ask (email), wired to analytics. Nothing more.

## What it does

- Type a habit + day count (or set a start date and it counts the days for you).
- Pick one of 3 templates: **Bold**, **Minimal**, **Aesthetic**.
- Live preview, then **Download PNG** at a crisp 1080×1080.
- Toggle **Transparent background** for overlay use.
- The one ask: email capture for "Pro" (custom colors, multi-streak, HD exports).

## Stack

- Next.js (App Router) + TypeScript + Tailwind v4 — fully static, no backend.
- PNG export: [`html-to-image`](https://github.com/bubkoo/html-to-image), client-side.
- Email: Formspree (`NEXT_PUBLIC_FORMSPREE_ID`, defaults to the live form).
- Analytics: Vercel Analytics — events `email_signup` (the ask) and `card_download`.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # unit tests (streak math)
pnpm build        # production build
```

## Configuration

`NEXT_PUBLIC_FORMSPREE_ID` — the Formspree form that collects waitlist emails.
Set it in `.env.local` (and in Vercel project env). Falls back to the live form id.

## Deploy

Deployed on Vercel. `vercel deploy --prod`.
