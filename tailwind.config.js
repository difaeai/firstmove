/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep navy — premium international business
        navy: {
          50: '#eef3fb',
          100: '#d4e0f3',
          200: '#a9c1e7',
          300: '#7095d3',
          400: '#3f66ad',
          500: '#1f4480',
          600: '#13315c',
          700: '#0e2444',
          800: '#0a1830',
          900: '#070f20',
          950: '#040813',
        },
        // Gold accent — "Gateway to Global Opportunities"
        gold: {
          50: '#fbf7ec',
          100: '#f4e9c6',
          200: '#ead08a',
          300: '#e0bb5b',
          400: '#d4af37',
          500: '#c8a24b',
          600: '#a3801f',
          700: '#7d611a',
          800: '#5c471a',
          900: '#3d2f12',
        },
        azure: {
          400: '#3d8bd4',
          500: '#2e6cb0',
          600: '#235690',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Rajdhani', 'Inter', 'sans-serif'],
      },
      // Numeric weight utilities (font-500, font-600, …) used across the UI.
      fontWeight: {
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(212, 175, 55, 0.45)',
        card: '0 18px 50px -20px rgba(7, 15, 32, 0.55)',
        'card-light': '0 12px 40px -16px rgba(7, 15, 32, 0.18)',
      },
      backgroundImage: {
        'grid-navy':
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'gold-sheen':
          'linear-gradient(110deg, #c8a24b 0%, #e8c766 35%, #d4af37 50%, #a3801f 80%)',
        'navy-radial':
          'radial-gradient(circle at 30% 20%, #13315c 0%, #0a1830 45%, #070f20 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%, 100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 40s linear infinite',
        marquee: 'marquee 30s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
      },
    },
  },
  plugins: [],
}
