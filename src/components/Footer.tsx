import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LinkedinLogo,
  TwitterLogo,
  GithubLogo,
  Star,
  TelegramLogoIcon,
} from "@phosphor-icons/react";
import { MailIcon } from "lucide-react";

const footerNav = [
  { label: "About", href: "#vision" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Community", href: "#governance" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: LinkedinLogo, label: "LinkedIn", href: "https://linkedin.com/company/decruiz-labs-group" },
  { icon: MailIcon, label: "Mail", href: "mailto:support@decruizlabs.com" },
  { icon: TelegramLogoIcon, label: "Telegram", href: "https://t.me/decruizlabs" },
  // { icon: GithubLogo, label: "GitHub", href: "https://github.com/decruiz-labs" },
];

const footerSections = [
  {
    title: "Navigation",
    links: footerNav,
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#vision" },
      { label: "Blog", href: "/blog" },
      // { label: "Press", href: "#" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      // { label: "Documentation", href: "/docs" },
      { label: "Whitepaper", href: "/whitepaper" },
      { label: "GitHub", href: "https://github.com/decruiz-labs" },
      // { label: "Community Forum", href: "/community" },
    ],
  },
];

function FooterAccordion({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (href: string) => {
    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (href.startsWith("/")) {
      location.href = href;
    } else {
      window.open(href, "_blank", "noopener noreferrer");
    }
  };

  return (
    <div className="border-b border-border md:border-none">
      <button
        className="w-full flex items-center justify-between py-4 md:py-0 text-foreground font-bold font-sans text-sm uppercase tracking-widest cursor-pointer md:cursor-default"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {title}
        <Star
          size={18}
          weight="bold"
          className={`md:hidden transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <ul
        className={`space-y-3 pb-4 md:pb-0 md:mt-4 ${open ? "block" : "hidden md:block"}`}
      >
        {links.map((link) => (
          <li key={link.label}>
            <button
              onClick={() => handleClick(link.href)}
              className="text-muted-foreground hover:text-accent transition-colors duration-200 font-sans text-sm cursor-pointer text-left"
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/DeCruiz-Logo.png" className="w-8"/>
              <span className="text-foreground font-bold text-lg tracking-tight font-sans">
                DeCruiz Labs
              </span>
            </div>
            <p className="text-muted-foreground font-serif text-sm leading-relaxed mb-6">
              Building Web3 interoperability across gaming, DeFi, and real
              estate — one unified ecosystem at a time.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-md bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors duration-200 cursor-pointer"
                  aria-label={label}
                >
                  <Icon size={18} weight="fill" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Sections */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8">
            {footerSections.map((section) => (
              <FooterAccordion
                key={section.title}
                title={section.title}
                links={section.links}
              />
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground font-sans text-xs">
            &copy; {new Date().getFullYear()} DeCruiz Labs. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="text-muted-foreground hover:text-accent font-sans text-xs transition-colors duration-200 cursor-pointer">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-muted-foreground hover:text-accent font-sans text-xs transition-colors duration-200 cursor-pointer">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
