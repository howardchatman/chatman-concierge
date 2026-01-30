'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  preferred_contact: string;
  source: string;
  status: string;
  created_at: string;
  updated_at: string | null;
}

const STATUS_OPTIONS = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-[#C9B370]/15 text-[#C9B370] border-[#C9B370]/30',
  contacted: 'bg-status-info/15 text-status-info border-status-info/30',
  qualified: 'bg-status-secure/15 text-status-secure border-status-secure/30',
  proposal: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  won: 'bg-status-secure/15 text-status-secure border-status-secure/30',
  lost: 'bg-silver/10 text-silver-500 border-silver/20',
};

export default function LeadsPage() {
  const { isLoading: authLoading } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      const url = filterStatus ? `/api/leads?status=${filterStatus}` : '/api/leads';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setLeads(data.data || []);
      } else {
        setError(data.error || 'Failed to load leads');
      }
    } catch {
      setError('Failed to connect');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchLeads();
    }
  }, [authLoading, filterStatus]);

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads(prev =>
          prev.map(l => (l.id === id ? { ...l, status: newStatus, updated_at: new Date().toISOString() } : l))
        );
      }
    } catch {
      // Silently fail
    } finally {
      setUpdatingId(null);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#C9B370]/30 border-t-[#C9B370] rounded-full animate-spin" />
      </div>
    );
  }

  const statusCounts = leads.reduce<Record<string, number>>((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="overline mb-1">Pipeline</p>
          <h1 className="text-headline font-serif text-text">Leads</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-[#C9B370]/10 text-[#C9B370] text-sm font-medium">
            {leads.length} Total
          </span>
          {statusCounts['new'] > 0 && (
            <span className="px-3 py-1.5 rounded-full bg-[#C9B370] text-obsidian text-sm font-medium">
              {statusCounts['new']} New
            </span>
          )}
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterStatus('')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            filterStatus === ''
              ? 'bg-[#C9B370]/15 text-[#C9B370] border border-[#C9B370]/30'
              : 'bg-surface-elevated text-silver-400 border border-border hover:text-text'
          }`}
        >
          All ({leads.length})
        </button>
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
              filterStatus === s
                ? 'bg-[#C9B370]/15 text-[#C9B370] border border-[#C9B370]/30'
                : 'bg-surface-elevated text-silver-400 border border-border hover:text-text'
            }`}
          >
            {s} {statusCounts[s] ? `(${statusCounts[s]})` : ''}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-status-alert/10 border border-status-alert/30 rounded-xl p-4 text-sm text-status-alert">
          {error}
        </div>
      )}

      {/* Leads Table */}
      {leads.length > 0 ? (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_140px_100px_140px] gap-4 px-6 py-3 border-b border-border text-xs text-silver-500 uppercase tracking-wide">
            <span>Name</span>
            <span>Contact</span>
            <span>Source</span>
            <span>Status</span>
            <span>Date</span>
          </div>

          {leads.map((lead) => (
            <div key={lead.id}>
              <button
                onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                className="w-full grid grid-cols-[1fr_1fr_140px_100px_140px] gap-4 px-6 py-4 border-b border-border/50 hover:bg-surface-elevated/50 transition-colors text-left"
              >
                <div>
                  <p className="text-sm text-text font-medium">{lead.name}</p>
                  {lead.preferred_contact && (
                    <p className="text-xs text-silver-600 capitalize">Prefers {lead.preferred_contact}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-silver-300">{lead.email}</p>
                  {lead.phone && <p className="text-xs text-silver-500">{lead.phone}</p>}
                </div>
                <span className="text-xs text-silver-400 capitalize self-center">{lead.source}</span>
                <span className="self-center">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border capitalize ${STATUS_COLORS[lead.status] || 'bg-silver/10 text-silver-400 border-silver/20'}`}>
                    {lead.status}
                  </span>
                </span>
                <span className="text-xs text-silver-500 self-center">
                  {new Date(lead.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </button>

              {/* Expanded Details */}
              {expandedLead === lead.id && (
                <div className="px-6 py-4 bg-surface-elevated/30 border-b border-border/50">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Details */}
                    <div>
                      <p className="text-xs text-silver-500 uppercase tracking-wide mb-2">Details</p>
                      {lead.message ? (
                        <div className="space-y-1">
                          {lead.message.split(' | ').map((detail, i) => (
                            <p key={i} className="text-sm text-silver-300">{detail}</p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-silver-500">No additional details</p>
                      )}
                    </div>

                    {/* Status Update */}
                    <div>
                      <p className="text-xs text-silver-500 uppercase tracking-wide mb-2">Update Status</p>
                      <div className="flex flex-wrap gap-2">
                        {STATUS_OPTIONS.map((s) => (
                          <button
                            key={s}
                            disabled={updatingId === lead.id || lead.status === s}
                            onClick={() => updateStatus(lead.id, s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize border ${
                              lead.status === s
                                ? STATUS_COLORS[s]
                                : 'bg-surface-elevated text-silver-400 border-border hover:text-text hover:border-border-light'
                            } disabled:opacity-50`}
                          >
                            {updatingId === lead.id ? '...' : s}
                          </button>
                        ))}
                      </div>
                      {lead.updated_at && (
                        <p className="text-xs text-silver-600 mt-2">
                          Last updated: {new Date(lead.updated_at).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-surface-elevated border border-border-light mx-auto mb-6 flex items-center justify-center">
            <svg className="w-8 h-8 text-silver-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-4.5 0 2.625 2.625 0 014.5 0z" />
            </svg>
          </div>
          <h2 className="font-serif text-xl text-text mb-2">No Leads Yet</h2>
          <p className="text-silver-500 text-sm max-w-md mx-auto">
            Leads submitted through the landing page access form will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
