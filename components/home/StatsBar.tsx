'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

function StatItem({ value, suffix = '', label, delay = 0 }: StatItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const duration = 2000; // 2 seconds

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * value));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      // Delay the animation
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, delay);
    }
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
        {count}{suffix}
      </div>
      <div className="text-sm sm:text-base text-[var(--muted-foreground)] mt-2 font-[family-name:var(--font-body)]">
        {label}
      </div>
    </motion.div>
  );
}

export function StatsBar() {
  return (
    <section className="py-16 sm:py-20 bg-[var(--muted)]/30 border-y border-[var(--border)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <StatItem value={200} suffix="+" label="Projects Delivered" delay={0} />
          <StatItem value={500} suffix="+" label="Students Trained" delay={100} />
          <StatItem value={50} suffix="+" label="Enterprise Clients" delay={200} />
          <StatItem value={6} label="Training Programs" delay={300} />
        </div>
      </div>
    </section>
  );
}
