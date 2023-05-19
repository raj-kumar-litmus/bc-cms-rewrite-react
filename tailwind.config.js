import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'black': '#1c1c1c',
      'grey-30': "#DDDDDD",
      'gray-10':'#F3F5F7',
      'danger-red': '#FC555619',
      'pink-100': "#F7C2D2",
      'blue-100': "#99BFFB",
      'yellow-100': "#FFE28C",
      'green-100': "#A1EDB1",
      'gray-20':'#4D4D4D',
      'white': '#ffffff',
      "grey-40":"#F4F6F8"
    },
    fontSize: {
      'sm': '0.8rem',
      'xs':'1rem',
      'xl': '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
  extend: {},
},
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.hand-made-red': {
          color: 'red'
        }
      })
    })
  ]
}