/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gaming-dark': '#0a0a0a',
        'gaming-darker': '#050505',
        'gaming-light': '#1a1a1a',
        'gaming-primary': '#00ff00',
        'gaming-neon-green': '#39ff14',
        'gaming-neon-red': '#ff3131',
        'gaming-neon-blue': '#00ffff',
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide': 'slide 3s linear infinite',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': {
            opacity: '1',
            textShadow: '0 0 7px #00ff00, 0 0 10px #00ff00, 0 0 21px #00ff00',
          },
          '50%': {
            opacity: '0.8',
            textShadow: '0 0 4px #00ff00, 0 0 7px #00ff00, 0 0 14px #00ff00',
          },
        },
        'slide': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(to right, #00ff00 1px, transparent 1px), linear-gradient(to bottom, #00ff00 1px, transparent 1px)',
      },
      backgroundSize: {
        'cyber-grid': '20px 20px',
      },
    },
  },
  plugins: [],
} 