import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Buildings,
  Coins,
  ChartLineUp,
  ArrowsLeftRight,
  FileText,
  ShieldCheck,
  ArrowRight,
  House,
  Globe,
  Users,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Coins size={28} weight="duotone" />,
    title: "Fractional Ownership",
    description:
      "Purchase fractions of premium real estate starting from any amount. Blockchain tokenization removes the six-figure barrier to property investment.",
  },
  {
    icon: <ArrowsLeftRight size={28} weight="duotone" />,
    title: "Instant Liquidity",
    description:
      "Trade property tokens on DeCruiz&#39;s DEX 24/7. No brokers, no month-long settlement windows — just instant, on-chain transfers.",
  },
  {
    icon: <FileText size={28} weight="duotone" />,
    title: "Smart Contract Leases",
    description:
      "Rental agreements, rent collection, and profit distribution execute automatically via audited smart contracts — zero manual overhead.",
  },
  {
    icon: <ChartLineUp size={28} weight="duotone" />,
    title: "On-Chain Valuations",
    description:
      "Real-time property valuations powered by oracle networks and on-chain market data — fully transparent, manipulation-resistant pricing.",
  },
  {
    icon: <ShieldCheck size={28} weight="duotone" />,
    title: "Regulatory Compliance",
    description:
      "Built-in KYC/AML layers and jurisdiction-aware token logic ensure every RWA token meets local regulatory requirements.",
  },
  {
    icon: <Globe size={28} weight="duotone" />,
    title: "Global Access",
    description:
      "Invest in real estate across any market from anywhere in the world. Geography is no longer a barrier to property diversification.",
  },
];

const stats = [
  { value: "$326T", label: "Global Real Estate Value" },
  { value: "<1%", label: "Tokenized Today" },
  { value: "24/7", label: "Market Availability" },
  { value: "$500+", label: "Min. Investment" },
];

const propertyTypes = [
  {
    type: "Residential",
    icon: <House size={32} weight="duotone" />,
    description: "Single-family homes, condos, and apartment buildings tokenized for fractional co-ownership.",
    yield: "4–7% avg. yield",
  },
  {
    type: "Commercial",
    icon: <Buildings size={32} weight="duotone" />,
    description: "Office towers, retail centers, and industrial parks accessible to any sized investor.",
    yield: "6–10% avg. yield",
  },
  {
    type: "Development",
    icon: <ChartLineUp size={32} weight="duotone" />,
    description: "Pre-construction projects funded via tokenized equity — higher risk, higher reward.",
    yield: "10–20% target return",
  },
  {
    type: "Global Portfolio",
    icon: <Globe size={32} weight="duotone" />,
    description: "Diversified, professionally managed baskets of international real estate tokens.",
    yield: "5–9% avg. yield",
  },
];

export default function RealEstatePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: featuresRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".type-card",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: typesRef.current, start: "top 80%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden px-8 py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,9,24,0.65) 0%, rgba(6,9,24,0.82) 60%, rgba(6,9,24,1) 100%)" }} />
          <div className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(circle at 50% 60%, #7c3aed 0%, transparent 55%), radial-gradient(circle at 10% 20%, #06b6d4 0%, transparent 55%)" }}
          />
        </div>
        <div ref={heroRef} className="relative max-w-7xl mx-auto opacity-0">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 border border-accent/40 text-accent">
              <Buildings size={28} weight="duotone" />
            </span>
            <span className="text-accent font-mono text-sm uppercase tracking-widest">Industry Focus</span>
          </div>
          <h1 className="font-bold font-sans text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-6 max-w-4xl"
            style={{ letterSpacing: "-0.03em" }}>
            <span className="bg-gradient-1 bg-clip-text text-transparent">Real Estate</span>{" "}
            Meets Web3
          </h1>
          <p className="text-muted-foreground font-serif text-xl max-w-2xl leading-relaxed mb-8">
            DeCruiz Labs is tokenizing the world&#39;s largest asset class — making real property
            as easy to own, trade, and leverage as any cryptocurrency.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-sans font-semibold text-sm hover:opacity-90 transition-opacity">
              How It Works <ArrowRight size={16} weight="bold" />
            </a>
            <a href="#types"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-sans font-semibold text-sm hover:bg-card transition-colors">
              Property Types
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-20 px-8 bg-card/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="stat-card opacity-0 text-center p-6 rounded-xl bg-card border border-border">
              <div className="text-4xl font-bold font-sans bg-gradient-1 bg-clip-text text-transparent mb-2">{s.value}</div>
              <div className="text-muted-foreground font-sans text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" ref={featuresRef} className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">How It Works</span>
            <h2 className="text-foreground font-bold font-sans text-3xl md:text-4xl mb-4" style={{ letterSpacing: "-0.025em" }}>
              Tokenization{" "}
              <span className="bg-gradient-1 bg-clip-text text-transparent">Infrastructure</span>
            </h2>
            <p className="text-muted-foreground font-serif text-lg max-w-2xl mx-auto">
              Every layer of the real estate stack reimagined for the on-chain era.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="feature-card opacity-0 p-6 rounded-xl bg-card border border-border hover:border-accent/40 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                  {f.icon}
                </div>
                <h3 className="text-foreground font-bold font-sans text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: f.description }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Banner */}
      <section className="py-0 px-8 mb-24">
        <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden relative h-72 md:h-96">
          <img
            src="https://c.animaapp.com/mnw8opdnaQC9xY/img/ai_5.png"
            alt="Real estate tokenization"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent flex items-center px-10">
            <div>
              <Users size={40} weight="duotone" className="text-accent mb-4" />
              <h3 className="text-foreground font-bold font-sans text-2xl md:text-3xl max-w-sm leading-tight" style={{ letterSpacing: "-0.025em" }}>
                Property ownership democratized for everyone
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section id="types" ref={typesRef} className="py-24 px-8 bg-gradient-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">What We Tokenize</span>
            <h2 className="text-foreground font-bold font-sans text-3xl md:text-4xl mb-4" style={{ letterSpacing: "-0.025em" }}>
              Property{" "}
              <span className="bg-gradient-1 bg-clip-text text-transparent">Categories</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {propertyTypes.map((p) => (
              <div key={p.type} className="type-card opacity-0 p-6 rounded-xl bg-card border border-border hover:border-accent/40 transition-colors">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    {p.icon}
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold font-sans text-base">{p.type}</h4>
                    <span className="text-accent font-mono text-xs">{p.yield}</span>
                  </div>
                </div>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <Buildings size={48} weight="duotone" className="text-accent mx-auto mb-6" />
          <h2 className="text-foreground font-bold font-sans text-3xl md:text-4xl mb-4" style={{ letterSpacing: "-0.025em" }}>
            Ready to tokenize{" "}
            <span className="bg-gradient-1 bg-clip-text text-transparent">real-world property?</span>
          </h2>
          <p className="text-muted-foreground font-serif text-lg mb-8">
            Partner with DeCruiz Labs to bring real estate assets onto the blockchain.
          </p>
          <a href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-sans font-semibold text-base hover:opacity-90 transition-opacity">
            Get in Touch <ArrowRight size={18} weight="bold" />
          </a>
        </div>
      </section>
    </div>
  );
}
