/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0f1412",
        surface: "#171e1b",
        card: "#1c2420",
        primary: "#1faa59",
        accent: "#e0a23a",
        text: "#eef5f0",
        textdim: "#b9c5bd",
        borderc: "#2a352f",
      },
      maxWidth: { container: "1100px" },
      fontFamily: { cairo: ["Cairo", "ui-sans-serif", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};


