import { useLanguage } from "@/contexts/LanguageContext";

export default function TestimonialsSection() {
  const { t } = useLanguage();

  const testimonials = [
    { nameKey: "t1.name", petKey: "t1.pet", textKey: "t1.text", avatar: "🐕", rating: 5 },
    { nameKey: "t2.name", petKey: "t2.pet", textKey: "t2.text", avatar: "🐈", rating: 5 },
    { nameKey: "t3.name", petKey: "t3.pet", textKey: "t3.text", avatar: "🐕‍🦺", rating: 5 },
    { nameKey: "t4.name", petKey: "t4.pet", textKey: "t4.text", avatar: "🐱", rating: 5 },
    { nameKey: "t5.name", petKey: "t5.pet", textKey: "t5.text", avatar: "🐶", rating: 5 },
    { nameKey: "t6.name", petKey: "t6.pet", textKey: "t6.text", avatar: "🦜", rating: 5 },
  ];

  return (
    <section id="testimonials" className="section-padding bg-background overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-primary-light text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {t("test.badge")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("test.title1")} <span className="text-gradient">{t("test.title2")}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-body">
            {t("test.desc")}
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="break-inside-avoid bg-card rounded-3xl p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-0.5 mb-6"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, s) => (
                  <span key={s} className="text-primary text-base">★</span>
                ))}
              </div>
              <p className="text-card-foreground font-body text-sm leading-relaxed mb-5 italic">
                "{t(testimonial.textKey)}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-display font-bold text-card-foreground text-sm">{t(testimonial.nameKey)}</div>
                  <div className="text-muted-foreground text-xs font-body">{t(testimonial.petKey)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
