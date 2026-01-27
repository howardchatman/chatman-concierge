'use client';

import { mockSystemStatus, mockIncidents, mockRequests, mockActivity } from '@/data/mockData';

export default function OverviewPage() {
  const pendingRequests = mockRequests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="overline mb-1">Good afternoon</p>
          <h1 className="text-headline font-serif text-text">Alexander</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-silver-600">Last updated</span>
          <span className="text-xs text-silver-400">Just now</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-silver-500 uppercase tracking-wide">Perimeter</span>
            <span className="w-2 h-2 rounded-full bg-status-secure shadow-[0_0_6px_rgba(74,222,128,0.5)]" />
          </div>
          <p className="text-2xl font-serif text-status-secure">Secure</p>
          <p className="text-xs text-silver-600 mt-1">All zones armed</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-silver-500 uppercase tracking-wide">Doors</span>
            <span className="w-2 h-2 rounded-full bg-status-warning" />
          </div>
          <p className="text-2xl font-serif text-text">{mockSystemStatus.doors.locked}/{mockSystemStatus.doors.total}</p>
          <p className="text-xs text-silver-600 mt-1">{mockSystemStatus.doors.open} open</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-silver-500 uppercase tracking-wide">Cameras</span>
            <span className={`w-2 h-2 rounded-full ${mockSystemStatus.cameras.offline > 0 ? 'bg-status-warning' : 'bg-status-secure'}`} />
          </div>
          <p className="text-2xl font-serif text-text">{mockSystemStatus.cameras.online}/{mockSystemStatus.cameras.total}</p>
          <p className="text-xs text-silver-600 mt-1">{mockSystemStatus.cameras.offline} offline</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-silver-500 uppercase tracking-wide">Climate</span>
          </div>
          <p className="text-2xl font-serif text-text">{mockSystemStatus.climate.temperature}°F</p>
          <p className="text-xs text-silver-600 mt-1 capitalize">{mockSystemStatus.climate.mode}</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Chief of Security Summary */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C9B370]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#C9B370]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <h2 className="text-text font-medium">Chief of Security</h2>
                <p className="text-xs text-silver-500">Physical Layer</p>
              </div>
            </div>
            <a href="/security" className="text-xs text-[#C9B370] hover:text-[#D4C28A] transition-colors">
              View All →
            </a>
          </div>
          <div className="space-y-2">
            {mockIncidents.slice(0, 3).map((incident) => (
              <div key={incident.id} className="flex items-center gap-3 p-3 bg-surface-elevated rounded-lg">
                <span className={`w-2 h-2 rounded-full ${
                  incident.severity === 'resolved' ? 'bg-status-secure' :
                  incident.severity === 'warning' ? 'bg-status-warning' :
                  'bg-status-info'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text truncate">{incident.title}</p>
                  <p className="text-xs text-silver-600">{new Date(incident.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chief of Staff Summary */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C9B370]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#C9B370]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
                </svg>
              </div>
              <div>
                <h2 className="text-text font-medium">Chief of Staff</h2>
                <p className="text-xs text-silver-500">Cloud Layer</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {pendingRequests.length > 0 && (
                <span className="px-2 py-0.5 rounded-md bg-[#C9B370] text-obsidian text-xs font-medium">
                  {pendingRequests.length} Pending
                </span>
              )}
              <a href="/staff" className="text-xs text-[#C9B370] hover:text-[#D4C28A] transition-colors">
                View All →
              </a>
            </div>
          </div>
          <div className="space-y-2">
            {mockActivity.slice(0, 3).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-surface-elevated rounded-lg">
                <span className="text-lg">{activity.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text truncate">{activity.title}</p>
                  <p className="text-xs text-silver-600">{activity.timestamp}</p>
                </div>
                {activity.actionable && (
                  <button className="text-xs text-[#C9B370] hover:text-[#D4C28A] transition-colors whitespace-nowrap">
                    {activity.actionLabel}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Concierge Insight */}
      <div className="bg-gradient-to-r from-[#C9B370]/5 to-transparent border border-[#C9B370]/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#C9B370]/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-[#C9B370]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-lg text-text mb-1">AI Concierge Insight</h3>
            <p className="text-sm text-silver-400 mb-3">
              Based on your schedule, I've pre-conditioned the master suite to 72°F and queued your preferred evening playlist.
              The landscaping crew finished early — photos are ready for your review.
            </p>
            <div className="flex gap-3">
              <button className="text-xs text-silver-400 hover:text-text transition-colors">View Details</button>
              <button className="text-xs text-silver-600 hover:text-silver-400 transition-colors">Dismiss</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
