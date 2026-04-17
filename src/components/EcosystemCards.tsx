import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// ── SVG icon components ────────────────────────────────────────────────────
const WalletIcon = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="2" y="7" width="24" height="17" rx="3" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
    <path d="M2 12h24" stroke={color} strokeWidth="1.5" opacity="0.6" />
    <rect x="18" y="15.5" width="5" height="3" rx="1.5" fill={color} opacity="0.9" />
    <path d="M7 7V5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v2" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
  </svg>
);

const GameIcon = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="3" y="8" width="22" height="14" rx="4" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
    <path d="M10 12v4M8 14h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
    <circle cx="18" cy="13" r="1.2" fill={color} opacity="0.9" />
    <circle cx="20.5" cy="15.5" r="1.2" fill={color} opacity="0.9" />
    <circle cx="15.5" cy="15.5" r="1.2" fill={color} opacity="0.9" />
    <circle cx="18" cy="18" r="1.2" fill={color} opacity="0.9" />
  </svg>
);

const DexIcon = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="7" cy="14" r="4" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
    <circle cx="21" cy="14" r="4" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
    <path d="M11 12l6-2M11 16l6 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <circle cx="14" cy="14" r="2.5" fill={color} opacity="0.25" />
  </svg>
);

const RwaIcon = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M4 20L14 6l10 14H4z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" opacity="0.8" />
    <path d="M4 20h20" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <circle cx="14" cy="13" r="2" fill={color} opacity="0.7" />
    <path d="M9 20v-3a5 5 0 0 1 10 0v3" stroke={color} strokeWidth="1.2" fill="none" opacity="0.4" />
  </svg>
);

const NftIcon = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 3L25 9v10L14 25 3 19V9L14 3z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" opacity="0.8" />
    <path d="M14 3v22M3 9l11 7 11-7" stroke={color} strokeWidth="1" opacity="0.4" />
    <circle cx="14" cy="14" r="3" fill={color} opacity="0.5" />
  </svg>
);

const DaoIcon = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="10" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
    <circle cx="14" cy="7" r="2.5" fill={color} opacity="0.9" />
    <circle cx="20.5" cy="17.5" r="2.5" fill={color} opacity="0.9" />
    <circle cx="7.5" cy="17.5" r="2.5" fill={color} opacity="0.9" />
    <path d="M14 9.5v4M16.7 16.2l-2.7-2.7M11.3 16.2l2.7-2.7" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
  </svg>
);

const cards = [
  {
    title: "Unified Identity & Wallet Infrastructure",
    description: "Enable seamless onboarding through wallet login, DID, social authentication, and chain abstraction.",
    capabilities: ["WalletConnect / embedded wallets", "MPC wallets", "gasless onboarding", "DID / ENS identity", "reputation layers", "KYC integration"],
    tag: "Identity Layer",
    color: "#818cf8",
    glow: "rgba(129,140,248,0.30)",
    border: "rgba(129,140,248,0.35)",
    iconBg: "rgba(129,140,248,0.12)",
    Icon: WalletIcon,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Metaverse & GameFi Layer",
    description: "Power immersive virtual economies with true digital ownership.",
    capabilities: ["avatar NFTs", "land ownership", "play-to-earn systems", "in-game marketplaces", "creator monetization", "guild systems"],
    tag: "GameFi Layer",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.30)",
    border: "rgba(167,139,250,0.35)",
    iconBg: "rgba(167,139,250,0.12)",
    Icon: GameIcon,
    image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "DEX & Liquidity Engine",
    description: "Create ecosystem-wide liquidity for tokens, NFTs, and RWAs.",
    capabilities: ["AMM pools", "staking and farming", "token launchpad", "swap aggregation", "NFT liquidity", "treasury routing"],
    tag: "Finance Layer",
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.28)",
    border: "rgba(34,211,238,0.35)",
    iconBg: "rgba(34,211,238,0.10)",
    Icon: DexIcon,
    image: "/assests/dex-liquidity.jpeg",
  },
  {
    title: "Real Estate Tokenization & RWA",
    description: "Bridge real-world assets into your Web3 economy.",
    capabilities: ["fractional ownership", "rental yield distribution", "collateralized lending", "secondary trading", "investor dashboards", "compliance workflows"],
    tag: "RWA Layer",
    color: "#34d399",
    glow: "rgba(52,211,153,0.28)",
    border: "rgba(52,211,153,0.35)",
    iconBg: "rgba(52,211,153,0.10)",
    Icon: RwaIcon,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "NFT Utility & Asset Interoperability",
    description: "Turn assets into cross-platform value drivers.",
    capabilities: ["multi-utility NFTs", "membership passes", "marketplace royalties", "gaming item portability", "collateral assets", "ticketing and access"],
    tag: "Asset Layer",
    color: "#f472b6",
    glow: "rgba(244,114,182,0.28)",
    border: "rgba(244,114,182,0.35)",
    iconBg: "rgba(244,114,182,0.10)",
    Icon: NftIcon,
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "DAO Governance & Treasury",
    description: "Empower community-led growth and transparent decision making.",
    capabilities: ["proposal management", "treasury voting", "grants systems", "staking governance", "on-chain analytics", "reward distribution"],
    tag: "Governance Layer",
    color: "#fb923c",
    glow: "rgba(251,146,60,0.28)",
    border: "rgba(251,146,60,0.35)",
    iconBg: "rgba(251,146,60,0.10)",
    Icon: DaoIcon,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80&auto=format&fit=crop",
  },
];

