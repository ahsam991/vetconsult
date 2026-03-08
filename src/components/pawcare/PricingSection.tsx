const plans = [
  {
    name: "Starter",
    price: "$59",
    period: "/month",
    description: "Perfect for pet owners who need occasional care",
    features: [
      "2 dog walks per week",
      "1 grooming session/month",
      "Basic vet check-in",
      "Photo updates",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Family",
    price: "$129",
    period: "/month",
    description: "Our most popular plan for busy pet families",
    features: [
      "5 dog walks per week",
      "2 grooming sessions/month",
      "Monthly vet wellness check",
      "GPS live tracking",
      "Photo & video updates",
      "Priority phone support",
      "One free daycare day/month",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$249",
    period: "/month",
    description: "Unlimited care for the most devoted pet parents",
    features: [
      "Unlimited dog walks",
      "Weekly grooming sessions",
      "Biweekly vet check-ups",
      "24/7 GPS tracking",
      "Daily photo & video diary",
      "Dedicated care manager",
      "Unlimited daycare",
      "Emergency vet visits covered",
    ],
    cta: "Go Premium",
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="section-padding bg-muted">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-secondary-light text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Pricing
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-body">
            No hidden fees. Cancel anytime. Choose the plan that fits your pet's needs.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                plan.highlighted
                  ? "bg-gradient-primary text-primary-foreground shadow-hover scale-105"
                  : "bg-card text-card-foreground shadow-card hover:shadow-hover"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-secondary text-secondary-foreground text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                    ⭐ Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`font-display text-xl font-bold mb-1 ${
                    plan.highlighted ? "text-primary-foreground" : "text-card-foreground"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm font-body mb-4 ${
                    plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>
                <div className="flex items-end gap-1">
                  <span
                    className={`font-display text-5xl font-bold ${
                      plan.highlighted ? "text-primary-foreground" : "text-foreground"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`font-body text-base mb-2 ${
                      plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm font-body">
                    <span
                      className={`mt-0.5 text-base flex-shrink-0 ${
                        plan.highlighted ? "text-primary-foreground" : "text-secondary"
                      }`}
                    >
                      ✓
                    </span>
                    <span
                      className={plan.highlighted ? "text-primary-foreground/90" : "text-card-foreground/80"}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 ${
                  plan.highlighted
                    ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    : "bg-gradient-primary text-primary-foreground hover:shadow-soft"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
