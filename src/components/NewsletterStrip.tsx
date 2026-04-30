"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterStrip() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <section className="relative bg-black text-white grain overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative">
        <div className="lg:col-span-7">
          <span className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold)]">
            The List — Monthly
          </span>
          <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.05]">
            Off-market launches, before everyone else.
          </h2>
          <p className="mt-5 max-w-xl text-white/65 leading-relaxed">
            One short letter a month — first-look launches, market notes, and the
            single property our team would buy this quarter. No noise.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="lg:col-span-5"
        >
          {submitted ? (
            <div className="border border-[var(--color-gold)] p-8">
              <p className="font-display text-3xl">Thank you.</p>
              <p className="mt-2 text-white/70">
                You'll see the next edition in your inbox at the start of the month.
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-white border-white/30 placeholder:text-white/40 h-14 text-base"
              />
              <Button type="submit" variant="gold" size="lg">
                Subscribe
              </Button>
            </div>
          )}
          <p className="mt-3 font-accent text-[10px] tracking-[0.2em] text-white/35">
            One email a month. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </section>
  );
}
