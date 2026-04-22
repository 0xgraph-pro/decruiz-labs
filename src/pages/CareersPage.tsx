import React, { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  MapPin,
  Clock,
  CurrencyDollar,
  Code,
  ChartLineUp,
  Funnel,
  Users,
  Megaphone,
  ShieldCheck,
  Cpu,
  Rocket,
  ChartBar,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type JobCategory = "All" | "Engineering" | "Product" | "Marketing";

export type Job = {
  id: string;
  title: string;
  category: JobCategory;
  location: string;
  type: string;
  salaryRange: string;
  icon: React.ElementType;
  gradient: string;
  summary: string;
};

export const jobs: Job[] = [
  {
    id: "senior-protocol-engineer",
    title: "Senior Protocol Engineer",
    category: "Engineering",
    location: "Remote / Global",
    type: "Full-time",
    salaryRange: "$160k – $220k",
    icon: Code,
    gradient: "from-cyan-500 to-blue-600",
    summary: "Design and implement core cross-chain bridge primitives and ZK identity layers that power the DeCruiz interoperability stack.",
  },
  {
    id: "smart-contract-security-auditor",
    title: "Smart Contract Security Auditor",
    category: "Engineering",
    location: "Remote / Global",
    type: "Full-time",
    salaryRange: "$150k – $210k",
    icon: ShieldCheck,
    gradient: "from-indigo-500 to-blue-700",
    summary: "Conduct rigorous audits of our protocol contracts, identify vulnerabilities, and work directly with protocol engineers to ship hardened code.",
  },
  {
    id: "senior-web3-fullstack-engineer",
    title: "Senior Web3 Full-Stack Engineer",
    category: "Engineering",
    location: "Remote / Global",
    type: "Full-time",
    salaryRange: "$140k – $200k",
    icon: Code,
    gradient: "from-purple-500 to-indigo-600",
    summary: "Build end-to-end decentralized applications, integrating smart contracts, scalable backend services, and intuitive frontends for the DeCruiz Web3 ecosystem.",
  },
  {
    id: "senior-web3-frontend-engineer",
    title: "Senior Web3 Frontend Engineer",
    category: "Engineering",
    location: "Remote / Global",
    type: "Full-time",
    salaryRange: "$130k – $190k",
    icon: Code,
    gradient: "from-indigo-500 to-purple-600",
    summary: "Build performant, user-centric Web3 interfaces, integrating wallets, smart contracts, and real-time blockchain data into seamless user experiences.",
  },
  {
    id: "platform-engineer",
    title: "Platform Infrastructure Engineer",
    category: "Engineering",
    location: "Remote / Global",
    type: "Full-time",
    salaryRange: "$140k – $190k",
    icon: Cpu,
    gradient: "from-teal-500 to-cyan-700",
    summary: "Architect and scale the cloud-native infrastructure that underpins DeCruiz node networks, indexers, and real-time event pipelines.",
  },
  {
    id: "senior-blockchain-engineer",
    title: "Senior Blockchain Engineer",
    category: "Engineering",
    location: "Remote / Global",
    type: "Full-time",
    salaryRange: "$140k – $210k",
    icon: Code,
    gradient: "from-emerald-500 to-cyan-600",
    summary: "Design and build secure, scalable blockchain systems and smart contract infrastructure, powering DeCruiz’s core Web3 protocols and decentralized applications.",
  },
  {
    id: "product-manager-defi",
    title: "Product Manager — DeFi",
    category: "Product",
    location: "Remote / Global",
    type: "Full-time",
    salaryRange: "$130k – $175k",
    icon: ChartLineUp,
    gradient: "from-amber-500 to-orange-600",
    summary: "Own the roadmap for our DeFi protocol suite — liquidity tools, staking dashboards, and cross-chain swap experiences.",
  },
  {
    id: "product-designer",
    title: "Senior Product Designer",
    category: "Product",
    location: "Remote / Global",
    type: "Full-time",
    salaryRange: "$120k – $160k",
    icon: Funnel,
    gradient: "from-violet-500 to-purple-700",
    summary: "Shape the end-to-end user experience across Web3 products — from wallet onboarding to complex governance dashboards.",
  },
  {
    id: "product-analyst",
    title: "Product Analyst",
    category: "Product",
    location: "Remote / Global",
    type: "Full-time",
    salaryRange: "$100k – $140k",
    icon: Rocket,
    gradient: "from-rose-500 to-pink-700",
    summary: "Turn on-chain and off-chain data into actionable insights that guide product direction and identify growth opportunities.",
  },
  {
    id: "growth-lead",
    title: "Growth Marketing Lead",
    category: "Marketing",
    location: "Remote / Global",
    type: "Full-time",
    salaryRange: "$110k – $150k",
    icon: Megaphone,
    gradient: "from-fuchsia-500 to-pink-600",
    summary: "Build and execute multi-channel growth campaigns across crypto-native and mainstream audiences to drive protocol adoption.",
  },
  {
    id: "content-strategist",
    title: "Web3 Content Strategist",
    category: "Marketing",
    location: "Remote / Global",
    type: "Full-time",
    salaryRange: "$90k – $130k",
    icon: ChartBar,
    gradient: "from-emerald-500 to-teal-600",
    summary: "Create technical and thought-leadership content — blog posts, whitepapers, threads, and videos — that cement DeCruiz as an industry voice.",
  },
  {
    id: "community-partnerships-lead",
    title: "Community & Partnerships Lead",
    category: "Marketing",
    location: "Remote / Global",
    type: "Full-time",
    salaryRange: "$100k – $140k",
    icon: Users,
    gradient: "from-purple-500 to-violet-700",
    summary: "Grow and energize the DeCruiz developer and community ecosystem through hackathons, AMAs, partner programs, and educational content.",
  },
];

const perks = [
  {
    emoji: "🌍",
    title: "Remote-First",
    desc: "Work from anywhere in the world, async-friendly culture.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80&auto=format&fit=crop",
  },
  {
    emoji: "💰",
    title: "Competitive Comp",
    desc: "Top-of-market salary plus meaningful token allocation.",
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&q=80&auto=format&fit=crop",
  },
  {
    emoji: "🏥",
    title: "Full Benefits",
    desc: "Premium health, dental, and vision for you and your family.",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&q=80&auto=format&fit=crop",
  },
  {
    emoji: "📚",
    title: "Learning Budget",
    desc: "$3,000 / year for conferences, courses, and books.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80&auto=format&fit=crop",
  },
  {
    emoji: "🧘",
    title: "Wellness Stipend",
    desc: "$100 / month for gym, meditation, or mental health apps.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80&auto=format&fit=crop",
  },
  {
    emoji: "🏖️",
    title: "Unlimited PTO",
    desc: "Minimum 20 days encouraged — we mean it.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80&auto=format&fit=crop",
  },
];

const CATEGORIES: JobCategory[] = ["All", "Engineering", "Product", "Marketing"];

const CATEGORY_META: Record<JobCategory, { color: string; activeBg: string; activeBorder: string; activeText: string }> = {
  All: {
    color: "text-muted-foreground",
    activeBg: "bg-accent/15",
    activeBorder: "border-accent/50",
    activeText: "text-accent",
  },
  Engineering: {
    color: "text-muted-foreground",
    activeBg: "bg-cyan-500/15",
    activeBorder: "border-cyan-500/50",
    activeText: "text-cyan-300",
  },
  Product: {
    color: "text-muted-foreground",
    activeBg: "bg-amber-500/15",
    activeBorder: "border-amber-500/50",
    activeText: "text-amber-300",
  },
  Marketing: {
    color: "text-muted-foreground",
    activeBg: "bg-fuchsia-500/15",
    activeBorder: "border-fuchsia-500/50",
    activeText: "text-fuchsia-300",
  },
};

export default function CareersPage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = React.useState<JobCategory>("All");

  const filteredJobs = activeCategory === "All" ? jobs : jobs.filter((j) => j.category === activeCategory);

  // Initial page load animations (hero + perks)
  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".perk-card",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".perks-grid", start: "top 85%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // Re-run job-card animation whenever the filter changes
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".job-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.08 }
    );
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center">
        {/* Full-bleed background image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1800&q=80&auto=format&fit=crop"
            alt="DeCruiz Labs team collaborating"
            className="w-full h-full object-cover object-center opacity-40"
          />
          {/* Dark overlay with gradient to ensure text readability */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/30" /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>

        {/* Floating image accent cards — top-right corner */}
        <div className="absolute top-28 right-10 hidden xl:flex flex-col gap-4 z-10">
          <div className="w-52 h-36 rounded-2xl overflow-hidden border border-white/10 shadow-2xl ring-1 ring-white/5 rotate-2">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80&auto=format&fit=crop"
              alt="Engineers working"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-44 h-28 rounded-2xl overflow-hidden border border-white/10 shadow-2xl ring-1 ring-white/5 -rotate-1 self-end">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop"
              alt="Code review session"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-48 h-32 rounded-2xl overflow-hidden border border-white/10 shadow-2xl ring-1 ring-white/5 rotate-1">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80&auto=format&fit=crop"
              alt="Team offsite"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div ref={heroRef} className="relative z-10 max-w-5xl mx-auto px-8 pt-32 pb-24 opacity-0">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-6">
            <Briefcase size={12} weight="fill" />
            We&#39;re Hiring
          </span>
          <h1
            className="text-foreground font-bold text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-6 max-w-3xl"
            style={{ letterSpacing: "-0.03em", lineHeight: "1.1" }}
          >
            Build the Future of{" "}
            <span className="bg-gradient-1 bg-clip-text text-transparent">
              Web3
            </span>{" "}
            With Us
          </h1>
          <p className="text-muted-foreground font-serif text-lg md:text-xl leading-relaxed max-w-xl mb-10">
            DeCruiz Labs is actively growing. We&#39;re looking for exceptional builders, researchers, and operators who
            want to make a lasting dent in the Web3 universe.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {jobs.length} open positions
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground font-mono">
              <span className="text-cyan-300 font-semibold">{jobs.filter(j => j.category === "Engineering").length}</span> Engineering
              <span className="mx-1 text-border">·</span>
              <span className="text-amber-300 font-semibold">{jobs.filter(j => j.category === "Product").length}</span> Product
              <span className="mx-1 text-border">·</span>
              <span className="text-fuchsia-300 font-semibold">{jobs.filter(j => j.category === "Marketing").length}</span> Marketing
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground font-mono">
              <MapPin size={13} weight="fill" className="text-accent" />
              Remote-first · Global
            </div>
          </div>

          {/* Culture stat strip */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg">
            {[
              { value: "50+", label: "Team members" },
              { value: "22+", label: "Countries" },
              { value: "4.9★", label: "Glassdoor" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-foreground tracking-tight">{value}</div>
                <div className="text-xs font-mono text-muted-foreground mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section className="py-24 px-8 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-foreground font-bold text-3xl md:text-4xl tracking-tight text-center mb-4">
            Open Positions
          </h2>
          <p className="text-muted-foreground font-serif text-lg text-center mb-8 max-w-xl mx-auto">
            Every role is an opportunity to work on problems that matter at the frontier of decentralized technology.
          </p>

          {/* ── Filter Tabs ── */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat];
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full border font-mono text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? `${meta.activeBg} ${meta.activeBorder} ${meta.activeText}`
                      : "bg-card border-border text-muted-foreground hover:border-accent/30 hover:text-foreground"
                  }`}
                >
                  {cat}
                  {cat !== "All" && (
                    <span
                      className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                        isActive ? "bg-white/15" : "bg-muted"
                      }`}
                    >
                      {jobs.filter((j) => j.category === cat).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="jobs-grid flex flex-col gap-5">
            {filteredJobs.map((job) => {
              const Icon = job.icon;
              const catMeta = CATEGORY_META[job.category];
              return (
                <article
                  key={job.id}
                  onClick={() => navigate(`/careers/${job.id}`)}
                  className="job-card group flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 rounded-2xl bg-card border border-border hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 cursor-pointer"
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${job.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <Icon size={26} weight="fill" className="text-white" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-foreground font-bold text-lg group-hover:text-accent transition-colors duration-200">
                        {job.title}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full border font-mono text-xs ${catMeta.activeBg} ${catMeta.activeBorder} ${catMeta.activeText}`}>
                        {job.category}
                      </span>
                    </div>
                    <p className="text-muted-foreground font-serif text-sm leading-relaxed line-clamp-2">
                      {job.summary}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} weight="fill" className="text-accent/70" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} weight="fill" className="text-accent/70" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CurrencyDollar size={12} weight="fill" className="text-accent/70" />
                        {job.salaryRange}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden sm:flex w-10 h-10 rounded-xl border border-border bg-muted items-center justify-center flex-shrink-0 group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:text-accent transition-all duration-200 text-muted-foreground">
                    <ArrowRight size={18} weight="bold" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Perks ── */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-foreground font-bold text-3xl md:text-4xl tracking-tight text-center mb-4">
            Why DeCruiz Labs?
          </h2>
          <p className="text-muted-foreground font-serif text-lg text-center mb-14 max-w-xl mx-auto">
            We built the kind of company we always wanted to work at.
          </p>

          <div className="perks-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map(({ emoji, title, desc, image }) => (
              <div
                key={title}
                className="perk-card opacity-0 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors duration-300 overflow-hidden group"
              >
                {/* Card image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-2xl">{emoji}</span>
                </div>
                {/* Card body */}
                <div className="p-6">
                  <h3 className="text-foreground font-bold text-base mb-2">{title}</h3>
                  <p className="text-muted-foreground font-serif text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 px-8 bg-gradient-2 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-foreground font-bold text-3xl md:text-4xl tracking-tight mb-4">
            Don&#39;t See Your Role?
          </h2>
          <p className="text-muted-foreground font-serif text-lg mb-8">
            We&#39;re always open to exceptional people. Drop us a line and tell us how you&#39;d contribute.
          </p>
          <button
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="px-8 py-3.5 rounded-xl bg-cta-primary text-cta-primary-foreground font-sans font-medium hover:opacity-90 transition-opacity duration-200 cursor-pointer"
          >
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
}
