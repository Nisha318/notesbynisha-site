/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // Palette tokens. Components use these names instead of raw Tailwind
      // colors, so a future palette change happens in this one block.
      colors: {
        void: {
          DEFAULT: '#0A0A0F', // page background
          surface: '#14141D', // cards, nav buttons, raised panels
          hover: '#1E1E2B', // hover state for surface elements
        },
        vibranium: {
          DEFAULT: '#7C3AED', // primary: buttons, active states
          glow: '#A78BFA', // links, hover highlights
          deep: '#5B21B6', // pressed or hovered primary buttons
        },
        silver: {
          DEFAULT: '#C0C6D0', // secondary text, borders
          muted: '#8B93A1', // captions, fine print
        },
        wakanda: {
          DEFAULT: '#D4AF37', // gold accent, used sparingly
          deep: '#A8871F',
        },
        ink: '#E8E6F0', // body text on dark backgrounds
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        fadeIn: 'fadeIn 1s ease-in-out',
        fadeUp: 'fadeUp 1s ease-in-out',
        bounce: 'bounce 1s infinite',
      },
    },
  },
  plugins: [],
};
