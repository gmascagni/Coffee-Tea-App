/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          950: '#0C0908',
          900: '#120E0C',
          800: '#1C1613',
          700: '#2A211D',
        },
        amber: {
          gold: '#D48C46',
          bright: '#E29D56',
          muted: '#A36D48',
        },
        cream: {
          light: '#F8F5F1',
          soft: '#F4EFEA',
          dark: '#E2DDD7',
        },
        slate: {
          950: '#0F1216',
          900: '#161A20',
          800: '#1E2228',
          700: '#2C3036',
        },
        sage: {
          900: '#26382E',
          700: '#435C4C',
          500: '#5E7E6A',
          300: '#8FA899',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
