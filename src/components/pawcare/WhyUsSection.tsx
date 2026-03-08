const reasons = [
  {
    icon: "🏆",
    title: "Certified Professionals",
    description: "All our caregivers are certified, background-checked, and undergo continuous training in animal behavior and first aid.",
  },
  {
    icon: "📍",
    title: "GPS Live Tracking",
    description: "Real-time GPS updates during walks and outdoor activities so you always know where your pet is.",
  },
  {
    icon: "🏠",
    title: "Safe & Clean Facilities",
    description: "Our spaces are sanitized daily, temperature-controlled, and designed to keep pets comfortable and stress-free.",
  },
  {
    icon: "❤️",
    title: "Personalized Attention",
    description: "Every pet is unique. We create individualized care plans that match your pet's personality and health needs.",
  },
  {
    icon: "📸",
    title: "Photo Updates",
    description: "We send regular photo and video updates so you can enjoy peace of mind while you're away.",
  },
  {
    icon: "🛡️",
    title: "Fully Insured",
    description: "We carry full liability insurance for all services, giving you complete peace of mind.",
  },
];

export default function WhyUsSection() {
  return (
    <section id="about" className="section-padding bg-muted">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="inline-block bg-secondary-light text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Why PawCare?
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              We Treat Your Pet{" "}
              <span className="text-gradient">Like Family</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg font-body leading-relaxed mb-8">
              Founded in 2016, PawCare started as a small dog-walking service and grew into 
              a full-spectrum pet care center. Our mission is simple: to be the most trusted 
              name in pet care in your neighborhood.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-secondary text-secondary-foreground px-8 py-4 rounded-full font-semibold shadow-soft hover:shadow-hover hover:scale-105 transition-all duration-300"
            >
              Meet Our Team
              <span>→</span>
            </a>
          </div>

          {/* Right: Reasons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl p-5 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="text-3xl mb-3">{reason.icon}</div>
                <h3 className="font-display text-base font-bold text-card-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
