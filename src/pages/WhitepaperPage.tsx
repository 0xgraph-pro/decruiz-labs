import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FileText,
  DownloadSimple,
  BookOpen,
  ArrowRight,
  CheckCircle,
  ArrowLeft,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    number: "01",
    title: "Executive Summary",
    description:
      "An overview of DeCruiz Labs&#39; mission to bridge Web3 ecosystems across gaming, DeFi, and real estate through a unified interoperability protocol.",
  },
  {
    number: "02",
    title: "Problem Statement",
    description:
      "Current blockchain ecosystems operate in isolation. Assets, identities, and liquidity are siloed, preventing the composability that unlocks true Web3 potential.",
  },
  {
    number: "03",
    title: "The DeCruiz Protocol",
    description:
      "A deep-dive into our cross-chain messaging layer, unified asset standard (UAS), and the cryptographic primitives that make trustless interoperability possible.",
  },
  {
    number: "04",
    title: "Tokenomics & Governance",
    description:
      "The DCR token model, distribution schedule, staking mechanics, and the on-chain governance framework that gives the community full protocol ownership.",
  },
  {
    number: "05",
    title: "Technical Architecture",
    description:
      "Node structure, validator set, consensus mechanism, finality guarantees, and performance benchmarks across 100K+ TPS load tests.",
  },
  {
    number: "06",
    title: "Roadmap & Milestones",
    description:
      "A transparent quarter-by-quarter roadmap from Testnet Alpha through Mainnet launch and beyond, including ecosystem grants and developer incentive programs.",
  },
];

const keyPoints = [
  "Sub-second finality across all supported chains",
  "EVM-compatible with native Solana & Cosmos bridges",
  "Zero-knowledge proof verification for privacy-preserving transactions",
  "100K+ transactions per second at peak load",
  "Fully audited smart contracts by Certik & Trail of Bits",
  "Community-governed via on-chain DAO with 1-token-1-vote model",
];

export default function WhitepaperPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wp-hero-content",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
      );
      gsap.fromTo(
        ".wp-section-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionsRef.current,
            start: "top 80%",
          },
        }
      );
      gsap.fromTo(
        ".wp-key-point",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".wp-keypoints",
            start: "top 80%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative bg-gradient-2 py-24 px-8 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-20 w-72 h-72 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-secondary blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center wp-hero-content relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-mono mb-6">
            <FileText size={16} weight="bold" />
            Technical Whitepaper v2
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-sans mb-6 leading-tight">
            DeCruiz Protocol
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary mt-2">
              Whitepaper
            </span>
          </h1>
          <p className="text-xl text-muted-foreground font-serif leading-relaxed mb-10 max-w-2xl mx-auto">
            The technical foundation for universal Web3 interoperability — read
            how we&#39;re unifying gaming, DeFi, and real estate on a single
            composable layer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/DECRUIZ LABS WHITEPAPER v2.pdf"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-semibold font-sans hover:bg-accent/90 transition-colors duration-200"
              download={true}
            >
              <DownloadSimple size={20} weight="bold" />
              Download PDF
            </a>
            <a
              href="/DECRUIZ LABS WHITEPAPER v2.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-border text-foreground font-semibold font-sans hover:border-accent/50 hover:text-accent transition-colors duration-200"
            >
              <BookOpen size={20} weight="bold" />
              Read Online
            </a>
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-16 px-8 bg-card/30 wp-keypoints">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold font-sans mb-8 text-center">
            Core Technical Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keyPoints.map((point, i) => (
              <div
                key={i}
                className="wp-key-point flex items-start gap-3 p-4 rounded-lg bg-card border border-border"
              >
                <CheckCircle
                  size={20}
                  weight="fill"
                  className="text-accent mt-0.5 shrink-0"
                />
                <span className="text-sm font-sans text-muted-foreground">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section id="wp-sections" ref={sectionsRef} className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold font-sans mb-4">
              Table of Contents
            </h2>
            <p className="text-muted-foreground font-serif">
              Six chapters covering every aspect of the DeCruiz Protocol.
            </p>
          </div>
          <div className="space-y-4">
            {sections.map((section) => (
              <div
                key={section.number}
                className="wp-section-card group flex items-start gap-6 p-6 rounded-xl bg-card border border-border hover:border-accent/40 transition-all duration-300 cursor-pointer"
              >
                <span className="text-4xl font-bold font-mono text-accent/30 group-hover:text-accent/60 transition-colors duration-300 shrink-0 leading-none mt-1">
                  {section.number}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-sans mb-2 group-hover:text-accent transition-colors duration-200">
                    {section.title}
                  </h3>
                  <p
                    className="text-sm text-muted-foreground font-serif leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: section.description }}
                  />
                </div>
                <ArrowRight
                  size={20}
                  className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 shrink-0 mt-1"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 bg-gradient-2 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold font-sans mb-4">
            Ready to Go Deeper?
          </h2>
          <p className="text-muted-foreground font-serif mb-8">
            Explore our full developer documentation or join the community forum
            to discuss the protocol.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/docs")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-semibold font-sans hover:bg-accent/90 transition-colors duration-200"
            >
              View Documentation
              <ArrowRight size={18} weight="bold" />
            </button>
            <button
              onClick={() => navigate("/community")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-border text-foreground font-semibold font-sans hover:border-accent/50 hover:text-accent transition-colors duration-200"
            >
              Join Community
            </button>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <div className="px-8 py-6 max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-200 font-sans text-sm"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>
    </div>
  );
}
