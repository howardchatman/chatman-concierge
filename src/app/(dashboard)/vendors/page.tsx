'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useEstate } from '@/lib/estate-context';
import type { Vendor } from '@/types';

const CATEGORY_OPTIONS = ['pool', 'landscaping', 'hvac', 'plumbing', 'electrical', 'cleaning', 'catering', 'security', 'other'] as const;

const CATEGORY_COLORS: Record<string, string> = {
  pool: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  landscaping: 'bg-green-500/15 text-green-400 border-green-500/30',
  hvac: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  plumbing: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  electrical: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  cleaning: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  catering: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
  security: 'bg-red-500/15 text-red-400 border-red-500/30',
  other: 'bg-silver/10 text-silver-400 border-silver/20',
};

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-status-secure/15 text-status-secure border-status-secure/30',
  preferred: 'bg-[#C9B370]/15 text-[#C9B370] border-[#C9B370]/30',
  inactive: 'bg-silver/10 text-silver-500 border-silver/20',
};

interface VendorFormData {
  name: string;
  company: string;
  category: string;
  contact: string;
  email: string;
  phone: string;
  rating: number;
  notes: string;
  license: string;
  insurance: string;
  address: string;
  status: string;
}

const emptyForm: VendorFormData = {
  name: '',
  company: '',
  category: 'other',
  contact: '',
  email: '',
  phone: '',
  rating: 3,
  notes: '',
  license: '',
  insurance: '',
  address: '',
  status: 'active',
};

