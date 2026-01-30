'use client';

import { useState, useMemo, useEffect } from 'react';

// ─── Types ───────────────────────────────────────────────────────────

type AssetCountBand = 'ONE' | 'TWO_TO_THREE' | 'FOUR_TO_FIVE' | 'SIX_TO_TEN' | 'TEN_PLUS';
type PrimaryAssetType = 'RESIDENTIAL_ONLY' | 'MIXED_RESIDENTIAL' | 'COMMERCIAL_HQ' | 'PUBLIC_REGULATED' | 'MISSION_CRITICAL';
type AvailabilityLevel = 'BUSINESS_HOURS' | 'AFTER_HOURS' | 'TWENTY_FOUR_SEVEN' | 'NEVER_FAIL';
type ReportingLevel = 'EXCEPTION_ONLY' | 'SUMMARY' | 'DETAILED' | 'AUDIT_COMPLIANCE';
type FailureImpact = 'PRIVATE_INCONVENIENCE' | 'FINANCIAL_LOSS' | 'LEGAL_EXPOSURE' | 'REPUTATIONAL_EXEC_RISK';
type AuthorityLevel = 'STANDARD_OVERSIGHT' | 'SENIOR_OVERSIGHT' | 'HIGH_AUTHORITY_ENGAGEMENT' | 'CRITICAL_AUTHORITY_ASSIGNMENT';
type EngagementLoadLabel = 'LIGHT' | 'MODERATE' | 'SIGNIFICANT' | 'SEVERE';
type ConfidenceIndicator = 'NORMAL' | 'ELEVATED_RISK' | 'HIGH_EXPOSURE';

interface AssessmentState {
  clientName: string;
  engagementType: '' | 'private-estate' | 'estate-portfolio' | 'commercial-mixed';
  conciergeLead: string;
  dateInitiated: string;
  status: 'draft' | 'reviewed' | 'approved';

  assetCountBand: AssetCountBand | null;
  primaryAssetType: PrimaryAssetType | null;
  availability: AvailabilityLevel | null;
  reporting: ReportingLevel | null;
  vendorEntityCount: number | null;
  failureImpact: FailureImpact | null;

  notes: string;
  manualOverride: boolean;
  overrideRetainer: string;
  overrideReason: string;
  founderApproval: boolean;

  isLocked: boolean;
}

const initialState: AssessmentState = {
  clientName: '',
  engagementType: '',
  conciergeLead: '',
  dateInitiated: new Date().toISOString().split('T')[0],
  status: 'draft',
  assetCountBand: null,
  primaryAssetType: null,
  availability: null,
  reporting: null,
  vendorEntityCount: null,
  failureImpact: null,
  notes: '',
  manualOverride: false,
  overrideRetainer: '',
  overrideReason: '',
  founderApproval: false,
  isLocked: false,
};

// ─── Pricing Config ──────────────────────────────────────────────────

