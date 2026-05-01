import { Metadata } from "next";
import { 
  Smartphone, 
  Globe, 
  Brain, 
  Shield, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";
import Link from "next/link";
import { BreadcrumbSchema, ServiceSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "IT Services | DMX Tech Services",
  description: "Comprehensive IT services including mobile app development, web development, AI solutions, and cybersecurity consulting.",
  keywords: ["IT services", "mobile app development", "web development", "AI solutions", "cybersecurity", "IT consulting"],
  openGraph: {
    title: "IT Services | DMX Tech Services",
    description: "Expert IT services to transform your business - mobile apps, web development, AI, and cybersecurity.",
    url: "https://dmxtechservices.com/services",
    siteName: "DMX Tech Services",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Services | DMX Tech Services",
    description: "Expert IT services to transform your business.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://dmxtechservices.com/services",
  },
};

const services = [
  {
    id: 1,
    icon: Smartphone,
    title: "Mobile Application Development",
    description: "Build powerful, scalable mobile applications for iOS, Android, and cross-platform solutions that engage users and drive business growth.",
    techStack: ["React Native", "Flutter", "iOS (Swift)", "Android (Kotlin)", "Firebase", "REST APIs"],
    features: [
      "Native and cross-platform mobile apps",
      "User-centric UI/UX design",
      "Backend integration and API development",
      "App store deployment and maintenance"
    ],
    color: "primary"
  },
  {
    id: 2,
    icon: Globe,
    title: "Web Application Development",
    description: "Create modern, responsive web applications with cutting-edge technologies that deliver exceptional user experiences and business value.",
    techStack: ["Next.js", "React", "Node.js", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    features: [
      "Full-stack web application development",
      "Progressive Web Apps (PWA)",
      "E-commerce and enterprise solutions",
      "Performance optimization and SEO"
    ],
    color: "accent"
  },
  {
    id: 3,
    icon: Brain,
    title: "AI Tools & Services",
    description: "Leverage the power of artificial intelligence to automate processes, gain insights, and create innovative solutions tailored to your business needs.",
    techStack: ["Python", "OpenAI", "LangChain", "TensorFlow", "PyTorch", "Hugging Face"],
    features: [
      "Custom AI model development and training",
      "Natural Language Processing (NLP) solutions",
      "Computer vision and image recognition",
      "AI-powered chatbots and automation"
    ],
    color: "primary"
  },
  {
    id: 4,
    icon: Shield,
    title: "Cybersecurity",
    description: "Protect your digital assets with comprehensive security audits, penetration testing, and ongoing security consulting to safeguard your business.",
    techStack: ["Kali Linux", "Metasploit", "OWASP", "SIEM Tools", "Burp Suite", "Wireshark"],
    features: [
      "Security audits and vulnerability assessments",
      "Penetration testing and ethical hacking",
      "Security architecture and consulting",
      "Compliance and risk management"
    ],
    color: "accent"
  }
];

const processSteps = [
  { number: "01", title: "Discovery", description: "Understanding your business needs and goals" },
  { number: "02", title: "Planning", description: "Creating a strategic roadmap for success" },
  { number: "03", title: "Development", description: "Building your solution with best practices" },
  { number: "04", title: "Testing", description: "Ensuring quality and reliability" },
  { number: "05", title: "Launch", description: "Deploying and supporting your solution" }
];

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://dmxtechservices.com" },
          { name: "Services", url: "https://dmxtechservices.com/services" }
        ]}
      />
      <ServiceSchema
        services={services.map(s => ({
          name: s.title,
          description: s.description
        }))}
      />
      <main className="min-h-screen">
      {/* Page Hero */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[var(--color-accent)]/10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
            Our IT Services
          </h1>
          <p className="text-xl md:text-2xl text-[var(--muted-foreground)] max-w-3xl mx-auto">
            Comprehensive technology solutions to transform your business and accelerate growth.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group p-8 md:p-12 rounded-3xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--color-primary)] hover:shadow-2xl transition-all duration-300"
              >
                <div className="grid md:grid-cols-[1fr,2fr] gap-8">
                  {/* Left: Icon and Title */}
                  <div>
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[var(--color-${service.color})]/10 mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-10 h-10 text-[var(--color-${service.color})]`} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-[var(--muted-foreground)] mb-6">
                      {service.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-[var(--muted)] text-sm font-medium font-[family-name:var(--font-code)] border border-[var(--border)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Features */}
                  <div>
                    <h3 className="text-xl font-bold mb-6">What We Offer</h3>
                    <ul className="space-y-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-6 h-6 text-[var(--color-${service.color})] flex-shrink-0 mt-0.5`} />
                          <span className="text-lg text-[var(--foreground)]">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Link
                        href="/contact"
                        className={`inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-${service.color})] text-white rounded-full font-bold hover:opacity-90 transition-all hover:gap-4 group/btn`}
                      >
                        Get Started
                        <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 px-6 bg-[var(--muted)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-[var(--muted-foreground)]">
              A proven methodology that delivers results
            </p>
          </div>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] transform -translate-y-1/2 z-0" />
              
              <div className="grid grid-cols-5 gap-4 relative z-10">
                {processSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--card)] border-4 border-[var(--color-primary)] mb-4 font-bold text-2xl text-[var(--color-primary)]">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="md:hidden space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--card)] border-4 border-[var(--color-primary)] font-bold text-xl text-[var(--color-primary)]">
                    {step.number}
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-[var(--muted-foreground)]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how we can help you achieve your business goals with our expert IT services.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-[var(--color-primary)] rounded-full font-bold text-lg hover:bg-opacity-90 transition-all hover:scale-105"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}
