import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactSection() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    petName: "",
    petType: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactDetails = [
    {
      icon: "📍",
      labelKey: "contact.addr.label",
      value: t("contact.addr.value"),
      href: "https://maps.google.com/?q=10/7+Block-A+Iqbal+Road+Mohammadpur+Dhaka",
    },
    { icon: "📞", labelKey: "contact.phone.label", value: "+88 01750-656002", href: "tel:+8801750656002" },
    { icon: "📞", labelKey: "contact.alt.label", value: "+88 01637-888667", href: "tel:+8801637888667" },
    { icon: "💬", labelKey: "contact.wa.label", value: "+880 1750-656002", href: "https://wa.me/8801750656002" },
    { icon: "✉️", labelKey: "contact.email.label", value: "drfoysalkabir@gmail.com", href: "mailto:drfoysalkabir@gmail.com" },
    { icon: "🕐", labelKey: "contact.hours.label", value: t("contact.hours.value"), href: null },
  ];

  return (
    <section id="contact" className="section-padding bg-muted">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          {/* Left info */}
          <div>
            <span className="inline-block bg-primary-light text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              {t("contact.badge")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t("contact.title1")} <span className="text-gradient">{t("contact.title2")}</span>
            </h2>
            <p className="text-muted-foreground text-base font-body leading-relaxed mb-8">
              {t("contact.desc")}
            </p>

            <div className="space-y-5">
              {contactDetails.map((info) => (
                <div key={info.labelKey} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-lg flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <div className="font-body font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                      {t(info.labelKey)}
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="font-body text-sm text-foreground hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="font-body text-sm text-foreground">{info.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-card rounded-2xl shadow-soft border border-border flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary-light rounded-xl flex items-center justify-center text-2xl">📘</div>
              <div>
                <div className="font-body font-semibold text-sm text-foreground">{t("contact.fb")}</div>
                <a
                  href="https://www.facebook.com/p/Vet-Consult-61575839930213/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-primary hover:underline font-body"
                >
                  Vet Consult — @VetConsult
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-card rounded-3xl p-8 shadow-card">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🐾</div>
                <h3 className="font-display text-2xl font-bold text-card-foreground mb-2">
                  {t("form.success.title")}
                </h3>
                <p className="text-muted-foreground font-body text-sm mb-6">
                  {t("form.success.desc").replace("{name}", form.name)}
                </p>
                <p className="text-sm text-muted-foreground font-body">
                  {t("form.success.urgent")}<br />
                  <a href="tel:+8801750656002" className="text-primary font-semibold">+88 01750-656002</a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-xl font-bold text-card-foreground mb-2">
                  {t("form.title")}
                </h3>
                <p className="text-muted-foreground text-xs font-body mb-4">
                  {t("form.desc")}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 font-body">{t("form.name")}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={t("form.name.ph")}
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 font-body">{t("form.phone")}</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder={t("form.phone.ph")}
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 font-body">{t("form.petname")}</label>
                    <input
                      type="text"
                      name="petName"
                      placeholder={t("form.petname.ph")}
                      value={form.petName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 font-body">{t("form.pettype")}</label>
                    <select
                      name="petType"
                      value={form.petType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    >
                      <option value="">{t("form.pettype.ph")}</option>
                      <option value="dog">{t("opt.dog")}</option>
                      <option value="cat">{t("opt.cat")}</option>
                      <option value="bird">{t("opt.bird")}</option>
                      <option value="rabbit">{t("opt.rabbit")}</option>
                      <option value="other">{t("opt.other")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 font-body">{t("form.service")}</label>
                  <select
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  >
                    <option value="">{t("form.service.ph")}</option>
                    <option value="consultation">{t("svc.consultation")}</option>
                    <option value="surgery">{t("svc.surgery")}</option>
                    <option value="vaccination">{t("svc.vaccination")}</option>
                    <option value="online">{t("svc.online")}</option>
                    <option value="deworming">{t("svc.deworming")}</option>
                    <option value="other">{t("svc.other")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 font-body">{t("form.msg")}</label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder={t("form.msg.ph")}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-primary text-primary-foreground py-3.5 rounded-full font-semibold text-sm shadow-soft hover:shadow-hover hover:scale-[1.02] transition-all duration-300"
                >
                  {t("form.submit")}
                </button>

                <p className="text-center text-xs text-muted-foreground font-body">
                  {t("form.call")}{" "}
                  <a href="tel:+8801750656002" className="text-primary font-semibold">
                    01750-656002
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
