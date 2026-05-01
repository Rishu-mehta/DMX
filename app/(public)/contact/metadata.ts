import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | DMX Tech Services",
  description: "Get in touch with DMX Tech Services for IT services, training programs, or partnership opportunities. We respond within 24 hours.",
  keywords: ["contact DMX Tech Services", "IT services inquiry", "training enrollment", "hire IT company", "IT consulting India"],
  openGraph: {
    title: "Contact Us | DMX Tech Services",
    description: "Get in touch with DMX Tech Services for IT services, training programs, or partnership opportunities.",
    url: "https://dmxtechservices.com/contact",
    siteName: "DMX Tech Services",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | DMX Tech Services",
    description: "Get in touch with DMX Tech Services. We respond within 24 hours.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://dmxtechservices.com/contact",
  },
};
