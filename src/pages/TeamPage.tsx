import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  LinkedinLogo,
  TwitterLogo,
  GithubLogo,
  Users,
  Star,
  Handshake,
  Rocket,
  Brain,
  Code,
  ChartPieSlice,
  Buildings,
  Certificate,
  LinkSimple,
  ShieldCheck,
  Trophy,
  MapPin,
  CalendarBlank,
  ArrowRight,
  Heart,
  Camera,
  Coffee,
  Mountains,
  Confetti,
  GameController,
  
} from "@phosphor-icons/react";
import { MailIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StatNumber from "../components/StatNumber";

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─────────────────────────────────────────────── */

const milestones = [
  {
    year: "2019",
    title: "Founded in Berlin",
    desc: "Leo Kelly and Brian Walker left Goldman Sachs and MIT to prototype the first cross-chain identity layer.",
    accent: "from-cyan-500 to-blue-600",
  },
  {
    year: "2020",
    title: "Seed Round — $4.2M",
    desc: "Raised from a16z Crypto, Multicoin Capital, and Dragonfly. Launched the first DeCruiz testnet with 18 node operators.",
    accent: "from-purple-500 to-violet-600",
  },
  {
    year: "2021",
    title: "Mainnet + DeFi Pilot",
    desc: "Mainnet went live. First DeFi integration processed $380M in cross-chain volume within 90 days.",
    accent: "from-amber-500 to-orange-600",
  },
  {
    year: "2022",
    title: "GameFi & RWA Expansion",
    desc: "Partnered with 3 AAA gaming studios and tokenized €200M of European real estate assets on-chain.",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    year: "2023",
    title: "Series A — $28M",
    desc: "Led by Paradigm. Launched DAO governance and onboarded 140K community members across 62 countries.",
    accent: "from-rose-500 to-pink-600",
  },
  {
    year: "2024",
    title: "100K TPS Milestone",
    desc: "Achieved 100,000 TPS on optimistic rollup stack. Ecosystem surpassed $1.2B in total value locked.",
    accent: "from-indigo-500 to-blue-700",
  },
];

const team = [
  {
    name: "Leo Kelly",
    role: "Founder & CEO",
    img: "/teams/leo-kelly.png",
    gradient: "from-cyan-500 to-blue-600",
    icon: Rocket,
    social: { linkedin: "https://www.linkedin.com/in/leo-kelly-44606b58/", email: "mailto:consulting@decruizlabs.com" },
    tags: ["Web3", "DeFi", "Strategy"],
    location: "Berlin, DE",
  },
  {
    name: "Brian Walker",
    role: "CTO & Co-Founder",
    img: "/teams/brian-walker.jpg",
    gradient: "from-purple-500 to-violet-700",
    icon: Code,
    social: { linkedin: "https://www.linkedin.com/in/brian-walker-04b41214/", email: "mailto:technical@decruizlabs.com" },
    tags: ["ZK Proofs", "Protocol Design", "Cryptography"],
    location: "Cambridge, US",
  },
  {
    name: "David Kimura",
    role: "Head of Talent",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80&auto=format&fit=crop&face",
    gradient: "from-amber-500 to-orange-600",
    icon: ChartPieSlice,
    social: { linkedin: "https://linkedin.com", email: "mailto:talent@decruizlabs.com" },
    tags: ["DeFi", "Liquidity", "Tokenomics"],
    location: "Tokyo, JP",
  }
];

const advisors = [
  {
    name: "Dr. Elena Moreau",
    role: "Strategic Advisor",
    org: "Former Deputy Director, World Economic Forum",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop&face",
  },
  {
    name: "Marcus Webb",
    role: "Technical Advisor",
    org: "Co-author of EIP-4337 · Ethereum Foundation",
    img: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80&auto=format&fit=crop&face",
  },
  {
    name: "Isabelle Chen",
    role: "Regulatory Advisor",
    org: "Former EU Blockchain Observatory Chair",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&auto=format&fit=crop&face",
  },
  {
    name: "Raj Patel",
    role: "Venture Advisor",
    org: "General Partner, a16z Crypto",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop&face",
  },
];

const blockchainPartners = [
  { name: "Ethereum Foundation", desc: "Core infrastructure alignment and EIP co-authorship", logo: "/company-logo/ethereum-eth-logo.png", abbr: "ETH" },
  { name: "Polygon Labs", desc: "ZK rollup deployment partner & zkEVM integration", logo: "/company-logo/polygon-matic-logo.svg", abbr: "POL" },
  { name: "Chainlink", desc: "Oracle infrastructure for cross-chain data feeds", logo: "/company-logo/chainlink-link-logo.svg", abbr: "CL" },
  { name: "Arbitrum", desc: "Layer-2 scaling for DeFi and GameFi workloads", logo: "/company-logo/arbitrum-arb-logo.svg", abbr: "ARB" },
  { name: "Cosmos SDK", desc: "IBC-native protocol extensions and zone bridging", logo: "company-logo/cosmos-atom-logo.svg", abbr: "COS" },
  { name: "Solana Foundation", desc: "High-throughput gaming asset settlement rail", logo: "/company-logo/solana-sol-logo.svg", abbr: "SOL" },
];

const ecosystemAlliances = [
  { name: "Enterprise Ethereum Alliance", category: "Standards Body", icon: Certificate },
  { name: "Blockchain for Europe", category: "Policy Alliance", icon: Buildings },
  { name: "DeFi Alliance", category: "Industry Consortium", icon: LinkSimple },
  { name: "Open Metaverse Alliance", category: "Standards Body", icon: Star },
  { name: "RWA Foundation", category: "Industry Consortium", icon: Buildings },
  { name: "W3C Digital Credentials", category: "Standards Body", icon: Certificate },
];

const certifications = [
  {
    title: "ISO/IEC 27001",
    desc: "Information Security Management — annual third-party audit",
    icon: ShieldCheck,
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "SOC 2 Type II",
    desc: "Security, availability and confidentiality controls certified",
    icon: Certificate,
    color: "from-purple-500 to-violet-600",
  },
  {
    title: "CertiK Audited",
    desc: "Smart contract security audits on all deployed protocol versions",
    icon: ShieldCheck,
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Trail of Bits",
    desc: "Independent cryptographic review of ZK identity and bridge code",
    icon: ShieldCheck,
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "GDPR Compliant",
    desc: "EU data residency, right-to-forget and privacy-by-design enforced",
    icon: Certificate,
    color: "from-rose-500 to-pink-600",
  },
  {
    title: "MiCA Ready",
    desc: "Markets in Crypto-Assets Regulation compliance framework active",
    icon: Trophy,
    color: "from-indigo-500 to-blue-700",
  },
];

const culturePhotos = [
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format&fit=crop",
    alt: "Team collaboration session",
    caption: "Weekly all-hands in Berlin HQ",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80&auto=format&fit=crop",
    alt: "Team lunch together",
    caption: "Friday team lunches 🍜",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80&auto=format&fit=crop",
    alt: "Whiteboarding session",
    caption: "Deep-dive architecture sprints",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=600&q=80&auto=format&fit=crop",
    alt: "Team offsite",
    caption: "Annual offsite — Swiss Alps 2024",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80&auto=format&fit=crop",
    alt: "Team celebration",
    caption: "Mainnet launch party 🎉",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop",
    alt: "Remote team call",
    caption: "Connecting across 62 countries",
    span: "col-span-2",
  },
];

