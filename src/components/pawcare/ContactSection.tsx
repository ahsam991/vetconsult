import { useState } from "react";

export default function ContactSection() {
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

  return (
    <section id="contact" className="section-padding bg-muted">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          {/* Left info */}
          <div>
            <span className="inline-block bg-primary-light text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Visit / Contact Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              We're <span className="text-gradient">Always Open</span>
            </h2>
            <p className="text-muted-foreground text-base font-body leading-relaxed mb-8">
              Walk in anytime or book an appointment in advance. For urgent cases, 
              please call or WhatsApp directly — we respond quickly.
            </p>

            {/* Contact details */}
            <div className="space-y-5">
              {[
                {
                  icon: "📍",
                  label: "Address",
                  value: "10/7, Block-A, Iqbal Road (Opposite to Holy Flower School), 1st Floor of Green Homes, Flat A-2, Mohammadpur, Dhaka-1207",
                  href: "https://maps.google.com/?q=10/7+Block-A+Iqbal+Road+Mohammadpur+Dhaka",
                },
                {
                  icon: "📞",
                  label: "Phone",
                  value: "+88 01750-656002",
                  href: "tel:+8801750656002",
                },
                {
                  icon: "📞",
                  label: "Alternate",
                  value: "+88 01637-888667",
                  href: "tel:+8801637888667",
                },
                {
                  icon: "💬",
                  label: "WhatsApp",
                  value: "+880 1750-656002",
                  href: "https://wa.me/8801750656002",
                },
                {
                  icon: "✉️",
                  label: "Email",
                  value: "drfoysalkabir@gmail.com",
                  href: "mailto:drfoysalkabir@gmail.com",
                },
                {
                  icon: "🕐",
                  label: "Hours",
                  value: "Always Open — 24/7",
                  href: null,
                },
              ].map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-lg flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <div className="font-body font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                      {info.label}
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

            {/* Facebook link */}
            <div className="mt-8 p-4 bg-card rounded-2xl shadow-soft border border-border flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary-light rounded-xl flex items-center justify-center text-2xl">📘</div>
              <div>
                <div className="font-body font-semibold text-sm text-foreground">Follow on Facebook</div>
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
                  Appointment Request Sent!
                </h3>
                <p className="text-muted-foreground font-body text-sm mb-6">
                  Thank you, {form.name}! Dr. Foysal will contact you shortly to confirm your visit.
                </p>
                <p className="text-sm text-muted-foreground font-body">
                  For urgent cases, please call or WhatsApp directly:<br />
                  <a href="tel:+8801750656002" className="text-primary font-semibold">+88 01750-656002</a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-xl font-bold text-card-foreground mb-2">
                  Book an Appointment
                </h3>
                <p className="text-muted-foreground text-xs font-body mb-4">
                  Fill in the form and we'll confirm your visit promptly.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 font-body">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 font-body">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="01XXXXXXXXX"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 font-body">Pet's Name</label>
                    <input
                      type="text"
                      name="petName"
                      placeholder="e.g. Bruno"
                      value={form.petName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 font-body">Pet Type</label>
                    <select
                      name="petType"
                      value={form.petType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    >
                      <option value="">Select...</option>
                      <option value="dog">Dog 🐕</option>
                      <option value="cat">Cat 🐈</option>
                      <option value="bird">Bird 🦜</option>
                      <option value="rabbit">Rabbit 🐇</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 font-body">Service Needed *</label>
                  <select
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  >
                    <option value="">Choose a service...</option>
                    <option value="consultation">General Consultation</option>
                    <option value="surgery">Surgery / Operation</option>
                    <option value="vaccination">Vaccination</option>
                    <option value="online">Online Consultation</option>
                    <option value="deworming">Deworming</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 font-body">Describe the Problem</label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Describe your pet's condition or any specific concerns..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-primary text-primary-foreground py-3.5 rounded-full font-semibold text-sm shadow-soft hover:shadow-hover hover:scale-[1.02] transition-all duration-300"
                >
                  📅 Request Appointment
                </button>

                <p className="text-center text-xs text-muted-foreground font-body">
                  Or call us directly:{" "}
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
