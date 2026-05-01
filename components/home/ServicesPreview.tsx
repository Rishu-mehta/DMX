'use client';

import { motion, useInView } from 'framer-motion';
import { Smartphone, Globe, Brain, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const services = [
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'High-performance iOS, Android, and cross-platform apps',
    href: '/services/mobile-app-development',
  },
  {
    icon: Globe,
    title: 'Web Application Development',
    description: 'Fast, scalable web apps built with modern frameworks',
    href: '/services/web-application-development',
  },
  {
    icon: Brain,
    title: 'AI Tools & Services',
    description: 'Custom AI integrations and automation solutions',
    href: '/services/ai-tools-services',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Comprehensive security audits and penetration testing',
    href: '/services/cybersecurity',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export function ServicesPreview() {
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
            What We Do
          </h2>
          <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Comprehensive IT solutions tailored to your business needs
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={item}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={service.href}
                  className="group block h-full p-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl hover:border-[var(--color-primary)] hover:shadow-lg hover:shadow-[var(--color-primary)]/10 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-[var(--muted-foreground)] mb-4">
                        {service.description}
                      </p>
                      <div className="flex items-center text-[var(--color-primary)] font-semibold group-hover:gap-2 transition-all">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-[var(--foreground)] border-2 border-[var(--border)] rounded-lg hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all group"
          >
            View All Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
