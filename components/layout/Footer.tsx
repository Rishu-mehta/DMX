'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Github,
} from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Mobile App Development', href: '/services/mobile-app-development' },
    { label: 'Web Development', href: '/services/web-development' },
    { label: 'AI Tools & Services', href: '/services/ai-tools-services' },
    { label: 'Cybersecurity', href: '/services/cybersecurity' },
  ],
  training: [
    { label: 'Full-Stack AI & Cloud', href: '/training/full-stack-ai-cloud' },
    { label: 'AI/ML Training', href: '/training/ai-ml-training' },
    { label: 'DevOps & AWS', href: '/training/devops-aws' },
    { label: 'Cybersecurity', href: '/training/cybersecurity' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/dmxtechservices', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/dmxtechservices', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/dmxtechservices', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/dmxtechservices', label: 'Instagram' },
  { icon: Github, href: 'https://github.com/dmxtechservices', label: 'GitHub' },
];

const contactInfo = [
  { icon: Mail, text: 'info@dmxtechservices.com', href: 'mailto:info@dmxtechservices.com' },
  { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: MapPin, text: 'San Francisco, CA', href: null },
];

export function Footer() {
  return (
    <footer className="relative bg-[var(--footer-bg)] border-t border-[var(--border)] mt-auto">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--background)] opacity-50 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center space-x-2 group mb-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-lg opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-[2px] bg-[var(--footer-bg)] rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent font-[family-name:var(--font-heading)]">
                    DMX
                  </span>
                </div>
              </div>
              <span className="text-xl font-bold font-[family-name:var(--font-heading)]">
                DMX Tech Services
              </span>
            </Link>
            <p className="text-[var(--muted-foreground)] mb-6 max-w-sm font-[family-name:var(--font-body)]">
              Empowering businesses with cutting-edge IT solutions and comprehensive training programs.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <item.icon className="w-4 h-4 text-[var(--color-primary)]" />
                  {item.href ? (
                    <a href={item.href} className="font-[family-name:var(--font-body)]">
                      {item.text}
                    </a>
                  ) : (
                    <span className="font-[family-name:var(--font-body)]">{item.text}</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[var(--muted)] hover:bg-gradient-to-br hover:from-[var(--color-primary)] hover:to-[var(--color-accent)] flex items-center justify-center text-[var(--foreground)] hover:text-white transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4 font-[family-name:var(--font-heading)]">
              Services
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--color-primary)] transition-colors font-[family-name:var(--font-body)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Training Column */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4 font-[family-name:var(--font-heading)]">
              Training
            </h3>
            <ul className="space-y-2">
              {footerLinks.training.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--color-primary)] transition-colors font-[family-name:var(--font-body)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4 font-[family-name:var(--font-heading)]">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--color-primary)] transition-colors font-[family-name:var(--font-body)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4 font-[family-name:var(--font-heading)]">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--color-primary)] transition-colors font-[family-name:var(--font-body)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-[var(--muted-foreground)] font-[family-name:var(--font-body)]">
              © {new Date().getFullYear()} DMX Tech Services. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-[var(--muted-foreground)] font-[family-name:var(--font-body)]">
                Made with{' '}
                <span className="text-[var(--color-primary)] animate-pulse">♥</span> by DMX
                Team
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
