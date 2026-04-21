import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This includes:

• **Personal identifiers**: name, email address, wallet address, and similar details.
• **Usage data**: pages visited, features used, time spent, and referring URLs.
• **Device & technical data**: IP address, browser type, operating system, and device identifiers.
• **Transaction data**: on-chain interactions, token activity, and governance participation records that are publicly available on the blockchain.

We do not sell, rent, or trade your personal information to third parties for their marketing purposes.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `DeCruiz Labs uses collected information to:

• Provide, maintain, and improve our platform and services.
• Send transactional and service-related communications (e.g. security alerts, product updates).
• Analyse usage patterns to enhance user experience and feature development.
• Comply with legal obligations and enforce our Terms of Service.
• Detect, investigate, and prevent fraudulent transactions or other illegal activities.

We process your data on the legal bases of contractual necessity, legitimate interests, and — where required — your explicit consent.`,
  },
  {
    title: "3. Sharing & Disclosure",
    content: `We may share your information with:

• **Service providers**: third-party vendors who help us operate our platform (hosting, analytics, customer support) under strict data-processing agreements.
• **Business transfers**: in the event of a merger, acquisition, or sale of assets, your data may transfer to the successor entity.
• **Legal requirements**: when required by law, court order, or governmental authority, or to protect the rights, property, or safety of DeCruiz Labs, our users, or the public.
• **With your consent**: for any other purpose with your explicit agreement.

We do not share wallet addresses or on-chain activity beyond what is already publicly visible on-chain.`,
  },
  {
    title: "4. Cookies & Tracking Technologies",
    content: `We use cookies, pixel tags, and similar tracking technologies to:

• Remember your preferences and session state.
• Understand how visitors interact with our website.
• Measure the effectiveness of our marketing campaigns.

You can control cookies through your browser settings. Disabling certain cookies may affect platform functionality. We honour browser-level Do Not Track signals where technically feasible.`,
  },
  {
    title: "5. Data Retention",
    content: `We retain personal data for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Specifically:

• Account data is retained while your account is active and for up to 3 years after account closure for legal compliance.
• Analytics data is retained in aggregated, anonymised form indefinitely.
• Communication records are retained for up to 2 years.

You may request deletion of your data at any time (see Section 7 — Your Rights).`,
  },
  {
    title: "6. Security",
    content: `We employ industry-standard technical and organisational measures to protect your information, including:

• TLS encryption for data in transit.
• AES-256 encryption for sensitive data at rest.
• Multi-factor authentication for internal system access.
• Regular security audits and penetration testing.

No method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to promptly addressing any breaches.`,
  },
  {
    title: "7. Your Rights",
    content: `Depending on your jurisdiction, you may have the following rights regarding your personal data:

• **Access**: request a copy of the personal data we hold about you.
• **Rectification**: ask us to correct inaccurate or incomplete data.
• **Erasure**: request deletion of your personal data ("right to be forgotten").
• **Portability**: receive your data in a structured, machine-readable format.
• **Objection**: object to processing based on legitimate interests.
• **Restriction**: ask us to restrict processing in certain circumstances.

To exercise any of these rights, contact us at privacy@decruizlabs.com. We will respond within 30 days.`,
  },
  {
    title: "8. International Transfers",
    content: `DeCruiz Labs operates globally and may transfer your information to countries outside your own, including countries that may not provide the same level of data protection as your home country. Where we transfer data internationally, we rely on approved transfer mechanisms such as Standard Contractual Clauses or adequacy decisions recognised by relevant authorities.`,
  },
  {
    title: "9. Children's Privacy",
    content: `Our platform is not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will delete it promptly. If you believe we may have collected data from a child, please contact us immediately.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on this page with a revised effective date, and — where appropriate — by emailing registered users. Your continued use of our services after any changes constitutes your acceptance of the updated policy.`,
  },
];

export default function PrivacyPolicyPage() {
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
        ".pp-section",
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
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, #7c3aed 0%, transparent 70%)" }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono tracking-widest uppercase mb-6">
            <Shield size={14} weight="fill" />
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-sans mb-4 text-foreground">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground font-serif text-lg max-w-2xl mx-auto">
            Your privacy matters to us. This policy explains how DeCruiz Labs collects, uses, and protects your information.
          </p>
          <p className="text-muted-foreground/60 font-mono text-xs mt-6">
            Effective date: January 1, 2025 &nbsp;·&nbsp; Last updated: April 1, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="max-w-4xl mx-auto px-8 py-16">
        <div className="space-y-10">
          {sections.map((sec) => (
            <div key={sec.title} className="pp-section bg-card border border-border rounded-2xl p-8">
              <h2 className="text-xl font-bold font-sans text-foreground mb-4">{sec.title}</h2>
              <div className="text-muted-foreground font-serif text-sm leading-relaxed whitespace-pre-line">
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
          <h3 className="text-lg font-bold font-sans text-foreground mb-2">Questions about this policy?</h3>
          <p className="text-muted-foreground font-serif text-sm mb-4">
            Contact our Data Protection Officer at{" "}
            <a href="mailto:privacy@decruizlabs.com" className="text-accent underline underline-offset-2">
              privacy@decruizlabs.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
