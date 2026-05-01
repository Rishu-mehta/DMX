import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const schema = z.object({
  quote: z.string().min(10),
  name: z.string().min(2),
  company: z.string().optional(),
  role: z.string().optional(),
  avatar: z.string().optional(),
  rating: z.number().int().min(1).max(5).default(5),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const data = schema.parse(body);
  const testimonial = await prisma.testimonial.create({ data });
  return NextResponse.json(testimonial, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { id, ...data } = body;
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  const testimonial = await prisma.testimonial.update({ where: { id }, data });
  return NextResponse.json(testimonial);
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
