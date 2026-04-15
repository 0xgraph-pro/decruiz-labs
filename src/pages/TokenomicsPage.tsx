import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Coins,
  ChartLineUp,
  LockKey,
  ArrowsClockwise,
  Vault,
  Buildings,
  GitFork,
  Stack,
  Timer,
  TrendUp,
  ShieldCheck,
  UsersThree,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const supplyModels = [
  {
    title: "Fixed Supply",
    description: "Hard-capped token supply with deflationary mechanics — burn on transaction, buy-backs from protocol revenue.",
    tag: "Deflationary",
    color: "#7c3aed",
    icon: <LockKey size={24} weight="duotone" />,
  },
  {
    title: "Elastic / Rebase",
    description: "Algorithmic supply expansion and contraction pegged to a price target, maintaining stable purchasing power.",
    tag: "Algorithmic",
    color: "#0ea5e9",
    icon: <ArrowsClockwise size={24} weight="duotone" />,
  },
  {
    title: "Inflationary w/ Utility Sink",
    description: "Continuous emissions fund ecosystem growth; utility sinks (fees, staking locks, NFT mints) absorb sell pressure.",
    tag: "Sink-Driven",
    color: "#10b981",
    icon: <ChartLineUp size={24} weight="duotone" />,
  },
  {
    title: "Dual-Token",
    description: "Governance token paired with a utility/points token — separates voting power from in-app purchasing, preventing whale governance capture.",
    tag: "Bifurcated",
    color: "#f59e0b",
    icon: <Coins size={24} weight="duotone" />,
  },
];

const stakingModels = [
  {
    label: "ve-Token (Vote Escrow)",
    detail: "Lock tokens for 1–4 years → receive veTokens proportional to lock duration. Longer commitment = more voting weight + boosted yield.",
    accent: "#7c3aed",
  },
  {
    label: "Liquid Staking Derivatives",
    detail: "Stake underlying token, receive an LST (e.g., stDCRZ) that accrues rewards while remaining transferable and DeFi-composable.",
    accent: "#0ea5e9",
  },
  {
    label: "Time-Weighted Staking",
    detail: "Multiplier scales with continuous hold duration — rewards long-term alignment without locking capital.",
    accent: "#10b981",
  },
  {
    label: "Delegated Staking",
    detail: "Token holders delegate stake to validator/curator nodes; node operators earn commission, delegators earn base APY.",
    accent: "#f59e0b",
  },
];

const emissionSchedule = [
  { phase: "Genesis", months: "M0–M6", pct: 15, color: "#7c3aed", note: "Bootstrap liquidity & early adopter rewards" },
  { phase: "Growth", months: "M6–M18", pct: 30, color: "#0ea5e9", note: "Developer grants, ecosystem fund, GameFi rewards" },
  { phase: "Maturity", months: "M18–M36", pct: 35, color: "#10b981", note: "Staking rewards decay curve, DAO-controlled emissions" },
  { phase: "Long-Tail", months: "M36+", pct: 20, color: "#f59e0b", note: "Perpetual low-rate emissions governed by on-chain snapshot votes" },
];

const vestingSchedules = [
  { group: "Core Team", cliff: "12 mo cliff", linear: "36 mo linear", pct: "15%", risk: "Fully diluted lock" },
  { group: "Seed / Private", cliff: "6 mo cliff", linear: "24 mo linear", pct: "12%", risk: "Transparent on-chain" },
  { group: "Public Sale", cliff: "TGE 20%", linear: "12 mo linear", pct: "8%", risk: "Immediate partial float" },
  { group: "Ecosystem Fund", cliff: "No cliff", linear: "48 mo linear", pct: "25%", risk: "DAO-controlled release" },
  { group: "Advisors", cliff: "6 mo cliff", linear: "24 mo linear", pct: "5%", risk: "Performance-gated" },
  { group: "Protocol Reserve", cliff: "On-chain vote", linear: "Open-ended", pct: "35%", risk: "Multi-sig timelock" },
];

