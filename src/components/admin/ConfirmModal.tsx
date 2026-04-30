"use client";
import * as React from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => unknown | Promise<unknown>;
  onCancel: () => void;
  destructive?: boolean;
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  destructive = false,
}: ConfirmModalProps) {
  const [busy, setBusy] = React.useState(false);

  if (!open) return null;

  async function handleConfirm() {
    setBusy(true);
    try {
      await onConfirm();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={busy ? undefined : onCancel}
      />
      <div className="relative w-full max-w-md bg-white shadow-2xl">
        <button
          onClick={onCancel}
          disabled={busy}
          className="absolute top-4 right-4 text-black/40 hover:text-black disabled:opacity-30"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <div className="p-8">
          <div className="flex items-start gap-4">
            <div
              className={`shrink-0 w-10 h-10 flex items-center justify-center ${
                destructive ? "bg-red-50 text-red-600" : "bg-[var(--color-gold-light)]/30 text-[var(--color-gold-dark)]"
              }`}
            >
              <AlertTriangle size={18} />
            </div>
            <div>
              <h3 className="font-display text-2xl leading-tight">{title}</h3>
              <p className="mt-3 text-sm text-[var(--color-gray)] leading-relaxed">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-t border-black/8">
          <button
            onClick={onCancel}
            disabled={busy}
            className="flex-1 px-6 py-4 font-accent text-[10px] tracking-[0.22em] text-black/60 hover:text-black hover:bg-black/5 transition-colors disabled:opacity-30"
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            disabled={busy}
            className={`flex-1 px-6 py-4 font-accent text-[10px] tracking-[0.22em] transition-colors disabled:opacity-50 ${
              destructive
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-[var(--color-gold)] text-black hover:bg-[var(--color-gold-dark)]"
            }`}
          >
            {busy ? "Working…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// Re-export Button for convenience.
export { Button };