const culturePerks = [
  { icon: Coffee, title: "Async-first Culture", desc: "No mandatory 9-to-5. We trust outcomes, not hours.", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  { icon: Mountains, title: "Annual Offsite", desc: "The entire team meets IRL once a year — somewhere inspiring.", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { icon: Heart, title: "Health & Wellness", desc: "Full healthcare, mental health stipend, and gym allowance.", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
  { icon: GameController, title: "Hack Fridays", desc: "Every Friday afternoon is reserved for personal Web3 experiments.", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
  { icon: Confetti, title: "Ship Celebrations", desc: "Every launch is celebrated — big or small. We honour the wins.", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { icon: Camera, title: "Learning Budget", desc: "$3K/year per person for courses, conferences, and books.", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
];

const values = [
  { icon: Code, title: "Open Source First", desc: "All core infrastructure is open-source and community-audited." },
  { icon: Users, title: "Community Driven", desc: "Governance decisions flow through our DAO — no unilateral choices." },
  { icon: Brain, title: "Research at the Core", desc: "We publish our research and advance the broader Web3 ecosystem." },
  { icon: Handshake, title: "Long-Term Aligned", desc: "Token vesting schedules ensure team incentives match community outcomes." },
];

/* ─── COMPONENT ─────────────────────────────────────────── */

export default function TeamPage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(".milestone-item", { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.6, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: ".milestones-list", start: "top 80%" },
      });
      gsap.fromTo(".team-card", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: ".team-grid", start: "top 80%" },
      });
      gsap.fromTo(".culture-photo", { opacity: 0, scale: 0.96 }, {
        opacity: 1, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ".culture-grid", start: "top 80%" },
      });
      gsap.fromTo(".culture-perk", { opacity: 0, y: 25 }, {
        opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ".culture-grid", start: "top 60%" },
      });
      gsap.fromTo(".advisor-card", { opacity: 0, scale: 0.95 }, {
        opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: ".advisors-grid", start: "top 80%" },
      });
      gsap.fromTo(".partner-card", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ".partners-grid", start: "top 80%" },
      });
      gsap.fromTo(".alliance-item", { opacity: 0, x: 20 }, {
        opacity: 1, x: 0, duration: 0.5, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ".alliances-grid", start: "top 85%" },
      });
      gsap.fromTo(".cert-card", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ".certs-grid", start: "top 80%" },
      });
      gsap.fromTo(".value-card", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: ".values-grid", start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Team - DeCruiz Labs | Meet Our Experts</title>
        <meta name="description" content="Meet the DeCruiz Labs team: experts in Web3, blockchain, and interoperability across gaming, DeFi, and real estate." />
        <meta name="keywords" content="DeCruiz Labs team, Web3 experts, blockchain developers, interoperability specialists" />
        <link rel="canonical" href="https://decruizlabs.com/team" />
        <meta property="og:title" content="Team - DeCruiz Labs | Meet Our Experts" />
        <meta property="og:description" content="Meet the DeCruiz Labs team: experts in Web3, blockchain, and interoperability." />
        <meta property="og:url" content="https://decruizlabs.com/team" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Team - DeCruiz Labs | Meet Our Experts" />
        <meta name="twitter:description" content="Meet the DeCruiz Labs team: experts in Web3, blockchain, and interoperability." />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground font-sans">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-8">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=70&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
        </div>

        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto text-center opacity-0">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-xs uppercase tracking-widest mb-6">
            <Users size={12} weight="fill" />
            About DeCruiz Labs
          </span>

          <h1
            className="text-foreground font-bold text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-6"
            style={{ letterSpacing: "-0.03em", lineHeight: "1.1" }}
          >
            People, Purpose &{" "}
            <span className="bg-gradient-1 bg-clip-text text-transparent">
              Proof of Work
            </span>
          </h1>
          <p className="text-muted-foreground font-serif text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            We&#39;re not a dev shop. We&#39;re a team of world-class engineers,
            researchers, and operators who have been building Web3 infrastructure since 2019 —
            with the credentials, partnerships, and audits to prove it.
          </p>

          {/* Hero stat strip */}
          <div className="flex flex-wrap justify-center gap-8 mt-8 pt-8 border-t border-border/50">
            {[
              { value: "2019", label: "Founded" },
              { value: "62+", label: "Countries" },
              { value: "$1.2B", label: "TVL" },
              { value: "140K+", label: "Community" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <StatNumber raw={value} className="text-2xl font-bold text-foreground font-mono block" duration={2} />
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision ── */}
      <section className="py-24 px-8 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-6">
                <Rocket size={12} weight="fill" />
                Our Vision
              </span>
              <h2 className="text-foreground font-bold text-3xl md:text-4xl tracking-tight mb-6" style={{ letterSpacing: "-0.02em" }}>
                A World Where Every Digital Asset Moves Freely
              </h2>
              <p className="text-muted-foreground font-serif text-lg leading-relaxed mb-6">
                We believe the next chapter of the internet belongs to its users — not platforms.
                DeCruiz Labs is building the interoperability and ownership layer that makes that real:
                portable identities, cross-chain liquidity, and programmable real-world assets.
              </p>
              <p className="text-muted-foreground font-serif text-base leading-relaxed">
                Our mission is to compress decades of financial and digital infrastructure
                evolution into a unified, permissionless ecosystem — starting with Gaming,
                DeFi, and Real Estate, and expanding to every tokenizable vertical that follows.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Rocket, label: "Pioneering", desc: "We build primitives others haven&#39;t imagined yet", color: "text-cyan-400" },
                { icon: ShieldCheck, label: "Trustless", desc: "Zero trust assumptions — cryptographic guarantees only", color: "text-purple-400" },
                { icon: Users, label: "Community-first", desc: "Every protocol decision is governed by token holders", color: "text-emerald-400" },
                { icon: Brain, label: "Research-backed", desc: "12 peer-reviewed publications and 3 protocol patents", color: "text-amber-400" },
              ].map(({ icon: Icon, label, desc, color }) => (
                <div key={label} className="p-5 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors duration-300">
                  <Icon size={24} weight="fill" className={`${color} mb-3`} />
                  <div className="text-foreground font-bold text-sm mb-1">{label}</div>
                  <div className="text-muted-foreground font-sans text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: desc }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Company Journey ── */}
      <section className="py-24 px-8 bg-gradient-2">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs uppercase tracking-widest mb-6">
            <CalendarBlank size={12} weight="fill" />
            Company Journey
          </span>
          <h2 className="text-foreground font-bold text-3xl md:text-4xl tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
            Five Years of Building
          </h2>
          <p className="text-muted-foreground font-serif text-lg mb-14 max-w-xl">
            From a two-person prototype in Berlin to a $1.2B ecosystem across six chains.
          </p>

          <div className="milestones-list relative">
            {/* Vertical line */}
            <div className="absolute left-[88px] top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="flex flex-col gap-8">
              {milestones.map(({ year, title, desc, accent }) => (
                <div key={year} className="milestone-item opacity-0 flex gap-6 md:gap-10 items-start">
                  {/* Year badge */}
                  <div className="flex-shrink-0 w-[72px] text-right">
                    <span className={`inline-block px-2 py-1 rounded-lg bg-gradient-to-r ${accent} text-white font-mono text-xs font-bold`}>
                      {year}
                    </span>
                  </div>
                  {/* Dot */}
                  <div className="hidden md:flex items-center justify-center w-5 h-5 rounded-full bg-card border-2 border-accent flex-shrink-0 mt-0.5" style={{ marginLeft: "-2px" }} />
                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <h3 className="text-foreground font-bold text-base mb-1">{title}</h3>
                    <p className="text-muted-foreground font-serif text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="py-24 px-8 bg-gradient-2">
        <div className="max-w-7xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-xs uppercase tracking-widest mb-6">
            <Users size={12} weight="fill" />
            Leadership
          </span>
          <h2 className="text-foreground font-bold text-3xl md:text-4xl tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
            Core Team
          </h2>
          <p className="text-muted-foreground font-serif text-lg mb-14 max-w-xl">
            Veterans of Goldman Sachs, MIT, Ethereum Foundation, Ubisoft, JLL, and Citadel.
          </p>

          <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map(({ name, role, img, gradient, icon: Icon, social, tags, location }) => (
              <article
                key={name}
                className="team-card group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300 shadow-xl hover:shadow-accent/10 opacity-0"
              >
                <div className="relative h-96 overflow-hidden">
                  <img src={img} alt={name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className={`absolute top-4 right-4 w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                    <Icon size={20} weight="fill" className="text-white" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-foreground font-bold text-xl mb-0.5">{name}</h3>
                  <p className="text-accent font-mono text-xs mb-1">{role}</p>
                  {/* <p className="text-muted-foreground font-mono text-xs flex items-center gap-1 mb-3">
                    <MapPin size={11} weight="fill" />
                    {location}
                  </p> */}

                  {/* <div className="flex flex-wrap gap-1.5 mb-5">
                    {tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground font-mono text-xs">{t}</span>
                    ))}
                  </div> */}

                  <div className="flex gap-2 pt-3 border-t border-border">
                    {social.linkedin && (
                      <a href={social.linkedin} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors duration-200"
                        aria-label={`${name} on LinkedIn`}>
                        <LinkedinLogo size={15} weight="fill" />
                      </a>
                    )}
                    {social.email && (
                      <a href={social.email} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors duration-200"
                        aria-label={`${name} on Email`}>
                        <MailIcon size={15} />
                      </a>
                    )}
                    {/* {social.github && (
                      <a href={social.github} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors duration-200"
                        aria-label={`${name} on GitHub`}>
                        <GithubLogo size={15} weight="fill" />
                      </a>
                    )} */}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Company Culture ── */}
      <section className="py-24 px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 font-mono text-xs uppercase tracking-widest mb-6">
                <Heart size={12} weight="fill" />
                Company Culture
              </span>
              <h2 className="text-foreground font-bold text-3xl md:text-4xl tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
                Life at DeCruiz Labs
              </h2>
              <p className="text-muted-foreground font-serif text-lg max-w-xl">
                Remote-first, async-first, and human-first. We believe great work happens when people feel trusted, energised, and genuinely connected.
              </p>
            </div>
          </div>

          {/* Photo mosaic */}
          <div className="culture-grid grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
            {culturePhotos.map(({ src, alt, caption, span }) => (
              <div
                key={alt}
                className={`culture-photo group relative overflow-hidden rounded-2xl opacity-0 ${span}`}
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover min-h-[160px] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {/* caption */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-sans text-xs font-medium">{caption}</p>
                </div>
                {/* always-visible subtle caption on mobile */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:hidden">
                  <p className="text-white/80 font-sans text-xs">{caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Perks grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {culturePerks.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className={`culture-perk opacity-0 flex items-start gap-4 p-5 rounded-2xl bg-card border ${bg} hover:border-accent/30 transition-all duration-300 group`}
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${bg}`}>
                  <Icon size={20} weight="fill" className={color} />
                </div>
                <div>
                  <h3 className="text-foreground font-bold text-sm mb-1 group-hover:text-accent transition-colors duration-200">{title}</h3>
                  <p className="text-muted-foreground font-sans text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Advisors ── */}
      {/* <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 font-mono text-xs uppercase tracking-widest mb-6">
            <Star size={12} weight="fill" />
            Advisors
          </span>
          <h2 className="text-foreground font-bold text-3xl md:text-4xl tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
            Advisory Board
          </h2>
          <p className="text-muted-foreground font-serif text-lg mb-14 max-w-xl">
            Guided by respected names in Web3, institutional finance, and global policy.
          </p>

          <div className="advisors-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advisors.map(({ name, role, org, img }) => (
              <div key={name} className="advisor-card group text-center p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300 opacity-0">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-accent/40 transition-all duration-300">
                  <img src={img} alt={name} className="w-full h-full object-cover object-top" loading="lazy" />
                </div>
                <h3 className="text-foreground font-bold text-sm mb-1">{name}</h3>
                <p className="text-accent font-mono text-xs mb-2">{role}</p>
                <p className="text-muted-foreground font-sans text-xs leading-relaxed">{org}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── Blockchain Partnerships ── */}
      <section className="py-24 px-8 bg-gradient-2 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono text-xs uppercase tracking-widest mb-6">
            <LinkSimple size={12} weight="fill" />
            Blockchain Partnerships
          </span>
          <h2 className="text-foreground font-bold text-3xl md:text-4xl tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
            Protocol Partners
          </h2>
          <p className="text-muted-foreground font-serif text-lg mb-14 max-w-xl">
            Deep technical integrations with the chains, oracles, and scaling layers that power Web3.
          </p>

          <div className="partners-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blockchainPartners.map(({ name, desc, logo, abbr }) => (
              <div
                key={name}
                className="partner-card opacity-0 group flex items-start gap-4 p-6 rounded-2xl  border border-border hover:border-accent/30 transition-all duration-300"
              >
                  <img
                    src={logo}
                    alt={name}
                    className="h-8 w-auto object-contain"
                  />
                <div>
                  <h3 className="text-foreground font-bold text-sm mb-1 group-hover:text-accent transition-colors duration-200">{name}</h3>
                  <p className="text-muted-foreground font-sans text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
              
            ))}
          </div>
        </div>
      </section>

      {/* ── Ecosystem Alliances ── */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-xs uppercase tracking-widest mb-6">
            <Buildings size={12} weight="fill" />
            Ecosystem Alliances
          </span>
          <h2 className="text-foreground font-bold text-3xl md:text-4xl tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
            Industry Memberships
          </h2>
          <p className="text-muted-foreground font-serif text-lg mb-14 max-w-xl">
            Active members and contributors to the standards bodies shaping the next decade of Web3.
          </p>

          <div className="alliances-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ecosystemAlliances.map(({ name, category, icon: Icon }) => (
              <div
                key={name}
                className="alliance-item opacity-0 flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} weight="fill" className="text-accent" />
                </div>
                <div>
                  <div className="text-foreground font-bold text-sm group-hover:text-accent transition-colors duration-200">{name}</div>
                  <div className="text-muted-foreground font-mono text-xs">{category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="py-24 px-8 bg-gradient-2 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs uppercase tracking-widest mb-6">
            <Trophy size={12} weight="fill" />
            Certifications
          </span>
          <h2 className="text-foreground font-bold text-3xl md:text-4xl tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
            Security &amp; Compliance
          </h2>
          <p className="text-muted-foreground font-serif text-lg mb-14 max-w-xl">
            Enterprise-grade security posture independently verified by the world&#39;s top auditors.
          </p>

          <div className="certs-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map(({ title, desc, icon: Icon, color }) => (
              <div
                key={title}
                className="cert-card opacity-0 group p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon size={22} weight="fill" className="text-white" />
                </div>
                <h3 className="text-foreground font-bold text-base mb-2 group-hover:text-accent transition-colors duration-200">{title}</h3>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 px-8 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-foreground font-bold text-3xl md:text-4xl tracking-tight text-center mb-4">
            How We Work
          </h2>
          <p className="text-muted-foreground font-serif text-lg text-center mb-14 max-w-xl mx-auto">
            Principles that guide every decision from protocol design to community governance.
          </p>

          <div className="values-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="value-card opacity-0 flex items-start gap-4 p-6 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} weight="fill" className="text-accent" />
                </div>
                <div>
                  <h3 className="text-foreground font-bold text-base mb-1">{title}</h3>
                  <p className="text-muted-foreground font-serif text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-8 bg-gradient-2 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-foreground font-bold text-3xl md:text-4xl tracking-tight mb-4">
            Join the Team
          </h2>
          <p className="text-muted-foreground font-serif text-lg mb-8">
            We&#39;re hiring engineers, researchers, and community builders who want to shape Web3&#39;s future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/careers")}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cta-primary text-cta-primary-foreground font-sans font-medium hover:opacity-90 transition-opacity duration-200 cursor-pointer"
            >
              View Open Roles
              <ArrowRight size={16} weight="bold" />
            </button>
            <button
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="px-8 py-3.5 rounded-xl bg-card border border-border text-foreground font-sans font-medium hover:border-accent/40 transition-colors duration-200 cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
