import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Tag, ArrowRight } from "@phosphor-icons/react";
import { blogPosts } from "../data/blogPosts";
import gsap from "gsap";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const categoryColors: Record<string, string> = {
  Gaming: "text-secondary bg-secondary/10 border-secondary/20",
  DeFi: "text-accent bg-accent/10 border-accent/20",
  "Real Estate": "text-success bg-success/10 border-success/20",
  Governance: "text-warning bg-warning/10 border-warning/20",
  Technology: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  Protocol: "text-pink-400 bg-pink-400/10 border-pink-400/20",
};

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) { elements.push(<div key={key++} className="h-4" />); continue; }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-foreground font-bold font-sans text-2xl mt-10 mb-4" style={{ letterSpacing: "-0.02em" }}>
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={key++} className="text-foreground font-bold font-sans text-base mb-2">
          {line.replace(/\*\*/g, "")}
        </p>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={key++} className="text-muted-foreground font-sans text-base leading-relaxed ml-6 list-disc mb-1">
          {line.replace("- ", "")}
        </li>
      );
    } else if (line.startsWith("```")) {
      const lang = line.replace("```", "").trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={key++} className="bg-muted rounded-lg p-4 my-4 overflow-x-auto">
          <code className="text-accent font-mono text-sm leading-relaxed">
            {codeLines.join("\n")}
          </code>
        </pre>
      );
    } else {
      elements.push(
        <p key={key++} className="text-muted-foreground font-sans text-base leading-relaxed mb-4">
          {line}
        </p>
      );
    }
  }
  return elements;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const post = blogPosts.find((p) => p.slug === slug);
  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post?.category).slice(0, 2);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
      gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power2.out" });
    });
    return () => ctx.revert();
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background pt-20 flex flex-col items-center justify-center text-center px-8">
        <h1 className="text-foreground font-bold font-sans text-3xl mb-4">Article Not Found</h1>
        <p className="text-muted-foreground font-sans mb-8">The article you&#39;re looking for doesn&#39;t exist.</p>
        <button
          onClick={() => navigate("/blog")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-cta-primary text-cta-primary-foreground font-sans text-sm hover:bg-tertiary/80 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <div ref={heroRef} className="opacity-0">
        <div className="relative h-80 md:h-[480px] overflow-hidden">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover scale-105" />
          {/* Deep overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
          {/* Bottom fade into page background */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-8 pb-12 w-full">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-medium border mb-4 ${categoryColors[post.category] || "text-accent bg-accent/10 border-accent/20"}`}
              >
                {post.category}
              </span>
              <h1
                className="text-white font-bold font-sans text-3xl md:text-4xl lg:text-5xl leading-tight"
                style={{ letterSpacing: "-0.025em", lineHeight: "1.2" }}
              >
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Meta Bar */}
        <div className="bg-card border-b border-border">
          <div className="max-w-4xl mx-auto px-8 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="text-foreground font-sans text-sm font-medium">{post.author}</div>
                <div className="text-muted-foreground font-sans text-xs">{post.authorRole}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground font-mono text-xs">
              <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime} min read</span>
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="max-w-4xl mx-auto px-8 py-12 opacity-0">
        {/* Back */}
        <button
          onClick={() => navigate("/blog")}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent font-sans text-sm mb-10 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Blog
        </button>

        {/* Article Body */}
        <article className="prose-custom">
          {renderContent(post.content)}
        </article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border">
          {post.tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-muted-foreground font-mono text-xs">
              <Tag size={12} /> {tag}
            </span>
          ))}
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-foreground font-bold font-sans text-2xl mb-6" style={{ letterSpacing: "-0.02em" }}>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((rel) => (
                <article
                  key={rel.id}
                  onClick={() => navigate(`/blog/${rel.slug}`)}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-hero" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-foreground font-bold font-sans text-base leading-snug mb-2 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                      {rel.title}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 text-accent font-sans text-xs font-medium group-hover:gap-2.5 transition-all duration-200">
                      Read more <ArrowRight size={13} weight="bold" />
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
