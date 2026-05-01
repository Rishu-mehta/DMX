"use client";

import { useState, useEffect } from "react";
import { getAllCourses } from "@/lib/sanity/queries";
import type { Course } from "@/lib/sanity/types";
import { Clock, Award, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/StructuredData";

const levelColors = {
  beginner: "primary-blue",
  intermediate: "primary-red",
  advanced: "deep-red"
};

const levelLabels = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced"
};

const faqs = [
  {
    question: "Do you offer flexible payment options?",
    answer: "Yes, we offer flexible payment plans including installments and early bird discounts. Contact us to discuss payment options that work best for you."
  },
  {
    question: "Will I receive a certificate after completing the course?",
    answer: "Yes, all students who successfully complete their training program will receive a certificate of completion from DMX Tech Services."
  },
  {
    question: "Can I switch between online and in-person classes?",
    answer: "Yes, we offer hybrid learning options. You can attend classes online or in-person based on your schedule and preferences."
  },
  {
    question: "Do you provide job placement assistance?",
    answer: "Yes, we offer career support including resume building, interview preparation, and connections to our network of hiring partners."
  },
  {
    question: "What are the prerequisites for enrolling in a course?",
    answer: "Prerequisites vary by course. Beginner courses require no prior experience, while intermediate and advanced courses may require specific foundational knowledge. Check individual course details for specific requirements."
  }
];

export default function ProductsPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to load courses:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  const filteredCourses = filter === "all" 
    ? courses 
    : courses.filter(course => course.level === filter);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://dmxtechservices.com" },
          { name: "Training Programs", url: "https://dmxtechservices.com/products" }
        ]}
      />
      <FAQSchema faqs={faqs} />
      <main className="min-h-screen">
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[var(--color-accent)]/10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
            IT Training Programs
          </h1>
          <p className="text-xl md:text-2xl text-[var(--muted-foreground)] max-w-3xl mx-auto">
            Industry-leading training programs designed to fast-track your career in technology.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 px-6 sticky top-20 z-40 bg-[var(--background)]/80 backdrop-blur-lg border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {["all", "beginner", "intermediate", "advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level as typeof filter)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  filter === level
                    ? "bg-[var(--color-primary)] text-white shadow-lg scale-105"
                    : "bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--color-primary)]/10"
                }`}
              >
                {level === "all" ? "All Courses" : levelLabels[level as keyof typeof levelLabels]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-[var(--muted-foreground)]">Loading courses...</p>
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="group flex flex-col p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--color-primary)] hover:shadow-2xl transition-all duration-300"
                >
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-bold flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <span className={`px-3 py-1 rounded-full bg-[var(--color-${levelColors[course.level]})]/10 text-[var(--color-${levelColors[course.level]})] text-sm font-bold flex items-center gap-1`}>
                      <Award className="w-4 h-4" />
                      {levelLabels[course.level]}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[var(--color-primary)] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-[var(--muted-foreground)] mb-6 flex-grow">
                    {course.description}
                  </p>

                  {/* Curriculum Preview */}
                  {course.curriculum && course.curriculum.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-bold mb-3 text-sm uppercase tracking-wider text-[var(--muted-foreground)]">
                        What You'll Learn
                      </h4>
                      <ul className="space-y-2">
                        {course.curriculum.slice(0, 3).map((item: any, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-[var(--color-primary)] mt-1">▸</span>
                            <span>{typeof item === 'string' ? item : item.title || item.text || 'Course module'}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Price & CTA */}
                  <div className="pt-6 border-t border-[var(--border)]">
                    {course.price && (
                      <div className="text-3xl font-bold text-[var(--color-primary)] mb-4">
                        {course.price}
                      </div>
                    )}
                    <Link
                      href={`/products/${course.slug.current}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-full font-bold hover:opacity-90 transition-all group/btn"
                    >
                      View Details
                      <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Award className="w-16 h-16 mx-auto mb-4 text-[var(--muted-foreground)]" />
              <p className="text-xl text-[var(--muted-foreground)]">
                No courses found for this filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-[var(--muted)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-[var(--muted-foreground)]">
              Everything you need to know about our training programs
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-[var(--card)] border border-[var(--border)] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-[var(--muted)] transition-colors"
                >
                  <span className="text-lg font-bold pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-[var(--color-primary)] flex-shrink-0 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-6 text-[var(--muted-foreground)]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of students who have transformed their careers with our training programs.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-[var(--color-primary)] rounded-full font-bold text-lg hover:bg-opacity-90 transition-all hover:scale-105"
          >
            Enroll Now
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}
