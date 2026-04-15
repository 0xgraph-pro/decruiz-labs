import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// ── Animated canvas hero ──────────────────────────────────────────────────
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

    type Node = { x: number; y: number; vx: number; vy: number; r: number; color: string; pulse: number };
    const COLORS = ["#818cf8", "#a78bfa", "#e879f9", "#38bdf8", "#34d399"];
    const nodes: Node[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2.5 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = nodes[i].color;
            ctx.globalAlpha = (1 - dist / 140) * 0.2;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        const glow = 0.6 + 0.4 * Math.sin(t + n.pulse);
        ctx.globalAlpha = glow * 0.85;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
        ctx.globalAlpha = glow * 0.15;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.5 }} />;
}

// ── Section data ──────────────────────────────────────────────────────────
const architectureItems = [
  {
    title: "Embedded Wallet SDK",
    desc: "Spin up non-custodial in-app wallets without extension prompts. Users get a wallet tied to their email, social, or passkey — invisible to them, fully theirs.",
    color: "#818cf8",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M2 10h18" stroke="currentColor" strokeWidth="1.4" />
        <rect x="14" y="12.5" width="4" height="2.5" rx="1.25" fill="currentColor" opacity="0.9" />
        <path d="M6 6V5a3 3 0 0 1 6 0v1" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </svg>
    ),
  },
  {
    title: "WalletConnect + Multi-Chain Sessions",
    desc: "First-class WalletConnect v2 integration with persistent multi-chain session state. Users connect once across EVM, Cosmos, Solana, and more.",
    color: "#38bdf8",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="5" cy="11" r="3" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <circle cx="17" cy="11" r="3" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M8 11h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="11" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M11 6.5v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "MPC & Enterprise Key Security",
    desc: "Threshold signature scheme splits keys across distributed nodes. No single point of compromise. HSM-backed enterprise vaults for institutional clients.",
    color: "#a78bfa",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2L4 5v6c0 5 3.5 8.5 7 9.5 3.5-1 7-4.5 7-9.5V5L11 2z" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <circle cx="11" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M11 13.5v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "DID / ENS Identity Resolution",
    desc: "Resolve human-readable identities across W3C DID methods, ENS domains, Lens handles, and Unstoppable Domains — unified under a single identity graph.",
    color: "#e879f9",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <ellipse cx="11" cy="11" rx="3.5" ry="8" stroke="currentColor" strokeWidth="1.1" fill="none" />
        <path d="M3 11h16" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    ),
  },
  {
    title: "Reputation & On-Chain Profiles",
    desc: "Aggregate on-chain activity, NFT holdings, governance participation, and attestations into a portable reputation score visible across your ecosystem.",
    color: "#34d399",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M3 19c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M14 6l1 1.5-3.5 3-1.5-1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "KYC / AML Integration",
    desc: "Plug-in compliance layer with Sumsub, Jumio, and Persona adapters. Attach verifiable credentials on-chain so users don\'t re-verify across apps.",
    color: "#fb923c",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="4" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M7 9h8M7 12h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="16" cy="15" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M15 15l.9.9 1.6-1.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Session Management",
    desc: "Fine-grained session tokens with scope controls, expiry, and revocation. Delegate partial signing authority for dApp interactions without exposing the root key.",
    color: "#f472b6",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="9" width="18" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M7 9V6a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <circle cx="11" cy="14.5" r="2" fill="currentColor" opacity="0.8" />
        <path d="M11 16.5v1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Account Abstraction (ERC-4337)",
    desc: "Smart contract wallets with gas sponsorship, batched transactions, and social recovery. Remove all native token requirements for new users entirely.",
    color: "#22d3ee",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="2" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <rect x="12" y="2" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <rect x="2" y="12" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <rect x="12" y="12" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M10 6h2M6 10v2M16 10v2M10 16h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const useCases = [
  {
    title: "One-Click Metaverse Login",
    desc: "Players enter immersive worlds immediately — wallet created passively in the background, avatar NFTs auto-loaded, zero extension prompts.",
    tag: "GameFi",
    color: "#a78bfa",
    image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "DEX Onboarding",
    desc: "New DeFi users fund a gasless smart wallet via card or bank transfer and immediately swap on-chain — no ETH float required.",
    tag: "DeFi",
    color: "#22d3ee",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698b98d?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Enterprise Client Portals",
    desc: "Staff authenticate with corporate SSO, receive an MPC-backed wallet scoped to permissioned smart contracts, and sign transactions from the browser.",
    tag: "Enterprise",
    color: "#38bdf8",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Investor Dashboard Access",
    desc: "Accredited investors pass KYC once, receive a verifiable credential on-chain, and access gated RWA dashboards across protocols without re-verifying.",
    tag: "RWA / Finance",
    color: "#34d399",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=80&auto=format&fit=crop",
  },
];

const outcomes = [
  { metric: "↓ 84%", label: "Reduction in drop-off at wallet creation step", color: "#818cf8" },
  { metric: "3.2×", label: "Higher activation rate vs native wallet flows", color: "#22d3ee" },
  { metric: "< 8s", label: "Average time from signup to first on-chain action", color: "#a78bfa" },
  { metric: "Zero", label: "ETH required for new user gas fees with AA sponsorship", color: "#34d399" },
];

const techStack = [
  { name: "ERC-4337", sub: "Account Abstraction" },
  { name: "WalletConnect v2", sub: "Multi-chain sessions" },
  { name: "W3C DID", sub: "Decentralised IDs" },
  { name: "MPC / TSS", sub: "Threshold signatures" },
  { name: "ENS", sub: "Identity resolution" },
  { name: "Passkeys / WebAuthn", sub: "Passwordless auth" },
  { name: "EIP-712", sub: "Typed signing" },
  { name: "Verifiable Credentials", sub: "W3C VC / zkProof" },
];

// ── Page component ────────────────────────────────────────────────────────
export default function IdentityWalletPage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);
  const outcomesRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(".hero-badge", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.1 });
      gsap.fromTo(".hero-headline", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.25 });
      gsap.fromTo(".hero-sub", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.45 });
      gsap.fromTo(".hero-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.65 });
      gsap.fromTo(".hero-stat", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: "back.out(1.4)", delay: 0.8 });

      // Overview
      gsap.fromTo(".overview-block", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: overviewRef.current, start: "top 80%" },
      });

      // Architecture grid
      gsap.fromTo(".arch-card", { opacity: 0, y: 45, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: "back.out(1.2)",
        scrollTrigger: { trigger: archRef.current, start: "top 78%" },
      });

      // Use cases
      gsap.fromTo(".uc-card", { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.7, stagger: 0.13, ease: "power3.out",
        scrollTrigger: { trigger: useCasesRef.current, start: "top 78%" },
      });

      // Outcomes
      gsap.fromTo(".outcome-card", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.3)",
        scrollTrigger: { trigger: outcomesRef.current, start: "top 80%" },
      });

      // Stack
      gsap.fromTo(".stack-pill", { opacity: 0, scale: 0.8 }, {
        opacity: 1, scale: 1, duration: 0.5, stagger: 0.07, ease: "back.out(1.6)",
        scrollTrigger: { trigger: stackRef.current, start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, hsl(220,80%,7%) 0%, hsl(240,60%,9%) 50%, hsl(220,80%,7%) 100%)" }}
    >
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[88vh] flex items-center justify-center overflow-hidden px-6 pt-24 pb-16">
        <HeroCanvas />

        {/* Radial bloom */}
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(129,140,248,0.14) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Breadcrumb / back */}
          <button
            onClick={() => navigate(-1)}
            className="hero-badge inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors text-sm font-mono opacity-0"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Ecosystem
          </button>

          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full opacity-0"
            style={{ background: "rgba(129,140,248,0.12)", border: "1px solid rgba(129,140,248,0.35)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#818cf8", boxShadow: "0 0 8px #818cf8" }} />
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "#818cf8" }}>Identity Layer</span>
          </div>

          <h1
            className="hero-headline font-bold font-sans opacity-0 mb-6 leading-none"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              letterSpacing: "-0.04em",
              color: "#f0f4ff",
            }}
          >
            Secure Onboarding for{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #818cf8 0%, #e879f9 50%, #38bdf8 100%)" }}
            >
              Seamless Web3 Adoption
            </span>
          </h1>

          <p
            className="hero-sub font-serif text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-0 mb-10"
            style={{ color: "rgba(180,190,220,0.80)" }}
          >
            Wallet abstraction, MPC key security, DID resolution, social login, and gasless UX — unified in a single embeddable identity infrastructure.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 mb-16">
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-3.5 rounded-full font-sans font-semibold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #818cf8, #a78bfa, #e879f9)",
                boxShadow: "0 4px 24px rgba(129,140,248,0.35)",
              }}
            >
              Book Architecture Review
            </button>
            <button
              onClick={() => navigate("/docs")}
              className="px-8 py-3.5 rounded-full font-sans font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(129,140,248,0.10)",
                border: "1px solid rgba(129,140,248,0.40)",
                color: "#a5b4ff",
              }}
            >
              Read the Docs
            </button>
          </div>

          {/* Hero stat strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { val: "< 8s", label: "to first on-chain action" },
              { val: "ERC-4337", label: "account abstraction" },
              { val: "10+ chains", label: "multi-chain sessions" },
              { val: "Zero-ETH", label: "gasless onboarding" },
            ].map(({ val, label }) => (
              <div key={label} className="hero-stat text-center opacity-0">
                <p className="font-bold font-sans text-xl md:text-2xl" style={{ color: "#818cf8" }}>{val}</p>
                <p className="text-xs font-sans mt-0.5" style={{ color: "rgba(180,190,220,0.60)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ─────────────────────────────────────────────────────── */}
      <section ref={overviewRef} className="relative py-24 px-6">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(56,189,248,0.06) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto">
          <div className="overview-block text-center mb-14 opacity-0">
            <span className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest mb-5">
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(198,90%,45%))" }} />
              Platform Overview
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, hsl(198,90%,45%), transparent)" }} />
            </span>
            <h2 className="font-bold font-sans text-3xl md:text-4xl mb-4" style={{ color: "#f0f4ff", letterSpacing: "-0.03em" }}>
              One SDK. Every Identity Primitive.
            </h2>
            <p className="font-serif text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(180,190,220,0.75)" }}>
              DeCruiz&#39;s Identity & Wallet layer abstracts the complexity of key management, chain differences, and compliance requirements behind a developer-friendly SDK — so your users never see a seed phrase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Wallet Abstraction",
                desc: "Embedded wallets created silently on signup. Users interact via email or social login while owning their keys through MPC — no extension, no seed phrase drama.",
                color: "#818cf8",
                icon: "🔐",
                image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&q=80&auto=format&fit=crop",
              },
              {
                title: "Decentralised Identity",
                desc: "W3C DID, ENS, and Lens protocol support out of the box. Build rich identity graphs with verifiable credentials, on-chain reputation, and cross-app portability.",
                color: "#e879f9",
                icon: "🌐",
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop",
              },
              {
                title: "Gasless & Frictionless UX",
                desc: "ERC-4337 account abstraction with paymaster support sponsors gas for new users. Batched transactions and session keys eliminate repetitive approval popups.",
                color: "#22d3ee",
                icon: "⚡",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
              },
            ].map(({ title, desc, color, icon, image }) => (
              <div
                key={title}
                className="overview-block opacity-0 rounded-2xl relative overflow-hidden group"
                style={{
                  background: "rgba(15,20,40,0.55)",
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${color}30`,
                }}
              >
                {/* Card image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(180deg, rgba(8,12,28,0.15) 0%, rgba(8,12,28,0.75) 100%)` }}
                  />
                  <div
                    className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${color}55 0%, transparent 65%)` }}
                  />
                  <div
                    className="absolute top-4 left-4 text-2xl w-10 h-10 flex items-center justify-center rounded-xl"
                    style={{ background: "rgba(8,12,28,0.60)", border: `1px solid ${color}55`, backdropFilter: "blur(8px)" }}
                  >
                    {icon}
                  </div>
                </div>
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}70, transparent)` }} />
                {/* Text */}
                <div className="p-6">
                  <h3 className="font-bold font-sans text-base mb-2" style={{ color: "#f0f4ff" }}>{title}</h3>
                  <p className="text-sm font-sans leading-relaxed" style={{ color: "rgba(180,190,220,0.72)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE SECTIONS ─────────────────────────────────────────── */}
      <section ref={archRef} className="relative py-24 px-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 0%, rgba(129,140,248,0.04) 50%, transparent 100%)" }} />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest mb-5">
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(198,90%,45%))" }} />
              Architecture Deep-Dive
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, hsl(198,90%,45%), transparent)" }} />
            </span>
            <h2 className="font-bold font-sans text-3xl md:text-4xl mb-4" style={{ color: "#f0f4ff", letterSpacing: "-0.03em" }}>
              Eight Identity Primitives
            </h2>
            <p className="font-serif text-base max-w-xl mx-auto" style={{ color: "rgba(180,190,220,0.70)" }}>
              Composable, audited, and production-proven modules you can mix and match.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {architectureItems.map(({ title, desc, color, icon }) => (
              <div
                key={title}
                className="arch-card opacity-0 rounded-2xl p-6 flex flex-col relative overflow-hidden group transition-all duration-300"
                style={{
                  background: "rgba(12,16,35,0.65)",
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${color}28`,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 36px ${color}28, 0 0 0 1px ${color}40`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.35)";
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}80, transparent)` }} />
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-xl mb-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${color}15`, border: `1px solid ${color}40`, color }}
                >
                  {icon}
                </div>
                <h3 className="font-bold font-sans text-sm mb-2 leading-snug" style={{ color: "#eef0ff" }}>{title}</h3>
                <p className="text-xs font-sans leading-relaxed flex-1" style={{ color: "rgba(180,190,220,0.68)" }}>{desc}</p>
                <div className="mt-4 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                  <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: `${color}99` }}>Live</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ─────────────────────────────────────────────────────── */}
      <section ref={useCasesRef} className="relative py-24 px-6">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(160deg, hsl(240,60%,9%) 0%, hsl(250,55%,11%) 100%)" }}
        />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest mb-5">
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(198,90%,45%))" }} />
              Use Cases
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, hsl(198,90%,45%), transparent)" }} />
            </span>
            <h2 className="font-bold font-sans text-3xl md:text-4xl mb-4" style={{ color: "#f0f4ff", letterSpacing: "-0.03em" }}>
              Real Flows, Real Users
            </h2>
            <p className="font-serif text-base max-w-xl mx-auto" style={{ color: "rgba(180,190,220,0.70)" }}>
              Identity infrastructure that adapts to every vertical.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map(({ title, desc, tag, color, image }) => (
              <div
                key={title}
                className="uc-card opacity-0 group rounded-2xl overflow-hidden relative flex flex-col transition-all duration-400"
                style={{
                  background: "rgba(12,16,35,0.65)",
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${color}30`,
                  boxShadow: "0 4px 28px rgba(0,0,0,0.4)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 44px ${color}28`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 28px rgba(0,0,0,0.4)";
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden shrink-0">
                  <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,12,28,0.2) 0%, rgba(8,12,28,0.85) 100%)" }} />
                  <div className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${color}55 0%, transparent 60%)` }} />
                  <span
                    className="absolute top-4 left-4 text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full"
                    style={{ background: "rgba(8,12,28,0.72)", border: `1px solid ${color}55`, color, backdropFilter: "blur(8px)" }}
                  >
                    {tag}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-bold font-sans text-base mb-2 leading-snug" style={{ color: "#eef0ff" }}>{title}</h3>
                  <p className="text-sm font-sans leading-relaxed" style={{ color: "rgba(180,190,220,0.72)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUSINESS OUTCOMES ─────────────────────────────────────────────── */}
      <section ref={outcomesRef} className="relative py-24 px-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(129,140,248,0.09) 0%, transparent 65%)" }} />

        <div className="relative max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest mb-5">
            <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(198,90%,45%))" }} />
            Business Outcomes
            <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, hsl(198,90%,45%), transparent)" }} />
          </span>
          <h2 className="font-bold font-sans text-3xl md:text-4xl mb-4" style={{ color: "#f0f4ff", letterSpacing: "-0.03em" }}>
            Reduce Friction. Increase Activation.
          </h2>
          <p className="font-serif text-base max-w-2xl mx-auto mb-14" style={{ color: "rgba(180,190,220,0.72)" }}>
            Every percentage point of onboarding drop-off is revenue lost. Our identity layer directly targets the biggest friction points in Web3 user acquisition.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {outcomes.map(({ metric, label, color }) => (
              <div
                key={metric}
                className="outcome-card opacity-0 rounded-2xl p-7 relative overflow-hidden"
                style={{
                  background: "rgba(12,16,35,0.65)",
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${color}30`,
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}70, transparent)` }} />
                <p className="font-bold font-sans text-3xl md:text-4xl mb-2" style={{ color }}>{metric}</p>
                <p className="text-xs font-sans leading-relaxed" style={{ color: "rgba(180,190,220,0.70)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK PILLS ─────────────────────────────────────────────── */}
      <section ref={stackRef} className="relative py-20 px-6">
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest mb-5">
            <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(198,90%,45%))" }} />
            Standards & Protocols
            <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, hsl(198,90%,45%), transparent)" }} />
          </span>
          <h2 className="font-bold font-sans text-2xl md:text-3xl mb-8" style={{ color: "#f0f4ff", letterSpacing: "-0.02em" }}>
            Built on Open Standards
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map(({ name, sub }) => (
              <div
                key={name}
                className="stack-pill opacity-0 flex flex-col items-center px-5 py-3 rounded-xl transition-all duration-200 hover:scale-105 cursor-default"
                style={{
                  background: "rgba(129,140,248,0.08)",
                  border: "1px solid rgba(129,140,248,0.28)",
                }}
              >
                <span className="font-mono font-semibold text-sm" style={{ color: "#a5b4ff" }}>{name}</span>
                <span className="text-[10px] font-sans mt-0.5" style={{ color: "rgba(180,190,220,0.55)" }}>{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER ───────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(167,139,250,0.12) 0%, transparent 65%)" }} />
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-25" />

        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="font-bold font-sans text-3xl md:text-4xl mb-4 leading-tight" style={{ color: "#f0f4ff", letterSpacing: "-0.03em" }}>
            Ready to eliminate{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #818cf8, #e879f9, #38bdf8)" }}>
              onboarding friction
            </span>
            ?
          </h2>
          <p className="font-serif text-base md:text-lg mb-10" style={{ color: "rgba(180,190,220,0.72)" }}>
            Book a 60-minute architecture session and we&#39;ll map the right identity primitives to your product&#39;s specific onboarding flow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-3.5 rounded-full font-sans font-semibold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #818cf8, #a78bfa, #e879f9)",
                boxShadow: "0 4px 24px rgba(129,140,248,0.35)",
              }}
            >
              Book Strategy Call
            </button>
            <button
              onClick={() => navigate("/whitepaper")}
              className="px-8 py-3.5 rounded-full font-sans font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(129,140,248,0.10)",
                border: "1px solid rgba(129,140,248,0.40)",
                color: "#a5b4ff",
              }}
            >
              Read Whitepaper
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
