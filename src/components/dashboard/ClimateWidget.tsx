'use client';

import { mockSystemStatus } from '@/data/mockData';

export default function ClimateWidget() {
  const climate = mockSystemStatus.climate;

  return (
    <div className="card-elevated">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-silver/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-silver" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-text">Climate Control</h3>
        </div>
        <span className="text-xs text-text-muted capitalize">{climate.mode}</span>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-4xl font-serif text-text">{climate.temperature}°</p>
          <p className="text-xs text-text-muted mt-1">Current Temperature</p>
        </div>
        <div className="text-right">
          <p className="text-lg text-text-secondary">{climate.humidity}%</p>
          <p className="text-xs text-text-muted">Humidity</p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="flex-1 py-2 rounded-lg bg-surface border border-border text-text-secondary text-sm hover:border-border-light transition-colors">
          −
        </button>
        <button className="flex-1 py-2 rounded-lg bg-surface border border-border text-text-secondary text-sm hover:border-border-light transition-colors">
          +
        </button>
      </div>
    </div>
  );
}
