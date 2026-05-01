import { getContactSubmissions } from '@/lib/data/misc';
import { MessageSquare, Mail, Phone, Clock, CheckCircle } from 'lucide-react';
import { MarkReadButton } from '@/components/admin/MarkReadButton';

export default async function AdminContactsPage() {
  const { submissions, total } = await getContactSubmissions(1, 50);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="w-6 h-6 text-green-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Contact Inbox</h1>
          <p className="text-white/50 text-sm">{total} submissions total</p>
        </div>
      </div>

      <div className="space-y-3">
        {submissions.map((sub) => (
          <div
            key={sub.id}
            className={`p-5 bg-[#14141f] border rounded-xl transition-all ${
              sub.read ? 'border-white/[0.06] opacity-70' : 'border-green-500/20 bg-green-500/[0.02]'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-white">{sub.name}</span>
                  {sub.enquiryType && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 capitalize">
                      {sub.enquiryType}
                    </span>
                  )}
                  {!sub.read && <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-white/50 mb-3">
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{sub.email}</span>
                  {sub.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{sub.phone}</span>}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(sub.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-white/70 text-sm whitespace-pre-line">{sub.message}</p>
              </div>
              <div className="flex-shrink-0">
                {!sub.read ? (
                  <MarkReadButton id={sub.id} />
                ) : (
                  <span className="flex items-center gap-1 text-xs text-white/30">
                    <CheckCircle className="w-3.5 h-3.5" /> Read
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {submissions.length === 0 && (
          <div className="text-center py-16 text-white/30">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No contact submissions yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
