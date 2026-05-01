'use client';

import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useRef } from 'react';

const testimonials = [
  {
    quote: "DMX transformed our business with their AI solutions. Incredible team!",
    name: "Emily Rodriguez",
    company: "TechStart Inc",
    rating: 5,
  },
  {
    quote: "The training program was exactly what I needed to land my dream job.",
    name: "James Wilson",
    company: "DataCorp",
    rating: 5,
  },
  {
    quote: "Professional, reliable, and always deliver on time.",
    name: "Lisa Thompson",
    company: "SecureBank",
    rating: 5,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 sm:py-32 bg-[var(--muted)]/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Don't just take our word for it — hear from those we've worked with
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative p-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl hover:border-[var(--color-primary)]/30 hover:shadow-xl hover:shadow-[var(--color-primary)]/5 transition-all"
            >
              {/* Accent border */}
              <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-accent)] rounded-r" />

              {/* Quote icon */}
              <Quote className="w-10 h-10 text-[var(--color-primary)]/20 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[var(--color-primary)] text-[var(--color-primary)]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg text-[var(--foreground)] mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div>
                <div className="font-bold text-[var(--foreground)] font-[family-name:var(--font-heading)]">
                  {testimonial.name}
                </div>
                <div className="text-sm text-[var(--muted-foreground)]">
                  {testimonial.company}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
