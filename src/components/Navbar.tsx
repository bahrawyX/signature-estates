"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => setOpen(false), [pathname]);

  const onHero = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[var(--color-cream)]/95 backdrop-blur-md border-b border-black/8 py-4"
          : "py-7",
        onHero && "text-white"
      )}
    >
      <div className="mx-auto max-w-[1400px] px-8 lg:px-14 flex items-center justify-between gap-8">
        {/* dark hero bg → no wrapper (variant="dark"); scrolled cream bg → dark pill (variant="light") */}
        <Logo variant={onHero ? "dark" : "light"} size="md" />

        <nav className="hidden lg:flex items-center gap-10 xl:gap-12">
          {NAV.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-accent text-[10px] tracking-[0.24em] uppercase transition-colors duration-200",
                  active
                    ? "text-[var(--color-gold)]"
                    : onHero
                      ? "text-white/80 hover:text-[var(--color-gold)]"
                      : "text-black/65 hover:text-[var(--color-gold)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="gold" size="sm">
            <Link href="/contact">Register Interest</Link>
          </Button>
        </div>

        <button
          className="lg:hidden p-2 -mr-2"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-black/5 bg-[var(--color-cream)]">
          <div className="mx-auto max-w-[1400px] px-8 py-8 flex flex-col gap-5">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-3xl text-black"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="gold" className="mt-3 self-start">
              <Link href="/contact">Register Interest</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
