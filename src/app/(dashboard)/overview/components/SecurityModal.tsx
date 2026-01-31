'use client';

import { useState } from 'react';
import { Icon } from '@/components/icons';
import ModalShell from './ModalShell';

const INITIAL_ZONES = [
  { name: 'Main Entrance', cameras: 6, sensors: 12, armed: true },
  { name: 'East Wing', cameras: 5, sensors: 8, armed: true },
  { name: 'West Wing', cameras: 5, sensors: 8, armed: true },
  { name: 'Pool Area', cameras: 6, sensors: 8, armed: true },
  { name: 'Guest House', cameras: 4, sensors: 6, armed: true },
  { name: 'Garage Complex', cameras: 6, sensors: 6, armed: true },
];

export default function SecurityModal({ onClose }: { onClose: () => void }) {
  const [zones, setZones] = useState(INITIAL_ZONES);
  const [toggling, setToggling] = useState<string | null>(null);

  const armedCount = zones.filter((z) => z.armed).length;
  const totalCameras = zones.reduce((a, z) => a + z.cameras, 0);
  const totalSensors = zones.reduce((a, z) => a + z.sensors, 0);

  const toggleZone = async (name: string) => {
    setToggling(name);
    await new Promise((r) => setTimeout(r, 800));
    setZones((prev) => prev.map((z) => (z.name === name ? { ...z, armed: !z.armed } : z)));
    setToggling(null);
  };

  const setAllZones = async (armed: boolean) => {
    const targets = zones.filter((z) => z.armed !== armed);
    for (const zone of targets) {
      setToggling(zone.name);
      await new Promise((r) => setTimeout(r, 500));
      setZones((prev) => prev.map((z) => (z.name === zone.name ? { ...z, armed } : z)));
    }
    setToggling(null);
  };

  return (
    <ModalShell
      title="Perimeter Security"
      subtitle={`${armedCount}/6 zones armed · ${totalSensors} sensors · ${totalCameras} cameras`}
      icon="shield"
      iconColor="text-status-secure"
      onClose={onClose}
      footer={
        <div className="flex gap-3">
          <button
            onClick={() => setAllZones(false)}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-silver-400 border border-border hover:border-status-warning/30 hover:text-status-warning transition-all"
          >
            Disarm All
          </button>
          <button
            onClick={() => setAllZones(true)}
            className="flex-1 bg-status-secure/15 text-status-secure py-2.5 rounded-xl text-sm font-medium hover:bg-status-secure/25 transition-colors"
          >
            Arm All Zones
          </button>
        </div>
      }
    >
      {/* Status Banner */}
      <div className={`rounded-xl p-3 mb-4 flex items-center gap-3 ${
        armedCount === zones.length ? 'bg-status-secure/10 border border-status-secure/20' : 'bg-status-warning/10 border border-status-warning/20'
      }`}>
        <span className={`w-3 h-3 rounded-full ${
          armedCount === zones.length ? 'bg-status-secure shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-status-warning animate-pulse'
        }`} />
        <span className={`text-sm font-medium ${armedCount === zones.length ? 'text-status-secure' : 'text-status-warning'}`}>
          {armedCount === zones.length ? 'Perimeter Secure' : `${zones.length - armedCount} Zone${zones.length - armedCount > 1 ? 's' : ''} Disarmed`}
        </span>
      </div>

      {/* Zone List */}
      <div className="space-y-2">
        {zones.map((zone) => (
          <div key={zone.name} className="flex items-center gap-3 p-3 rounded-xl bg-surface-elevated border border-border">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              zone.armed ? 'bg-status-secure/10' : 'bg-status-warning/10'
            }`}>
              <Icon name="shield" className={`w-4 h-4 ${zone.armed ? 'text-status-secure' : 'text-status-warning'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text">{zone.name}</p>
              <p className="text-[10px] text-silver-600">{zone.cameras} cameras · {zone.sensors} sensors</p>
            </div>
            {/* Toggle */}
            <button
              onClick={() => toggleZone(zone.name)}
              disabled={toggling !== null}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                zone.armed ? 'bg-status-secure' : 'bg-surface-overlay border border-border-light'
              }`}
            >
              {toggling === zone.name ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              ) : (
                <span className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white transition-transform duration-300 ${
                  zone.armed ? 'left-[22px]' : 'left-[3px]'
                }`} />
              )}
            </button>
          </div>
        ))}
      </div>
    </ModalShell>
  );
}
