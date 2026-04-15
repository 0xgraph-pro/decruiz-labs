import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import {
  BookOpen,
  Code,
  Cube,
  ArrowRight,
  MagnifyingGlass,
  Terminal,
  GitBranch,
  Shield,
  Wallet,
  Lightning,
  ArrowLeft,
  CaretRight,
} from "@phosphor-icons/react";

const categories = [
  {
    id: "getting-started",
    icon: Lightning,
    label: "Getting Started",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    articles: [
      "Introduction to DeCruiz",
      "Quick Start Guide",
      "Install the SDK",
      "Your First Transaction",
      "Testnet Setup",
    ],
  },
  {
    id: "protocol",
    icon: GitBranch,
    label: "Protocol",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    articles: [
      "Architecture Overview",
      "Cross-Chain Messaging",
      "Consensus Mechanism",
      "Finality & Security",
      "Fee Model",
    ],
  },
  {
    id: "sdk",
    icon: Code,
    label: "SDK Reference",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    articles: [
      "JavaScript / TypeScript SDK",
      "Python SDK",
      "Rust SDK",
      "REST API Reference",
      "WebSocket API",
    ],
  },
  {
    id: "smart-contracts",
    icon: Cube,
    label: "Smart Contracts",
    color: "text-green-400",
    bg: "bg-green-400/10",
    articles: [
      "Contract Standards",
      "Deploying Contracts",
      "Unified Asset Standard",
      "Governance Contracts",
      "Security Model",
    ],
  },
  {
    id: "security",
    icon: Shield,
    label: "Security",
    color: "text-red-400",
    bg: "bg-red-400/10",
    articles: [
      "Audit Reports",
      "Bug Bounty Program",
      "Key Management",
      "Validator Security",
      "Incident Response",
    ],
  },
  {
    id: "integrations",
    icon: Wallet,
    label: "Integrations",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    articles: [
      "Ethereum Integration",
      "Solana Integration",
      "Cosmos Integration",
      "EVM Compatibility",
      "Wallet Connect",
    ],
  },
];

const codeSnippet = `import { DeCruizClient } from '@decruiz/sdk';

// Initialize with your chain config
const client = new DeCruizClient({
  network: 'mainnet',
  apiKey: process.env.DECRUIZ_API_KEY,
});

// Send a cross-chain transaction
const tx = await client.transfer({
  from: { chain: 'ethereum', address: '0x...' },
  to:   { chain: 'solana',   address: 'So1...' },
  asset: 'USDC',
  amount: '100',
});

console.log('TX Hash:', tx.hash);`;

export default function DocsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".docs-hero-content",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        ".docs-cat-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const activeData = categories.find((c) => c.id === activeCategory)!;
  const filteredCategories = categories.filter(
    (c) =>
      search === "" ||
      c.label.toLowerCase().includes(search.toLowerCase()) ||
      c.articles.some((a) => a.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative bg-gradient-2 py-20 px-8 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-80 h-80 rounded-full bg-blue-400 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto text-center docs-hero-content relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-400/10 border border-blue-400/30 text-blue-400 text-sm font-mono mb-6">
            <BookOpen size={16} weight="bold" />
            Developer Documentation
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-sans mb-6">
            Build on
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-accent mt-1">
              DeCruiz Protocol
            </span>
          </h1>
          <p className="text-xl text-muted-foreground font-serif leading-relaxed mb-10">
            Everything you need to integrate, deploy, and scale with the DeCruiz
            interoperability layer.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <MagnifyingGlass
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search documentation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-card border border-border text-foreground placeholder-muted-foreground font-sans focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Quick Start Code */}
      <section className="py-14 px-8 bg-card/20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-accent text-sm font-mono mb-3">
                <Terminal size={16} />
                Quick Start
              </div>
              <h2 className="text-2xl font-bold font-sans mb-3">
                Up and running in minutes
              </h2>
              <p className="text-muted-foreground font-serif leading-relaxed mb-6">
                Install the SDK, configure your keys, and send your first
                cross-chain transaction with just a few lines of code.
              </p>
              <button className="inline-flex items-center gap-2 text-accent font-semibold font-sans hover:gap-3 transition-all duration-200">
                Read the Quick Start Guide
                <ArrowRight size={16} weight="bold" />
              </button>
            </div>
            <div className="flex-1 w-full">
              <div className="rounded-xl overflow-hidden border border-border bg-gray-950">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">
                    transfer.ts
                  </span>
                </div>
                <pre className="p-4 text-xs font-mono text-green-400 leading-relaxed overflow-x-auto whitespace-pre">
                  {codeSnippet}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold font-sans mb-10 text-center">
            Browse Documentation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {filteredCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`docs-cat-card group p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "border-accent/60 bg-accent/5"
                      : "border-border bg-card hover:border-accent/30"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${cat.bg} flex items-center justify-center mb-4`}
                  >
                    <Icon size={22} className={cat.color} weight="bold" />
                  </div>
                  <h3 className="font-bold font-sans mb-1 group-hover:text-accent transition-colors duration-200">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    {cat.articles.length} articles
                  </p>
                </div>
              );
            })}
          </div>

          {/* Article List for Active Category */}
          {activeData && (
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-8 h-8 rounded-lg ${activeData.bg} flex items-center justify-center`}
                >
                  <activeData.icon
                    size={18}
                    className={activeData.color}
                    weight="bold"
                  />
                </div>
                <h3 className="text-lg font-bold font-sans">
                  {activeData.label}
                </h3>
              </div>
              <ul className="space-y-1">
                {activeData.articles.map((article) => (
                  <li key={article}>
                    <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-accent/5 hover:text-accent transition-colors duration-200 font-sans text-sm text-left group">
                      <span>{article}</span>
                      <CaretRight
                        size={14}
                        className="text-muted-foreground group-hover:text-accent transition-colors duration-200"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 px-8 bg-gradient-2 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold font-sans mb-3">
            Can&#39;t find what you need?
          </h2>
          <p className="text-muted-foreground font-serif mb-8">
            Ask the community or open an issue on GitHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/community")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-semibold font-sans hover:bg-accent/90 transition-colors duration-200"
            >
              Go to Community Forum
              <ArrowRight size={18} weight="bold" />
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-border text-foreground font-semibold font-sans hover:border-accent/50 hover:text-accent transition-colors duration-200"
            >
              Open GitHub Issue
            </a>
          </div>
        </div>
      </section>

      <div className="px-8 py-6 max-w-5xl mx-auto">
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
