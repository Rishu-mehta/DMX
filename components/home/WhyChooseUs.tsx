'use client';

import { motion, useInView } from 'framer-motion';
import { Award, Zap, Target } from 'lucide-react';
import { useRef } from 'react';

const features = [
  {
    icon: Award,
    title: 'Industry-Expert Instructors',
    description: 'Learn from professionals with 10+ years in the field',
  },
  {
    icon: Zap,
    title: 'Hands-On Projects',
    description: 'Real-world projects from day one, not just theory',
  },
  {
    icon: Target,
    title: 'Job-Ready Curriculum',
    description: 'Our programs are built around what employers actually hire for',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 sm:py-32" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto">
            We're committed to delivering exceptional results and transforming careers
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={item}
                className="text-center group"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-[var(--muted-foreground)] leading-relaxed max-w-sm mx-auto">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