const PRICING_CONFIG = {
  baseAuthorityFloorMonthly: 7500,

  assetMultiplier: {
    ONE: 1.0,
    TWO_TO_THREE: 1.8,
    FOUR_TO_FIVE: 2.5,
    SIX_TO_TEN: 3.5,
    TEN_PLUS: 5.0,
  } as Record<AssetCountBand, number>,

  typeAddMonthly: {
    RESIDENTIAL_ONLY: 0,
    MIXED_RESIDENTIAL: 2500,
    COMMERCIAL_HQ: 5000,
    PUBLIC_REGULATED: 7500,
    MISSION_CRITICAL: 10000,
  } as Record<PrimaryAssetType, number>,

  availabilityAddMonthly: {
    BUSINESS_HOURS: 0,
    AFTER_HOURS: 2500,
    TWENTY_FOUR_SEVEN: 5000,
    NEVER_FAIL: 10000,
  } as Record<AvailabilityLevel, number>,

  reportingAddMonthly: {
    EXCEPTION_ONLY: 0,
    SUMMARY: 2500,
    DETAILED: 5000,
    AUDIT_COMPLIANCE: 7500,
  } as Record<ReportingLevel, number>,

  vendorAddMonthly: [
    { max: 5, add: 0 },
    { max: 10, add: 2500 },
    { max: 20, add: 5000 },
    { max: Infinity, add: 7500 },
  ],

  riskAddMonthly: {
    PRIVATE_INCONVENIENCE: 0,
    FINANCIAL_LOSS: 5000,
    LEGAL_EXPOSURE: 7500,
    REPUTATIONAL_EXEC_RISK: 15000,
  } as Record<FailureImpact, number>,

  roundingStep: 2500,

  scoreWeights: {
    assetBand: { ONE: 10, TWO_TO_THREE: 18, FOUR_TO_FIVE: 25, SIX_TO_TEN: 35, TEN_PLUS: 50 } as Record<AssetCountBand, number>,
    type: { RESIDENTIAL_ONLY: 0, MIXED_RESIDENTIAL: 8, COMMERCIAL_HQ: 15, PUBLIC_REGULATED: 22, MISSION_CRITICAL: 28 } as Record<PrimaryAssetType, number>,
    availability: { BUSINESS_HOURS: 0, AFTER_HOURS: 10, TWENTY_FOUR_SEVEN: 18, NEVER_FAIL: 30 } as Record<AvailabilityLevel, number>,
    reporting: { EXCEPTION_ONLY: 0, SUMMARY: 6, DETAILED: 12, AUDIT_COMPLIANCE: 18 } as Record<ReportingLevel, number>,
    vendor: { LE_5: 0, SIX_TO_TEN: 6, ELEVEN_TO_TWENTY: 12, GT_20: 18 },
    risk: { PRIVATE_INCONVENIENCE: 0, FINANCIAL_LOSS: 12, LEGAL_EXPOSURE: 18, REPUTATIONAL_EXEC_RISK: 30 } as Record<FailureImpact, number>,
  },

  authorityThresholds: [
    { maxScore: 45, level: 'STANDARD_OVERSIGHT' as AuthorityLevel, load: 'LIGHT' as EngagementLoadLabel },
    { maxScore: 75, level: 'SENIOR_OVERSIGHT' as AuthorityLevel, load: 'MODERATE' as EngagementLoadLabel },
    { maxScore: 110, level: 'HIGH_AUTHORITY_ENGAGEMENT' as AuthorityLevel, load: 'SIGNIFICANT' as EngagementLoadLabel },
    { maxScore: Infinity, level: 'CRITICAL_AUTHORITY_ASSIGNMENT' as AuthorityLevel, load: 'SEVERE' as EngagementLoadLabel },
  ],

  scripts: {
    STANDARD_OVERSIGHT: [
      'Once scope is finalized, we structure this as an ongoing oversight engagement.',
      'We remain responsible so nothing falls back on you.',
    ],
    SENIOR_OVERSIGHT: [
      'Given the scope and responsibility involved, this falls under a senior oversight engagement.',
      "We'll outline terms after the review so the level of authority is clear.",
    ],
    HIGH_AUTHORITY_ENGAGEMENT: [
      'This requires high-authority oversight to maintain continuity across assets.',
      'After the review, we present engagement terms aligned to responsibility and response expectations.',
    ],
    CRITICAL_AUTHORITY_ASSIGNMENT: [
      "This is a critical authority assignment — continuity and exposure require permanent oversight.",
      "We'll deliver private terms after the review that match the responsibility being delegated.",
    ],
  } as Record<AuthorityLevel, string[]>,
};

// ─── Scoring Helpers ─────────────────────────────────────────────────

function roundUpToStep(value: number, step: number): number {
  return Math.ceil(value / step) * step;
}

function getVendorAddMonthly(count: number): number {
  for (const b of PRICING_CONFIG.vendorAddMonthly) {
    if (count <= b.max) return b.add;
  }
  return 0;
}

function getVendorScoreAdd(count: number): number {
  const v = PRICING_CONFIG.scoreWeights.vendor;
  if (count <= 5) return v.LE_5;
  if (count <= 10) return v.SIX_TO_TEN;
  if (count <= 20) return v.ELEVEN_TO_TWENTY;
  return v.GT_20;
}

