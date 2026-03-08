import heroPets from "@/assets/hero-pets.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroPets}
          alt="Happy pets"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent" />
      </div>

      {/* Floating decorative circles */}
      <div className="absolute top-32 right-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-24 right-16 w-48 h-48 rounded-full bg-secondary/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary-foreground rounded-full px-4 py-1.5 text-sm font-medium mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Trusted by 2,000+ pet owners
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Premium Care
            <br />
            <span className="text-gradient">for Your Pets</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl font-body font-light leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Where every tail wags and every purr is heard. Professional pet care services 
            tailored to your furry family members — because they deserve the very best.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <a
              href="#contact"
              className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-full text-base font-semibold shadow-hover hover:scale-105 transition-all duration-300"
            >
              Book a Service
            </a>
            <a
              href="#services"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full text-base font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Explore Services
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-14 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {[
              { number: "2,000+", label: "Happy Pets" },
              { number: "8 Yrs", label: "Experience" },
              { number: "4.9★", label: "Rating" },
              { number: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-white">
                <div className="font-display text-3xl font-bold">{stat.number}</div>
                <div className="text-white/60 text-sm font-body mt-0.5">{stat.label}</div>
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
