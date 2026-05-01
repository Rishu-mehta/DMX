/**
 * Quick Reference: Using Sanity Queries in Frontend
 * 
 * This file shows examples of how to use the backend queries
 * in your Next.js frontend components.
 */

// ============================================================================
// SERVER COMPONENTS (Recommended for SEO and performance)
// ============================================================================

import { getAllServices, getServiceBySlug } from "@/lib/sanity/queries";

// Example: Services page
export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <div>
      <h1>Our Services</h1>
      {services.map((service) => (
        <div key={service._id}>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
}

// Example: Service detail page with dynamic route
export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div>
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      <ul>
        {service.features?.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================================
// GENERATING STATIC PARAMS (for dynamic routes)
// ============================================================================

import { getAllServices } from "@/lib/sanity/queries";

export async function generateStaticParams() {
  const services = await getAllServices();

  return services.map((service) => ({
    slug: service.slug.current,
  }));
}

// ============================================================================
// CLIENT COMPONENTS (when you need interactivity)
// ============================================================================

"use client";

import { useState } from "react";
import type { Service } from "@/lib/sanity/types";

export function ServiceFilter({ services }: { services: Service[] }) {
  const [filter, setFilter] = useState("");

  const filtered = services.filter((s) =>
    s.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search services..."
      />
      {filtered.map((service) => (
        <div key={service._id}>{service.title}</div>
      ))}
    </div>
  );
}

// Usage in parent Server Component:
// const services = await getAllServices();
// return <ServiceFilter services={services} />;

// ============================================================================
// CONTACT FORM SUBMISSION
// ============================================================================

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  enquiryType: z.enum(["service", "training", "general", "partnership"]).optional(),
  message: z.string().min(10),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
        console.error("Contact form error:", result);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register("email")} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register("phone")} placeholder="Phone (optional)" />

      <select {...register("enquiryType")}>
        <option value="">Select enquiry type</option>
        <option value="service">Service</option>
        <option value="training">Training</option>
        <option value="general">General</option>
        <option value="partnership">Partnership</option>
      </select>

      <textarea {...register("message")} placeholder="Message" />
      {errors.message && <span>{errors.message.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {submitStatus === "success" && (
        <div>Thank you! We'll get back to you soon.</div>
      )}
      {submitStatus === "error" && (
        <div>Something went wrong. Please try again.</div>
      )}
    </form>
  );
}

// ============================================================================
// REVALIDATION (ISR - Incremental Static Regeneration)
// ============================================================================

// Option 1: Time-based revalidation
export const revalidate = 3600; // Revalidate every hour

// Option 2: On-demand revalidation (webhook from Sanity)
// Set up a webhook in Sanity Studio to call:
// POST /api/revalidate?secret=YOUR_SECRET&path=/services

// ============================================================================
// METADATA (SEO)
// ============================================================================

import { Metadata } from "next";
import { getServiceBySlug } from "@/lib/sanity/queries";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | DMX Tech Services`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      type: "website",
    },
  };
}

// ============================================================================
// LOADING STATES
// ============================================================================

// Create a loading.tsx file in your route folder
export default function Loading() {
  return <div>Loading services...</div>;
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

// Create an error.tsx file in your route folder
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

// ============================================================================
// USEFUL PATTERNS
// ============================================================================

// Pattern 1: Parallel data fetching
const [services, courses, testimonials] = await Promise.all([
  getAllServices(),
  getFeaturedCourses(),
  getTestimonials(),
]);

// Pattern 2: Conditional rendering based on data
const services = await getAllServices();
if (services.length === 0) {
  return <div>No services available</div>;
}

// Pattern 3: Type-safe props
import type { Service } from "@/lib/sanity/types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return <div>{service.title}</div>;
}

// ============================================================================
// COMMON IMPORTS
// ============================================================================

// Queries
import {
  getAllServices,
  getServiceBySlug,
  getAllCourses,
  getFeaturedCourses,
  getCourseBySlug,
  getTeamMembers,
  getTestimonials,
  getSiteSettings,
} from "@/lib/sanity/queries";

// Types
import type {
  Service,
  Course,
  TeamMember,
  Testimonial,
  SiteSettings,
} from "@/lib/sanity/types";

// ============================================================================
// TIPS
// ============================================================================

/*
1. Use Server Components by default for better performance
2. Only use Client Components when you need interactivity
3. Fetch data at the highest level possible and pass as props
4. Use TypeScript types for type safety
5. Handle loading and error states
6. Add proper metadata for SEO
7. Use ISR for frequently updated content
8. Test with empty data states
*/
