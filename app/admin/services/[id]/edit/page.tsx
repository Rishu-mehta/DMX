import { getServiceById } from '@/lib/data/services';
import { ServiceForm } from '@/components/admin/ServiceForm';
import { notFound } from 'next/navigation';
import { Pencil } from 'lucide-react';

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Pencil className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Service</h1>
          <p className="text-white/50 text-sm">{service.title}</p>
        </div>
      </div>
      <div className="bg-[#14141f] border border-white/[0.08] rounded-xl p-6">
        <ServiceForm mode="edit" initialData={service} />
      </div>
    </div>
  );
}
