import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Lightning,
  Shield,
  GitBranch,
  Cube,
  ArrowsLeftRight,
  Lock,
  Hexagon,
  Globe,
  ChartLineUp,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StatNumber from "../components/StatNumber";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: ArrowsLeftRight,
    title: "Cross-Chain Bridge Protocol",
    description:
      "Our proprietary bridge protocol enables seamless asset transfers across blockchain networks with sub-second finality and near-zero fees, powered by optimistic rollup technology.",
    color: "from-cyan-500 to-blue-600",
    tags: ["EVM Compatible", "ZK Proofs", "Layer 2"],
    img: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=700&q=80&auto=format&fit=crop",
  },
  {
    icon: Shield,
    title: "Decentralized Identity Layer",
    description:
      "A universal identity infrastructure that lets users own their credentials, reputation, and assets across every ecosystem — gaming, DeFi, and real estate alike.",
    color: "from-purple-500 to-violet-700",
    tags: ["Self-Sovereign", "W3C DID", "ZK Identity"],
    img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=700&q=80&auto=format&fit=crop",
  },
  {
    icon: Lightning,
    title: "High-Throughput Execution Engine",
    description:
      "A purpose-built virtual machine that processes 100,000+ TPS with deterministic finality, enabling real-time in-game transactions and DeFi operations at institutional scale.",
    color: "from-amber-500 to-orange-600",
    tags: ["100K TPS", "Deterministic", "EVM+ Compatible"],
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80&auto=format&fit=crop",
  },
  {
    icon: GitBranch,
    title: "Modular Smart Contract SDK",
    description:
      "Composable on-chain modules that developers can mix and match to build cross-ecosystem dApps with built-in governance, tokenomics, and liquidity primitives.",
    color: "from-emerald-500 to-teal-600",
    tags: ["Open Source", "Composable", "Audited"],
    img: "https://images.unsplash.com/photo-1624953587687-daf255b6b80a?w=700&q=80&auto=format&fit=crop",
  },
];

const stats = [
  { icon: ChartLineUp, value: "100K+", label: "Transactions per second" },
  { icon: Globe, value: "12+", label: "Blockchains supported" },
  { icon: Lock, value: "99.98%", label: "Network uptime" },
  { icon: Hexagon, value: "<0.001$", label: "Average tx fee" },
];

const stack = [
  { layer: "Application Layer", desc: "SDK · dApp Framework · Developer Tools", bg: "bg-accent/20 border-accent/40" },
  { layer: "Identity Layer", desc: "DID Registry · Credential Vault · Reputation Graph", bg: "bg-purple-500/20 border-purple-500/40" },
  { layer: "Bridge Layer", desc: "Cross-Chain Router · Optimistic Rollup · ZK Proofs", bg: "bg-cyan-500/20 border-cyan-500/40" },
  { layer: "Execution Layer", desc: "EVM+ Runtime · Parallel Execution · State Channels", bg: "bg-amber-500/20 border-amber-500/40" },
  { layer: "Consensus Layer", desc: "PoS Validators · BFT Finality · Slashing Logic", bg: "bg-emerald-500/20 border-emerald-500/40" },
  { layer: "Data Layer", desc: "Decentralized Storage · IPFS Integration · On-chain Indexing", bg: "bg-rose-500/20 border-rose-500/40" },
];

