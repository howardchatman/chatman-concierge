'use client';

import { useState } from 'react';
import { Icon } from '@/components/icons';
import ModalShell from './ModalShell';

const INITIAL_DOORS = [
  { id: 'd-1', name: 'Main Entry', zone: 'Main Entrance', locked: true },
  { id: 'd-2', name: 'Service Entry', zone: 'Main Entrance', locked: true },
  { id: 'd-3', name: 'East Wing French Doors', zone: 'East Wing', locked: false },
  { id: 'd-4', name: 'West Wing Patio', zone: 'West Wing', locked: false },
  { id: 'd-5', name: 'Pool Gate', zone: 'Pool Area', locked: true },
  { id: 'd-6', name: 'Guest House Front', zone: 'Guest House', locked: true },
  { id: 'd-7', name: 'Garage Bay Door', zone: 'Garage Complex', locked: true },
  { id: 'd-8', name: 'Master Suite Terrace', zone: 'East Wing', locked: true },
];

export default function DoorsModal({ onClose }: { onClose: () => void }) {
  const [doors, setDoors] = useState(INITIAL_DOORS);
  const [toggling, setToggling] = useState<string | null>(null);
  const [lockingAll, setLockingAll] = useState(false);

  const lockedCount = doors.filter((d) => d.locked).length;
  const openCount = doors.length - lockedCount;

  const toggleDoor = async (id: string) => {
    setToggling(id);
    await new Promise((r) => setTimeout(r, 600));
    setDoors((prev) => prev.map((d) => (d.id === id ? { ...d, locked: !d.locked } : d)));
    setToggling(null);
  };

  const lockAll = async () => {
    setLockingAll(true);
    const unlocked = doors.filter((d) => !d.locked);
    for (const door of unlocked) {
      setToggling(door.id);
      await new Promise((r) => setTimeout(r, 400));
      setDoors((prev) => prev.map((d) => (d.id === door.id ? { ...d, locked: true } : d)));
    }
    setToggling(null);
    setLockingAll(false);
  };

  return (
    <ModalShell
      title="Access Control"
      subtitle={`${lockedCount}/8 Locked · ${openCount} Open`}
      icon="lock"
      iconColor="text-[#C9B370]"
      onClose={onClose}
      footer={
        <button
          onClick={lockAll}
          disabled={lockingAll || openCount === 0}
          className="w-full bg-[#C9B370] hover:bg-[#B8A460] text-obsidian py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
        >
          {lockingAll ? 'Locking All...' : openCount === 0 ? 'All Doors Locked' : 'Lock All Doors'}
        </button>
      }
    >
      <div className="bg-surface-elevated border border-border rounded-2xl divide-y divide-border/50">
        {doors.map((door) => (
          <div key={door.id} className="flex items-center gap-3 px-4 py-3">
            <span className={door.locked ? 'text-status-secure' : 'text-status-warning'}>
              <Icon name="lock" className="w-4 h-4" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text truncate">{door.name}</p>
              <p className="text-[10px] text-silver-600">{door.zone}</p>
            </div>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
              door.locked ? 'bg-status-secure/10 text-status-secure' : 'bg-status-warning/10 text-status-warning'
            }`}>
              {door.locked ? 'Locked' : 'Open'}
            </span>
            <button
              onClick={() => toggleDoor(door.id)}
              disabled={toggling === door.id}
              className="px-3 py-1 rounded-lg text-xs font-medium border border-border hover:border-[#C9B370]/30 hover:text-[#C9B370] transition-all text-silver-400 disabled:opacity-50"
            >
              {toggling === door.id ? (
                <div className="w-4 h-4 border-2 border-silver-600/30 border-t-silver-400 rounded-full animate-spin" />
              ) : door.locked ? 'Unlock' : 'Lock'}
            </button>
          </div>
        ))}
      </div>
    </ModalShell>
  );
}
