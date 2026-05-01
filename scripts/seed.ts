/**
 * Seed script for DMX Tech Services Sanity CMS
 * 
 * This script populates the Sanity dataset with initial content:
 * - 4 IT Services
 * - 6 Training Courses
 * - 3 Team Members
 * - 3 Testimonials
 * - 1 Site Settings document
 * 
 * Usage:
 * 1. Ensure .env.local has NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_TOKEN
 * 2. Run: node --loader ts-node/esm scripts/seed.ts
 *    OR: tsx scripts/seed.ts (if you have tsx installed)
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Seed data
const services = [
  {
    _type: "service",
    _id: "service-mobile-app",
    title: "Mobile Application Development",
    slug: { _type: "slug", current: "mobile-app-development" },
    description:
      "Build powerful, scalable mobile applications for iOS and Android. We create native and cross-platform solutions that deliver exceptional user experiences.",
    icon: "Smartphone",
    features: [
      "Native iOS & Android Development",
      "Cross-platform with React Native & Flutter",
      "UI/UX Design & Prototyping",
      "App Store Optimization",
      "Maintenance & Support",
    ],
    techStack: ["Swift", "Kotlin", "React Native", "Flutter", "Firebase"],
    order: 1,
  },
  {
    _type: "service",
    _id: "service-web-app",
    title: "Web Application Development",
    slug: { _type: "slug", current: "web-app-development" },
    description:
      "Full-stack web applications built with modern frameworks. From MVPs to enterprise solutions, we deliver scalable, performant web apps.",
    icon: "Globe",
    features: [
      "Full-Stack Development",
      "Progressive Web Apps (PWA)",
      "API Development & Integration",
      "Cloud Deployment & DevOps",
      "Performance Optimization",
    ],
    techStack: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"],
    order: 2,
  },
  {
    _type: "service",
    _id: "service-ai-tools",
    title: "AI Tools & Services",
    slug: { _type: "slug", current: "ai-tools-services" },
    description:
      "Harness the power of artificial intelligence. We build custom AI solutions, chatbots, automation tools, and integrate cutting-edge AI APIs.",
    icon: "Brain",
    features: [
      "Custom AI Model Development",
      "ChatGPT & LLM Integration",
      "Process Automation",
      "Computer Vision Solutions",
      "AI Consulting & Strategy",
    ],
    techStack: ["Python", "TensorFlow", "OpenAI API", "LangChain", "Hugging Face"],
    order: 3,
  },
  {
    _type: "service",
    _id: "service-cybersecurity",
    title: "Cybersecurity Services",
    slug: { _type: "slug", current: "cybersecurity" },
    description:
      "Protect your digital assets with comprehensive security solutions. From audits to penetration testing, we ensure your systems are secure.",
    icon: "Shield",
    features: [
      "Security Audits & Assessments",
      "Penetration Testing",
      "Vulnerability Management",
      "Security Consulting",
      "Compliance & Risk Management",
    ],
    techStack: ["Kali Linux", "Metasploit", "Burp Suite", "Wireshark", "OWASP"],
    order: 4,
  },
];

const courses = [
  {
    _type: "course",
    _id: "course-fullstack-ai",
    title: "Full-Stack AI & Cloud Engineering",
    slug: { _type: "slug", current: "fullstack-ai-cloud-engineering" },
    duration: "3 months",
    level: "intermediate",
    description:
      "Master full-stack development with AI integration and cloud deployment. Learn to build modern web applications with AI capabilities and deploy them to the cloud.",
    price: "Contact for pricing",
    instructor: "DMX Tech Team",
    featured: true,
    order: 1,
  },
  {
    _type: "course",
    _id: "course-ai-ml",
    title: "AI/ML Training",
    slug: { _type: "slug", current: "ai-ml-training" },
    duration: "2 months",
    level: "intermediate",
    description:
      "Deep dive into artificial intelligence and machine learning. Learn to build, train, and deploy ML models for real-world applications.",
    price: "Contact for pricing",
    instructor: "DMX Tech Team",
    featured: true,
    order: 2,
  },
  {
    _type: "course",
    _id: "course-devops-aws",
    title: "DevOps & AWS Cloud Engineering",
    slug: { _type: "slug", current: "devops-aws-cloud" },
    duration: "3 months",
    level: "intermediate",
    description:
      "Become a DevOps engineer with expertise in AWS. Learn CI/CD, infrastructure as code, containerization, and cloud architecture.",
    price: "Contact for pricing",
    instructor: "DMX Tech Team",
    featured: true,
    order: 3,
  },
  {
    _type: "course",
    _id: "course-cybersecurity",
    title: "Cybersecurity & Ethical Hacking",
    slug: { _type: "slug", current: "cybersecurity-ethical-hacking" },
    duration: "2 months",
    level: "intermediate",
    description:
      "Learn offensive and defensive security techniques. Master penetration testing, vulnerability assessment, and security best practices.",
    price: "Contact for pricing",
    instructor: "DMX Tech Team",
    featured: false,
    order: 4,
  },
  {
    _type: "course",
    _id: "course-azure",
    title: "Microsoft Azure Cloud & Security",
    slug: { _type: "slug", current: "azure-cloud-security" },
    duration: "2 months",
    level: "intermediate",
    description:
      "Master Microsoft Azure cloud platform and security. Learn to design, implement, and secure Azure solutions.",
    price: "Contact for pricing",
    instructor: "DMX Tech Team",
    featured: false,
    order: 5,
  },
  {
    _type: "course",
    _id: "course-linux",
    title: "Linux & System Administration for Cloud",
    slug: { _type: "slug", current: "linux-system-admin" },
    duration: "1.5 months",
    level: "beginner",
    description:
      "Build a strong foundation in Linux system administration. Essential skills for cloud engineering and DevOps roles.",
    price: "Contact for pricing",
    instructor: "DMX Tech Team",
    featured: false,
    order: 6,
  },
];

const teamMembers = [
  {
    _type: "teamMember",
    _id: "team-member-1",
    name: "David Martinez",
    role: "Founder & Lead Engineer",
    bio: "Full-stack developer with 10+ years of experience in building scalable applications. Passionate about AI and cloud technologies.",
    order: 1,
  },
  {
    _type: "teamMember",
    _id: "team-member-2",
    name: "Sarah Chen",
    role: "AI/ML Specialist",
    bio: "Machine learning engineer specializing in NLP and computer vision. Former researcher at leading tech companies.",
    order: 2,
  },
  {
    _type: "teamMember",
    _id: "team-member-3",
    name: "Michael Johnson",
    role: "Cybersecurity Lead",
    bio: "Certified ethical hacker with expertise in penetration testing and security architecture. Protecting businesses for over 8 years.",
    order: 3,
  },
];

const testimonials = [
  {
    _type: "testimonial",
    _id: "testimonial-1",
    quote:
      "DMX Tech Services transformed our business with a custom mobile app that exceeded all expectations. Their team is professional, responsive, and truly understands modern technology.",
    name: "Emily Rodriguez",
    company: "TechStart Inc",
    role: "CEO",
    rating: 5,
    order: 1,
  },
  {
    _type: "testimonial",
    _id: "testimonial-2",
    quote:
      "The AI/ML training program was exceptional. I went from zero knowledge to building production-ready ML models in just 2 months. Highly recommend!",
    name: "James Wilson",
    company: "DataCorp",
    role: "Data Analyst",
    rating: 5,
    order: 2,
  },
  {
    _type: "testimonial",
    _id: "testimonial-3",
    quote:
      "Their cybersecurity audit identified critical vulnerabilities we didn't know existed. The team's expertise and professionalism gave us peace of mind.",
    name: "Lisa Thompson",
    company: "SecureBank",
    role: "CTO",
    rating: 5,
    order: 3,
  },
];

const siteSettings = {
  _type: "siteSettings",
  _id: "siteSettings",
  companyName: "DMX Tech Services",
  email: "info@dmxtechservices.com",
  phone: "+1 (555) 123-4567",
  address: "123 Tech Street, Innovation District, San Francisco, CA 94105",
  socialLinks: {
    linkedin: "https://linkedin.com/company/dmx-tech-services",
    twitter: "https://twitter.com/dmxtechservices",
    github: "https://github.com/dmxtechservices",
    instagram: "https://instagram.com/dmxtechservices",
  },
};

async function seed() {
  console.log("🌱 Starting seed process...\n");

  try {
    // Check if we can connect to Sanity
    console.log("📡 Connecting to Sanity...");
    const datasets = await client.datasets.list();
    console.log(`✅ Connected to Sanity project\n`);

    // Seed services
    console.log("📦 Seeding services...");
    for (const service of services) {
      await client.createOrReplace(service);
      console.log(`  ✓ ${service.title}`);
    }

    // Seed courses
    console.log("\n📚 Seeding courses...");
    for (const course of courses) {
      await client.createOrReplace(course);
      console.log(`  ✓ ${course.title}`);
    }

    // Seed team members
    console.log("\n👥 Seeding team members...");
    for (const member of teamMembers) {
      await client.createOrReplace(member);
      console.log(`  ✓ ${member.name}`);
    }

    // Seed testimonials
    console.log("\n💬 Seeding testimonials...");
    for (const testimonial of testimonials) {
      await client.createOrReplace(testimonial);
      console.log(`  ✓ ${testimonial.name} - ${testimonial.company}`);
    }

    // Seed site settings
    console.log("\n⚙️  Seeding site settings...");
    await client.createOrReplace(siteSettings);
    console.log(`  ✓ Site settings created`);

    console.log("\n✨ Seed completed successfully!\n");
    console.log("📊 Summary:");
    console.log(`  - ${services.length} services`);
    console.log(`  - ${courses.length} courses`);
    console.log(`  - ${teamMembers.length} team members`);
    console.log(`  - ${testimonials.length} testimonials`);
    console.log(`  - 1 site settings document`);
    console.log("\n🎉 Your Sanity CMS is ready to use!");
  } catch (error) {
    console.error("\n❌ Seed failed:", error);
    process.exit(1);
  }
}

// Run seed
seed();
