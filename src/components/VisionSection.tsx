import { useEffect, useRef } from "react";
import { Cube, Users, Handshake, CheckCircle } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StatNumber from "./StatNumber";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { icon: Cube, label: "Industries Unified", value: "3", color: "from-purple-500 to-purple-700" },
  { icon: Handshake, label: "Global Partners", value: "10+", color: "from-cyan-500 to-cyan-700" },
  { icon: Users, label: "Community Members", value: "50K+", color: "from-emerald-500 to-emerald-700" },
];

const highlights = [
  "Unified cross-chain identity & wallets",
  "Multi-ecosystem digital asset utility",
  "Seamless cross-platform liquidity pools",
  "Community-driven DAO governance",
];

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current, { opacity: 0, x: -50 }, {
        opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.fromTo(imageRef.current, { opacity: 0, x: 50 }, {
        opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.fromTo(metricsRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: metricsRef.current, start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="relative bg-gradient-2 py-32 px-8 overflow-hidden"
      aria-labelledby="vision-heading"
    >
      {/* ── Patterned background ── */}
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(139,92,246,0.25) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      {/* Diagonal stripe overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(139,92,246,1) 0px, rgba(139,92,246,1) 1px, transparent 1px, transparent 24px)",
        }}
      />
      {/* Horizontal scan-line shimmer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(6,182,212,1) 0px, rgba(6,182,212,1) 1px, transparent 1px, transparent 18px)",
        }}
      />
      {/* Corner glow — top-left */}
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-purple-600/20 blur-[96px] pointer-events-none" />
      {/* Corner glow — bottom-right */}
      <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full bg-cyan-500/15 blur-[96px] pointer-events-none" />
      {/* Decorative glow — centre */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] glow-purple blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div ref={textRef} className="opacity-0">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Our Vision
            </span>
            <h2
              id="vision-heading"
              className="text-foreground font-bold font-sans text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-6"
              style={{ letterSpacing: "-0.025em", lineHeight: "1.2" }}
            >
              One Ecosystem,{" "}
              <span className="bg-gradient-1 bg-clip-text text-transparent">
                Infinite Possibilities
              </span>
            </h2>
            <p className="text-muted-foreground font-serif text-lg leading-relaxed mb-6">
              DeCruiz Labs is pioneering Web3 interoperability — creating a
              unified digital infrastructure where gaming assets, DeFi
              protocols, and real estate tokenization coexist and interact
              seamlessly.
            </p>
            <ul className="space-y-3 mb-8">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-muted-foreground font-sans text-sm">
                  <CheckCircle size={18} weight="fill" className="text-accent flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Image — rich visual */}
          <div ref={imageRef} className="opacity-0">
            <div className="relative rounded-2xl overflow-hidden img-hover-zoom gradient-border shadow-2xl shadow-purple-900/40">
              <img
                src="https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=900&q=85&auto=format&fit=crop"
                alt="Futuristic blockchain network visualization"
                className="w-full h-[420px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,80%,8%)]/80 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                <p className="text-white/90 font-sans text-sm font-semibold mb-1">Interoperability Layer</p>
                <p className="text-white/50 font-mono text-xs">Connecting 3+ ecosystems in real time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div ref={metricsRef} className="opacity-0 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="group flex items-center gap-4 p-6 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors duration-300">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <Icon size={28} weight="fill" className="text-white" />
              </div>
              <div>
                <StatNumber raw={value} className="text-foreground font-bold font-mono text-3xl block" duration={2} />
                <div className="text-muted-foreground font-sans text-sm">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
