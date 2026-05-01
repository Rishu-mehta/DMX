import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Training Programs | DMX Tech Services",
  description: "Industry-leading IT training programs - Full-Stack Development, AI/ML, DevOps, Cloud Engineering, Cybersecurity, and Ethical Hacking courses.",
  keywords: ["IT training", "programming courses", "cybersecurity training", "cloud engineering", "DevOps training", "AI ML courses", "full-stack development"],
  openGraph: {
    title: "IT Training Programs | DMX Tech Services",
    description: "Industry-leading IT training programs designed to fast-track your career in technology.",
    url: "https://dmxtechservices.com/products",
    siteName: "DMX Tech Services",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Training Programs | DMX Tech Services",
    description: "Industry-leading IT training programs designed to fast-track your career.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://dmxtechservices.com/products",
  },
};
