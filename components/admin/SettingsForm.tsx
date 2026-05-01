'use client';

import { useState } from 'react';
import { Settings, Save, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SiteSettingsData {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  linkedIn: string | null;
  twitter: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
}

export function SettingsForm({ settings }: { settings: SiteSettingsData | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    companyName: settings?.companyName || 'DMX Tech Services',
    email: settings?.email || 'info@dmxtechservices.com',
    phone: settings?.phone || '',
    address: settings?.address || '',
    linkedIn: settings?.linkedIn || '',
    twitter: settings?.twitter || '',
    instagram: settings?.instagram || '',
    facebook: settings?.facebook || '',
    youtube: settings?.youtube || '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setLoading(false);
    router.refresh();
  }

  const Field = ({ label, field, type = 'text', placeholder = '' }: { label: string; field: keyof typeof form; type?: string; placeholder?: string }) => (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-1.5">{label}</label>
      <input
        type={type}
        className="block w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-all"
        value={form[field]}
        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="w-6 h-6 text-white/60" />
        <div>
          <h1 className="text-2xl font-bold text-white">Site Settings</h1>
          <p className="text-white/50 text-sm">Manage company info and social links</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="bg-[#14141f] border border-white/[0.08] rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Company Info</h2>
          <Field label="Company Name" field="companyName" placeholder="DMX Tech Services" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Email" field="email" type="email" placeholder="info@dmxtechservices.com" />
            <Field label="Phone" field="phone" placeholder="+91 9876543210" />
          </div>
          <Field label="Address" field="address" placeholder="Hyderabad, India" />
        </div>

        <div className="bg-[#14141f] border border-white/[0.08] rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Social Links</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="LinkedIn URL" field="linkedIn" placeholder="https://linkedin.com/..." />
            <Field label="Twitter/X URL" field="twitter" placeholder="https://twitter.com/..." />
            <Field label="Instagram URL" field="instagram" placeholder="https://instagram.com/..." />
            <Field label="Facebook URL" field="facebook" placeholder="https://facebook.com/..." />
            <Field label="YouTube URL" field="youtube" placeholder="https://youtube.com/..." />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all ${
            saved ? 'bg-green-600' : 'bg-gradient-to-r from-primary to-accent hover:opacity-90'
          } disabled:opacity-50`}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
