import { getTeamMembers } from '@/lib/data/misc';
import { Users, Plus, Pencil } from 'lucide-react';
import { DeleteButton } from '@/components/admin/DeleteButton';
import Link from 'next/link';

export default async function AdminTeamPage() {
  const members = await getTeamMembers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-accent" />
          <div>
            <h1 className="text-2xl font-bold text-white">Team Members</h1>
            <p className="text-white/50 text-sm">{members.length} members</p>
          </div>
        </div>
        <Link
          href="/admin/team/new"
          className="flex items-center gap-2 px-4 py-2 bg-accent/20 border border-accent/30 rounded-lg text-accent font-medium text-sm hover:bg-accent/30 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Member
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {members.map((member) => (
          <div key={member.id} className="flex items-start gap-4 p-4 bg-[#14141f] border border-white/[0.08] rounded-xl">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {member.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white">{member.name}</div>
              <div className="text-accent text-sm">{member.role}</div>
              {member.bio && <p className="text-white/40 text-xs mt-1 line-clamp-2">{member.bio}</p>}
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/team/${member.id}/edit`} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all">
                <Pencil className="w-4 h-4" />
              </Link>
              <DeleteButton id={member.id} endpoint="/api/admin/team" label="team member" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
