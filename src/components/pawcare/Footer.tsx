export default function Footer() {
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
                <div className="text-xs font-body text-white/50">Dr. Foysal Kabir</div>
              </div>
            </div>
            <p className="text-white/60 text-sm font-body leading-relaxed mb-4">
              Expert veterinary consultation and surgery for pet animals. Located in Mohammadpur, Dhaka. Always open for your pets.
            </p>
            <div className="text-xs text-white/40 font-body">
              BVC Reg. No. 9774
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm font-body">
              {[
                "General Consultation",
                "Surgery & Operations",
                "Vaccination",
                "Online Consultation",
                "Deworming",
                "Dental & Wound Care",
                "Lab Tests",
              ].map((s) => (
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
            <h4 className="font-display font-bold text-white mb-4">Contact</h4>
            <div className="space-y-3 text-sm font-body text-white/60">
              <div>
                <div className="text-white/40 text-xs uppercase tracking-wide mb-0.5">Address</div>
                <div>10/7, Block-A, Iqbal Road<br />Opposite Holy Flower School<br />1st Floor, Green Homes (Flat A-2)<br />Mohammadpur, Dhaka-1207</div>
              </div>
              <div>
                <div className="text-white/40 text-xs uppercase tracking-wide mb-0.5">Phone</div>
                <a href="tel:+8801750656002" className="hover:text-primary transition-colors block">+88 01750-656002</a>
                <a href="tel:+8801637888667" className="hover:text-primary transition-colors block">+88 01637-888667</a>
              </div>
              <div>
                <div className="text-white/40 text-xs uppercase tracking-wide mb-0.5">Email</div>
                <a href="mailto:drfoysalkabir@gmail.com" className="hover:text-primary transition-colors">
                  drfoysalkabir@gmail.com
                </a>
              </div>
              <div>
                <div className="text-white/40 text-xs uppercase tracking-wide mb-0.5">Hours</div>
                <span className="text-secondary font-semibold">Always Open — 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-body text-white/40">
          <span>© 2026 Vet & Pet Care · Dr. Foysal Kabir. All rights reserved.</span>
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
