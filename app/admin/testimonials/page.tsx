import { getAllTestimonialsAdmin } from '@/lib/data/misc';
import { TestimonialsManager } from '@/components/admin/TestimonialsManager';

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonialsAdmin();
  return <TestimonialsManager initialTestimonials={testimonials} />;
}
