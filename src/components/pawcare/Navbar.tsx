import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggle, t } = useLanguage();

  const navLinks = [
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.doctor"), href: "#doctor" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-card border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon
                points="24,2 44,13 44,35 24,46 4,35 4,13"
                stroke="hsl(var(--secondary))"
                strokeWidth="2.5"
                fill="hsl(var(--secondary-light))"
              />
              <text x="24" y="30" textAnchor="middle" fontSize="18" fill="hsl(var(--primary))">🐾</text>
            </svg>
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold text-gradient leading-none">Vet & Pet Care</div>
            <div className="text-xs font-body text-muted-foreground">{t("nav.subtitle")}</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-foreground/70 hover:text-primary font-body font-medium text-sm transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}

          {/* Language Toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 bg-muted hover:bg-secondary-light text-foreground hover:text-secondary border border-border rounded-full px-3 py-1.5 text-xs font-semibold font-body transition-all duration-200"
            aria-label="Toggle language"
          >
            <span className="text-base leading-none">{lang === "en" ? "🇧🇩" : "🇬🇧"}</span>
            <span>{lang === "en" ? "বাং" : "EN"}</span>
          </button>

          <a
            href="#contact"
            className="bg-gradient-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold shadow-soft hover:shadow-hover transition-all duration-300 hover:scale-105"
          >
            {t("nav.book")}
          </a>
        </div>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Language Toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-1 bg-muted border border-border rounded-full px-2.5 py-1 text-xs font-semibold font-body transition-all duration-200"
            aria-label="Toggle language"
          >
            <span>{lang === "en" ? "🇧🇩" : "🇬🇧"}</span>
            <span className="text-foreground">{lang === "en" ? "বাং" : "EN"}</span>
          </button>

          {/* Hamburger */}
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-card/98 backdrop-blur-md border-t border-border px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-foreground/80 hover:text-primary font-body font-medium text-base transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-gradient-primary text-primary-foreground px-5 py-3 rounded-full text-sm font-semibold text-center shadow-soft"
            onClick={() => setMenuOpen(false)}
          >
            {t("nav.book")}
          </a>
        </div>
      )}
    </nav>
  );
}
