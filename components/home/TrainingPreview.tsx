'use client';

import { motion, useInView } from 'framer-motion';
import { Clock, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const courses = [
  {
    title: 'Full-Stack AI & Cloud Engineering',
    duration: '3 months',
    level: 'Advanced',
    levelColor: 'red',
    description: 'Master AI development, cloud architecture, and full-stack engineering in one comprehensive program.',
    href: '/training/full-stack-ai-cloud-engineering',
  },
  {
    title: 'Cybersecurity & Ethical Hacking',
    duration: '2 months',
    level: 'Intermediate',
    levelColor: 'blue',
    description: 'Learn penetration testing, security audits, and ethical hacking techniques from industry experts.',
    href: '/training/cybersecurity-ethical-hacking',
  },
  {
    title: 'DevOps & AWS Cloud Engineering',
    duration: '3 months',
    level: 'Intermediate',
    levelColor: 'blue',
    description: 'Build and deploy scalable cloud infrastructure with AWS, Docker, Kubernetes, and CI/CD pipelines.',
    href: '/training/devops-aws-cloud-engineering',
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
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0 },
};

export function TrainingPreview() {
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
            Level Up Your Skills
          </h2>
          <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Industry-leading training programs designed to land you your dream job
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {courses.map((course) => (
            <motion.div
              key={course.title}
              variants={item}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={course.href}
                className="group block h-full p-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl hover:border-[var(--color-primary)] hover:shadow-xl hover:shadow-[var(--color-primary)]/10 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--muted)] rounded-full text-sm font-semibold text-[var(--muted-foreground)]">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </div>
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${
                      course.levelColor === 'red'
                        ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                        : 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    {course.level}
                  </div>
                </div>

                <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                  {course.title}
                </h3>

                <p className="text-[var(--muted-foreground)] mb-6 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex items-center text-[var(--color-primary)] font-semibold group-hover:gap-2 transition-all">
                  Enroll Now
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/training"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-[var(--foreground)] border-2 border-[var(--border)] rounded-lg hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all group"
          >
            View All Programs
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
