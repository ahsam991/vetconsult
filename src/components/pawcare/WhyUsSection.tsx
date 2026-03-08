import { useLanguage } from "@/contexts/LanguageContext";

export default function WhyUsSection() {
  const { t } = useLanguage();

  const reasons = [
    { icon: "🏥", titleKey: "why.r1.title", descKey: "why.r1.desc" },
    { icon: "🎓", titleKey: "why.r2.title", descKey: "why.r2.desc" },
    { icon: "🪪", titleKey: "why.r3.title", descKey: "why.r3.desc" },
    { icon: "💻", titleKey: "why.r4.title", descKey: "why.r4.desc" },
    { icon: "🐕🐈", titleKey: "why.r5.title", descKey: "why.r5.desc" },
    { icon: "💊", titleKey: "why.r6.title", descKey: "why.r6.desc" },
  ];

  return (
    <section id="about" className="section-padding bg-muted">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="inline-block bg-secondary-light text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              {t("why.badge")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t("why.title1")}{" "}
              <span className="text-gradient">{t("why.title2")}</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg font-body leading-relaxed mb-6">
              {t("why.p1")}
            </p>
            <p className="text-muted-foreground text-base font-body leading-relaxed mb-8">
              {t("why.p2")}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-gradient-secondary text-secondary-foreground px-8 py-4 rounded-full font-semibold shadow-soft hover:shadow-hover hover:scale-105 transition-all duration-300"
              >
                {t("why.cta1")}
              </a>
              <a
                href="https://wa.me/8801750656002"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-card text-foreground border border-border px-8 py-4 rounded-full font-semibold hover:shadow-soft transition-all duration-300"
              >
                {t("why.cta2")}
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl p-5 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="text-3xl mb-3">{reason.icon}</div>
                <h3 className="font-display text-base font-bold text-card-foreground mb-2">
                  {t(reason.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">
                  {t(reason.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
