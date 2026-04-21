import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scales } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using the DeCruiz Labs platform, website, applications, smart contracts, or any related services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, you may not access or use the Services.

These Terms apply to all visitors, users, and others who access or use the Services. By using the Services, you represent that you are at least 18 years of age and have the legal capacity to enter into a binding agreement.`,
  },
  {
    title: "2. Description of Services",
    content: `DeCruiz Labs provides a Web3 infrastructure platform enabling digital asset management, decentralised finance, gaming economies, real-world asset tokenization, DAO governance, and related Web3 services. Our Services include:

• Smart contract deployment and interaction tools.
• Token creation, management, and distribution infrastructure.
• Decentralised exchange (DEX) and liquidity management features.
• NFT minting, marketplace, and interoperability tooling.
• DAO governance and treasury management modules.
• Identity and wallet infrastructure.

We reserve the right to modify, suspend, or discontinue any part of the Services at any time without prior notice.`,
  },
  {
    title: "3. User Accounts & Wallets",
    content: `To access certain features, you may need to connect a compatible Web3 wallet or create an account. You are solely responsible for:

• Maintaining the security and confidentiality of your wallet private keys and seed phrases. DeCruiz Labs will never ask for your private keys.
• All activities that occur under your wallet address or account.
• Ensuring your wallet is compatible with the supported networks.

You agree to notify us immediately at security@decruizlabs.com if you become aware of any unauthorised use of your account. We are not liable for any loss resulting from unauthorised access due to your failure to safeguard your credentials.`,
  },
  {
    title: "4. Prohibited Activities",
    content: `You agree not to engage in any of the following:

• **Illegal activity**: using the Services for any unlawful purpose or in violation of applicable laws and regulations, including anti-money-laundering (AML) and know-your-customer (KYC) requirements.
• **Market manipulation**: wash trading, spoofing, front-running, or any other form of market manipulation.
• **Exploitation**: exploiting bugs, vulnerabilities, or loopholes in smart contracts or platform infrastructure for personal gain.
• **Unauthorised access**: attempting to gain unauthorised access to our systems, other users' accounts, or connected infrastructure.
• **Harmful content**: uploading or transmitting malicious code, spam, or content that infringes third-party intellectual property rights.
• **Sanctions violations**: using the Services if you are located in, or a national of, a sanctioned country or territory, or are on any government sanctions list.`,
  },
  {
    title: "5. Intellectual Property",
    content: `All content, software, smart contract code (excluding open-source components), designs, graphics, and trademarks on the DeCruiz Labs platform are the exclusive property of DeCruiz Labs or its licensors and are protected by applicable intellectual property laws.

You are granted a limited, non-exclusive, non-transferable, revocable licence to access and use the Services for their intended purpose. You may not copy, modify, distribute, sell, or lease any part of our Services or included software, nor may you reverse-engineer or attempt to extract source code without our prior written consent.

Open-source components are governed by their respective licences, which are listed in our GitHub repository.`,
  },
  {
    title: "6. Fees & Payments",
    content: `Certain Services may require payment of fees. All fees are disclosed prior to transaction execution and are non-refundable unless otherwise stated. You are also responsible for all network gas fees associated with on-chain transactions.

DeCruiz Labs reserves the right to introduce, modify, or waive fees at any time. Changes to fee structures will be communicated with reasonable advance notice through official channels.

Cryptocurrency transactions are irreversible. You are solely responsible for verifying the accuracy of any transaction before confirming it.`,
  },
  {
    title: "7. Risk Disclosure",
    content: `Digital assets and blockchain-based services carry significant risks. By using our Services, you acknowledge and accept that:

• The value of digital assets is highly volatile and may decline to zero.
• Smart contracts may contain bugs or vulnerabilities despite audits.
• Regulatory environments for digital assets are evolving and may adversely affect the Services.
• Transactions on public blockchains are permanent and irreversible.
• Past performance of any digital asset or protocol is not indicative of future results.

You should only interact with the platform with funds you can afford to lose. Nothing on our platform constitutes financial, investment, or legal advice.`,
  },
  {
    title: "8. Disclaimers & Limitation of Liability",
    content: `THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.

TO THE MAXIMUM EXTENT PERMITTED BY LAW, DECRUIZ LABS AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICES.

