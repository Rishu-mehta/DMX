import { getAllCoursesAdmin } from '@/lib/data/courses';
import Link from 'next/link';
import { BookOpen, Plus, Pencil, Eye, EyeOff, Star } from 'lucide-react';
import { DeleteButton } from '@/components/admin/DeleteButton';

export default async function AdminCoursesPage() {
  const courses = await getAllCoursesAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-accent" />
          <div>
            <h1 className="text-2xl font-bold text-white">Courses</h1>
            <p className="text-white/50 text-sm">{courses.length} training programs</p>
          </div>
        </div>
        <Link
          href="/admin/courses/new"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00d4ff] to-[#00b2d6] rounded-lg text-white font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Course
        </Link>
      </div>

      <div className="space-y-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex items-center justify-between p-4 bg-[#14141f] border border-white/[0.08] rounded-xl hover:border-white/20 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="font-semibold text-white flex items-center gap-2">
                  {course.title}
                  {course.featured && <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />}
                </div>
                <div className="text-white/40 text-xs">{course.duration} · {course.level} · {course.price ? `₹${course.price.toLocaleString()}` : 'Free'}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                course.published
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
              }`}>
                {course.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                {course.published ? 'Published' : 'Draft'}
              </span>
              <Link
                href={`/admin/courses/${course.id}/edit`}
                className="p-2 hover:bg-white/5 rounded-lg text-white/50 hover:text-white transition-all"
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <DeleteButton id={course.id} endpoint="/api/admin/courses" label="course" />
            </div>
          </div>
        ))}

        {courses.length === 0 && (
          <div className="text-center py-16 text-white/30">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No courses yet. Add your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
