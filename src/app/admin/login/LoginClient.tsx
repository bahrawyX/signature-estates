"use client";
import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/admin";

  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Could not sign in.");
        setSubmitting(false);
        return;
      }
      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-dark)] grain text-white relative flex items-center justify-center px-6 py-12">
      <div className="relative w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <p className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold)]">
              Signature Estates
            </p>
            <p className="mt-2 font-display text-3xl">Admin Panel</p>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[var(--color-cream)] text-black p-8 lg:p-10 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-[var(--color-gold)]/15 text-[var(--color-gold-dark)] flex items-center justify-center">
              <Lock size={16} />
            </div>
            <div>
              <h1 className="font-display text-xl leading-tight">Sign in to continue</h1>
              <p className="text-xs text-[var(--color-gray)]">
                Enter the admin password to manage content.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  autoFocus
                  required
                  disabled={submitting}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[var(--color-gray)] hover:text-black"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-700 bg-red-50 border-l-2 border-red-600 px-3 py-2">
                {error}
              </p>
            )}

            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign In"}
            </Button>
          </form>
        </div>

        <p className="text-center mt-8 font-accent text-[9px] tracking-[0.22em] text-white/40">
          Authorised personnel only · Estate-grade encryption
        </p>
      </div>
    </div>
  );
}

export function LoginClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--color-dark)] flex items-center justify-center text-white/60">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
