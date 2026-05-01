import { prisma } from '@/lib/db';

export async function getPublishedTestimonials() {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });
}

export async function getAllTestimonialsAdmin() {
  return prisma.testimonial.findMany({
    orderBy: { order: 'asc' },
  });
}

export async function getTeamMembers() {
  return prisma.teamMember.findMany({
    orderBy: { order: 'asc' },
  });
}

export async function getSiteSettings() {
  return prisma.siteSettings.findUnique({ where: { id: 'singleton' } });
}

export async function getContactSubmissions(page = 1, perPage = 20) {
  const skip = (page - 1) * perPage;
  const [submissions, total] = await Promise.all([
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: perPage,
    }),
    prisma.contactSubmission.count(),
  ]);
  return { submissions, total, pages: Math.ceil(total / perPage) };
}

export async function getDashboardStats() {
  const [services, courses, testimonials, contacts, unreadContacts] = await Promise.all([
    prisma.service.count(),
    prisma.course.count(),
    prisma.testimonial.count(),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
  ]);
  return { services, courses, testimonials, contacts, unreadContacts };
}
