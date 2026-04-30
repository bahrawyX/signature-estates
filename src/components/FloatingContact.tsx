"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingContact() {
  const pathname = usePathname();
  const [expanded, setExpanded] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  // Hide on the contact page itself, and on the admin panel
  const isContactPage = pathname === "/contact";
  const isAdminPage = pathname.startsWith("/admin");

  // Fade in after a short delay on mount
  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Collapse when navigating away
  React.useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  if (isContactPage || isAdminPage) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3 transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      {/* Expanded panel */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-400 origin-bottom-right",
          expanded
            ? "opacity-100 scale-100 max-h-64"
            : "opacity-0 scale-95 max-h-0 pointer-events-none"
        )}
      >
        <div className="bg-[var(--color-dark)] border border-[var(--color-gold)]/30 shadow-2xl p-6 flex flex-col gap-4">
          <p className="font-display text-white text-lg leading-snug">
            Ready to find your property?
          </p>
          <p className="font-sans text-[var(--color-gray-light)] text-sm leading-relaxed">
            Our advisors are available 7 days a week.
          </p>
          <div className="gold-rule" />
          <div className="flex flex-col gap-2">
            <Link
              href="/contact"
              onClick={() => setExpanded(false)}
              className="flex items-center justify-center gap-2 bg-[var(--color-gold)] text-black font-accent text-[10px] tracking-[0.22em] uppercase px-5 py-3 hover:bg-[var(--color-gold-dark)] transition-colors"
            >
              Send a Message
            </Link>
            <a
              href="tel:+20226149000"
              className="flex items-center justify-center gap-2 border border-white/15 text-white font-accent text-[10px] tracking-[0.22em] uppercase px-5 py-3 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>

      {/* Trigger button */}
      <button
        onClick={() => setExpanded((v) => !v)}
        aria-label={expanded ? "Close contact panel" : "Contact us"}
        className={cn(
          "group flex items-center gap-3 shadow-xl transition-all duration-300",
          expanded
            ? "bg-[var(--color-dark)] border border-[var(--color-gold)]/40 px-4 py-3"
            : "bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] px-5 py-3.5"
        )}
      >
        {/* Label — only when collapsed */}
        {!expanded && (
          <span className="font-accent text-[10px] tracking-[0.22em] uppercase text-black whitespace-nowrap">
            Contact Us
          </span>
        )}

        {/* Icon */}
        <span className={cn("transition-transform duration-300", expanded ? "text-white" : "text-black")}>
          {expanded ? <X size={16} /> : <MessageCircle size={16} />}
        </span>
      </button>
    </div>
  );
}
