import vetImg from "@/assets/service-vet.jpg";
import surgeryImg from "@/assets/service-surgery.jpg";
import vaccineImg from "@/assets/service-vaccine.jpg";
import onlineImg from "@/assets/service-online.jpg";

const services = [
  {
    id: 1,
    title: "General Consultation",
    description:
      "Comprehensive health examination for dogs, cats, and other pet animals. Diagnosis and treatment of illnesses, injuries, and chronic conditions.",
    image: vetImg,
    badge: "Most Popular",
    color: "primary",
    icon: "🩺",
  },
  {
    id: 2,
    title: "Surgery & Operations",
    description:
      "Expert surgical procedures by Dr. Foysal Kabir (MS Fellow in Surgery). Soft tissue surgeries, orthopaedic procedures, and emergency operations.",
    image: surgeryImg,
    badge: null,
    color: "secondary",
    icon: "🏥",
  },
  {
    id: 3,
    title: "Vaccination & Prevention",
    description:
      "Complete vaccination schedules for dogs and cats. Anti-rabies, distemper, parvovirus, and all essential preventive immunizations.",
    image: vaccineImg,
    badge: null,
    color: "primary",
    icon: "💉",
  },
  {
    id: 4,
    title: "Online Consultation",
    description:
      "Can't visit the clinic? Get expert vet advice online via WhatsApp or phone call. Quick diagnosis and prescription for your pet from anywhere in Bangladesh.",
    image: onlineImg,
    badge: "Available Now",
    color: "secondary",
    icon: "💻",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-primary-light text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Expert Care for{" "}
            <span className="text-gradient">Every Pet</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-body leading-relaxed">
            From routine check-ups to complex surgeries — professional veterinary care 
            you can trust for your beloved animals.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={service.id}
              className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {service.badge && (
                  <span
                    className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${
                      service.color === "primary"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="text-2xl mb-2">{service.icon}</div>
                <h3 className="font-display text-lg font-bold text-card-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4">
                  {service.description}
                </p>
                <a
                  href="#contact"
                  className={`inline-block text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                    service.color === "primary"
                      ? "bg-primary-light text-primary hover:bg-primary hover:text-primary-foreground"
                      : "bg-secondary-light text-secondary hover:bg-secondary hover:text-secondary-foreground"
                  }`}
                >
                  Book Now →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional services list */}
        <div className="mt-12 bg-muted rounded-3xl p-8">
          <h3 className="font-display text-xl font-bold text-foreground mb-6 text-center">
            Also Available
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: "🦷", name: "Dental Care" },
              { icon: "🩻", name: "X-Ray & Imaging" },
              { icon: "💊", name: "Deworming" },
              { icon: "✂️", name: "Neutering / Spaying" },
              { icon: "🩹", name: "Wound Care" },
              { icon: "🧪", name: "Lab Tests" },
            ].map((item) => (
              <div key={item.name} className="bg-card rounded-2xl p-4 text-center shadow-soft hover:shadow-card transition-all duration-200 hover:-translate-y-0.5">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-xs font-body font-semibold text-card-foreground">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
