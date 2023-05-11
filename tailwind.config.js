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
      'borders': "#DDDDDD",
      'bg':'#F3F5F7',
      'danger-aler-bg': '#FC555619',
      'unAssigned-bg': "#F7C2D2",
      'Assigned-bg': "#99BFFB",
      'InProgress-bg': "#FFE28C",
      'Completed-bg': "#A1EDB1",
      'placeholder':'#4D4D4D',
      'white': '#ffffff',
      'border-color': '#464646',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'red':"#CB0132",
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
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