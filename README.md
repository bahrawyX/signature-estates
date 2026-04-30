# Estates

A premium real-estate website for the Egyptian market — Next.js 15, Tailwind v4, shadcn/ui, Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run test:e2e` | Playwright smoke tests |

## Stack

- **Next.js 15** (App Router, React 19, RSC)
- **TypeScript** strict mode
- **Tailwind CSS v4** with CSS-variable theming
- **shadcn/ui** primitives (Button, Input, Select, Slider, Label, Badge, Textarea)
- **Framer Motion** for staggered reveals, hero entrance, gallery transitions
- **lucide-react** icons
- **Playwright** for end-to-end smoke tests

## Project structure

```
src/
  app/                 Next.js App Router pages
    page.tsx           Homepage
    properties/        Listing + [slug] detail
    about/             Brand story, team, awards
    news/              Editorial index + [slug]
    contact/           Brief form + map
    layout.tsx         Root layout, fonts, JSON-LD
    globals.css        Brand tokens, grain, cursor
    sitemap.ts         /sitemap.xml
    robots.ts          /robots.txt
  components/
    ui/                shadcn primitives
    Navbar.tsx         Sticky transparent → solid
    Footer.tsx         Dark, gold accents
    HeroSection.tsx    Fullscreen, grain, staggered reveal
    StatsBar.tsx       Animated count-ups
    PropertyCard.tsx   Sharp, hover-lift, gold border
    LocationCard.tsx   Image + overlay
    FilterBar.tsx      Sticky filter (type, location, developer, development, beds, status, price)
    ImageGallery.tsx   Lightbox
    Reveal.tsx         Framer Motion wrappers
    GoldCursor.tsx     Custom cursor (desktop)
    NewsletterStrip.tsx
    SectionHeader.tsx
    Logo.tsx
  data/
    properties.ts      14 listings
    locations.ts       21 hotspots across Egypt
    developers.ts      12 Egyptian developers
    news.ts            6 editorial articles
  lib/
    utils.ts           cn(), formatEGP(), slugify()
    types.ts           Domain types
e2e/
  smoke.spec.ts        Playwright smoke
```

## Brand tokens

CSS variables, defined in `src/app/globals.css` (`@theme inline`):

| Token | Value |
| --- | --- |
| `--color-cream` | `#F8F6F1` |
| `--color-gold` | `#C9A84C` |
| `--color-gold-dark` | `#A8872E` |
| `--color-gold-light` | `#E8D5A3` |
| `--color-black` | `#0A0A0A` |
| `--font-display` | Cormorant Garamond |
| `--font-sans` | DM Sans |
| `--font-accent` | Tenor Sans (uppercase, wide tracking) |
| `--radius` | `0px` (sharp edges) |

## Filters

The properties listing supports — in this order on the bar — Type, Location, **Developer**, **Development**, Bedrooms, Status, and Price (slider). Sort: Featured / Price ↑ / Price ↓ / Newest. Grid + List view toggle.

## SEO

- `metadata` per page with canonical URLs and OpenGraph
- `RealEstateAgent` JSON-LD on every page
- `sitemap.ts` covers static, property and article routes
- `robots.ts` declares the sitemap and host

## Admin Dashboard

Access the admin panel at `/admin`. Default password: see `.env.local`.

### Setup
1. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` from your Supabase project settings.
   - `ADMIN_PASSWORD` — the password for the admin panel.
   - `ADMIN_SESSION_SECRET` — a long random string for signing session cookies.
2. Open the Supabase SQL Editor and run **`SUPABASE_SCHEMA.sql`** (creates the four tables, RLS, and triggers).
3. Then run **`SUPABASE_SEED.sql`** (idempotent — populates locations, developers, properties, and news).
4. Add the same Supabase + admin env variables to your Vercel project settings.

### Managing Content
- **Properties** — Add, edit, remove listings with full details (type hierarchy, location, developer, specs, images, map, amenities).
- **Locations** — Manage all Egyptian hotspot locations across 6 regions.
- **Developers** — Manage developer profiles.
- **News** — Write and publish editorial articles with paragraph-by-paragraph control.

### Image URLs
All images use Unsplash URLs. Format:

```
https://images.unsplash.com/photo-XXXXX?w=1600&auto=format&fit=crop
```

Find images at https://unsplash.com — the photo ID lives in the URL.

### Backup
Use Supabase's built-in backups (Database → Backups). For point-in-time recovery, run `pg_dump` against the connection string from Supabase project settings.

### Architecture
- **Database.** Supabase (hosted Postgres). Four tables: `locations`, `developers`, `properties`, `news`.
- **Public reads.** The public site uses the anon key via `src/lib/supabase.ts`. Row Level Security policies allow `select` for everyone.
- **Admin writes.** All `/api/admin/*` route handlers use the service role key (bypasses RLS), called only via the helpers in `src/lib/db.ts`. After every write, `revalidatePath('/', 'layout')` invalidates the public cache.
- **Auth.** HMAC-signed session cookie (`se_admin_session`), 24-hour expiry. Middleware (`src/middleware.ts`) gates `/admin/*` and `/api/admin/*`.
- **Single data layer.** Components and pages import `dbGet*` / `dbAdminGet*` from `src/lib/db.ts`. Nothing else talks to Supabase directly.

## Notes

- Replace the wordmark in `src/components/Logo.tsx` with your final logo asset (drop a file in `public/` and swap the markup).
- All images are pulled from Unsplash for development. Replace with your own asset CDN before launch.
- The newsletter, contact, and request-info forms are wired client-side and stub on success — connect to your CRM / email provider.
