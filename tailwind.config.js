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
        'gaming': {
          'primary': '#00ff9d', // Neon green
          'secondary': '#ff00ff', // Neon pink
          'accent': '#00ffff', // Neon cyan
          'dark': '#0a0a0a', // Dark background
          'darker': '#050505', // Darker background
          'light': '#1a1a1a', // Light background
          'neon': {
            'blue': '#00ffff',
            'purple': '#ff00ff',
            'green': '#00ff9d',
            'red': '#ff0000',
            'yellow': '#ffff00',
          }
        }
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'neon-flicker': 'neon-flicker 3s ease-in-out infinite',
        'glitch': 'glitch 1s linear infinite',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'neon-flicker': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
          '25%, 75%': { opacity: 0.9 },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
      },
      backgroundImage: {
        'gaming-pattern': "url('/images/gaming-pattern.png')",
        'cyber-grid': "url('/images/cyber-grid.png')",
      },
    },
  },
  plugins: [],
} 