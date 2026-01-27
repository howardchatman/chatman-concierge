import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Silver & Obsidian - Modern Luxury
        obsidian: {
          DEFAULT: '#09090B',
          50: '#18181B',
          100: '#141416',
          200: '#111113',
          300: '#0D0D0F',
          400: '#09090B',
          500: '#050506',
        },
        // Polished Silver - Primary Accent
        silver: {
          DEFAULT: '#C0C0C8',
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4DC',
          400: '#C0C0C8',
          500: '#A1A1AA',
          600: '#71717A',
          700: '#52525B',
          800: '#3F3F46',
          900: '#27272A',
        },
        // Surface colors
        surface: {
          DEFAULT: '#141416',
          elevated: '#1C1C1F',
          overlay: '#242428',
          hover: '#2A2A2F',
        },
        // Border colors
        border: {
          DEFAULT: '#27272A',
          light: '#3F3F46',
          subtle: '#1F1F23',
        },
        // Text colors
        text: {
          DEFAULT: '#FAFAFA',
          secondary: '#A1A1AA',
          muted: '#71717A',
          inverse: '#09090B',
        },
        // Status colors - Refined
        status: {
          secure: '#4ADE80',
          warning: '#FBBF24',
          alert: '#F87171',
          info: '#60A5FA',
        },
        // Accent for special highlights
        accent: {
          DEFAULT: '#E4E4E7',
          gold: '#D4AF37',
          platinum: '#E5E4E2',
        },
      },
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'headline': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'title': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'subtitle': ['1.125rem', { lineHeight: '1.4' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'caption': ['0.875rem', { lineHeight: '1.5' }],
        'overline': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.1em' }],
        'micro': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'sm': '0.375rem',
        'DEFAULT': '0.5rem',
        'md': '0.625rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(192, 192, 200, 0.2)',
        'glow-sm': '0 0 20px -5px rgba(192, 192, 200, 0.15)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        'card': '0 4px 24px -4px rgba(0, 0, 0, 0.4)',
        'elevated': '0 8px 32px -8px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-subtle': 'linear-gradient(135deg, rgba(192, 192, 200, 0.03) 0%, transparent 50%)',
        'gradient-dark': 'linear-gradient(180deg, #141416 0%, #09090B 100%)',
        'gradient-surface': 'linear-gradient(180deg, #1C1C1F 0%, #141416 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px -5px rgba(192, 192, 200, 0.1)' },
          '100%': { boxShadow: '0 0 30px -5px rgba(192, 192, 200, 0.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
} satisfies Config;
