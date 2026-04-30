import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, Eye, Compass, Handshake } from "lucide-react";
import { StatsBar } from "@/components/StatsBar";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { NewsletterStrip } from "@/components/NewsletterStrip";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: "Signature Estates is a private real-estate house representing buyers across Egypt's most considered neighbourhoods.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)]">
                About Signature Estates
              </span>
              <h1 className="mt-5 font-display text-5xl md:text-6xl lg:text-8xl text-balance leading-[0.98]">
                A short story about <em className="font-display text-[var(--color-gold)]">where you'll live next.</em>
              </h1>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <p className="text-base lg:text-lg text-black/70 leading-relaxed">
                Signature Estates was founded in 2010 around a small idea: that the most useful
                thing a real-estate house could do for its buyers was the homework.
                Fifteen years later, we've represented Egyptian and international
                clients across more than 1,200 transactions — and the brief hasn't
                changed.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <div className="relative aspect-[16/8] overflow-hidden grain">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2400&q=85&auto=format&fit=crop"
                alt="A premium Egyptian residence"
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      <StatsBar />

      {/* Mission & Vision */}
      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal>
            <span className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)]">Mission</span>
            <h2 className="mt-5 font-display text-4xl lg:text-5xl text-balance leading-[1.05]">
              The shortlist is the product.
            </h2>
            <p className="mt-6 text-[var(--color-gray)] leading-relaxed text-pretty">
              Egypt has more property than any single buyer should ever see. Our job
              is to translate a brief into four or five places — and to be honest
              about which one we'd actually buy if it were our money.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <span className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)]">Vision</span>
            <h2 className="mt-5 font-display text-4xl lg:text-5xl text-balance leading-[1.05]">
              The most trusted name in Egyptian property.
            </h2>
            <p className="mt-6 text-[var(--color-gray)] leading-relaxed text-pretty">
              Trust compounds. We measure ourselves on the second purchase, the
              referral, the call from the client's son or daughter ten years later.
              Everything else is a side-effect.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Method */}
      <section className="bg-[var(--color-cream-dark)] py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="The Signature Method"
            title={<>Three meetings. One short list. The right place.</>}
            description="The same operating model for every brief — from a first apartment to a portfolio purchase."
            align="center"
            className="mb-20"
          />
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10">
            {[
              { n: "01", t: "Brief", d: "We map your timeline, balance sheet and use-case before showing you a single property. Most engagements start over a single 90-minute conversation." },
              { n: "02", t: "Curate", d: "We return with four or five options across two or three locations. Every option includes the case for it — and the case against." },
              { n: "03", t: "Close", d: "We negotiate, structure the payment plan, and stay involved through handover. The relationship is designed to outlast the transaction." },
            ].map((s) => (
              <StaggerItem key={s.n}>
                <div className="bg-[var(--color-cream)] p-10 lg:p-12 h-full">
                  <p className="font-display text-7xl text-[var(--color-gold)]">{s.n}</p>
                  <h3 className="mt-6 font-display text-3xl">{s.t}</h3>
                  <p className="mt-4 text-[var(--color-gray)] leading-relaxed text-pretty">{s.d}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="The Team"
            title="A small bench of senior advisors."
            description="No call centre. No commission-only juniors. Every brief sits with a senior advisor from first call to handover."
            className="mb-16"
          />
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Yasmine El Sharkawy", role: "Founding Partner", img: "photo-1573496359142-b8d87734a5a2" },
              { name: "Karim Hosny", role: "Head of New Cairo", img: "photo-1500648767791-00dcc994a43e" },
              { name: "Mariam Saleh", role: "Head of Coast", img: "photo-1580489944761-15a19d654956" },
              { name: "Tarek Abdelaziz", role: "Head of Commercial", img: "photo-1472099645785-5658abf4ff4e" },
            ].map((m, i) => (
              <StaggerItem key={m.name}>
                <Reveal delay={i * 0.05}>
                  <div className="group">
                    <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-cream-dark)]">
                      <Image
                        src={`https://images.unsplash.com/${m.img}?w=900&auto=format&fit=crop`}
                        alt={m.name}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-5 font-display text-2xl">{m.name}</h3>
                    <p className="font-accent text-[10px] tracking-[0.22em] text-[var(--color-gold-dark)] mt-1">
                      {m.role}
                    </p>
                  </div>
                </Reveal>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Awards */}
      <section className="bg-black text-white grain py-20 overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <p className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold)] text-center mb-12">
              Recognition
            </p>
          </Reveal>
          <div className="overflow-hidden">
            <div className="flex items-center gap-16 lg:gap-24 marquee-track whitespace-nowrap">
              {[...Array(2)].flatMap((_, dup) => [
                "BREAA · Best Boutique Agency 2024",
                "Forbes Egypt · 30 Under 30",
                "Euromoney · Best Real Estate Advisors",
                "BREAA · Brokerage of the Year",
                "Egypt Real Estate · Brand of the Year",
                "Cityscape · Innovation Award",
              ].map((a, i) => (
                <div
                  key={`${dup}-${i}`}
                  className="inline-flex items-center gap-3 font-accent text-[11px] tracking-[0.22em] text-white/55"
                >
                  <Award size={16} className="text-[var(--color-gold)]" />
                  {a}
                </div>
              )))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 text-center">
          <Reveal>
            <h2 className="font-display text-4xl lg:text-6xl text-balance">Have a brief in mind?</h2>
            <p className="mt-5 max-w-xl mx-auto text-[var(--color-gray)] leading-relaxed">
              We answer every enquiry within one working day. There's no obligation in a first conversation.
            </p>
            <div className="mt-10 inline-flex flex-wrap gap-4 justify-center">
              <Button asChild variant="gold" size="lg">
                <Link href="/contact">Speak to an Advisor</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/properties">Browse Properties</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <NewsletterStrip />
    </>
  );
}
