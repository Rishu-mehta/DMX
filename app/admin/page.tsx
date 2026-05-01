import { getDashboardStats } from '@/lib/data/misc';
import { LayoutDashboard, Globe, BookOpen, MessageSquare, Star } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    { label: 'Services', value: stats.services, icon: Globe, href: '/admin/services', color: 'from-primary/20 to-[#6c63ff]/5', iconColor: 'text-primary' },
    { label: 'Courses', value: stats.courses, icon: BookOpen, href: '/admin/courses', color: 'from-[#00d4ff]/20 to-accent/5', iconColor: 'text-accent' },
    { label: 'Testimonials', value: stats.testimonials, icon: Star, href: '/admin/testimonials', color: 'from-yellow-500/20 to-yellow-500/5', iconColor: 'text-yellow-400' },
    {
      label: 'Contact Inbox',
      value: stats.contacts,
      badge: stats.unreadContacts > 0 ? stats.unreadContacts : undefined,
      icon: MessageSquare,
      href: '/admin/contacts',
      color: 'from-green-500/20 to-green-500/5',
      iconColor: 'text-green-400',
    },
  ];

  const quickLinks = [
    { label: 'Add Service', href: '/admin/services/new' },
    { label: 'Add Course', href: '/admin/courses/new' },
    { label: 'Add Testimonial', href: '/admin/testimonials' },
    { label: 'Manage Team', href: '/admin/team' },
    { label: 'Site Settings', href: '/admin/settings' },
    { label: 'View Website', href: '/', external: true },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <LayoutDashboard className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white/50 text-sm">Welcome back to DMX Admin</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className={`relative p-6 bg-gradient-to-br ${card.color} border border-white/[0.08] rounded-xl hover:border-white/20 transition-all hover:scale-[1.02] group`}
            >
              {card.badge !== undefined && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {card.badge}
                </span>
              )}
              <Icon className={`w-8 h-8 ${card.iconColor} mb-3`} />
              <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
              <div className="text-white/50 text-sm">{card.label}</div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              className="p-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-center text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
            >
              {link.label}
              {link.external && ' ↗'}
            </Link>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl flex items-start gap-3">
        <div className="w-2 h-2 bg-accent rounded-full mt-1.5 flex-shrink-0" />
        <div>
          <p className="text-white/80 text-sm font-medium">CMS is powered by PostgreSQL + Prisma</p>
          <p className="text-white/50 text-xs mt-0.5">All content changes are reflected immediately on the public website.</p>
        </div>
      </div>
    </div>
  );
}
