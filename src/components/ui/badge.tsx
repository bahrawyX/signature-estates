import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-accent text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border",
  {
    variants: {
      variant: {
        gold: "bg-[var(--color-gold)] text-black border-[var(--color-gold)]",
        outline: "bg-white/90 text-black border-black/20 backdrop-blur-sm",
        dark: "bg-black text-white border-black",
        ghost: "border-white/40 text-white",
      },
    },
    defaultVariants: { variant: "outline" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
