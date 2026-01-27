'use client';

import { useState } from 'react';

type Scheme = 'navy-gold' | 'silver-obsidian' | 'navy-gold-silver';

const schemes = {
  'navy-gold': {
    name: 'Navy & Gold',
    tagline: 'Classic Private Bank',
    description: 'Old money elegance. Rolls Royce interiors. Yacht club sophistication.',
    colors: {
      bg: '#0A1628',
      surface: '#132238',
      elevated: '#1A2D4A',
      gold: '#C9A962',
      goldLight: '#D4B875',
      text: '#F5F2EB',
      muted: '#7A8BA3',
      border: '#1E3A5F',
    }
  },
  'silver-obsidian': {
    name: 'Silver & Obsidian',
    tagline: 'Modern Luxury',
    description: 'Sleek minimalism. Apple aesthetic. Porsche Design precision.',
    colors: {
      bg: '#09090B',
      surface: '#141416',
      elevated: '#1C1C1F',
      gold: '#C0C0C8', // Silver as primary
      goldLight: '#D4D4DC',
      text: '#FAFAFA',
      muted: '#71717A',
      border: '#27272A',
    }
  },
  'navy-gold-silver': {
    name: 'Navy, Gold & Silver',
    tagline: 'Estate Grandeur',
    description: 'Regal yet modern. Four Seasons penthouse. The pinnacle of taste.',
    colors: {
      bg: '#0C1220',
      surface: '#151D2E',
      elevated: '#1C2840',
      gold: '#D4AF37',
      goldLight: '#E5C45C',
      silver: '#C0C7D0',
      text: '#F8F6F2',
      muted: '#8892A3',
      border: '#253348',
    }
  }
};

