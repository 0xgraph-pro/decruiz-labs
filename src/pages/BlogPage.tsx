import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass, Clock, ArrowRight } from "@phosphor-icons/react";
import { blogPosts } from "../data/blogPosts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ALL_CATEGORIES = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

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

export default function BlogPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-grid-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.07 }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [activeCategory, search]);

  const filtered = blogPosts.filter((post) => {
    const matchCat = activeCategory === "All" || post.category === activeCategory;
    const term = search.toLowerCase();
    const matchSearch =
      !term ||
      post.title.toLowerCase().includes(term) ||
      post.excerpt.toLowerCase().includes(term) ||
      post.tags.some((t) => t.toLowerCase().includes(term));
    return matchCat && matchSearch;
  });

  const [featuredPost, ...restPosts] = filtered;

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative overflow-hidden opacity-0"
        style={{ minHeight: "420px" }}
      >
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1800&q=80&auto=format&fit=crop"
          alt="Blog hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />
        {/* Bottom gradient fade into page bg */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center py-24 px-8 text-center">
          <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">
            Blog
          </span>
          <h1
            className="text-white font-bold font-sans text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-4"
            style={{ letterSpacing: "-0.025em", lineHeight: "1.2" }}
          >
            DeCruiz Labs{" "}
            <span className="bg-gradient-1 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <p className="text-white/75 font-serif text-lg max-w-2xl mx-auto mb-10">
            Protocol updates, developer guides, ecosystem news, and deep dives into Web3 interoperability.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto w-full">
            <MagnifyingGlass
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-mono font-medium border transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-accent text-cta-primary-foreground border-accent"
                  : "bg-card border-border text-muted-foreground hover:text-accent hover:border-accent/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground font-sans">
            No articles found. Try a different search or category.
          </div>
        ) : (
          <div ref={gridRef}>
            {/* Featured Post */}
            {featuredPost && activeCategory === "All" && !search && (
              <article
                onClick={() => navigate(`/blog/${featuredPost.slug}`)}
                className="blog-grid-card opacity-0 group mb-10 grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl border border-border bg-card overflow-hidden hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-hero" />
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono font-medium border ${categoryColors[featuredPost.category] || "text-accent bg-accent/10 border-accent/20"}`}
                  >
                    {featuredPost.category}
                  </span>
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono font-medium bg-accent/20 text-accent border border-accent/30">
                    Featured
                  </span>
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-10">
                  <h2 className="text-foreground font-bold font-sans text-2xl lg:text-3xl leading-snug mb-4 group-hover:text-accent transition-colors duration-200">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground font-sans text-base leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredPost.authorAvatar}
                        alt={featuredPost.author}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-foreground font-sans text-sm font-medium">
                          {featuredPost.author}
                        </div>
                        <div className="text-muted-foreground font-sans text-xs">
                          {featuredPost.authorRole}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
                      <Clock size={13} />
                      <span>{featuredPost.readTime} min read</span>
                      <span className="mx-1">·</span>
                      <span>{formatDate(featuredPost.publishedAt)}</span>
                    </div>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-accent font-sans text-sm font-medium group-hover:gap-3 transition-all duration-200">
                    Read Article <ArrowRight size={16} weight="bold" />
                  </div>
                </div>
              </article>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeCategory !== "All" || search ? filtered : restPosts).map((post) => (
                <article
                  key={post.id}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="blog-grid-card opacity-0 group bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-44 overflow-hidden">
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
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-foreground font-bold font-sans text-base leading-snug mb-3 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
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
                      <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
                        <Clock size={12} />
                        <span>{post.readTime}m</span>
                        <span>·</span>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
