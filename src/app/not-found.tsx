import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 text-center">
        <p className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)]">404</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl text-balance">
          We couldn't find that address.
        </h1>
        <p className="mt-5 max-w-lg mx-auto text-[var(--color-gray)]">
          The page you're looking for has moved, been retired, or never existed. The catalogue is the right place to start.
        </p>
        <div className="mt-10 inline-flex flex-wrap gap-3 justify-center">
          <Button asChild variant="gold" size="lg"><Link href="/properties">Browse Properties</Link></Button>
          <Button asChild variant="outline" size="lg"><Link href="/">Back to Home</Link></Button>
        </div>
      </div>
    </section>
  );
}
