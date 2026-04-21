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

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; color: string; alpha: number };
    const COLORS = ["#a78bfa", "#f472b6", "#818cf8", "#fbbf24", "#34d399"];
    const particles: Particle[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2.5 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.6 + 0.3,
    }));

    const hexagons: { x: number; y: number; size: number; rot: number; vr: number; color: string }[] = Array.from({ length: 12 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 30 + 15,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.006,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const drawHex = (x: number, y: number, size: number, rot: number, color: string) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = rot + (Math.PI / 3) * i;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = 0.12;
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Hexagons
      hexagons.forEach(h => {
        h.rot += h.vr;
        drawHex(h.x, h.y, h.size, h.rot, h.color);
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = (1 - dist / 120) * 0.15;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Particles
      particles.forEach(p => {
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        // glow
        ctx.globalAlpha = 0.12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.55 }} />;
}

// ── Architecture modules ─────────────────────────────────────────────────
const modules = [
  {
    icon: "◈",
    title: "Avatar & Skin NFTs",
    description: "Mint, trade, and equip verified on-chain avatars across compatible metaverse environments. Skins carry provenance, rarity tiers, and royalties back to creators.",
    color: "#a78bfa",
    pills: ["ERC-721 / ERC-1155", "rarity tiers", "cross-game portability", "creator royalties"],
  },
  {
    icon: "⬡",
    title: "Land Ownership Protocol",
    description: "Tokenize virtual parcels with verifiable deeds, coordinate-based metadata, and zoning rights. Landowners earn from in-parcel activity and leasing.",
    color: "#f472b6",
    pills: ["parcel tokenization", "coordinate metadata", "leasing contracts", "yield distribution"],
  },
  {
    icon: "⊞",
    title: "In-Game Marketplace",
    description: "An on-chain trading hub for weapons, skins, gear, and virtual goods. Peer-to-peer or AMM-backed, with escrow settlement and spam prevention.",
    color: "#fbbf24",
    pills: ["P2P trading", "AMM listing", "escrow settlement", "anti-bot protection"],
  },
  {
    icon: "◎",
    title: "Reward Tokenomics",
    description: "Design sustainable emission schedules, skill-based reward multipliers, and anti-inflation sinks to keep the in-game economy balanced over time.",
    color: "#34d399",
    pills: ["emission curves", "burn mechanics", "staking sinks", "reward multipliers"],
  },
  {
    icon: "⬡",
    title: "Guilds & Team Systems",
    description: "Form on-chain guilds with shared treasury, delegation of roles, and split reward distribution. Guild reputation feeds into governance weight.",
    color: "#22d3ee",
    pills: ["shared treasury", "role delegation", "split rewards", "guild reputation"],
  },
  {
    icon: "◇",
    title: "Creator Monetization",
    description: "Enable builders and artists to deploy storefronts, set royalty policies, and receive streaming payments from secondary sales without intermediaries.",
    color: "#818cf8",
    pills: ["royalty streams", "storefronts", "subscription passes", "revenue splits"],
  },
  {
    icon: "⊡",
    title: "Quest Engine",
    description: "A composable quest framework that issues verifiable on-chain proofs of completion. Integrates with any game logic via webhook oracles or smart contract events.",
    color: "#fb923c",
    pills: ["on-chain proofs", "webhook oracles", "milestone rewards", "dynamic branching"],
  },
  {
    icon: "◉",
    title: "AI NPC Integrations",
    description: "Deploy AI-powered non-player characters that hold wallets, execute on-chain transactions, adapt to player behavior, and generate procedural narratives.",
    color: "#e879f9",
    pills: ["wallet-holding NPCs", "on-chain actions", "LLM dialogue", "procedural quests"],
  },
];

// ── Use cases ────────────────────────────────────────────────────────────
const useCases = [
  {
    title: "Virtual World Economy",
    desc: "An open economy where every asset — land, avatar, wearable, consumable — is player-owned, tradeable, and earns yield through activity.",
    color: "#a78bfa",
    icon: "🌐",
    metrics: ["full asset ownership", "passive land yield", "cross-world portability"],
    image: "/assests/virtual-world.jpg",
  },
  {
    title: "Play-to-Earn Game",
    desc: "Skill-based gameplay that mints real token rewards, with guild scholarships letting non-investors participate through delegation.",
    color: "#f472b6",
    icon: "🎮",
    metrics: ["skill-weighted rewards", "guild scholarships", "anti-whale emission caps"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80&auto=format&fit=crop",
  },
  {
    title: "Creator-Owned Game Assets",
    desc: "Indie creators deploy their own asset collections with on-chain royalties and secondary market visibility — no permission from the studio needed.",
    color: "#fbbf24",
    icon: "🎨",
    metrics: ["royalty enforcement", "2ry market integration", "creator storefronts"],
    image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&q=80&auto=format&fit=crop",
  },
  {
    title: "Interoperable Avatar Systems",
    desc: "A single avatar identity that travels across multiple games and virtual worlds — cosmetics, achievements, and stats follow the player, not the platform.",
    color: "#34d399",
    icon: "🧑‍💻",
    metrics: ["cross-game identity", "portable cosmetics", "achievement NFTs"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
  },
];

// ── Tech stack ───────────────────────────────────────────────────────────
const techStack = [
  { label: "ERC-721 / ERC-1155", desc: "NFT standards for items and editions" },
  { label: "ERC-6551 (TBA)", desc: "Token-bound accounts for avatar wallets" },
  { label: "Chainlink VRF", desc: "Provably fair randomness for loot drops" },
  { label: "IPFS / Arweave", desc: "Decentralised asset & metadata storage" },
  { label: "Polygon zkEVM", desc: "Low-fee, high-speed gaming transactions" },
  { label: "OpenSea SDK", desc: "Marketplace liquidity and listing APIs" },
];

export default function MetaverseGameFiPage() {
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
      // Hero
      gsap.fromTo(".gfi-hero-content", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 });

      // Overview
      gsap.fromTo(overviewRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: overviewRef.current, start: "top 82%" },
      });

      // Module cards
      const cards = modulesRef.current?.querySelectorAll(".gfi-module-card");
      if (cards) {
        gsap.fromTo(cards, { opacity: 0, y: 40, scale: 0.95 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "back.out(1.3)", stagger: 0.1,
          scrollTrigger: { trigger: modulesRef.current, start: "top 80%" },
        });
      }

      // Use cases
      const ucCards = useCasesRef.current?.querySelectorAll(".gfi-uc-card");
      if (ucCards) {
        gsap.fromTo(ucCards, { opacity: 0, x: -30 }, {
          opacity: 1, x: 0, duration: 0.65, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: useCasesRef.current, start: "top 80%" },
        });
      }

      // Outcome
      gsap.fromTo(outcomeRef.current, { opacity: 0, scale: 0.95 }, {
        opacity: 1, scale: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: outcomeRef.current, start: "top 82%" },
      });

      // Tech stack
      const techItems = techRef.current?.querySelectorAll(".gfi-tech-item");
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
      style={{ background: "linear-gradient(160deg, hsl(220,80%,6%) 0%, hsl(265,60%,10%) 50%, hsl(220,80%,6%) 100%)" }}
    >

      {/* ══════════════ HERO ══════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[88vh] flex flex-col items-center justify-center px-6 py-32 overflow-hidden"
        style={{ background: "linear-gradient(160deg, hsl(240,70%,7%) 0%, hsl(265,65%,11%) 50%, hsl(240,70%,7%) 100%)" }}
      >
        <HeroCanvas />

        {/* Radial bloom */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(167,139,250,0.14) 0%, transparent 65%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(244,114,182,0.09) 0%, transparent 65%)" }}
        />

        {/* Grid overlay */}
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />

        <div className="gfi-hero-content opacity-0 relative max-w-4xl mx-auto text-center">
          {/* Back breadcrumb */}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-8 transition-colors duration-200 hover:opacity-100 opacity-60"
            style={{ color: "#a78bfa" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7l4-4" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Six Pillars of Ecosystem
          </button>

          {/* Tag */}
          <span
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(167,139,250,0.12)",
              border: "1px solid rgba(167,139,250,0.35)",
              color: "#a78bfa",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#a78bfa" }} />
            GameFi Layer
          </span>

          {/* Headline */}
          <h1
            className="font-bold font-sans text-5xl md:text-7xl leading-none mb-6"
            style={{ letterSpacing: "-0.04em" }}
          >
            <span className="text-foreground">Build immersive </span>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #a78bfa 0%, #f472b6 55%, #fbbf24 100%)" }}
            >
              digital economies
            </span>
            <br />
            <span className="text-foreground">with real ownership</span>
          </h1>

          {/* Subheadline */}
          <p className="text-muted-foreground font-serif text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-10">
            The complete GameFi infrastructure stack — from avatar NFTs and land parcels to quest engines and AI-powered NPCs.
          </p>

          {/* Stat strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            {[
              { val: "8", label: "Protocol Layers" },
              { val: "100K+", label: "TPS Throughput" },
              { val: "<1s", label: "Settlement Time" },
              { val: "EVM+", label: "Multi-chain" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div
                  className="font-bold font-sans text-2xl"
                  style={{ background: "linear-gradient(135deg, #a78bfa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
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
                background: "linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)",
                color: "#fff",
                boxShadow: "0 4px 28px rgba(167,139,250,0.4)",
              }}
            >
              Book a Strategy Call
            </button>
            <button
              onClick={() => navigate("/technology")}
              className="px-8 py-3.5 rounded-xl font-sans font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(167,139,250,0.08)",
                border: "1px solid rgba(167,139,250,0.35)",
                color: "#a78bfa",
              }}
            >
              Explore Architecture
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Scroll</span>
          <div className="w-px h-8 animate-bounce" style={{ background: "linear-gradient(180deg, #a78bfa, transparent)" }} />
        </div>
      </section>

      {/* ══════════════ OVERVIEW ══════════════ */}
      <section className="py-20 px-6">
        <div ref={overviewRef} className="max-w-5xl mx-auto opacity-0">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest mb-4" style={{ color: "#a78bfa" }}>
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, #a78bfa)" }} />
              Overview
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, #a78bfa, transparent)" }} />
            </span>
            <h2
              className="font-bold font-sans text-3xl md:text-4xl text-foreground mb-4"
              style={{ letterSpacing: "-0.03em" }}
            >
              The complete infrastructure for{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #a78bfa, #f472b6)" }}
              >
                ownership-driven games
              </span>
            </h2>
            <p className="text-muted-foreground font-serif text-lg max-w-3xl mx-auto leading-relaxed">
              DeCruiz Labs&#39; Metaverse &amp; GameFi Layer provides the full technical stack to build
              sustainable, player-owned digital economies. From NFT-based identity and land
              ownership to AI NPCs and quest engines — every primitive you need is composable,
              audited, and production-ready.
            </p>
          </div>

          {/* Overview feature pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: "⬡",
                color: "#a78bfa",
                title: "True Asset Ownership",
                desc: "Every item, parcel, and avatar is a blockchain-native asset. Players own, trade, and earn from their digital property without platform permission.",
              },
              {
                icon: "◎",
                color: "#f472b6",
                title: "Sustainable Token Economics",
                desc: "Carefully tuned emission curves, burn sinks, and staking incentives keep the in-game economy balanced and prevent hyperinflationary collapse.",
              },
              {
                icon: "◉",
                color: "#fbbf24",
                title: "Cross-World Interoperability",
                desc: "Open standards (ERC-721, ERC-6551, TBA) ensure avatars and items move freely across multiple games and metaverses in a permissionless ecosystem.",
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
                  <span style={{ color }}>{icon}</span>
                </div>
                <h3 className="font-bold font-sans text-sm text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ KEY SECTIONS / MODULES ══════════════ */}
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, hsl(265,60%,8%) 0%, hsl(240,60%,10%) 100%)" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(167,139,250,0.08) 0%, transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest mb-4" style={{ color: "#a78bfa" }}>
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, #a78bfa)" }} />
              Architecture Modules
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, #a78bfa, transparent)" }} />
            </span>
            <h2
              className="font-bold font-sans text-3xl md:text-4xl text-foreground"
              style={{ letterSpacing: "-0.03em" }}
            >
              Eight protocol layers, one{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #a78bfa, #f472b6, #fbbf24)" }}
              >
                unified GameFi stack
              </span>
            </h2>
          </div>

          <div ref={modulesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map(({ icon, title, description, color, pills }) => (
              <div
                key={title}
                className="gfi-module-card opacity-0 rounded-2xl p-5 flex flex-col gap-3 group transition-all duration-300 hover:-translate-y-1"
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

                {/* Pill tags */}
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
            <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest mb-4" style={{ color: "#f472b6" }}>
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, #f472b6)" }} />
              Use Cases
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, #f472b6, transparent)" }} />
            </span>
            <h2
              className="font-bold font-sans text-3xl md:text-4xl text-foreground"
              style={{ letterSpacing: "-0.03em" }}
            >
              Real-world{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #f472b6, #a78bfa)" }}
              >
                deployment scenarios
              </span>
            </h2>
          </div>

          <div ref={useCasesRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {useCases.map(({ title, desc, color, icon, metrics, image }) => (
              <div
                key={title}
                className="gfi-uc-card opacity-0 rounded-2xl group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
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
                {/* Image header */}
                <div className="relative h-44 w-full overflow-hidden rounded-t-2xl shrink-0">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Dark + colour tint overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(180deg, ${color}22 0%, rgba(8,10,24,0.72) 100%)` }}
                  />
                  {/* Emoji badge */}
                  <div
                    className="absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${color}25`, border: `1px solid ${color}50`, backdropFilter: "blur(8px)" }}
                  >
                    {icon}
                  </div>
                </div>

                {/* Body */}
                <div className="relative p-6 flex flex-col flex-1">
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 30% 30%, ${color}10 0%, transparent 60%)` }}
                  />

                  <h3 className="font-bold font-sans text-base text-foreground mb-2 relative">{title}</h3>
                  <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-4 relative">{desc}</p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-2 mt-auto relative">
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
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TECH STACK ══════════════ */}
      <section
        className="py-20 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, hsl(265,60%,8%) 0%, hsl(240,60%,10%) 100%)" }}
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
                style={{ backgroundImage: "linear-gradient(135deg, #fbbf24, #a78bfa)" }}
              >
                Web3 standards
              </span>
            </h2>
          </div>

          <div ref={techRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {techStack.map(({ label, desc }) => (
              <div
                key={label}
                className="gfi-tech-item opacity-0 rounded-xl p-4 flex items-start gap-3 group transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "rgba(12,16,36,0.7)",
                  border: "1px solid rgba(167,139,250,0.18)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0 group-hover:scale-125 transition-transform duration-200"
                  style={{ background: "linear-gradient(135deg, #a78bfa, #f472b6)", boxShadow: "0 0 8px rgba(167,139,250,0.5)" }}
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
              border: "1px solid rgba(167,139,250,0.30)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 8px 64px rgba(167,139,250,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Decorative glows */}
            <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(167,139,250,0.18) 0%, transparent 65%)" }} />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(244,114,182,0.14) 0%, transparent 65%)" }} />

            <div className="relative">
              <span
                className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
                style={{
                  background: "rgba(167,139,250,0.12)",
                  border: "1px solid rgba(167,139,250,0.35)",
                  color: "#a78bfa",
                }}
              >
                Business Outcome
              </span>

              <h2
                className="font-bold font-sans text-3xl md:text-5xl text-foreground mb-6"
                style={{ letterSpacing: "-0.04em" }}
              >
                Increase retention through{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #a78bfa 0%, #f472b6 55%, #fbbf24 100%)" }}
                >
                  ownership-driven engagement
                </span>
              </h2>

              <p className="text-muted-foreground font-serif text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
                When players own their progress and assets, churn plummets. DeCruiz Labs clients
                see dramatically higher Day-30 retention, more organic virality from asset trading,
                and deeper monetisation through player-driven secondary markets.
              </p>

              {/* Outcome metrics */}
              <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
                {[
                  { val: "3×", label: "Higher Day-30 Retention" },
                  { val: "60%", label: "Organic Referral Rate" },
                  { val: "40%", label: "Revenue from Secondary Sales" },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center">
                    <div
                      className="font-bold font-sans text-4xl mb-1"
                      style={{ background: "linear-gradient(135deg, #a78bfa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
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
                  className="px-8 py-3.5 rounded-xl font-sans font-semibold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    background: "linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)",
                    boxShadow: "0 4px 28px rgba(167,139,250,0.4)",
                  }}
                >
                  Start Building Your Game Economy
                </button>
                <button
                  onClick={() => navigate("/tokenomics")}
                  className="px-8 py-3.5 rounded-xl font-sans font-semibold text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(167,139,250,0.08)",
                    border: "1px solid rgba(167,139,250,0.35)",
                    color: "#a78bfa",
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
