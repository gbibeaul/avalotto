module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bangers: ["Bangers", "cursive"],
      },
      keyframes: {
        gradient: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%;" },
        },
      },
      animation: {
        gradient: "gradient 1s infinite",
      },
      colors: {
        avascratch: {
          background: "#EF2203",
          border: "#F7DA10",
          scratchBtn: "#F7DA10",
        },
        lotto: {
          purple: "#5046e4",
          black: "#242321",
        },
      },
      boxShadow: {
        lottoNum: "0px 4px 21px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
