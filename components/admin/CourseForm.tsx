'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Plus, Loader2, Trash2, Save } from 'lucide-react';

interface Module { module: string; topics: string[] }

interface CourseFormProps {
  initialData?: {
    id?: string;
    title?: string;
    slug?: string;
    duration?: string;
    level?: string;
    description?: string;
    curriculum?: Module[];
    price?: number | null;
    instructor?: string | null;
    featured?: boolean;
    order?: number;
    published?: boolean;
  };
  mode: 'create' | 'edit';
}

export function CourseForm({ initialData = {}, mode }: CourseFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState(initialData.title || '');
  const [slug, setSlug] = useState(initialData.slug || '');
  const [duration, setDuration] = useState(initialData.duration || '');
  const [level, setLevel] = useState(initialData.level || 'Intermediate');
  const [description, setDescription] = useState(initialData.description || '');
  const [curriculum, setCurriculum] = useState<Module[]>(
    initialData.curriculum && Array.isArray(initialData.curriculum) ? initialData.curriculum as Module[] : [{ module: '', topics: [''] }]
  );
  const [price, setPrice] = useState(initialData.price?.toString() || '');
  const [instructor, setInstructor] = useState(initialData.instructor || '');
  const [featured, setFeatured] = useState(initialData.featured ?? false);
  const [order, setOrder] = useState(initialData.order ?? 0);
  const [published, setPublished] = useState(initialData.published ?? true);

  const autoSlug = (v: string) => v.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      title, slug, duration, level, description,
      curriculum: curriculum.filter(m => m.module),
      price: price ? parseFloat(price) : undefined,
      instructor: instructor || undefined,
      featured, order, published,
    };

    const url = mode === 'create' ? '/api/admin/courses' : `/api/admin/courses/${initialData.id}`;
    const res = await fetch(url, {
      method: mode === 'create' ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const d = await res.json();
      setError(d.error || 'Something went wrong');
      setLoading(false);
      return;
    }
    router.push('/admin/courses');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="label">Title</label>
          <input className="input" value={title} onChange={(e) => { setTitle(e.target.value); if (mode === 'create') setSlug(autoSlug(e.target.value)); }} required />
        </div>
        <div>
          <label className="label">Slug</label>
          <input className="input font-mono" value={slug} onChange={(e) => setSlug(autoSlug(e.target.value))} required />
        </div>
        <div>
          <label className="label">Level</label>
          <select className="input" value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label className="label">Duration</label>
          <input className="input" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="3 months" required />
        </div>
        <div>
          <label className="label">Price (₹)</label>
          <input className="input" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="19999" />
        </div>
        <div>
          <label className="label">Instructor</label>
          <input className="input" value={instructor} onChange={(e) => setInstructor(e.target.value)} placeholder="DMX Expert Team" />
        </div>
        <div>
          <label className="label">Display Order</label>
          <input type="number" className="input" value={order} onChange={(e) => setOrder(parseInt(e.target.value) || 0)} />
        </div>
        <div className="col-span-2">
          <label className="label">Description</label>
          <textarea className="input resize-y" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
      </div>

      {/* Curriculum */}
      <div>
        <label className="label mb-3">Curriculum Modules</label>
        <div className="space-y-4">
          {curriculum.map((mod, mi) => (
            <div key={mi} className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-lg space-y-3">
              <div className="flex gap-2">
                <input className="input flex-1" value={mod.module} onChange={(e) => { const c = [...curriculum]; c[mi].module = e.target.value; setCurriculum(c); }} placeholder="Module name" />
                <button type="button" onClick={() => setCurriculum(curriculum.filter((_, j) => j !== mi))} className="p-2 hover:bg-red-500/10 rounded text-white/30 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 pl-2">
                {mod.topics.map((t, ti) => (
                  <div key={ti} className="flex gap-2">
                    <input className="input flex-1 text-sm" value={t} onChange={(e) => { const c = [...curriculum]; c[mi].topics[ti] = e.target.value; setCurriculum(c); }} placeholder={`Topic ${ti + 1}`} />
                    <button type="button" onClick={() => { const c = [...curriculum]; c[mi].topics = c[mi].topics.filter((_, j) => j !== ti); setCurriculum(c); }} className="p-1.5 text-white/20 hover:text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => { const c = [...curriculum]; c[mi].topics.push(''); setCurriculum(c); }} className="text-xs text-white/40 hover:text-white flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Add Topic
                </button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setCurriculum([...curriculum, { module: '', topics: [''] }])} className="mt-3 flex items-center gap-1 text-sm text-white/50 hover:text-white">
          <Plus className="w-3.5 h-3.5" /> Add Module
        </button>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <div className={`w-10 h-6 rounded-full transition-colors ${featured ? 'bg-yellow-500' : 'bg-white/20'} relative`} onClick={() => setFeatured(!featured)}>
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${featured ? 'translate-x-5' : 'translate-x-1'}`} />
          </div>
          <span className="text-sm text-white/70">Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <div className={`w-10 h-6 rounded-full transition-colors ${published ? 'bg-green-500' : 'bg-white/20'} relative`} onClick={() => setPublished(!published)}>
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${published ? 'translate-x-5' : 'translate-x-1'}`} />
          </div>
          <span className="text-sm text-white/70">{published ? 'Published' : 'Draft'}</span>
        </label>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#00d4ff] to-[#00b2d6] rounded-lg text-white font-medium hover:opacity-90 disabled:opacity-50">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {mode === 'create' ? 'Create Course' : 'Save Changes'}
        </button>
        <a href="/admin/courses" className="px-6 py-2.5 border border-white/10 rounded-lg text-white/60 hover:text-white hover:border-white/30 transition-all">Cancel</a>
      </div>

      <style>{`
        .label { display: block; font-size: 0.875rem; font-weight: 500; color: rgba(255,255,255,0.7); margin-bottom: 0.375rem; }
        .input { display: block; width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.5rem; padding: 0.625rem 0.875rem; color: white; outline: none; transition: border-color 0.2s; }
        .input:focus { border-color: rgba(50,135,211,0.5); }
        .input::placeholder { color: rgba(255,255,255,0.3); }
        select.input option { background: #14141f; }
      `}</style>
    </form>
  );
}
