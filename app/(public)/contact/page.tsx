"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Linkedin, 
  Twitter, 
  Github, 
  Instagram,
  Send,
  CheckCircle2,
  Zap,
  Lock
} from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  enquiryType: z.enum(["service", "training", "partnership", "general"]),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const enquiryTypes = [
  { value: "service", label: "IT Service Inquiry" },
  { value: "training", label: "Training Enrollment" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "general", label: "General Inquiry" },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setSubmitSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://dmxtechservices.com" },
          { name: "Contact", url: "https://dmxtechservices.com/contact" }
        ]}
      />
      <main className="min-h-screen">
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[var(--color-accent)]/10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-[var(--muted-foreground)] max-w-3xl mx-auto">
            Have a question or ready to start your project? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Contact Form */}
            <div>
              <div className="p-8 md:p-12 rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>

                {submitSuccess ? (
                  <div className="py-12 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                    <p className="text-[var(--muted-foreground)] mb-6">
                      We've received your message and will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full font-bold hover:opacity-90 transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold mb-2">
                        Full Name <span className="text-[var(--color-primary)]">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        {...register("name")}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold mb-2">
                        Email Address <span className="text-[var(--color-primary)]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold mb-2">
                        Phone Number <span className="text-[var(--muted-foreground)]">(optional)</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                        placeholder="+91-XXXXXXXXXX"
                      />
                    </div>

                    {/* Enquiry Type */}
                    <div>
                      <label htmlFor="enquiryType" className="block text-sm font-bold mb-2">
                        Enquiry Type <span className="text-[var(--color-primary)]">*</span>
                      </label>
                      <select
                        id="enquiryType"
                        {...register("enquiryType")}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                      >
                        {enquiryTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {errors.enquiryType && (
                        <p className="mt-2 text-sm text-red-500">{errors.enquiryType.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-bold mb-2">
                        Message <span className="text-[var(--color-primary)]">*</span>
                      </label>
                      <textarea
                        id="message"
                        {...register("message")}
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-none"
                        placeholder="Tell us about your project or inquiry..."
                      />
                      {errors.message && (
                        <p className="mt-2 text-sm text-red-500">{errors.message.message}</p>
                      )}
                      <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                        Minimum 20 characters
                      </p>
                    </div>

                    {/* Submit Error */}
                    {submitError && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
                        {submitError}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-primary)] text-white rounded-full font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right - Contact Info */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)]">
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <a 
                        href="mailto:info@dmxtechservices.com"
                        className="text-[var(--muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        info@dmxtechservices.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Phone</h3>
                      <a 
                        href="tel:+91XXXXXXXXXX"
                        className="text-[var(--muted-foreground)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        +91-XXXXXXXXXX
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-deep-red)]/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[var(--color-deep-red)]" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Address</h3>
                      <p className="text-[var(--muted-foreground)]">
                        Bangalore, Karnataka<br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-deep-blue)]/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-[var(--color-deep-blue)]" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Working Hours</h3>
                      <p className="text-[var(--muted-foreground)]">
                        Monday – Saturday<br />
                        9:00 AM – 6:00 PM IST
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-[var(--border)]">
                  <h3 className="font-bold mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-[var(--muted)] hover:bg-[var(--color-accent)]/10 border border-[var(--border)] hover:border-[var(--color-accent)] flex items-center justify-center transition-all"
                    >
                      <Linkedin className="w-5 h-5 text-[var(--color-accent)]" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-[var(--muted)] hover:bg-[var(--color-accent)]/10 border border-[var(--border)] hover:border-[var(--color-accent)] flex items-center justify-center transition-all"
                    >
                      <Twitter className="w-5 h-5 text-[var(--color-accent)]" />
                    </a>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-[var(--muted)] hover:bg-[var(--color-primary)]/10 border border-[var(--border)] hover:border-[var(--color-primary)] flex items-center justify-center transition-all"
                    >
                      <Github className="w-5 h-5 text-[var(--color-primary)]" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-[var(--muted)] hover:bg-[var(--color-primary)]/10 border border-[var(--border)] hover:border-[var(--color-primary)] flex items-center justify-center transition-all"
                    >
                      <Instagram className="w-5 h-5 text-[var(--color-primary)]" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="rounded-3xl overflow-hidden border border-[var(--border)] h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.3507448!3d12.9539974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Response Promise */}
      <section className="py-20 px-6 bg-[var(--muted)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-primary)]/10 mb-6">
                <Zap className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Reply Within 24 Hours</h3>
              <p className="text-[var(--muted-foreground)]">
                We respond to all inquiries within one business day.
              </p>
            </div>

            <div className="p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent)]/10 mb-6">
                <Phone className="w-8 h-8 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Free Consultation</h3>
              <p className="text-[var(--muted-foreground)]">
                Get expert advice on your project or training needs.
              </p>
            </div>

            <div className="p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-deep-red)]/10 mb-6">
                <Lock className="w-8 h-8 text-[var(--color-deep-red)]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Your Data is Safe</h3>
              <p className="text-[var(--muted-foreground)]">
                We respect your privacy and keep your information secure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
