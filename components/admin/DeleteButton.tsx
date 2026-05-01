'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';

interface DeleteButtonProps {
  id: string;
  endpoint: string;
  label: string;
}

export function DeleteButton({ id, endpoint, label }: DeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  async function handleDelete() {
    if (!confirm) {
      setConfirm(true);
      setTimeout(() => setConfirm(false), 3000);
      return;
    }
    setLoading(true);
    await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`p-2 rounded-lg transition-all ${
        confirm
          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
          : 'hover:bg-red-500/10 text-white/30 hover:text-red-400'
      }`}
      title={confirm ? `Click again to confirm delete ${label}` : `Delete ${label}`}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
