/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans KR"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        navy: {
          DEFAULT: "#0C2D50",
          100: "#D6DEE6",
          200: "#ADBFD3",
          300: "#839FBF",
          400: "#5A7FAB",
          500: "#305F98",
          600: "#264B78",
          700: "#1D3758",
          800: "#142438",
          900: "#0C2D50", // 메인 컬러
        },
        orange: {
          DEFAULT: "#E67A28",
          100: "#FFEAD9",
          200: "#FFD0A6",
          300: "#FFB673",
          400: "#FF9C40",
          500: "#E67A28", // 메인 컬러
          600: "#B85F1E",
          700: "#8A4515",
          800: "#5C2A0B",
          900: "#2E1506",
        },
      },
    },
  },
  plugins: [],
};
