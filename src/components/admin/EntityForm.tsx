"use client";
import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EntityFormShellProps {
  title: string;
  subtitle?: string;
  backHref: string;
  backLabel?: string;
  previewHref?: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  saving?: boolean;
  primaryLabel?: string;
  secondaryLabel?: string;
  onSecondary?: () => void;
  error?: string | null;
}

export function EntityFormShell({
  title,
  subtitle,
  backHref,
  backLabel = "Back",
  previewHref,
  children,
  onSubmit,
  saving = false,
  primaryLabel = "Save",
  secondaryLabel,
  onSecondary,
  error,
}: EntityFormShellProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 font-accent text-[10px] tracking-[0.22em] text-[var(--color-gray)] hover:text-[var(--color-gold)] transition-colors mb-3"
          >
            <ArrowLeft size={12} />
            {backLabel}
          </Link>
          <h1 className="font-display text-3xl lg:text-4xl">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-sm text-[var(--color-gray)]">{subtitle}</p>
          )}
        </div>
        {previewHref && (
          <Link
            href={previewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-accent text-[10px] tracking-[0.22em] text-[var(--color-gold-dark)] hover:text-[var(--color-gold)] gold-underline self-start"
          >
            Open Preview ↗
          </Link>
        )}
      </div>

      {error && (
        <div className="border-l-4 border-red-600 bg-red-50 px-5 py-4 text-sm text-red-800">
          {error}
        </div>
      )}

      {/* Body */}
      <div className="space-y-10">{children}</div>

      {/* Sticky footer */}
      <div className="sticky bottom-0 bg-[var(--color-cream)]/95 backdrop-blur-md border-t border-black/8 -mx-6 lg:-mx-10 px-6 lg:px-10 py-4 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
        <Link
          href={backHref}
          className="font-accent text-[10px] tracking-[0.22em] text-[var(--color-gray)] hover:text-black transition-colors py-3 px-2 sm:px-0 sm:mr-4"
        >
          Cancel
        </Link>
        {secondaryLabel && onSecondary && (
          <Button type="button" variant="outline" onClick={onSecondary} disabled={saving}>
            {secondaryLabel}
          </Button>
        )}
        <Button type="submit" variant="gold" disabled={saving}>
          {saving ? "Saving…" : primaryLabel}
        </Button>
      </div>
    </form>
  );
}

export function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 pb-10 border-b border-black/8 last:border-b-0 last:pb-0">
      <div className="lg:col-span-4">
        <h2 className="font-display text-xl lg:text-2xl">{title}</h2>
        {description && (
          <p className="mt-2 text-sm text-[var(--color-gray)] leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="lg:col-span-8 space-y-5">{children}</div>
    </section>
  );
}

export function FormGrid({
  children,
  cols = 2,
  className,
}: {
  children: React.ReactNode;
  cols?: 1 | 2 | 3;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-5",
        cols === 1 && "grid-cols-1",
        cols === 2 && "grid-cols-1 sm:grid-cols-2",
        cols === 3 && "grid-cols-1 sm:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
