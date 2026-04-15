import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Animated hero canvas — hexagonal lattice + floating particles ─────────
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Hexagon grid
    type Hex = { x: number; y: number; size: number; alpha: number; dAlpha: number; color: string };
    const COLORS = ["#f472b6", "#e879f9", "#a78bfa", "#818cf8", "#f9a8d4"];
    const hexes: Hex[] = [];
    const hexSize = 36;
    const cols = Math.ceil(canvas.width / (hexSize * 1.73)) + 2;
    const rows = Math.ceil(canvas.height / (hexSize * 1.5)) + 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const offset = r % 2 === 0 ? 0 : hexSize * 0.866;
        hexes.push({
          x: c * hexSize * 1.73 + offset,
          y: r * hexSize * 1.5,
          size: hexSize,
          alpha: Math.random() * 0.08 + 0.02,
          dAlpha: (Math.random() - 0.5) * 0.0015,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    }

    // Floating particles
    type Particle = { x: number; y: number; vx: number; vy: number; r: number; color: string };
    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    function drawHex(x: number, y: number, size: number) {
      ctx!.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        i === 0 ? ctx!.moveTo(px, py) : ctx!.lineTo(px, py);
      }
      ctx!.closePath();
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Hexes
      hexes.forEach((h) => {
        h.alpha += h.dAlpha;
        if (h.alpha <= 0.015 || h.alpha >= 0.12) h.dAlpha *= -1;
        ctx.globalAlpha = h.alpha;
        ctx.strokeStyle = h.color;
        ctx.lineWidth = 0.8;
        drawHex(h.x, h.y, h.size);
        ctx.stroke();
      });

      // Particles + connections
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = (1 - d / 120) * 0.22;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
        const p = particles[i];
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        // glow
        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        // move
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
}

// ── Data ─────────────────────────────────────────────────────────────────
const MODULES = [
  {
    id: "multi-utility",
    icon: "◈",
    title: "Multi-Utility NFT Design",
    desc: "Architect NFTs that carry multiple utility layers — access rights, reward triggers, in-game items, and identity markers — all within a single token standard.",
    highlights: ["ERC-721 / ERC-1155 hybrid", "layered metadata", "dynamic trait updates", "utility binding"],
    color: "#f472b6",
  },
  {
    id: "royalties",
    icon: "◎",
    title: "Marketplace Royalties",
    desc: "Enforce on-chain royalty splits across secondary sales with fully programmable fee routing to creators, DAOs, and treasury pools.",
    highlights: ["on-chain enforcement", "EIP-2981 compliant", "split royalties", "creator dashboards"],
    color: "#e879f9",
  },
  {
    id: "access-control",
    icon: "⬡",
    title: "Access Control NFTs",
    desc: "Gate content, experiences, and APIs behind token ownership. Issue time-limited passes, tiered membership NFTs, and protocol-level permission tokens.",
    highlights: ["token-gating APIs", "time-bound passes", "tiered membership", "on-chain verification"],
    color: "#a78bfa",
  },
  {
    id: "collateralization",
    icon: "◇",
    title: "NFT Collateralization",
    desc: "Unlock liquidity from idle assets. Enable NFT holders to collateralize blue-chip collections or RWA-backed NFTs for instant DeFi lending positions.",
    highlights: ["floor-price oracles", "instant loans", "liquidation protection", "peer-to-peer lending"],
    color: "#818cf8",
  },
  {
    id: "portability",
    icon: "⬢",
    title: "Item Portability Across Games",
    desc: "Bridge in-game assets across multiple titles and chains. Players carry their items, skins, and progression through a universal asset registry.",
    highlights: ["cross-game bridges", "universal registry", "metadata preservation", "multi-chain sync"],
    color: "#f9a8d4",
  },
  {
    id: "ticketing",
    icon: "◉",
    title: "Event Ticketing",
    desc: "Issue verifiable event tickets as NFTs with smart check-in, anti-scalping transfer rules, and post-event collectible conversion built in.",
    highlights: ["smart check-in", "transfer restrictions", "post-event collectibles", "fraud prevention"],
    color: "#f472b6",
  },
  {
    id: "loyalty",
    icon: "✦",
    title: "Loyalty Badges",
    desc: "Reward user behaviour with soulbound or transferable loyalty badges that unlock tiers, discounts, and exclusive content across your ecosystem.",
    highlights: ["soulbound tokens", "tier unlocks", "reward triggers", "ecosystem-wide perks"],
    color: "#e879f9",
  },
  {
    id: "dashboards",
    icon: "▦",
    title: "Creator Royalty Dashboards",
    desc: "Give creators real-time visibility into royalty flows, secondary market volume, and holder analytics through a purpose-built creator portal.",
    highlights: ["real-time analytics", "holder maps", "royalty forecasting", "payout history"],
    color: "#a78bfa",
  },
];

