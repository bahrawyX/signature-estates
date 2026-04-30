import type { Property } from "@/lib/types";

const u = (q: string, w = 1600) =>
  `https://images.unsplash.com/${q}?w=${w}&auto=format&fit=crop`;

export const properties: Property[] = [
  {
    id: "p-001",
    slug: "marquee-villa-zed-east",
    name: "Marquee Villa — ZED East",
    type: "Villa",
    status: "Off-Plan",
    locationId: "new-cairo",
    developerId: "ora",
    bedrooms: 5,
    bathrooms: 6,
    areaSqm: 612,
    priceEGP: 42_500_000,
    deliveryYear: 2027,
    featured: true,
    description:
      "A standalone villa on a corner plot with double-height living, a private pool, and direct frontage onto ZED East's central spine. Designed by an internationally awarded studio for a buyer who notices proportion before finish.",
    amenities: [
      "Private pool",
      "Smart home system",
      "Italian kitchen",
      "Private garden",
      "Maid's quarters",
      "Two-car garage",
      "Walk-in wardrobes",
      "Backup generator",
    ],
    images: [
      { src: u("photo-1600596542815-ffad4c1539a9"), alt: "Villa exterior at dusk" },
      { src: u("photo-1600585154340-be6161a56a0c"), alt: "Open-plan living" },
      { src: u("photo-1600585154526-990dced4db0d"), alt: "Master bedroom" },
      { src: u("photo-1583847268964-b28dc8f51f92"), alt: "Pool view" },
    ],
    mapUrl:
      "https://www.google.com/maps?q=ZED+East+New+Cairo&output=embed",
  },
  {
    id: "p-002",
    slug: "penthouse-mivida-park",
    name: "Penthouse — Mivida Park",
    type: "Penthouse",
    status: "Ready to Move",
    locationId: "new-cairo",
    developerId: "emaar-misr",
    bedrooms: 4,
    bathrooms: 5,
    areaSqm: 380,
    floor: 6,
    priceEGP: 28_900_000,
    featured: true,
    description:
      "A duplex penthouse on the central park, with a private rooftop terrace and uninterrupted views over Mivida's tree canopy. Move-in ready, with a full white-box premium finish.",
    amenities: [
      "Rooftop terrace",
      "Private elevator",
      "Park view",
      "Underfloor heating",
      "Concierge",
      "Two parking spots",
      "Storage room",
    ],
    images: [
      { src: u("photo-1600210492493-0946911123ea"), alt: "Penthouse living room" },
      { src: u("photo-1505691938895-1758d7feb511"), alt: "Open kitchen" },
      { src: u("photo-1560448204-e02f11c3d0e2"), alt: "Bedroom suite" },
      { src: u("photo-1600566753190-17f0baa2a6c3"), alt: "Terrace" },
    ],
    mapUrl: "https://www.google.com/maps?q=Mivida+New+Cairo&output=embed",
  },
  {
    id: "p-003",
    slug: "twin-house-belle-vie",
    name: "Twin House — Belle Vie",
    type: "Twin House",
    status: "Under Construction",
    locationId: "sheikh-zayed",
    developerId: "emaar-misr",
    bedrooms: 4,
    bathrooms: 4,
    areaSqm: 295,
    priceEGP: 22_400_000,
    deliveryYear: 2026,
    featured: true,
    description:
      "A garden twin in Belle Vie's most mature cluster — south-facing, set across three levels with a basement studio and a generous garden footprint.",
    amenities: [
      "Private garden",
      "Basement studio",
      "Roof access",
      "Laundry room",
      "Reserved parking",
      "Compound clubhouse",
    ],
    images: [
      { src: u("photo-1613490493576-7fde63acd811"), alt: "Twin house exterior" },
      { src: u("photo-1502672260266-1c1ef2d93688"), alt: "Living area" },
      { src: u("photo-1556909114-f6e7ad7d3136"), alt: "Kitchen detail" },
    ],
    mapUrl:
      "https://www.google.com/maps?q=Belle+Vie+Sheikh+Zayed&output=embed",
  },
  {
    id: "p-004",
    slug: "chalet-silver-sands",
    name: "Lagoon Chalet — Silver Sands",
    type: "Chalet",
    status: "Off-Plan",
    locationId: "north-coast-sidi",
    developerId: "ora",
    bedrooms: 3,
    bathrooms: 3,
    areaSqm: 165,
    floor: 1,
    priceEGP: 18_750_000,
    deliveryYear: 2027,
    featured: true,
    description:
      "First-row chalet on Silver Sands' crystal lagoon, with a 9m terrace and direct access to the white-sand beach club.",
    amenities: [
      "Lagoon view",
      "Beach access",
      "Outdoor kitchen",
      "Smart shading",
      "Resort-style pools",
      "Beach club membership",
    ],
    images: [
      { src: u("photo-1519046904884-53103b34b206"), alt: "Lagoon view" },
      { src: u("photo-1545324418-cc1a3fa10c00"), alt: "Chalet interior" },
      { src: u("photo-1507525428034-b723cf961d3e"), alt: "Beach" },
    ],
    mapUrl:
      "https://www.google.com/maps?q=Silver+Sands+Sidi+Abdel+Rahman&output=embed",
  },
  {
    id: "p-005",
    slug: "apartment-eastown-residences",
    name: "Apartment — Eastown Residences",
    type: "Apartment",
    status: "Ready to Move",
    locationId: "new-cairo",
    developerId: "sodic",
    bedrooms: 3,
    bathrooms: 3,
    areaSqm: 215,
    floor: 4,
    priceEGP: 14_900_000,
    description:
      "A corner unit on Eastown's pedestrian street — walkable to the boulevard cafés, with a quiet rear-facing master suite.",
    amenities: [
      "Walkable amenities",
      "Storage room",
      "Underground parking",
      "24/7 security",
      "Compound gym",
    ],
    images: [
      { src: u("photo-1572120360610-d971b9d7767c"), alt: "Apartment exterior" },
      { src: u("photo-1493809842364-78817add7ffb"), alt: "Living area" },
      { src: u("photo-1502005229762-cf1b2da7c5d6"), alt: "Bedroom" },
    ],
    mapUrl:
      "https://www.google.com/maps?q=Eastown+New+Cairo&output=embed",
  },
  {
    id: "p-006",
    slug: "townhouse-o-west",
    name: "Townhouse — O West",
    type: "Townhouse",
    status: "Under Construction",
    locationId: "october",
    developerId: "ora",
    bedrooms: 4,
    bathrooms: 4,
    areaSqm: 245,
    priceEGP: 19_800_000,
    deliveryYear: 2026,
    description:
      "An end-corner townhouse on O West's tree-lined avenue, with a wraparound garden and a clean, contemporary façade.",
    amenities: [
      "Wraparound garden",
      "Roof terrace",
      "Two-car garage",
      "Smart entry",
      "Central park access",
    ],
    images: [
      { src: u("photo-1613553474179-e1eda3ea5734"), alt: "Townhouse exterior" },
      { src: u("photo-1600585154340-be6161a56a0c"), alt: "Living" },
      { src: u("photo-1600121848594-d8644e57abab"), alt: "Bedroom" },
    ],
    mapUrl: "https://www.google.com/maps?q=O+West+October&output=embed",
  },
  {
    id: "p-007",
    slug: "office-tower-new-capital",
    name: "Office Floor — Capital Diamond Tower",
    type: "Office",
    status: "Ready to Move",
    locationId: "new-capital",
    developerId: "marakez",
    bedrooms: 0,
    bathrooms: 4,
    areaSqm: 540,
    floor: 18,
    priceEGP: 36_000_000,
    description:
      "A full floor in the New Capital's CBD — column-free with a 360° glass envelope and dedicated lift access.",
    amenities: [
      "Dedicated lift",
      "Raised flooring",
      "VRF cooling",
      "Backup power",
      "On-site retail",
      "Valet parking",
    ],
    images: [
      { src: u("photo-1497366216548-37526070297c"), alt: "Office floor" },
      { src: u("photo-1486325212027-8081e485255e"), alt: "Tower exterior" },
      { src: u("photo-1497366811353-6870744d04b2"), alt: "Meeting room" },
    ],
    mapUrl:
      "https://www.google.com/maps?q=New+Administrative+Capital+CBD&output=embed",
  },
  {
    id: "p-008",
    slug: "villa-hacienda-bay",
    name: "Beachfront Villa — Hacienda Bay",
    type: "Villa",
    status: "Ready to Move",
    locationId: "north-coast-sidi",
    developerId: "palm-hills",
    bedrooms: 5,
    bathrooms: 6,
    areaSqm: 720,
    priceEGP: 78_000_000,
    featured: true,
    description:
      "A first-row beachfront villa on Hacienda Bay's quiet southern stretch — fully renovated, sleeping ten, with a 22-metre pool.",
    amenities: [
      "Beachfront",
      "22m pool",
      "Outdoor cinema",
      "Staff quarters",
      "Smart shading",
      "Fully furnished",
    ],
    images: [
      { src: u("photo-1582719508461-905c673771fd"), alt: "Beachfront villa" },
      { src: u("photo-1505228395891-9a51e7e86bf6"), alt: "Pool" },
      { src: u("photo-1564013799919-ab600027ffc6"), alt: "Living" },
    ],
    mapUrl:
      "https://www.google.com/maps?q=Hacienda+Bay+North+Coast&output=embed",
  },
  {
    id: "p-009",
    slug: "studio-il-monte-galala",
    name: "Studio — Il Monte Galala",
    type: "Apartment",
    status: "Ready to Move",
    locationId: "ain-sokhna",
    developerId: "tatweer-misr",
    bedrooms: 0,
    bathrooms: 1,
    areaSqm: 58,
    floor: 3,
    priceEGP: 4_950_000,
    description:
      "A sea-view studio on Il Monte Galala's upper terraces — perfectly sized for a low-maintenance Sokhna pied-à-terre.",
    amenities: [
      "Sea view",
      "Furnished kitchenette",
      "Resort beach access",
      "Cable car",
      "Concierge",
    ],
    images: [
      { src: u("photo-1602002418816-5c0aeef426aa"), alt: "Sokhna view" },
      { src: u("photo-1502672023488-70e25813eb80"), alt: "Studio interior" },
    ],
    mapUrl: "https://www.google.com/maps?q=Il+Monte+Galala+Ain+Sokhna&output=embed",
  },
  {
    id: "p-010",
    slug: "chalet-fouka-bay",
    name: "Chalet — Fouka Bay",
    type: "Chalet",
    status: "Ready to Move",
    locationId: "ras-el-hekma",
    developerId: "tatweer-misr",
    bedrooms: 3,
    bathrooms: 3,
    areaSqm: 175,
    priceEGP: 14_200_000,
    description:
      "Second-row chalet at Fouka Bay's most active phase, with a step-down terrace and view across the inner lagoon.",
    amenities: [
      "Lagoon view",
      "Roof terrace",
      "Beach access",
      "Resort facilities",
    ],
    images: [
      { src: u("photo-1542640244-7e672d6cef4e"), alt: "Lagoon" },
      { src: u("photo-1560185007-cde436f6a4d0"), alt: "Chalet" },
    ],
    mapUrl:
      "https://www.google.com/maps?q=Fouka+Bay+Ras+El+Hekma&output=embed",
  },
  {
    id: "p-011",
    slug: "apartment-aliva-mostakbal",
    name: "Apartment — Aliva, Mostakbal City",
    type: "Apartment",
    status: "Off-Plan",
    locationId: "mostakbal",
    developerId: "mountain-view",
    bedrooms: 3,
    bathrooms: 2,
    areaSqm: 168,
    floor: 2,
    priceEGP: 8_750_000,
    deliveryYear: 2028,
    description:
      "An Aliva phase-one apartment with a long balcony and a layout that's optimised for natural cross-ventilation.",
    amenities: [
      "Balcony",
      "Compound park",
      "Underground parking",
      "Smart entry",
    ],
    images: [
      { src: u("photo-1582268611958-ebfd161ef9cf"), alt: "Aliva" },
      { src: u("photo-1493809842364-78817add7ffb"), alt: "Apartment" },
    ],
    mapUrl:
      "https://www.google.com/maps?q=Aliva+Mostakbal+City&output=embed",
  },
  {
    id: "p-012",
    slug: "land-il-bosco-new-capital",
    name: "Land Plot — IL Bosco, New Capital",
    type: "Land",
    status: "Ready to Move",
    locationId: "new-capital",
    developerId: "misr-italia",
    bedrooms: 0,
    bathrooms: 0,
    areaSqm: 850,
    priceEGP: 32_000_000,
    description:
      "A standalone plot inside IL Bosco's villa cluster — already serviced, with build approvals on the master plan.",
    amenities: [
      "Serviced plot",
      "Build-ready",
      "Compound infrastructure",
    ],
    images: [
      { src: u("photo-1465778893808-9b3d1b443be4"), alt: "Land" },
      { src: u("photo-1486325212027-8081e485255e"), alt: "Aerial" },
    ],
    mapUrl:
      "https://www.google.com/maps?q=IL+Bosco+New+Capital&output=embed",
  },
  {
    id: "p-013",
    slug: "villa-jefaira-ras-el-hekma",
    name: "Villa — Jefaira",
    type: "Villa",
    status: "Under Construction",
    locationId: "ras-el-hekma",
    developerId: "inertia",
    bedrooms: 4,
    bathrooms: 4,
    areaSqm: 410,
    priceEGP: 33_500_000,
    deliveryYear: 2026,
    description:
      "A standalone Jefaira villa on the marina spine — a calmer, design-led answer to the central coast circuit.",
    amenities: [
      "Marina view",
      "Private pool",
      "Beach club",
      "Boardwalk access",
      "Storage",
    ],
    images: [
      { src: u("photo-1505691938895-1758d7feb511"), alt: "Villa" },
      { src: u("photo-1519046904884-53103b34b206"), alt: "Coast" },
    ],
    mapUrl:
      "https://www.google.com/maps?q=Jefaira+Ras+El+Hekma&output=embed",
  },
  {
    id: "p-014",
    slug: "retail-ninety-five-east-cairo",
    name: "Retail Unit — Ninety Five Avenue",
    type: "Retail",
    status: "Ready to Move",
    locationId: "new-cairo",
    developerId: "lmd",
    bedrooms: 0,
    bathrooms: 1,
    areaSqm: 120,
    floor: 0,
    priceEGP: 19_500_000,
    description:
      "Ground-floor retail on Ninety Five Avenue's pedestrian strip — a high-footfall corner with full glass frontage.",
    amenities: [
      "High footfall",
      "Glass frontage",
      "Storage mezzanine",
      "Kitchenette",
    ],
    images: [
      { src: u("photo-1497366216548-37526070297c"), alt: "Retail" },
      { src: u("photo-1486406146926-c627a92ad1ab"), alt: "Strip" },
    ],
    mapUrl:
      "https://www.google.com/maps?q=Ninety+Five+Avenue+New+Cairo&output=embed",
  },
];

export function getProperty(slug: string) {
  return properties.find((p) => p.slug === slug);
}

export function getRelated(slug: string, count = 3) {
  const current = properties.find((p) => p.slug === slug);
  if (!current) return [];
  return properties
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.locationId === current.locationId || p.type === current.type)
    )
    .slice(0, count);
}
