import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const nodes = [
  {
    id: "apps",
    layer: "L1",
    label: "Application Layer",
    desc: "dApps · Marketplaces · Dashboards · SDKs",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.35)",
    border: "rgba(167,139,250,0.40)",
    bg: "rgba(167,139,250,0.06)",
    tags: ["Gaming", "DeFi", "Social"],
  },
  {
    id: "identity",
    layer: "L2",
    label: "Identity & Wallet",
    desc: "WalletConnect · MPC · DID / ENS · KYC · Gasless",
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.35)",
    border: "rgba(34,211,238,0.40)",
    bg: "rgba(34,211,238,0.06)",
    tags: ["MPC", "ENS", "KYC"],
  },
  {
    id: "core",
    layer: "L3",
    label: "Core Protocol",
    desc: "Smart Contracts · DAO · NFT Engine · DEX AMM",
    color: "#818cf8",
    glow: "rgba(129,140,248,0.45)",
    border: "rgba(129,140,248,0.55)",
    bg: "rgba(129,140,248,0.10)",
    tags: ["EVM", "DAO", "AMM"],
    highlight: true,
  },
  {
    id: "rwa",
    layer: "L4",
    label: "RWA & Asset Bridge",
    desc: "Tokenisation · Fractional · Compliance · Oracles",
    color: "#34d399",
    glow: "rgba(52,211,153,0.35)",
    border: "rgba(52,211,153,0.40)",
    bg: "rgba(52,211,153,0.06)",
    tags: ["RWA", "Oracle", "KYC"],
  },
  {
    id: "chain",
    layer: "L5",
    label: "Multi-Chain Infra",
    desc: "EVM · Cosmos · Solana · Layer 2 · Bridges",
    color: "#fb923c",
    glow: "rgba(251,146,60,0.35)",
    border: "rgba(251,146,60,0.40)",
    bg: "rgba(251,146,60,0.06)",
    tags: ["L2", "IBC", "ZK"],
  },
];

const stats = [
  { value: "5", label: "Protocol Layers" },
  { value: "100K+", label: "TPS Throughput" },
  { value: "<1s", label: "Cross-chain Latency" },
  { value: "EVM+", label: "Multi-chain Native" },
];

