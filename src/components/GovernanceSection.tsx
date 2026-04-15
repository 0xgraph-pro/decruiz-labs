import React, { useEffect, useRef } from "react";
import { Scales, Lightning, Globe, ArrowRight } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StatNumber from "./StatNumber";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Scales,
    title: "DAO Governance",
    description:
      "Token holders vote on protocol upgrades, treasury allocations, and ecosystem partnerships.",
    image:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80&auto=format&fit=crop",
  },
  {
    icon: Lightning,
    title: "Proposal System",
    description:
      "Any community member can submit improvement proposals, fostering true decentralized innovation.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop",
  },
  {
    icon: Globe,
    title: "Global Community",
    description:
      "A worldwide network of contributors, developers, and stakeholders shaping the future together.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&auto=format&fit=crop",
  },
];

export default function GovernanceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        },
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="governance"
      ref={sectionRef}
      className="relative bg-gradient-2 py-24 px-8 overflow-hidden"
      aria-labelledby="governance-heading"
    >
      {/* ── Checkerboard pattern ── */}
      {/* Primary checkerboard tiles */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(139,92,246,0.07) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(139,92,246,0.07) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(34,211,238,0.05) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(34,211,238,0.05) 75%)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
        }}
      />
      {/* Subtle inner border lines to sharpen the checker cells */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Corner bloom — top-left purple */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.28) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      {/* Corner bloom — bottom-right cyan */}
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.22) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      {/* Centre vignette to fade checker toward the middle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(9,9,18,0.55) 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">
            Governance + Community
          </span>
          <h2
            id="governance-heading"
            className="text-foreground font-bold font-sans text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-4"
            style={{ letterSpacing: "-0.025em", lineHeight: "1.2" }}
          >
            Governed by the{" "}
            <span className="bg-gradient-1 bg-clip-text text-transparent">
              Community
            </span>
          </h2>
          <p className="text-muted-foreground font-serif text-lg max-w-2xl mx-auto">
            DeCruiz Labs is built on the principle that those who use the
            ecosystem should shape its future. Our DAO model ensures every voice
            matters.
          </p>
        </div>

        <div ref={contentRef} className="opacity-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {features.map(({ icon: Icon, title, description, image }) => (
              <div
                key={title}
                className="rounded-lg bg-card border border-border overflow-hidden flex flex-col"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  <div className="absolute bottom-3 left-4 w-10 h-10 rounded-md bg-gradient-1 flex items-center justify-center shadow-lg">
                    <Icon size={22} weight="fill" className="text-cta-primary-foreground" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-foreground font-bold font-sans text-lg mb-2">
                    {title}
                  </h3>
                  <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Active Voters", value: "12400+", display: "12,400+" },
              { label: "Proposals Passed", value: "87" },
              { label: "Treasury Value", value: "$4.2M" },
              { label: "DAO Members", value: "50K+" },
            ].map(({ label, value, display }) => (
              <div
                key={label}
                className="text-center p-6 rounded-lg bg-card border border-border"
              >
                <StatNumber
                  raw={display ?? value}
                  className="text-foreground font-bold font-mono text-2xl mb-1 block"
                  duration={2}
                />
                <div className="text-muted-foreground font-sans text-sm">
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-normal rounded-md bg-cta-primary text-cta-primary-foreground hover:bg-tertiary/80 transition-colors duration-200 cursor-pointer font-sans"
              aria-label="Join the DeCruiz governance community"
            >
              Join the Community
              <ArrowRight size={20} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
