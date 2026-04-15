import React, { useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight, Star } from "@phosphor-icons/react";
import { useQuery } from "@animaapp/playground-react-sdk";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const fallbackTestimonials = [
  {
    id: "1",
    authorName: "Alex Chen",
    authorRole: "CEO of NexaGaming Studio",
    content:
      "DeCruiz Labs has fundamentally changed how we think about in-game economies. Our players can now carry their assets across platforms — it's a game changer for retention and monetization.",
    isActive: true,
  },
  {
    id: "2",
    authorName: "Sarah Mitchell",
    authorRole: "Head of DeFi at BlockVault",
    content:
      "The cross-platform liquidity infrastructure DeCruiz provides is unmatched. We've seen a 3x increase in capital efficiency since integrating with their ecosystem.",
    isActive: true,
  },
];

const fallbackPartners = [
  { id: "1", name: "NexaGaming", logoUrl: "", displayOrder: 1 },
  { id: "2", name: "BlockVault", logoUrl: "", displayOrder: 2 },
  { id: "3", name: "MetaRealty", logoUrl: "", displayOrder: 3 },
  { id: "4", name: "ChainLink", logoUrl: "", displayOrder: 4 },
  { id: "5", name: "PolyFi", logoUrl: "", displayOrder: 5 },
  { id: "6", name: "DeFiHub", logoUrl: "", displayOrder: 6 },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: testimonialsData } = useQuery("Testimonial", {
    where: { isActive: true },
  });

  const { data: partnersData } = useQuery("PartnerLogo", {
    orderBy: { displayOrder: "asc" },
  });

  const testimonials =
    testimonialsData && testimonialsData.length > 0
      ? testimonialsData
      : fallbackTestimonials;
  const partners =
    partnersData && partnersData.length > 0 ? partnersData : fallbackPartners;

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
        testimonialsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
          },
        },
      );
      gsap.fromTo(
        partnersRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: partnersRef.current,
            start: "top 85%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const prev = () =>
    setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrentIndex((i) => (i + 1) % testimonials.length);

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-neutral py-24 px-8"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">
            Trust Indicators
          </span>
          <h2
            id="testimonials-heading"
            className="text-foreground font-bold font-sans text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-4"
            style={{ letterSpacing: "-0.025em", lineHeight: "1.2" }}
          >
            Trusted by{" "}
            <span className="bg-gradient-1 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
        </div>

        {/* Partner Logos */}
        <div ref={partnersRef} className="opacity-0 mb-16">
          <p className="text-muted-foreground text-center font-sans text-sm uppercase tracking-widest mb-8">
            Our Partners
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {partners.map((partner) => (
              <a
                key={partner.id}
                href={partner.websiteUrl || "#"}
                target={partner.websiteUrl ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center justify-center p-4 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors duration-200 cursor-pointer"
                aria-label={partner.name}
              >
                {partner.logoUrl ? (
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="h-8 w-auto object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-muted-foreground font-mono text-xs font-medium text-center">
                    {partner.name}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Testimonials Rotator */}
        <div ref={testimonialsRef} className="opacity-0 max-w-3xl mx-auto">
          <div className="relative p-8 rounded-lg bg-card border border-border">
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={20}
                  weight="fill"
                  className="text-warning"
                />
              ))}
            </div>
            <blockquote className="text-foreground font-serif text-lg leading-relaxed mb-6">
              "{current.content}"
            </blockquote>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-bold font-sans text-base">
                  {current.authorName}
                </p>
                <p className="text-muted-foreground font-sans text-sm">
                  {current.authorRole}
                </p>
              </div>
              {testimonials.length > 1 && (
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-cta-primary-foreground transition-colors duration-200 cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <CaretLeft size={18} weight="bold" />
                  </button>
                  <button
                    onClick={next}
                    className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-cta-primary-foreground transition-colors duration-200 cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <CaretRight size={18} weight="bold" />
                  </button>
                </div>
              )}
            </div>

            {/* Dots */}
            {testimonials.length > 1 && (
              <div className="flex gap-2 mt-4 justify-center">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 cursor-pointer ${i === currentIndex ? "bg-accent" : "bg-muted-foreground/40"}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