const rewardLoops = [
  {
    step: "01",
    title: "User Action",
    body: "User interacts with protocol — trade, mint, stake, vote, provide liquidity.",
    icon: <UsersThree size={20} weight="duotone" />,
    color: "#7c3aed",
  },
  {
    step: "02",
    title: "Fee Capture",
    body: "Protocol collects fee in native or base asset (USDC/ETH). Split between treasury and stakers.",
    icon: <Vault size={20} weight="duotone" />,
    color: "#0ea5e9",
  },
  {
    step: "03",
    title: "Token Emission",
    body: "Reward tokens emitted to liquidity providers, stakers, and early adopters on a decaying schedule.",
    icon: <TrendUp size={20} weight="duotone" />,
    color: "#10b981",
  },
  {
    step: "04",
    title: "Sink / Burn",
    body: "A portion of fees used to buy back and burn tokens, or lock them in the protocol reserve.",
    icon: <ArrowsClockwise size={20} weight="duotone" />,
    color: "#f59e0b",
  },
  {
    step: "05",
    title: "Governance Signal",
    body: "Token holders vote on emission rate, treasury deployment, and parameter changes via on-chain snapshot.",
    icon: <GitFork size={20} weight="duotone" />,
    color: "#ec4899",
  },
  {
    step: "06",
    title: "Value Accrual",
    body: "Increased utility demand drives buy pressure; scarcity mechanics amplify long-term token value.",
    icon: <ChartLineUp size={20} weight="duotone" />,
    color: "#14b8a6",
  },
];

const liquidityStrategies = [
  {
    title: "Protocol-Owned Liquidity (POL)",
    desc: "Deploy treasury capital into AMM pools directly. Protocol earns LP fees perpetually — no mercenary capital risk.",
    icon: <Stack size={22} weight="duotone" />,
    tag: "Zero Rent-Seeking",
  },
  {
    title: "Bribing / Vote-Incentive Markets",
    desc: "Leverage ve-token ecosystems (Curve, Velodrome) — bribe veToken holders to direct emissions toward your pool.",
    icon: <ShieldCheck size={22} weight="duotone" />,
    tag: "Capital-Efficient",
  },
  {
    title: "Liquidity Bootstrapping Pool (LBP)",
    desc: "Dynamic-weight AMM launch — token starts high-weight, gradually shifts to 50/50, preventing whale front-running.",
    icon: <Timer size={22} weight="duotone" />,
    tag: "Fair Launch",
  },
  {
    title: "Range Orders on CLMMs",
    desc: "Actively managed concentrated liquidity positions (Uniswap v3/v4) tightened around expected price ranges to maximize fee yield.",
    icon: <TrendUp size={22} weight="duotone" />,
    tag: "Max Fee Yield",
  },
];

const treasuryModules = [
  { label: "Operating Reserve", pct: 30, color: "#7c3aed", desc: "Protocol ops, audits, legal, salaries" },
  { label: "Ecosystem Grants", pct: 25, color: "#0ea5e9", desc: "Builder grants, hackathons, integrations" },
  { label: "POL Deployment", pct: 20, color: "#10b981", desc: "Protocol-owned liquidity pools" },
  { label: "Strategic Buybacks", pct: 15, color: "#f59e0b", desc: "Buy + burn or buy + lock cycles" },
  { label: "Insurance Fund", pct: 10, color: "#ec4899", desc: "Smart contract exploit coverage" },
];

