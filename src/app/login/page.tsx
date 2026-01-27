'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1200));

    router.push('/estates');
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center p-6">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-subtle pointer-events-none" />

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(9,9,11,0.4)_100%)] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo & Brand */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-elevated border border-border-light mb-6">
            <svg className="w-8 h-8 text-[#C9B370]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl text-text mb-2">Chatman Concierge</h1>
          <p className="text-silver-500 text-sm font-sans">Private Estate Intelligence</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface border border-border-light rounded-2xl p-8 shadow-luxury">
          <div className="mb-8">
            <p className="overline mb-2">Private Access</p>
            <h2 className="font-serif text-2xl text-text">Welcome Back</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="input-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="principal@estate.com"
                required
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••••••"
                required
                autoComplete="off"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                  />
                  <div className="w-4 h-4 rounded border border-[#2E2E32] bg-[#1A1A1D] peer-checked:bg-[#C9B370]/20 peer-checked:border-[#C9B370]/50 transition-all" />
                  <svg className="absolute inset-0 w-4 h-4 text-[#C9B370] opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-silver-400 group-hover:text-silver-300 transition-colors">Remember this device</span>
              </label>
              <button type="button" className="text-[#C9B370]/80 hover:text-[#C9B370] transition-colors font-medium">
                Contact Concierge
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 mt-6 text-[15px]"
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 animate-spin text-[#C9B370]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-silver-400">Authenticating...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-silver-600 text-xs mt-8 tracking-wide">
          By invitation only. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
