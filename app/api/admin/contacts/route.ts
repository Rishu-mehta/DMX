import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = 20;
  const skip = (page - 1) * perPage;

  const [submissions, total] = await Promise.all([
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: perPage,
    }),
    prisma.contactSubmission.count(),
  ]);

  return NextResponse.json({ submissions, total, pages: Math.ceil(total / perPage) });
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, read } = await req.json();
  const submission = await prisma.contactSubmission.update({ where: { id }, data: { read } });
  return NextResponse.json(submission);
}
