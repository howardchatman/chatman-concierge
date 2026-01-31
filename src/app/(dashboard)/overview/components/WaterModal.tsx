'use client';

import { useState } from 'react';
import { Icon } from '@/components/icons';
import ModalShell from './ModalShell';

const INITIAL_VALVES = [
  { name: 'Main Residence', open: true, protected: false },
  { name: 'Guest House', open: true, protected: false },
  { name: 'Pool & Spa', open: true, protected: false },
  { name: 'Irrigation North', open: false, protected: false },
  { name: 'Irrigation South', open: false, protected: false },
  { name: 'Fire Suppression', open: true, protected: true },
];

export default function WaterModal({ onClose }: { onClose: () => void }) {
  const [mainShutoff, setMainShutoff] = useState(true);
  const [valves, setValves] = useState(INITIAL_VALVES);
  const [toggling, setToggling] = useState<string | null>(null);

  const toggleValve = async (name: string) => {
    setToggling(name);
    await new Promise((r) => setTimeout(r, 600));
    setValves((prev) => prev.map((v) => (v.name === name ? { ...v, open: !v.open } : v)));
    setToggling(null);
  };

  const toggleMainShutoff = async () => {
    setToggling('main');
    await new Promise((r) => setTimeout(r, 1000));
    setMainShutoff((prev) => !prev);
    if (mainShutoff) {
      // Shutting off closes all non-protected valves
      setValves((prev) => prev.map((v) => (v.protected ? v : { ...v, open: false })));
    }
    setToggling(null);
  };

  const openCount = valves.filter((v) => v.open).length;

  return (
    <ModalShell
      title="Water System"
      subtitle={mainShutoff ? `Normal · ${openCount} zones active` : 'Main shutoff closed'}
      icon="droplet"
      iconColor="text-cyan-400"
      onClose={onClose}
    >
      {/* Status Banner */}
      <div className={`rounded-xl p-3 mb-4 flex items-center gap-3 ${
        mainShutoff ? 'bg-status-secure/10 border border-status-secure/20' : 'bg-status-alert/10 border border-status-alert/20'
      }`}>
        <span className={`w-3 h-3 rounded-full ${
          mainShutoff ? 'bg-status-secure shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-status-alert animate-pulse'
        }`} />
        <span className={`text-sm font-medium ${mainShutoff ? 'text-status-secure' : 'text-status-alert'}`}>
          {mainShutoff ? 'System Normal' : 'Water Supply Off'}
        </span>
      </div>

      {/* Pressure + Usage */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-surface-elevated border border-border rounded-xl p-3 text-center">
          <p className="font-serif text-lg text-text">62</p>
          <p className="text-[10px] text-silver-500">PSI</p>
        </div>
        <div className="bg-surface-elevated border border-border rounded-xl p-3 text-center">
          <p className="font-serif text-lg text-text">340</p>
          <p className="text-[10px] text-silver-500">Gal Today</p>
        </div>
        <div className="bg-surface-elevated border border-border rounded-xl p-3 text-center">
          <p className="font-serif text-lg text-text">8.2k</p>
          <p className="text-[10px] text-silver-500">Gal/Month</p>
        </div>
      </div>

      {/* Main Shutoff */}
      <div className="rounded-xl bg-surface-elevated border border-border p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text font-medium">Main Shutoff</p>
            <p className="text-[10px] text-status-warning">Caution: Controls all water supply</p>
          </div>
          <button
            onClick={toggleMainShutoff}
            disabled={toggling === 'main'}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
              mainShutoff ? 'bg-status-secure' : 'bg-status-alert'
            }`}
          >
            {toggling === 'main' ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            ) : (
              <span className={`absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white transition-transform duration-300 ${
                mainShutoff ? 'left-[29px]' : 'left-[3px]'
              }`} />
            )}
          </button>
        </div>
      </div>

      {/* Zone Valves */}
      <div>
        <p className="text-xs text-silver-300 font-medium uppercase tracking-wider mb-2">Zone Valves</p>
        <div className="space-y-2">
          {valves.map((valve) => (
            <div key={valve.name} className="flex items-center gap-3 p-3 rounded-xl bg-surface-elevated border border-border">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                valve.open ? 'bg-cyan-400/10' : 'bg-silver/10'
              }`}>
                <Icon name="droplet" className={`w-4 h-4 ${valve.open ? 'text-cyan-400' : 'text-silver-600'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text">{valve.name}</p>
                <p className="text-[10px] text-silver-600">
                  {valve.protected ? 'Protected — always on' : valve.open ? 'Open — flowing' : 'Closed'}
                </p>
              </div>
              {valve.protected ? (
                <div className="flex items-center gap-1 text-[10px] text-silver-500">
                  <Icon name="lock" className="w-3 h-3" />
                  Protected
                </div>
              ) : (
                <button
                  onClick={() => toggleValve(valve.name)}
                  disabled={toggling !== null || !mainShutoff}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-300 disabled:opacity-40 ${
                    valve.open ? 'bg-cyan-400' : 'bg-surface-overlay border border-border-light'
                  }`}
                >
                  {toggling === valve.name ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  ) : (
                    <span className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white transition-transform duration-300 ${
                      valve.open ? 'left-[22px]' : 'left-[3px]'
                    }`} />
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </ModalShell>
  );
}
