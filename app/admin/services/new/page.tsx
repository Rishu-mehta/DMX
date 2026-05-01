import { ServiceForm } from '@/components/admin/ServiceForm';
import { Globe } from 'lucide-react';

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Globe className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-white">Add Service</h1>
          <p className="text-white/50 text-sm">Create a new IT service</p>
        </div>
      </div>
      <div className="bg-[#14141f] border border-white/[0.08] rounded-xl p-6">
        <ServiceForm mode="create" />
      </div>
    </div>
  );
}
