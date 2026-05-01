'use client';

import { useState } from 'react';
import { Star, Plus, Trash2, Loader2, Save, Edit3, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  company: string | null;
  role: string | null;
  rating: number;
  order: number;
  published: boolean;
}

export function TestimonialsManager({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const emptyForm = { quote: '', name: '', company: '', role: '', rating: 5, order: 0, published: true };
  const [form, setForm] = useState(emptyForm);

  async function handleSave() {
    setLoading(true);
    const url = '/api/admin/testimonials';
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { id: editing.id, ...form } : form;
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setEditing(null);
    setCreating(false);
    setForm(emptyForm);
    router.refresh();
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this testimonial?')) return;
    await fetch('/api/admin/testimonials', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    router.refresh();
  }

  function startEdit(t: Testimonial) {
    setEditing(t);
    setForm({ quote: t.quote, name: t.name, company: t.company || '', role: t.role || '', rating: t.rating, order: t.order, published: t.published });
    setCreating(false);
  }

  const showForm = creating || editing;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Star className="w-6 h-6 text-yellow-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Testimonials</h1>
            <p className="text-white/50 text-sm">{testimonials.length} testimonials</p>
          </div>
        </div>
        <button
          onClick={() => { setCreating(true); setEditing(null); setForm(emptyForm); }}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 font-medium text-sm hover:bg-yellow-500/30 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-[#14141f] border border-white/[0.08] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-white">{editing ? 'Edit Testimonial' : 'New Testimonial'}</h2>
            <button onClick={() => { setEditing(null); setCreating(false); }} className="text-white/40 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <textarea className="adm-input resize-y w-full" rows={3} placeholder="Quote..." value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <input className="adm-input" placeholder="Client name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="adm-input" placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            <input className="adm-input" placeholder="Role / Title" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/50">Rating:</span>
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })} className={`w-6 h-6 transition-colors ${n <= form.rating ? 'text-yellow-400' : 'text-white/20'}`}>
                  <Star className="w-full h-full fill-current" />
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 px-5 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 font-medium text-sm hover:bg-yellow-500/30 disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {editing ? 'Save Changes' : 'Create'}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="flex items-start gap-4 p-4 bg-[#14141f] border border-white/[0.08] rounded-xl">
            <div className="flex-1">
              <p className="text-white/80 text-sm italic mb-2">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-2">
                <span className="font-medium text-white text-sm">{t.name}</span>
                {t.company && <span className="text-white/40 text-xs">· {t.company}</span>}
                {t.role && <span className="text-white/40 text-xs">· {t.role}</span>}
              </div>
              <div className="flex mt-1">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(t)} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all"><Edit3 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(t.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-white/30 hover:text-red-400 transition-all"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .adm-input { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.5rem; padding: 0.625rem 0.875rem; color: white; outline: none; }
        .adm-input::placeholder { color: rgba(255,255,255,0.3); }
        .adm-input:focus { border-color: rgba(234,179,8,0.5); }
      `}</style>
    </div>
  );
}
