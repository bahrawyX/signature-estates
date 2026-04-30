import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className = "",
}: {
  eyebrow?: string;
  title: string | React.ReactNode;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "text-center mx-auto max-w-3xl", className)}>
      {eyebrow && (
        <Reveal>
          <div className={cn("inline-flex items-center gap-3 mb-5", align === "center" && "justify-center")}>
            <span className="block w-8 h-px bg-[var(--color-gold)]" />
            <span className={cn("font-accent text-[10px] tracking-[0.3em]", light ? "text-[var(--color-gold-light)]" : "text-[var(--color-gold-dark)]")}>
              {eyebrow}
            </span>
          </div>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2 className={cn("font-display text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.05]", light && "text-white")}>
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.2}>
          <p className={cn("mt-5 max-w-2xl text-base lg:text-lg leading-relaxed", align === "center" && "mx-auto", light ? "text-white/65" : "text-[var(--color-gray)]")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
