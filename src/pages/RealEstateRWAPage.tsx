import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Hero canvas – animated property grid with flowing tokens ───────────────
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

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string };
    const COLORS = ["#34d399", "#10b981", "#6ee7b7", "#a7f3d0", "#34d399"];
    const particles: Particle[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * (canvas.width || 1200),
      y: Math.random() * (canvas.height || 600),
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.6 + 0.25,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    // Building/property shapes
    type Building = { x: number; w: number; h: number; color: string; alpha: number };
    const buildings: Building[] = Array.from({ length: 8 }, (_, i) => ({
      x: (i / 8) * (canvas.width || 1200) + Math.random() * 60,
      w: 40 + Math.random() * 50,
      h: 60 + Math.random() * 120,
      color: "#34d399",
      alpha: 0.06 + Math.random() * 0.07,
    }));

    let t = 0;
    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw building silhouettes
      buildings.forEach((b) => {
        ctx.globalAlpha = b.alpha;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, canvas.height - b.h, b.w, b.h);
        // Windows
        ctx.globalAlpha = b.alpha * 1.5;
        for (let wy = 0; wy < b.h - 14; wy += 16) {
          for (let wx = 6; wx < b.w - 6; wx += 12) {
            ctx.fillStyle = Math.random() > 0.4 ? "#6ee7b7" : "transparent";
            ctx.fillRect(b.x + wx, canvas.height - b.h + wy + 8, 6, 8);
          }
        }
      });

      // Flowing connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = "#34d399";
            ctx.globalAlpha = (1 - dist / 140) * 0.15;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Particles
      particles.forEach((p) => {
        ctx.globalAlpha = p.alpha * (0.7 + 0.3 * Math.sin(t + p.x));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        // glow
        ctx.globalAlpha = p.alpha * 0.2;
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

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

// ── Data ──────────────────────────────────────────────────────────────────
const modules = [
  {
    title: "Property Tokenization Workflows",
    description: "End-to-end pipelines for converting physical real estate into on-chain digital securities — from legal structuring to token minting.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="3" y="10" width="20" height="13" rx="2" stroke="#34d399" strokeWidth="1.4" fill="none" opacity="0.8" />
        <path d="M3 16h20" stroke="#34d399" strokeWidth="1" opacity="0.4" />
        <path d="M9 10V7a4 4 0 0 1 8 0v3" stroke="#34d399" strokeWidth="1.4" fill="none" opacity="0.7" />
        <circle cx="13" cy="18" r="2" fill="#34d399" opacity="0.7" />
      </svg>
    ),
    accent: "#34d399",
  },
  {
    title: "SPV / Legal Wrapper Integrations",
    description: "Compliant Special Purpose Vehicle structures and legal wrappers that anchor on-chain tokens to real-world property rights.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="5" y="3" width="16" height="20" rx="2" stroke="#34d399" strokeWidth="1.4" fill="none" opacity="0.8" />
        <path d="M9 8h8M9 12h8M9 16h5" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <circle cx="19" cy="19" r="5" fill="rgba(52,211,153,0.15)" stroke="#34d399" strokeWidth="1.2" />
        <path d="M17 19l1.5 1.5L21 17" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "#10b981",
  },
  {
    title: "Fractional Ownership Engine",
    description: "Split high-value assets into thousands of tradable micro-shares, enabling accessible entry points for global retail investors.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="9" stroke="#34d399" strokeWidth="1.4" fill="none" opacity="0.6" />
        <path d="M13 4v18M4 13h18" stroke="#34d399" strokeWidth="1" opacity="0.4" />
        <path d="M13 4a9 9 0 0 1 9 9" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
        <circle cx="13" cy="13" r="2.5" fill="#34d399" opacity="0.5" />
      </svg>
    ),
    accent: "#34d399",
  },
  {
    title: "Dividend & Rental Yield Distribution",
    description: "Automated smart-contract payouts that distribute rental income and dividends pro-rata to token holders in real time.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="9" stroke="#34d399" strokeWidth="1.4" fill="none" opacity="0.6" />
        <path d="M13 8v5l3 3" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
        <path d="M8 18l2-2M18 18l-2-2" stroke="#34d399" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <circle cx="13" cy="13" r="1.5" fill="#34d399" opacity="0.8" />
      </svg>
    ),
    accent: "#6ee7b7",
  },
  {
    title: "Secondary Market Trading",
    description: "Integrated DEX and OTC secondary markets allowing 24/7 peer-to-peer trading of tokenized property shares globally.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M4 19l5-5 4 4 9-10" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
        <circle cx="4" cy="19" r="1.8" fill="#34d399" opacity="0.7" />
        <circle cx="9" cy="14" r="1.8" fill="#34d399" opacity="0.7" />
        <circle cx="13" cy="18" r="1.8" fill="#34d399" opacity="0.7" />
        <circle cx="22" cy="8" r="1.8" fill="#34d399" opacity="0.7" />
      </svg>
    ),
    accent: "#34d399",
  },
  {
    title: "Investor Compliance Portal",
    description: "KYC/AML-aware investor onboarding with jurisdiction-based access controls, whitelisting, and regulatory reporting.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 3L4 7v7c0 5 4 8.5 9 9.5C18 22.5 22 19 22 14V7L13 3z" stroke="#34d399" strokeWidth="1.4" fill="none" opacity="0.75" />
        <path d="M9 13l3 3 5-5" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      </svg>
    ),
    accent: "#10b981",
  },
  {
    title: "Collateralized Lending",
    description: "Use tokenized real estate as DeFi collateral to unlock liquidity through on-chain mortgage and lending protocols.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="3" y="11" width="10" height="12" rx="1.5" stroke="#34d399" strokeWidth="1.4" fill="none" opacity="0.75" />
        <rect x="13" y="7" width="10" height="16" rx="1.5" stroke="#34d399" strokeWidth="1.4" fill="none" opacity="0.75" />
        <path d="M6 11V8a3 3 0 0 1 6 0v3" stroke="#34d399" strokeWidth="1.3" fill="none" opacity="0.6" />
        <path d="M16 7V5a3 3 0 0 1 6 0v2" stroke="#34d399" strokeWidth="1.3" fill="none" opacity="0.6" />
        <circle cx="8" cy="17" r="1.5" fill="#34d399" opacity="0.7" />
        <circle cx="18" cy="15" r="1.5" fill="#34d399" opacity="0.7" />
      </svg>
    ),
    accent: "#34d399",
  },
  {
    title: "Valuation & Reporting Dashboards",
    description: "Real-time oracle-fed property valuations, investor portfolio views, and automated regulatory reporting for fund operators.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="3" y="3" width="20" height="20" rx="2.5" stroke="#34d399" strokeWidth="1.4" fill="none" opacity="0.65" />
        <path d="M7 17l3-4 3 2 3-5 3 3" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        <path d="M3 8h20" stroke="#34d399" strokeWidth="0.8" opacity="0.3" />
        <circle cx="20" cy="7" r="1.5" fill="#34d399" opacity="0.8" />
      </svg>
    ),
    accent: "#6ee7b7",
  },
];

