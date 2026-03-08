/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — Nawa House Brand Guide
        cream: '#E8E2D6',   // Sand (primary background)
        fg: '#3B3A36',      // Coconut Husk (primary text)
        accent: '#C47A5A',  // Sunset Clay
        muted: '#7C8781',   // Ocean Grey
        light: '#F0EAE0',   // Light sand (section backgrounds)
        border: '#CEC7BA',  // Subtle border
        palm: '#5F6F52',    // Palm Leaf
        gold: '#D4B483',    // Soft Gold
      },
      fontFamily: {
        display: ['Parkinsans', 'sans-serif'],
        ui: ['Inter', 'Helvetica', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease forwards',
        'fade-up': 'fadeUp 0.9s ease forwards',
        'line-grow': 'lineGrow 1.2s ease forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        lineGrow: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
}