const USE_CASES = [
  {
    id: "membership",
    label: "Membership Ecosystems",
    icon: "◈",
    color: "#f472b6",
    summary: "NFT passes that grant tiered access to communities, products, and exclusive drops — with perks that evolve as holders engage.",
    metrics: [
      { label: "Avg. holder retention", value: "78%" },
      { label: "Tier upgrade rate", value: "3.2×" },
      { label: "Secondary volume lift", value: "+55%" },
    ],
    detail: "Issue genesis, standard, and premium membership NFTs. Each tier unlocks different features — early access, private channels, discounted fees, or governance votes. Built-in renewal mechanics keep holders active long-term.",
  },
  {
    id: "metaverse",
    label: "Metaverse Assets",
    icon: "⬢",
    color: "#e879f9",
    summary: "Wearables, land parcels, and avatar equipment that travel across virtual worlds with provenance, rarity, and on-chain lineage preserved.",
    metrics: [
      { label: "Cross-world asset moves", value: "40K/mo" },
      { label: "Avg. resale premium", value: "2.8×" },
      { label: "Composable layers", value: "12+" },
    ],
    detail: "Deploy interoperable asset standards that metaverse platforms can natively read. Bind provenance, creation date, and ownership history into each token. Enable layered composability so items can be combined, upgraded, or dismantled.",
  },
  {
    id: "token-gated",
    label: "Token-Gated Communities",
    icon: "⬡",
    color: "#a78bfa",
    summary: "Gate Discord servers, dApps, newsletters, and live events behind NFT ownership — with real-time on-chain verification at every entry point.",
    metrics: [
      { label: "Verification latency", value: "<200ms" },
      { label: "Supported gate types", value: "9" },
      { label: "Successful gated logins", value: "1.2M+" },
    ],
    detail: "One SDK to gate any surface — social platforms, streaming, SaaS tools, or physical venues. Token gate by collection, trait, staking status, or bundle. Revocation happens automatically on transfer with no manual admin.",
  },
  {
    id: "defi",
    label: "Premium DeFi Access",
    icon: "◉",
    color: "#818cf8",
    summary: "Holders of specific NFTs unlock reduced protocol fees, higher yield allocations, priority liquidation protection, and VIP trading routes.",
    metrics: [
      { label: "Fee reduction", value: "Up to 60%" },
      { label: "Yield boost", value: "+12-18bps" },
      { label: "Protocols integrated", value: "14+" },
    ],
    detail: "Compose NFT-gated DeFi mechanics directly into your protocol contracts. Validate holder status at swap, stake, or borrow time. Use time-locked NFTs that grant seasonal DeFi benefits, driving cyclical demand for your token collection.",
  },
];

const TECH_STACK = [
  { name: "ERC-721 / ERC-1155", role: "Token Standards" },
  { name: "ERC-4907", role: "Renewable NFTs" },
  { name: "EIP-2981", role: "Royalty Standard" },
  { name: "ERC-6551", role: "Token-Bound Accounts" },
  { name: "IPFS / Arweave", role: "Decentralised Storage" },
  { name: "Chainlink VRF", role: "Verifiable Randomness" },
  { name: "OpenSea SDK", role: "Marketplace Integration" },
  { name: "Polygon zkEVM", role: "L2 Scaling" },
];

