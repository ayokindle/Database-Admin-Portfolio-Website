# Ayo Akindele — Portfolio

A portfolio site for a database management & web developer moving toward AWS,
built as React + TypeScript + Tailwind CSS v4, on Vite.

## Structure

```
src/
  app/
    App.tsx              composition root — just assembles the sections
    components/
      Shared.tsx          Reveal (scroll-in animation), Section, Chip
      Nav.tsx
      ThemeToggle.tsx      night/light mode switch
      Hero.tsx            headline + schema cluster strip
      Terminal.tsx        the typed SQL-query animation
      Profile.tsx
      Services.tsx
      Deployments.tsx     project cards (now with cursor-tilt on hover)
      Log.tsx             experience timeline
      Playground.tsx      live SQL-style query tool over a mock dataset
      Connect.tsx         contact form — wired to Formspree, see below
      Footer.tsx
      Stats.tsx           animated count-up stats strip (in the hero)
      useTilt.ts          shared cursor-tilt hover hook
  styles/
    theme.css             design tokens (colors, fonts) as CSS variables,
                           mapped into Tailwind via @theme
    tailwind.css          Tailwind entry point
    fonts.css             Google Fonts import
    index.css             imports the three files above, in order
```

Colors, radii, and fonts all live in `src/styles/theme.css` as CSS custom
properties, then get exposed as Tailwind utilities (`bg-background`,
`text-primary`, `font-display`, etc.) — change a value once there and it
updates everywhere it's used.

## Running it

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Building for production

```bash
npm run build
```

Outputs static files to `dist/` — deployable to S3 + CloudFront, Netlify,
Vercel, or any static host.

## Making the contact form actually send emails

The form in `Connect.tsx` is wired to [Formspree](https://formspree.io) — no
backend needed:

1. Create a free Formspree account and a new form.
2. Copy the form ID it gives you (the part after `/f/` in your form's endpoint).
3. In `src/app/components/Connect.tsx`, replace:
   ```ts
   const FORMSPREE_FORM_ID = "your-form-id";
   ```
   with your real ID.
4. Submissions land in your email and the Formspree dashboard. Free tier is
   50 submissions/month, which is plenty for a portfolio.

**AWS upgrade path**: once you're comfortable with Lambda, API Gateway, and
SES, you can replace the Formspree `fetch` call with a call to your own
API Gateway endpoint backed by a Lambda that sends via SES. That's a solid
first real AWS project — and worth adding as a card in the Deployments
section once it's live.

## The query playground

`Playground.tsx` runs a small hand-written SQL-style parser (`SELECT ... FROM
projects [WHERE ...] [ORDER BY ...]`) against a hardcoded array — no real
database involved, entirely client-side. Edit the `TABLE` array at the top of
that file to reflect your actual projects, and it'll show up in query results
automatically.

## Night mode / light mode

There's a toggle button in the nav (top-right on desktop, inside the mobile
menu on small screens). Both palettes live in `src/styles/theme.css`:
`:root` is the light theme, `.dark` is the original navy/terminal look. The
choice is saved to `localStorage`, and a small inline script in `index.html`
applies it before the page paints, so there's no flash of the wrong theme on
reload.

## What to customize

- **Content**: each section's data lives at the top of its component file as
  a plain array/object (e.g. `SERVICES` in `Services.tsx`, `DEPLOYS` in
  `Deployments.tsx`) — edit those directly.
- **Bio and photo**: `Profile.tsx` — replace the bracketed placeholder text
  and swap the dashed placeholder box for a real `<img>`.
- **Contact links**: `Connect.tsx` — update the `CONN` array with your real
  email/LinkedIn/GitHub.
- **Stats strip**: `Stats.tsx` — the `STATS` array in the hero; keep these true
  to what's actually on the page.
- **Colors/fonts**: `src/styles/theme.css`.
