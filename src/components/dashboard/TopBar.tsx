'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useEstate } from '@/lib/estate-context';
import { Icon } from '@/components/icons';

export default function TopBar() {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const { isDemo } = useAuth();
  const { estate } = useEstate();

  const temperature = isDemo && estate ? estate.systemStatus.climate.temperature : null;

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface/80 backdrop-blur-md border-b border-border z-30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left: Page Context */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="font-serif text-lg text-text">
              {isDemo && estate ? estate.name : 'Command Center'}
            </h1>
            <p className="text-xs text-silver-500">
              {isDemo && estate ? estate.address : 'Estate Operations'}
            </p>
          </div>
        </div>

        {/* Center: Status Indicators */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
            isDemo ? 'bg-status-secure/10 text-status-secure' : 'bg-silver/10 text-silver-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isDemo ? 'bg-status-secure shadow-[0_0_6px_rgba(74,222,128,0.5)]' : 'bg-silver-600'}`} />
            {isDemo ? 'Secure' : 'Standby'}
          </div>
          {isDemo && (
            <>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-silver/10 text-silver-400 text-xs font-medium">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                At Home
              </div>
              {temperature && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-silver/10 text-silver-400 text-xs font-medium">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                  {temperature}°F
                </div>
              )}
            </>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Actions */}
          <div className="relative">
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-silver-300 bg-surface-elevated border border-border rounded-lg hover:border-[#C9B370]/30 hover:text-[#C9B370] transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              Quick Actions
            </button>

            {showQuickActions && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowQuickActions(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-72 bg-surface-elevated border border-border-light rounded-xl shadow-luxury overflow-hidden z-20 animate-slide-down">
                  <div className="p-3 border-b border-border">
                    <p className="overline">Suggested</p>
                  </div>
                  <div className="p-2">
                    {[
                      { icon: 'home', label: 'On my way home', desc: 'Prep arrival settings' },
                      { icon: 'moon', label: 'Night Lockdown', desc: 'Secure all zones' },
                      { icon: 'wine', label: 'Entertain Mode', desc: 'Guest settings' },
                      { icon: 'plane', label: 'Travel Mode', desc: 'Extended absence' },
                    ].map((action) => (
                      <button
                        key={action.label}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-surface-overlay transition-colors text-left group"
                      >
                        <span className="text-silver-400 group-hover:text-[#C9B370] group-hover:scale-110 transition-all"><Icon name={action.icon} className="w-5 h-5" /></span>
                        <div>
                          <p className="text-sm text-text font-medium group-hover:text-[#C9B370] transition-colors">{action.label}</p>
                          <p className="text-xs text-silver-500">{action.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Notifications */}
          <button className="relative w-10 h-10 rounded-xl bg-surface-elevated border border-border flex items-center justify-center hover:border-[#C9B370]/30 transition-colors">
            <svg className="w-5 h-5 text-silver-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#C9B370] rounded-full" />
          </button>

          {/* AI Assistant */}
          <button className="w-10 h-10 rounded-xl bg-[#C9B370]/10 border border-[#C9B370]/20 flex items-center justify-center hover:bg-[#C9B370]/20 transition-colors">
            <svg className="w-5 h-5 text-[#C9B370]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