// ── Blockchain network canvas background ──────────────────────────────────
function NetworkCanvas() {
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

    type Node = { x: number; y: number; vx: number; vy: number; r: number; color: string };
    const COLORS = ["#818cf8", "#22d3ee", "#a78bfa", "#34d399", "#f472b6"];
    const nodes: Node[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 2 + 1.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 130;
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = nodes[i].color;
            ctx.globalAlpha = (1 - dist / maxDist) * 0.18;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        ctx.globalAlpha = 0.75;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // glow
        ctx.globalAlpha = 0.18;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // update
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
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
}

const CARD_ROUTES: Record<string, string> = {
  "Unified Identity & Wallet Infrastructure": "/identity-wallet",
  "Metaverse & GameFi Layer": "/metaverse-gamefi",
  "DEX & Liquidity Engine": "/dex-liquidity",
  "Real Estate Tokenization & RWA": "/rwa-tokenization",
  "NFT Utility & Asset Interoperability": "/nft-utility",
  "DAO Governance & Treasury": "/dao-governance",
};

export default function EcosystemCards() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        }
      );

      const cardEls = cardsRef.current?.querySelectorAll(".eco-card");
      if (cardEls) {
        gsap.fromTo(
          cardEls,
          { opacity: 0, y: 50, scale: 0.93 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.3)", stagger: 0.12,
            scrollTrigger: { trigger: cardsRef.current, start: "top 78%" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ecosystem"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, hsl(220,80%,8%) 0%, hsl(240,60%,10%) 40%, hsl(220,80%,8%) 100%)",
      }}
      aria-labelledby="ecosystem-heading"
    >
      {/* Blockchain network animation */}
      <NetworkCanvas />

      {/* Dark gradient radial blooms */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(129,140,248,0.10) 0%, transparent 65%)" }} />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.08) 0%, transparent 65%)" }} />

      {/* Grid lines overlay */}
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <span className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest mb-5">
            <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(198,90%,45%))" }} />
            The Ecosystem
            <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, hsl(198,90%,45%), transparent)" }} />
          </span>
          <h2
            id="ecosystem-heading"
            className="text-foreground font-bold font-sans text-4xl md:text-5xl leading-tight mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Six Pillars of{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #818cf8 0%, #22d3ee 50%, #a78bfa 100%)" }}
            >
              Ecosystem
            </span>
          </h2>
          <p className="text-muted-foreground font-serif text-lg max-w-2xl mx-auto leading-relaxed">
            Each component of the DeCruiz ecosystem is designed to work in harmony,
            creating a seamless Web3 experience.
          </p>
        </div>

        {/* ── 3-column card grid ── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {cards.map(({ title, description, tag, capabilities, color, glow, border, iconBg, Icon, image }) => (
            <div
              key={title}
              className="eco-card opacity-0 group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-400 flex flex-col"
              onClick={() => CARD_ROUTES[title] && navigate(CARD_ROUTES[title])}
              style={{
                background: "rgba(15, 20, 40, 0.55)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: `1px solid ${border}`,
                boxShadow: `0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)`,
              }}
              role="article"
              tabIndex={0}
              aria-label={title}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 48px ${glow}, 0 0 0 1px ${border}, inset 0 1px 0 rgba(255,255,255,0.08)`;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px) scale(1.01)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)`;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0) scale(1)";
              }}
            >
              {/* ── Image header with icon overlay ── */}
              <div className="relative h-40 w-full overflow-hidden shrink-0">
                {/* Background image */}
                <img
                  src={image}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark gradient overlay so text/icon stay readable */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, rgba(8,12,28,0.25) 0%, rgba(8,12,28,0.78) 100%)`,
                  }}
                />
                {/* Accent tint overlay */}
                <div
                  className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${color}55 0%, transparent 60%)` }}
                />

                {/* Tag badge — top-right corner */}
                <span
                  className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{
                    background: `rgba(8,12,28,0.72)`,
                    border: `1px solid ${color}50`,
                    color: color,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {tag}
                </span>

                {/* Icon badge — bottom-left corner overlapping the image */}
                <div
                  className="absolute -bottom-5 left-5 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 z-10"
                  style={{
                    background: `rgba(8,12,28,0.82)`,
                    border: `1.5px solid ${color}70`,
                    boxShadow: `0 0 22px ${glow}, 0 4px 12px rgba(0,0,0,0.5)`,
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <Icon color={color} />
                </div>
              </div>

              {/* Top gradient shimmer line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${color}80, transparent)` }}
              />

              {/* Hover glow bloom */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${glow} 0%, transparent 60%)` }}
              />

              {/* Card content — extra top padding to clear the protruding icon */}
              <div className="relative pt-8 px-6 pb-6 flex flex-col flex-1">

                {/* Title */}
                <h3
                  className="font-bold font-sans text-base mb-2 leading-tight"
                  style={{ color: "#f0f4ff" }}
                >
                  {title}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm leading-relaxed mb-5" style={{ color: "rgba(180,190,220,0.75)" }}>
                  {description}
                </p>

                {/* Core capabilities */}
                <div className="mt-auto">
                  <p
                    className="text-[9px] font-mono uppercase tracking-[0.15em] mb-2.5"
                    style={{ color: `${color}bb` }}
                  >
                    Core capabilities
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="text-[11px] font-sans px-2.5 py-0.5 rounded-full transition-colors duration-200"
                        style={{
                          background: `${color}0e`,
                          border: `1px solid ${color}28`,
                          color: "rgba(200,210,240,0.8)",
                        }}
                      >
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom animated pulse dot */}
              <div className="absolute bottom-4 right-4">
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Ecosystem flow map strip ── */}
        <div className="mt-16 relative overflow-hidden rounded-2xl"
          style={{
            background: "rgba(10,14,30,0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(129,140,248,0.2)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(129,140,248,0.07) 0%, transparent 70%)" }} />

          <div className="relative px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#818cf8" }}>
                Ecosystem Flow
              </p>
              <p className="text-foreground font-sans font-semibold text-sm" style={{ color: "rgba(220,225,255,0.9)" }}>
                Every pillar connects to power a unified, composable Web3 economy
              </p>
            </div>

            {/* Flow nodes row */}
            <div className="flex items-center gap-0 shrink-0">
              {cards.map(({ color, Icon }, i) => (
                <React.Fragment key={i}>
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-200 hover:scale-125"
                    style={{
                      background: `${color}18`,
                      border: `1px solid ${color}45`,
                      boxShadow: `0 0 12px ${color}30`,
                    }}
                  >
                    <Icon color={color} />
                  </div>
                  {i < cards.length - 1 && (
                    <div className="flex items-center mx-1">
                      <svg width="20" height="6" viewBox="0 0 20 6" fill="none">
                        <path d="M0 3h16M14 1l3 2-3 2" stroke={cards[i + 1].color} strokeWidth="1" strokeLinecap="round" opacity="0.55" />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
