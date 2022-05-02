module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      bangers: ["Bangers", "cursive"],
    },
    fontSize: {
      h1: "1.75rem",
      h2: "1.5rem",
      h3: "1.25rem",
      base: "1rem",
      sm: "0.875rem",
      xs: "0.75rem",
      xxs: "0.625rem",
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      bold: "700",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    colors: {
      current: "currentColor",
      white: "#FFF",
      "light-grey": "#767676",
      "dark-grey": "#191919",
      "dark-red": "#B92F28",
      "light-red": "#EF2E32",
      "light-red-opacity": "rgba(239, 46, 50, 0.1)",
      "border-grey": "#E7E7E7",
    },
    extend: {
      zIndex: {
        tooltip: "1300",
        popover: "1200",
        backdrop: "1100",
        modal: "1000",
        "side-bar": "900",
        dropdown: "100",
        icon: "100",
        fixed: "10",
        window: "0",
        default: "0",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};