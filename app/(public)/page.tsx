import type { Metadata } from "next";
import {
  HeroSection,
  StatsBar,
  ServicesPreview,
  TrainingPreview,
  WhyChooseUs,
  Testimonials,
  CTABanner,
} from '@/components/home';
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "DMX Tech Services | IT Services & Training Programs",
  description: "Premium IT services and world-class training programs. Mobile apps, web development, AI solutions, cybersecurity, and professional IT training courses.",
  keywords: ["IT services", "web development", "mobile apps", "AI solutions", "cybersecurity", "IT training", "DMX Tech Services"],
  openGraph: {
    title: "DMX Tech Services | IT Services & Training",
    description: "Premium IT services and world-class training programs",
    url: "https://dmxtechservices.com",
    siteName: "DMX Tech Services",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "DMX Tech Services" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DMX Tech Services | IT Services & Training",
    description: "Premium IT services and world-class training programs",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://dmxtechservices.com",
  },
};

export default function Home() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://dmxtechservices.com" }
        ]}
      />
      <main>
        {/* 1. Hero Section - Full viewport with animated gradient background */}
        <HeroSection />

        {/* 2. Stats Bar - Animated count-up statistics */}
        <StatsBar />

        {/* 3. Services Preview - 4 service cards grid */}
        <ServicesPreview />

        {/* 4. Training Programs Preview - 3 featured courses */}
        <TrainingPreview />

        {/* 5. Why Choose DMX - 3 features with icons */}
        <WhyChooseUs />

        {/* 6. Testimonials - Client testimonials carousel */}
        <Testimonials />

        {/* 7. CTA Banner - Final call-to-action */}
        <CTABanner />
      </main>
    </>
  );
}
