import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
  /** "dark" = logo on dark/hero bg  → gold logo (logo.png)
   *  "light" = logo on cream/white  → black logo (logoDark.png) */
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}

export function Logo({ href = "/", className, variant = "dark", size = "md" }: LogoProps) {
  const heights: Record<NonNullable<LogoProps["size"]>, string> = {
    sm: "h-16",
    md: "h-[100px]",
    lg: "h-32",
  };

  const src = variant === "light" ? "/logoDark.png" : "/logo.png";

  return (
    <Link
      href={href}
      aria-label="Signature Estates — Home"
      className={cn(
        "inline-block shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-gold)]",
        className
      )}
    >
      <Image
        src={src}
        alt="Signature Estates"
        width={320}
        height={160}
        className={cn(heights[size], "w-auto object-contain transition-all duration-300")}
        priority
      />
    </Link>
  );
}