function StarRating({ rating, onRate, size = 'md' }: { rating: number; onRate?: (r: number) => void; size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!onRate}
          onClick={() => onRate?.(star)}
          className={`${onRate ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
        >
          <svg className={dim} viewBox="0 0 20 20" fill={star <= rating ? '#C9B370' : 'none'} stroke={star <= rating ? '#C9B370' : '#555'} strokeWidth={1.5}>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function VendorsPage() {
  const { isLoading: authLoading, isDemo } = useAuth();
  const { estate } = useEstate();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedVendor, setExpandedVendor] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [formData, setFormData] = useState<VendorFormData>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [updatingRating, setUpdatingRating] = useState<string | null>(null);

  const fetchVendors = async () => {
    if (isDemo && estate) {
      // Demo mode: use estate context vendors
      setVendors(estate.vendors.map(v => ({
        ...v,
        status: v.status || 'active',
      })));
      setIsLoading(false);
      return;
    }

    try {
      const url = filterCategory ? `/api/vendors?category=${filterCategory}` : '/api/vendors';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setVendors(data.data || []);
      } else {
        setError(data.error || 'Failed to load vendors');
      }
    } catch {
      setError('Failed to connect');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchVendors();
    }
  }, [authLoading, filterCategory, isDemo, estate]);

  const handleRating = async (id: string, newRating: number) => {
    if (isDemo) {
      setVendors(prev => prev.map(v => v.id === id ? { ...v, rating: newRating } : v));
      return;
    }
    setUpdatingRating(id);
    try {
      const res = await fetch('/api/vendors', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, rating: newRating }),
      });
      const data = await res.json();
      if (data.success) {
        setVendors(prev => prev.map(v => v.id === id ? { ...v, rating: newRating } : v));
      }
    } catch {
      // silent
    } finally {
      setUpdatingRating(null);
    }
  };

  const openAddModal = () => {
    setEditingVendor(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setFormData({
      name: vendor.name,
      company: vendor.company || '',
      category: vendor.category,
      contact: vendor.contact,
      email: vendor.email,
      phone: vendor.phone,
      rating: vendor.rating,
      notes: vendor.notes || '',
      license: vendor.license || '',
      insurance: vendor.insurance || '',
      address: vendor.address || '',
      status: vendor.status || 'active',
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.contact) return;
    setIsSaving(true);

    try {
      if (editingVendor) {
        const res = await fetch('/api/vendors', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingVendor.id, ...formData }),
        });
        const data = await res.json();
        if (data.success && data.data) {
          setVendors(prev => prev.map(v => v.id === editingVendor.id ? data.data : v));
        }
      } else {
        const res = await fetch('/api/vendors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success && data.data) {
          setVendors(prev => [data.data, ...prev]);
        }
      }
      setShowModal(false);
      setFormData(emptyForm);
      setEditingVendor(null);
    } catch {
      // silent
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/vendors', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setVendors(prev => prev.filter(v => v.id !== id));
        setExpandedVendor(null);
      }
    } catch {
      // silent
    }
  };

  const updateField = <K extends keyof VendorFormData>(field: K, value: VendorFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Filter vendors by search query (client-side)
  const filteredVendors = vendors.filter(v => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      v.name.toLowerCase().includes(q) ||
      (v.company && v.company.toLowerCase().includes(q)) ||
      v.category.toLowerCase().includes(q) ||
      v.contact.toLowerCase().includes(q)
    );
  });

  // Category counts from unfiltered vendors
  const categoryCounts = vendors.reduce<Record<string, number>>((acc, v) => {
    acc[v.category] = (acc[v.category] || 0) + 1;
    return acc;
  }, {});

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#C9B370]/30 border-t-[#C9B370] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="overline mb-1">Rolodex</p>
          <h1 className="text-headline font-serif text-text">Vendors</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full bg-[#C9B370]/10 text-[#C9B370] text-sm font-medium">
            {vendors.length} Total
          </span>
          {!isDemo && (
            <button
              onClick={openAddModal}
              className="px-4 py-2 rounded-xl bg-[#C9B370] hover:bg-[#B8A460] text-obsidian text-sm font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Vendor
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search vendors..."
          className="input pl-10 text-sm py-2.5 w-full max-w-md"
        />
      </div>

      {/* Category Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterCategory('')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            filterCategory === ''
              ? 'bg-[#C9B370]/15 text-[#C9B370] border border-[#C9B370]/30'
              : 'bg-surface-elevated text-silver-400 border border-border hover:text-text'
          }`}
        >
          All ({vendors.length})
        </button>
        {CATEGORY_OPTIONS.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
              filterCategory === cat
                ? 'bg-[#C9B370]/15 text-[#C9B370] border border-[#C9B370]/30'
                : 'bg-surface-elevated text-silver-400 border border-border hover:text-text'
            }`}
          >
            {cat} {categoryCounts[cat] ? `(${categoryCounts[cat]})` : ''}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-status-alert/10 border border-status-alert/30 rounded-xl p-4 text-sm text-status-alert">
          {error}
        </div>
      )}

      {/* Vendors Table */}
      {filteredVendors.length > 0 ? (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1.2fr_1fr_120px_120px_100px_80px] gap-4 px-6 py-3 border-b border-border text-xs text-silver-500 uppercase tracking-wide">
            <span>Vendor</span>
            <span>Contact</span>
            <span>Category</span>
            <span>Rating</span>
            <span>Status</span>
            <span>Last Service</span>
          </div>

          {filteredVendors.map((vendor) => (
            <div key={vendor.id}>
              <button
                onClick={() => setExpandedVendor(expandedVendor === vendor.id ? null : vendor.id)}
                className="w-full grid grid-cols-[1.2fr_1fr_120px_120px_100px_80px] gap-4 px-6 py-4 border-b border-border/50 hover:bg-surface-elevated/50 transition-colors text-left"
              >
                <div>
                  <p className="text-sm text-text font-medium">{vendor.name}</p>
                  {vendor.company && (
                    <p className="text-xs text-silver-500">{vendor.company}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-silver-300">{vendor.contact}</p>
                  <p className="text-xs text-silver-500">{vendor.phone}</p>
                </div>
                <span className="self-center">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border capitalize ${CATEGORY_COLORS[vendor.category] || CATEGORY_COLORS.other}`}>
                    {vendor.category}
                  </span>
                </span>
                <span className="self-center" onClick={(e) => e.stopPropagation()}>
                  <StarRating
                    rating={vendor.rating}
                    size="sm"
                    onRate={!isDemo ? (r) => handleRating(vendor.id, r) : undefined}
                  />
                </span>
                <span className="self-center">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border capitalize ${STATUS_COLORS[vendor.status || 'active']}`}>
                    {vendor.status || 'active'}
                  </span>
                </span>
                <span className="text-xs text-silver-500 self-center">
                  {vendor.lastService
                    ? new Date(vendor.lastService).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : '—'}
                </span>
              </button>

              {/* Expanded Details */}
              {expandedVendor === vendor.id && (
                <div className="px-6 py-5 bg-surface-elevated/30 border-b border-border/50">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Contact Info */}
                    <div>
                      <p className="text-xs text-silver-500 uppercase tracking-wide mb-3">Contact Information</p>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-silver-600">Email</p>
                          <p className="text-sm text-silver-300">{vendor.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-silver-600">Phone</p>
                          <p className="text-sm text-silver-300">{vendor.phone}</p>
                        </div>
                        {vendor.address && (
                          <div>
                            <p className="text-xs text-silver-600">Address</p>
                            <p className="text-sm text-silver-300">{vendor.address}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Credentials */}
                    <div>
                      <p className="text-xs text-silver-500 uppercase tracking-wide mb-3">Credentials</p>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-silver-600">License</p>
                          <p className="text-sm text-silver-300">{vendor.license || 'Not on file'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-silver-600">Insurance</p>
                          <p className="text-sm text-silver-300">{vendor.insurance || 'Not on file'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Notes & Actions */}
                    <div>
                      <p className="text-xs text-silver-500 uppercase tracking-wide mb-3">Notes</p>
                      <p className="text-sm text-silver-400 mb-4">
                        {vendor.notes || 'No notes yet.'}
                      </p>
                      {!isDemo && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(vendor)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-elevated text-silver-300 border border-border hover:text-text hover:border-border-light transition-all"
                          >
                            Edit Profile
                          </button>
                          <button
                            onClick={() => handleDelete(vendor.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-status-alert/10 text-status-alert border border-status-alert/20 hover:bg-status-alert/20 transition-all"
                          >
                            Remove
                          </button>
                        </div>
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <h2 className="font-serif text-xl text-text mb-2">No Vendors Yet</h2>
          <p className="text-silver-500 text-sm max-w-md mx-auto mb-6">
            Your vendor rolodex is empty. Add your first vendor to start tracking service providers, ratings, and credentials.
          </p>
          {!isDemo && (
            <button
              onClick={openAddModal}
              className="px-5 py-2.5 rounded-xl bg-[#C9B370] hover:bg-[#B8A460] text-obsidian text-sm font-medium transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add First Vendor
            </button>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-border-light rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-luxury">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <p className="overline mb-0.5">Vendor Profile</p>
                <h2 className="font-serif text-xl text-text">
                  {editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
                </h2>
              </div>
              <button
                onClick={() => { setShowModal(false); setEditingVendor(null); }}
                className="w-8 h-8 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-silver-400 hover:text-text transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Basic Info */}
              <div>
                <p className="text-[11px] font-medium text-silver-300 uppercase tracking-widest mb-3">Basic Information</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="input-label">Vendor / Business Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="input text-sm py-2.5 w-full"
                      placeholder="Aqua Elite Pool Services"
                      required
                    />
                  </div>
                  <div>
                    <label className="input-label">Company (optional)</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => updateField('company', e.target.value)}
                      className="input text-sm py-2.5 w-full"
                      placeholder="Parent company or DBA"
                    />
                  </div>
                  <div>
                    <label className="input-label">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => updateField('category', e.target.value)}
                      className="input text-sm py-2.5 w-full appearance-none cursor-pointer capitalize"
                    >
                      {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat} value={cat} className="capitalize">{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="input-label">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => updateField('status', e.target.value)}
                      className="input text-sm py-2.5 w-full appearance-none cursor-pointer capitalize"
                    >
                      <option value="active">Active</option>
                      <option value="preferred">Preferred</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="h-px bg-border/60" />

              {/* Contact */}
              <div>
                <p className="text-[11px] font-medium text-silver-300 uppercase tracking-widest mb-3">Contact</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="input-label">Contact Person</label>
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(e) => updateField('contact', e.target.value)}
                      className="input text-sm py-2.5 w-full"
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div>
                    <label className="input-label">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="input text-sm py-2.5 w-full"
                      placeholder="john@vendor.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="input-label">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="input text-sm py-2.5 w-full"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                  <div>
                    <label className="input-label">Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      className="input text-sm py-2.5 w-full"
                      placeholder="123 Main St, City, ST"
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-border/60" />

              {/* Credentials */}
              <div>
                <p className="text-[11px] font-medium text-silver-300 uppercase tracking-widest mb-3">Credentials</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="input-label">License Number</label>
                    <input
                      type="text"
                      value={formData.license}
                      onChange={(e) => updateField('license', e.target.value)}
                      className="input text-sm py-2.5 w-full"
                      placeholder="FL-CPO-2024-001"
                    />
                  </div>
                  <div>
                    <label className="input-label">Insurance Policy</label>
                    <input
                      type="text"
                      value={formData.insurance}
                      onChange={(e) => updateField('insurance', e.target.value)}
                      className="input text-sm py-2.5 w-full"
                      placeholder="Policy # or carrier"
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-border/60" />

              {/* Rating & Notes */}
              <div>
                <p className="text-[11px] font-medium text-silver-300 uppercase tracking-widest mb-3">Rating & Notes</p>
                <div className="mb-3">
                  <label className="input-label mb-2 block">Your Rating</label>
                  <StarRating rating={formData.rating} onRate={(r) => updateField('rating', r)} />
                </div>
                <div>
                  <label className="input-label">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    className="input text-sm py-2.5 w-full min-h-[80px] resize-none"
                    placeholder="Internal notes about this vendor..."
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
              <button
                onClick={() => { setShowModal(false); setEditingVendor(null); }}
                className="px-4 py-2 rounded-xl text-sm font-medium text-silver-400 hover:text-text transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || !formData.name || !formData.email || !formData.phone || !formData.contact}
                className="px-5 py-2 rounded-xl bg-[#C9B370] hover:bg-[#B8A460] text-obsidian text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : editingVendor ? 'Save Changes' : 'Add Vendor'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
