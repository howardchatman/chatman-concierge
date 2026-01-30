'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Invalid email or password');
        return;
      }

      // Demo user picks an estate; admin goes straight to dashboard
      const isDemo = data.user?.email === 'demo@chatmanconcierge.com';
      router.push(isDemo ? '/estates' : '/overview');
    } catch {
      setError('Unable to connect. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
          <p className="overline mb-3 text-silver-500">Chatman Concierge</p>
          <h1 className="font-serif text-3xl text-text mb-3">Sign in</h1>
          <p className="text-silver-400 text-sm">
            Private access to your properties, operations, and concierge systems.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-surface border border-border-light rounded-2xl p-8 shadow-luxury">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@estate.com"
                required
                autoComplete="email"
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
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-sm text-silver-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C9B370] hover:bg-[#B8A460] text-obsidian py-3 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Authenticating...
                </span>
              ) : (
                'Continue'
              )}
            </button>
          </form>

          <div className="flex items-center justify-between mt-5">
            <button type="button" className="text-xs text-silver-500 hover:text-silver-300 transition-colors">
              Forgot password?
            </button>
            <a href="/#contact" className="text-xs text-[#C9B370]/70 hover:text-[#C9B370] transition-colors font-medium">
              Request access
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-silver-600 text-xs mt-8 tracking-wide">
          Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