const useCases = [
  {
    title: "Commercial Real Estate",
    description: "Tokenize office towers, logistics hubs, and retail developments — enabling institutional-grade assets to reach a global investor base.",
    metric: "10× wider investor reach",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Hospitality Assets",
    description: "Fractionalize hotels, resorts, and short-let portfolios with automated revenue distribution tied to real-time booking data.",
    metric: "Real-time yield payouts",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Global Investor Syndicates",
    description: "Form borderless investment syndicates with compliant on-chain cap table management and multi-jurisdiction KYC.",
    metric: "190+ jurisdiction support",
    image: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Mortgage-Backed DeFi",
    description: "Bridge traditional mortgage-backed securities onto DeFi rails to create new yield instruments and composable credit products.",
    metric: "Composable DeFi collateral",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&auto=format&fit=crop",
  },
];

const techStack = [
  { name: "ERC-3643", desc: "Security token standard" },
  { name: "Chainlink Oracles", desc: "Property valuations" },
  { name: "Polygon zkEVM", desc: "Low-cost settlement" },
  { name: "Fireblocks", desc: "Institutional custody" },
  { name: "OpenZeppelin", desc: "Compliance contracts" },
  { name: "Gnosis Safe", desc: "Multi-sig treasury" },
];

const stats = [
  { value: "8", label: "RWA Modules" },
  { value: "190+", label: "Jurisdictions" },
  { value: "24/7", label: "Tradable" },
  { value: "<48h", label: "Token Issuance" },
];

