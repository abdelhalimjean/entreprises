/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts}'],
  theme: {
    extend: {
      colors: {
        facebook: '#0862f5',
        linkedin: '#0076ae',
        discord: '#5661e9',
        youtube: '#f40002',
        whatsapp: '#45c053',
        github: '#151513',
        instagram: '#cf17c8',
        twitter: '#000000',
        gitlab: '#f26925',
        telegram: '#2ea2d8',
        byte: {
          50: '#f4faeb',
          100: '#e6f3d4',
          200: '#cfe9ad',
          300: '#afd97d',
          400: '#8bc34a',
          500: '#73ac36',
          600: '#588828',
          700: '#446922',
          800: '#395420',
          900: '#32481f',
          950: '#18270c',
        },
      },
    },
  },
  plugins: [],
};
