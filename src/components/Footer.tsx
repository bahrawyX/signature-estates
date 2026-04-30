import Link from "next/link";
import { Instagram, Facebook, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";

const COL_PROPERTY = [
  { href: "/properties?type=Apartment", label: "Apartments" },
  { href: "/properties?type=Villa", label: "Villas" },
  { href: "/properties?type=Penthouse", label: "Penthouses" },
  { href: "/properties?type=Chalet", label: "Chalets" },
  { href: "/properties?type=Office", label: "Offices" },
  { href: "/properties?type=Land", label: "Land" },
];

const COL_LOCATION = [
  { href: "/properties?location=new-cairo", label: "New Cairo" },
  { href: "/properties?location=sheikh-zayed", label: "Sheikh Zayed" },
  { href: "/properties?location=north-coast-sidi", label: "North Coast" },
  { href: "/properties?location=ras-el-hekma", label: "Ras El Hekma" },
  { href: "/properties?location=el-gouna", label: "El Gouna" },
  { href: "/properties?location=new-capital", label: "New Capital" },
];

const COL_COMPANY = [
  { href: "/about", label: "About Signature Estates" },
  { href: "/news", label: "Editorial" },
  { href: "/contact", label: "Contact" },
  { href: "/contact", label: "Register Interest" },
];

export function Footer() {
  return (
    <footer className="relative bg-[var(--color-black)] text-[var(--color-cream)] grain overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-8 text-[15px] leading-relaxed text-white/70 max-w-sm">
              Signature Estates is a private real-estate house representing buyers across Egypt's
              finest addresses — from the central North Coast to New Cairo, the New
              Capital and the Red Sea.
            </p>
            <div className="mt-8 space-y-3 text-sm text-white/65">
              <p className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 text-[var(--color-gold)]" />
                Cairo Festival City, Boulevard Tower, New Cairo
              </p>
              <p className="flex items-center gap-3">
                <Phone size={15} className="text-[var(--color-gold)]" />
                +20 2 2614 9000
              </p>
              <p className="flex items-center gap-3">
                <Mail size={15} className="text-[var(--color-gold)]" />
                concierge@signatureestates.eg
              </p>
            </div>
          </div>

          <FooterCol title="Property" items={COL_PROPERTY} />
          <FooterCol title="Locations" items={COL_LOCATION} />
          <FooterCol title="Signature Estates" items={COL_COMPANY} />
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="font-accent text-[10px] tracking-[0.2em] text-white/45">
            © {new Date().getFullYear()} Signature Estates Egypt. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-white/55">
            <a href="#" aria-label="Instagram" className="hover:text-[var(--color-gold)] transition-colors"><Instagram size={16} /></a>
            <a href="#" aria-label="Facebook" className="hover:text-[var(--color-gold)] transition-colors"><Facebook size={16} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[var(--color-gold)] transition-colors"><Linkedin size={16} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-[var(--color-gold)] transition-colors"><Twitter size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div className="lg:col-span-2 lg:col-start-auto">
      <h4 className="font-accent text-[10px] tracking-[0.22em] text-[var(--color-gold)] mb-6">
        {title}
      </h4>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.href + it.label}>
            <Link href={it.href} className="text-sm text-white/70 hover:text-white transition-colors">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
