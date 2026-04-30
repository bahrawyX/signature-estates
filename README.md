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
1. Copy `.env.example` to `.env.local` and set your `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`.
2. The `data-store/` directory contains your live data as JSON files (`properties.json`, `locations.json`, `developers.json`, `news.json`).
3. **These files are your database — back them up regularly.**

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
The `data-store/` directory **is** your database. To back up: copy the folder. To restore: replace the folder contents and redeploy. The folder is committed to git, so every deployment carries a snapshot.

### Architecture
- **No external backend.** All admin operations write to JSON files via Next.js API routes (`src/app/api/admin/**`).
- **Auth.** HMAC-signed session cookie (`se_admin_session`), 24-hour expiry. The middleware at `src/middleware.ts` protects `/admin/*` and `/api/admin/*` routes.
- **Hot data.** The public site reads from the same JSON files via `fs.readFileSync`, with `revalidatePath` triggered after every write — so changes appear immediately.

## Notes

- Replace the wordmark in `src/components/Logo.tsx` with your final logo asset (drop a file in `public/` and swap the markup).
- All images are pulled from Unsplash for development. Replace with your own asset CDN before launch.
- The newsletter, contact, and request-info forms are wired client-side and stub on success — connect to your CRM / email provider.
