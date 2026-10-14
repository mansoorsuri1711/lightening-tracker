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
        brand: {
          DEFAULT: '#080F1C',
          deep: '#050A12',
          soft: '#0F1A2C',
          glow: '#C6F432',
        },
        mist: '#121C2E',
        blush: '#080F1C',
        ink: '#E8F0E4',
        pink: {
          DEFAULT: '#3DDC84',
          soft: '#7AE8AD',
          deep: '#22B86A',
        },
        coral: {
          DEFAULT: '#3DDC84',
          deep: '#22B86A',
        },
        violet: {
          DEFAULT: '#C6F432',
          soft: '#D9F86A',
          deep: '#A8D020',
        },
        lilac: '#D9F86A',
        teal: {
          DEFAULT: '#2EE6A6',
          deep: '#1BC48A',
        },
        sky: '#7CC6FE',
        gold: '#FFC857',
        primary: '#080F1C',
        secondary: '#0F1A2C',
        accent: '#C6F432',
        sunrise: '#3DDC84',
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
