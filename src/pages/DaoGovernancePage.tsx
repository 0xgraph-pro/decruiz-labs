import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// ── Hero Canvas — orbital governance nodes ────────────────────────────────
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

    type Node = { x: number; y: number; vx: number; vy: number; r: number; opacity: number };
    type Ring = { cx: number; cy: number; radius: number; speed: number; angle: number; dotColor: string };

    const ORANGE = "#fb923c";
    const AMBER = "#fbbf24";
    const PEACH = "#fdba74";

    const nodes: Node[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.8,
      opacity: Math.random() * 0.5 + 0.25,
    }));

    const rings: Ring[] = [
      { cx: 0.75, cy: 0.35, radius: 100, speed: 0.004, angle: 0, dotColor: ORANGE },
      { cx: 0.75, cy: 0.35, radius: 155, speed: -0.0028, angle: Math.PI / 3, dotColor: AMBER },
      { cx: 0.75, cy: 0.35, radius: 205, speed: 0.0018, angle: Math.PI, dotColor: PEACH },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw orbital rings
      rings.forEach((ring) => {
        const cx = ring.cx * canvas.width;
        const cy = ring.cy * canvas.height;

        ctx.beginPath();
        ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = ring.dotColor;
        ctx.globalAlpha = 0.08;
        ctx.lineWidth = 1;
        ctx.stroke();

        // orbiting dot
        const dx = cx + Math.cos(ring.angle) * ring.radius;
        const dy = cy + Math.sin(ring.angle) * ring.radius;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(dx, dy, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = ring.dotColor;
        ctx.fill();

        // orbital dot glow
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.arc(dx, dy, 10, 0, Math.PI * 2);
        ctx.fillStyle = ring.dotColor;
        ctx.fill();

        ring.angle += ring.speed;
      });

      // connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.globalAlpha = (1 - dist / 120) * 0.12;
            ctx.strokeStyle = ORANGE;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // node dots
      nodes.forEach((n) => {
        ctx.globalAlpha = n.opacity;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = ORANGE;
        ctx.fill();
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
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

// ── Module data ───────────────────────────────────────────────────────────
const modules = [
  {
    title: "Proposal Lifecycle",
    description: "End-to-end proposal creation, deliberation, voting, and execution with full on-chain audit trails.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="3" y="3" width="20" height="20" rx="3" stroke="#fb923c" strokeWidth="1.4" fill="none" opacity="0.8" />
        <path d="M8 9h10M8 13h7M8 17h4" stroke="#fb923c" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
        <circle cx="19" cy="17" r="3.5" fill="#fb923c" opacity="0.25" stroke="#fb923c" strokeWidth="1.2" />
        <path d="M17.5 17l1 1 2.5-2" stroke="#fb923c" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    tags: ["Draft → Review → Vote", "quorum thresholds", "timelock execution", "veto mechanisms"],
  },
  {
    title: "Treasury Execution",
    description: "Automated multi-sig treasury flows with on-chain spending approval and budget allocation controls.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="2" y="7" width="22" height="14" rx="3" stroke="#fbbf24" strokeWidth="1.4" fill="none" opacity="0.8" />
        <path d="M2 11h22" stroke="#fbbf24" strokeWidth="1.4" opacity="0.5" />
        <rect x="16" y="13.5" width="5" height="3" rx="1.5" fill="#fbbf24" opacity="0.8" />
        <path d="M6 7V5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v2" stroke="#fbbf24" strokeWidth="1.2" fill="none" opacity="0.4" />
        <circle cx="7" cy="16" r="1.5" fill="#fbbf24" opacity="0.6" />
      </svg>
    ),
    tags: ["Gnosis Safe", "multi-sig flows", "budget epochs", "spending limits"],
  },
  {
    title: "Grant Management",
    description: "Structured grant programs with milestone-based disbursements, applicant scoring, and reviewer workflows.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="10" stroke="#fb923c" strokeWidth="1.4" fill="none" opacity="0.6" />
        <path d="M13 7v6l4 2" stroke="#fb923c" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
        <path d="M7 19l3-3M19 19l-3-3" stroke="#fb923c" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
      </svg>
    ),
    tags: ["milestone payments", "reviewer scoring", "applicant portal", "disbursement chain"],
  },
  {
    title: "Vote Delegation",
    description: "Liquid democracy with delegatable voting power, delegation chains, and snapshot-based checkpointing.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="7" cy="10" r="3.5" stroke="#fdba74" strokeWidth="1.3" fill="none" opacity="0.8" />
        <circle cx="19" cy="10" r="3.5" stroke="#fdba74" strokeWidth="1.3" fill="none" opacity="0.8" />
        <circle cx="13" cy="19" r="3.5" stroke="#fdba74" strokeWidth="1.3" fill="none" opacity="0.8" />
        <path d="M9.5 11.5L12 17M16.5 11.5L14 17" stroke="#fdba74" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <path d="M10 10h6" stroke="#fdba74" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    tags: ["liquid democracy", "delegation chains", "snapshot checkpointing", "vote weight"],
  },
  {
    title: "Staking Governance",
    description: "Stake-to-vote mechanics with veToken models, lock periods, and governance boost multipliers.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 3l9 5v10L13 23 4 18V8L13 3z" stroke="#fb923c" strokeWidth="1.4" fill="none" strokeLinejoin="round" opacity="0.75" />
        <path d="M13 3v20M4 8l9 7 9-7" stroke="#fb923c" strokeWidth="1" opacity="0.35" />
        <circle cx="13" cy="13" r="3.5" fill="#fb923c" opacity="0.3" />
        <circle cx="13" cy="13" r="1.5" fill="#fb923c" opacity="0.8" />
      </svg>
    ),
    tags: ["veToken model", "lock periods", "governance boost", "vote escrow"],
  },
  {
    title: "Quorum Analytics",
    description: "Real-time dashboards tracking voter participation, quorum progress, proposal approval rates, and turnout trends.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="3" y="3" width="20" height="20" rx="3" stroke="#fbbf24" strokeWidth="1.4" fill="none" opacity="0.6" />
        <path d="M7 18l4-5 4 3 4-7" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
        <circle cx="7" cy="18" r="1.3" fill="#fbbf24" opacity="0.8" />
        <circle cx="11" cy="13" r="1.3" fill="#fbbf24" opacity="0.8" />
        <circle cx="15" cy="16" r="1.3" fill="#fbbf24" opacity="0.8" />
        <circle cx="19" cy="9" r="1.3" fill="#fbbf24" opacity="0.8" />
      </svg>
    ),
    tags: ["live turnout data", "quorum heatmaps", "approval rate trends", "abstention tracking"],
  },
  {
    title: "Contributor Rewards",
    description: "Automate contributor compensation with on-chain bounties, retroactive public goods funding, and reputation NFTs.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 3l2.5 6h6l-5 4 2 6.5L13 16l-5.5 3.5 2-6.5-5-4h6L13 3z" stroke="#fb923c" strokeWidth="1.3" fill="none" strokeLinejoin="round" opacity="0.8" />
        <circle cx="13" cy="13" r="4" fill="#fb923c" opacity="0.15" />
      </svg>
    ),
    tags: ["on-chain bounties", "retroPGF", "reputation NFTs", "contributor scoring"],
  },
  {
    title: "Treasury Reporting",
    description: "Transparent financial reporting with exportable on-chain balance sheets, token flow analytics, and audit readiness.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="4" y="2" width="18" height="22" rx="2.5" stroke="#fdba74" strokeWidth="1.4" fill="none" opacity="0.75" />
        <path d="M8 8h10M8 12h10M8 16h6" stroke="#fdba74" strokeWidth="1.3" strokeLinecap="round" opacity="0.65" />
        <circle cx="20" cy="20" r="4" fill="rgba(15,20,40,0.9)" stroke="#fdba74" strokeWidth="1.2" />
        <path d="M18.5 20l1 1 2-2" stroke="#fdba74" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    tags: ["on-chain balance sheets", "token flow analytics", "audit exports", "multi-asset view"],
  },
];

