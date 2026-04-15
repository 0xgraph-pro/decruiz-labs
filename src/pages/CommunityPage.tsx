import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Users,
  ChatCircle,
  Star,
  ArrowRight,
  Trophy,
  Globe,
  TwitterLogo,
  GithubLogo,
  DiscordLogo,
  TelegramLogo,
  ArrowLeft,
  Fire,
  ThumbsUp,
  BookmarkSimple,
  ChatTeardropDots,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const channels = [
  {
    icon: DiscordLogo,
    name: "Discord",
    description: "Real-time chat with core devs, validators, and community members. 24/7 support channels.",
    members: "18.4K",
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    border: "border-indigo-400/30",
    href: "#",
  },
  {
    icon: TelegramLogo,
    name: "Telegram",
    description: "Official announcements, governance alerts, and quick ecosystem news.",
    members: "31.2K",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/30",
    href: "#",
  },
  {
    icon: TwitterLogo,
    name: "Twitter / X",
    description: "Follow for protocol updates, ecosystem highlights, and community spotlights.",
    members: "52.7K",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "border-sky-400/30",
    href: "#",
  },
  {
    icon: GithubLogo,
    name: "GitHub",
    description: "Contribute to the open-source protocol, SDKs, and tooling. PRs welcome.",
    members: "4.1K",
    color: "text-gray-300",
    bg: "bg-gray-300/10",
    border: "border-gray-300/30",
    href: "#",
  },
];

const forumCategories = [
  { label: "All", value: "all" },
  { label: "Governance", value: "governance" },
  { label: "Development", value: "development" },
  { label: "Ecosystem", value: "ecosystem" },
  { label: "Support", value: "support" },
];

const threads = [
  {
    category: "governance",
    tag: "Governance",
    tagColor: "bg-purple-400/10 text-purple-400",
    title: "DIP-14: Reduce validator bond requirement to increase decentralisation",
    author: "0xMarcello",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&q=80&auto=format&fit=crop&face",
    time: "2h ago",
    replies: 47,
    likes: 132,
    hot: true,
  },
  {
    category: "development",
    tag: "Development",
    tagColor: "bg-blue-400/10 text-blue-400",
    title: "RFC: Unified Asset Standard v3 — breaking changes and migration path",
    author: "devrel_sam",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&q=80&auto=format&fit=crop&face",
    time: "5h ago",
    replies: 89,
    likes: 210,
    hot: true,
  },
  {
    category: "ecosystem",
    tag: "Ecosystem",
    tagColor: "bg-green-400/10 text-green-400",
    title: "PixelForge integration retrospective — what worked, what didn&#39;t",
    author: "pixelforge_dev",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&q=80&auto=format&fit=crop&face",
    time: "1d ago",
    replies: 24,
    likes: 88,
    hot: false,
  },
  {
    category: "support",
    tag: "Support",
    tagColor: "bg-yellow-400/10 text-yellow-400",
    title: "Testnet cross-chain bridge keeps reverting on Solana side — anyone seen this?",
    author: "builder_kai",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&q=80&auto=format&fit=crop&face",
    time: "3h ago",
    replies: 15,
    likes: 9,
    hot: false,
  },
  {
    category: "governance",
    tag: "Governance",
    tagColor: "bg-purple-400/10 text-purple-400",
    title: "Proposal: Ecosystem grants round 3 — $2M for DeFi integrations",
    author: "treasury_dao",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&q=80&auto=format&fit=crop&face",
    time: "2d ago",
    replies: 61,
    likes: 304,
    hot: true,
  },
  {
    category: "development",
    tag: "Development",
    tagColor: "bg-blue-400/10 text-blue-400",
    title: "Sharing my Rust SDK wrapper for DeCruiz — open source, MIT licensed",
    author: "rustacean_vera",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&q=80&auto=format&fit=crop&face",
    time: "6h ago",
    replies: 33,
    likes: 176,
    hot: false,
  },
];

