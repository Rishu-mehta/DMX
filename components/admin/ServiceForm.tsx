'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Plus, Loader2, Trash2, Save } from 'lucide-react';

interface ServiceFormProps {
  initialData?: {
    id?: string;
    title?: string;
    slug?: string;
    description?: string;
    icon?: string;
    features?: string[];
    techStack?: string[];
    order?: number;
    published?: boolean;
  };
  mode: 'create' | 'edit';
}

export function ServiceForm({ initialData = {}, mode }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState(initialData.title || '');
  const [slug, setSlug] = useState(initialData.slug || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [icon, setIcon] = useState(initialData.icon || 'Globe');
  const [features, setFeatures] = useState<string[]>(initialData.features || ['']);
  const [techStack, setTechStack] = useState<string[]>(initialData.techStack || ['']);
  const [order, setOrder] = useState(initialData.order ?? 0);
  const [published, setPublished] = useState(initialData.published ?? true);

  const autoSlug = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      title,
      slug,
      description,
      icon,
      features: features.filter(Boolean),
      techStack: techStack.filter(Boolean),
      order,
      published,
    };

    const url = mode === 'create' ? '/api/admin/services' : `/api/admin/services/${initialData.id}`;
    const method = mode === 'create' ? 'POST' : 'PUT';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Something went wrong');
      setLoading(false);
      return;
    }

    router.push('/admin/services');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="label">Title</label>
          <input
            className="input"
            value={title}
            onChange={(e) => { setTitle(e.target.value); if (mode === 'create') setSlug(autoSlug(e.target.value)); }}
            required
            placeholder="Mobile Application Development"
          />
        </div>

        <div>
          <label className="label">Slug</label>
          <input className="input font-mono" value={slug} onChange={(e) => setSlug(autoSlug(e.target.value))} required placeholder="mobile-app-development" />
        </div>

        <div>
          <label className="label">Icon (lucide name)</label>
          <input className="input" value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="Globe" />
        </div>

        <div className="col-span-2">
          <label className="label">Description</label>
          <textarea className="input min-h-[100px] resize-y" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} />
        </div>
      </div>

      {/* Features */}
      <div>
        <label className="label">Features</label>
        <div className="space-y-2">
          {features.map((f, i) => (
            <div key={i} className="flex gap-2">
              <input className="input flex-1" value={f} onChange={(e) => { const n = [...features]; n[i] = e.target.value; setFeatures(n); }} placeholder={`Feature ${i + 1}`} />
              <button type="button" onClick={() => setFeatures(features.filter((_, j) => j !== i))} className="p-2 hover:bg-red-500/10 rounded-lg text-white/30 hover:text-red-400 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => setFeatures([...features, ''])} className="flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Feature
          </button>
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <label className="label">Tech Stack</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {techStack.map((t, i) => (
            <div key={i} className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-3 py-1">
              <input className="bg-transparent text-white text-sm outline-none w-24" value={t} onChange={(e) => { const n = [...techStack]; n[i] = e.target.value; setTechStack(n); }} />
              <button type="button" onClick={() => setTechStack(techStack.filter((_, j) => j !== i))} className="text-white/30 hover:text-red-400">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setTechStack([...techStack, ''])} className="flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors">
          <Plus className="w-3.5 h-3.5" /> Add Tech
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Display Order</label>
          <input type="number" className="input" value={order} onChange={(e) => setOrder(parseInt(e.target.value) || 0)} />
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className={`w-10 h-6 rounded-full transition-colors ${published ? 'bg-green-500' : 'bg-white/20'} relative`} onClick={() => setPublished(!published)}>
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${published ? 'translate-x-5' : 'translate-x-1'}`} />
            </div>
            <span className="text-sm text-white/70">{published ? 'Published' : 'Draft'}</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-accent rounded-lg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {mode === 'create' ? 'Create Service' : 'Save Changes'}
        </button>
        <a href="/admin/services" className="px-6 py-2.5 border border-white/10 rounded-lg text-white/60 hover:text-white hover:border-white/30 transition-all">
          Cancel
        </a>
      </div>

      <style>{`
        .label { display: block; font-size: 0.875rem; font-weight: 500; color: rgba(255,255,255,0.7); margin-bottom: 0.375rem; }
        .input { display: block; width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.5rem; padding: 0.625rem 0.875rem; color: white; outline: none; transition: border-color 0.2s; }
        .input:focus { border-color: rgba(240,14,20,0.5); }
        .input::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>
    </form>
  );
}
