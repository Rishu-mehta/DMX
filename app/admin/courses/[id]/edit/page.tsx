import { getCourseById } from '@/lib/data/courses';
import { CourseForm } from '@/components/admin/CourseForm';
import { notFound } from 'next/navigation';
import { Pencil } from 'lucide-react';

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await getCourseById(id);
  if (!course) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Pencil className="w-6 h-6 text-accent" />
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Course</h1>
          <p className="text-white/50 text-sm">{course.title}</p>
        </div>
      </div>
      <div className="bg-[#14141f] border border-white/[0.08] rounded-xl p-6">
        <CourseForm mode="edit" initialData={{ ...course, price: course.price ?? undefined, instructor: course.instructor ?? undefined, curriculum: course.curriculum as { module: string; topics: string[] }[] }} />
      </div>
    </div>
  );
}