const AUTHORITY_LABELS: Record<AuthorityLevel, string> = {
  STANDARD_OVERSIGHT: 'Standard Oversight',
  SENIOR_OVERSIGHT: 'Senior Oversight',
  HIGH_AUTHORITY_ENGAGEMENT: 'High Authority Engagement',
  CRITICAL_AUTHORITY_ASSIGNMENT: 'Critical Authority Assignment',
};

const LOAD_LABELS: Record<EngagementLoadLabel, string> = {
  LIGHT: 'Light',
  MODERATE: 'Moderate',
  SIGNIFICANT: 'Significant',
  SEVERE: 'Severe',
};

// ─── Component ───────────────────────────────────────────────────────

export default function ScopeAssessmentPage() {
  const [state, setState] = useState<AssessmentState>(initialState);
  const [saved, setSaved] = useState(false);

  const update = (patch: Partial<AssessmentState>) => {
    if (state.isLocked) return;
    setState(prev => ({ ...prev, ...patch }));
    setSaved(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem('scope-assessment');
    if (stored) {
      try { setState(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, []);

  // ─── Computed Outputs ────────────────────────────────────────────

  const computed = useMemo(() => {
    const { assetCountBand, primaryAssetType, availability, reporting, vendorEntityCount, failureImpact } = state;
    const w = PRICING_CONFIG.scoreWeights;

    // Count how many sections are answered
    const fields = [assetCountBand, primaryAssetType, availability, reporting, vendorEntityCount, failureImpact];
    const answered = fields.filter(v => v !== null).length;

    // Score
    const score =
      (assetCountBand ? w.assetBand[assetCountBand] : 0) +
      (primaryAssetType ? w.type[primaryAssetType] : 0) +
      (availability ? w.availability[availability] : 0) +
      (reporting ? w.reporting[reporting] : 0) +
      (vendorEntityCount !== null ? getVendorScoreAdd(vendorEntityCount) : 0) +
      (failureImpact ? w.risk[failureImpact] : 0);

    // Authority level + load
    let authorityLevel: AuthorityLevel = 'STANDARD_OVERSIGHT';
    let engagementLoad: EngagementLoadLabel = 'LIGHT';
    for (const t of PRICING_CONFIG.authorityThresholds) {
      if (score <= t.maxScore) {
        authorityLevel = t.level;
        engagementLoad = t.load;
        break;
      }
    }

    // Retainer calculation
    let retainer = 0;
    if (answered > 0) {
      const base = PRICING_CONFIG.baseAuthorityFloorMonthly * (assetCountBand ? PRICING_CONFIG.assetMultiplier[assetCountBand] : 1);
      const addType = primaryAssetType ? PRICING_CONFIG.typeAddMonthly[primaryAssetType] : 0;
      const addAvail = availability ? PRICING_CONFIG.availabilityAddMonthly[availability] : 0;
      const addReport = reporting ? PRICING_CONFIG.reportingAddMonthly[reporting] : 0;
      const addVendor = vendorEntityCount !== null ? getVendorAddMonthly(vendorEntityCount) : 0;
      const addRisk = failureImpact ? PRICING_CONFIG.riskAddMonthly[failureImpact] : 0;
      retainer = roundUpToStep(base + addType + addAvail + addReport + addVendor + addRisk, PRICING_CONFIG.roundingStep);
    }

    // Override
    const overrideActive = state.manualOverride && state.founderApproval && state.overrideRetainer !== '';
    const displayRetainer = overrideActive
      ? roundUpToStep(parseInt(state.overrideRetainer) || 0, PRICING_CONFIG.roundingStep)
      : retainer;

    // Confidence — based on input severity, not just completion
    let confidence: ConfidenceIndicator = 'NORMAL';
    if (
      failureImpact === 'REPUTATIONAL_EXEC_RISK' ||
      primaryAssetType === 'MISSION_CRITICAL' ||
      availability === 'NEVER_FAIL' ||
      reporting === 'AUDIT_COMPLIANCE'
    ) {
      confidence = 'HIGH_EXPOSURE';
    } else if (
      failureImpact === 'LEGAL_EXPOSURE' ||
      primaryAssetType === 'PUBLIC_REGULATED' ||
      availability === 'TWENTY_FOUR_SEVEN'
    ) {
      confidence = 'ELEVATED_RISK';
    }

    // Internal hints
    const hints: string[] = [];
    if (assetCountBand && assetCountBand !== 'ONE') hints.push('Multi-asset coordination increases complexity non-linearly.');
    if (availability === 'NEVER_FAIL') hints.push('Never-fail expectation: ensure escalation coverage and staffing.');
    if (reporting === 'AUDIT_COMPLIANCE') hints.push('Audit/compliance reporting: confirm documentation workflow and retention.');
    if (failureImpact === 'REPUTATIONAL_EXEC_RISK') hints.push('Reputational/executive exposure: prioritize redundancy and response.');
    if (vendorEntityCount !== null && vendorEntityCount > 10) hints.push('High vendor load: consider dedicated concierge coordination capacity.');

    return { score, authorityLevel, engagementLoad, retainer: displayRetainer, confidence, answered, hints, overrideActive };
  }, [
    state.assetCountBand, state.primaryAssetType, state.availability, state.reporting,
    state.vendorEntityCount, state.failureImpact, state.manualOverride, state.founderApproval, state.overrideRetainer,
  ]);

  // ─── Actions ─────────────────────────────────────────────────────

  const handleSave = () => {
    localStorage.setItem('scope-assessment', JSON.stringify(state));
    setSaved(true);
  };

  const handleLock = () => {
    setState(prev => ({ ...prev, isLocked: !prev.isLocked }));
  };

  const handleReset = () => {
    if (window.confirm('Reset all fields? This cannot be undone.')) {
      setState(initialState);
      localStorage.removeItem('scope-assessment');
      setSaved(false);
    }
  };

  // ─── Render Helpers ──────────────────────────────────────────────

  function RadioGroup<T extends string>({ value, options, onChange, name }: {
    value: T | null;
    options: { label: string; value: T }[];
    onChange: (v: T) => void;
    name: string;
  }) {
    return (
      <div className="space-y-2">
        {options.map(opt => (
          <label key={opt.value} className="radio-luxury">
            <input
              type="radio"
              name={name}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              disabled={state.isLocked}
            />
            <span className="text-sm text-silver-300">{opt.label}</span>
          </label>
        ))}
      </div>
    );
  }

  const confidenceConfig: Record<ConfidenceIndicator, { dot: string; label: string; color: string }> = {
    NORMAL: { dot: 'status-dot status-dot-secure', label: 'Normal', color: 'text-status-secure' },
    ELEVATED_RISK: { dot: 'status-dot status-dot-warning', label: 'Elevated Risk', color: 'text-status-warning' },
    HIGH_EXPOSURE: { dot: 'status-dot status-dot-alert', label: 'High Exposure', color: 'text-status-alert' },
  };

  const conf = confidenceConfig[computed.confidence];
  const scripts = PRICING_CONFIG.scripts[computed.authorityLevel];

  // ─── Render ──────────────────────────────────────────────────────

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-serif text-text mb-1">Scope &amp; Authority Assessment</h1>
          <p className="text-xs text-silver-600 tracking-wide uppercase">Internal use only &middot; Do not share externally</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleSave} className="btn-primary text-sm" disabled={state.isLocked}>
            {saved ? 'Saved' : 'Save Assessment'}
          </button>
          <button onClick={handleLock} className="btn-secondary text-sm">
            {state.isLocked ? 'Unlock' : 'Lock Assessment'}
          </button>
          <button onClick={handleReset} className="btn-ghost text-sm" disabled={state.isLocked}>
            Reset
          </button>
        </div>
      </div>

      {state.isLocked && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-elevated border border-border text-sm text-silver-400">
          <svg className="w-4 h-4 text-[#C9B370]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          Assessment is locked. Unlock to make changes.
        </div>
      )}

      {/* ── THREE-COLUMN LAYOUT ────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-6">

        {/* ── LEFT COLUMN: Client Context ──────────────────────── */}
        <div className="col-span-3">
          <div className="card space-y-5">
            <p className="overline text-[#C9B370]">Client Context</p>

            <div>
              <label className="input-label">Client Name</label>
              <input
                type="text"
                className="input w-full"
                value={state.clientName}
                onChange={e => update({ clientName: e.target.value })}
                placeholder="Full name or entity"
                disabled={state.isLocked}
              />
            </div>

            <div>
              <label className="input-label">Engagement Type</label>
              <div className="space-y-2 mt-2">
                {([
                  { label: 'Private Estate', value: 'private-estate' as const },
                  { label: 'Estate Portfolio', value: 'estate-portfolio' as const },
                  { label: 'Commercial / Mixed-Use', value: 'commercial-mixed' as const },
                ]).map(opt => (
                  <label key={opt.value} className="radio-luxury">
                    <input
                      type="radio"
                      name="engagementType"
                      checked={state.engagementType === opt.value}
                      onChange={() => update({ engagementType: opt.value })}
                      disabled={state.isLocked}
                    />
                    <span className="text-sm text-silver-300">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="input-label">Concierge Lead</label>
              <select
                className="input w-full"
                value={state.conciergeLead}
                onChange={e => update({ conciergeLead: e.target.value })}
                disabled={state.isLocked}
              >
                <option value="">Select lead...</option>
                <option value="howard">Howard Chatman</option>
                <option value="unassigned">Unassigned</option>
              </select>
            </div>

            <div>
              <label className="input-label">Date Initiated</label>
              <input
                type="date"
                className="input w-full"
                value={state.dateInitiated}
                onChange={e => update({ dateInitiated: e.target.value })}
                disabled={state.isLocked}
              />
            </div>

            <div>
              <label className="input-label">Status</label>
              <div className="flex gap-2 mt-2">
                {(['draft', 'reviewed', 'approved'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => update({ status: s })}
                    disabled={state.isLocked}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all
                      ${state.status === s
                        ? 'bg-[#C9B370]/15 text-[#C9B370] border border-[#C9B370]/30'
                        : 'bg-surface-elevated text-silver-500 border border-border hover:text-silver-300'
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CENTER COLUMN: Authority Inputs ──────────────────── */}
        <div className="col-span-6 space-y-4">

          {/* Section A */}
          <div className="card">
            <p className="overline mb-1">A &middot; Assets Under Oversight</p>
            <p className="text-xs text-silver-600 mb-4">Assets = any location where failure becomes our responsibility</p>
            <RadioGroup<AssetCountBand>
              name="assets"
              value={state.assetCountBand}
              onChange={v => update({ assetCountBand: v })}
              options={[
                { label: '1', value: 'ONE' },
                { label: '2–3', value: 'TWO_TO_THREE' },
                { label: '4–5', value: 'FOUR_TO_FIVE' },
                { label: '6–10', value: 'SIX_TO_TEN' },
                { label: '10+', value: 'TEN_PLUS' },
              ]}
            />
          </div>

          {/* Section B */}
          <div className="card">
            <p className="overline mb-4">B &middot; Asset Composition</p>
            <RadioGroup<PrimaryAssetType>
              name="composition"
              value={state.primaryAssetType}
              onChange={v => update({ primaryAssetType: v })}
              options={[
                { label: 'Residential only', value: 'RESIDENTIAL_ONLY' },
                { label: 'Mixed residential', value: 'MIXED_RESIDENTIAL' },
                { label: 'Commercial office / HQ', value: 'COMMERCIAL_HQ' },
                { label: 'Public-facing / regulated', value: 'PUBLIC_REGULATED' },
                { label: 'Mission-critical operations', value: 'MISSION_CRITICAL' },
              ]}
            />
          </div>

          {/* Section C */}
          <div className="card">
            <p className="overline mb-4">C &middot; Availability Expectations</p>
            <RadioGroup<AvailabilityLevel>
              name="availability"
              value={state.availability}
              onChange={v => update({ availability: v })}
              options={[
                { label: 'Business hours coordination', value: 'BUSINESS_HOURS' },
                { label: 'After-hours coordination', value: 'AFTER_HOURS' },
                { label: '24/7 incident response', value: 'TWENTY_FOUR_SEVEN' },
                { label: 'Immediate escalation / never-fail expectation', value: 'NEVER_FAIL' },
              ]}
            />
          </div>

          {/* Section D */}
          <div className="card">
            <p className="overline mb-4">D &middot; Reporting &amp; Documentation</p>
            <RadioGroup<ReportingLevel>
              name="reporting"
              value={state.reporting}
              onChange={v => update({ reporting: v })}
              options={[
                { label: 'Exception-only (silent unless incident)', value: 'EXCEPTION_ONLY' },
                { label: 'Summary reporting', value: 'SUMMARY' },
                { label: 'Detailed incident documentation', value: 'DETAILED' },
                { label: 'Audit / compliance-grade reporting', value: 'AUDIT_COMPLIANCE' },
              ]}
            />
          </div>

          {/* Section E */}
          <div className="card">
            <p className="overline mb-1">E &middot; Vendor &amp; Staff Load</p>
            <p className="text-xs text-silver-600 mb-4">Entities under coordination</p>
            <div className="flex items-center gap-3">
              <input
                type="number"
                className="input w-24"
                min={0}
                value={state.vendorEntityCount ?? ''}
                onChange={e => update({ vendorEntityCount: e.target.value === '' ? null : parseInt(e.target.value) })}
                placeholder="#"
                disabled={state.isLocked}
              />
              <div className="flex gap-2">
                {[
                  { label: '≤5', value: 5 },
                  { label: '6–10', value: 10 },
                  { label: '11–20', value: 20 },
                  { label: '20+', value: 25 },
                ].map(opt => (
                  <button
                    key={opt.label}
                    onClick={() => update({ vendorEntityCount: opt.value })}
                    disabled={state.isLocked}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                      ${state.vendorEntityCount === opt.value
                        ? 'bg-surface-overlay text-text border border-border-light'
                        : 'bg-surface-elevated text-silver-500 border border-border hover:text-silver-300'
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section F */}
          <div className="card">
            <p className="overline mb-4">F &middot; Risk &amp; Exposure</p>
            <RadioGroup<FailureImpact>
              name="risk"
              value={state.failureImpact}
              onChange={v => update({ failureImpact: v })}
              options={[
                { label: 'Private inconvenience', value: 'PRIVATE_INCONVENIENCE' },
                { label: 'Financial loss', value: 'FINANCIAL_LOSS' },
                { label: 'Legal / compliance exposure', value: 'LEGAL_EXPOSURE' },
                { label: 'Reputational or executive risk', value: 'REPUTATIONAL_EXEC_RISK' },
              ]}
            />
          </div>
        </div>

        {/* ── RIGHT COLUMN: Live Output ────────────────────────── */}
        <div className="col-span-3">
          <div className="sticky top-[88px] space-y-4">

            {/* Output Panel */}
            <div className="card-elevated space-y-6">
              <div className="flex items-center justify-between">
                <p className="overline text-[#C9B370]">Live Output</p>
                <p className="text-[10px] text-silver-700 tabular-nums">Score: {computed.score}</p>
              </div>

              {/* Authority Level */}
              <div>
                <p className="text-xs text-silver-600 mb-1">Authority Level</p>
                <p className="text-xl font-serif text-text">{AUTHORITY_LABELS[computed.authorityLevel]}</p>
              </div>

              <div className="divider" />

              {/* Engagement Weight */}
              <div>
                <p className="text-xs text-silver-600 mb-1">Engagement Weight</p>
                <p className="text-lg font-medium text-silver-200">{LOAD_LABELS[computed.engagementLoad]}</p>
              </div>

              <div className="divider" />

              {/* Internal Retainer Target */}
              <div>
                <p className="text-xs text-silver-600 mb-1">Internal Retainer Target</p>
                <p className="text-2xl font-serif text-text">
                  ${computed.retainer.toLocaleString()}
                  <span className="text-sm text-silver-600 font-sans"> /mo</span>
                </p>
                {computed.overrideActive && (
                  <p className="text-[10px] text-status-warning mt-1 uppercase tracking-wider">Manual override active</p>
                )}
                <p className="text-[10px] text-silver-700 mt-1 uppercase tracking-wider">Internal reference only &middot; Do not disclose</p>
              </div>

              <div className="divider" />

              {/* Confidence Indicator */}
              <div className="flex items-center gap-3">
                <span className={conf.dot} />
                <div>
                  <p className={`text-sm font-medium ${conf.color}`}>{conf.label}</p>
                  <p className="text-[10px] text-silver-600">{computed.answered}/6 sections completed</p>
                </div>
              </div>
            </div>

            {/* Internal Hints */}
            {computed.hints.length > 0 && (
              <div className="card space-y-2">
                <p className="overline text-silver-500">Internal Observations</p>
                {computed.hints.map((hint, i) => (
                  <p key={i} className="text-xs text-silver-500 leading-relaxed flex gap-2">
                    <span className="text-silver-600 shrink-0">&bull;</span>
                    {hint}
                  </p>
                ))}
              </div>
            )}

            {/* Language Assist */}
            <div className="card space-y-3">
              <p className="overline text-[#C9B370]">Recommended Client Language</p>
              <div className="bg-surface-elevated rounded-xl p-4 border border-border space-y-3">
                {scripts.map((line, i) => (
                  <p key={i} className="text-sm text-silver-200 italic leading-relaxed font-serif">
                    &ldquo;{line}&rdquo;
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── NOTES & OVERRIDES ──────────────────────────────────── */}
      <div className="card space-y-5">
        <p className="overline text-[#C9B370]">Notes &amp; Overrides</p>

        <div>
          <label className="input-label">Internal Notes</label>
          <textarea
            className="input w-full min-h-[100px] resize-y"
            value={state.notes}
            onChange={e => update({ notes: e.target.value })}
            placeholder="Risk observations, gut checks, special considerations..."
            disabled={state.isLocked}
          />
        </div>

        <div className="divider" />

        <div>
          <label className="checkbox-luxury">
            <input
              type="checkbox"
              checked={state.manualOverride}
              onChange={e => update({ manualOverride: e.target.checked })}
              disabled={state.isLocked}
            />
            <span className="text-sm text-silver-300">Manual Override</span>
          </label>
        </div>

        {state.manualOverride && (
          <div className="space-y-4 pl-6 border-l-2 border-status-warning/30">
            <div>
              <label className="input-label">Override Monthly Retainer ($)</label>
              <input
                type="number"
                className="input w-48"
                min={0}
                step={2500}
                value={state.overrideRetainer}
                onChange={e => update({ overrideRetainer: e.target.value })}
                placeholder="e.g. 15000"
                disabled={state.isLocked}
              />
              <p className="text-[10px] text-silver-600 mt-1">Will be rounded up to nearest $2,500 step</p>
            </div>
            <div>
              <label className="input-label">Override Reason</label>
              <textarea
                className="input w-full min-h-[80px] resize-y"
                value={state.overrideReason}
                onChange={e => update({ overrideReason: e.target.value })}
                placeholder="Required — explain the basis for override..."
                disabled={state.isLocked}
              />
            </div>
            <label className="checkbox-luxury">
              <input
                type="checkbox"
                checked={state.founderApproval}
                onChange={e => update({ founderApproval: e.target.checked })}
                disabled={state.isLocked}
              />
              <span className="text-sm text-silver-300">Founder approval obtained</span>
            </label>
            {state.manualOverride && !state.founderApproval && (
              <p className="text-xs text-status-warning">Override requires founder approval to take effect.</p>
            )}
          </div>
        )}
      </div>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <div className="divider" />
      <p className="text-xs text-silver-600 text-center py-4 font-medium tracking-wide">
        Pricing discipline protects authority. Scope changes require reassessment.
      </p>
    </div>
  );
}
