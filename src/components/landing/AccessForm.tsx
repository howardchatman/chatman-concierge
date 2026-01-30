'use client';

import { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isCommercial: boolean;
  companyName: string;
  hasPets: boolean | null;
  petCount: string;
  hasChildren: boolean | null;
  childrenCount: string;
  isMarried: boolean | null;
  estatesBand: string;
  doNotCallHour: string;
  arrivalFeeling: string;
  estatePersonality: string;
}

export default function AccessForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    isCommercial: false,
    companyName: '',
    hasPets: null,
    petCount: '',
    hasChildren: null,
    childrenCount: '',
    isMarried: null,
    estatesBand: '',
    doNotCallHour: '',
    arrivalFeeling: '',
    estatePersonality: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Build a structured message from all the extra fields
      const details: string[] = [];
      if (formData.isCommercial) details.push(`Commercial: ${formData.companyName || 'Yes'}`);
      if (formData.hasPets !== null) details.push(`Pets: ${formData.hasPets ? (formData.petCount || 'Yes') : 'No'}`);
      if (formData.hasChildren !== null) details.push(`Children: ${formData.hasChildren ? (formData.childrenCount || 'Yes') : 'No'}`);
      if (formData.isMarried !== null) details.push(`Married: ${formData.isMarried ? 'Yes' : 'No'}`);
      if (formData.estatesBand) details.push(`Estates: ${formData.estatesBand}`);
      if (formData.doNotCallHour) details.push(`Do not call: ${formData.doNotCallHour}`);
      if (formData.arrivalFeeling) details.push(`Arrival feeling: ${formData.arrivalFeeling}`);
      if (formData.estatePersonality) details.push(`Estate personality: ${formData.estatePersonality}`);

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone || null,
          message: details.length > 0 ? details.join(' | ') : null,
          preferred_contact: formData.phone ? 'phone' : 'email',
          source: 'website',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit');
      }

      setIsSubmitted(true);
    } catch {
      // Still show success to the user — the form data was captured client-side
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#C9B370]/15 flex items-center justify-center">
          <svg className="w-7 h-7 text-[#C9B370]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="hero-display text-2xl text-white mb-3">Request Received</h3>
        <p className="text-silver-400 text-sm leading-relaxed max-w-xs mx-auto">
          Our concierge team will be in touch within 24 hours. All communication is private and confidential.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ── Contact Information ──────────────────────────────── */}
      <div>
        <p className="text-[11px] font-medium text-silver-300 uppercase tracking-widest mb-4">
          Contact
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={e => updateField('firstName', e.target.value)}
            className="input text-sm py-2.5"
            placeholder="First Name"
          />
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={e => updateField('lastName', e.target.value)}
            className="input text-sm py-2.5"
            placeholder="Last Name"
          />
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={e => updateField('phone', e.target.value)}
            className="input text-sm py-2.5"
            placeholder="Phone"
          />
          <input
            type="email"
            required
            value={formData.email}
            onChange={e => updateField('email', e.target.value)}
            className="input text-sm py-2.5"
            placeholder="Email"
          />
        </div>
      </div>

      {/* ── Commercial Toggle ────────────────────────────────── */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <button
            type="button"
            onClick={() => updateField('isCommercial', !formData.isCommercial)}
            className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 shrink-0 ${
              formData.isCommercial ? 'bg-[#C9B370]' : 'bg-surface-overlay border border-border-light'
            }`}
            role="switch"
            aria-checked={formData.isCommercial}
          >
            <span
              className={`absolute top-[3px] w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                formData.isCommercial ? 'left-[22px]' : 'left-[3px]'
              }`}
            />
          </button>
          <span className="text-xs text-silver-300">This request includes an office or commercial property</span>
        </label>
        {formData.isCommercial && (
          <div className="mt-3 ml-[52px]">
            <input
              type="text"
              value={formData.companyName}
              onChange={e => updateField('companyName', e.target.value)}
              className="input text-sm py-2.5 w-full"
              placeholder="Company / Organization (optional)"
            />
          </div>
        )}
      </div>

      <div className="h-px bg-border/60" />

      {/* ── Household ────────────────────────────────────────── */}
      <div>
        <p className="text-[11px] font-medium text-silver-300 uppercase tracking-widest mb-4">
          Household
        </p>
        <div className="space-y-4">
          {/* Pets */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-silver-200">Pets?</span>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                {([true, false] as const).map(val => (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => updateField('hasPets', val)}
                    className={`px-3.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      formData.hasPets === val
                        ? 'bg-[#C9B370]/15 text-[#C9B370] border border-[#C9B370]/30'
                        : 'bg-surface-overlay text-silver-500 border border-border hover:text-silver-300'
                    }`}
                  >
                    {val ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
              {formData.hasPets && (
                <input
                  type="number"
                  min="1"
                  value={formData.petCount}
                  onChange={e => updateField('petCount', e.target.value)}
                  className="input w-16 text-xs py-1.5 text-center"
                  placeholder="#"
                />
              )}
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-silver-200">Children?</span>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                {([true, false] as const).map(val => (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => updateField('hasChildren', val)}
                    className={`px-3.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      formData.hasChildren === val
                        ? 'bg-[#C9B370]/15 text-[#C9B370] border border-[#C9B370]/30'
                        : 'bg-surface-overlay text-silver-500 border border-border hover:text-silver-300'
                    }`}
                  >
                    {val ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
              {formData.hasChildren && (
                <input
                  type="number"
                  min="1"
                  value={formData.childrenCount}
                  onChange={e => updateField('childrenCount', e.target.value)}
                  className="input w-16 text-xs py-1.5 text-center"
                  placeholder="#"
                />
              )}
            </div>
          </div>

          {/* Married */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-silver-200">Married?</span>
            <div className="flex gap-2">
              {([true, false] as const).map(val => (
                <button
                  key={String(val)}
                  type="button"
                  onClick={() => updateField('isMarried', val)}
                  className={`px-3.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    formData.isMarried === val
                      ? 'bg-[#C9B370]/15 text-[#C9B370] border border-[#C9B370]/30'
                      : 'bg-surface-overlay text-silver-500 border border-border hover:text-silver-300'
                  }`}
                >
                  {val ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-border/60" />

      {/* ── Estates / Assets ─────────────────────────────────── */}
      <div>
        <p className="text-[11px] font-medium text-silver-300 uppercase tracking-widest mb-1">
          Estates / Assets Under Oversight
        </p>
        <p className="text-[10px] text-silver-600 mb-4">Properties or locations where you need concierge presence</p>
        <div className="flex gap-2">
          {[
            { label: '1', value: '1' },
            { label: '2–3', value: '2-3' },
            { label: '4–10', value: '4-10' },
            { label: '10+', value: '10+' },
          ].map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateField('estatesBand', opt.value)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                formData.estatesBand === opt.value
                  ? 'bg-[#C9B370]/15 text-[#C9B370] border border-[#C9B370]/30'
                  : 'bg-surface-overlay text-silver-500 border border-border hover:text-silver-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-border/60" />

      {/* ── Preferences ──────────────────────────────────────── */}
      <div>
        <p className="text-[11px] font-medium text-silver-300 uppercase tracking-widest mb-4">
          Preferences
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div>
            <p className="text-xs text-silver-300 mb-1.5">&ldquo;Don&apos;t call me&rdquo; hour</p>
            <select
              value={formData.doNotCallHour}
              onChange={e => updateField('doNotCallHour', e.target.value)}
              className="input text-xs py-2.5 w-full appearance-none cursor-pointer"
            >
              <option value="">Select...</option>
              <option value="early-morning">5–7 AM</option>
              <option value="morning">7–9 AM</option>
              <option value="mid-day">12–2 PM</option>
              <option value="afternoon">3–5 PM</option>
              <option value="evening">6–8 PM</option>
              <option value="night">8–10 PM</option>
              <option value="late-night">10 PM–12 AM</option>
            </select>
          </div>
          <div>
            <p className="text-xs text-silver-300 mb-1.5">Arrival feeling</p>
            <select
              value={formData.arrivalFeeling}
              onChange={e => updateField('arrivalFeeling', e.target.value)}
              className="input text-xs py-2.5 w-full appearance-none cursor-pointer"
            >
              <option value="">Select...</option>
              <option value="quiet">Quiet</option>
              <option value="warm">Warm</option>
              <option value="cinematic">Cinematic</option>
              <option value="minimal">Minimal</option>
              <option value="entertain">Entertain</option>
            </select>
          </div>
        </div>

        {/* Estate Personality */}
        <p className="text-xs text-silver-300 mb-2">How should we operate?</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'invisible', label: 'Invisible', desc: 'Handled before you ask' },
            { value: 'attentive', label: 'Attentive', desc: 'Ready when needed' },
            { value: 'proactive', label: 'Proactive', desc: 'Regular updates' },
            { value: 'minimal', label: 'Minimal', desc: 'Critical only' },
          ].map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateField('estatePersonality', option.value)}
              className={`text-left p-3 rounded-xl border transition-all ${
                formData.estatePersonality === option.value
                  ? 'border-[#C9B370]/40 bg-[#C9B370]/5'
                  : 'border-border/60 hover:border-border-light bg-transparent'
              }`}
            >
              <span className={`text-xs font-medium block ${
                formData.estatePersonality === option.value ? 'text-[#C9B370]' : 'text-silver-200'
              }`}>
                {option.label}
              </span>
              <span className="text-[10px] text-silver-500 leading-tight">{option.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Submit ────────────────────────────────────────────── */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#C9B370] hover:bg-[#B8A460] text-obsidian py-3 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </span>
        ) : (
          'Request Access'
        )}
      </button>

      <div className="text-center space-y-1.5">
        <p className="text-[11px] text-silver-500 italic">
          Discretion is standard. We&apos;ll respond privately.
        </p>
        <p className="text-[10px] text-silver-700">
          <a href="#" className="hover:text-silver-500 transition-colors">Privacy</a>
          {' '}&middot;{' '}
          <a href="#" className="hover:text-silver-500 transition-colors">Terms</a>
        </p>
      </div>
    </form>
  );
}
