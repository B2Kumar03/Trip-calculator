/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            teal: "#008080",
            tealLight: "#E6F2F2",
            orange: "#FF8C00",
            orangeLight: "#FFF4E6",
          },
          surface: {
            bg: "#F8FAFA",
            card: "#FFFFFF",
            border: "#E2E8F0",
          },
          text: {
            main: "#1A202C",
            muted: "#718096",
          },
        },
        borderRadius: {
          xl: "1rem",
          "2xl": "1.5rem",
        },
      },
    },
    plugins: [],
  }
  