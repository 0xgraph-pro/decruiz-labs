import React, { useEffect, useRef } from "react";
import { ArrowRight, Clock, Tag } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const featured = blogPosts.slice(0, 3);

const categoryColors: Record<string, string> = {
  Gaming: "text-secondary bg-secondary/10 border-secondary/20",
  DeFi: "text-accent bg-accent/10 border-accent/20",
  "Real Estate": "text-success bg-success/10 border-success/20",
  Governance: "text-warning bg-warning/10 border-warning/20",
  Technology: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  Protocol: "text-pink-400 bg-pink-400/10 border-pink-400/20",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function FeaturedBlogsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".blog-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.12,
          scrollTrigger: { trigger: ".blog-cards-grid", start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="bg-gradient-2 py-24 px-8"
      aria-labelledby="blog-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">
            Latest Insights
          </span>
          <h2
            id="blog-heading"
            className="text-foreground font-bold font-sans text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-4"
            style={{ letterSpacing: "-0.025em", lineHeight: "1.2" }}
          >
            From the{" "}
            <span className="bg-gradient-1 bg-clip-text text-transparent">
              DeCruiz Blog
            </span>
          </h2>
          <p className="text-muted-foreground font-serif text-lg max-w-2xl mx-auto">
            Deep dives, protocol updates, and ecosystem news from the DeCruiz Labs team.
          </p>
        </div>

        <div className="blog-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featured.map((post) => (
            <article
              key={post.id}
              className="blog-card opacity-0 group bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/blog/${post.slug}`)}
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-hero" />
                <span
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${categoryColors[post.category] || "text-accent bg-accent/10 border-accent/20"}`}
                >
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-foreground font-bold font-sans text-lg leading-snug mb-3 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-muted-foreground font-sans text-xs">
                      {post.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground text-xs font-mono">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}m
                    </span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View More CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-normal rounded-md bg-cta-primary text-cta-primary-foreground hover:bg-tertiary/80 transition-colors duration-200 cursor-pointer font-sans"
          >
            View All Articles
            <ArrowRight size={20} weight="bold" />
          </button>
        </div>
      </div>
    </section>
  );
}
