import { CourseForm } from '@/components/admin/CourseForm';
import { BookOpen } from 'lucide-react';

export default function NewCoursePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="w-6 h-6 text-accent" />
        <div>
          <h1 className="text-2xl font-bold text-white">Add Course</h1>
          <p className="text-white/50 text-sm">Create a new training program</p>
        </div>
      </div>
      <div className="bg-[#14141f] border border-white/[0.08] rounded-xl p-6">
        <CourseForm mode="create" />
      </div>
    </div>
  );
}
