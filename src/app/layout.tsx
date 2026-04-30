import type { Metadata, Viewport } from "next";
import { Playfair_Display, Raleway, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GoldCursor } from "@/components/GoldCursor";
import { LenisProvider } from "@/components/LenisProvider";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Raleway({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const accent = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-accent",
  weight: ["300", "400", "600"],
  display: "swap",
});

const SITE_URL = "https://signatureestates.eg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Signature Estates — Egypt's Finest Addresses",
    template: "%s · Signature Estates",
  },
  description:
    "Signature Estates is a private real-estate house representing buyers across Egypt's finest addresses — from the central North Coast to New Cairo, the New Capital and the Red Sea.",
  keywords: [
    "Egypt real estate",
    "New Cairo properties",
    "North Coast villa",
    "Sahel chalet",
    "El Gouna",
    "New Administrative Capital",
    "Sheikh Zayed",
    "Ras El Hekma",
    "Signature Estates Egypt",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Signature Estates — Egypt's Finest Addresses",
    description:
      "Curated residential and commercial properties across Egypt's most considered neighbourhoods.",
    url: SITE_URL,
    siteName: "Signature Estates",
    locale: "en_EG",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Signature Estates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Signature Estates — Egypt's Finest Addresses",
    description: "Egypt's curated property house — North Coast, New Cairo, the Red Sea.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${accent.variable}`}>
      <body className="bg-[var(--color-cream)] text-[var(--color-black)] font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-black focus:text-white focus:px-4 focus:py-2 font-accent text-[10px] tracking-[0.2em]"
        >
          Skip to content
        </a>
        <LenisProvider>
          <GoldCursor />
          <Navbar />
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </LenisProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Signature Estates",
              url: SITE_URL,
              areaServed: "Egypt",
              telephone: "+20 2 2614 9000",
              email: "concierge@signatureestates.eg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Cairo Festival City, Boulevard Tower",
                addressLocality: "New Cairo",
                addressCountry: "EG",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
