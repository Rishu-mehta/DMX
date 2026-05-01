import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/StructuredData";

const syne = Syne({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dmxtechservices.com"),
  title: {
    default: "DMX Tech Services | IT Services & Training Programs",
    template: "%s | DMX Tech Services"
  },
  description: "Premium IT services and world-class training programs. Mobile apps, web development, AI solutions, cybersecurity, and professional IT training courses.",
  keywords: ["IT services", "web development", "mobile app development", "AI tools", "cybersecurity", "IT training", "cloud engineering", "DevOps", "ethical hacking"],
  authors: [{ name: "DMX Tech Services" }],
  creator: "DMX Tech Services",
  publisher: "DMX Tech Services",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dmxtechservices.com",
    siteName: "DMX Tech Services",
    title: "DMX Tech Services | IT Services & Training Programs",
    description: "Premium IT services and world-class training programs",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DMX Tech Services - IT Solutions & Training"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DMX Tech Services | IT Services & Training Programs",
    description: "Premium IT services and world-class training programs",
    images: ["/og-image.jpg"],
    creator: "@dmxtechservices",
  },
  alternates: {
    canonical: "https://dmxtechservices.com",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
