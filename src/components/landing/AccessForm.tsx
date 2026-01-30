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
  const [step, setStep] = useState(1);
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
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = formData.firstName && formData.lastName && formData.email && formData.phone;

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
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
    <form onSubmit={handleSubmit}>
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-3 mb-4 md:mb-5">
        <div className={`flex items-center gap-2 text-xs font-medium ${step === 1 ? 'text-[#C9B370]' : 'text-silver-500'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold ${step === 1 ? 'bg-[#C9B370]/15 border border-[#C9B370]/30 text-[#C9B370]' : 'bg-surface-overlay border border-border text-silver-500'}`}>1</span>
          About You
        </div>
        <div className="w-8 h-px bg-border" />
        <div className={`flex items-center gap-2 text-xs font-medium ${step === 2 ? 'text-[#C9B370]' : 'text-silver-500'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold ${step === 2 ? 'bg-[#C9B370]/15 border border-[#C9B370]/30 text-[#C9B370]' : 'bg-surface-overlay border border-border text-silver-500'}`}>2</span>
          Preferences
        </div>
      </div>

      {/* ════════════════ STEP 1 ════════════════ */}
      <div className={step === 1 ? 'block' : 'hidden'}>
        <div className="space-y-3 md:space-y-4">
          {/* Contact */}
          <div>
            <p className="text-[11px] font-medium text-silver-300 uppercase tracking-widest mb-2">
              Contact
            </p>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={e => updateField('firstName', e.target.value)}
                className="input text-sm py-2"
                placeholder="First Name"
              />
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={e => updateField('lastName', e.target.value)}
                className="input text-sm py-2"
                placeholder="Last Name"
              />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={e => updateField('phone', e.target.value)}
                className="input text-sm py-2"
                placeholder="Phone"
              />
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => updateField('email', e.target.value)}
                className="input text-sm py-2"
                placeholder="Email"
              />
            </div>
          </div>

          {/* Commercial Toggle */}
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
              <span className="text-xs text-silver-300">Includes commercial property</span>
            </label>
            {formData.isCommercial && (
              <div className="mt-2 ml-[52px]">
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={e => updateField('companyName', e.target.value)}
                  className="input text-sm py-2 w-full"
                  placeholder="Company (optional)"
                />
              </div>
            )}
          </div>

          <div className="h-px bg-border/60" />

          {/* Household */}
          <div>
            <p className="text-[11px] font-medium text-silver-300 uppercase tracking-widest mb-2">
              Household
            </p>
            <div className="space-y-2.5">
              {/* Pets */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-silver-200">Pets?</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    {([true, false] as const).map(val => (
                      <button
                        key={String(val)}
                        type="button"
                        onClick={() => updateField('hasPets', val)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
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
                      className="input w-14 text-xs py-1.5 text-center"
                      placeholder="#"
                    />
                  )}
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-silver-200">Children?</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    {([true, false] as const).map(val => (
                      <button
                        key={String(val)}
                        type="button"
                        onClick={() => updateField('hasChildren', val)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
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
                      className="input w-14 text-xs py-1.5 text-center"
                      placeholder="#"
                    />
                  )}
                </div>
              </div>

              {/* Married */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-silver-200">Married?</span>
                <div className="flex gap-1.5">
                  {([true, false] as const).map(val => (
                    <button
                      key={String(val)}
                      type="button"
                      onClick={() => updateField('isMarried', val)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
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
        </div>

        {/* Next button */}
        <button
          type="button"
          onClick={() => setStep(2)}
          disabled={!canProceed}
          className="w-full mt-4 bg-[#C9B370] hover:bg-[#B8A460] text-obsidian py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>

      {/* ════════════════ STEP 2 ════════════════ */}
      <div className={step === 2 ? 'block' : 'hidden'}>
        <div className="space-y-3 md:space-y-4">
          {/* Estates / Assets */}
          <div>
            <p className="text-[11px] font-medium text-silver-300 uppercase tracking-widest mb-1">
              Estates Under Oversight
            </p>
            <p className="text-[10px] text-silver-600 mb-2">Properties needing concierge presence</p>
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

          {/* Preferences */}
          <div>
            <p className="text-[11px] font-medium text-silver-300 uppercase tracking-widest mb-2">
              Preferences
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <p className="text-xs text-silver-300 mb-1.5">&ldquo;Don&apos;t call me&rdquo; hour</p>
                <select
                  value={formData.doNotCallHour}
                  onChange={e => updateField('doNotCallHour', e.target.value)}
                  className="input text-xs py-2 w-full appearance-none cursor-pointer"
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
                  className="input text-xs py-2 w-full appearance-none cursor-pointer"
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
                  className={`text-left p-2.5 rounded-xl border transition-all ${
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
        </div>

        {/* Back + Submit */}
        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-silver-400 border border-border hover:border-border-light hover:text-silver-200 transition-all"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-[#C9B370] hover:bg-[#B8A460] text-obsidian py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
        </div>

        <p className="text-center text-[10px] text-silver-600 mt-3">
          Discretion is standard.{' '}
          <a href="/privacy" target="_blank" className="text-silver-400 hover:text-[#C9B370] transition-colors underline underline-offset-2">Privacy</a>
          {' '}&middot;{' '}
          <a href="/terms" target="_blank" className="text-silver-400 hover:text-[#C9B370] transition-colors underline underline-offset-2">Terms</a>
        </p>
      </div>
    </form>
  );
}
