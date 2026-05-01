import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseBySlug, getAllCourses } from "@/lib/sanity/queries";
import { Clock, Award, User, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BreadcrumbSchema, CourseSchema } from "@/components/seo/StructuredData";

export const revalidate = 3600; // Revalidate every hour

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.map((course) => ({
    slug: course.slug.current,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug);
  
  if (!course) {
    return {
      title: "Course Not Found | DMX Tech Services",
    };
  }

  return {
    title: `${course.title} | DMX Tech Services`,
    description: course.description,
    keywords: [course.title, "IT training", "programming course", course.level, "DMX Tech Services"],
    openGraph: {
      title: `${course.title} | DMX Tech Services`,
      description: course.description,
      url: `https://dmxtechservices.com/products/${params.slug}`,
      siteName: "DMX Tech Services",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} | DMX Tech Services`,
      description: course.description,
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: `https://dmxtechservices.com/products/${params.slug}`,
    },
  };
}

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

export default async function CourseDetailPage({ params }: Props) {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://dmxtechservices.com" },
          { name: "Training Programs", url: "https://dmxtechservices.com/products" },
          { name: course.title, url: `https://dmxtechservices.com/products/${params.slug}` }
        ]}
      />
      <CourseSchema
        title={course.title}
        description={course.description}
        duration={course.duration}
        level={course.level}
        price={course.price}
        instructor={course.instructor}
        url={`https://dmxtechservices.com/products/${params.slug}`}
      />
      <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[var(--color-accent)]/10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-2 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-bold flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {course.duration}
              </span>
              <span className={`px-4 py-2 rounded-full bg-[var(--color-${levelColors[course.level]})]/10 text-[var(--color-${levelColors[course.level]})] text-sm font-bold flex items-center gap-2`}>
                <Award className="w-5 h-5" />
                {levelLabels[course.level]}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {course.title}
            </h1>
            <p className="text-xl md:text-2xl text-[var(--muted-foreground)]">
              {course.description}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-[1fr,400px] gap-12">
          {/* Main Content */}
          <div className="space-y-12">
            {/* Full Curriculum */}
            <section>
              <h2 className="text-3xl font-bold mb-8">Course Curriculum</h2>
              
              {course.curriculum && course.curriculum.length > 0 ? (
                <div className="space-y-4">
                  {course.curriculum.map((item: any, index: number) => {
                    const title = typeof item === 'string' 
                      ? item 
                      : item.title || item.text || `Module ${index + 1}`;
                    
                    return (
                      <div
                        key={index}
                        className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--color-primary)] transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-lg font-bold mb-2">{title}</h3>
                            {item.description && (
                              <p className="text-[var(--muted-foreground)]">
                                {item.description}
                              </p>
                            )}
                            {item.children && Array.isArray(item.children) && (
                              <ul className="mt-3 space-y-2">
                                {item.children.map((child: any, childIdx: number) => (
                                  <li key={childIdx} className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
                                    <span className="text-[var(--color-primary)] mt-0.5">▸</span>
                                    <span>{typeof child === 'string' ? child : child.text || child.title || ''}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-12 rounded-2xl bg-[var(--muted)] text-center">
                  <p className="text-[var(--muted-foreground)]">
                    Detailed curriculum will be shared upon enrollment.
                  </p>
                </div>
              )}
            </section>

            {/* Instructor Profile */}
            {course.instructor && (
              <section>
                <h2 className="text-3xl font-bold mb-6">Your Instructor</h2>
                <div className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{course.instructor}</h3>
                      <p className="text-[var(--muted-foreground)]">
                        Industry expert with extensive experience in teaching and real-world application of these technologies.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Who This Is For */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Who This Course Is For</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                  <CheckCircle2 className="w-8 h-8 text-[var(--color-primary)] mb-4" />
                  <h3 className="font-bold mb-2">
                    {course.level === 'beginner' ? 'Beginners' : course.level === 'intermediate' ? 'Intermediate Learners' : 'Advanced Professionals'}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {course.level === 'beginner' 
                      ? 'No prior experience required. Perfect for those starting their tech journey.'
                      : course.level === 'intermediate'
                      ? 'Some foundational knowledge recommended. Great for those looking to advance their skills.'
                      : 'Solid foundation required. Ideal for professionals seeking expertise.'}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                  <CheckCircle2 className="w-8 h-8 text-[var(--color-accent)] mb-4" />
                  <h3 className="font-bold mb-2">Career Switchers</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Professionals looking to transition into tech or expand their skill set.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                  <CheckCircle2 className="w-8 h-8 text-[var(--color-deep-red)] mb-4" />
                  <h3 className="font-bold mb-2">Students & Graduates</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Recent graduates or students wanting to gain practical, industry-relevant skills.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                  <CheckCircle2 className="w-8 h-8 text-[var(--color-deep-blue)] mb-4" />
                  <h3 className="font-bold mb-2">Working Professionals</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Upskill while working with flexible learning schedules.
                  </p>
                </div>
              </div>
            </section>

            {/* What You'll Learn */}
            <section>
              <h2 className="text-3xl font-bold mb-6">What You'll Learn</h2>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 border border-[var(--border)]">
                <ul className="grid md:grid-cols-2 gap-4">
                  {[
                    "Industry-relevant skills and best practices",
                    "Hands-on projects and real-world applications",
                    "Problem-solving and critical thinking",
                    "Collaborative development workflows",
                    "Portfolio-ready projects",
                    "Career guidance and mentorship"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--foreground)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar - Sticky Enrollment CTA */}
          <aside className="lg:sticky lg:top-32 h-fit">
            <div className="p-8 rounded-3xl bg-[var(--card)] border-2 border-[var(--color-primary)] shadow-2xl">
              {course.price && (
                <div className="mb-6">
                  <p className="text-sm text-[var(--muted-foreground)] mb-2">Course Fee</p>
                  <div className="text-4xl font-bold text-[var(--color-primary)]">
                    {course.price}
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                  <Clock className="w-5 h-5 text-[var(--color-primary)]" />
                  <span>Duration: {course.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                  <Award className="w-5 h-5 text-[var(--color-primary)]" />
                  <span>Level: {levelLabels[course.level]}</span>
                </div>
                {course.instructor && (
                  <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                    <User className="w-5 h-5 text-[var(--color-primary)]" />
                    <span>Instructor: {course.instructor}</span>
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-primary)] text-white rounded-full font-bold text-lg hover:opacity-90 transition-all hover:scale-105 group"
              >
                Enroll Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <div className="mt-6 pt-6 border-t border-[var(--border)] space-y-3 text-sm text-[var(--muted-foreground)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />
                  <span>Certificate upon completion</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />
                  <span>Lifetime access to materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />
                  <span>Job placement assistance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />
                  <span>Flexible payment options</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-6 rounded-2xl bg-[var(--muted)] text-center">
              <p className="text-sm text-[var(--muted-foreground)] mb-4">
                Have questions about this course?
              </p>
              <Link
                href="/contact"
                className="text-[var(--color-primary)] font-bold hover:underline"
              >
                Contact Us
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
    </>
  );
}
