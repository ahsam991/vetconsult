import pawLogo from "@/assets/paw-logo.png";

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={pawLogo} alt="PawCare" className="w-9 h-9 object-contain" />
              <span className="font-display text-2xl font-bold text-gradient">PawCare</span>
            </div>
            <p className="text-white/60 text-sm font-body leading-relaxed mb-6">
              Premium pet care services with love and professionalism. Because your pets deserve the very best.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary/80 flex items-center justify-center text-sm transition-colors duration-200"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm font-body">
              {["Dog Grooming", "Dog Daycare", "Vet Check-ups", "Dog Walking", "Pet Boarding", "Training"].map((s) => (
                <li key={s}>
                  <a href="#services" className="text-white/60 hover:text-primary transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm font-body">
              {["About Us", "Our Team", "Careers", "Blog", "Press", "Contact"].map((s) => (
                <li key={s}>
                  <a href="#about" className="text-white/60 hover:text-primary transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">Stay Connected</h4>
            <p className="text-white/60 text-sm font-body mb-4">
              Get pet care tips and exclusive offers in your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition"
              />
              <button className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold hover:shadow-soft transition-all duration-200">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-body text-white/40">
          <span>© 2026 PawCare. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
