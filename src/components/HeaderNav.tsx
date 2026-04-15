import React, { useState, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  // { label: "About", href: "#vision" },
  { label: "Ecosystem", href: "#ecosystem" },
  // { label: "Technology", href: "/technology", isPage: true },
  { label: "Team", href: "/team", isPage: true },
  { label: "Careers", href: "/careers", isPage: true },
  { label: "Blog", href: "/blog", isPage: true },
  // { label: "Docs", href: "/docs", isPage: true },
  // { label: "Community", href: "/community", isPage: true },
  { label: "Tokenomics", href: "/tokenomics", isPage: true },
  // { label: "Strategy Call", href: "/contact", isPage: true },
  // { label: "Governance", href: "#governance" },
  { label: "Contact", href: "#contact" },
];

export default function HeaderNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = [
        "vision",
        "ecosystem",
        "usecases",
        "testimonials",
        "governance",
        "contact",
      ];
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, isPage?: boolean) => {
    setMobileOpen(false);
    if (isPage) {
      navigate(href);
      return;
    }
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
      return;
    }
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const getSectionForLink = (href: string) => href.replace("#", "");

  const isPageActive = (href: string) => location.pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-8 flex items-center justify-between h-16 lg:h-20"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 cursor-pointer"
          aria-label="DeCruiz Labs - Home"
        >
          <div className="w-8 h-8 rounded-md flex items-center justify-center">
            <img src="/DeCruiz-Logo.png" />
          </div>
          <span className="text-nav-text font-bold text-lg tracking-tight font-sans">
            DeCruiz Labs
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1" role="list">
          {navLinks.map((link) => {
            const isActive = link.isPage
              ? isPageActive(link.href)
              : activeSection === getSectionForLink(link.href);
            return (
              <li key={link.label}>
                <button
                  onClick={() => handleNavClick(link.href, link.isPage)}
                  className={`px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer font-sans ${
                    isActive
                      ? "text-accent bg-accent/10"
                      : "text-nav-text hover:text-accent hover:bg-accent/10"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </button>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => handleNavClick("#contact")}
              className="ml-4 px-5 py-2.5 text-sm font-normal rounded-md bg-cta-primary text-cta-primary-foreground hover:bg-tertiary/80 transition-colors duration-200 cursor-pointer font-sans"
            >
              Get Started
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 text-nav-text hover:text-accent transition-colors duration-200 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? (
            <X size={28} weight="bold" />
          ) : (
            <List size={28} weight="bold" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-primary border-t border-border"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col px-8 py-4 gap-1" role="list">
            {navLinks.map((link) => {
              const isActive = link.isPage
                ? isPageActive(link.href)
                : activeSection === getSectionForLink(link.href);
              return (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href, link.isPage)}
                    className={`w-full text-left px-4 py-3 text-base font-medium rounded-md transition-colors duration-200 cursor-pointer font-sans ${
                      isActive
                        ? "text-accent bg-accent/10"
                        : "text-nav-text hover:text-accent hover:bg-accent/10"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
            <li className="pt-2">
              <button
                onClick={() => handleNavClick("#contact", false)}
                className="w-full px-5 py-3 text-base font-normal rounded-md bg-cta-primary text-cta-primary-foreground hover:bg-tertiary/80 transition-colors duration-200 cursor-pointer font-sans"
              >
                Get Started
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