OUR TOTAL CUMULATIVE LIABILITY TO YOU FOR ANY CLAIMS RELATING TO THE SERVICES SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID TO US IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR (B) USD $100.`,
  },
  {
    title: "9. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless DeCruiz Labs and its affiliates, directors, officers, employees, contractors, and licensors from and against any claims, liabilities, damages, judgements, awards, losses, costs, and expenses (including reasonable legal fees) arising out of or relating to:

• Your violation of these Terms.
• Your use or misuse of the Services.
• Your violation of any third-party rights, including intellectual property or privacy rights.
• Any content you submit, post, or transmit through the Services.`,
  },
  {
    title: "10. Governing Law & Dispute Resolution",
    content: `These Terms shall be governed by and construed in accordance with the laws of the British Virgin Islands, without regard to its conflict of law principles.

Any dispute arising out of or relating to these Terms or the Services shall first be subject to good-faith negotiation for 30 days. If unresolved, disputes shall be finally settled by binding arbitration administered under internationally recognised arbitration rules, with proceedings conducted in English.

Nothing in this section prevents either party from seeking injunctive or other equitable relief from a court of competent jurisdiction to prevent irreparable harm.`,
  },
  {
    title: "11. Modifications to Terms",
    content: `We reserve the right to modify these Terms at any time. We will provide notice of material changes by updating the "Last updated" date at the top of this page and, where appropriate, by notifying registered users via email. Your continued use of the Services following any modifications constitutes your acceptance of the revised Terms.

If you do not agree to the modified Terms, you must discontinue your use of the Services.`,
  },
  {
    title: "12. Termination",
    content: `We may suspend or terminate your access to the Services at our sole discretion, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, third parties, or for any other reason.

Upon termination, your right to use the Services ceases immediately. Provisions that by their nature should survive termination — including ownership provisions, warranty disclaimers, indemnity, and limitations of liability — shall remain in full force.`,
  },
];

export default function TermsOfServicePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
      );
      gsap.fromTo(
        ".tos-section",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative py-24 px-8 overflow-hidden bg-gradient-2"
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, #0ea5e9 0%, transparent 70%)" }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono tracking-widest uppercase mb-6">
            <Scales size={14} weight="fill" />
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-sans mb-4 text-foreground">
            Terms of Service
          </h1>
          <p className="text-muted-foreground font-serif text-lg max-w-2xl mx-auto">
            Please read these terms carefully before using the DeCruiz Labs platform or any of our services.
          </p>
          <p className="text-muted-foreground/60 font-mono text-xs mt-6">
            Effective date: January 1, 2025 &nbsp;·&nbsp; Last updated: April 1, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="max-w-4xl mx-auto px-8 py-16">
        {/* Quick summary banner */}
        <div className="mb-10 rounded-2xl bg-primary/10 border border-primary/20 p-6">
          <p className="text-sm font-sans text-muted-foreground leading-relaxed">
            <span className="text-foreground font-semibold">TL;DR — </span>
            Use our platform lawfully, keep your private keys secure, understand the risks of digital assets, and don&#39;t do anything harmful or illegal. We&#39;re not liable for volatile markets or smart-contract bugs. If you have questions, reach out — we&#39;re here to help.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((sec) => (
            <div key={sec.title} className="tos-section bg-card border border-border rounded-2xl p-8">
              <h2 className="text-xl font-bold font-sans text-foreground mb-4">{sec.title}</h2>
              <div className="text-muted-foreground font-serif text-sm leading-relaxed">
                {sec.content.split("\n").map((line, i) => {
                  if (line.startsWith("• **")) {
                    const match = line.match(/^• \*\*(.+?)\*\*:(.*)$/);
                    if (match) {
                      return (
                        <p key={i} className="mb-2 pl-4 border-l-2 border-accent/30">
                          <span className="text-foreground font-semibold">{match[1]}:</span>
                          {match[2]}
                        </p>
                      );
                    }
                  }
                  if (line.startsWith("• ")) {
                    return (
                      <p key={i} className="mb-2 pl-4 before:content-['–'] before:mr-2 before:text-accent/60">
                        {line.replace("• ", "")}
                      </p>
                    );
                  }
                  return line ? <p key={i} className="mb-3">{line}</p> : <br key={i} />;
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact callout */}
        <div className="mt-12 rounded-2xl bg-accent/10 border border-accent/20 p-8 text-center">
          <h3 className="text-lg font-bold font-sans text-foreground mb-2">Have a legal question?</h3>
          <p className="text-muted-foreground font-serif text-sm mb-4">
            Contact our legal team at{" "}
            <a href="mailto:legal@decruizlabs.com" className="text-accent underline underline-offset-2">
              legal@decruizlabs.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
