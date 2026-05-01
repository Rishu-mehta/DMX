import { Metadata } from "next";
import { getTeamMembers } from "@/lib/data/misc";
import { 
  Target, 
  Eye, 
  Lightbulb, 
  Shield, 
  Award, 
  Users, 
  Linkedin 
} from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "About Us | DMX Tech Services",
  description: "Learn about DMX Tech Services - our story, mission, values, and the team behind innovative IT solutions and training programs.",
  keywords: ["about DMX Tech Services", "IT company India", "tech team", "company mission", "company values"],
  openGraph: {
    title: "About Us | DMX Tech Services",
    description: "Learn about DMX Tech Services - our story, mission, values, and the team behind innovative IT solutions.",
    url: "https://dmxtechservices.com/about",
    siteName: "DMX Tech Services",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | DMX Tech Services",
    description: "Learn about DMX Tech Services - our story, mission, values, and the team.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://dmxtechservices.com/about",
  },
};

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://dmxtechservices.com" },
          { name: "About", url: "https://dmxtechservices.com/about" }
        ]}
      />
      <main className="min-h-screen">
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[var(--color-accent)]/10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
            We Are DMX Tech Services
          </h1>
          <p className="text-xl md:text-2xl text-[var(--muted-foreground)] max-w-3xl mx-auto">
            Empowering businesses with cutting-edge technology solutions and training the next generation of tech leaders.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-[var(--muted-foreground)] mb-6">
                Founded with a vision to bridge the gap between innovative technology and practical business solutions, DMX Tech Services has grown from a small team of passionate developers into a trusted partner for businesses worldwide.
              </p>
              <p className="text-lg text-[var(--muted-foreground)] mb-8">
                We believe in the power of technology to transform businesses and the importance of quality education to build the tech workforce of tomorrow.
              </p>

              {/* Milestones */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[var(--color-primary)]">2020</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Founded</h3>
                    <p className="text-[var(--muted-foreground)]">
                      DMX Tech Services was established with a mission to deliver world-class IT solutions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[var(--color-accent)]">2022</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Training Division</h3>
                    <p className="text-[var(--muted-foreground)]">
                      Launched our comprehensive IT training programs to bridge the skills gap in the industry.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-[var(--color-deep-red)]/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[var(--color-deep-red)]">2024</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">200+ Projects</h3>
                    <p className="text-[var(--muted-foreground)]">
                      Successfully delivered over 200 projects for clients across multiple industries.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] p-1">
                <div className="w-full h-full rounded-3xl bg-[var(--card)] flex items-center justify-center">
                  <div className="text-center p-8">
                    <Award className="w-24 h-24 mx-auto mb-6 text-[var(--color-primary)]" />
                    <h3 className="text-3xl font-bold mb-4">Excellence in Innovation</h3>
                    <p className="text-[var(--muted-foreground)]">
                      Recognized for delivering cutting-edge solutions that drive business growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-[var(--muted)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 rounded-3xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--color-primary)] transition-colors">
              <Target className="w-12 h-12 text-[var(--color-primary)] mb-6" />
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg text-[var(--muted-foreground)]">
                To deliver innovative, scalable, and secure technology solutions that empower businesses to achieve their goals. We are committed to excellence, continuous learning, and building lasting partnerships with our clients.
              </p>
            </div>

            <div className="p-10 rounded-3xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--color-accent)] transition-colors">
              <Eye className="w-12 h-12 text-[var(--color-accent)] mb-6" />
              <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg text-[var(--muted-foreground)]">
                To be a global leader in IT services and training, recognized for our expertise, innovation, and dedication to nurturing the next generation of technology professionals who will shape the digital future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-[var(--muted-foreground)]">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--color-primary)] hover:shadow-lg transition-all group">
              <Lightbulb className="w-12 h-12 text-[var(--color-primary)] mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Innovation</h3>
              <p className="text-[var(--muted-foreground)]">
                We constantly explore new technologies and methodologies to deliver cutting-edge solutions.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--color-accent)] hover:shadow-lg transition-all group">
              <Shield className="w-12 h-12 text-[var(--color-accent)] mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Integrity</h3>
              <p className="text-[var(--muted-foreground)]">
                We conduct business with honesty, transparency, and respect for all stakeholders.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--color-primary)] hover:shadow-lg transition-all group">
              <Award className="w-12 h-12 text-[var(--color-primary)] mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Excellence</h3>
              <p className="text-[var(--muted-foreground)]">
                We are committed to delivering the highest quality in every project and program.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--color-accent)] hover:shadow-lg transition-all group">
              <Users className="w-12 h-12 text-[var(--color-accent)] mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Community</h3>
              <p className="text-[var(--muted-foreground)]">
                We invest in education and mentorship to build a stronger tech community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 px-6 bg-[var(--muted)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet the Team</h2>
            <p className="text-xl text-[var(--muted-foreground)]">
              The talented professionals driving our success
            </p>
          </div>

          {teamMembers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="group relative p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--color-primary)] hover:shadow-xl transition-all"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-[var(--muted)]">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="w-20 h-20 text-[var(--muted-foreground)]" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-[var(--color-primary)] font-medium mb-3">
                    {member.role}
                  </p>
                  
                  {member.bio && (
                    <p className="text-sm text-[var(--muted-foreground)] mb-4">
                      {member.bio}
                    </p>
                  )}
                  
                  {member.linkedIn && (
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[var(--color-accent)] hover:text-[var(--color-deep-blue)] transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="text-sm font-medium">Connect</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 mx-auto mb-4 text-[var(--muted-foreground)]" />
              <p className="text-[var(--muted-foreground)]">
                Team member profiles will be available soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Certifications & Partners</h2>
            <p className="text-xl text-[var(--muted-foreground)]">
              Trusted and certified by industry leaders
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--color-primary)] transition-colors flex items-center justify-center h-32">
              <span className="text-2xl font-bold text-[var(--muted-foreground)]">AWS</span>
            </div>
            <div className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--color-primary)] transition-colors flex items-center justify-center h-32">
              <span className="text-2xl font-bold text-[var(--muted-foreground)]">Google Cloud</span>
            </div>
            <div className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--color-primary)] transition-colors flex items-center justify-center h-32">
              <span className="text-2xl font-bold text-[var(--muted-foreground)]">Microsoft Azure</span>
            </div>
            <div className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--color-primary)] transition-colors flex items-center justify-center h-32">
              <span className="text-2xl font-bold text-[var(--muted-foreground)]">CompTIA</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Work with Us?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's build something amazing together. Get in touch today.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-[var(--color-primary)] rounded-full font-bold text-lg hover:bg-opacity-90 transition-all hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </main>
    </>
  );
}
