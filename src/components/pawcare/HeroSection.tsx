import heroVet from "@/assets/hero-vet.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroVet} alt="Vet & Pet Care Clinic" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/85 via-dark/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />
      </div>

      {/* Floating decorative blobs */}
      <div className="absolute top-32 right-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-24 right-16 w-48 h-48 rounded-full bg-secondary/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative container mx-auto px-6 pt-28 pb-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 text-white rounded-full px-4 py-1.5 text-sm font-medium mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            {t("hero.badge")}
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            {t("hero.title")}
          </h1>
          <p className="text-white/90 text-xl md:text-2xl font-body font-light mb-2 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <span className="font-semibold">{t("doc.name")}</span>
          </p>
          <p className="text-white/70 text-sm md:text-base font-body mb-2 animate-fade-up" style={{ animationDelay: "0.18s" }}>
            {t("hero.degree")}
          </p>
          <p className="text-secondary text-sm font-body font-semibold mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {t("hero.role")}
          </p>

          <p className="text-white/75 text-base md:text-lg font-body font-light leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: "0.25s" }}>
            {t("hero.desc")}
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <a
              href="#contact"
              className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-full text-base font-semibold shadow-hover hover:scale-105 transition-all duration-300"
            >
              {t("hero.book")}
            </a>
            <a
              href="https://wa.me/8801750656002"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full text-base font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
            >
              {t("hero.whatsapp")}
            </a>
          </div>

          <div className="flex flex-wrap gap-6 mt-12 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: "🕐", label: t("hero.open") },
              { icon: "📍", label: t("hero.location") },
              { icon: "🏥", label: t("hero.surgery") },
              { icon: "💻", label: t("hero.online") },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-white/80 text-sm font-body">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,80 L0,40 C360,80 1080,0 1440,40 L1440,80 Z" fill="hsl(38, 100%, 98%)" />
        </svg>
      </div>
    </section>
  );
}
