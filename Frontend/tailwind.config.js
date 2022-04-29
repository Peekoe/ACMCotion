module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins"],
      chivo: ["Chivo"]
    },
    extend: {
      colors: {
        "pink-500": "#FF6682",
        "pink-300": "#FF94A7",
        "pink-200":"#FFEFF2",
      },
      fontSize: {
        13: "13px",
        14: "14px",
        16: "16px",
        20: "20px",
        26: "26px",
        24: "24px",
        32: "32px",
        36: "36px",
        48: "48px",
        50: "50px",
        52: "52px"
      },
    },
  },
  plugins: [],
}