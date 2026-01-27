'use client';

import { mockSystemStatus } from '@/data/mockData';

export default function SystemStatusWidget() {
  const status = mockSystemStatus;

  const systems = [
    { name: 'Power', status: status.power, icon: '⚡' },
    { name: 'Water', status: status.water, icon: '💧' },
    { name: 'Fire Safety', status: status.fire, icon: '🔥' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-status-secure';
      case 'warning': return 'text-status-warning';
      case 'alert': return 'text-status-alert';
      default: return 'text-text-muted';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'normal': return 'status-dot-secure';
      case 'warning': return 'status-dot-warning';
      case 'alert': return 'status-dot-alert';
      default: return 'bg-text-muted';
    }
  };

  return (
    <div className="card-elevated">
      <h3 className="text-sm font-medium text-text mb-4">System Status</h3>

      <div className="space-y-3">
        {systems.map((system) => (
          <div
            key={system.name}
            className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{system.icon}</span>
              <span className="text-sm text-text">{system.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs capitalize ${getStatusColor(system.status)}`}>
                {system.status}
              </span>
              <span className={`status-dot ${getStatusDot(system.status)}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