export default function TechnologyPage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".pillar-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ".pillars-grid", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".stack-row",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: stackRef.current, start: "top 80%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Technology - DeCruiz Labs | Advanced Web3 Infrastructure</title>
        <meta name="description" content="Explore DeCruiz Labs' core technology pillars: cross-chain bridge protocol, decentralized identity, high-throughput execution engine, and modular architecture for Web3 interoperability." />
        <meta name="keywords" content="Web3 technology, blockchain infrastructure, cross-chain bridge, decentralized identity, high-throughput engine, modular architecture" />
        <link rel="canonical" href="https://decruizlabs.com/technology" />
        <meta property="og:title" content="Technology - DeCruiz Labs" />
        <meta property="og:description" content="Advanced Web3 infrastructure for seamless interoperability across gaming, DeFi, and real estate." />
        <meta property="og:url" content="https://decruizlabs.com/technology" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Technology - DeCruiz Labs" />
        <meta name="twitter:description" content="Advanced Web3 infrastructure for seamless interoperability." />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground font-sans">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-8">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&q=80&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div ref={heroRef} className="relative z-10 max-w-5xl mx-auto text-center opacity-0">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-200 mb-8 cursor-pointer text-sm font-mono"
          >
            <ArrowLeft size={16} weight="bold" />
            Back to Home
          </button>

          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs uppercase tracking-widest mb-6">
            <Cube size={12} weight="fill" />
            Our Technology
          </span>

          <h1
            className="text-foreground font-bold text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-6"
            style={{ letterSpacing: "-0.03em", lineHeight: "1.1" }}
          >
            Infrastructure Built{" "}
            <span className="bg-gradient-1 bg-clip-text text-transparent">
              for Web3&#39;s Future
            </span>
          </h1>
          <p className="text-muted-foreground font-serif text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            DeCruiz Labs&#39; proprietary technology stack powers seamless interoperability across
            gaming, DeFi, and real estate — combining cutting-edge cryptography, modular
            architecture, and battle-tested consensus mechanisms.
          </p>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="p-4 rounded-xl bg-card border border-border flex flex-col items-center gap-2"
              >
                <Icon size={22} weight="fill" className="text-accent" />
                <StatNumber raw={value} className="text-foreground font-bold font-mono text-2xl block" duration={2.2} />
                <span className="text-muted-foreground font-sans text-xs text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technology Pillars ── */}
      <section className="py-24 px-8 bg-gradient-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-foreground font-bold text-3xl md:text-4xl tracking-tight mb-4">
              Core Technology Pillars
            </h2>
            <p className="text-muted-foreground font-serif text-lg max-w-2xl mx-auto">
              Four foundational layers that make cross-ecosystem Web3 a reality.
            </p>
          </div>

          <div className="pillars-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map(({ icon: Icon, title, description, color, tags, img }) => (
              <div
                key={title}
                className="pillar-card group rounded-2xl overflow-hidden bg-card border border-border hover:border-accent/30 transition-all duration-300 shadow-xl hover:shadow-accent/10 opacity-0"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  <div
                    className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon size={24} weight="fill" className="text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-foreground font-bold text-xl mb-3">{title}</h3>
                  <p className="text-muted-foreground font-serif text-sm leading-relaxed mb-4">
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full bg-muted border border-border text-muted-foreground font-mono text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture Stack ── */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto" ref={stackRef}>
          <div className="text-center mb-16">
            <h2 className="text-foreground font-bold text-3xl md:text-4xl tracking-tight mb-4">
              The DeCruiz Stack
            </h2>
            <p className="text-muted-foreground font-serif text-lg max-w-2xl mx-auto">
              A fully modular, layered architecture designed for composability and scale.
            </p>
          </div>

          <div className="relative space-y-3">
            {/* Vertical connector */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-accent via-purple-500 to-rose-500 opacity-40 hidden md:block" />

            {stack.map(({ layer, desc, bg }) => (
              <div
                key={layer}
                className={`stack-row opacity-0 relative flex items-start gap-4 p-5 rounded-xl border ${bg} ml-0 md:ml-4 transition-all duration-300 hover:translate-x-1`}
              >
                <div className="w-3 h-3 rounded-full bg-accent mt-1.5 flex-shrink-0 hidden md:block" />
                <div>
                  <div className="text-foreground font-bold font-mono text-sm mb-0.5">{layer}</div>
                  <div className="text-muted-foreground font-sans text-xs">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-8 bg-gradient-2 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-foreground font-bold text-3xl md:text-4xl tracking-tight mb-4">
            Ready to Build on DeCruiz?
          </h2>
          <p className="text-muted-foreground font-serif text-lg mb-8">
            Access our developer SDK, audit reports, and technical documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3.5 rounded-xl bg-cta-primary text-cta-primary-foreground font-sans font-medium hover:opacity-90 transition-opacity duration-200 cursor-pointer"
            >
              Get Early Access
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3.5 rounded-xl bg-card border border-border text-foreground font-sans font-medium hover:border-accent/40 transition-colors duration-200 cursor-pointer"
            >
              Read Whitepaper
            </button>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
