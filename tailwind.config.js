/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        dropdownIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(-6px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      },
      animation: {
        'dropdown-in': 'dropdownIn 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}

