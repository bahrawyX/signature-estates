import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Investment Plans",
  description:
    "Flexible payment plans, ROI analysis and investment strategies for Egyptian real estate — guided by Signature Estates.",
};

const PLANS = [
  {
    title: "Cash Purchase",
    subtitle: "Maximum leverage, minimum cost",
    description:
      "Secure the best unit prices and negotiate exclusive discounts. Cash buyers gain priority access to limited-release inventory before public launch.",
    features: ["Up to 15% cash discount", "Priority unit selection", "Fastest title transfer", "No financial exposure"],
    highlight: false,
  },
  {
    title: "Developer Instalment",
    subtitle: "Spread payments, preserve capital",
    description:
      "Most Egyptian developers offer 5–10 year payment plans with 10–20% down payment. We negotiate the best terms on your behalf across all 12 partner developers.",
    features: ["10–20% down payment", "5–10 year instalments", "0% bank interest", "Flexible quarterly schedule"],
    highlight: true,
  },
  {
    title: "Bank Mortgage",
    subtitle: "Leverage Egyptian banking",
    description:
      "Access EGP-denominated mortgage products through our banking partners. Ideal for ready-to-move units with immediate rental income potential.",
    features: ["Up to 85% LTV", "15–20 year terms", "Fixed & variable rates", "Pre-approval in 72 hours"],
    highlight: false,
  },
  {
    title: "Off-Plan Investment",
    subtitle: "Buy at launch, sell at delivery",
    description:
      "Capture capital appreciation between reservation and delivery — typically 40–80% over a 3–5 year construction period in high-demand locations.",
    features: ["Lowest entry price", "High capital upside", "Minimal holding costs", "Resale before delivery"],
    highlight: false,
  },
  {
    title: "Buy-to-Let",
    subtitle: "Steady rental yield strategy",
    description:
      "Target 8–14% gross rental yields in premium compounds. We identify the highest-demand unit types, sizes and locations for maximum occupancy.",
    features: ["8–14% gross yield", "Property management", "Tenant sourcing", "Yield optimisation"],
    highlight: false,
  },
  {
    title: "Portfolio Build",
    subtitle: "Multi-unit diversification",
    description:
      "Build a diversified Egyptian property portfolio across locations, developers and asset classes. Access bulk pricing and priority allocation.",
    features: ["Multi-unit pricing", "Cross-location spread", "Dedicated advisor", "Quarterly review"],
    highlight: false,
  },
];

const FAQS = [
  {
    q: "Can foreigners buy property in Egypt?",
    a: "Yes. Foreign nationals can purchase freehold property in Egypt. Certain locations (near borders, military zones) require approval, but all properties in our portfolio are fully available to international buyers.",
  },
  {
    q: "What is the typical payment plan structure?",
    a: "Most off-plan projects offer 10–20% down payment with quarterly instalments over 5–10 years. Some developers offer 5% reservations. We advise on the optimal structure for your liquidity profile.",
  },
  {
    q: "What currency can I transact in?",
    a: "Transactions are in Egyptian Pounds (EGP). Some developments offer USD-pegged pricing. We can guide you on hedging strategies and the right timing for currency conversion.",
  },
  {
    q: "How long does the buying process take?",
    a: "From reservation to contract signing: typically 2–4 weeks. Title registration for completed units: 3–6 months. Our concierge team manages the full process on your behalf.",
  },
];

export default function InvestmentPlansPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-36 lg:pt-44 pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <span className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)]">
              Financial Strategy
            </span>
            <h1 className="mt-4 font-display text-5xl md:text-6xl lg:text-7xl text-balance leading-[1.02]">
              Six ways to own <em className="text-[var(--color-gold)]">Egyptian</em> real estate.
            </h1>
            <p className="mt-6 max-w-2xl text-base lg:text-lg text-[var(--color-gray)] leading-relaxed">
              Whether you're a first-time buyer, seasoned investor or building a portfolio,
              we structure each acquisition around your capital position and return objectives.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="gold-rule mx-6 lg:mx-12" />

      {/* ── Plans Grid ───────────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PLANS.map((plan) => (
              <StaggerItem key={plan.title}>
                <div
                  className={`flex flex-col h-full p-8 border transition-all duration-300 ${
                    plan.highlight
                      ? "border-[var(--color-gold)] bg-[var(--color-dark)] text-white"
                      : "border-black/10 bg-white hover:border-[var(--color-gold)]"
                  }`}
                >
                  {plan.highlight && (
                    <span className="self-start mb-4 font-accent text-[9px] tracking-[0.25em] bg-[var(--color-gold)] text-black px-3 py-1 uppercase">
                      Most Popular
                    </span>
                  )}
                  <h2
                    className={`font-display text-2xl leading-tight ${
                      plan.highlight ? "text-white" : "text-[var(--color-black)]"
                    }`}
                  >
                    {plan.title}
                  </h2>
                  <p
                    className={`mt-1 font-accent text-[10px] tracking-[0.2em] uppercase ${
                      plan.highlight ? "text-[var(--color-gold-light)]" : "text-[var(--color-gold-dark)]"
                    }`}
                  >
                    {plan.subtitle}
                  </p>
                  <p
                    className={`mt-4 text-sm leading-relaxed ${
                      plan.highlight ? "text-white/70" : "text-[var(--color-gray)]"
                    }`}
                  >
                    {plan.description}
                  </p>
                  <ul className="mt-6 flex flex-col gap-2 flex-1">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-center gap-3 text-sm ${
                          plan.highlight ? "text-white/80" : "text-[var(--color-black)]"
                        }`}
                      >
                        <span
                          className={`w-4 h-px flex-shrink-0 ${
                            plan.highlight ? "bg-[var(--color-gold)]" : "bg-[var(--color-gold-dark)]"
                          }`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className={`inline-flex items-center gap-2 font-accent text-[10px] tracking-[0.22em] uppercase px-6 py-3 transition-colors ${
                        plan.highlight
                          ? "bg-[var(--color-gold)] text-black hover:bg-[var(--color-gold-dark)]"
                          : "border border-black/20 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                      }`}
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 border-t border-black/8">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <span className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)]">
              Common Questions
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance">
              Buyer's questions, answered.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {FAQS.map((faq) => (
              <Reveal key={faq.q}>
                <div className="flex flex-col gap-3 border-l-2 border-[var(--color-gold)] pl-6">
                  <h3 className="font-display text-xl">{faq.q}</h3>
                  <p className="text-[var(--color-gray)] leading-relaxed text-sm">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-[var(--color-dark)] grain py-20 lg:py-28 relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 text-center relative z-10">
          <Reveal>
            <span className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)]">
              Start Your Journey
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-white text-balance">
              One conversation. The right property.
            </h2>
            <p className="mt-5 text-[var(--color-gray-light)] max-w-xl mx-auto">
              Our advisors work across all six investment structures. Tell us your budget,
              timeline and goals — we'll match you to the right opportunity.
            </p>
            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[var(--color-gold)] text-black font-accent text-[10px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-[var(--color-gold-dark)] transition-colors"
              >
                Book a Consultation
              </Link>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-accent text-[10px] tracking-[0.22em] uppercase px-8 py-4 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
              >
                Browse Properties
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
