# Estates — Real Estate Website

## Project Overview
A premium real estate website for the Egyptian market, targeting both residential and commercial properties. The brand is called **Estates**. The site should feel luxurious, modern, and trustworthy — inspired by high-end global real estate platforms but better than ORA Egypt.


## Tech Stack
- Next.js (latest) with App Router
- TypeScript
- Tailwind CSS (latest)
- Framer Motion for animations
- shadcn/ui for base components
- next/image for optimized images
- next/font for typography

## Typography (from skill — no generic fonts)
- **Headings:** Cormorant Garamond (editorial, luxury feel)
- **Body:** DM Sans (clean, readable, not Inter/Roboto)
- **Accent labels / tags:** Tenor Sans or similar refined sans

## Brand & Design
- **Brand name:** Estates
- **Colors (CSS variables):**
  - --white: #FFFFFF
  - --cream: #F8F6F1
  - --gold: #C9A84C
  - --gold-dark: #A8872E
  - --gold-light: #E8D5A3
  - --black: #0A0A0A
  - --dark: #1A1A1A
  - --gray: #6B6B6B
- **Feel:** Luxury editorial — like Architectural Digest meets a high-end property portal
- **Sharp edges** on all cards (no border-radius) — signals premium
- **Thin gold borders and gold underline accents** throughout
- **Grain texture overlay** on hero and dark sections (CSS noise)
- **Generous negative space** — breathing room between elements
- Subtle staggered reveal animations on page load (Framer Motion)
- Hover states: lift shadow + gold border reveal on cards
- Custom cursor (gold dot) on desktop
- Diagonal / asymmetric layout sections — break the grid intentionally
- Dark overlay sections alternate with cream/white for rhythm

## Pages

### 1. `/` Homepage
- Full-screen hero: dark image overlay + grain texture, centered headline:
  **"Find Your Place in Egypt's Finest Addresses"**
  Two CTAs: "Explore Properties" (gold filled) | "Register Interest" (ghost)
- Animated stats bar (staggered count-up): 500+ Properties | 20+ Locations | 15 Years Experience | 1,200+ Happy Clients
- Featured Properties section (6 cards grid)
- Locations section — image cards for each Egyptian hotspot with property count
- "Why Estates" section — 3 value props with thin gold icon lines
- Latest News preview — 3 cards, editorial style
- Newsletter strip — dark background, gold CTA button
- Footer

### 2. `/properties` Properties Listing
- Full filter bar (sticky on scroll) with:
  - **Property Type:** All, Apartment, Villa, Twin House, Penthouse, Chalet, Office, Retail, Land
  - **Location:** All + all Egyptian hotspots
  - **Bedrooms:** Studio, 1, 2, 3, 4, 5+
  - **Price Range:** slider 500K EGP → 50M EGP
  - **Status:** All, Ready to Move, Off-Plan, Under Construction
  - **Sort:** Featured, Price ↑, Price ↓, Newest
- Grid / List view toggle
- Property cards: image, type badge, location, name, beds/baths/area, price, status
- Pagination

### 3. `/properties/[slug]` Property Detail
- Full image gallery with lightbox
- Highlights: beds, baths, area m², floor, status
- Description + Amenities grid with icons
- Google Maps iframe embed
- Sidebar: price, developer, "Request Info" form, "Book a Visit" CTA
- Related properties

### 4. `/about`
- Brand story
- Mission & vision
- Animated stat counters
- Team placeholder cards
- Awards strip

### 5. `/news`
- Article grid with category filter: All, Market Insights, Project Launches, Investment Tips, Lifestyle
- Individual article `/news/[slug]`

### 6. `/contact`
- Contact form: Name, Email, Phone, Subject, Message
- Office info, Google Maps embed, social links

## Egyptian Hotspot Locations
Use ALL as filter options and location cards:

**Greater Cairo:**
- New Cairo (التجمع الخامس)
- Sheikh Zayed
- 6th of October City
- Madinaty
- Mostakbal City
- Obour City
- Badr City

**North Coast & Mediterranean:**
- North Coast — Sidi Abd El Rahman
- Ras El Hekma
- New Alamein City
- Marsa Matrouh

**Red Sea & Sinai:**
- Hurghada
- El Gouna
- Sharm El Sheikh
- Ain Sokhna

**Upper Egypt:**
- Luxor
- Aswan

**New Capital:**
- New Administrative Capital (العاصمة الإدارية)

**Delta & Canal Zone:**
- New Mansoura
- Ismailia
- Damietta

## Data Files
- `/src/data/properties.ts` — 12+ realistic listings across locations, realistic EGP pricing
- `/src/data/news.ts` — 6 editorial articles
- `/src/data/locations.ts` — all hotspots with description + Unsplash image

## Components
- `<Navbar />` — sticky, transparent → dark on scroll, gold "ESTATES" wordmark, "Register Interest" gold pill button
- `<PropertyCard />` — sharp, hover lift + gold border, status badge
- `<FilterBar />` — clean top bar, collapsible mobile drawer
- `<HeroSection />` — fullscreen, grain texture, staggered Framer Motion reveals
- `<LocationCard />` — image + overlay name + property count
- `<StatsBar />` — animated count-up on scroll enter
- `<Footer />` — dark bg, gold accents, all links, social icons

## SEO
- Metadata on all pages
- Open Graph tags
- Semantic HTML

## Images
- All from `https://images.unsplash.com` — use real estate, Egypt, architecture, luxury interiors queries
- Use next/image with proper sizing

## Copy
- Professional English throughout — NO lorem ipsum
- All prices in EGP (Egyptian Pound)
- Arabic location names shown alongside English where relevant

## Animation Rules (from skill)
- Staggered page load reveals on hero and section entries
- Scroll-triggered entrance animations (Framer Motion viewport)
- Hover: subtle lift (translateY -4px) + gold border on cards
- No flashy or cheap effects — everything restrained and purposeful
- One bold orchestrated hero animation > many scattered micro-interactions