// ── Use case data ─────────────────────────────────────────────────────────
const useCases = [
  {
    id: "ecosystem-governance",
    label: "Ecosystem Governance",
    headline: "Protocol-Wide Community Decisions",
    description: "Coordinate large token-holder communities to vote on protocol upgrades, fee parameters, and treasury allocations via transparent, tamper-proof on-chain mechanisms.",
    metrics: [
      { label: "Avg Voter Participation", value: "+68%" },
      { label: "Failed Proposals (malicious)", value: "0" },
      { label: "Execution Time Post-Vote", value: "<6 hrs" },
    ],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=700&q=80&auto=format&fit=crop",
  },
  {
    id: "grant-dao",
    label: "Grant DAO",
    headline: "Decentralised Grant Allocation",
    description: "Run a fully decentralised grant program where community reviewers score applications, token holders vote on funding, and milestones gate automated disbursements.",
    metrics: [
      { label: "Milestone Completion Rate", value: "82%" },
      { label: "Grant Processing Time", value: "<48 hrs" },
      { label: "Disbursement Overhead", value: "0%" },
    ],
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=700&q=80&auto=format&fit=crop",
  },
  {
    id: "protocol-treasury",
    label: "Protocol Treasury",
    headline: "On-Chain Treasury Operations",
    description: "Replace manual CFO processes with programmable treasury policies — automated yield strategies, multi-sig spending limits, and real-time on-chain financial reporting.",
    metrics: [
      { label: "Manual Overhead Reduction", value: "90%" },
      { label: "Treasury Yield APY", value: "12–18%" },
      { label: "Audit Readiness", value: "100%" },
    ],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&q=80&auto=format&fit=crop",
  },
  {
    id: "community-investment",
    label: "Community Investment Clubs",
    headline: "Tokenised Investment Collectives",
    description: "Launch investment clubs where members pool capital, vote on asset allocation, track portfolio performance, and receive proportional returns — all governed on-chain.",
    metrics: [
      { label: "Member Retention", value: "+74%" },
      { label: "Portfolio Transparency", value: "100%" },
      { label: "Returns Distribution Lag", value: "<1 min" },
    ],
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=700&q=80&auto=format&fit=crop",
  },
];

