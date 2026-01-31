'use client';

import { useEffect, useState } from 'react';
import ModalShell from './ModalShell';

const CAMERAS = [
  { id: 'CAM-01', name: 'Main Gate', zone: 'Main Entrance', online: true },
  { id: 'CAM-04', name: 'Front Door', zone: 'Main Entrance', online: true },
  { id: 'CAM-07', name: 'East Wing Hall', zone: 'East Wing', online: false },
  { id: 'CAM-12', name: 'Pool Deck North', zone: 'Pool Area', online: true },
  { id: 'CAM-15', name: 'Pool Deck South', zone: 'Pool Area', online: true },
  { id: 'CAM-20', name: 'Guest House Entry', zone: 'Guest House', online: true },
  { id: 'CAM-25', name: 'Garage Bay 1', zone: 'Garage Complex', online: true },
  { id: 'CAM-30', name: 'West Wing Terrace', zone: 'West Wing', online: true },
];

export default function CameraModal({ onClose }: { onClose: () => void }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onlineCount = CAMERAS.filter((c) => c.online).length;
  const selected = selectedCamera ? CAMERAS.find((c) => c.id === selectedCamera) : null;

  return (
    <ModalShell
      title="Camera Surveillance"
      subtitle={`${onlineCount}/32 cameras online · 1 offline`}
      icon="camera"
      iconColor="text-blue-400"
      onClose={onClose}
      maxWidth="max-w-5xl"
      footer={
        selectedCamera ? (
          <button
            onClick={() => setSelectedCamera(null)}
            className="w-full py-2.5 rounded-xl text-sm font-medium text-silver-400 border border-border hover:border-border-light hover:text-silver-200 transition-all"
          >
            Back to Grid
          </button>
        ) : undefined
      }
    >
      {selectedCamera && selected ? (
        /* Single camera expanded view */
        <div className="relative aspect-video rounded-xl overflow-hidden bg-[#0a0f0a]">
          {/* Scan lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)',
            }}
          />
          {/* Sweep line */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent"
              style={{ animation: 'cameraSweep 4s linear infinite' }}
            />
          </div>
          {/* HUD */}
          <div className="absolute top-3 left-3 font-mono text-[11px] text-green-400/80">
            {selected.id} — {selected.name}
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-[10px] text-red-400">REC</span>
          </div>
          <div className="absolute bottom-3 left-3 font-mono text-[10px] text-green-400/60">
            {selected.zone}
          </div>
          <div className="absolute bottom-3 right-3 font-mono text-[11px] text-green-400/80">
            {time}
          </div>
          {/* Noise pattern */}
          <div className="absolute inset-0 opacity-[0.08]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />
        </div>
      ) : (
        /* Camera grid */
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {CAMERAS.map((cam) => (
            <button
              key={cam.id}
              onClick={() => cam.online && setSelectedCamera(cam.id)}
              className={`relative aspect-video rounded-xl overflow-hidden ${
                cam.online ? 'bg-[#0a0f0a] cursor-pointer hover:ring-1 hover:ring-[#C9B370]/40' : 'bg-[#1a0a0a] cursor-not-allowed'
              } transition-all`}
            >
              {cam.online ? (
                <>
                  {/* Scan lines */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-15"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.04) 2px, rgba(0,255,0,0.04) 4px)',
                    }}
                  />
                  {/* Sweep */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent"
                      style={{ animation: 'cameraSweep 4s linear infinite' }}
                    />
                  </div>
                  {/* HUD */}
                  <div className="absolute top-1.5 left-2 font-mono text-[8px] text-green-400/70">{cam.id}</div>
                  <div className="absolute top-1.5 right-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-mono text-[7px] text-red-400">REC</span>
                  </div>
                  <div className="absolute bottom-1.5 left-2 font-mono text-[8px] text-green-400/50 truncate max-w-[70%]">{cam.name}</div>
                  <div className="absolute bottom-1.5 right-2 font-mono text-[8px] text-green-400/60">{time}</div>
                  {/* Noise */}
                  <div className="absolute inset-0 opacity-[0.06]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }} />
                </>
              ) : (
                /* Offline */
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,0,0,0.1) 4px, rgba(255,0,0,0.1) 8px)',
                    }}
                  />
                  <span className="font-mono text-[10px] text-red-400 font-bold tracking-wider">NO SIGNAL</span>
                  <span className="font-mono text-[8px] text-red-400/50 mt-0.5">{cam.id}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes cameraSweep {
          0% { top: -1px; }
          100% { top: 100%; }
        }
      `}</style>
    </ModalShell>
  );
}
