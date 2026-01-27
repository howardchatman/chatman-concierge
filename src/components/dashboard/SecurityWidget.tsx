'use client';

import { mockSystemStatus, mockIncidents } from '@/data/mockData';

export default function SecurityWidget() {
  const status = mockSystemStatus;
  const incidents = mockIncidents.slice(0, 3);

  return (
    <div className="card-elevated">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-silver/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-silver" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-lg text-text">Chief of Security</h2>
            <p className="text-xs text-text-muted">Physical Layer</p>
          </div>
        </div>
        <div className="badge badge-secure">
          <span className="status-dot status-dot-secure" />
          All Systems Nominal
        </div>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Perimeter */}
        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted uppercase tracking-wide">Perimeter</span>
            <span className="status-dot status-dot-secure" />
          </div>
          <p className="text-lg font-medium text-status-secure">Secure</p>
          <p className="text-xs text-text-muted mt-1">Armed • All zones active</p>
        </div>

        {/* Doors */}
        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted uppercase tracking-wide">Doors</span>
            <span className={`status-dot ${status.doors.open > 0 ? 'status-dot-warning' : 'status-dot-secure'}`} />
          </div>
          <p className="text-lg font-medium text-text">
            {status.doors.locked}/{status.doors.total} <span className="text-text-muted text-sm">Locked</span>
          </p>
          <p className="text-xs text-text-muted mt-1">{status.doors.open} open</p>
        </div>

        {/* Cameras */}
        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted uppercase tracking-wide">Cameras</span>
            <span className={`status-dot ${status.cameras.offline > 0 ? 'status-dot-warning' : 'status-dot-secure'}`} />
          </div>
          <p className="text-lg font-medium text-text">
            {status.cameras.online}/{status.cameras.total} <span className="text-text-muted text-sm">Online</span>
          </p>
          <p className="text-xs text-text-muted mt-1">{status.cameras.offline} offline</p>
        </div>

        {/* Sensors */}
        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted uppercase tracking-wide">Sensors</span>
            <span className="status-dot status-dot-secure" />
          </div>
          <p className="text-lg font-medium text-text">
            {status.sensors.active}/{status.sensors.total} <span className="text-text-muted text-sm">Active</span>
          </p>
          <p className="text-xs text-text-muted mt-1">No alerts</p>
        </div>
      </div>

      {/* Recent Incidents */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-text-secondary">Recent Activity</h3>
          <button className="text-xs text-silver hover:text-silver-200 transition-colors">View All</button>
        </div>
        <div className="space-y-2">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-border hover:border-border-light transition-colors"
            >
              <div className={`w-2 h-2 rounded-full ${
                incident.severity === 'resolved' ? 'bg-status-secure' :
                incident.severity === 'warning' ? 'bg-status-warning' :
                incident.severity === 'alert' ? 'bg-status-alert' :
                'bg-status-info'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text truncate">{incident.title}</p>
                <p className="text-xs text-text-muted">{new Date(incident.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              {incident.acknowledged && (
                <span className="text-xs text-text-muted">Acknowledged</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