export default function ColorPreview() {
  const [activeScheme, setActiveScheme] = useState<Scheme>('navy-gold-silver');
  const scheme = schemes[activeScheme];
  const c = scheme.colors;

  return (
    <div style={{ background: c.bg, minHeight: '100vh', color: c.text, fontFamily: 'system-ui' }}>
      {/* Scheme Selector */}
      <div style={{
        padding: '24px',
        borderBottom: `1px solid ${c.border}`,
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        {(Object.keys(schemes) as Scheme[]).map((key) => (
          <button
            key={key}
            onClick={() => setActiveScheme(key)}
            style={{
              padding: '12px 24px',
              background: activeScheme === key ? c.gold : c.surface,
              color: activeScheme === key ? c.bg : c.text,
              border: `1px solid ${activeScheme === key ? c.gold : c.border}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 0.3s ease',
            }}
          >
            {schemes[key].name}
          </button>
        ))}
      </div>

      {/* Scheme Info */}
      <div style={{ padding: '48px 24px', maxWidth: '1400px', margin: '0 auto' }}>
        <p style={{
          color: c.gold,
          fontSize: '12px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '8px'
        }}>
          {scheme.tagline}
        </p>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 400,
          marginBottom: '16px',
          fontFamily: 'Georgia, serif'
        }}>
          {scheme.name}
        </h1>
        <p style={{ color: c.muted, fontSize: '18px', maxWidth: '600px' }}>
          {scheme.description}
        </p>
      </div>

      {/* Mock Dashboard */}
      <div style={{ padding: '0 24px 48px', maxWidth: '1400px', margin: '0 auto' }}>

        {/* Top Bar */}
        <div style={{
          background: c.surface,
          border: `1px solid ${c.border}`,
          borderRadius: '12px',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{
              color: c.gold,
              fontSize: '20px',
              fontFamily: 'Georgia, serif'
            }}>
              Chatman Concierge
            </span>
            <span style={{ color: c.muted }}>|</span>
            <span style={{ color: c.text }}>Palm Beach Residence</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{
              background: '#4A9D7C22',
              color: '#4A9D7C',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 500
            }}>
              ● Secure
            </span>
            <span style={{
              background: c.gold + '22',
              color: c.gold,
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 500
            }}>
              At Home
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px' }}>

          {/* Sidebar */}
          <div style={{
            background: c.surface,
            border: `1px solid ${c.border}`,
            borderRadius: '12px',
            padding: '24px 0',
          }}>
            {['Overview', 'Security', 'Operations', 'Intelligence', 'Requests', 'Vendors', 'Budgets'].map((item, i) => (
              <div
                key={item}
                style={{
                  padding: '14px 24px',
                  color: i === 0 ? c.gold : c.muted,
                  background: i === 0 ? c.gold + '15' : 'transparent',
                  borderLeft: i === 0 ? `2px solid ${c.gold}` : '2px solid transparent',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: i === 0 ? 500 : 400,
                }}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {[
                { label: 'Perimeter', value: 'Secure', color: '#4A9D7C' },
                { label: 'Doors', value: '22/24 Locked', color: c.gold },
                { label: 'Cameras', value: '31/32 Online', color: c.gold },
                { label: 'Climate', value: '72°F', color: c.text },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: c.surface,
                    border: `1px solid ${c.border}`,
                    borderRadius: '12px',
                    padding: '20px',
                  }}
                >
                  <p style={{ color: c.muted, fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {stat.label}
                  </p>
                  <p style={{ color: stat.color, fontSize: '20px', fontWeight: 500 }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Two Column Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

              {/* Chief of Security */}
              <div style={{
                background: c.surface,
                border: `1px solid ${c.border}`,
                borderRadius: '12px',
                padding: '24px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🛡️</span> Chief of Security
                  </h3>
                  <span style={{ color: c.muted, fontSize: '12px' }}>Physical Layer</span>
                </div>

                {['Perimeter Armed', 'All Sensors Active', '1 Camera Offline', 'No Incidents'].map((item, i) => (
                  <div
                    key={item}
                    style={{
                      padding: '12px 16px',
                      background: c.elevated,
                      borderRadius: '8px',
                      marginBottom: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '14px',
                    }}
                  >
                    <span>{item}</span>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: i === 2 ? '#D4A84B' : '#4A9D7C'
                    }} />
                  </div>
                ))}
              </div>

              {/* Chief of Staff */}
              <div style={{
                background: c.surface,
                border: `1px solid ${c.border}`,
                borderRadius: '12px',
                padding: '24px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>👔</span> Chief of Staff
                  </h3>
                  <span style={{ color: c.muted, fontSize: '12px' }}>Cloud Layer</span>
                </div>

                {['3 Pending Requests', '1 Invoice to Approve', 'Pool Service Complete', 'AI Filtered 2 Calls'].map((item, i) => (
                  <div
                    key={item}
                    style={{
                      padding: '12px 16px',
                      background: c.elevated,
                      borderRadius: '8px',
                      marginBottom: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '14px',
                    }}
                  >
                    <span>{item}</span>
                    {i < 2 && (
                      <span style={{
                        background: c.gold,
                        color: c.bg,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600
                      }}>
                        Action
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              background: `linear-gradient(135deg, ${c.gold}15 0%, transparent 50%)`,
              border: `1px solid ${c.gold}30`,
              borderRadius: '12px',
              padding: '24px',
            }}>
              <p style={{
                color: c.gold,
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}>
                Suggested Actions
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['🏠 On my way home', '🔧 Schedule plumber', '📸 Review pool photos', '✅ Approve invoice'].map((action) => (
                  <button
                    key={action}
                    style={{
                      background: c.surface,
                      border: `1px solid ${c.border}`,
                      color: c.text,
                      padding: '10px 20px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Color Swatches */}
        <div style={{ marginTop: '48px', paddingTop: '48px', borderTop: `1px solid ${c.border}` }}>
          <p style={{
            color: c.muted,
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '24px'
          }}>
            Color Palette
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {Object.entries(c).map(([name, color]) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: color,
                  borderRadius: '12px',
                  border: `1px solid ${c.border}`,
                  marginBottom: '8px'
                }} />
                <p style={{ fontSize: '11px', color: c.muted, textTransform: 'capitalize' }}>{name}</p>
                <p style={{ fontSize: '10px', color: c.muted }}>{color}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
