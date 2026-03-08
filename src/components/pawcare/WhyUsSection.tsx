const reasons = [
  {
    icon: "🏥",
    title: "Always Open",
    description: "Our clinic is open 24/7 — because emergencies don't follow office hours. Your pet's health is our priority at all times.",
  },
  {
    icon: "🎓",
    title: "Qualified Surgeon",
    description: "Dr. Foysal Kabir holds an MS Fellowship in Surgery from SAU, bringing specialist-level surgical expertise to your pet's care.",
  },
  {
    icon: "🪪",
    title: "Registered Practitioner",
    description: "BVC Registered (Reg. No. 9774) — legally certified and held to the highest professional veterinary standards in Bangladesh.",
  },
  {
    icon: "💻",
    title: "Online Consultations",
    description: "Get expert vet advice from anywhere in Bangladesh via WhatsApp, phone call, or video — convenient and affordable.",
  },
  {
    icon: "🐕🐈",
    title: "All Pet Animals",
    description: "We care for dogs, cats, rabbits, birds, and more. Every animal deserves professional medical attention.",
  },
  {
    icon: "💊",
    title: "Full Treatment",
    description: "From routine check-ups and vaccinations to complex surgeries — complete veterinary care under one roof.",
  },
];

export default function WhyUsSection() {
  return (
    <section id="about" className="section-padding bg-muted">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="inline-block bg-secondary-light text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Why Vet & Pet Care?
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Compassionate Care,{" "}
              <span className="text-gradient">Expert Hands</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg font-body leading-relaxed mb-6">
              Vet & Pet Care is a dedicated veterinary practice in Mohammadpur, Dhaka. 
              Led by Dr. Foysal Kabir, we combine clinical expertise with genuine love for animals 
              to provide the best possible outcomes for your pets.
            </p>
            <p className="text-muted-foreground text-base font-body leading-relaxed mb-8">
              Whether it's a routine vaccination, an emergency surgery, or an online consultation — 
              we are always here for you and your animal family.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-gradient-secondary text-secondary-foreground px-8 py-4 rounded-full font-semibold shadow-soft hover:shadow-hover hover:scale-105 transition-all duration-300"
              >
                Book a Consultation →
              </a>
              <a
                href="https://wa.me/8801750656002"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-card text-foreground border border-border px-8 py-4 rounded-full font-semibold hover:shadow-soft transition-all duration-300"
              >
                💬 WhatsApp
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
