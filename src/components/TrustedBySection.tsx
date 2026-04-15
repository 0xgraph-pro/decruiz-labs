import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuery } from "@animaapp/playground-react-sdk";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_PARTNERS = [
  { name: "Polygon", logoUrl: "/company-logo/polygon-matic-logo.svg", websiteUrl: "https://polygon.technology" },
  { name: "Chainlink", logoUrl: "", websiteUrl: "https://chain.link" },
  { name: "Uniswap", logoUrl: "", websiteUrl: "https://uniswap.org" },
  { name: "Aave", logoUrl: "", websiteUrl: "/company-logo/aave-aave-logo.svg" },
  { name: "OpenSea", logoUrl: "", websiteUrl: "https://opensea.io" },
  { name: "Immutable", logoUrl: "", websiteUrl: "https://immutable.com" },
  { name: "The Sandbox", logoUrl: "", websiteUrl: "https://sandbox.game" },
  { name: "Decentraland", logoUrl: "", websiteUrl: "https://decentraland.org" },
  { name: "Axie Infinity", logoUrl: "", websiteUrl: "https://axieinfinity.com" },
  { name: "Lido Finance", logoUrl: "", websiteUrl: "https://lido.fi" },
  { name: "Alchemy", logoUrl: "", websiteUrl: "https://alchemy.com" },
  { name: "Fireblocks", logoUrl: "", websiteUrl: "https://fireblocks.com" },
];

function PartnerPill({ name, logoUrl, websiteUrl }: { name: string; logoUrl: string; websiteUrl?: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const content = (
    <div className="flex items-center gap-3 px-5 py-3 rounded-full border border-border bg-card hover:border-accent/50 hover:bg-card/90 transition-all duration-300 group cursor-pointer whitespace-nowrap select-none">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={name}
          className="h-6 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert"
        />
      ) : (
        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-secondary/40 to-accent/20 border border-border flex items-center justify-center shrink-0 group-hover:border-accent/50 transition-colors duration-300">
          <span className="text-accent font-bold font-mono text-[10px]">{initials}</span>
        </div>
      )}
      <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium font-sans tracking-wide transition-colors duration-300">
        {name}
      </span>
    </div>
  );

  if (websiteUrl) {
    return (
      <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="block no-underline">
        {content}
      </a>
    );
  }
  return content;
}

export default function TrustedBySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  const { data: dbPartners, isPending } = useQuery("PartnerLogo", {
    orderBy: { displayOrder: "asc" },
  });

  const partners = FALLBACK_PARTNERS;

  // Heading fade-in on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // GSAP marquee animation — two tracks scrolling in opposite directions
  useEffect(() => {
    if (!track1Ref.current || !track2Ref.current) return;

    const tl1 = gsap.to(track1Ref.current, {
      xPercent: -50,
      duration: 28,
      ease: "none",
      repeat: -1,
    });

    const tl2 = gsap.to(track2Ref.current, {
      xPercent: 0,
      startAt: { xPercent: -50 },
      duration: 22,
      ease: "none",
      repeat: -1,
    });

    // Pause on hover
    const wrapper1 = track1Ref.current.parentElement;
    const wrapper2 = track2Ref.current.parentElement;

    const pause1 = () => tl1.pause();
    const resume1 = () => tl1.play();
    const pause2 = () => tl2.pause();
    const resume2 = () => tl2.play();

    wrapper1?.addEventListener("mouseenter", pause1);
    wrapper1?.addEventListener("mouseleave", resume1);
    wrapper2?.addEventListener("mouseenter", pause2);
    wrapper2?.addEventListener("mouseleave", resume2);

    return () => {
      tl1.kill();
      tl2.kill();
      wrapper1?.removeEventListener("mouseenter", pause1);
      wrapper1?.removeEventListener("mouseleave", resume1);
      wrapper2?.removeEventListener("mouseenter", pause2);
      wrapper2?.removeEventListener("mouseleave", resume2);
    };
  }, [partners, isPending]);

  // Double partners list for seamless loop
  const doubled = [...partners, ...partners];

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="py-20 md:py-28 relative overflow-hidden"
      aria-label="Trusted by industry leaders"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-fade-pulse" />
            <span className="text-accent text-xs font-mono uppercase tracking-widest">
              Our Partners
            </span>
          </div>
          <h2
            className="text-foreground font-bold font-sans text-3xl md:text-4xl mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-foreground font-serif text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            We partner with the most innovative protocols and platforms shaping
            the future of Web3.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
            <div className="h-px w-32 bg-accent/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent/40" />
          </div>
        </div>
      </div>

      {/* Marquee tracks — full-width, outside the max-w container */}
      {isPending ? (
        <div className="flex gap-4 px-8 overflow-hidden">
          {/* {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-12 w-36 rounded-full border border-border bg-card animate-pulse shrink-0" />
          ))} */}
        </div>
      ) : (
        <div className="space-y-4 mt-2">
          {/* Track 1 — left to right */}
          <div className="overflow-hidden relative">
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <div ref={track1Ref} className="flex gap-4 w-max">
              {doubled.map((p, i) => (
                <PartnerPill
                  key={`t1-${i}`}
                  name={p.name}
                  logoUrl={p.logoUrl}
                  websiteUrl={"websiteUrl" in p ? (p as any).websiteUrl : undefined}
                />
              ))}
            </div>
          </div>

          {/* Track 2 — right to left (starts offset) */}
          <div className="overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <div ref={track2Ref} className="flex gap-4 w-max">
              {[...doubled].reverse().map((p, i) => (
                <PartnerPill
                  key={`t2-${i}`}
                  name={p.name}
                  logoUrl={p.logoUrl}
                  websiteUrl={"websiteUrl" in p ? (p as any).websiteUrl : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom stat strip */}
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {[
            { value: "12+", label: "Strategic Partners" },
            { value: "$50M+", label: "Combined TVL" },
            { value: "3", label: "Continents" },
            { value: "2024", label: "Founded" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-foreground font-bold font-mono text-2xl">{value}</div>
              <div className="text-muted-foreground font-sans text-xs uppercase tracking-wider mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
