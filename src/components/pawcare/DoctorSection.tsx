import drFoysal from "@/assets/dr-foysal.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DoctorSection() {
  const { t } = useLanguage();

  const credentials = [
    { icon: "🎓", key: "doc.c1" },
    { icon: "🏅", key: "doc.c2" },
    { icon: "🪪", key: "doc.c3" },
    { icon: "🐾", key: "doc.c4" },
  ];

  return (
    <section id="doctor" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-secondary-light text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {t("doc.badge")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("doc.title1")} <span className="text-gradient">{t("doc.title2")}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          {/* Photo */}
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl" />
              <img
                src={drFoysal}
                alt="Dr. Foysal Kabir"
                className="relative w-80 h-96 object-cover object-top rounded-3xl shadow-hover"
              />
              <div className="absolute -bottom-4 -right-4 bg-card rounded-2xl px-5 py-3 shadow-hover border border-border">
                <div className="text-xs text-muted-foreground font-body">BVC Reg. No.</div>
                <div className="font-display text-lg font-bold text-primary">9774</div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t("doc.name")}
            </h3>
            <p className="text-secondary font-body font-semibold text-base mb-6">
              {t("doc.role")}
            </p>

            <div className="space-y-3 mb-8">
              {credentials.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <p className="text-foreground/80 font-body text-sm leading-relaxed">{t(item.key)}</p>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-8">
              {t("doc.about")}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/8801750656002"
                target="_blank"
                rel="noreferrer"
                className="bg-gradient-secondary text-secondary-foreground px-6 py-3 rounded-full font-semibold text-sm shadow-soft hover:shadow-hover hover:scale-105 transition-all duration-300"
              >
                {t("doc.wa")}
              </a>
              <a
                href="#contact"
                className="bg-primary-light text-primary px-6 py-3 rounded-full font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                {t("doc.book")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
