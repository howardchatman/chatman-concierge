'use client';

import { useRef, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useEstate } from '@/lib/estate-context';
import { Icon } from '@/components/icons';
import ActionSimulationModal from './components/ActionSimulationModal';
import CameraModal from './components/CameraModal';
import ClimateModal from './components/ClimateModal';
import SecurityModal from './components/SecurityModal';
import DoorsModal from './components/DoorsModal';
import PowerModal from './components/PowerModal';
import WaterModal from './components/WaterModal';

const ACTION_CONFIGS = {
  'arrive-home': {
    title: 'Arriving Home...',
    icon: 'home',
    iconColor: 'text-[#C9B370]',
    steps: [
      { label: 'Disarming entry zones', icon: 'shield', duration: 1200 },
      { label: 'Unlocking front doors', icon: 'lock', duration: 800 },
      { label: 'Setting climate to 72°F', icon: 'thermometer', duration: 1000 },
      { label: 'Activating welcome lighting', icon: 'bolt', duration: 600 },
      { label: 'Starting arrival playlist', icon: 'wine', duration: 800 },
      { label: 'Notifying staff of arrival', icon: 'ai', duration: 600 },
    ],
  },
  'arm-away': {
    title: 'Arming Away...',
    icon: 'lock',
    iconColor: 'text-red-400',
    steps: [
      { label: 'Verifying all doors locked', icon: 'lock', duration: 1500 },
      { label: 'Activating perimeter sensors', icon: 'shield', duration: 1000 },
      { label: 'Enabling motion detection', icon: 'camera', duration: 800 },
      { label: 'Arming all 6 zones', icon: 'shield', duration: 1200 },
      { label: 'Setting climate to eco mode', icon: 'thermometer', duration: 600 },
      { label: 'System armed', icon: 'check', duration: 500 },
    ],
  },
  'night-lock': {
    title: 'Night Lockdown...',
    icon: 'moon',
    iconColor: 'text-blue-400',
    steps: [
      { label: 'Locking all 24 doors', icon: 'lock', duration: 1500 },
      { label: 'Arming perimeter zones', icon: 'shield', duration: 1000 },
      { label: 'Dimming exterior lights', icon: 'bolt', duration: 800 },
      { label: 'Activating night path lighting', icon: 'home', duration: 600 },
      { label: 'Closing all motorized shades', icon: 'moon', duration: 800 },
      { label: 'Night mode active', icon: 'check', duration: 500 },
    ],
  },
  'entertain': {
    title: 'Entertainment Mode...',
    icon: 'wine',
    iconColor: 'text-purple-400',
    steps: [
      { label: 'Setting ambient lighting', icon: 'bolt', duration: 800 },
      { label: 'Adjusting climate to 70°F', icon: 'thermometer', duration: 1000 },
      { label: 'Starting background music', icon: 'wine', duration: 600 },
      { label: 'Opening terrace shades', icon: 'home', duration: 800 },
      { label: 'Enabling guest Wi-Fi network', icon: 'ai', duration: 600 },
      { label: 'Entertainment mode active', icon: 'check', duration: 500 },
    ],
  },
} as const;

type ModalType = 'arrive-home' | 'arm-away' | 'night-lock' | 'entertain' | 'cameras' | 'climate' | 'security' | 'doors' | 'power' | 'water' | null;

const ACTION_KEYS: Record<string, ModalType> = {
  'Arrive Home': 'arrive-home',
  'Arm Away': 'arm-away',
  'Night Lock': 'night-lock',
  'Entertain': 'entertain',
};

