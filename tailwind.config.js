/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'product-sans': ['Product Sans', 'sans-serif'],
      },
      colors: {
        gray: {
          750: '#374151',
          850: '#1f2937',
        }
      },
      animation: {
        'search-expand': 'search-expand 0.3s ease-out',
      },
      keyframes: {
        'search-expand': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};