const governanceMechanics = [
  {
    title: "Snapshot Voting",
    desc: "Off-chain gasless polling for signaling — low friction, high participation. Final execution requires on-chain proposal.",
    icon: <GitFork size={22} weight="duotone" />,
  },
  {
    title: "Timelock + Multi-sig",
    desc: "All parameter changes enforced through a 48–72h timelock. Multi-sig guardian can veto malicious proposals during delay.",
    icon: <LockKey size={22} weight="duotone" />,
  },
  {
    title: "Quadratic Voting",
    desc: "Vote cost scales as the square of votes cast — prevents plutocratic dominance and surfaces genuine community preference.",
    icon: <UsersThree size={22} weight="duotone" />,
  },
  {
    title: "DAO Sub-DAOs",
    desc: "Specialized working groups (Treasury DAO, Dev DAO, Marketing DAO) with delegated budgets and scoped authority.",
    icon: <Buildings size={22} weight="duotone" />,
  },
];

export default function TokenomicsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes: { x: number; y: number; vx: number; vy: number; r: number; color: string }[] = [];
    const colors = ["#7c3aed", "#0ea5e9", "#10b981", "#f59e0b"];
    for (let i = 0; i < 55; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color + "cc";
        ctx.fill();
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = nodes[i].color + Math.floor((1 - dist / 120) * 50).toString(16).padStart(2, "0");
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".tok-hero-text", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.15, ease: "power3.out" });
      gsap.fromTo(".tok-supply-card", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ".tok-supply-grid", start: "top 80%" } });
      gsap.fromTo(".tok-staking-item", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".tok-staking-list", start: "top 80%" } });
      gsap.fromTo(".tok-emission-bar", { scaleX: 0 }, { scaleX: 1, duration: 0.9, stagger: 0.15, ease: "power2.out", transformOrigin: "left center", scrollTrigger: { trigger: ".tok-emission-section", start: "top 75%" } });
      gsap.fromTo(".tok-vesting-row", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: ".tok-vesting-section", start: "top 80%" } });
      gsap.fromTo(".tok-loop-step", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)", scrollTrigger: { trigger: ".tok-loop-section", start: "top 80%" } });
      gsap.fromTo(".tok-liquidity-card", { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ".tok-liquidity-grid", start: "top 80%" } });
      gsap.fromTo(".tok-treasury-item", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".tok-treasury-section", start: "top 80%" } });
      gsap.fromTo(".tok-gov-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ".tok-gov-section", start: "top 80%" } });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="min-h-screen" style={{ background: "linear-gradient(135deg,#060918 0%,#0a0f2e 50%,#070b1a 100%)" }}>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%,rgba(124,58,237,0.18) 0%,transparent 70%)" }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="tok-hero-text inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-mono tracking-widest uppercase mb-6">
            <Coins size={14} weight="duotone" /> Tokenomics &amp; Economic Design
          </div>
          <h1 className="tok-hero-text text-5xl lg:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: "sans-serif" }}>
            <span className="text-white">Token Economics</span>
            <br />
            <span style={{ background: "linear-gradient(90deg,#7c3aed,#0ea5e9,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Built to Last
            </span>
          </h1>
          <p className="tok-hero-text text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We architect token economies with surgical precision — aligning incentives, controlling inflation, and designing sustainable flywheel mechanisms that compound value over years, not weeks.
          </p>
          <div className="tok-hero-text mt-10 flex flex-wrap justify-center gap-4">
            {["Supply Models", "Staking Design", "Emissions", "Vesting", "Reward Loops", "Liquidity Incentives", "DAO Treasury", "Governance"].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-mono border border-slate-700 text-slate-400 bg-slate-800/50">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPPLY MODELS ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest text-violet-400 uppercase mb-3">01 — Supply Architecture</p>
          <h2 className="text-4xl font-bold text-white mb-4">Token Supply Models</h2>
          <p className="text-slate-400 max-w-xl mx-auto">The supply model is the bedrock of your token&#39;s long-term price action and community trust. We match the right model to your protocol&#39;s revenue structure and growth phase.</p>
        </div>
        <div className="tok-supply-grid grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {supplyModels.map((m) => (
            <div key={m.title} className="tok-supply-card group relative p-6 rounded-2xl border border-slate-800 hover:border-slate-600 transition-all duration-300" style={{ background: "rgba(15,20,50,0.7)", backdropFilter: "blur(12px)" }}>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(circle at 30% 30%, ${m.color}15 0%, transparent 60%)` }} />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${m.color}20`, color: m.color }}>
                  {m.icon}
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full border mb-3 inline-block" style={{ borderColor: `${m.color}40`, color: m.color, background: `${m.color}10` }}>
                  {m.tag}
                </span>
                <h3 className="text-lg font-semibold text-white mb-2">{m.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EMISSION SCHEDULE ── */}
      <section className="tok-emission-section py-24 px-6" style={{ background: "rgba(10,15,40,0.6)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-3">02 — Emission Design</p>
            <h2 className="text-4xl font-bold text-white mb-4">Emission Schedule Architecture</h2>
            <p className="text-slate-400 max-w-xl mx-auto">We design emission curves that bootstrap adoption without destroying long-term value — decaying schedules, DAO-governed halving events, and demand-reactive release valves.</p>
          </div>
          <div className="space-y-5">
            {emissionSchedule.map((e) => (
              <div key={e.phase} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-white">{e.phase}</span>
                    <span className="text-xs font-mono text-slate-500">{e.months}</span>
                  </div>
                  <span className="text-sm font-mono font-bold" style={{ color: e.color }}>{e.pct}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="tok-emission-bar h-full rounded-full"
                    style={{ width: `${e.pct * 2.5}%`, background: `linear-gradient(90deg, ${e.color}, ${e.color}88)` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1.5">{e.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 p-5 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
            <p className="text-sm text-cyan-300 font-mono">
              <span className="font-bold">Key principle:</span> Emissions should never exceed protocol revenue growth rate. We build automatic circuit-breakers — if TVL or fee volume drops below threshold, emissions pause until recovery.
            </p>
          </div>
        </div>
      </section>

      {/* ── STAKING DESIGN ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-mono tracking-widest text-emerald-400 uppercase mb-3">03 — Staking Architecture</p>
            <h2 className="text-4xl font-bold text-white mb-5">Staking Design</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Staking is the primary mechanism for aligning long-term holders with protocol success. We design staking systems that incentivize genuine commitment — not just yield farming — while maintaining healthy token velocity.
            </p>
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
              <p className="text-sm text-emerald-300">
                <span className="font-bold font-mono">Anti-mercenary design:</span> Every staking model we build includes lock-up tiers, cooldown periods, or slashing conditions that filter out yield-and-dump behavior.
              </p>
            </div>
          </div>
          <div className="tok-staking-list space-y-4">
            {stakingModels.map((s) => (
              <div key={s.label} className="tok-staking-item flex gap-4 p-5 rounded-xl border border-slate-800 hover:border-slate-600 transition-all duration-200" style={{ background: "rgba(15,20,50,0.6)" }}>
                <div className="w-1 rounded-full flex-shrink-0" style={{ background: s.accent }} />
                <div>
                  <h4 className="text-base font-semibold text-white mb-1">{s.label}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VESTING ── */}
      <section className="tok-vesting-section py-24 px-6" style={{ background: "rgba(10,15,40,0.6)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-3">04 — Vesting Schedules</p>
            <h2 className="text-4xl font-bold text-white mb-4">Token Allocation &amp; Vesting</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Transparent, on-chain vesting builds investor trust and prevents insiders from dumping at launch. Every allocation is paired with a Merkle-proof claim contract and a public dashboard.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-800" style={{ background: "rgba(15,20,50,0.7)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left px-6 py-4 text-slate-400 font-mono text-xs uppercase tracking-wider">Group</th>
                  <th className="text-left px-6 py-4 text-slate-400 font-mono text-xs uppercase tracking-wider">Allocation</th>
                  <th className="text-left px-6 py-4 text-slate-400 font-mono text-xs uppercase tracking-wider">Cliff</th>
                  <th className="text-left px-6 py-4 text-slate-400 font-mono text-xs uppercase tracking-wider">Vesting</th>
                  <th className="text-left px-6 py-4 text-slate-400 font-mono text-xs uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody>
                {vestingSchedules.map((v, i) => (
                  <tr key={v.group} className={`tok-vesting-row border-b border-slate-800/50 hover:bg-white/[0.02] transition-colors ${i === vestingSchedules.length - 1 ? "border-b-0" : ""}`}>
                    <td className="px-6 py-4 text-white font-medium">{v.group}</td>
                    <td className="px-6 py-4 font-mono font-bold" style={{ color: "#7c3aed" }}>{v.pct}</td>
                    <td className="px-6 py-4 text-slate-300">{v.cliff}</td>
                    <td className="px-6 py-4 text-slate-300">{v.linear}</td>
                    <td className="px-6 py-4 text-slate-500 text-xs">{v.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── REWARD LOOPS ── */}
      <section className="tok-loop-section py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest text-pink-400 uppercase mb-3">05 — Flywheel Design</p>
          <h2 className="text-4xl font-bold text-white mb-4">Reward Loop Architecture</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Sustainable token economies are built on closed-loop reward systems where value circulates — not leaks. We map every value flow before writing a single line of Solidity.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rewardLoops.map((r) => (
            <div key={r.step} className="tok-loop-step group relative p-6 rounded-2xl border border-slate-800 hover:border-slate-600 transition-all duration-300" style={{ background: "rgba(15,20,50,0.7)" }}>
              <div className="absolute top-4 right-4 text-4xl font-black font-mono opacity-10 text-white">{r.step}</div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: `${r.color}20`, color: r.color }}>
                {r.icon}
              </div>
              <h4 className="text-base font-semibold text-white mb-2">{r.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{r.body}</p>
              <div className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg,${r.color},transparent)` }} />
            </div>
          ))}
        </div>
        {/* Flywheel visual connector */}
        <div className="mt-12 p-6 rounded-2xl border border-pink-500/20 bg-pink-500/5 flex flex-wrap items-center justify-center gap-3 text-sm font-mono text-pink-300">
          {["Usage", "→", "Fees", "→", "Buy + Burn", "→", "Scarcity", "→", "Price ↑", "→", "More Usage", "→", "..."].map((t, i) => (
            <span key={i} className={t === "→" ? "text-pink-500/40" : ""}>{t}</span>
          ))}
        </div>
      </section>

      {/* ── LIQUIDITY INCENTIVES ── */}
      <section className="py-24 px-6" style={{ background: "rgba(10,15,40,0.6)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-mono tracking-widest text-teal-400 uppercase mb-3">06 — Liquidity Strategy</p>
            <h2 className="text-4xl font-bold text-white mb-4">Liquidity Incentive Design</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Deep, stable liquidity is a competitive moat. We architect strategies that eliminate dependence on mercenary capital — keeping your token liquid without the race-to-the-bottom APY war.</p>
          </div>
          <div className="tok-liquidity-grid grid md:grid-cols-2 gap-5">
            {liquidityStrategies.map((l) => (
              <div key={l.title} className="tok-liquidity-card group p-6 rounded-2xl border border-slate-800 hover:border-teal-500/30 transition-all duration-300" style={{ background: "rgba(15,20,50,0.7)" }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-teal-400 bg-teal-400/10">
                    {l.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-base font-semibold text-white">{l.title}</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-mono">{l.tag}</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{l.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DAO TREASURY ── */}
      <section className="tok-treasury-section py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest text-violet-400 uppercase mb-3">07 — Treasury Architecture</p>
          <h2 className="text-4xl font-bold text-white mb-4">DAO Treasury Design</h2>
          <p className="text-slate-400 max-w-xl mx-auto">A well-governed treasury is the protocol&#39;s lifeblood. We design multi-module treasury systems with defined mandates, allocation frameworks, and on-chain accountability rails.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Allocation bars */}
          <div className="space-y-6">
            {treasuryModules.map((t) => (
              <div key={t.label} className="tok-treasury-item">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-white">{t.label}</span>
                  <span className="text-sm font-mono font-bold" style={{ color: t.color }}>{t.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden mb-1">
                  <div className="h-full rounded-full transition-all" style={{ width: `${t.pct * 2}%`, background: t.color }} />
                </div>
                <p className="text-xs text-slate-500">{t.desc}</p>
              </div>
            ))}
          </div>
          {/* Principles */}
          <div className="space-y-4">
            {[
              { title: "Multi-sig + Timelock", body: "4-of-7 multi-sig with mandatory 48h timelock on all outflows above threshold. Fund movement is always announced and observable.", icon: <LockKey size={20} weight="duotone" /> },
              { title: "Diversification Policy", body: "Maximum 60% exposure to native token; remainder held in stablecoins, ETH, and blue-chip DeFi assets to hedge drawdown risk.", icon: <Stack size={20} weight="duotone" /> },
              { title: "Revenue Routing", body: "Protocol fees auto-route through a Splitter contract: 40% stakers, 30% treasury, 20% buy-burn, 10% insurance fund.", icon: <ArrowsClockwise size={20} weight="duotone" /> },
              { title: "Quarterly Reports", body: "On-chain attestation of treasury balances published quarterly with dune dashboard links and auditor commentary.", icon: <Buildings size={20} weight="duotone" /> },
            ].map((p) => (
              <div key={p.title} className="flex gap-4 p-5 rounded-xl border border-slate-800 hover:border-violet-500/30 transition-all" style={{ background: "rgba(15,20,50,0.6)" }}>
                <div className="text-violet-400 mt-0.5 flex-shrink-0">{p.icon}</div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">{p.title}</h4>
                  <p className="text-sm text-slate-400">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOVERNANCE MECHANICS ── */}
      <section className="tok-gov-section py-24 px-6" style={{ background: "rgba(10,15,40,0.6)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-mono tracking-widest text-blue-400 uppercase mb-3">08 — Governance Architecture</p>
            <h2 className="text-4xl font-bold text-white mb-4">Governance Mechanics</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Governance done wrong leads to voter apathy, whale capture, or governance attacks. We build layered governance systems that are participatory, attack-resistant, and upgrade-safe.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {governanceMechanics.map((g) => (
              <div key={g.title} className="tok-gov-card group p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all duration-300" style={{ background: "rgba(15,20,50,0.7)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-blue-400 bg-blue-400/10">
                  {g.icon}
                </div>
                <h4 className="text-base font-semibold text-white mb-2">{g.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
          {/* Governance lifecycle */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-3">
            {["Idea (Forum)", "RFC Draft", "Snapshot Vote", "On-chain Proposal", "Timelock → Execute"].map((step, i) => (
              <div key={step} className="relative text-center p-4 rounded-xl border border-slate-800 bg-slate-900/50">
                <div className="text-2xl font-black font-mono text-slate-700 mb-1">{String(i + 1).padStart(2, "0")}</div>
                <p className="text-xs text-slate-400 font-mono">{step}</p>
                {i < 4 && <div className="hidden md:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-0.5 bg-slate-700" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%,rgba(124,58,237,0.2) 0%,transparent 70%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5">
            Ready to Design Your<br />
            <span style={{ background: "linear-gradient(90deg,#7c3aed,#0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Token Economy?
            </span>
          </h2>
          <p className="text-slate-400 mb-10 text-lg leading-relaxed">
            Avoid the common pitfalls — hyperinflation, governance gridlock, liquidity death-spirals. We&#39;ll model your tokenomics before a single line of code is written.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105" style={{ background: "linear-gradient(135deg,#7c3aed,#0ea5e9)" }}>
              Book a Tokenomics Audit
            </button>
            <button className="px-8 py-3.5 rounded-xl font-semibold text-slate-300 border border-slate-700 hover:border-slate-500 transition-all duration-300 hover:scale-105" style={{ background: "rgba(15,20,50,0.7)" }}>
              Download Token Design Framework
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
