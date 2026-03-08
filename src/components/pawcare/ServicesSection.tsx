import groomingImg from "@/assets/service-grooming.jpg";
import daycareImg from "@/assets/service-daycare.jpg";
import vetImg from "@/assets/service-vet.jpg";
import walkingImg from "@/assets/service-walking.jpg";

const services = [
  {
    id: 1,
    title: "Dog Grooming",
    description:
      "Full-service grooming including baths, haircuts, nail trimming, ear cleaning, and blowouts. Your dog will look and feel their best.",
    image: groomingImg,
    price: "From $45",
    badge: "Most Popular",
    color: "primary",
  },
  {
    id: 2,
    title: "Dog Daycare",
    description:
      "Supervised playtime with other dogs in our safe, spacious facility. Keeps your pup active, socialized, and happy all day.",
    image: daycareImg,
    price: "From $35/day",
    badge: null,
    color: "secondary",
  },
  {
    id: 3,
    title: "Vet Check-ups",
    description:
      "Routine wellness exams, vaccinations, and preventive care with our certified in-house veterinarian team.",
    image: vetImg,
    price: "From $60",
    badge: "New",
    color: "primary",
  },
  {
    id: 4,
    title: "Dog Walking",
    description:
      "Daily walks by trained, insured handlers. GPS-tracked routes with live updates sent to you throughout the walk.",
    image: walkingImg,
    price: "From $25/walk",
    badge: null,
    color: "secondary",
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
            Everything Your Pet{" "}
            <span className="text-gradient">Deserves</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-body leading-relaxed">
            From daily walks to full grooming sessions, we offer a comprehensive range of
            professional pet care services.
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
                      service.badge === "Most Popular"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {service.badge}
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-card-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-primary">
                    {service.price}
                  </span>
                  <a
                    href="#contact"
                    className={`text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                      service.color === "primary"
                        ? "bg-primary-light text-primary hover:bg-primary hover:text-primary-foreground"
                        : "bg-secondary-light text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    }`}
                  >
                    Book →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