// ── Blockchain background canvas ──────────────────────────────────────────
function ArchNetworkCanvas() {
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

    const COLORS = nodes.map((n) => n.color);
    type PNode = { x: number; y: number; vx: number; vy: number; r: number; color: string };
    const pts: PNode[] = Array.from({ length: 42 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = pts[i].color;
            ctx.globalAlpha = (1 - d / 110) * 0.14;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      pts.forEach((p) => {
        ctx.globalAlpha = 0.65;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
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

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.45 }}
    />
  );
}

export default function ArchitectureFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animFrameRef = useRef<number>();

  // ── Animated SVG connector lines ─────────────────────────────────────────
  useEffect(() => {
    const svg = svgRef.current;
    const diagram = diagramRef.current;
    if (!svg || !diagram) return;

    type Particle = { progress: number; speed: number };
    const particles: Particle[][] = nodes.slice(0, -1).map(() =>
      Array.from({ length: 4 }, (_, i) => ({
        progress: i / 4,
        speed: 0.0025 + Math.random() * 0.0018,
      }))
    );

    const draw = () => {
      const dRect = diagram.getBoundingClientRect();
      svg.setAttribute("width", String(dRect.width));
      svg.setAttribute("height", String(dRect.height));
      let html = "";

      nodeRefs.current.forEach((nodeEl, i) => {
        if (!nodeEl || i >= nodes.length - 1) return;
        const nextEl = nodeRefs.current[i + 1];
        if (!nextEl) return;
        const nRect = nodeEl.getBoundingClientRect();
        const nxRect = nextEl.getBoundingClientRect();
        const x1 = nRect.left - dRect.left + nRect.width / 2;
        const y1 = nRect.top - dRect.top + nRect.height;
        const x2 = nxRect.left - dRect.left + nxRect.width / 2;
        const y2 = nxRect.top - dRect.top;
        const cy1 = y1 + (y2 - y1) * 0.45;
        const cy2 = y1 + (y2 - y1) * 0.55;
        const d = `M ${x1} ${y1} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${y2}`;
        const c = nodes[i].color;
        const nc = nodes[i + 1].color;
        const gid = `g${i}`;

        html += `<defs><linearGradient id="${gid}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${c}" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="${nc}" stop-opacity="0.7"/>
        </linearGradient></defs>`;
        html += `<path d="${d}" fill="none" stroke="url(#${gid})" stroke-width="1.5" stroke-dasharray="6 5" opacity="0.45"/>`;

        particles[i].forEach((p) => {
          const t = p.progress;
          const mt = 1 - t;
          const px = mt * mt * mt * x1 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x2;
          const py = mt * mt * mt * y1 + 3 * mt * mt * t * cy1 + 3 * mt * t * t * cy2 + t * t * t * y2;
          html += `<circle cx="${px}" cy="${py}" r="3.5" fill="${c}" opacity="${0.55 + t * 0.35}">
            <animate attributeName="r" values="2;4.5;2" dur="1.4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="${0.4 + t * 0.3};${0.8};${0.4 + t * 0.3}" dur="1.4s" repeatCount="indefinite"/>
          </circle>`;
          p.progress = (p.progress + p.speed) % 1;
        });
      });

      svg.innerHTML = html;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    const t = setTimeout(() => { animFrameRef.current = requestAnimationFrame(draw); }, 600);
    return () => { clearTimeout(t); if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, []);

  // ── GSAP scroll animations ────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 84%" },
      });

      const cardEls = diagramRef.current?.querySelectorAll(".arch-node");
      if (cardEls) {
        gsap.fromTo(cardEls, { opacity: 0, scale: 0.88, y: 30 }, {
          opacity: 1, scale: 1, y: 0, duration: 0.65, ease: "back.out(1.4)", stagger: 0.13,
          scrollTrigger: { trigger: diagramRef.current, start: "top 78%" },
        });
      }

      const statEls = statsRef.current?.querySelectorAll(".arch-stat");
      if (statEls) {
        gsap.fromTo(statEls, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 88%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(175deg, hsl(240,60%,7%) 0%, hsl(220,80%,9%) 50%, hsl(240,55%,8%) 100%)",
      }}
      aria-labelledby="arch-heading"
    >
      {/* Blockchain network canvas */}
      <ArchNetworkCanvas />

      {/* Dot grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(129,140,248,0.07) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Central glow blob */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(129,140,248,0.09) 0%, transparent 65%)", filter: "blur(60px)" }}
      />

      <div className="relative max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div ref={titleRef} className="text-center mb-20 opacity-0">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest mb-5" style={{ color: "#22d3ee" }}>
            <span className="w-5 h-px" style={{ background: "linear-gradient(90deg, transparent, #22d3ee)" }} />
            Technical Architecture
            <span className="w-5 h-px" style={{ background: "linear-gradient(90deg, #22d3ee, transparent)" }} />
          </span>
          <h2
            id="arch-heading"
            className="font-bold font-sans text-4xl md:text-5xl leading-tight mb-4"
            style={{ letterSpacing: "-0.03em", color: "#f0f4ff" }}
          >
            Architecture{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #818cf8 0%, #22d3ee 100%)" }}
            >
              Flow Diagram
            </span>
          </h2>
          <p className="font-serif text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(180,190,220,0.75)" }}>
            A layered, modular protocol stack — each tier purpose-built for composability and infinite scale.
          </p>
        </div>

        {/* ── Layer diagram ── */}
        <div ref={diagramRef} className="relative flex flex-col items-center gap-0">

          <svg
            ref={svgRef}
            className="pointer-events-none absolute inset-0 overflow-visible"
            style={{ zIndex: 0 }}
          />

          {nodes.map((node, i) => (
            <div
              key={node.id}
              ref={(el) => { nodeRefs.current[i] = el; }}
              className="arch-node opacity-0 relative z-10 w-full max-w-2xl"
              style={{ marginBottom: i < nodes.length - 1 ? "2.5rem" : "0" }}
            >
              <div
                className="group relative rounded-2xl px-6 py-5 transition-all duration-300 cursor-default select-none"
                style={{
                  background: `rgba(10,14,30,0.60)`,
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: `1px solid ${node.border}`,
                  boxShadow: node.highlight
                    ? `0 0 0 1px ${node.border}, 0 8px 48px ${node.glow}, inset 0 1px 0 rgba(255,255,255,0.07)`
                    : `0 4px 28px ${node.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 56px ${node.glow}, 0 0 0 1px ${node.border}, inset 0 1px 0 rgba(255,255,255,0.09)`;
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = node.highlight
                    ? `0 0 0 1px ${node.border}, 0 8px 48px ${node.glow}, inset 0 1px 0 rgba(255,255,255,0.07)`
                    : `0 4px 28px ${node.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`;
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                {/* Top shimmer line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${node.color}70, transparent)` }}
                />

                {/* Hover bloom */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${node.glow} 0%, transparent 70%)` }}
                />

                {/* Pulse ring for highlight node */}
                {node.highlight && (
                  <div
                    className="pointer-events-none absolute -inset-px rounded-2xl animate-pulse"
                    style={{ border: `1px solid ${node.color}55` }}
                  />
                )}

                <div className="relative flex items-center gap-4">
                  {/* Layer badge */}
                  <div
                    className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl font-bold font-mono text-sm transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${node.color}20, ${node.color}38)`,
                      border: `1px solid ${node.color}50`,
                      color: node.color,
                      boxShadow: `0 0 20px ${node.glow}`,
                    }}
                  >
                    {node.layer}
                  </div>

                  {/* Title + desc */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-bold font-sans text-base md:text-lg leading-tight mb-0.5"
                      style={{ color: node.highlight ? "#fff" : node.color }}
                    >
                      {node.label}
                    </h3>
                    <p className="font-mono text-[11px] leading-relaxed" style={{ color: "rgba(160,175,215,0.65)" }}>
                      {node.desc}
                    </p>
                  </div>

                  {/* Tag pills */}
                  <div className="hidden sm:flex flex-col gap-1.5 items-end shrink-0">
                    {node.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                        style={{
                          background: `${node.color}16`,
                          border: `1px solid ${node.color}38`,
                          color: node.color,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Glow dot */}
                  <div
                    className="absolute top-3 right-3 w-2 h-2 rounded-full animate-pulse"
                    style={{ background: node.color, boxShadow: `0 0 10px ${node.color}` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Legend ── */}
        <div className="mt-14 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {nodes.map((node) => (
            <div key={node.id} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: node.color, boxShadow: `0 0 6px ${node.color}` }}
              />
              <span className="text-[11px] font-mono" style={{ color: "rgba(160,175,215,0.55)" }}>
                {node.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Stats strip ── */}
        <div
          ref={statsRef}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{
            background: "rgba(129,140,248,0.08)",
            border: "1px solid rgba(129,140,248,0.18)",
            backdropFilter: "blur(16px)",
          }}
        >
          {stats.map(({ value, label }, i) => (
            <div
              key={label}
              className="arch-stat opacity-0 relative px-6 py-7 text-center group overflow-hidden"
              style={{ background: "rgba(10,14,30,0.55)" }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(ellipse at 50% 100%, ${nodes[i % nodes.length].glow} 0%, transparent 70%)` }}
              />
              <p
                className="font-bold font-sans text-2xl md:text-3xl mb-1 relative"
                style={{ color: nodes[i % nodes.length].color }}
              >
                {value}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest relative" style={{ color: "rgba(160,175,215,0.55)" }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
