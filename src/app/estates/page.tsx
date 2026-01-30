'use client';

import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/lib/auth-context';
import { EstateProvider, useEstate, allEstates } from '@/lib/estate-context';

function EstatesContent() {
  const router = useRouter();
  const { user, isDemo, isLoading } = useAuth();
  const { selectEstate } = useEstate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9B370]/30 border-t-[#C9B370] rounded-full animate-spin" />
      </div>
    );
  }

  const estates = isDemo ? allEstates : [];

  const handleSelectEstate = (id: string) => {
    selectEstate(id);
    router.push('/overview');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'secure':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-secure/10 text-status-secure text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-status-secure shadow-[0_0_6px_rgba(74,222,128,0.5)]" />
            Secure
          </div>
        );
      case 'away':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-silver/10 text-silver-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-silver-500" />
            Away Mode
          </div>
        );
      case 'alert':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-alert/10 text-status-alert text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-status-alert animate-pulse" />
            Attention Required
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-obsidian">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-subtle pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface-elevated border border-border-light mb-6">
            <svg className="w-6 h-6 text-[#C9B370]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
          </div>
          <p className="overline mb-2">Estate Selection</p>
          <h1 className="font-serif text-3xl text-text mb-2">
            {user?.name ? `Welcome, ${user.name.split(' ')[0]}` : 'Your Properties'}
          </h1>
          <p className="text-silver-500 text-sm">Select an estate to access its command center</p>
        </div>

        {/* Estate Cards */}
        {estates.length > 0 ? (
          <div className="grid gap-4">
            {estates.map((estate) => (
              <button
                key={estate.id}
                onClick={() => handleSelectEstate(estate.id)}
                className="group w-full text-left bg-surface border border-border-light rounded-2xl p-6 hover:border-[#C9B370]/30 hover:shadow-[0_0_30px_-10px_rgba(201,179,112,0.15)] transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-6">
                  {/* Estate Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="font-serif text-xl text-text group-hover:text-[#C9B370] transition-colors">
                        {estate.name}
                      </h2>
                      {getStatusBadge(estate.status)}
                    </div>
                    <p className="text-silver-500 text-sm mb-4">{estate.address}</p>

                    {/* Stats */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-silver-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                        <span className="text-silver-400 text-sm">{estate.sqft} sq ft</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-silver-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span className="text-silver-400 text-sm">{estate.bedrooms} Bedrooms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-silver-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                        <span className="text-silver-400 text-sm">{estate.staff} Staff</span>
                      </div>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex flex-col items-end gap-4">
                    <p className="text-silver-600 text-xs">Last activity: {estate.lastActivity}</p>
                    <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-border flex items-center justify-center group-hover:border-[#C9B370]/30 group-hover:bg-[#C9B370]/5 transition-all">
                      <svg className="w-5 h-5 text-silver-500 group-hover:text-[#C9B370] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-surface-elevated border border-border-light mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-silver-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <h2 className="font-serif text-xl text-text mb-2">No Properties Yet</h2>
            <p className="text-silver-500 text-sm max-w-md mx-auto">
              Your properties will appear here once your account is configured. Contact your concierge to get started.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12">
          <button className="text-[#C9B370]/70 hover:text-[#C9B370] text-sm font-medium transition-colors">
            + Add New Property
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EstatesPage() {
  return (
    <AuthProvider>
      <EstateProvider>
        <EstatesContent />
      </EstateProvider>
    </AuthProvider>
  );
}
