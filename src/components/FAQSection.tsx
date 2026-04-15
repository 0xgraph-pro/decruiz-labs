import React, { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What is DeCruiz Labs?",
    answer:
      "DeCruiz Labs is a Web3 interoperability protocol connecting the Gaming, DeFi, and Real Estate industries. We provide a unified SDK and cross-chain infrastructure that allows assets, identity, and value to flow seamlessly between these three verticals.",
  },
  {
    question: "How does the cross-chain interoperability work?",
    answer:
      "Our protocol uses a combination of zk-proof bridges and omnichain messaging to let assets travel between supported blockchains without wrapping or custodial risk. Developers integrate via our SDK and users interact through a single unified wallet interface.",
  },
  {
    question: "Which blockchains are currently supported?",
    answer:
      "We currently support Ethereum, Arbitrum, Polygon, Solana, and Avalanche, with BNB Chain and zkSync Era on the roadmap for Q3 2026. Our architecture is designed to add new chains through community governance proposals.",
  },
  {
    question: "How can I participate in governance?",
    answer:
      "Hold or earn $DCZ tokens to participate in DAO governance. Token holders can submit improvement proposals, vote on protocol upgrades, and influence treasury allocations. Visit the Governance section for more details on how to get started.",
  },
  {
    question: "Is DeCruiz Labs open source?",
    answer:
      "Yes. Our core protocol contracts, SDK, and bridge infrastructure are fully open source and audited. You can explore the repositories on our GitHub, contribute to development, and report issues via our community forum.",
  },
  {
    question: "How are developers onboarded?",
    answer:
      "Developers can integrate DeCruiz Labs in minutes using our TypeScript SDK. Our documentation covers everything from basic wallet connection to complex cross-chain asset transfers. We also offer dedicated technical support and a developer grants program.",
  },
  {
    question: "What makes DeCruiz Labs different from other interoperability protocols?",
    answer:
      "Most interoperability solutions are generic bridges. DeCruiz Labs is purpose-built for three high-value industries — Gaming, DeFi, and Real Estate — with domain-specific primitives like in-game asset portability, yield-bearing real-world asset tokens, and DAO-governed liquidity pools designed for each vertical.",
  },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    if (open) {
      gsap.fromTo(
        bodyRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    } else {
      gsap.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.25, ease: "power2.in" });
    }
  }, [open]);

  return (
    <div
      className={`border border-border rounded-lg overflow-hidden transition-colors duration-200 ${open ? "bg-card" : "bg-card/50 hover:bg-card"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span className="text-foreground font-sans font-medium text-base leading-snug group-hover:text-accent transition-colors duration-200">
          <span className="text-accent font-mono text-sm mr-3 opacity-60">
            {String(index + 1).padStart(2, "0")}
          </span>
          {question}
        </span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-accent">
          {open ? <Minus size={16} weight="bold" /> : <Plus size={16} weight="bold" />}
        </span>
      </button>
      <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <p className="px-6 pb-5 text-muted-foreground font-sans text-sm leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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
        ".faq-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.08,
          scrollTrigger: { trigger: listRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="bg-neutral py-24 px-8"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto">
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="text-foreground font-bold font-sans text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-4"
            style={{ letterSpacing: "-0.025em", lineHeight: "1.2" }}
          >
            Frequently Asked{" "}
            <span className="bg-gradient-1 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-muted-foreground font-serif text-lg">
            Everything you need to know about DeCruiz Labs and our protocol.
          </p>
        </div>

        <div ref={listRef} className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item opacity-0">
              <FAQItem question={faq.question} answer={faq.answer} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
