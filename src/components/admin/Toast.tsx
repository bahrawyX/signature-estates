"use client";
import * as React from "react";
import { CheckCircle2, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastKind = "success" | "error";
export interface ToastMessage {
  id: number;
  kind: ToastKind;
  text: string;
}

interface ToastContextValue {
  push: (kind: ToastKind, text: string) => void;
}
const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const push = React.useCallback((kind: ToastKind, text: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, kind, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = (id: number) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "flex items-start gap-3 p-4 shadow-2xl border-l-4 bg-[var(--color-dark)] text-white animate-in slide-in-from-right-4",
              t.kind === "success" ? "border-[var(--color-gold)]" : "border-red-500",
            )}
          >
            {t.kind === "success" ? (
              <CheckCircle2 size={18} className="text-[var(--color-gold)] shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" />
            )}
            <p className="text-sm leading-relaxed flex-1">{t.text}</p>
            <button
              onClick={() => dismiss(t.id)}
              className="text-white/50 hover:text-white shrink-0"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