const leaderboard = [
  { rank: 1, name: "0xMarcello", contributions: 412, badge: "Core Contributor" },
  { rank: 2, name: "devrel_sam", contributions: 387, badge: "Dev Advocate" },
  { rank: 3, name: "rustacean_vera", contributions: 291, badge: "Builder" },
  { rank: 4, name: "treasury_dao", contributions: 244, badge: "Governor" },
  { rank: 5, name: "pixelforge_dev", contributions: 198, badge: "Ecosystem Partner" },
];

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".comm-hero",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
      );
      gsap.fromTo(
        ".comm-channel",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".comm-channels", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".comm-thread",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: ".comm-threads", start: "top 80%" },
        }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const filteredThreads =
    activeFilter === "all"
      ? threads
      : threads.filter((t) => t.category === activeFilter);

  return (
    <div ref={heroRef} className="min-h-screen bg-background text-foreground pt-20">
      {/* Hero */}
      <section className="relative bg-gradient-2 py-24 px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-1/4 w-80 h-80 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-secondary blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto text-center comm-hero relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-mono mb-6">
            <Users size={16} weight="bold" />
            Community Forum
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-sans mb-6 leading-tight">
            Build Together,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary mt-1">
              Govern Together
            </span>
          </h1>
          <p className="text-xl text-muted-foreground font-serif leading-relaxed mb-8">
            Join 100,000+ builders, validators, and Web3 enthusiasts shaping
            the future of decentralised interoperability.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: Globe, label: "100K+ Members" },
              { icon: ChatCircle, label: "5K+ Threads" },
              { icon: Star, label: "Active DAO" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-muted-foreground font-sans text-sm">
                <Icon size={18} className="text-accent" weight="bold" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="py-20 px-8 comm-channels">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold font-sans mb-10 text-center">
            Join the Conversation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {channels.map((ch) => {
              const Icon = ch.icon;
              return (
                <a
                  key={ch.name}
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`comm-channel group p-6 rounded-xl border ${ch.border} bg-card hover:scale-[1.02] transition-all duration-300 block`}
                >
                  <div className={`w-12 h-12 rounded-xl ${ch.bg} flex items-center justify-center mb-4`}>
                    <Icon size={26} className={ch.color} weight="fill" />
                  </div>
                  <h3 className="font-bold font-sans mb-1 group-hover:text-accent transition-colors duration-200">
                    {ch.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed mb-3">
                    {ch.description}
                  </p>
                  <span className={`text-xs font-mono font-bold ${ch.color}`}>
                    {ch.members} members
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Forum Threads */}
      <section className="py-8 px-8 pb-20 comm-threads">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold font-sans">Forum Threads</h2>
            <div className="flex items-center gap-2 flex-wrap">
              {forumCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveFilter(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-sans font-medium transition-all duration-200 ${
                    activeFilter === cat.value
                      ? "bg-accent text-white"
                      : "bg-card border border-border text-muted-foreground hover:border-accent/40 hover:text-accent"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredThreads.map((thread, i) => (
              <div
                key={i}
                className="comm-thread group p-5 rounded-xl bg-card border border-border hover:border-accent/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={thread.avatar}
                    alt={thread.author}
                    className="w-10 h-10 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-mono font-semibold ${thread.tagColor}`}>
                        {thread.tag}
                      </span>
                      {thread.hot && (
                        <span className="flex items-center gap-1 text-xs text-orange-400 font-mono">
                          <Fire size={12} weight="fill" />
                          Hot
                        </span>
                      )}
                    </div>
                    <h3
                      className="font-semibold font-sans text-sm group-hover:text-accent transition-colors duration-200 leading-snug mb-2"
                      dangerouslySetInnerHTML={{ __html: thread.title }}
                    />
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                      <span>@{thread.author}</span>
                      <span>{thread.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono shrink-0">
                    <span className="flex items-center gap-1">
                      <ChatTeardropDots size={14} />
                      {thread.replies}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp size={14} />
                      {thread.likes}
                    </span>
                    <BookmarkSimple
                      size={16}
                      className="hover:text-accent cursor-pointer transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-border text-foreground font-semibold font-sans hover:border-accent/50 hover:text-accent transition-colors duration-200">
              Load More Threads
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-20 px-8 bg-card/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-yellow-400 font-mono text-sm mb-3">
              <Trophy size={18} weight="fill" />
              Top Contributors
            </div>
            <h2 className="text-2xl font-bold font-sans">Community Leaderboard</h2>
          </div>
          <div className="space-y-3">
            {leaderboard.map((member) => (
              <div
                key={member.rank}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <span
                  className={`text-lg font-bold font-mono w-8 text-center ${
                    member.rank === 1
                      ? "text-yellow-400"
                      : member.rank === 2
                      ? "text-gray-300"
                      : member.rank === 3
                      ? "text-amber-600"
                      : "text-muted-foreground"
                  }`}
                >
                  #{member.rank}
                </span>
                <div className="flex-1">
                  <p className="font-semibold font-sans text-sm">{member.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{member.badge}</p>
                </div>
                <span className="text-sm font-mono text-accent font-bold">
                  {member.contributions} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 bg-gradient-2 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold font-sans mb-4">Ready to contribute?</h2>
          <p className="text-muted-foreground font-serif mb-8">
            Every contribution — code, governance vote, or forum reply — strengthens the ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/docs")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-semibold font-sans hover:bg-accent/90 transition-colors duration-200"
            >
              Read the Docs
              <ArrowRight size={18} weight="bold" />
            </button>
            <button
              onClick={() => navigate("/whitepaper")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-border text-foreground font-semibold font-sans hover:border-accent/50 hover:text-accent transition-colors duration-200"
            >
              Read Whitepaper
            </button>
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
