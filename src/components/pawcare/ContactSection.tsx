import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    petName: "",
    petType: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          {/* Left */}
          <div>
            <span className="inline-block bg-primary-light text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Book a Service
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Let's Care for <br />
              <span className="text-gradient">Your Pet Today</span>
            </h2>
            <p className="text-muted-foreground text-base font-body leading-relaxed mb-8">
              Fill in the form and our team will reach out within 2 hours to confirm your 
              appointment. First consultations are always free!
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              {[
                { icon: "📍", label: "Address", value: "123 Paw Street, Pet District, CA 90210" },
                { icon: "📞", label: "Phone", value: "+1 (555) PAW-CARE" },
                { icon: "✉️", label: "Email", value: "hello@pawcare.com" },
                { icon: "🕐", label: "Hours", value: "Mon–Sat: 7am–8pm | Sun: 9am–5pm" },
              ].map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-lg flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <div className="font-body font-semibold text-sm text-foreground">{info.label}</div>
                    <div className="font-body text-sm text-muted-foreground">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-card rounded-3xl p-8 shadow-card">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🐾</div>
                <h3 className="font-display text-2xl font-bold text-card-foreground mb-2">
                  We've Got It!
                </h3>
                <p className="text-muted-foreground font-body text-sm">
                  Thanks {form.name}! We'll contact you within 2 hours to confirm your booking.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 font-body">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 font-body">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 font-body">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 font-body">Pet's Name *</label>
                    <input
                      type="text"
                      name="petName"
                      required
                      placeholder="Buddy"
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
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 font-body">Service *</label>
                  <select
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  >
                    <option value="">Choose a service...</option>
                    <option value="grooming">Dog Grooming</option>
                    <option value="daycare">Dog Daycare</option>
                    <option value="vet">Vet Check-up</option>
                    <option value="walking">Dog Walking</option>
                    <option value="plan">Monthly Plan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 font-body">Message</label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Any special requests or notes about your pet..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-primary text-primary-foreground py-3.5 rounded-full font-semibold text-sm shadow-soft hover:shadow-hover hover:scale-[1.02] transition-all duration-300"
                >
                  Book My Appointment 🐾
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
