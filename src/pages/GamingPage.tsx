import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GameController,
  CurrencyDollar,
  Globe,
  Lightning,
  ShieldCheck,
  Users,
  ArrowRight,
  Sword,
  Trophy,
  Coins,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Sword size={28} weight="duotone" />,
    title: "True Asset Ownership",
    description:
      "Every in-game item is a blockchain token. Your sword, skin, or land plot lives in your wallet — not on a company server that can be shut down.",
  },
  {
    icon: <Globe size={28} weight="duotone" />,
    title: "Cross-Game Interoperability",
    description:
      "Bring your rare items from one game universe to another. DeCruiz&#39;s unified asset layer makes cross-game portability a reality.",
  },
  {
    icon: <CurrencyDollar size={28} weight="duotone" />,
    title: "Play-to-Earn Economy",
    description:
      "Convert in-game achievements into real DeFi yield. Stake gaming assets, earn rewards, and participate in a thriving token economy.",
  },
  {
    icon: <Lightning size={28} weight="duotone" />,
    title: "Low-Latency Settlement",
    description:
      "Trades and transfers settle in milliseconds on DeCruiz&#39;s high-throughput layer — no lag, no failed transactions during peak play.",
  },
  {
    icon: <ShieldCheck size={28} weight="duotone" />,
    title: "Anti-Fraud & Provenance",
    description:
      "On-chain provenance ensures every asset is verifiably authentic. Counterfeit items and duplication exploits become impossible.",
  },
  {
    icon: <Users size={28} weight="duotone" />,
    title: "Guild & DAO Tooling",
    description:
      "Create gaming guilds backed by smart contracts. Share treasury, vote on strategies, and distribute earnings transparently.",
  },
];

const stats = [
  { value: "50M+", label: "Gamers Addressable" },
  { value: "$200B", label: "Gaming Market Size" },
  { value: "<10ms", label: "Settlement Latency" },
  { value: "100K+", label: "Daily Transactions" },
];

const roadmap = [
  {
    phase: "Phase 1",
    title: "Asset Bridge Launch",
    description: "Connect top Web3 game studios to the DeCruiz asset layer.",
    done: true,
  },
  {
    phase: "Phase 2",
    title: "Cross-Game Marketplace",
    description: "Unified marketplace for trading assets across game universes.",
    done: true,
  },
  {
    phase: "Phase 3",
    title: "DeFi Collateral Integration",
    description: "Use gaming NFTs as collateral in DeCruiz lending protocols.",
    done: false,
  },
  {
    phase: "Phase 4",
    title: "Guild DAO Framework",
    description: "Full DAO tooling for gaming guilds with on-chain governance.",
    done: false,
  },
];

export default function GamingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);

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
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: featuresRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".roadmap-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: roadmapRef.current, start: "top 80%" },
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
            src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1600&q=80&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,9,24,0.65) 0%, rgba(6,9,24,0.82) 60%, rgba(6,9,24,1) 100%)" }} />
          <div className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #7c3aed 0%, transparent 60%), radial-gradient(circle at 70% 30%, #06b6d4 0%, transparent 60%)" }}
          />
        </div>
        <div ref={heroRef} className="relative max-w-7xl mx-auto opacity-0">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 border border-accent/40 text-accent">
              <GameController size={28} weight="duotone" />
            </span>
            <span className="text-accent font-mono text-sm uppercase tracking-widest">Industry Focus</span>
          </div>
          <h1 className="font-bold font-sans text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-6 max-w-4xl"
            style={{ letterSpacing: "-0.03em" }}>
            The Future of{" "}
            <span className="bg-gradient-1 bg-clip-text text-transparent">Gaming</span>{" "}
            is On‑Chain
          </h1>
          <p className="text-muted-foreground font-serif text-xl max-w-2xl leading-relaxed mb-8">
            DeCruiz Labs is building the infrastructure for true player ownership —
            where in-game assets carry real-world value and travel freely across every game universe.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-sans font-semibold text-sm hover:opacity-90 transition-opacity">
              Explore Features <ArrowRight size={16} weight="bold" />
            </a>
            <a href="#roadmap"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-sans font-semibold text-sm hover:bg-card transition-colors">
              View Roadmap
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
            <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">What We&#39;re Building</span>
            <h2 className="text-foreground font-bold font-sans text-3xl md:text-4xl leading-tight mb-4" style={{ letterSpacing: "-0.025em" }}>
              Core Gaming{" "}
              <span className="bg-gradient-1 bg-clip-text text-transparent">Capabilities</span>
            </h2>
            <p className="text-muted-foreground font-serif text-lg max-w-2xl mx-auto">
              Every feature is designed to give players real power over their digital lives.
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
            src="https://c.animaapp.com/mnw8opdnaQC9xY/img/ai_4.png"
            alt="Gaming DeFi visualization"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent flex items-center px-10">
            <div>
              <Trophy size={40} weight="duotone" className="text-accent mb-4" />
              <h3 className="text-foreground font-bold font-sans text-2xl md:text-3xl max-w-sm leading-tight" style={{ letterSpacing: "-0.025em" }}>
                Where skill meets sovereignty
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" ref={roadmapRef} className="py-24 px-8 bg-gradient-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">Progress</span>
            <h2 className="text-foreground font-bold font-sans text-3xl md:text-4xl mb-4" style={{ letterSpacing: "-0.025em" }}>
              Gaming{" "}
              <span className="bg-gradient-1 bg-clip-text text-transparent">Roadmap</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {roadmap.map((item) => (
              <div key={item.phase} className="roadmap-item opacity-0 p-6 rounded-xl bg-card border border-border flex gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold font-mono text-sm ${item.done ? "bg-accent text-white" : "bg-card border-2 border-border text-muted-foreground"}`}>
                  {item.done ? "✓" : "○"}
                </div>
                <div>
                  <span className="text-accent font-mono text-xs uppercase tracking-widest">{item.phase}</span>
                  <h4 className="text-foreground font-bold font-sans text-base mt-1 mb-1">{item.title}</h4>
                  <p className="text-muted-foreground font-sans text-sm">{item.description}</p>
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
            Ready to build the{" "}
            <span className="bg-gradient-1 bg-clip-text text-transparent">next gaming frontier?</span>
          </h2>
          <p className="text-muted-foreground font-serif text-lg mb-8">
            Partner with DeCruiz Labs to integrate true asset ownership into your game.
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
