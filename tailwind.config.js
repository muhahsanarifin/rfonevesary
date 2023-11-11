/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      "3xl": { min: "1536px" },
      // => @media (min-width: 1536px)

      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px)

      xl: { max: "1279px" },
      // => @media (max-width: 1279px)

      lg: { max: "1023px" },
      // => @media (max-width: 1023px)

      md: { max: "767px" },
      // => @media (max-width: 767px)

      sm: { max: "639px" },
      // => @media (max-width: 639px)

      xs: { max: "475px" },
      // => @media (max-width: 475px)
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
  daisyui: {
    themes: [
      "light",
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          ".btn-cart": {
            "background-color": "#0D9488",
            "border-color": "#0D9488",
            color: "#FFFFFF",
          },
          ".btn-cart:hover": {
            "background-color": "#115e59",
            "border-color": "#115e59",
          },
          ".badge-cart": {
            "background-color": "#dcfce7",
          },
          ".btn-order": {
            "background-color": "#16a34a",
            "border-color": "#16a34a",
            color: "#FFFFFF",
          },
          ".btn-order:hover": {
            "background-color": "#166534",
            "border-color": "#166534",
          },
          ".btn-checkout": {
            "background-color": "#16a34a",
            "border-color": "#16a34a",
            color: "#FFFFFF",
          },
          ".btn-checkout:hover": {
            "background-color": "#166534",
            "border-color": "#166534",
          },
          ".btn-cancel:hover": {
            "background-color": "#f87171",
            "border-color": "#f87171",
          },
          ".btn-login": {
            "background-color": "#0D9488",
            "border-color": "#0D9488",
            color: "#FFFFFF",
          },
          ".btn-login:hover": {
            "background-color": "#115e59",
            "border-color": "#115e59",
          },
        },
      },
    ],
  },
};
