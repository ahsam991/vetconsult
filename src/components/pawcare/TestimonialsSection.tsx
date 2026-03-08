const testimonials = [
  {
    name: "Sarah M.",
    pet: "Owner of Max & Bella",
    avatar: "🐕",
    rating: 5,
    text: "PawCare has been an absolute lifesaver! My golden retrievers Max and Bella come home happy and exhausted every time. The photo updates throughout the day give me so much peace of mind.",
  },
  {
    name: "James T.",
    pet: "Owner of Luna",
    avatar: "🐈",
    rating: 5,
    text: "I was skeptical at first, but the vet team here is incredibly knowledgeable and gentle with my anxious cat Luna. She actually seems to enjoy her check-ups now — which is a miracle!",
  },
  {
    name: "Priya K.",
    pet: "Owner of Rocky",
    avatar: "🐕‍🦺",
    rating: 5,
    text: "The grooming service is top-notch. Rocky always looks like he just walked out of a magazine shoot. The staff remembers all his preferences and he wags his tail the moment we arrive.",
  },
  {
    name: "David L.",
    pet: "Owner of Charlie",
    avatar: "🐶",
    rating: 5,
    text: "Daily daycare for Charlie has transformed him. He used to be anxious and withdrawn, but now he's social and energetic. The team truly cares about each dog's wellbeing.",
  },
  {
    name: "Emily R.",
    pet: "Owner of Mochi",
    avatar: "🐱",
    rating: 5,
    text: "Five stars isn't enough! The GPS tracking during walks, the real-time updates, the loving staff... PawCare is worth every penny. Mochi is always in great hands.",
  },
  {
    name: "Mark & Lisa",
    pet: "Owners of Duke",
    avatar: "🦮",
    rating: 5,
    text: "We've tried 3 other pet care services before PawCare. Nothing comes close. The attention to detail, the cleanliness, and the genuine love for animals sets them apart completely.",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-background overflow-hidden">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-primary-light text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Happy Pets, <span className="text-gradient">Happy Owners</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-body">
            Don't take our word for it — here's what our community says about PawCare.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="break-inside-avoid bg-card rounded-3xl p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-0.5 mb-6"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <span key={s} className="text-primary text-base">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-card-foreground font-body text-sm leading-relaxed mb-5 italic">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-2xl">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-display font-bold text-card-foreground text-sm">{t.name}</div>
                  <div className="text-muted-foreground text-xs font-body">{t.pet}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
