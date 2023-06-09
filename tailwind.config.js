import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#1c1c1c",
        borders: "#DDDDDD",
        "danger-red": "#FC555619",
        "pink-100": "#F7C2D2",
        "blue-100": "#99BFFB",
        "yellow-100": "#FFE28C",
        "green-100": "#A1EDB1",
        "grey-10": "#F3F5F7",
        "grey-20": "#4D4D4D",
        "grey-30": "#DDDDDD",
        "grey-40": "#F4F6F8",
        "grey-50": "#f3f3f3",
        "grey-60": "#ECEDEF",
        "grey-70": "#3C3C3C0D",
        white: "#FFFFFF"
      },
      fontSize: {
        sm: "14px",
      }
    },
    screens: {
      sm: "640px",
      md: "850px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".content-auto": {
          "content-visibility": "auto"
        },
        ".content-hidden": {
          "content-visibility": "hidden"
        },
        ".content-visible": {
          "content-visibility": "visible"
        }
      });
    })
  ]
};
