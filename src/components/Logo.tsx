import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
  /** "dark" = logo sits on a dark background (hero/footer) — no wrapper needed.
   *  "light" = logo sits on cream/white — wrap in dark pill so the black-bg mark reads cleanly. */
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}

export function Logo({ href = "/", className, variant = "dark", size = "md" }: LogoProps) {
  const heights: Record<NonNullable<LogoProps["size"]>, string> = {
    sm: "h-10",
    md: "h-[52px]",
    lg: "h-20",
  };

  return (
    <Link
      href={href}
      aria-label="Signature Estates — Home"
      className={cn(
        "inline-block shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-gold)]",
        className
      )}
    >
      <div
        className={cn(
          "transition-all duration-300",
          variant === "light" && "bg-[var(--color-black)] px-2 py-1"
        )}
      >
        <Image
          src="/logo.png"
          alt="Signature Estates"
          width={200}
          height={100}
          className={cn(heights[size], "w-auto object-contain")}
          priority
        />
      </div>
    </Link>
  );
}
