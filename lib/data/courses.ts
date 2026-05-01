import { prisma } from '@/lib/db';

export async function getAllCourses() {
  return prisma.course.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });
}

export async function getAllCoursesAdmin() {
  return prisma.course.findMany({
    orderBy: { order: 'asc' },
  });
}

export async function getFeaturedCourses() {
  return prisma.course.findMany({
    where: { published: true, featured: true },
    orderBy: { order: 'asc' },
    take: 3,
  });
}

export async function getCourseBySlug(slug: string) {
  return prisma.course.findUnique({ where: { slug } });
}

export async function getCourseById(id: string) {
  return prisma.course.findUnique({ where: { id } });
}
