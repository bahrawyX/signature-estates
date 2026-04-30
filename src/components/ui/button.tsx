import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-accent text-xs transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-gold)] disabled:opacity-40 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        gold:
          "bg-[var(--color-gold)] text-black hover:bg-[var(--color-gold-dark)] hover:text-black",
        ghost:
          "border border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-black",
        ghostLight:
          "border border-white/40 text-white hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]",
        dark:
          "bg-black text-white hover:bg-[var(--color-dark)]",
        link:
          "text-[var(--color-black)] gold-underline px-0 h-auto",
        outline:
          "border border-black/15 text-black hover:border-black",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-14 px-9 text-[11px]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
