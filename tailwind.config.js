/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
      "secondary": '#FFF4B8',
      "tigim": '#F6B75A',
      "tertiary": '#D5F5D2',
      "primary-hover": '#DC4E2F',
    },
  },
  plugins: [],
}