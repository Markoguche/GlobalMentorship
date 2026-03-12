/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF7F5',
          100: '#FFE8E2',
          200: '#FFD0C7',
          300: '#FFB09F',
          400: '#FF8A6F',
          500: '#FF6B4A',
          600: '#E94E2D',
          700: '#C43D1F',
          800: '#9F351D',
          900: '#83311D',
        },
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#243B53',
          900: '#102A43',
          950: '#0A1929',
        },
        surface: {
          50: '#FAFBFC',
          100: '#F4F6F8',
          200: '#E8ECF0',
          300: '#D1D9E0',
          400: '#9AA5B1',
          500: '#6B7785',
        }
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 50%, var(--tw-gradient-to) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(16, 42, 67, 0.08)',
        'glass-lg': '0 16px 64px 0 rgba(16, 42, 67, 0.12)',
        'glow': '0 0 40px rgba(255, 107, 74, 0.3)',
        'glow-lg': '0 0 60px rgba(255, 107, 74, 0.4)',
        'card': '0 1px 3px rgba(16, 42, 67, 0.04), 0 4px 12px rgba(16, 42, 67, 0.06)',
        'card-hover': '0 4px 8px rgba(16, 42, 67, 0.06), 0 12px 32px rgba(16, 42, 67, 0.12)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
}