// ── Tech stack ────────────────────────────────────────────────────────────
const techStack = [
  { name: "OpenZeppelin Governor", desc: "Battle-tested governance primitives", color: "#fb923c" },
  { name: "Compound Governance", desc: "Delegation + timelock architecture", color: "#fbbf24" },
  { name: "Snapshot", desc: "Off-chain gasless voting layer", color: "#fdba74" },
  { name: "Gnosis Safe", desc: "Multi-sig treasury execution", color: "#fb923c" },
  { name: "Aragon OSx", desc: "Modular DAO plugin framework", color: "#fbbf24" },
  { name: "Tally", desc: "Governance UI & analytics", color: "#fdba74" },
  { name: "Chainlink Automation", desc: "Trustless proposal execution", color: "#fb923c" },
  { name: "Polygon zkEVM", desc: "Low-cost vote settlement layer", color: "#fbbf24" },
];

// ── Outcome stats ─────────────────────────────────────────────────────────
const outcomes = [
  { value: "3×", label: "Increase in voter retention after governance overhaul" },
  { value: "90%", label: "Reduction in manual treasury management overhead" },
  { value: "∞", label: "Composable governance — extend to any protocol layer" },
];

export default function DaoGovernancePage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const outcomeRef = useRef<HTMLDivElement>(null);

  const [activeUseCase, setActiveUseCase] = useState(0);

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text
      gsap.fromTo(
        heroRef.current?.querySelectorAll(".hero-anim") ?? [],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.15, delay: 0.2 }
      );

      // Stats strip
      gsap.fromTo(
        statsRef.current?.querySelectorAll(".stat-item") ?? [],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
        }
      );

      // Module cards
      gsap.fromTo(
        modulesRef.current?.querySelectorAll(".module-card") ?? [],
        { opacity: 0, y: 40, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "back.out(1.2)", stagger: 0.09,
          scrollTrigger: { trigger: modulesRef.current, start: "top 78%" },
        }
      );

      // Use cases section
      gsap.fromTo(
        useCasesRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: useCasesRef.current, start: "top 80%" },
        }
      );

      // Tech stack
      gsap.fromTo(
        techRef.current?.querySelectorAll(".tech-item") ?? [],
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.07,
          scrollTrigger: { trigger: techRef.current, start: "top 82%" },
        }
      );

      // Outcome
      gsap.fromTo(
        outcomeRef.current?.querySelectorAll(".outcome-item") ?? [],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12,
          scrollTrigger: { trigger: outcomeRef.current, start: "top 82%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const uc = useCases[activeUseCase];

  return (
    <div
      className="min-h-screen font-sans"
      style={{ background: "linear-gradient(160deg, hsl(220,80%,6%) 0%, hsl(25,60%,8%) 50%, hsl(220,80%,6%) 100%)" }}
    >
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[92vh] flex items-center"
        style={{ background: "linear-gradient(135deg, hsl(220,80%,7%) 0%, hsl(25,70%,9%) 55%, hsl(220,80%,7%) 100%)" }}
      >
        <HeroCanvas />

        {/* dark radial blooms */}
        <div className="pointer-events-none absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(251,146,60,0.12) 0%, transparent 65%)" }} />
        <div className="pointer-events-none absolute bottom-1/4 left-1/6 w-[450px] h-[450px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(251,191,36,0.08) 0%, transparent 65%)" }} />

        {/* grid lines */}
        <div className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: "linear-gradient(rgba(251,146,60,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(251,146,60,0.07) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left column */}
          <div>
            {/* Badge */}
            <div className="hero-anim opacity-0 inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(251,146,60,0.1)",
                border: "1px solid rgba(251,146,60,0.3)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-orange-400">Governance Layer</span>
            </div>

            {/* Headline */}
            <h1
              className="hero-anim opacity-0 font-bold text-4xl md:text-5xl xl:text-6xl leading-tight mb-6"
              style={{ letterSpacing: "-0.03em", color: "#f5f0e8" }}
            >
              Enable Transparent{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #fb923c 0%, #fbbf24 50%, #fdba74 100%)" }}
              >
                Community-Led
              </span>{" "}
              Decision Systems
            </h1>

            {/* Sub */}
            <p className="hero-anim opacity-0 font-serif text-lg leading-relaxed mb-8"
              style={{ color: "rgba(210,200,185,0.8)" }}>
              From proposal creation to treasury execution, DeCruiz Labs delivers a full-stack
              DAO governance infrastructure — transparent, composable, and built for long-term
              community alignment.
            </p>

            {/* CTAs */}
            <div className="hero-anim opacity-0 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/contact")}
                className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
                  color: "#fff",
                  boxShadow: "0 0 28px rgba(251,146,60,0.45)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(251,146,60,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 28px rgba(251,146,60,0.45)";
                }}
              >
                Launch Your DAO
              </button>
              <button
                onClick={() => navigate("/docs")}
                className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
                style={{
                  background: "rgba(251,146,60,0.08)",
                  border: "1px solid rgba(251,146,60,0.35)",
                  color: "#fb923c",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(251,146,60,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(251,146,60,0.08)";
                }}
              >
                View Governance Docs
              </button>
            </div>
          </div>

          {/* Right column — governance rings diagram */}
          <div className="hero-anim opacity-0 flex items-center justify-center">
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              {/* outer ring */}
              <div className="absolute inset-0 rounded-full animate-spin"
                style={{
                  border: "1px dashed rgba(251,146,60,0.2)",
                  animationDuration: "28s",
                }}
              />
              {/* mid ring */}
              <div className="absolute inset-10 rounded-full animate-spin"
                style={{
                  border: "1px dashed rgba(251,191,36,0.3)",
                  animationDuration: "18s",
                  animationDirection: "reverse",
                }}
              />
              {/* inner ring */}
              <div className="absolute inset-20 rounded-full animate-spin"
                style={{
                  border: "1px solid rgba(253,186,116,0.4)",
                  animationDuration: "10s",
                }}
              />

              {/* orbiting dots */}
              {[
                { top: "2%", left: "50%", color: "#fb923c", label: "Propose" },
                { top: "50%", right: "2%", color: "#fbbf24", label: "Vote" },
                { bottom: "2%", left: "50%", color: "#fdba74", label: "Execute" },
                { top: "50%", left: "2%", color: "#fb923c", label: "Report" },
              ].map(({ top, left, right, bottom, color, label }, i) => (
                <div
                  key={i}
                  className="absolute flex flex-col items-center gap-1"
                  style={{ top, left, right, bottom, transform: "translate(-50%,-50%)" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: `${color}18`,
                      border: `1px solid ${color}55`,
                      boxShadow: `0 0 14px ${color}40`,
                    }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color }}>{label}</span>
                </div>
              ))}

              {/* centre emblem */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(251,146,60,0.08)",
                    border: "1.5px solid rgba(251,146,60,0.4)",
                    boxShadow: "0 0 40px rgba(251,146,60,0.2)",
                  }}
                >
                  <svg width="36" height="36" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="10" stroke="#fb923c" strokeWidth="1.5" fill="none" opacity="0.6" />
                    <circle cx="14" cy="7" r="2.5" fill="#fb923c" opacity="0.9" />
                    <circle cx="20.5" cy="17.5" r="2.5" fill="#fbbf24" opacity="0.9" />
                    <circle cx="7.5" cy="17.5" r="2.5" fill="#fdba74" opacity="0.9" />
                    <path d="M14 9.5v4M16.7 16.2l-2.7-2.7M11.3 16.2l2.7-2.7" stroke="#fb923c" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STAT STRIP ───────────────────────────────────────────────────── */}
      <div
        ref={statsRef}
        className="border-y"
        style={{
          background: "rgba(12,16,32,0.85)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(251,146,60,0.18)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "8", label: "Governance Modules" },
            { value: "100+", label: "Supported Chains" },
            { value: "<2 min", label: "Avg Vote Settlement" },
            { value: "∞", label: "Composable Extensions" },
          ].map(({ value, label }) => (
            <div key={label} className="stat-item opacity-0 text-center">
              <p
                className="font-bold text-2xl md:text-3xl font-mono mb-1"
                style={{ color: "#fb923c" }}
              >
                {value}
              </p>
              <p className="text-xs font-sans uppercase tracking-wider" style={{ color: "rgba(210,200,185,0.55)" }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── MODULES GRID ─────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(251,146,60,0.06) 0%, transparent 65%)" }} />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-orange-400 font-mono text-xs uppercase tracking-widest mb-4">
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, #fb923c)" }} />
              Architecture
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, #fb923c, transparent)" }} />
            </span>
            <h2
              className="font-bold text-3xl md:text-4xl mb-4"
              style={{ color: "#f5f0e8", letterSpacing: "-0.03em" }}
            >
              Full-Stack Governance{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #fb923c 0%, #fbbf24 100%)" }}
              >
                Infrastructure
              </span>
            </h2>
            <p className="text-base font-serif max-w-2xl mx-auto" style={{ color: "rgba(210,200,185,0.65)" }}>
              Eight production-ready modules that cover every stage of the governance lifecycle.
            </p>
          </div>

          <div
            ref={modulesRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {modules.map(({ title, description, icon, tags }) => (
              <div
                key={title}
                className="module-card opacity-0 group rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 cursor-default"
                style={{
                  background: "rgba(15,20,40,0.6)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(251,146,60,0.18)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(251,146,60,0.45)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 40px rgba(251,146,60,0.18)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(251,146,60,0.18)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.35)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                {/* icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(251,146,60,0.1)",
                    border: "1px solid rgba(251,146,60,0.3)",
                    boxShadow: "0 0 16px rgba(251,146,60,0.12)",
                  }}
                >
                  {icon}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-2" style={{ color: "#f5f0e8" }}>{title}</h3>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(210,200,185,0.6)" }}>
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(251,146,60,0.08)",
                          border: "1px solid rgba(251,146,60,0.22)",
                          color: "rgba(253,186,116,0.85)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* pulse dot */}
                <div className="self-end">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: "#fb923c", boxShadow: "0 0 6px #fb923c" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ────────────────────────────────────────────────────── */}
      <section
        ref={useCasesRef}
        className="relative py-24 px-6 opacity-0"
        style={{ background: "rgba(10,14,28,0.7)" }}
      >
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(251,191,36,0.07) 0%, transparent 65%)" }} />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest mb-4">
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, #fbbf24)" }} />
              Use Cases
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, #fbbf24, transparent)" }} />
            </span>
            <h2
              className="font-bold text-3xl md:text-4xl mb-4"
              style={{ color: "#f5f0e8", letterSpacing: "-0.03em" }}
            >
              Governance for Every{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #fbbf24 0%, #fb923c 100%)" }}
              >
                Community Type
              </span>
            </h2>
          </div>

          {/* Tab selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {useCases.map((u, i) => (
              <button
                key={u.id}
                onClick={() => setActiveUseCase(i)}
                className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                style={
                  activeUseCase === i
                    ? {
                        background: "linear-gradient(135deg, #fb923c 0%, #fbbf24 100%)",
                        color: "#fff",
                        boxShadow: "0 0 20px rgba(251,146,60,0.4)",
                      }
                    : {
                        background: "rgba(251,146,60,0.08)",
                        border: "1px solid rgba(251,146,60,0.25)",
                        color: "rgba(253,186,116,0.8)",
                      }
                }
              >
                {u.label}
              </button>
            ))}
          </div>

          {/* Active use case panel */}
          <div
            className="rounded-2xl overflow-hidden grid md:grid-cols-2"
            style={{
              background: "rgba(15,20,40,0.7)",
              border: "1px solid rgba(251,146,60,0.2)",
              boxShadow: "0 8px 48px rgba(0,0,0,0.4)",
            }}
          >
            {/* image */}
            <div className="relative h-56 md:h-auto min-h-[240px] overflow-hidden">
              <img
                src={uc.image}
                alt={uc.label}
                key={uc.id}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(90deg, transparent 60%, rgba(15,20,40,0.95) 100%)" }} />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 60%, rgba(15,20,40,0.9) 100%)" }} />
            </div>

            {/* content */}
            <div className="p-8 flex flex-col justify-center">
              <span
                className="inline-block text-xs font-mono uppercase tracking-widest mb-3 px-3 py-1 rounded-full self-start"
                style={{
                  background: "rgba(251,146,60,0.12)",
                  border: "1px solid rgba(251,146,60,0.3)",
                  color: "#fb923c",
                }}
              >
                {uc.label}
              </span>
              <h3 className="font-bold text-xl md:text-2xl mb-3" style={{ color: "#f5f0e8" }}>
                {uc.headline}
              </h3>
              <p className="text-sm font-serif leading-relaxed mb-6" style={{ color: "rgba(210,200,185,0.7)" }}>
                {uc.description}
              </p>

              {/* metrics */}
              <div className="grid grid-cols-3 gap-3">
                {uc.metrics.map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl p-3 text-center"
                    style={{
                      background: "rgba(251,146,60,0.07)",
                      border: "1px solid rgba(251,146,60,0.2)",
                    }}
                  >
                    <p className="font-bold font-mono text-lg" style={{ color: "#fb923c" }}>{value}</p>
                    <p className="text-[10px] font-sans mt-0.5" style={{ color: "rgba(210,200,185,0.55)" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(251,146,60,0.05) 0%, transparent 65%)" }} />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-orange-400 font-mono text-xs uppercase tracking-widest mb-4">
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, #fb923c)" }} />
              Technology
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, #fb923c, transparent)" }} />
            </span>
            <h2
              className="font-bold text-3xl md:text-4xl"
              style={{ color: "#f5f0e8", letterSpacing: "-0.03em" }}
            >
              Governance Technology{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #fb923c 0%, #fbbf24 100%)" }}
              >
                Stack
              </span>
            </h2>
          </div>

          <div
            ref={techRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {techStack.map(({ name, desc, color }) => (
              <div
                key={name}
                className="tech-item opacity-0 group rounded-xl p-4 flex flex-col gap-2 transition-all duration-300"
                style={{
                  background: "rgba(15,20,40,0.65)",
                  border: `1px solid ${color}22`,
                  boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = `1px solid ${color}55`;
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 6px 28px ${color}20`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = `1px solid ${color}22`;
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.3)";
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                <p className="font-bold text-sm" style={{ color: "#f0ebe0" }}>{name}</p>
                <p className="text-xs" style={{ color: "rgba(210,200,185,0.55)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUSINESS OUTCOME ─────────────────────────────────────────────── */}
      <section
        ref={outcomeRef}
        className="relative py-24 px-6"
        style={{
          background: "linear-gradient(135deg, rgba(251,146,60,0.07) 0%, rgba(10,14,28,0.95) 50%, rgba(251,191,36,0.05) 100%)",
          borderTop: "1px solid rgba(251,146,60,0.15)",
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-orange-400 font-mono text-xs uppercase tracking-widest mb-5">
            <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, #fb923c)" }} />
            Business Outcome
            <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, #fb923c, transparent)" }} />
          </span>

          <h2
            className="font-bold text-3xl md:text-5xl mb-6 leading-tight"
            style={{ color: "#f5f0e8", letterSpacing: "-0.03em" }}
          >
            Turn Users Into{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #fb923c 0%, #fbbf24 50%, #fdba74 100%)" }}
            >
              Aligned Long-Term
            </span>{" "}
            Ecosystem Stakeholders
          </h2>

          <p
            className="font-serif text-lg mb-14 max-w-2xl mx-auto"
            style={{ color: "rgba(210,200,185,0.7)" }}
          >
            Community ownership via governance transforms passive users into active ecosystem
            builders — increasing retention, reducing churn, and compounding network value over time.
          </p>

          {/* Outcome stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {outcomes.map(({ value, label }) => (
              <div
                key={value}
                className="outcome-item opacity-0 rounded-2xl py-8 px-6"
                style={{
                  background: "rgba(15,20,40,0.7)",
                  border: "1px solid rgba(251,146,60,0.25)",
                  boxShadow: "0 4px 32px rgba(0,0,0,0.35)",
                }}
              >
                <p
                  className="font-bold font-mono text-5xl mb-3"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #fb923c 0%, #fbbf24 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {value}
                </p>
                <p className="text-sm font-serif" style={{ color: "rgba(210,200,185,0.65)" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-base transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
              color: "#fff",
              boxShadow: "0 0 40px rgba(251,146,60,0.4)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 60px rgba(251,146,60,0.55)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(251,146,60,0.4)";
            }}
          >
            Build Your DAO with DeCruiz Labs
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h12M11 5l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}
