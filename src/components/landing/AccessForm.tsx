'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  isBusiness: boolean;
  hasPets: boolean | null;
  petCount: string;
  hasChildren: boolean | null;
  childrenCount: string;
  isMarried: boolean | null;
  estatesCount: string;
  doNotCallHour: string;
  arrivalFeeling: string;
  estatePersonality: string;
}

export default function AccessForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    isBusiness: false,
    hasPets: null,
    petCount: '',
    hasChildren: null,
    childrenCount: '',
    isMarried: null,
    estatesCount: '',
    doNotCallHour: '',
    arrivalFeeling: '',
    estatePersonality: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#C9B370]/20 flex items-center justify-center">
          <svg className="w-7 h-7 text-[#C9B370]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="hero-display text-2xl text-white mb-2">Request Received</h3>
        <p className="text-silver-400 text-sm">
          Our concierge team will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Contact Information - 2 columns */}
      <div>
        <h3 className="text-xs font-medium text-silver-400 uppercase tracking-wider mb-3">
          Contact Information
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="input text-sm py-2.5"
              placeholder="Full Name"
            />
          </div>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="input text-sm py-2.5"
            placeholder="Phone"
          />
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="input text-sm py-2.5"
            placeholder="Email"
          />
        </div>
        <label className="flex items-center gap-2 mt-3 cursor-pointer">
          <button
            type="button"
            onClick={() => updateField('isBusiness', !formData.isBusiness)}
            className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
              formData.isBusiness ? 'bg-[#C9B370]' : 'bg-surface-elevated border border-border'
            }`}
            role="switch"
            aria-checked={formData.isBusiness}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                formData.isBusiness ? 'left-5' : 'left-0.5'
              }`}
            />
          </button>
          <span className="text-xs text-silver-400">Business inquiry</span>
        </label>
      </div>

      {/* Household Details - Compact 2 columns */}
      <div className="pt-4 border-t border-border">
        <h3 className="text-xs font-medium text-silver-400 uppercase tracking-wider mb-3">
          Household Details
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {/* Pets */}
          <div>
            <p className="text-xs text-silver-400 mb-1.5">Pets?</p>
            <div className="flex gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" name="hasPets" checked={formData.hasPets === true}
                  onChange={() => updateField('hasPets', true)} className="radio-luxury w-4 h-4" />
                <span className="text-xs text-text">Yes</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" name="hasPets" checked={formData.hasPets === false}
                  onChange={() => updateField('hasPets', false)} className="radio-luxury w-4 h-4" />
                <span className="text-xs text-text">No</span>
              </label>
              {formData.hasPets && (
                <input type="number" min="1" value={formData.petCount}
                  onChange={(e) => updateField('petCount', e.target.value)}
                  className="input w-14 text-xs py-1 px-2" placeholder="#" />
              )}
            </div>
          </div>

          {/* Children */}
          <div>
            <p className="text-xs text-silver-400 mb-1.5">Children?</p>
            <div className="flex gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" name="hasChildren" checked={formData.hasChildren === true}
                  onChange={() => updateField('hasChildren', true)} className="radio-luxury w-4 h-4" />
                <span className="text-xs text-text">Yes</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" name="hasChildren" checked={formData.hasChildren === false}
                  onChange={() => updateField('hasChildren', false)} className="radio-luxury w-4 h-4" />
                <span className="text-xs text-text">No</span>
              </label>
              {formData.hasChildren && (
                <input type="number" min="1" value={formData.childrenCount}
                  onChange={(e) => updateField('childrenCount', e.target.value)}
                  className="input w-14 text-xs py-1 px-2" placeholder="#" />
              )}
            </div>
          </div>

          {/* Married */}
          <div>
            <p className="text-xs text-silver-400 mb-1.5">Married?</p>
            <div className="flex gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" name="isMarried" checked={formData.isMarried === true}
                  onChange={() => updateField('isMarried', true)} className="radio-luxury w-4 h-4" />
                <span className="text-xs text-text">Yes</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" name="isMarried" checked={formData.isMarried === false}
                  onChange={() => updateField('isMarried', false)} className="radio-luxury w-4 h-4" />
                <span className="text-xs text-text">No</span>
              </label>
            </div>
          </div>

          {/* Estates */}
          <div>
            <p className="text-xs text-silver-400 mb-1.5">Estates managed</p>
            <input type="number" min="1" value={formData.estatesCount}
              onChange={(e) => updateField('estatesCount', e.target.value)}
              className="input w-20 text-xs py-1.5" placeholder="1" />
          </div>
        </div>
      </div>

      {/* Personal Preferences - 2 columns */}
      <div className="pt-4 border-t border-border">
        <h3 className="text-xs font-medium text-silver-400 uppercase tracking-wider mb-3">
          Personal Preferences
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Don't call me hour */}
          <div>
            <p className="text-xs text-silver-400 mb-1.5">"Don't call me" hour</p>
            <select value={formData.doNotCallHour}
              onChange={(e) => updateField('doNotCallHour', e.target.value)}
              className="input text-xs py-2 appearance-none cursor-pointer">
              <option value="">Select...</option>
              <option value="early-morning">5-7 AM</option>
              <option value="morning">7-9 AM</option>
              <option value="mid-day">12-2 PM</option>
              <option value="afternoon">3-5 PM</option>
              <option value="evening">6-8 PM</option>
              <option value="night">8-10 PM</option>
              <option value="late-night">10 PM-12 AM</option>
            </select>
          </div>

          {/* Arrival Feeling */}
          <div>
            <p className="text-xs text-silver-400 mb-1.5">Arrival feeling</p>
            <select value={formData.arrivalFeeling}
              onChange={(e) => updateField('arrivalFeeling', e.target.value)}
              className="input text-xs py-2 appearance-none cursor-pointer">
              <option value="">Select...</option>
              <option value="calm">Calm & Serene</option>
              <option value="energized">Energized & Ready</option>
              <option value="private">Private & Secure</option>
              <option value="welcoming">Warm & Welcoming</option>
            </select>
          </div>

          {/* Estate Personality - full width */}
          <div className="col-span-2">
            <p className="text-xs text-silver-400 mb-1.5">Estate personality</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'invisible', label: 'Invisible', desc: 'Handled before you ask' },
                { value: 'attentive', label: 'Attentive', desc: 'Ready when needed' },
                { value: 'proactive', label: 'Proactive', desc: 'Regular updates' },
                { value: 'minimal', label: 'Minimal', desc: 'Critical only' },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all text-xs ${
                    formData.estatePersonality === option.value
                      ? 'border-[#C9B370]/50 bg-[#C9B370]/5'
                      : 'border-border hover:border-border-light'
                  }`}
                >
                  <input type="radio" name="estatePersonality" value={option.value}
                    checked={formData.estatePersonality === option.value}
                    onChange={(e) => updateField('estatePersonality', e.target.value)}
                    className="radio-luxury w-3.5 h-3.5" />
                  <div>
                    <span className="text-text font-medium">{option.label}</span>
                    <p className="text-[10px] text-silver-500 leading-tight">{option.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-accent py-3 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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

      <p className="text-[10px] text-silver-600 text-center">
        By submitting, you agree to our privacy policy and terms of service.
      </p>
    </form>
  );
}
