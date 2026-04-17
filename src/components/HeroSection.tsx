import React, { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import gsap from "gsap";
import StatNumber from "./StatNumber";
import TextType from "./ui/TextType";

/* ─── Typing animation words ──────────────────────────────── */
const CYCLING_WORDS = ["Web3", "DeFi", "Gaming", "Real Estate", "Identity", "Governance"];

/*
  Free ambient tech/blockchain loop videos (no attribution required, CC0):
  We use multiple sources as fallbacks so at least one loads.
*/
const VIDEO_SOURCES = [
  "/hero.mp4",
];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<HTMLSpanElement>(null);
  const wordIndexRef = useRef(0);
  const wordTimerRef = useRef<ReturnType<typeof setTimeout>>();

  /* ── video source fallback ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let idx = 0;
    const tryNext = () => {
      if (idx >= VIDEO_SOURCES.length) return;
      video.src = VIDEO_SOURCES[idx];
      video.load();
      video.play().catch(() => {
        idx++;
        tryNext();
      });
    };
    const onError = () => { idx++; tryNext(); };
    video.addEventListener("error", onError);
    tryNext();
    return () => video.removeEventListener("error", onError);
  }, []);

  /* ── cycling word typewriter ── */
  useEffect(() => {
    const el = cycleRef.current;
    if (!el) return;
    let charTimer: ReturnType<typeof setTimeout>;

    const typeWord = (word: string, cb: () => void) => {
      el.textContent = "";
      let i = 0;
      const type = () => {
        if (i <= word.length) {
          el.textContent = word.slice(0, i) + (i < word.length ? "|" : "");
          i++;
          charTimer = setTimeout(type, 80);
        } else {
          el.textContent = word;
          cb();
        }
      };
      type();
    };

    const eraseWord = (word: string, cb: () => void) => {
      let i = word.length;
      const erase = () => {
        if (i >= 0) {
          el.textContent = word.slice(0, i) + "|";
          i--;
          charTimer = setTimeout(erase, 45);
        } else {
          el.textContent = "";
          cb();
        }
      };
      erase();
    };

    const cycle = () => {
      const word = CYCLING_WORDS[wordIndexRef.current % CYCLING_WORDS.length];
      typeWord(word, () => {
        wordTimerRef.current = setTimeout(() => {
          eraseWord(word, () => {
            wordIndexRef.current++;
            wordTimerRef.current = setTimeout(cycle, 200);
          });
        }, 1800);
      });
    };
    wordTimerRef.current = setTimeout(cycle, 1000);

    return () => {
      clearTimeout(charTimer);
      clearTimeout(wordTimerRef.current);
    };
  }, []);

  /* ── GSAP entrance ── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(badgesRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(headlineRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "-=0.3")
      .fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(statsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
      .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "hsl(220,80%,4%)" }}
      aria-label="Hero section"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-[1]"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Dark base tint so text stays readable */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "rgba(5,7,20,0.62)" }}
        aria-hidden="true"
      />

      {/* Vignette edges */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 85% 65% at 50% 50%, transparent 25%, rgba(5,7,20,0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Purple–cyan colour grade overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(124,58,237,0.18) 0%, transparent 50%, rgba(8,145,178,0.14) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle scan-lines */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-28 pb-32" style={{ pointerEvents: "none" }}>

        {/* Badges */}
        <div ref={badgesRef} className="flex flex-wrap items-center justify-center gap-2 mb-8 opacity-0">
          {[
            { label: "Layer ∞ Protocol", col: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-300" },
            { label: "Cross-Chain Native", col: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-300" },
            { label: "ZK-Verified", col: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-300" },
          ].map((b) => (
            <span key={b.label} className={`px-3 py-1 rounded-full text-xs font-mono font-medium border bg-gradient-to-r ${b.col} backdrop-blur-sm`}>
              {b.label}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-bold font-sans text-white text-4xl md:text-6xl lg:text-[5rem] leading-[1.08] tracking-tight mb-6 opacity-0"
          style={{ letterSpacing: "-0.03em" }}
        >
          The Unified Layer for{" "}
          <br className="hidden md:block" />
          <span className="relative inline-block">
            {/* <span
              ref={cycleRef}
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg,#a855f7,#22d3ee,#10b981)" }}
            >
              Web3
            </span>
            
            <span
              className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
              style={{ background: "linear-gradient(90deg,#a855f7,#22d3ee,#10b981)", opacity: 0.7 }}
            /> */}
            <TextType 
              text={["Web3", "DeFi", "Gaming", "Real-Estate"]}
              typingSpeed={75}
              pauseDuration={1500}
              className="bg-gradient-3 bg-clip-text text-transparent underline"
              cursorCharacter="|"
              texts={["Web3","DeFi"]}
              deletingSpeed={50}
              variableSpeedEnabled={false}
              variableSpeedMin={60}
              variableSpeedMax={120}
              cursorBlinkDuration={0.5}
            />
          </span>
          {" "}Infrastructure
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="text-white/60 font-serif text-lg md:text-xl lg:text-2xl mb-10 max-w-2xl mx-auto opacity-0 leading-relaxed"
        >
          Seamlessly connecting gaming, DeFi, and real-world assets across unified
          digital economies — powered by DeCruiz Labs.
        </p>

        {/* CTA row */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0"
          style={{ pointerEvents: "auto" }}
        >
          <button
            onClick={() => scrollTo("ecosystem")}
            className="group relative flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl font-sans overflow-hidden"
            style={{
              background: "linear-gradient(135deg,#7c3aed,#0891b2)",
              boxShadow: "0 0 32px rgba(124,58,237,0.45)",
              color: "#fff",
            }}
            aria-label="Explore the DeCruiz Labs Ecosystem"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore the Ecosystem
              <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform duration-200" />
            </span>
            {/* hover shine */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)" }}
            />
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-8 py-4 text-base font-semibold rounded-xl border text-white/75 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer font-sans backdrop-blur-sm"
            style={{ borderColor: "rgba(255,255,255,0.15)" }}
          >
            Get in Touch
          </button>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="opacity-0 inline-flex flex-wrap items-center justify-center gap-8 px-8 py-4 rounded-2xl backdrop-blur-md"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {[
            { value: "3", label: "Industries" },
            { value: "$4.2M+", label: "Treasury" },
            { value: "50K+", label: "Community" },
            { value: "10+", label: "Partners" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <StatNumber raw={value} className="text-white font-bold font-mono text-xl block" duration={2} />
              <div className="text-white/40 font-sans text-xs uppercase tracking-wider mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer opacity-0 pointer-events-auto"
        onClick={() => scrollTo("vision")}
        role="button"
        tabIndex={0}
        aria-label="Scroll down"
        onKeyDown={(e) => e.key === "Enter" && scrollTo("vision")}
      >
        <span className="text-white/30 text-xs font-mono uppercase tracking-widest">Scroll</span>
        <div className="animate-fade-pulse text-white/30">
          <ArrowDown size={22} weight="light" />
        </div>
      </div>
    </section>
  );
}
