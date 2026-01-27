'use client';

import { mockRequests, mockActivity } from '@/data/mockData';

export default function StaffWidget() {
  const pendingRequests = mockRequests.filter(r => r.status === 'pending');
  const inProgressRequests = mockRequests.filter(r => r.status === 'in-progress');
  const recentActivity = mockActivity.slice(0, 4);

  return (
    <div className="card-elevated">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-silver/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-silver" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-lg text-text">Chief of Staff</h2>
            <p className="text-xs text-text-muted">Cloud Layer</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {pendingRequests.length > 0 && (
            <div className="badge badge-warning">
              {pendingRequests.length} Pending
            </div>
          )}
          {inProgressRequests.length > 0 && (
            <div className="badge badge-info">
              {inProgressRequests.length} In Progress
            </div>
          )}
        </div>
      </div>

      {/* Pending Approvals */}
      {pendingRequests.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-text-secondary mb-3">Requires Your Attention</h3>
          <div className="space-y-2">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border hover:border-border-light transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm text-text font-medium">{request.title}</p>
                  <p className="text-xs text-text-muted mt-1">{request.description}</p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  {request.budget && (
                    <span className="text-sm text-silver font-medium">
                      ${request.budget.toLocaleString()}
                    </span>
                  )}
                  <button className="btn-primary text-xs py-1.5 px-3">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Feed */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-text-secondary">Recent Activity</h3>
          <button className="text-xs text-silver hover:text-silver-200 transition-colors">View All</button>
        </div>
        <div className="space-y-2">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 bg-surface rounded-lg border border-border hover:border-border-light transition-colors"
            >
              <span className="text-lg">{activity.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text">{activity.title}</p>
                <p className="text-xs text-text-muted mt-0.5 line-clamp-1">{activity.description}</p>
                <p className="text-xs text-text-muted mt-1">{activity.timestamp}</p>
              </div>
              {activity.actionable && (
                <button className="btn-ghost text-xs py-1 px-2">
                  {activity.actionLabel}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
