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
          DEFAULT: '#1A1225',
          deep: '#120B1A',
          soft: '#3B2458',
          glow: '#6B3FA0',
        },
        mist: '#FBF4F8',
        blush: '#FFF0F5',
        ink: '#1A1225',
        pink: {
          DEFAULT: '#FF7A9A',
          soft: '#FFB3C6',
          deep: '#E85A7A',
        },
        coral: {
          DEFAULT: '#FF7A7A',
          deep: '#F0627A',
        },
        lilac: '#C9A0DC',
        teal: {
          DEFAULT: '#5DD39E',
          deep: '#3BB87F',
        },
        sky: '#7CC6FE',
        gold: '#FFC857',
        primary: '#1A1225',
        secondary: '#FBF4F8',
        accent: '#FF7A7A',
        sunrise: '#FF7A9A',
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
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'soft-pulse': 'soft-pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
