import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CurrencyDollar,
  ChartLineUp,
  ArrowsLeftRight,
  Lock,
  Lightning,
  Scales,
  ArrowRight,
  Bank,
  Vault,
  Coins,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <ArrowsLeftRight size={28} weight="duotone" />,
    title: "Cross-Asset Liquidity",
    description:
      "Unify gaming assets, tokenized real estate, and crypto into a single collateral pool — unlocking liquidity that legacy DeFi simply can&#39;t access.",
  },
  {
    icon: <Bank size={28} weight="duotone" />,
    title: "Smart Lending & Borrowing",
    description:
      "Borrow against your entire digital portfolio. DeCruiz&#39;s smart contracts evaluate multi-asset collateral in real time for optimal loan-to-value ratios.",
  },
  {
    icon: <ChartLineUp size={28} weight="duotone" />,
    title: "Yield Optimization",
    description:
      "Automated yield strategies route your assets to the highest-returning protocols across the ecosystem — maximizing returns with minimal manual effort.",
  },
  {
    icon: <Lock size={28} weight="duotone" />,
    title: "Non-Custodial Security",
    description:
      "You hold your keys. All DeFi operations on DeCruiz are fully non-custodial — no third party ever controls your assets.",
  },
  {
    icon: <Lightning size={28} weight="duotone" />,
    title: "Instant Settlement",
    description:
      "Sub-second finality on DeCruiz&#39;s layer means DeFi transactions confirm before traditional finance even processes a payment request.",
  },
  {
    icon: <Scales size={28} weight="duotone" />,
    title: "On-Chain Governance",
    description:
      "DeFi protocol parameters are governed by token holders. Propose, vote, and implement changes fully transparently on-chain.",
  },
];

const stats = [
  { value: "$4T+", label: "Total DeFi Market" },
  { value: "0.1s", label: "Settlement Time" },
  { value: "3x", label: "Collateral Efficiency" },
  { value: "99.9%", label: "Protocol Uptime" },
];

const protocols = [
  { name: "Lending Protocol", status: "Live", description: "Borrow and lend against multi-asset collateral at competitive rates." },
  { name: "DEX Aggregator", status: "Live", description: "Best-price swaps across all DeCruiz-connected liquidity pools." },
  { name: "Yield Vaults", status: "Beta", description: "Auto-compounding strategies optimized across gaming and RWA assets." },
  { name: "Derivatives Layer", status: "Coming Soon", description: "Perpetuals and options on tokenized real-world assets." },
];

export default function DefiPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const protocolsRef = useRef<HTMLDivElement>(null);

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
        ".protocol-card",
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: protocolsRef.current, start: "top 80%" },
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
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&q=80&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,9,24,0.65) 0%, rgba(6,9,24,0.82) 60%, rgba(6,9,24,1) 100%)" }} />
          <div className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #7c3aed 0%, transparent 60%), radial-gradient(circle at 20% 30%, #06b6d4 0%, transparent 60%)" }}
          />
        </div>
        <div ref={heroRef} className="relative max-w-7xl mx-auto opacity-0">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 border border-accent/40 text-accent">
              <CurrencyDollar size={28} weight="duotone" />
            </span>
            <span className="text-accent font-mono text-sm uppercase tracking-widest">Industry Focus</span>
          </div>
          <h1 className="font-bold font-sans text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-6 max-w-4xl"
            style={{ letterSpacing: "-0.03em" }}>
            <span className="bg-gradient-1 bg-clip-text text-transparent">DeFi</span>{" "}
            Without Borders
          </h1>
          <p className="text-muted-foreground font-serif text-xl max-w-2xl leading-relaxed mb-8">
            DeCruiz Labs removes the silos between asset classes — letting your gaming items,
            tokenized property, and crypto work together as unified, yield-generating capital.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-sans font-semibold text-sm hover:opacity-90 transition-opacity">
              Explore Protocols <ArrowRight size={16} weight="bold" />
            </a>
            <a href="#protocols"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-sans font-semibold text-sm hover:bg-card transition-colors">
              View Live Products
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
            <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">Capabilities</span>
            <h2 className="text-foreground font-bold font-sans text-3xl md:text-4xl mb-4" style={{ letterSpacing: "-0.025em" }}>
              Next-Gen{" "}
              <span className="bg-gradient-1 bg-clip-text text-transparent">DeFi Primitives</span>
            </h2>
            <p className="text-muted-foreground font-serif text-lg max-w-2xl mx-auto">
              Every protocol is designed around the reality that value doesn&#39;t live in just one asset class.
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
            src="https://c.animaapp.com/mnw8opdnaQC9xY/img/ai_3.png"
            alt="DeFi ecosystem visualization"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent flex items-center px-10">
            <div>
              <Vault size={40} weight="duotone" className="text-accent mb-4" />
              <h3 className="text-foreground font-bold font-sans text-2xl md:text-3xl max-w-sm leading-tight" style={{ letterSpacing: "-0.025em" }}>
                Liquidity that moves at the speed of thought
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Protocols */}
      <section id="protocols" ref={protocolsRef} className="py-24 px-8 bg-gradient-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">Products</span>
            <h2 className="text-foreground font-bold font-sans text-3xl md:text-4xl mb-4" style={{ letterSpacing: "-0.025em" }}>
              Live{" "}
              <span className="bg-gradient-1 bg-clip-text text-transparent">DeFi Protocols</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {protocols.map((p) => (
              <div key={p.name} className="protocol-card opacity-0 p-6 rounded-xl bg-card border border-border flex gap-4 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-foreground font-bold font-sans text-base">{p.name}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-semibold ${
                      p.status === "Live" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                      p.status === "Beta" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" :
                      "bg-accent/20 text-accent border border-accent/30"
                    }`}>{p.status}</span>
                  </div>
                  <p className="text-muted-foreground font-sans text-sm">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <Coins size={48} weight="duotone" className="text-accent mx-auto mb-6" />
          <h2 className="text-foreground font-bold font-sans text-3xl md:text-4xl mb-4" style={{ letterSpacing: "-0.025em" }}>
            Ready to unlock{" "}
            <span className="bg-gradient-1 bg-clip-text text-transparent">borderless liquidity?</span>
          </h2>
          <p className="text-muted-foreground font-serif text-lg mb-8">
            Integrate your protocol with DeCruiz&#39;s multi-asset DeFi infrastructure.
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
