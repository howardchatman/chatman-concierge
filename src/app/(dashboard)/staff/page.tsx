'use client';

import { useAuth } from '@/lib/auth-context';
import { mockRequests, mockActivity, mockBudgets, mockVendors } from '@/data/mockData';

export default function StaffPage() {
  const { isDemo, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#C9B370]/30 border-t-[#C9B370] rounded-full animate-spin" />
      </div>
    );
  }

  const requests = isDemo ? mockRequests : [];
  const activity = isDemo ? mockActivity : [];
  const budgets = isDemo ? mockBudgets : [];
  const vendors = isDemo ? mockVendors : [];

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const inProgressRequests = requests.filter(r => r.status === 'in-progress');
  const totalBudget = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="overline mb-1">Cloud Layer</p>
          <h1 className="text-headline font-serif text-text">Chief of Staff</h1>
        </div>
        <div className="flex items-center gap-3">
          {pendingRequests.length > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C9B370]/10 text-[#C9B370] text-sm font-medium">
              {pendingRequests.length} Awaiting Approval
            </div>
          )}
        </div>
      </div>

      {/* AI Concierge Panel */}
      <div className="bg-gradient-to-r from-[#C9B370]/8 to-surface border border-[#C9B370]/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#C9B370]/15 flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-[#C9B370]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="font-serif text-xl text-text">AI Concierge</h2>
              <span className="px-2 py-0.5 rounded bg-status-secure/15 text-status-secure text-xs font-medium">Active</span>
            </div>
            <p className="text-sm text-silver-400 mb-4">
              {isDemo
                ? "Today I filtered 2 unsolicited calls, coordinated the pool maintenance crew, and scheduled tomorrow's HVAC inspection. One invoice requires your approval and the landscaping photos are ready for review."
                : "Your AI concierge is active and ready to coordinate operations. Activity will appear here as your estate systems come online."
              }
            </p>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-surface-elevated border border-border rounded-lg text-sm text-silver-300 hover:border-[#C9B370]/30 hover:text-text transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                Chat with AI
              </button>
              <button className="text-sm text-silver-500 hover:text-silver-400 transition-colors">
                View Activity Log
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-serif text-text">Pending Approvals</h2>
            <span className="px-2 py-0.5 rounded-md bg-[#C9B370] text-obsidian text-xs font-medium">
              {pendingRequests.length}
            </span>
          </div>
          <div className="space-y-3">
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 bg-surface-elevated rounded-xl border border-border hover:border-[#C9B370]/30 transition-colors cursor-pointer"
                >
                  <p className="text-sm text-text font-medium mb-1">{request.title}</p>
                  <p className="text-xs text-silver-500 mb-3 line-clamp-2">{request.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#C9B370] font-medium">${request.budget?.toLocaleString()}</span>
                    <button className="text-xs text-[#C9B370] hover:text-[#D4C28A] transition-colors">
                      Review →
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-silver-500 text-center py-6">No pending approvals</p>
            )}
          </div>
        </div>

        {/* Active Requests */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-serif text-text">Active Requests</h2>
            <span className="text-xs text-silver-500">{inProgressRequests.length} in progress</span>
          </div>
          <div className="space-y-3">
            {inProgressRequests.length > 0 ? (
              <>
                {inProgressRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-4 bg-surface-elevated rounded-xl border border-border"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-status-info animate-pulse" />
                      <p className="text-sm text-text font-medium">{request.title}</p>
                    </div>
                    <p className="text-xs text-silver-500 mb-2">{request.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-silver-600">{request.assignedTo}</span>
                      <span className="text-silver-400">${request.budget?.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
                {requests.filter(r => r.status === 'completed').slice(0, 1).map((request) => (
                  <div
                    key={request.id}
                    className="p-4 bg-surface-elevated rounded-xl border border-border opacity-60"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-status-secure" />
                      <p className="text-sm text-text font-medium">{request.title}</p>
                    </div>
                    <p className="text-xs text-silver-600">Completed</p>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-sm text-silver-500 text-center py-6">No active requests</p>
            )}
          </div>
        </div>

        {/* Budget Overview */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-serif text-text">Monthly Budget</h2>
            <button className="text-xs text-[#C9B370] hover:text-[#D4C28A] transition-colors">
              Details
            </button>
          </div>

          {budgets.length > 0 ? (
            <>
              {/* Total */}
              <div className="mb-5">
                <div className="flex items-end justify-between mb-2">
                  <span className="text-2xl font-serif text-text">${totalSpent.toLocaleString()}</span>
                  <span className="text-sm text-silver-500">of ${totalBudget.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C9B370] rounded-full transition-all"
                    style={{ width: `${(totalSpent / totalBudget) * 100}%` }}
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                {budgets.slice(0, 4).map((budget) => (
                  <div key={budget.id} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text truncate">{budget.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1 bg-surface-elevated rounded-full overflow-hidden">
                          <div
                            className="h-full bg-silver-500 rounded-full"
                            style={{ width: `${(budget.spent / budget.allocated) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-silver-500 tabular-nums">
                          {Math.round((budget.spent / budget.allocated) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-silver-500 text-center py-6">No budget data configured</p>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-serif text-text">Recent Activity</h2>
          <span className="text-xs text-silver-500">Last 24 hours</span>
        </div>
        {activity.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {activity.map((act) => (
              <div
                key={act.id}
                className="flex items-start gap-3 p-4 bg-surface-elevated rounded-xl border border-border hover:border-border-light transition-colors"
              >
                <span className="text-xl">{act.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text font-medium">{act.title}</p>
                  <p className="text-xs text-silver-500 mt-0.5 line-clamp-1">{act.description}</p>
                  <p className="text-xs text-silver-600 mt-1">{act.timestamp}</p>
                </div>
                {act.actionable && (
                  <button className="text-xs text-[#C9B370] hover:text-[#D4C28A] transition-colors whitespace-nowrap">
                    {act.actionLabel}
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-silver-500 text-center py-6">No recent activity</p>
        )}
      </div>

      {/* Vendor Quick Access */}
      {vendors.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {vendors.slice(0, 4).map((vendor) => (
            <div
              key={vendor.id}
              className="bg-surface border border-border rounded-xl p-4 hover:border-[#C9B370]/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-text font-medium">{vendor.name}</p>
                <span className="flex items-center gap-1 text-xs text-[#C9B370]">
                  ★ {vendor.rating}
                </span>
              </div>
              <p className="text-xs text-silver-500 capitalize mb-2">{vendor.category}</p>
              <p className="text-xs text-silver-600">Last: {vendor.lastService}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
