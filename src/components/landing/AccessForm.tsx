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

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12 animate-fade-in-up">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#C9B370]/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-[#C9B370]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="hero-display text-3xl text-white mb-3">Request Received</h3>
        <p className="text-silver-400 max-w-md mx-auto">
          Our concierge team will be in touch within 24 hours to discuss your requirements.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-silver-300 uppercase tracking-wider mb-4">
          Contact Information
        </h3>

        <div>
          <label htmlFor="name" className="input-label">Full Name</label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="input"
            placeholder="Alexander Chatman"
          />
        </div>

        <div>
          <label htmlFor="phone" className="input-label">Phone Number</label>
          <input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="input"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div>
          <label htmlFor="email" className="input-label">Email Address</label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="input"
            placeholder="alex@example.com"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => updateField('isBusiness', !formData.isBusiness)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
              formData.isBusiness ? 'bg-[#C9B370]' : 'bg-surface-elevated border border-border'
            }`}
            role="switch"
            aria-checked={formData.isBusiness}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                formData.isBusiness ? 'left-7' : 'left-1'
              }`}
            />
          </button>
          <span className="text-sm text-silver-300">This is a business inquiry</span>
        </div>
      </div>

      {/* Household Information */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="text-sm font-medium text-silver-300 uppercase tracking-wider mb-4">
          Household Details
        </h3>

        {/* Pets */}
        <div className="space-y-3">
          <p className="text-sm text-silver-300">Do you have pets?</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hasPets"
                checked={formData.hasPets === true}
                onChange={() => updateField('hasPets', true)}
                className="radio-luxury"
              />
              <span className="text-sm text-text">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hasPets"
                checked={formData.hasPets === false}
                onChange={() => updateField('hasPets', false)}
                className="radio-luxury"
              />
              <span className="text-sm text-text">No</span>
            </label>
          </div>
          {formData.hasPets && (
            <input
              type="number"
              min="1"
              value={formData.petCount}
              onChange={(e) => updateField('petCount', e.target.value)}
              className="input w-32"
              placeholder="How many?"
            />
          )}
        </div>

        {/* Children */}
        <div className="space-y-3">
          <p className="text-sm text-silver-300">Do you have children?</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hasChildren"
                checked={formData.hasChildren === true}
                onChange={() => updateField('hasChildren', true)}
                className="radio-luxury"
              />
              <span className="text-sm text-text">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hasChildren"
                checked={formData.hasChildren === false}
                onChange={() => updateField('hasChildren', false)}
                className="radio-luxury"
              />
              <span className="text-sm text-text">No</span>
            </label>
          </div>
          {formData.hasChildren && (
            <input
              type="number"
              min="1"
              value={formData.childrenCount}
              onChange={(e) => updateField('childrenCount', e.target.value)}
              className="input w-32"
              placeholder="How many?"
            />
          )}
        </div>

        {/* Married */}
        <div className="space-y-3">
          <p className="text-sm text-silver-300">Are you married?</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="isMarried"
                checked={formData.isMarried === true}
                onChange={() => updateField('isMarried', true)}
                className="radio-luxury"
              />
              <span className="text-sm text-text">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="isMarried"
                checked={formData.isMarried === false}
                onChange={() => updateField('isMarried', false)}
                className="radio-luxury"
              />
              <span className="text-sm text-text">No</span>
            </label>
          </div>
        </div>

        {/* Estates Count */}
        <div>
          <label htmlFor="estatesCount" className="input-label">
            How many estates do you manage?
          </label>
          <input
            id="estatesCount"
            type="number"
            min="1"
            value={formData.estatesCount}
            onChange={(e) => updateField('estatesCount', e.target.value)}
            className="input w-32"
            placeholder="1"
          />
        </div>
      </div>

      {/* Personal Preferences */}
      <div className="space-y-5 pt-4 border-t border-border">
        <h3 className="text-sm font-medium text-silver-300 uppercase tracking-wider mb-4">
          Personal Preferences
        </h3>

        {/* Don't call me hour */}
        <div>
          <label htmlFor="doNotCallHour" className="input-label">
            "Don't call me" hour
          </label>
          <p className="text-xs text-silver-500 mb-2">
            The hour when you prefer not to be disturbed
          </p>
          <select
            id="doNotCallHour"
            value={formData.doNotCallHour}
            onChange={(e) => updateField('doNotCallHour', e.target.value)}
            className="input appearance-none cursor-pointer"
          >
            <option value="">Select a time...</option>
            <option value="early-morning">5 AM - 7 AM (Early Morning)</option>
            <option value="morning">7 AM - 9 AM (Morning)</option>
            <option value="mid-day">12 PM - 2 PM (Midday)</option>
            <option value="afternoon">3 PM - 5 PM (Afternoon)</option>
            <option value="evening">6 PM - 8 PM (Evening)</option>
            <option value="night">8 PM - 10 PM (Night)</option>
            <option value="late-night">10 PM - 12 AM (Late Night)</option>
          </select>
        </div>

        {/* Arrival Feeling */}
        <div className="space-y-3">
          <p className="text-sm text-silver-300">
            When you arrive home, what feeling do you want?
          </p>
          <div className="grid grid-cols-1 gap-2">
            {[
              { value: 'calm', label: 'Calm & Serene', desc: 'Soft lighting, quiet ambiance' },
              { value: 'energized', label: 'Energized & Ready', desc: 'Bright, active environment' },
              { value: 'private', label: 'Private & Secure', desc: 'All systems engaged, minimal visibility' },
              { value: 'welcoming', label: 'Warm & Welcoming', desc: 'Cozy atmosphere, ambient lighting' },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                  formData.arrivalFeeling === option.value
                    ? 'border-[#C9B370]/50 bg-[#C9B370]/5'
                    : 'border-border hover:border-border-light'
                }`}
              >
                <input
                  type="radio"
                  name="arrivalFeeling"
                  value={option.value}
                  checked={formData.arrivalFeeling === option.value}
                  onChange={(e) => updateField('arrivalFeeling', e.target.value)}
                  className="radio-luxury mt-0.5"
                />
                <div>
                  <span className="text-sm text-text font-medium">{option.label}</span>
                  <p className="text-xs text-silver-500">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Estate Personality */}
        <div className="space-y-3">
          <p className="text-sm text-silver-300">
            What personality should your estate have?
          </p>
          <div className="grid grid-cols-1 gap-2">
            {[
              { value: 'invisible', label: 'Invisible & Anticipatory', desc: 'Everything handled before you ask' },
              { value: 'attentive', label: 'Attentive & Responsive', desc: 'Ready when you need it' },
              { value: 'proactive', label: 'Proactive & Informative', desc: 'Regular updates and suggestions' },
              { value: 'minimal', label: 'Minimal & Essential', desc: 'Only critical notifications' },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                  formData.estatePersonality === option.value
                    ? 'border-[#C9B370]/50 bg-[#C9B370]/5'
                    : 'border-border hover:border-border-light'
                }`}
              >
                <input
                  type="radio"
                  name="estatePersonality"
                  value={option.value}
                  checked={formData.estatePersonality === option.value}
                  onChange={(e) => updateField('estatePersonality', e.target.value)}
                  className="radio-luxury mt-0.5"
                />
                <div>
                  <span className="text-sm text-text font-medium">{option.label}</span>
                  <p className="text-xs text-silver-500">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-accent py-4 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </span>
        ) : (
          'Request Access'
        )}
      </button>

      <p className="text-xs text-silver-600 text-center">
        By submitting, you agree to our privacy policy and terms of service.
      </p>
    </form>
  );
}