// ── Component ─────────────────────────────────────────────────────────────
export default function NftUtilityPage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const outcomeRef = useRef<HTMLDivElement>(null);

  const [activeCase, setActiveCase] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text
      gsap.fromTo(
        heroTextRef.current?.querySelectorAll(".hero-line") ?? [],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.2 }
      );

      // Stats strip
      gsap.fromTo(
        statsRef.current?.querySelectorAll(".stat-item") ?? [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" } }
      );

      // Module cards
      gsap.fromTo(
        modulesRef.current?.querySelectorAll(".module-card") ?? [],
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.08, ease: "back.out(1.2)",
          scrollTrigger: { trigger: modulesRef.current, start: "top 78%" } }
      );

      // Use-cases section
      gsap.fromTo(
        useCasesRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: useCasesRef.current, start: "top 80%" } }
      );

      // Tech stack
      gsap.fromTo(
        techRef.current?.querySelectorAll(".tech-item") ?? [],
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.06,
          scrollTrigger: { trigger: techRef.current, start: "top 82%" } }
      );

      // Outcome
      gsap.fromTo(
        outcomeRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: outcomeRef.current, start: "top 82%" } }
      );
    });
    return () => ctx.revert();
  }, []);

  const current = USE_CASES[activeCase];

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, hsl(270,60%,6%) 0%, hsl(240,60%,8%) 50%, hsl(270,60%,6%) 100%)" }}
    >
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[88vh] flex items-center justify-center overflow-hidden px-6 pt-24 pb-16"
      >
        <HeroCanvas />

        {/* Glow blooms */}
        <div className="pointer-events-none absolute top-1/4 left-1/3 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(244,114,182,0.12) 0%, transparent 65%)" }} />
        <div className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(167,139,250,0.10) 0%, transparent 65%)" }} />

        {/* Grid overlay */}
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />

        <div ref={heroTextRef} className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="hero-line inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-6"
            style={{ color: "#f472b6" }}>
            <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, #f472b6)" }} />
            Asset Layer · NFT Infrastructure
            <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, #f472b6, transparent)" }} />
          </div>

          <h1
            className="hero-line font-bold font-sans leading-none mb-6"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", letterSpacing: "-0.04em", color: "#fdf0ff" }}
          >
            Transform NFTs into{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #f472b6 0%, #e879f9 40%, #a78bfa 100%)" }}>
              cross-platform utility
            </span>{" "}
            assets
          </h1>

          <p className="hero-line font-serif text-lg md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto"
            style={{ color: "rgba(220,200,255,0.78)" }}>
            Build NFT ecosystems that go beyond collectibles — powering access control,
            liquidity, cross-game portability, and persistent digital identity across every platform.
          </p>

          <div className="hero-line flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-3.5 rounded-full font-sans font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #f472b6 0%, #e879f9 60%, #a78bfa 100%)",
                color: "#fff",
                boxShadow: "0 0 32px rgba(244,114,182,0.45)",
              }}
            >
              Launch NFT Program
            </button>
            <button
              onClick={() => navigate("/docs")}
              className="px-8 py-3.5 rounded-full font-sans font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(244,114,182,0.08)",
                border: "1px solid rgba(244,114,182,0.35)",
                color: "#f9a8d4",
                backdropFilter: "blur(12px)",
              }}
            >
              View NFT Docs
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-10 rounded-full animate-pulse"
            style={{ background: "linear-gradient(180deg, #f472b6, transparent)" }} />
          <span className="text-[10px] font-mono tracking-widest" style={{ color: "#f472b6" }}>SCROLL</span>
        </div>
      </section>

      {/* ── STAT STRIP ───────────────────────────────────────────────── */}
      <div ref={statsRef}
        className="relative border-y py-8"
        style={{ borderColor: "rgba(244,114,182,0.15)", background: "rgba(10,5,20,0.7)", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "8", label: "Utility modules", sub: "fully composable" },
            { value: "14+", label: "Protocol integrations", sub: "EVM-compatible" },
            { value: "0", label: "Royalty escrow delays", sub: "instant on-chain" },
            { value: "∞", label: "Asset lifetime", sub: "beyond collectibles" },
          ].map((s) => (
            <div key={s.label} className="stat-item text-center">
              <div className="font-bold font-sans text-3xl mb-0.5"
                style={{ background: "linear-gradient(135deg, #f472b6, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {s.value}
              </div>
              <div className="text-sm font-sans" style={{ color: "rgba(220,200,255,0.85)" }}>{s.label}</div>
              <div className="text-[11px] font-mono mt-0.5" style={{ color: "rgba(244,114,182,0.6)" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ARCHITECTURE MODULES ─────────────────────────────────────── */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-4"
              style={{ color: "#f472b6" }}>
              <span className="w-5 h-px" style={{ background: "linear-gradient(90deg, transparent, #f472b6)" }} />
              Architecture Modules
              <span className="w-5 h-px" style={{ background: "linear-gradient(90deg, #f472b6, transparent)" }} />
            </span>
            <h2 className="font-bold font-sans text-3xl md:text-4xl mb-3" style={{ color: "#fdf0ff", letterSpacing: "-0.03em" }}>
              Eight pillars of NFT infrastructure
            </h2>
            <p className="font-serif text-base max-w-2xl mx-auto" style={{ color: "rgba(220,200,255,0.65)" }}>
              Every component is independently deployable and composable within the DeCruiz asset layer.
            </p>
          </div>

          <div ref={modulesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MODULES.map((m) => (
              <div
                key={m.id}
                className="module-card group relative rounded-2xl p-5 transition-all duration-300 cursor-default"
                style={{
                  background: "rgba(15,8,30,0.65)",
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${m.color}28`,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = `1px solid ${m.color}55`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px ${m.color}25, 0 0 0 1px ${m.color}30`;
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = `1px solid ${m.color}28`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.35)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                {/* Top shimmer line */}
                <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${m.color}70, transparent)` }} />

                {/* Icon */}
                <div className="flex items-center justify-center w-11 h-11 rounded-xl mb-4"
                  style={{ background: `${m.color}12`, border: `1px solid ${m.color}35` }}>
                  <span className="text-xl" style={{ color: m.color }}>{m.icon}</span>
                </div>

                <h3 className="font-bold font-sans text-sm mb-2 leading-snug" style={{ color: "#fdf0ff" }}>
                  {m.title}
                </h3>
                <p className="text-xs font-sans leading-relaxed mb-4" style={{ color: "rgba(200,185,230,0.68)" }}>
                  {m.desc}
                </p>

                <ul className="flex flex-col gap-1.5">
                  {m.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-[11px] font-sans"
                      style={{ color: "rgba(220,200,255,0.75)" }}>
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ background: m.color }} />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Pulse dot */}
                <div className="absolute bottom-3.5 right-3.5">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: m.color, boxShadow: `0 0 6px ${m.color}` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ────────────────────────────────────────────────── */}
      <section
        ref={useCasesRef}
        className="relative py-24 px-6"
        style={{ background: "rgba(8,4,20,0.6)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-4"
              style={{ color: "#e879f9" }}>
              <span className="w-5 h-px" style={{ background: "linear-gradient(90deg, transparent, #e879f9)" }} />
              Use Cases
              <span className="w-5 h-px" style={{ background: "linear-gradient(90deg, #e879f9, transparent)" }} />
            </span>
            <h2 className="font-bold font-sans text-3xl md:text-4xl mb-3" style={{ color: "#fdf0ff", letterSpacing: "-0.03em" }}>
              NFTs that work everywhere
            </h2>
            <p className="font-serif text-base max-w-xl mx-auto" style={{ color: "rgba(220,200,255,0.65)" }}>
              Explore the verticals where our NFT infrastructure creates compounding asset value.
            </p>
          </div>

          {/* Selector tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {USE_CASES.map((uc, i) => (
              <button
                key={uc.id}
                onClick={() => setActiveCase(i)}
                className="px-5 py-2 rounded-full text-sm font-sans font-medium transition-all duration-300"
                style={
                  activeCase === i
                    ? { background: `linear-gradient(135deg, ${uc.color}22, ${uc.color}38)`, border: `1px solid ${uc.color}70`, color: uc.color, boxShadow: `0 0 20px ${uc.color}30` }
                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(220,200,255,0.6)" }
                }
              >
                <span className="mr-1.5">{uc.icon}</span>
                {uc.label}
              </button>
            ))}
          </div>

          {/* Active case panel */}
          <div
            className="rounded-2xl p-8 md:p-10 transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, ${current.color}08 0%, rgba(10,5,20,0.85) 60%)`,
              border: `1px solid ${current.color}35`,
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl text-2xl"
                    style={{ background: `${current.color}15`, border: `1px solid ${current.color}40` }}>
                    {current.icon}
                  </div>
                  <div>
                    <h3 className="font-bold font-sans text-xl" style={{ color: "#fdf0ff" }}>{current.label}</h3>
                    <span className="text-xs font-mono" style={{ color: `${current.color}` }}>Active use case</span>
                  </div>
                </div>
                <p className="font-serif text-base leading-relaxed mb-5" style={{ color: "rgba(220,200,255,0.8)" }}>
                  {current.summary}
                </p>
                <p className="text-sm font-sans leading-relaxed" style={{ color: "rgba(200,185,230,0.65)" }}>
                  {current.detail}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 gap-4">
                {current.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex items-center justify-between rounded-xl px-5 py-4"
                    style={{ background: `${current.color}0a`, border: `1px solid ${current.color}22` }}
                  >
                    <span className="text-sm font-sans" style={{ color: "rgba(220,200,255,0.75)" }}>{m.label}</span>
                    <span className="text-xl font-bold font-sans" style={{ color: current.color }}>{m.value}</span>
                  </div>
                ))}
                <button
                  onClick={() => navigate("/contact")}
                  className="mt-2 w-full py-3 rounded-xl font-sans font-semibold text-sm transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${current.color}22, ${current.color}40)`,
                    border: `1px solid ${current.color}55`,
                    color: current.color,
                  }}
                >
                  Explore this use case →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────────── */}
      <section ref={techRef} className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-bold font-sans text-2xl md:text-3xl mb-2" style={{ color: "#fdf0ff", letterSpacing: "-0.03em" }}>
              Standards & Integrations
            </h2>
            <p className="font-serif text-sm" style={{ color: "rgba(220,200,255,0.55)" }}>
              Built on battle-tested NFT standards with best-in-class tooling.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TECH_STACK.map((t) => (
              <div
                key={t.name}
                className="tech-item flex flex-col items-center text-center rounded-xl p-4 transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: "rgba(15,8,30,0.6)",
                  border: "1px solid rgba(244,114,182,0.15)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="w-2 h-2 rounded-full mb-3 animate-pulse"
                  style={{ background: "#f472b6", boxShadow: "0 0 8px #f472b6" }} />
                <span className="font-mono text-sm font-semibold mb-0.5" style={{ color: "#f9a8d4" }}>{t.name}</span>
                <span className="text-[11px] font-sans" style={{ color: "rgba(200,185,230,0.55)" }}>{t.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUSINESS OUTCOME ─────────────────────────────────────────── */}
      <section ref={outcomeRef} className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden p-10 md:p-14 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(244,114,182,0.10) 0%, rgba(167,139,250,0.08) 50%, rgba(15,8,30,0.9) 100%)",
              border: "1px solid rgba(244,114,182,0.25)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Decorative glow */}
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full"
              style={{ background: "radial-gradient(ellipse, rgba(244,114,182,0.18) 0%, transparent 70%)" }} />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-6"
                style={{ color: "#f472b6" }}>
                <span className="w-5 h-px" style={{ background: "linear-gradient(90deg, transparent, #f472b6)" }} />
                Business Outcome
                <span className="w-5 h-px" style={{ background: "linear-gradient(90deg, #f472b6, transparent)" }} />
              </span>

              <h2 className="font-bold font-sans mb-5 leading-tight"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em", color: "#fdf0ff" }}>
                Expand asset lifetime value{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #f472b6, #e879f9, #a78bfa)" }}>
                  beyond collectibles
                </span>
              </h2>

              <p className="font-serif text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
                style={{ color: "rgba(220,200,255,0.72)" }}>
                Create always-on NFT utility that drives engagement, secondary volume, and protocol
                revenue — turning every token into a living asset within your ecosystem.
              </p>

              {/* Outcome metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {[
                  { value: "4×", label: "Avg. holder lifetime value vs. non-utility PFP", color: "#f472b6" },
                  { value: "+70%", label: "Secondary market volume lift from royalty enforcement", color: "#e879f9" },
                  { value: "5min", label: "Time-to-gate any surface with NFT access control SDK", color: "#a78bfa" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl p-5"
                    style={{
                      background: `${m.color}0a`,
                      border: `1px solid ${m.color}25`,
                    }}
                  >
                    <div className="font-bold font-sans text-3xl mb-1"
                      style={{ color: m.color }}>
                      {m.value}
                    </div>
                    <div className="text-xs font-sans leading-relaxed" style={{ color: "rgba(220,200,255,0.65)" }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => navigate("/contact")}
                  className="px-9 py-3.5 rounded-full font-sans font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    background: "linear-gradient(135deg, #f472b6 0%, #e879f9 60%, #a78bfa 100%)",
                    color: "#fff",
                    boxShadow: "0 0 32px rgba(244,114,182,0.40)",
                  }}
                >
                  Build your NFT program
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="px-9 py-3.5 rounded-full font-sans font-semibold text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(244,114,182,0.07)",
                    border: "1px solid rgba(244,114,182,0.30)",
                    color: "#f9a8d4",
                  }}
                >
                  ← Back to Ecosystem
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
