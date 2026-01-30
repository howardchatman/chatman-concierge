'use client';

import { useAuth } from '@/lib/auth-context';
import { mockSystemStatus, mockIncidents } from '@/data/mockData';
import { Icon } from '@/components/icons';

const demoZones = [
  { name: 'Main Entrance', status: 'armed', cameras: 4, sensors: 6 },
  { name: 'East Wing', status: 'armed', cameras: 6, sensors: 8 },
  { name: 'West Wing', status: 'armed', cameras: 5, sensors: 7 },
  { name: 'Pool Area', status: 'armed', cameras: 8, sensors: 4 },
  { name: 'Guest House', status: 'armed', cameras: 4, sensors: 5 },
  { name: 'Garage Complex', status: 'armed', cameras: 6, sensors: 8 },
];

export default function SecurityPage() {
  const { isDemo, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#C9B370]/30 border-t-[#C9B370] rounded-full animate-spin" />
      </div>
    );
  }

  const status = isDemo ? mockSystemStatus : null;
  const incidents = isDemo ? mockIncidents : [];
  const zones = isDemo ? demoZones : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="overline mb-1">Physical Layer</p>
          <h1 className="text-headline font-serif text-text">Chief of Security</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
            status ? 'bg-status-secure/10 text-status-secure' : 'bg-silver/10 text-silver-400'
          }`}>
            <span className={`w-2 h-2 rounded-full ${status ? 'bg-status-secure shadow-[0_0_6px_rgba(74,222,128,0.5)]' : 'bg-silver-600'}`} />
            {status ? 'All Systems Nominal' : 'No Systems Connected'}
          </div>
        </div>
      </div>

      {/* Status Grid */}
      {status ? (
        <div className="grid grid-cols-5 gap-4">
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
              <span className={`w-2 h-2 rounded-full ${status.doors.open > 0 ? 'bg-status-warning' : 'bg-status-secure'}`} />
            </div>
            <p className="text-2xl font-serif text-text">{status.doors.locked}/{status.doors.total}</p>
            <p className="text-xs text-silver-600 mt-1">{status.doors.open} currently open</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-silver-500 uppercase tracking-wide">Cameras</span>
              <span className={`w-2 h-2 rounded-full ${status.cameras.offline > 0 ? 'bg-status-warning' : 'bg-status-secure'}`} />
            </div>
            <p className="text-2xl font-serif text-text">{status.cameras.online}/{status.cameras.total}</p>
            <p className="text-xs text-silver-600 mt-1">{status.cameras.offline} offline</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-silver-500 uppercase tracking-wide">Sensors</span>
              <span className="w-2 h-2 rounded-full bg-status-secure" />
            </div>
            <p className="text-2xl font-serif text-text">{status.sensors.active}/{status.sensors.total}</p>
            <p className="text-xs text-silver-600 mt-1">All active</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-silver-500 uppercase tracking-wide">Fire Safety</span>
              <span className="w-2 h-2 rounded-full bg-status-secure" />
            </div>
            <p className="text-2xl font-serif text-status-secure capitalize">{status.fire}</p>
            <p className="text-xs text-silver-600 mt-1">Systems nominal</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {['Perimeter', 'Doors', 'Cameras', 'Sensors', 'Fire Safety'].map((label) => (
            <div key={label} className="bg-surface border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-silver-500 uppercase tracking-wide">{label}</span>
                <span className="w-2 h-2 rounded-full bg-silver-600" />
              </div>
              <p className="text-2xl font-serif text-silver-600">—</p>
              <p className="text-xs text-silver-600 mt-1">No data yet</p>
            </div>
          ))}
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Zones */}
        <div className="col-span-2 bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-serif text-text">Security Zones</h2>
            <button className="text-xs text-[#C9B370] hover:text-[#D4C28A] transition-colors">
              Manage Zones
            </button>
          </div>
          {zones.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {zones.map((zone) => (
                <div
                  key={zone.name}
                  className="flex items-center justify-between p-4 bg-surface-elevated rounded-xl border border-border hover:border-[#C9B370]/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-status-secure shadow-[0_0_6px_rgba(74,222,128,0.4)]" />
                    <div>
                      <p className="text-sm text-text font-medium">{zone.name}</p>
                      <p className="text-xs text-silver-500 capitalize">{zone.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-silver-400">{zone.cameras} cameras</p>
                    <p className="text-xs text-silver-600">{zone.sensors} sensors</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-silver-500 text-center py-12">No security zones configured. Add zones to begin monitoring.</p>
          )}
        </div>

        {/* Incident Feed */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-serif text-text">Incident Feed</h2>
            <span className="text-xs text-silver-500">Last 24 hours</span>
          </div>
          <div className="space-y-3">
            {incidents.length > 0 ? (
              incidents.map((incident) => (
                <div
                  key={incident.id}
                  className="p-4 bg-surface-elevated rounded-xl border border-border"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1 ${
                      incident.severity === 'resolved' ? 'bg-status-secure' :
                      incident.severity === 'warning' ? 'bg-status-warning' :
                      incident.severity === 'alert' ? 'bg-status-alert animate-pulse' :
                      'bg-status-info'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-text font-medium">{incident.title}</p>
                      <p className="text-xs text-silver-500 mt-1 line-clamp-2">{incident.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-silver-600">
                          {new Date(incident.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {incident.acknowledged && (
                          <span className="text-xs text-silver-500">
                            ✓ {incident.acknowledgedBy}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-silver-500 text-center py-6">No incidents in the last 24 hours</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-[#C9B370]/5 to-transparent border border-[#C9B370]/20 rounded-xl p-6">
        <p className="overline mb-4">Quick Actions</p>
        <div className="flex gap-3">
          {[
            { label: 'Lock All Doors', icon: 'lock' },
            { label: 'Arm Perimeter', icon: 'shield' },
            { label: 'Night Lockdown', icon: 'moon' },
            { label: 'Review Cameras', icon: 'videocam' },
          ].map((action) => (
            <button
              key={action.label}
              className="flex items-center gap-2 px-4 py-2.5 bg-surface-elevated border border-border rounded-lg hover:border-[#C9B370]/30 transition-colors group"
            >
              <span className="text-silver-400 group-hover:text-[#C9B370] group-hover:scale-110 transition-all"><Icon name={action.icon} className="w-4 h-4" /></span>
              <span className="text-sm text-silver-300 group-hover:text-text transition-colors">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
