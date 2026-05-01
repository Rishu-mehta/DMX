import { getAllServicesAdmin } from '@/lib/data/services';
import Link from 'next/link';
import { Globe, Plus, Pencil, Eye, EyeOff } from 'lucide-react';
import { DeleteButton } from '@/components/admin/DeleteButton';

export default async function AdminServicesPage() {
  const services = await getAllServicesAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-white">Services</h1>
            <p className="text-white/50 text-sm">{services.length} services total</p>
          </div>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent rounded-lg text-white font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </Link>
      </div>

      <div className="space-y-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between p-4 bg-[#14141f] border border-white/[0.08] rounded-xl hover:border-white/20 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-white">{service.title}</div>
                <div className="text-white/40 text-xs font-mono">/{service.slug}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                service.published
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
              }`}>
                {service.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                {service.published ? 'Published' : 'Draft'}
              </span>
              <span className="text-white/30 text-xs">Order: {service.order}</span>
              <Link
                href={`/admin/services/${service.id}/edit`}
                className="p-2 hover:bg-white/5 rounded-lg text-white/50 hover:text-white transition-all"
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <DeleteButton id={service.id} endpoint="/api/admin/services" label="service" />
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="text-center py-16 text-white/30">
            <Globe className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No services yet. Add your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