// ── Page Component ────────────────────────────────────────────────────────
export default function RealEstateRWAPage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
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
        heroRef.current?.querySelectorAll(".hero-animate") ?? [],
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.15, delay: 0.1 }
      );

      // Stats strip
      gsap.fromTo(
        statsRef.current?.querySelectorAll(".stat-item") ?? [],
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.4)", stagger: 0.1,
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
        }
      );

      // Module cards
      gsap.fromTo(
        modulesRef.current?.querySelectorAll(".module-card") ?? [],
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "back.out(1.3)", stagger: 0.08,
          scrollTrigger: { trigger: modulesRef.current, start: "top 78%" },
        }
      );

      // Use case cards
      gsap.fromTo(
        useCasesRef.current?.querySelectorAll(".usecase-card") ?? [],
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.65, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: useCasesRef.current, start: "top 80%" },
        }
      );

      // Tech stack
      gsap.fromTo(
        techRef.current?.querySelectorAll(".tech-item") ?? [],
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)", stagger: 0.07,
          scrollTrigger: { trigger: techRef.current, start: "top 82%" },
        }
      );

      // Outcome
      gsap.fromTo(
        outcomeRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: outcomeRef.current, start: "top 82%" },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, hsl(220,80%,6%) 0%, hsl(160,40%,7%) 50%, hsl(220,80%,6%) 100%)" }}
    >
      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <HeroCanvas />

        {/* Radial glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(52,211,153,0.10) 0%, transparent 65%)" }} />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 65%)" }} />
        </div>

        {/* Grid overlay */}
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" />

        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          {/* Breadcrumb */}
          <button
            onClick={() => navigate("/")}
            className="hero-animate opacity-0 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-8 transition-colors duration-200 hover:opacity-80"
            style={{ color: "#34d399" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Ecosystem
          </button>

          {/* Tag */}
          <div className="hero-animate opacity-0 mb-6">
            <span
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full"
              style={{
                background: "rgba(52,211,153,0.10)",
                border: "1px solid rgba(52,211,153,0.35)",
                color: "#34d399",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              RWA Layer · Pillar 04
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-animate opacity-0 font-bold font-sans leading-tight mb-6 max-w-4xl"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
              letterSpacing: "-0.03em",
              color: "#f0fdf4",
            }}
          >
            Bring real-world assets{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #34d399 0%, #10b981 40%, #6ee7b7 100%)" }}
            >
              on-chain
            </span>{" "}
            with{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #6ee7b7 0%, #34d399 60%, #a7f3d0 100%)" }}
            >
              compliance-ready
            </span>{" "}
            infrastructure
          </h1>

          {/* Sub */}
          <p
            className="hero-animate opacity-0 font-serif text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
            style={{ color: "rgba(167,243,208,0.75)" }}
          >
            DeCruiz Labs delivers full-stack tokenization infrastructure for property assets — from legal structuring
            and SPV wrappers to secondary market trading and automated yield distribution.
          </p>

          {/* CTAs */}
          <div className="hero-animate opacity-0 flex flex-wrap gap-4 mb-16">
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
                color: "#022c22",
                boxShadow: "0 0 32px rgba(52,211,153,0.35)",
              }}
            >
              Tokenize Your Asset
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => navigate("/whitepaper")}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(52,211,153,0.08)",
                border: "1px solid rgba(52,211,153,0.35)",
                color: "#6ee7b7",
                backdropFilter: "blur(12px)",
              }}
            >
              Read Whitepaper
            </button>
          </div>

          {/* Stat strip */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl"
          >
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="stat-item opacity-0 text-center px-4 py-3 rounded-xl"
                style={{
                  background: "rgba(52,211,153,0.07)",
                  border: "1px solid rgba(52,211,153,0.18)",
                }}
              >
                <div className="font-bold font-mono text-2xl" style={{ color: "#34d399" }}>{value}</div>
                <div className="text-xs font-sans mt-0.5" style={{ color: "rgba(167,243,208,0.6)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE MODULES ───────────────────────────────────────── */}
      <section className="py-28 px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-5"
              style={{ color: "#34d399" }}>
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, #34d399)" }} />
              Architecture
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, #34d399, transparent)" }} />
            </span>
            <h2 className="font-bold font-sans text-3xl md:text-4xl leading-tight mb-4"
              style={{ color: "#f0fdf4", letterSpacing: "-0.02em" }}>
              Eight RWA Infrastructure{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #34d399 0%, #6ee7b7 100%)" }}>
                Modules
              </span>
            </h2>
            <p className="font-serif text-base max-w-xl mx-auto" style={{ color: "rgba(167,243,208,0.6)" }}>
              Every layer needed to take a real-world asset from legal structuring to global secondary market trading.
            </p>
          </div>

          {/* Module grid */}
          <div
            ref={modulesRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {modules.map(({ title, description, icon, accent }) => (
              <div
                key={title}
                className="module-card opacity-0 group relative rounded-2xl p-6 transition-all duration-300"
                style={{
                  background: "rgba(15,25,20,0.65)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(52,211,153,0.15)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = `1px solid ${accent}50`;
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 36px rgba(52,211,153,0.14), 0 0 0 1px ${accent}30`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(52,211,153,0.15)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.35)";
                }}
              >
                {/* Shimmer top line */}
                <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}70, transparent)` }} />

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "rgba(52,211,153,0.10)", border: `1px solid ${accent}30` }}
                >
                  {icon}
                </div>

                <h3 className="font-bold font-sans text-sm mb-2 leading-snug" style={{ color: "#ecfdf5" }}>
                  {title}
                </h3>
                <p className="font-sans text-xs leading-relaxed" style={{ color: "rgba(167,243,208,0.6)" }}>
                  {description}
                </p>

                {/* Pulse dot */}
                <div className="absolute bottom-4 right-4">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: accent, boxShadow: `0 0 6px ${accent}` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative"
        style={{ background: "rgba(5,15,10,0.5)" }}>
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-5"
              style={{ color: "#34d399" }}>
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, #34d399)" }} />
              Use Cases
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, #34d399, transparent)" }} />
            </span>
            <h2 className="font-bold font-sans text-3xl md:text-4xl leading-tight mb-4"
              style={{ color: "#f0fdf4", letterSpacing: "-0.02em" }}>
              Real Assets,{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #34d399 0%, #6ee7b7 100%)" }}>
                Real Liquidity
              </span>
            </h2>
          </div>

          {/* Use case layout: selector + detail */}
          <div ref={useCasesRef} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left: selector list */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              {useCases.map(({ title, metric }, i) => (
                <button
                  key={title}
                  onClick={() => setActiveCase(i)}
                  className={`usecase-card opacity-0 text-left px-5 py-4 rounded-xl transition-all duration-300 group ${activeCase === i ? "active" : ""}`}
                  style={{
                    background: activeCase === i ? "rgba(52,211,153,0.12)" : "rgba(15,25,20,0.5)",
                    border: activeCase === i ? "1px solid rgba(52,211,153,0.45)" : "1px solid rgba(52,211,153,0.12)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sans font-semibold text-sm" style={{ color: activeCase === i ? "#6ee7b7" : "rgba(220,255,240,0.7)" }}>
                      {title}
                    </span>
                    {activeCase === i && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7h8M7 3l4 4-4 4" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs font-mono" style={{ color: activeCase === i ? "#34d399" : "rgba(52,211,153,0.45)" }}>
                    {metric}
                  </span>
                </button>
              ))}
            </div>

            {/* Right: detail card */}
            <div
              className="lg:col-span-3 rounded-2xl overflow-hidden relative"
              style={{
                background: "rgba(15,25,20,0.65)",
                border: "1px solid rgba(52,211,153,0.2)",
                backdropFilter: "blur(16px)",
                minHeight: "340px",
              }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  key={activeCase}
                  src={useCases[activeCase].image}
                  alt={useCases[activeCase].title}
                  className="w-full h-full object-cover transition-all duration-700"
                  style={{ filter: "brightness(0.65) saturate(0.8)" }}
                />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(5,15,10,0.1) 0%, rgba(5,15,10,0.85) 100%)" }} />
                {/* Metric pill */}
                <div className="absolute bottom-4 left-5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(52,211,153,0.15)",
                      border: "1px solid rgba(52,211,153,0.4)",
                      color: "#6ee7b7",
                      backdropFilter: "blur(10px)",
                    }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {useCases[activeCase].metric}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold font-sans text-lg mb-3" style={{ color: "#ecfdf5" }}>
                  {useCases[activeCase].title}
                </h3>
                <p className="font-serif text-sm leading-relaxed" style={{ color: "rgba(167,243,208,0.7)" }}>
                  {useCases[activeCase].description}
                </p>
                <button
                  onClick={() => navigate("/contact")}
                  className="mt-5 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider transition-colors duration-200 hover:opacity-80"
                  style={{ color: "#34d399" }}
                >
                  Explore this use case
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-5"
              style={{ color: "#34d399" }}>
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, #34d399)" }} />
              Technology Stack
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, #34d399, transparent)" }} />
            </span>
            <h2 className="font-bold font-sans text-3xl md:text-4xl leading-tight"
              style={{ color: "#f0fdf4", letterSpacing: "-0.02em" }}>
              Compliance-Grade{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #34d399 0%, #6ee7b7 100%)" }}>
                Infrastructure
              </span>
            </h2>
          </div>

          <div ref={techRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map(({ name, desc }) => (
              <div
                key={name}
                className="tech-item opacity-0 flex flex-col items-center text-center p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 group"
                style={{
                  background: "rgba(15,25,20,0.6)",
                  border: "1px solid rgba(52,211,153,0.15)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                  style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.30)" }}>
                  <span className="text-lg font-bold font-mono" style={{ color: "#34d399" }}>
                    {name.charAt(0)}
                  </span>
                </div>
                <p className="font-sans font-semibold text-xs mb-1" style={{ color: "#ecfdf5" }}>{name}</p>
                <p className="font-sans text-[10px]" style={{ color: "rgba(167,243,208,0.5)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUSINESS OUTCOME ──────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            ref={outcomeRef}
            className="opacity-0 relative rounded-3xl overflow-hidden p-10 md:p-14 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(52,211,153,0.08) 0%, rgba(16,185,129,0.12) 50%, rgba(52,211,153,0.06) 100%)",
              border: "1px solid rgba(52,211,153,0.25)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Radial glow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(52,211,153,0.14) 0%, transparent 65%)" }} />

            {/* Shimmer border top */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.7), transparent)" }} />

            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-6"
              style={{ color: "#34d399" }}>
              <span className="w-5 h-px" style={{ background: "linear-gradient(90deg, transparent, #34d399)" }} />
              Business Outcome
              <span className="w-5 h-px" style={{ background: "linear-gradient(90deg, #34d399, transparent)" }} />
            </span>

            <h2 className="font-bold font-sans text-3xl md:text-4xl leading-tight mb-6"
              style={{ color: "#f0fdf4", letterSpacing: "-0.025em" }}>
              Unlock Global Liquidity &amp; 24/7 Tradability{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #34d399 0%, #6ee7b7 100%)" }}>
                for Property Assets
              </span>
            </h2>

            <p className="font-serif text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
              style={{ color: "rgba(167,243,208,0.75)" }}>
              By tokenizing real-world property assets on compliant blockchain rails, operators unlock continuous
              secondary trading, automated yield distribution, and a borderless investor base — transforming
              illiquid real estate into a composable, programmable financial asset.
            </p>

            {/* Outcome stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {[
                { stat: "10×", label: "Wider Investor Reach", sub: "via global fractional access" },
                { stat: "40%", label: "Faster Capital Deployment", sub: "vs. traditional syndication" },
                { stat: "60%", label: "Lower Admin Overhead", sub: "automated compliance & payouts" },
              ].map(({ stat, label, sub }) => (
                <div key={label} className="rounded-xl p-5"
                  style={{
                    background: "rgba(52,211,153,0.07)",
                    border: "1px solid rgba(52,211,153,0.18)",
                  }}>
                  <div className="font-bold font-mono text-3xl mb-1" style={{ color: "#34d399" }}>{stat}</div>
                  <div className="font-sans font-semibold text-sm mb-0.5" style={{ color: "#ecfdf5" }}>{label}</div>
                  <div className="font-sans text-xs" style={{ color: "rgba(167,243,208,0.5)" }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-sans font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
                color: "#022c22",
                boxShadow: "0 0 36px rgba(52,211,153,0.35)",
              }}
            >
              Start Your Tokenization Journey
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
