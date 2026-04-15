import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// ── Canvas hero background ───────────────────────────────────────────────
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    type Ring = { x: number; y: number; r: number; maxR: number; speed: number; color: string; alpha: number };
    type Node = { x: number; y: number; vx: number; vy: number; r: number; color: string };

    const COLORS = ["#22d3ee", "#818cf8", "#34d399", "#a78bfa", "#f472b6"];

    const nodes: Node[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.2 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const rings: Ring[] = Array.from({ length: 6 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0,
      maxR: Math.random() * 120 + 60,
      speed: Math.random() * 0.5 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.08 + 0.03,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Expanding rings
      rings.forEach(ring => {
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color;
        ctx.globalAlpha = ring.alpha * (1 - ring.r / ring.maxR);
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ring.r += ring.speed;
        if (ring.r > ring.maxR) {
          ring.r = 0;
          ring.x = Math.random() * canvas.width;
          ring.y = Math.random() * canvas.height;
        }
      });

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = nodes[i].color;
            ctx.globalAlpha = (1 - dist / 130) * 0.16;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach(node => {
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

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
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.55 }} />
  );
}

// ── Architecture modules ─────────────────────────────────────────────────
const modules = [
  {
    icon: "⟳",
    title: "AMM Architecture",
    description: "Concentrated liquidity AMM pools with customisable fee tiers, tick-range management, and rebalancing hooks. Supports constant-product, stable, and weighted curve variants.",
    color: "#22d3ee",
    pills: ["concentrated liquidity", "custom fee tiers", "stable curves", "weighted pools"],
  },
  {
    icon: "◈",
    title: "Staking & Farming",
    description: "Single-sided and LP staking vaults with time-weighted reward accrual. Boost multipliers via governance token lock-up and tiered loyalty programmes.",
    color: "#34d399",
    pills: ["single-sided staking", "LP vaults", "boost multipliers", "time-weighted APY"],
  },
  {
    icon: "◎",
    title: "LP Incentives",
    description: "Configurable liquidity mining programmes with epoch-based distribution, bribe markets, and gauge voting so protocols can direct emissions efficiently.",
    color: "#818cf8",
    pills: ["epoch emissions", "gauge voting", "bribe markets", "merkle distribution"],
  },
  {
    icon: "◇",
    title: "Launchpad Integration",
    description: "Fair-launch and IDO modules with whitelist management, vesting cliff schedules, and initial liquidity bootstrapping tied directly to the DEX pool at TGE.",
    color: "#a78bfa",
    pills: ["IDO / LBP", "whitelist tiers", "vesting cliffs", "TGE pool seeding"],
  },
  {
    icon: "⬡",
    title: "Treasury Routing",
    description: "Automated treasury flow that splits swap fees to protocol reserve, buyback-and-burn, and grants wallets. Governance controls allocation percentages on-chain.",
    color: "#f472b6",
    pills: ["fee splitting", "buyback-and-burn", "grants wallet", "on-chain allocation"],
  },
  {
    icon: "⊞",
    title: "Token Swap Engine",
    description: "Multi-hop smart-order routing across internal pools and external aggregators. Gas-optimised path selection, price-impact warnings, and slippage protection.",
    color: "#fbbf24",
    pills: ["multi-hop routing", "aggregator integration", "slippage guards", "gas optimisation"],
  },
  {
    icon: "⊡",
    title: "Cross-Chain Bridge Swaps",
    description: "Native bridge modules powered by LayerZero and Wormhole enabling single-click cross-chain swaps. Atomic settlement with liquidity pre-positions on both chains.",
    color: "#22d3ee",
    pills: ["LayerZero", "Wormhole", "atomic settlement", "pre-positioned liquidity"],
  },
  {
    icon: "◉",
    title: "Institutional Liquidity Dashboards",
    description: "White-label portfolio dashboards for market-maker desks and treasury managers. Real-time PnL, LP position analytics, impermanent-loss simulation, and API export.",
    color: "#34d399",
    pills: ["white-label UI", "LP analytics", "IL simulation", "API / CSV export"],
  },
];

// ── Use cases ────────────────────────────────────────────────────────────
const useCases = [
  {
    title: "Game Token Swaps",
    desc: "In-game currencies trade freely against stablecoins and gas tokens inside a controlled DEX environment, keeping price discovery within the game economy.",
    color: "#22d3ee",
    icon: "🎮",
    metrics: ["on-chain price discovery", "in-game fee capture", "anti-dump circuit breakers"],
  },
  {
    title: "NFT Floor Liquidity",
    desc: "AMM pools backed by NFT floor-price oracles let collectors instantly exit positions without waiting for a buyer — turning illiquid PFPs into money-market assets.",
    color: "#a78bfa",
    icon: "🖼️",
    metrics: ["floor-price oracle", "instant NFT exit", "yield on deposited NFTs"],
  },
  {
    title: "Real Estate Share Secondary Trading",
    desc: "Fractional property tokens trade on a compliant secondary DEX with KYC-gated pools, cooling-off restrictions, and yield-accumulating LP positions.",
    color: "#34d399",
    icon: "🏢",
    metrics: ["KYC-gated pools", "compliant settlement", "yield-bearing LP"],
  },
  {
    title: "DAO Treasury Optimisation",
    desc: "DAO treasuries deploy idle stables into incentivised liquidity pools, earn swap fees, and route a configurable share to grants or buyback programmes automatically.",
    color: "#f472b6",
    icon: "🏛️",
    metrics: ["idle capital deployment", "fee revenue to DAO", "automated buybacks"],
  },
];

// ── Tech stack ───────────────────────────────────────────────────────────
const techStack = [
  { label: "Uniswap v3 / v4", desc: "Concentrated liquidity AMM foundation" },
  { label: "Balancer Weighted Pools", desc: "Flexible multi-token pool infrastructure" },
  { label: "LayerZero OFT", desc: "Omni-chain token bridging standard" },
  { label: "Chainlink Price Feeds", desc: "Tamper-proof on-chain price oracles" },
  { label: "OpenZeppelin Vaults", desc: "Audited ERC-4626 yield vault contracts" },
  { label: "1inch Aggregator API", desc: "Best-route smart order routing" },
];

export default function DexLiquidityPage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);
  const outcomeRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".dex-hero-content", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 });

      gsap.fromTo(overviewRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: overviewRef.current, start: "top 82%" },
      });

      const cards = modulesRef.current?.querySelectorAll(".dex-module-card");
      if (cards) {
        gsap.fromTo(cards, { opacity: 0, y: 40, scale: 0.95 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "back.out(1.3)", stagger: 0.1,
          scrollTrigger: { trigger: modulesRef.current, start: "top 80%" },
        });
      }

      const ucCards = useCasesRef.current?.querySelectorAll(".dex-uc-card");
      if (ucCards) {
        gsap.fromTo(ucCards, { opacity: 0, x: -30 }, {
          opacity: 1, x: 0, duration: 0.65, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: useCasesRef.current, start: "top 80%" },
        });
      }

      gsap.fromTo(outcomeRef.current, { opacity: 0, scale: 0.95 }, {
        opacity: 1, scale: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: outcomeRef.current, start: "top 82%" },
      });

      const techItems = techRef.current?.querySelectorAll(".dex-tech-item");
      if (techItems) {
        gsap.fromTo(techItems, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.08,
          scrollTrigger: { trigger: techRef.current, start: "top 84%" },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      className="min-h-screen text-foreground font-sans"
      style={{ background: "linear-gradient(160deg, hsl(220,80%,6%) 0%, hsl(190,70%,8%) 50%, hsl(220,80%,6%) 100%)" }}
    >

      {/* ══════════════ HERO ══════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[88vh] flex flex-col items-center justify-center px-6 py-32 overflow-hidden"
        style={{ background: "linear-gradient(160deg, hsl(220,75%,7%) 0%, hsl(192,70%,9%) 50%, hsl(220,75%,7%) 100%)" }}
      >
        <HeroCanvas />

        {/* Radial blooms */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.13) 0%, transparent 65%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(52,211,153,0.09) 0%, transparent 65%)" }}
        />

        {/* Grid overlay */}
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />

        <div className="dex-hero-content opacity-0 relative max-w-4xl mx-auto text-center">
          {/* Back breadcrumb */}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-8 transition-opacity duration-200 hover:opacity-100 opacity-60"
            style={{ color: "#22d3ee" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7l4-4" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Six Pillars of Ecosystem
          </button>

          {/* Tag badge */}
          <span
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(34,211,238,0.10)",
              border: "1px solid rgba(34,211,238,0.35)",
              color: "#22d3ee",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22d3ee" }} />
            Finance Layer
          </span>

          {/* Headline */}
          <h1
            className="font-bold font-sans text-5xl md:text-7xl leading-none mb-6"
            style={{ letterSpacing: "-0.04em" }}
          >
            <span className="text-foreground">Power token </span>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #22d3ee 0%, #34d399 50%, #818cf8 100%)" }}
            >
              liquidity
            </span>
            <br />
            <span className="text-foreground">across your ecosystem</span>
          </h1>

          {/* Subheadline */}
          <p className="text-muted-foreground font-serif text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-10">
            Enterprise-grade DEX infrastructure — from concentrated AMM pools and cross-chain bridge swaps to institutional dashboards and DAO treasury routing.
          </p>

          {/* Stat strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            {[
              { val: "8", label: "Protocol Modules" },
              { val: "$∞", label: "Always-On Liquidity" },
              { val: "10+", label: "Chains Supported" },
              { val: "<0.1s", label: "Quote Latency" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div
                  className="font-bold font-sans text-2xl"
                  style={{ background: "linear-gradient(135deg, #22d3ee, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  {val}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-3.5 rounded-xl font-sans font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #22d3ee 0%, #34d399 100%)",
                color: "#050e1a",
                boxShadow: "0 4px 28px rgba(34,211,238,0.38)",
              }}
            >
              Book a Strategy Call
            </button>
            <button
              onClick={() => navigate("/technology")}
              className="px-8 py-3.5 rounded-xl font-sans font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(34,211,238,0.08)",
                border: "1px solid rgba(34,211,238,0.35)",
                color: "#22d3ee",
              }}
            >
              Explore Architecture
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Scroll</span>
          <div className="w-px h-8 animate-bounce" style={{ background: "linear-gradient(180deg, #22d3ee, transparent)" }} />
        </div>
      </section>

      {/* ══════════════ OVERVIEW ══════════════ */}
      <section className="py-20 px-6">
        <div ref={overviewRef} className="max-w-5xl mx-auto opacity-0">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest mb-4" style={{ color: "#22d3ee" }}>
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, #22d3ee)" }} />
              Overview
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, #22d3ee, transparent)" }} />
            </span>
            <h2
              className="font-bold font-sans text-3xl md:text-4xl text-foreground mb-4"
              style={{ letterSpacing: "-0.03em" }}
            >
              Always-on liquidity that{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #22d3ee, #34d399)" }}
              >
                strengthens token utility
              </span>
            </h2>
            <p className="text-muted-foreground font-serif text-lg max-w-3xl mx-auto leading-relaxed">
              DeCruiz Labs&#39; DEX &amp; Liquidity Engine delivers the complete financial infrastructure
              layer — AMM pools, staking vaults, launchpad modules, and cross-chain bridge swaps —
              so your ecosystem tokens always have deep, composable liquidity available 24/7.
            </p>
          </div>

          {/* Overview pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: "⟳",
                color: "#22d3ee",
                title: "Deep AMM Liquidity",
                desc: "Concentrated liquidity pools with customisable fee tiers ensure tight spreads and minimal price impact — even for low-cap ecosystem tokens.",
              },
              {
                icon: "⊞",
                color: "#34d399",
                title: "Cross-Chain Reach",
                desc: "Native bridge swap modules powered by LayerZero and Wormhole extend liquidity across 10+ EVM and non-EVM chains without leaving your interface.",
              },
              {
                icon: "◉",
                color: "#818cf8",
                title: "Institutional-Grade Tools",
                desc: "White-label dashboards, API export, and impermanent-loss simulation give market-maker desks and DAO treasuries the data they need to manage positions confidently.",
              },
            ].map(({ icon, color, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(15,20,40,0.55)",
                  border: `1px solid ${color}30`,
                  backdropFilter: "blur(16px)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4"
                  style={{ background: `${color}18`, border: `1px solid ${color}35` }}
                >
                  <span style={{ color, fontSize: "1.25rem" }}>{icon}</span>
                </div>
                <h3 className="font-bold font-sans text-sm text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ ARCHITECTURE MODULES ══════════════ */}
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, hsl(192,65%,7%) 0%, hsl(220,60%,10%) 100%)" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.07) 0%, transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest mb-4" style={{ color: "#22d3ee" }}>
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, #22d3ee)" }} />
              Architecture Modules
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, #22d3ee, transparent)" }} />
            </span>
            <h2
              className="font-bold font-sans text-3xl md:text-4xl text-foreground"
              style={{ letterSpacing: "-0.03em" }}
            >
              Eight liquidity primitives, one{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #22d3ee, #34d399, #818cf8)" }}
              >
                unified finance stack
              </span>
            </h2>
          </div>

          <div ref={modulesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map(({ icon, title, description, color, pills }) => (
              <div
                key={title}
                className="dex-module-card opacity-0 rounded-2xl p-5 flex flex-col gap-3 group transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(12,16,36,0.7)",
                  border: `1px solid ${color}28`,
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px ${color}25, 0 4px 24px rgba(0,0,0,0.3)`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${color}55`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${color}28`;
                }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${color}15`, border: `1px solid ${color}35`, color }}
                >
                  {icon}
                </div>

                {/* Title */}
                <h3 className="font-bold font-sans text-sm leading-snug" style={{ color: "#e8eeff" }}>{title}</h3>

                {/* Description */}
                <p className="text-muted-foreground font-sans text-xs leading-relaxed flex-1">{description}</p>

                {/* Pills */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {pills.map(p => (
                    <span
                      key={p}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                      style={{
                        background: `${color}0e`,
                        border: `1px solid ${color}28`,
                        color: "rgba(200,210,240,0.75)",
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>

                {/* Bottom accent line */}
                <div
                  className="h-px w-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ USE CASES ══════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest mb-4" style={{ color: "#34d399" }}>
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, #34d399)" }} />
              Use Cases
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, #34d399, transparent)" }} />
            </span>
            <h2
              className="font-bold font-sans text-3xl md:text-4xl text-foreground"
              style={{ letterSpacing: "-0.03em" }}
            >
              Real-world{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #34d399, #22d3ee)" }}
              >
                deployment scenarios
              </span>
            </h2>
          </div>

          <div ref={useCasesRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {useCases.map(({ title, desc, color, icon, metrics }) => (
              <div
                key={title}
                className="dex-uc-card opacity-0 rounded-2xl p-6 group relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(15,20,40,0.6)",
                  border: `1px solid ${color}30`,
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 4px 32px rgba(0,0,0,0.35)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 48px ${color}22, 0 4px 32px rgba(0,0,0,0.35)`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${color}55`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 32px rgba(0,0,0,0.35)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${color}30`;
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 30% 30%, ${color}12 0%, transparent 60%)` }}
                />

                <div className="relative flex gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}35` }}
                  >
                    {icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold font-sans text-base text-foreground mb-2">{title}</h3>
                    <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-4">{desc}</p>

                    <div className="flex flex-wrap gap-2">
                      {metrics.map(m => (
                        <span
                          key={m}
                          className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-full"
                          style={{
                            background: `${color}0e`,
                            border: `1px solid ${color}28`,
                            color: "rgba(210,220,255,0.8)",
                          }}
                        >
                          <span className="w-1 h-1 rounded-full" style={{ background: color }} />
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TECH STACK ══════════════ */}
      <section
        className="py-20 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, hsl(192,65%,7%) 0%, hsl(220,60%,10%) 100%)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest mb-4" style={{ color: "#fbbf24" }}>
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, #fbbf24)" }} />
              Technology Stack
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, #fbbf24, transparent)" }} />
            </span>
            <h2
              className="font-bold font-sans text-3xl md:text-4xl text-foreground"
              style={{ letterSpacing: "-0.03em" }}
            >
              Built on proven{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #fbbf24, #22d3ee)" }}
              >
                DeFi standards
              </span>
            </h2>
          </div>

          <div ref={techRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {techStack.map(({ label, desc }) => (
              <div
                key={label}
                className="dex-tech-item opacity-0 rounded-xl p-4 flex items-start gap-3 group transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "rgba(12,16,36,0.7)",
                  border: "1px solid rgba(34,211,238,0.18)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0 group-hover:scale-125 transition-transform duration-200"
                  style={{ background: "linear-gradient(135deg, #22d3ee, #34d399)", boxShadow: "0 0 8px rgba(34,211,238,0.5)" }}
                />
                <div>
                  <p className="font-mono text-xs font-semibold text-foreground mb-0.5">{label}</p>
                  <p className="text-muted-foreground font-sans text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ BUSINESS OUTCOME ══════════════ */}
      <section className="py-24 px-6">
        <div ref={outcomeRef} className="max-w-4xl mx-auto opacity-0">
          <div
            className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
            style={{
              background: "rgba(12,16,36,0.75)",
              border: "1px solid rgba(34,211,238,0.28)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 8px 64px rgba(34,211,238,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Decorative glows */}
            <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.15) 0%, transparent 65%)" }} />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(52,211,153,0.12) 0%, transparent 65%)" }} />

            <div className="relative">
              <span
                className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
                style={{
                  background: "rgba(34,211,238,0.10)",
                  border: "1px solid rgba(34,211,238,0.35)",
                  color: "#22d3ee",
                }}
              >
                Business Outcome
              </span>

              <h2
                className="font-bold font-sans text-3xl md:text-5xl text-foreground mb-6"
                style={{ letterSpacing: "-0.04em" }}
              >
                Create always-on liquidity that{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #22d3ee 0%, #34d399 55%, #818cf8 100%)" }}
                >
                  strengthens token utility
                </span>
              </h2>

              <p className="text-muted-foreground font-serif text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
                Deep, permissionless liquidity turns ecosystem tokens from speculative assets into
                functional utilities. DeCruiz Labs clients see dramatically lower price impact on
                swaps, higher trading volume, and more sustained LP participation across market cycles.
              </p>

              {/* Outcome metrics */}
              <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
                {[
                  { val: "5×", label: "Higher LP Participation" },
                  { val: "80%", label: "Reduction in Price Impact" },
                  { val: "24/7", label: "Always-On Liquidity" },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center">
                    <div
                      className="font-bold font-sans text-4xl mb-1"
                      style={{ background: "linear-gradient(135deg, #22d3ee, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                    >
                      {val}
                    </div>
                    <div className="text-muted-foreground font-mono text-xs uppercase tracking-widest">{label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => navigate("/contact")}
                  className="px-8 py-3.5 rounded-xl font-sans font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    background: "linear-gradient(135deg, #22d3ee 0%, #34d399 100%)",
                    color: "#050e1a",
                    boxShadow: "0 4px 28px rgba(34,211,238,0.38)",
                  }}
                >
                  Launch Your Liquidity Layer
                </button>
                <button
                  onClick={() => navigate("/tokenomics")}
                  className="px-8 py-3.5 rounded-xl font-sans font-semibold text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(34,211,238,0.08)",
                    border: "1px solid rgba(34,211,238,0.35)",
                    color: "#22d3ee",
                  }}
                >
                  Explore Tokenomics
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
