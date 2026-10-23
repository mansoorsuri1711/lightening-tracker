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
        sans: ['var(--font-outfit)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-sora)', 'var(--font-outfit)', 'sans-serif'],
      },
      colors: {
        // Darker take on the calculator-icon palette (emerald + forest + gold)
        brand: {
          DEFAULT: '#030A08',
          deep: '#010504',
          soft: '#071612',
          glow: '#12A876',
        },
        mist: '#0A1A15',
        blush: '#030A08',
        ink: '#E6F4EE',
        pink: {
          DEFAULT: '#12A876',
          soft: '#3ECF98',
          deep: '#0A7A56',
        },
        coral: {
          DEFAULT: '#12A876',
          deep: '#0A7A56',
        },
        // Kept as "violet" token name for existing class usage — now emerald
        violet: {
          DEFAULT: '#12A876',
          soft: '#3ECF98',
          deep: '#0A7A56',
        },
        lilac: '#78E0B8',
        teal: {
          DEFAULT: '#1FA87A',
          deep: '#0E8F68',
        },
        sky: '#78E0B8',
        gold: '#E0A030',
        primary: '#030A08',
        secondary: '#071612',
        accent: '#12A876',
        sunrise: '#E0A030',
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
