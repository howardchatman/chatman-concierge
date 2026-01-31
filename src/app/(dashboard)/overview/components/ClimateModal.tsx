'use client';

import { useState } from 'react';
import { Icon } from '@/components/icons';
import ModalShell from './ModalShell';

const INITIAL_ZONES = [
  { name: 'Main Residence', temp: 72, mode: 'cooling', humidity: 45 },
  { name: 'Guest House', temp: 74, mode: 'cooling', humidity: 48 },
  { name: 'Pool House', temp: 68, mode: 'off', humidity: 52 },
];

const MODES = [
  { value: 'cooling', label: 'Cool', color: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
  { value: 'heating', label: 'Heat', color: 'text-orange-400 bg-orange-400/10 border-orange-400/30' },
  { value: 'off', label: 'Off', color: 'text-silver-500 bg-silver/10 border-border' },
];

export default function ClimateModal({ onClose }: { onClose: () => void }) {
  const [zones, setZones] = useState(INITIAL_ZONES);
  const [saving, setSaving] = useState(false);

  const updateZone = (index: number, updates: Partial<typeof INITIAL_ZONES[0]>) => {
    setZones((prev) => prev.map((z, i) => (i === index ? { ...z, ...updates } : z)));
  };

  const handleApply = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    onClose();
  };

  return (
    <ModalShell
      title="Climate Control"
      subtitle="3 zones active"
      icon="thermometer"
      iconColor="text-orange-400"
      onClose={onClose}
      footer={
        <div className="flex gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-medium text-silver-400 border border-border hover:border-border-light transition-all">
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={saving}
            className="flex-1 bg-[#C9B370] hover:bg-[#B8A460] text-obsidian py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
          >
            {saving ? 'Applying...' : 'Apply Changes'}
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        {zones.map((zone, i) => (
          <div key={zone.name} className="rounded-xl bg-surface-elevated border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-text font-medium">{zone.name}</p>
                <p className="text-[10px] text-silver-600">Humidity: {zone.humidity}%</p>
              </div>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium ${
                zone.mode === 'cooling' ? 'bg-blue-400/10 text-blue-400' :
                zone.mode === 'heating' ? 'bg-orange-400/10 text-orange-400' :
                'bg-silver/10 text-silver-500'
              }`}>
                <Icon name="thermometer" className="w-3 h-3" />
                {zone.mode === 'cooling' ? 'Cooling' : zone.mode === 'heating' ? 'Heating' : 'Off'}
              </div>
            </div>

            {/* Temperature Control */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <button
                onClick={() => updateZone(i, { temp: Math.max(60, zone.temp - 1) })}
                className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-silver-400 hover:text-text hover:border-border-light transition-all text-lg"
              >
                -
              </button>
              <div className="text-center">
                <span className="font-serif text-4xl text-text">{zone.temp}</span>
                <span className="text-lg text-silver-500">°F</span>
              </div>
              <button
                onClick={() => updateZone(i, { temp: Math.min(85, zone.temp + 1) })}
                className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-silver-400 hover:text-text hover:border-border-light transition-all text-lg"
              >
                +
              </button>
            </div>

            {/* Mode Selector */}
            <div className="flex gap-2">
              {MODES.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => updateZone(i, { mode: mode.value })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    zone.mode === mode.value ? mode.color : 'text-silver-600 border-border bg-transparent hover:border-border-light'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ModalShell>
  );
}
