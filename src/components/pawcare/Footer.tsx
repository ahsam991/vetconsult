import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const services = [
    t("svc.consultation"),
    t("svc.surgery"),
    t("svc.vaccination"),
    t("svc.online"),
    t("svc.deworming"),
    t("extra.dental"),
    t("extra.lab"),
  ];

  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="24,2 44,13 44,35 24,46 4,35 4,13" stroke="hsl(174,65%,50%)" strokeWidth="2.5" fill="hsl(174,65%,20%)" />
                  <text x="24" y="30" textAnchor="middle" fontSize="18" fill="hsl(28,90%,62%)">🐾</text>
                </svg>
              </div>
              <div>
                <div className="font-display text-xl font-bold text-gradient leading-none">Vet & Pet Care</div>
                <div className="text-xs font-body text-white/50">{t("nav.subtitle")}</div>
              </div>
            </div>
            <p className="text-white/60 text-sm font-body leading-relaxed mb-4">
              {t("footer.desc")}
            </p>
            <div className="text-xs text-white/40 font-body">
              BVC Reg. No. 9774
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">{t("footer.services")}</h4>
            <ul className="space-y-2 text-sm font-body">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-white/60 hover:text-primary transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">{t("footer.contact")}</h4>
            <div className="space-y-3 text-sm font-body text-white/60">
              <div>
                <div className="text-white/40 text-xs uppercase tracking-wide mb-0.5">{t("contact.addr.label")}</div>
                <div>{t("contact.addr.value")}</div>
              </div>
              <div>
                <div className="text-white/40 text-xs uppercase tracking-wide mb-0.5">{t("contact.phone.label")}</div>
                <a href="tel:+8801750656002" className="hover:text-primary transition-colors block">+88 01750-656002</a>
                <a href="tel:+8801637888667" className="hover:text-primary transition-colors block">+88 01637-888667</a>
              </div>
              <div>
                <div className="text-white/40 text-xs uppercase tracking-wide mb-0.5">{t("contact.email.label")}</div>
                <a href="mailto:drfoysalkabir@gmail.com" className="hover:text-primary transition-colors">
                  drfoysalkabir@gmail.com
                </a>
              </div>
              <div>
                <div className="text-white/40 text-xs uppercase tracking-wide mb-0.5">{t("contact.hours.label")}</div>
                <span className="text-secondary font-semibold">{t("contact.hours.value")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-body text-white/40">
          <span>{t("footer.copyright")}</span>
          <div className="flex gap-6">
            <a
              href="https://www.facebook.com/p/Vet-Consult-61575839930213/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Facebook Page
            </a>
            <a href="https://wa.me/8801750656002" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