export default function OverviewPage() {
  const { isDemo, isLoading } = useAuth();
  const { estate } = useEstate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#C9B370]/30 border-t-[#C9B370] rounded-full animate-spin" />
      </div>
    );
  }

  const systemStatus = isDemo && estate ? estate.systemStatus : null;
  const activity = isDemo && estate ? estate.activity : [];
  const heroImage = coverUrl || (isDemo && estate ? estate.coverImage : null);

  const statusParts: string[] = [];
  if (systemStatus) {
    statusParts.push(`${systemStatus.doors.locked} doors locked`);
    statusParts.push(`${systemStatus.cameras.online} cameras active`);
    statusParts.push(`${systemStatus.climate.temperature}°F`);
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success && data.url) {
        setCoverUrl(data.url);
      }
    } catch {
      // silent
    } finally {
      setUploading(false);
    }
  };

  const estateStatus = isDemo && estate ? estate.status : 'secure';
  const statusLabel = estateStatus === 'secure' ? 'Secure' : estateStatus === 'away' ? 'Away' : estateStatus === 'alert' ? 'Alert' : 'Active';
  const statusDotColor = estateStatus === 'secure' ? 'bg-status-secure shadow-[0_0_8px_rgba(74,222,128,0.6)]' : estateStatus === 'alert' ? 'bg-status-alert animate-pulse' : 'bg-silver-500';

  const closeModal = () => setActiveModal(null);

  return (
    <div className="space-y-6">
      {/* ── Hero Property Image ─────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-auto md:h-[280px] bg-surface-elevated">
        {heroImage ? (
          <img
            src={heroImage}
            alt={estate?.name || 'Property'}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated to-obsidian" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 to-transparent" />

        <div className="absolute top-5 left-5">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
            <span className={`w-2 h-2 rounded-full ${statusDotColor}`} />
            <span className="text-xs font-medium text-white">{statusLabel}</span>
          </div>
        </div>

        {!isDemo && (
          <div className="absolute top-5 right-5">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-black/70 transition-all text-xs font-medium disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              </svg>
              {uploading ? 'Uploading...' : 'Upload Photo'}
            </button>
          </div>
        )}

        <div className="absolute bottom-5 left-5 right-5">
          <h1 className="font-serif text-2xl md:text-3xl text-white mb-1 drop-shadow-lg">
            {isDemo && estate ? estate.name : 'Home'}
          </h1>
          <p className="text-sm text-white/70">
            {statusParts.length > 0
              ? statusParts.join(' · ')
              : (isDemo && estate ? estate.address : 'Your estate command center')}
          </p>
        </div>
      </div>

      {/* ── Actions ─────────────────────────────────────────────── */}
      <div>
        <p className="text-xs text-silver-500 uppercase tracking-widest font-medium mb-3">Actions</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: 'home', label: 'Arrive Home', desc: 'Prep arrival', color: 'text-[#C9B370]' },
            { icon: 'lock', label: 'Arm Away', desc: 'Secure all zones', color: 'text-red-400' },
            { icon: 'moon', label: 'Night Lock', desc: 'Bedtime mode', color: 'text-blue-400' },
            { icon: 'wine', label: 'Entertain', desc: 'Guest settings', color: 'text-purple-400' },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => setActiveModal(ACTION_KEYS[action.label] || null)}
              className="group flex flex-col items-center gap-2 p-5 rounded-2xl bg-surface border border-border hover:border-[#C9B370]/30 hover:bg-surface-elevated transition-all"
            >
              <div className={`w-10 h-10 rounded-xl bg-surface-elevated border border-border-light flex items-center justify-center group-hover:border-[#C9B370]/30 transition-all ${action.color}`}>
                <Icon name={action.icon} className="w-5 h-5" />
              </div>
              <div className="text-center">
                <p className="text-sm text-text font-medium group-hover:text-[#C9B370] transition-colors">{action.label}</p>
                <p className="text-[10px] text-silver-600">{action.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Controls ────────────────────────────────────────────── */}
      <div>
        <p className="text-xs text-silver-500 uppercase tracking-widest font-medium mb-3">Controls</p>
        {systemStatus ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Perimeter */}
            <button onClick={() => setActiveModal('security')} className="bg-surface border border-border rounded-2xl p-5 text-left cursor-pointer hover:border-[#C9B370]/30 hover:bg-surface-elevated transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-status-secure/10 flex items-center justify-center">
                  <Icon name="shield" className="w-5 h-5 text-status-secure" />
                </div>
                <span className={`w-2.5 h-2.5 rounded-full ${systemStatus.perimeter === 'secure' ? 'bg-status-secure shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-status-alert animate-pulse'}`} />
              </div>
              <p className="text-lg font-serif text-text capitalize">{systemStatus.perimeter}</p>
              <p className="text-xs text-silver-500">Perimeter · {estate?.zones.length || 0} zones</p>
            </button>

            {/* Cameras */}
            <button onClick={() => setActiveModal('cameras')} className="bg-surface border border-border rounded-2xl p-5 text-left cursor-pointer hover:border-[#C9B370]/30 hover:bg-surface-elevated transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Icon name="camera" className="w-5 h-5 text-blue-400" />
                </div>
                <span className={`w-2.5 h-2.5 rounded-full ${systemStatus.cameras.offline > 0 ? 'bg-status-warning' : 'bg-status-secure shadow-[0_0_8px_rgba(74,222,128,0.5)]'}`} />
              </div>
              <p className="text-lg font-serif text-text">{systemStatus.cameras.online}/{systemStatus.cameras.total}</p>
              <p className="text-xs text-silver-500">Cameras · {systemStatus.cameras.offline} offline</p>
            </button>

            {/* Climate */}
            <button onClick={() => setActiveModal('climate')} className="bg-surface border border-border rounded-2xl p-5 text-left cursor-pointer hover:border-[#C9B370]/30 hover:bg-surface-elevated transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Icon name="thermometer" className="w-5 h-5 text-orange-400" />
                </div>
              </div>
              <p className="text-lg font-serif text-text">{systemStatus.climate.temperature}°F</p>
              <p className="text-xs text-silver-500 capitalize">Climate · {systemStatus.climate.mode}</p>
            </button>

            {/* Access */}
            <button onClick={() => setActiveModal('doors')} className="bg-surface border border-border rounded-2xl p-5 text-left cursor-pointer hover:border-[#C9B370]/30 hover:bg-surface-elevated transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#C9B370]/10 flex items-center justify-center">
                  <Icon name="lock" className="w-5 h-5 text-[#C9B370]" />
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-surface-elevated border border-border text-[10px] font-medium text-silver-400">
                  Lock All
                </span>
              </div>
              <p className="text-lg font-serif text-text">{systemStatus.doors.locked}/{systemStatus.doors.total}</p>
              <p className="text-xs text-silver-500">Doors · {systemStatus.doors.open} open</p>
            </button>

            {/* Power */}
            <button onClick={() => setActiveModal('power')} className="bg-surface border border-border rounded-2xl p-5 text-left cursor-pointer hover:border-[#C9B370]/30 hover:bg-surface-elevated transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                  <Icon name="bolt" className="w-5 h-5 text-yellow-400" />
                </div>
                <span className={`w-2.5 h-2.5 rounded-full ${systemStatus.power === 'normal' ? 'bg-status-secure shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-status-alert animate-pulse'}`} />
              </div>
              <p className="text-lg font-serif text-text capitalize">{systemStatus.power}</p>
              <p className="text-xs text-silver-500">Power Grid</p>
            </button>

            {/* Water */}
            <button onClick={() => setActiveModal('water')} className="bg-surface border border-border rounded-2xl p-5 text-left cursor-pointer hover:border-[#C9B370]/30 hover:bg-surface-elevated transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <Icon name="droplet" className="w-5 h-5 text-cyan-400" />
                </div>
                <span className={`w-2.5 h-2.5 rounded-full ${systemStatus.water === 'normal' ? 'bg-status-secure shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-status-alert animate-pulse'}`} />
              </div>
              <p className="text-lg font-serif text-text capitalize">{systemStatus.water === 'normal' ? 'Normal' : 'Leak Detected'}</p>
              <p className="text-xs text-silver-500">Water System</p>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['Perimeter', 'Cameras', 'Climate', 'Access', 'Power', 'Water'].map((label) => (
              <div key={label} className="bg-surface border border-border rounded-2xl p-5">
                <div className="w-9 h-9 rounded-xl bg-surface-elevated flex items-center justify-center mb-3">
                  <span className="w-5 h-5 block bg-silver-700 rounded" />
                </div>
                <p className="text-lg font-serif text-silver-600">—</p>
                <p className="text-xs text-silver-600">{label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Recent Activity ─────────────────────────────────────── */}
      {activity.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-silver-500 uppercase tracking-widest font-medium">Recent Activity</p>
            <a href="/staff" className="text-xs text-[#C9B370] hover:text-[#D4C28A] transition-colors">View All</a>
          </div>
          <div className="bg-surface border border-border rounded-2xl divide-y divide-border/50">
            {activity.slice(0, 4).map((act) => (
              <div key={act.id} className="flex items-center gap-3 px-5 py-3.5">
                <span className="text-silver-400"><Icon name={act.icon || 'document'} className="w-4 h-4" /></span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text truncate">{act.title}</p>
                  <p className="text-xs text-silver-600 truncate">{act.description}</p>
                </div>
                <span className="text-[10px] text-silver-600 whitespace-nowrap">{act.timestamp}</span>
                {act.actionable && (
                  <button className="text-xs text-[#C9B370] hover:text-[#D4C28A] transition-colors whitespace-nowrap font-medium">
                    {act.actionLabel}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── AI Concierge Insight ────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#C9B370]/5 to-transparent border border-[#C9B370]/20 rounded-2xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#C9B370]/10 flex items-center justify-center flex-shrink-0">
            <Icon name="ai" className="w-5 h-5 text-[#C9B370]" />
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-lg text-text mb-1">AI Concierge</h3>
            <p className="text-sm text-silver-400 leading-relaxed">
              {isDemo && estate
                ? estate.aiInsight
                : "Your AI concierge is active and monitoring your properties. As data flows in, insights will appear here."}
            </p>
          </div>
        </div>
      </div>

      {/* ── Modals ──────────────────────────────────────────────── */}
      {(activeModal === 'arrive-home' || activeModal === 'arm-away' || activeModal === 'night-lock' || activeModal === 'entertain') && (
        <ActionSimulationModal
          {...ACTION_CONFIGS[activeModal]}
          onClose={closeModal}
        />
      )}
      {activeModal === 'cameras' && <CameraModal onClose={closeModal} />}
      {activeModal === 'climate' && <ClimateModal onClose={closeModal} />}
      {activeModal === 'security' && <SecurityModal onClose={closeModal} />}
      {activeModal === 'doors' && <DoorsModal onClose={closeModal} />}
      {activeModal === 'power' && <PowerModal onClose={closeModal} />}
      {activeModal === 'water' && <WaterModal onClose={closeModal} />}
    </div>
  );
}
