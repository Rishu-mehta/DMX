import { prisma } from '@/lib/db';

export async function getAllServices() {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });
}

export async function getAllServicesAdmin() {
  return prisma.service.findMany({
    orderBy: { order: 'asc' },
  });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findUnique({ where: { slug } });
}

export async function getServiceById(id: string) {
  return prisma.service.findUnique({ where: { id } });
}
