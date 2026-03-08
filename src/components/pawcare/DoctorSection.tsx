import drFoysal from "@/assets/dr-foysal.jpg";

export default function DoctorSection() {
  return (
    <section id="doctor" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-secondary-light text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Meet the Doctor
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Pet's <span className="text-gradient">Trusted Expert</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          {/* Photo */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl" />
              <img
                src={drFoysal}
                alt="Dr. Foysal Kabir"
                className="relative w-80 h-96 object-cover object-top rounded-3xl shadow-hover"
              />
              {/* Credential badge */}
              <div className="absolute -bottom-4 -right-4 bg-card rounded-2xl px-5 py-3 shadow-hover border border-border">
                <div className="text-xs text-muted-foreground font-body">BVC Reg. No.</div>
                <div className="font-display text-lg font-bold text-primary">9774</div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              DR. Foysal Kabir
            </h3>
            <p className="text-secondary font-body font-semibold text-base mb-6">
              Consultant & Surgeon — Vet & Pet Care
            </p>

            {/* Credentials */}
            <div className="space-y-3 mb-8">
              {[
                { icon: "🎓", text: "B.Sc. Vet. Sci. & A. H. — Sher-e-Bangla Agricultural University (SAU)" },
                { icon: "🏅", text: "MS. Fellow in Surgery — Sher-e-Bangla Agricultural University (SAU)" },
                { icon: "🪪", text: "Registered Veterinary Practitioner · BVC Reg. No. 9774" },
                { icon: "🐾", text: "Specialist in Companion Animal Medicine & Surgery (Dogs, Cats & More)" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <p className="text-foreground/80 font-body text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            {/* About text */}
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-8">
              Dr. Foysal Kabir brings deep expertise in veterinary medicine and surgery to every patient. 
              With a passion for animal welfare and a commitment to evidence-based treatment, he has helped 
              hundreds of pet owners in Dhaka ensure their companions live healthy, happy lives.
              His clinic is always open — because pets can't wait.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/8801750656002"
                target="_blank"
                rel="noreferrer"
                className="bg-gradient-secondary text-secondary-foreground px-6 py-3 rounded-full font-semibold text-sm shadow-soft hover:shadow-hover hover:scale-105 transition-all duration-300"
              >
                💬 WhatsApp Dr. Foysal
              </a>
              <a
                href="#contact"
                className="bg-primary-light text-primary px-6 py-3 rounded-full font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                📅 Book a Visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
