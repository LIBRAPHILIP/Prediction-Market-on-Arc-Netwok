/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#050505',
          900: '#0A0A0C',
          800: '#111114',
          700: '#18181B',
          600: '#27272A',
        },
        aurora: {
          cyan: '#00F0FF',
          violet: '#8A2BE2',
          pink: '#FF007F',
        },
        mint: {
          DEFAULT: '#00FFA3',
          dark: '#00CC82',
          glow: 'rgba(0, 255, 163, 0.15)',
        },
        rose: {
          DEFAULT: '#FF3366',
          dark: '#CC2952',
          glow: 'rgba(255, 51, 102, 0.15)',
        },
        zinc: {
          100: '#F4F4F5',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Geist', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'aurora': 'aurora 15s linear infinite',
        'marquee': 'marquee 40s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'holo-border': 'linear-gradient(135deg, #00F0FF 0%, #8A2BE2 50%, #FF007F 100%)',
        'mesh-gradient': 'radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.15) 0px, transparent 50%), radial-gradient(at 97% 21%, hsla(256, 98%, 72%, 0.1) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 0.08) 0px, transparent 50%), radial-gradient(at 10% 29%, hsla(180, 98%, 61%, 0.1) 0px, transparent 50%);',
      }
    },
  },
  plugins: [],
}
