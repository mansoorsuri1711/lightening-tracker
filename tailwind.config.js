/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // System stack only — no webfont on the critical request chain (LCP).
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        // Dark blue brand from Lightning Tracker icon (navy + lightning gold)
        brand: {
          DEFAULT: '#070A1A',
          deep: '#040612',
          soft: '#0C1230',
          glow: '#3B82F6',
        },
        mist: '#101838',
        blush: '#070A1A',
        ink: '#E8EEFF',
        pink: {
          DEFAULT: '#3B82F6',
          soft: '#60A5FA',
          deep: '#1D4ED8',
        },
        coral: {
          DEFAULT: '#3B82F6',
          deep: '#1D4ED8',
        },
        // Kept as "violet" token name for existing class usage — now electric blue
        violet: {
          DEFAULT: '#3B82F6',
          soft: '#60A5FA',
          deep: '#1D4ED8',
        },
        lilac: '#93C5FD',
        teal: {
          DEFAULT: '#38BDF8',
          deep: '#0284C7',
        },
        sky: '#93C5FD',
        gold: '#F8D850',
        primary: '#070A1A',
        secondary: '#0C1230',
        accent: '#3B82F6',
        sunrise: '#F8D850',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'soft-pulse': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'soft-pulse': 'soft-pulse 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
    },
  },
  plugins: [],
}
