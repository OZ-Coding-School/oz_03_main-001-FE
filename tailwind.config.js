/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'headerBreak': '1770px', 
      },
      height: {
        'custom-calc1': 'calc(100vh - 290px)',
      },
      keyframes: {
        bg1_move: {
          '0%, 100%': {
            transform: 'scale(1) rotate(0deg) translate(0px, 0px)',
          },
          '50%': {
            transform: 'scale(1.3) rotate(5deg) translate(-3px, 3px)',
          },
        },
        bg2_move: {
          '0%, 100%': {
            transform: 'scale(1) rotate(0deg) translate(0px, 0px)',
          },
          '50%': {
            transform: 'scale(1.1) rotate(-10deg) translate(1px, 3px)',
          },
        },
        bg3_move: {
          '0%, 100%': {
            transform: 'scale(1) rotate(0deg) translate(0px, 0px)',
          },
          '50%': {
            transform: 'scale(1.1) rotate(-5deg) translate(1px, 3px);',
          },
        },
      },
      animation: {
        bg1_move: 'bg1_move 5s ease-in-out infinite;', 
        bg2_move: 'bg2_move 5s ease-in-out infinite;', 
        bg3_move: 'bg3_move 5s ease-in-out infinite;', 
      },
      boxShadow: {
        'btn': '2px 2px 10px 2px rgba(0, 0, 0, 0.15)',
      }
    },
    colors: {
      'transparent': 'transparent',
      'white': '#ffffff',
      "dark": '#3B3A37',
      "background": '#F4F4F4',
      "border": '#E6E6E6',
      "gray20": '#C6C6C6',
      "gray30": '#A8A8A8',

      "main": '#333333',
      "caption": '#6F6F6F',
      
      "primary": '#EC6446',
      "primary-hover": '#DC4E2F',
      "secondary": '#FFF4B8',
      "tigim": '#F6B75A',
      "tertiary": '#D5F5D2',
      "primary-hover": '#DC4E2F',
    },
  },
  plugins: [],
}