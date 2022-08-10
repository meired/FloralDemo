/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html', './src/**/*.ts', './src/**/*.scss'],
  prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0047AB',
          light: '#0096FF',
          dark: '#0096FF',
        },
        secondary: {
          DEFAULT: 'pink',
        },
      },
    },
  },
  plugins: [],
};
