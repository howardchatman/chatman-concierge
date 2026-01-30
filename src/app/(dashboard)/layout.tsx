'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/TopBar';
import { AuthProvider } from '@/lib/auth-context';
import { EstateProvider } from '@/lib/estate-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <EstateProvider>
        <div className="min-h-screen bg-obsidian">
          <Sidebar />
          <TopBar />
          <main className="md:ml-64 pt-16 min-h-screen">
            <div className="p-4 md:p-6">
              {children}
            </div>
          </main>
        </div>
      </EstateProvider>
    </AuthProvider>
  );
}
