# Estates — Codebase Reference

> Last updated: 2026-04-30  
> Live URL: https://signature-estates.vercel.app  
> GitHub: https://github.com/bahrawyX/signature-estates

---

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Folder Structure](#folder-structure)
3. [Pages & Routes](#pages--routes)
4. [Components](#components)
5. [Data Files](#data-files)
6. [Type Definitions](#type-definitions)
7. [Shared Filter System](#shared-filter-system)
8. [Design Tokens](#design-tokens)
9. [Fonts](#fonts)
10. [Config Files](#config-files)
11. [Known Gotchas & Rules](#known-gotchas--rules)

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15.5 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Smooth Scroll | Lenis (`@studio-freight/lenis`) |
| UI Primitives | shadcn/ui (Radix UI) |
| Images | next/image |
| Fonts | next/font/google |
| Deployment | Vercel (auto-deploy from `main`) |
| Repo | GitHub |

---

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout — fonts, Navbar, Footer, FloatingContact, LenisProvider
│   ├── globals.css                 # CSS variables, Tailwind base, grain texture, gold-underline util
│   ├── page.tsx                    # Homepage
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── not-found.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   ├── page.tsx
│   │   └── ContactClient.tsx
│   ├── developers/
│   │   └── page.tsx                # Developers grid → links to /properties?developer={id}
│   ├── investment-plans/
│   │   └── page.tsx                # 6 plan cards + FAQ section
│   ├── news/
│   │   ├── page.tsx
│   │   ├── NewsClient.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   └── properties/
│       ├── page.tsx
│       ├── PropertiesClient.tsx    # Filter logic, sort logic, pagination
│       └── [slug]/
│           └── page.tsx            # Property detail page
│
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Logo.tsx
│   ├── FilterBar.tsx
│   ├── PropertyCard.tsx
│   ├── HeroSection.tsx
│   ├── StatsBar.tsx
│   ├── LocationCard.tsx
│   ├── SectionHeader.tsx
│   ├── NewsletterStrip.tsx
│   ├── ImageGallery.tsx
│   ├── Reveal.tsx
│   ├── GoldCursor.tsx
│   ├── FloatingContact.tsx
│   ├── LenisProvider.tsx
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── label.tsx
│       ├── badge.tsx
│       ├── slider.tsx
│       └── select.tsx              # Extended: includes SelectLabel + SelectSeparator
│
├── data/
│   ├── properties.ts               # 14 listings
│   ├── locations.ts                # 23 Egyptian hotspots
│   ├── developers.ts               # 12 developers
│   └── news.ts                     # 6 editorial articles
│
└── lib/
    ├── types.ts                    # All TypeScript interfaces & unions
    ├── propertyTypes.ts            # Shared filter constants (NO "use client")
    └── utils.ts                    # cn(), formatEGP()
```

---

## Pages & Routes

### `/` — Homepage
- **File:** `src/app/page.tsx` (Server Component)
- **Sections:** Hero → Stats → Featured Properties (6) → Locations → Why Estates → Signature Method (dark) → News Preview → Newsletter
- **Data used:** `properties` (featured flag), `locations` (6 handpicked), `news` (first 3)

### `/properties` — Listing
- **File:** `src/app/properties/page.tsx` + `PropertiesClient.tsx` (Client)
- **Features:** Sticky FilterBar, grid/list toggle, `applyFilters()`, `applySort()`, load-more pagination (9 per page)
- **URL params read on mount:** `?type=` and `?location=` (set by hero CTAs and location cards)

### `/properties/[slug]` — Detail
- **File:** `src/app/properties/[slug]/page.tsx`
- **Sections:** Image gallery with lightbox, highlights bar, description, amenities grid, Google Maps iframe, sidebar (price + developer + contact form), related properties

### `/about`
- **File:** `src/app/about/page.tsx`
- **Sections:** Brand story, mission & vision, animated stat counters, team placeholder, awards strip

### `/news`
- **File:** `src/app/news/page.tsx` + `NewsClient.tsx` (Client)
- **Category filter:** All, Market Insights, Project Launches, Investment Tips, Lifestyle

### `/news/[slug]`
- **File:** `src/app/news/[slug]/page.tsx`

### `/contact`
- **File:** `src/app/contact/page.tsx` + `ContactClient.tsx`
- **Form fields:** Name, Email, Phone, Subject, Message
- **FloatingContact button is hidden on this page**

### `/developers`
- **File:** `src/app/developers/page.tsx`
- **Layout:** Image grid of all 12 developers, each card links to `/properties?developer={dev.id}`

### `/investment-plans`
- **File:** `src/app/investment-plans/page.tsx`
- **6 Plans:** Cash Purchase, Instalment (Off-Plan), Mortgage, Off-Plan Early, Buy-to-Let, Portfolio
- **Also includes:** FAQ accordion section

---

## Components

### `<Navbar />`
- **File:** `src/components/Navbar.tsx`
- **Behaviour:** Fixed top; transparent with `text-white` on hero (homepage, not scrolled); transitions to cream bg + dark text on scroll (`scrollY > 32`)
- **Logo variant:** `"dark"` (gold logo) when on hero, `"light"` (black logo) when scrolled
- **Nav items:**
  ```
  Home / About Us / Developers / Properties / Investment Plans / Contact Us
  ```
- **CTA Button:** "Register Interest" → `/contact`
- **Mobile:** Hamburger → full-screen drawer with font-display links

### `<Logo />`
- **File:** `src/components/Logo.tsx`
- **Props:** `variant: "dark" | "light"`, `size: "sm" | "md" | "lg"`, `href`, `className`
- **Logic:** `variant="dark"` → `/logo.png` (gold, for dark/hero bg); `variant="light"` → `/logoDark.png` (black, for cream bg)
- **Sizes:** `sm: h-16`, `md: h-[100px]`, `lg: h-32`
- **Intrinsic dimensions:** `320×160`
- **No wrapper / no background pill** — logo is bare

### `<FilterBar />`
- **File:** `src/components/FilterBar.tsx`
- **"use client"** — DO NOT re-export constants from this file (webpack issue)
- **Props:** `total`, `view`, `onViewChange`, `filters: FilterState`, `onChange`, `sticky?`
- **Fields:** Property Type (hierarchical), Location, Developer, Development, Bedrooms, Status, Price slider
- **Property Type dropdown structure:**
  - Residential → Apartments (Flat Apartment, Loft, Penthouse, Garden Apartment, Duplex)
  - Residential → Villas (Standalone Villa, One Story Villa, Town House, Twin House, Family House)
  - Residential → Beach & Resort (Chalet)
  - Commercial → Shops (Retail, F&B)
  - Commercial (Office, Clinic)
  - Other (Land)
- **Mobile:** Collapses into drawer triggered by "Filters" button; Apply/Reset buttons at bottom
- **Active count badge:** Shows number of non-default filters applied
- **URL param sync:** On mount, reads `?type=` and `?location=` from search params

### `<PropertyCard />`
- **File:** `src/components/PropertyCard.tsx`
- **Props:** `property: Property`, `view: "grid" | "list"`
- **Hover:** `translateY(-4px)` + gold border reveal
- **Badge:** Status badge (Ready to Move / Off-Plan / Under Construction)
- **Apartment type check:** `["Flat Apartment","Loft","Garden Apartment","Duplex"].includes(property.type)` (NOT `=== "Apartment"`)

### `<FloatingContact />`
- **File:** `src/components/FloatingContact.tsx`
- **Behaviour:** Fixed bottom-right, z-90; fades in 800ms after mount; hidden on `/contact`; collapses on route change
- **Expanded panel:** Dark bg, gold border, "Send a Message" → `/contact`, "Call Us" → `tel:+20226149000`

### `<HeroSection />`
- **File:** `src/components/HeroSection.tsx`
- **Style:** Full-screen dark image + grain overlay; Framer Motion staggered reveal
- **Headline:** "Find Your Place in Egypt's Finest Addresses"
- **CTAs:** "Explore Properties" (gold) | "Register Interest" (ghost)

### `<StatsBar />`
- **File:** `src/components/StatsBar.tsx`
- **Animated count-up on scroll enter**
- **Stats:** 500+ Properties | 20+ Locations | 15 Years Experience | 1,200+ Happy Clients

### `<Reveal />` / `<StaggerGroup />` / `<StaggerItem />`
- **File:** `src/components/Reveal.tsx`
- **Usage:** Wrap any element for scroll-triggered fade-up animation
- **Props on Reveal:** `delay?`, `className?`

### `<GoldCursor />`
- **File:** `src/components/GoldCursor.tsx`
- **Behaviour:** Custom gold dot cursor on desktop only; hides on mobile

### `<LenisProvider />`
- **File:** `src/components/LenisProvider.tsx`
- **Usage:** Wraps entire app in `layout.tsx`; provides smooth scroll via Lenis

### `<ImageGallery />`
- **File:** `src/components/ImageGallery.tsx`
- **Used on:** Property detail page
- **Features:** Thumbnail strip + lightbox modal

### `<SectionHeader />`
- **File:** `src/components/SectionHeader.tsx`
- **Props:** `eyebrow`, `title` (ReactNode), `description?`, `align?`, `className?`

### `<LocationCard />`
- **File:** `src/components/LocationCard.tsx`
- **Props:** `location: Location`, `count: number`
- **Hover:** Scale image + gold overlay

### `<NewsletterStrip />`
- **File:** `src/components/NewsletterStrip.tsx`
- **Style:** Dark background, gold CTA button

---

## Data Files

### `src/data/properties.ts` — 14 Listings

| ID | Slug | Name | Type | Location | Developer | Price (EGP) | Status |
|---|---|---|---|---|---|---|---|
| p-001 | marquee-villa-zed-east | Marquee Villa — ZED East | Standalone Villa | new-cairo | ora | 42,500,000 | Off-Plan |
| p-002 | penthouse-mivida-park | Penthouse — Mivida Park | Penthouse | new-cairo | emaar-misr | 28,900,000 | Ready to Move |
| p-003 | twin-house-belle-vie | Twin House — Belle Vie | Twin House | sheikh-zayed | emaar-misr | 22,400,000 | Under Construction |
| p-004 | chalet-silver-sands | Lagoon Chalet — Silver Sands | Chalet | north-coast-sidi | ora | 18,750,000 | Off-Plan |
| p-005 | apartment-eastown-residences | Apartment — Eastown Residences | Flat Apartment | new-cairo | sodic | 14,900,000 | Ready to Move |
| p-006 | townhouse-o-west | Townhouse — O West | Town House | october | ora | 19,800,000 | Under Construction |
| p-007 | office-tower-new-capital | Office Floor — Capital Diamond Tower | Office | new-capital | marakez | 36,000,000 | Ready to Move |
| p-008 | villa-hacienda-bay | Beachfront Villa — Hacienda Bay | Standalone Villa | north-coast-sidi | palm-hills | 78,000,000 | Ready to Move |
| p-009 | studio-il-monte-galala | Studio — Il Monte Galala | Flat Apartment | ain-sokhna | tatweer-misr | 4,950,000 | Ready to Move |
| p-010 | chalet-fouka-bay | Chalet — Fouka Bay | Chalet | ras-el-hekma | tatweer-misr | 14,200,000 | Ready to Move |
| p-011 | apartment-aliva-mostakbal | Apartment — Aliva, Mostakbal City | Flat Apartment | mostakbal | mountain-view | 8,750,000 | Off-Plan |
| p-012 | land-il-bosco-new-capital | Land Plot — IL Bosco, New Capital | Land | new-capital | misr-italia | 32,000,000 | Ready to Move |
| p-013 | villa-jefaira-ras-el-hekma | Villa — Jefaira | Standalone Villa | ras-el-hekma | inertia | 33,500,000 | Under Construction |
| p-014 | retail-ninety-five-east-cairo | Retail Unit — Ninety Five Avenue | Retail | new-cairo | lmd | 19,500,000 | Ready to Move |

**Featured:** p-001, p-002, p-003, p-004, p-008

**Helper functions:**
- `getProperty(slug)` — find by slug
- `getRelated(slug, count?)` — same location OR same type, excludes self

---

### `src/data/locations.ts` — 23 Locations

| ID | Name | Arabic | Region |
|---|---|---|---|
| new-cairo | New Cairo | التجمع الخامس | Greater Cairo |
| sheikh-zayed | Sheikh Zayed | الشيخ زايد | Greater Cairo |
| october | 6th of October City | السادس من أكتوبر | Greater Cairo |
| madinaty | Madinaty | مدينتي | Greater Cairo |
| mostakbal | Mostakbal City | مدينة المستقبل | Greater Cairo |
| obour | Obour City | العبور | Greater Cairo |
| badr | Badr City | مدينة بدر | Greater Cairo |
| north-coast-sidi | Sidi Abd El Rahman | سيدي عبد الرحمن | North Coast & Mediterranean |
| ras-el-hekma | Ras El Hekma | رأس الحكمة | North Coast & Mediterranean |
| new-alamein | New Alamein City | العلمين الجديدة | North Coast & Mediterranean |
| marsa-matrouh | Marsa Matrouh | مرسى مطروح | North Coast & Mediterranean |
| hurghada | Hurghada | الغردقة | Red Sea & Sinai |
| el-gouna | El Gouna | الجونة | Red Sea & Sinai |
| sharm-el-sheikh | Sharm El Sheikh | شرم الشيخ | Red Sea & Sinai |
| ain-sokhna | Ain Sokhna | العين السخنة | Red Sea & Sinai |
| luxor | Luxor | الأقصر | Upper Egypt |
| aswan | Aswan | أسوان | Upper Egypt |
| new-capital | New Administrative Capital | العاصمة الإدارية | New Capital |
| new-mansoura | New Mansoura | المنصورة الجديدة | Delta & Canal Zone |
| ismailia | Ismailia | الإسماعيلية | Delta & Canal Zone |
| damietta | Damietta | دمياط | Delta & Canal Zone |

**Helper:** `getLocation(id)`

---

### `src/data/developers.ts` — 12 Developers

| ID | Name | Short Name | Est. |
|---|---|---|---|
| ora | ORA Developers | ORA | 2017 |
| emaar-misr | Emaar Misr | Emaar | 2005 |
| tmg | Talaat Moustafa Group | TMG | 1973 |
| sodic | SODIC | — | 1996 |
| palm-hills | Palm Hills Developments | Palm Hills | 2005 |
| mountain-view | Mountain View | — | 2005 |
| marakez | Marakez | — | 2014 |
| hassan-allam | Hassan Allam Properties | Hassan Allam | 2017 |
| misr-italia | Misr Italia Properties | Misr Italia | 1998 |
| tatweer-misr | Tatweer Misr | — | 2014 |
| inertia | Inertia Egypt | Inertia | 2007 |
| lmd | LMD | — | 2007 |

**Helper:** `getDeveloper(id)`

---

### `src/data/news.ts` — 6 Articles

| ID | Slug | Title | Category | Author | Date |
|---|---|---|---|---|---|
| n-001 | ras-el-hekma-rewrites-the-coast | Ras El Hekma Is Quietly Rewriting Egypt's Coast | Market Insights | Yasmine El Sharkawy | 2026-04-12 |
| n-002 | what-makes-a-great-new-cairo-compound | What Actually Makes a Great New Cairo Compound | Investment Tips | Karim Hosny | 2026-03-28 |
| n-003 | silver-sands-phase-three-launch | ORA's Silver Sands Reveals Phase Three | Project Launches | Signature Estates Editorial | 2026-04-22 |
| n-004 | second-home-strategy-2026 | A Second-Home Strategy for 2026 | Investment Tips | Mariam Saleh | 2026-02-10 |
| n-005 | the-quiet-rise-of-el-gouna | The Quiet Rise of El Gouna | Lifestyle | Hana Refaat | 2026-01-30 |
| n-006 | office-market-pivot-new-capital | The New Capital's Office Market Has Quietly Pivoted | Market Insights | Tarek Abdelaziz | 2026-04-05 |

**Helper:** `getArticle(slug)`

---

## Type Definitions

**File:** `src/lib/types.ts`

```ts
type PropertyType =
  | "Flat Apartment" | "Loft" | "Penthouse" | "Garden Apartment" | "Duplex"  // Residential › Apartments
  | "Standalone Villa" | "One Story Villa" | "Town House" | "Twin House" | "Family House"  // Residential › Villas
  | "Chalet"  // Beach & Resort
  | "Retail" | "F&B"  // Commercial › Shops
  | "Office" | "Clinic"  // Commercial
  | "Land";  // Other

type PropertyStatus = "Ready to Move" | "Off-Plan" | "Under Construction";

interface Property {
  id: string; slug: string; name: string; type: PropertyType; status: PropertyStatus;
  locationId: string; developerId: string;
  bedrooms: number; bathrooms: number; areaSqm: number; floor?: number;
  priceEGP: number; description: string; amenities: string[];
  images: PropertyImage[]; featured?: boolean; mapUrl: string; deliveryYear?: number;
}

interface Location {
  id: string; name: string; arabicName?: string;
  region: "Greater Cairo" | "North Coast & Mediterranean" | "Red Sea & Sinai" | "Upper Egypt" | "New Capital" | "Delta & Canal Zone";
  description: string; image: string;
}

interface Developer {
  id: string; name: string; shortName?: string; established: number; description: string;
}

type NewsCategory = "Market Insights" | "Project Launches" | "Investment Tips" | "Lifestyle";

interface NewsArticle {
  id: string; slug: string; title: string; excerpt: string;
  body: string[]; category: NewsCategory; author: string;
  publishedAt: string; readMinutes: number; cover: string;
}
```

---

## Shared Filter System

**File:** `src/lib/propertyTypes.ts` — **NO "use client" directive** (plain TS, safe to import anywhere)

```ts
// Type groups used to build the hierarchical dropdown
RES_APARTMENTS = ["Flat Apartment","Loft","Penthouse","Garden Apartment","Duplex"]
RES_VILLAS = ["Standalone Villa","One Story Villa","Town House","Twin House","Family House"]
COM_SHOPS = ["Retail","F&B"]
COM_OTHER = ["Office","Clinic"]
ALL_SPECIFIC_TYPES = [...RES_APARTMENTS, ...RES_VILLAS, "Chalet", ...COM_SHOPS, ...COM_OTHER, "Land"]

PRICE_MIN = 500_000
PRICE_MAX = 100_000_000

interface FilterState {
  type: string;       // "All" or a specific type
  location: string;   // "All" or a location id
  developer: string;  // "All" or a developer id
  development: string;// "All" or a development name string
  beds: string;       // "Any" | "Studio" | "1" | "2" | "3" | "4" | "5+"
  status: string;     // "All" | "Ready to Move" | "Off-Plan" | "Under Construction"
  priceMin: number;
  priceMax: number;
  sort: string;       // "featured" | "price-asc" | "price-desc" | "newest"
}

DEFAULT_FILTERS: FilterState // All "All"/"Any"/PRICE_MIN/PRICE_MAX/sort:"featured"
```

**Filter logic** (`PropertiesClient.tsx`):
```ts
function applyFilters(list, f) {
  // type / locationId / developerId / name.includes(development) / status / priceEGP range / bedrooms
}
function applySort(list, sort) {
  // "price-asc" | "price-desc" | "newest" (reverse) | "featured" (featured first)
}
```

---

## Design Tokens

**CSS Variables** (defined in `globals.css`):

```css
--color-white: #FFFFFF
--color-cream: #F8F6F1
--color-cream-dark: #F0EDE6
--color-gold: #C9A84C
--color-gold-dark: #A8872E
--color-gold-light: #E8D5A3
--color-black: #0A0A0A
--color-dark: #1A1A1A
--color-gray: #6B6B6B
--color-gray-light: #9B9B9B
```

**Utility classes** (defined in `globals.css`):
- `.grain` — CSS noise texture overlay for dark/hero sections
- `.gold-underline` — animated gold underline on hover
- `.gold-rule` — thin horizontal gold divider line
- `.gold-shimmer` — shimmer animation on text

**Sharp edges throughout** — `border-radius: 0` on all cards (no rounding = premium signal)

---

## Fonts

**Loaded in:** `src/app/layout.tsx` via `next/font/google`

| Role | Font | CSS Variable | Tailwind Class |
|---|---|---|---|
| Display / Headings | Playfair Display | `--font-display` | `font-display` |
| Body | Raleway | `--font-sans` | `font-sans` |
| Accent / Tags / Labels | Josefin Sans | `--font-accent` | `font-accent` |

**Accent label pattern:** `font-accent text-[10px] tracking-[0.22em] uppercase`

---

## Config Files

### `next.config.ts`
```ts
{
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
    // ⚠️ framer-motion MUST NOT be here — it breaks chunk splitting
  },
}
```

### `src/app/layout.tsx` — Root Layout Structure
```
<html>
  <body>
    <LenisProvider>
      <GoldCursor />
      <Navbar />
      <main id="main">
        {children}
      </main>
      <Footer />
      <FloatingContact />
    </LenisProvider>
    <script type="application/ld+json"> ... RealEstateAgent schema ... </script>
  </body>
</html>
```

**Schema.org data:**
- Type: `RealEstateAgent`
- Name: Signature Estates
- Phone: +20 2 2614 9000
- Email: concierge@signatureestates.eg
- Address: Cairo Festival City, Boulevard Tower, New Cairo

---

## Known Gotchas & Rules

### 1. Never export constants from a "use client" component
Exporting plain data/constants/interfaces from a file that also has `"use client"` causes a webpack runtime crash:
> `__webpack_modules__[moduleId] is not a function`

**Rule:** All shared constants (`FilterState`, `DEFAULT_FILTERS`, `PRICE_MIN`, etc.) live in `src/lib/propertyTypes.ts` which has NO `"use client"` directive. `FilterBar.tsx` imports from there and does NOT re-export anything.

### 2. Never add framer-motion to `optimizePackageImports`
Framer Motion uses dynamic internal imports that conflict with Next.js's package optimisation. Adding it there causes 404s for JS chunks (`app-pages-internals.js`, `page.js`). Only `lucide-react` is in that list.

### 3. Property type checks — use includes(), not ===
Old string `"Apartment"` no longer exists. The type is now `"Flat Apartment"`.
```ts
// ✅ Correct
["Flat Apartment","Loft","Garden Apartment","Duplex"].includes(property.type)
// ❌ Wrong — will never match
property.type === "Apartment"
```

### 4. Select component needs SelectLabel and SelectSeparator
The default shadcn/ui `select.tsx` does not export these. They were manually added to `src/components/ui/select.tsx` using `SelectPrimitive.Label` and `SelectPrimitive.Separator`.

### 5. Logo dual-file system
- `/public/logo.png` — gold logo, use on **dark backgrounds** (`variant="dark"`)
- `/public/logoDark.png` — black/dark logo, use on **cream/white backgrounds** (`variant="light"`)
- No wrapper div, no background pill — the `<Logo>` component is bare
- Current navbar size: `size="md"` = `h-[100px]`

### 6. Deployment
- Every push to `main` branch auto-deploys to Vercel
- Build command: `next build`
- All 32 routes build cleanly with 0 TypeScript errors

### 7. Images
All images from `https://images.unsplash.com/photo-{id}?w=1600&auto=format&fit=crop`  
Helper in `properties.ts`: `const u = (q, w = 1600) => \`https://images.unsplash.com/${q}?w=${w}&auto=format&fit=crop\``

### 8. Price formatting
Use `formatEGP()` from `src/lib/utils.ts` for all price display (formats to EGP with locale-appropriate separators).
