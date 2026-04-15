import React, { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    title: "Gaming",
    subtitle: "Play, Own, Earn",
    description:
      "DeCruiz enables true ownership of in-game assets. Trade your rare items across multiple game universes, use them as DeFi collateral, or convert them to real-world value — all through a unified wallet.",
    image: "https://c.animaapp.com/mnw8opdnaQC9xY/img/ai_4.png",
    alt: "Abstract depiction of gaming DeFi and real estate flow",
    tag: "Gaming",
    href: "/gaming",
  },
  {
    title: "DeFi",
    subtitle: "Liquidity Without Borders",
    description:
      "Access decentralized finance protocols that understand your full digital portfolio — gaming assets, tokenized real estate, and crypto holdings — enabling smarter lending, staking, and yield strategies.",
    image: "https://c.animaapp.com/mnw8opdnaQC9xY/img/ai_3.png",
    alt: "Abstract visualization of connected Web3 ecosystem",
    tag: "DeFi",
    href: "/defi",
  },
  {
    title: "Real Estate",
    subtitle: "Tokenized Ownership",
    description:
      "Fractional ownership of real-world properties through blockchain tokenization. Invest in real estate with the same ease as trading tokens, with full interoperability across the DeCruiz ecosystem.",
    image: "https://c.animaapp.com/mnw8opdnaQC9xY/img/ai_5.png",
    alt: "Abstract representation of decentralized community governance",
    tag: "Real Estate",
    href: "/real-estate",
  },
];

export default function UseCasesCarousel() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 20);
    setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

  return (
    <section
      id="usecases"
      ref={sectionRef}
      className="bg-gradient-2 py-24 px-8"
      aria-labelledby="usecases-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">
            Use Cases
          </span>
          <h2
            id="usecases-heading"
            className="text-foreground font-bold font-sans text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-4"
            style={{ letterSpacing: "-0.025em", lineHeight: "1.2" }}
          >
            Powering{" "}
            <span className="bg-gradient-1 bg-clip-text text-transparent">
              Three Industries
            </span>
          </h2>
          <p className="text-muted-foreground font-serif text-lg max-w-2xl mx-auto">
            Discover how DeCruiz Labs transforms the way value flows across
            digital and physical worlds.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-cta-primary-foreground transition-all duration-200 cursor-pointer ${isHovered ? "opacity-100" : "opacity-0"}`}
              aria-label="Scroll left"
            >
              <ArrowLeft size={20} weight="bold" />
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={scrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-cta-primary-foreground transition-all duration-200 cursor-pointer ${isHovered ? "opacity-100" : "opacity-0"}`}
              aria-label="Scroll right"
            >
              <ArrowRight size={20} weight="bold" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            role="list"
            aria-label="Use cases"
          >
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="flex-shrink-0 w-80 md:w-96 rounded-lg overflow-hidden bg-card border border-border transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
                role="listitem"
                tabIndex={0}
                aria-label={uc.title}
                onClick={() => navigate(uc.href)}
                onKeyDown={(e) => e.key === "Enter" && navigate(uc.href)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={uc.image}
                    alt={uc.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-hero" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-mono uppercase tracking-wider">
                    {uc.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-foreground font-bold font-sans text-xl mb-1">
                    {uc.title}
                  </h3>
                  <p className="text-accent font-mono text-sm mb-3">
                    {uc.subtitle}
                  </p>
                  <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                    {uc.description}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-4 text-accent font-mono text-xs uppercase tracking-widest">
                    Learn more <ArrowRight size={12} weight="bold" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
