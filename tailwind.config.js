/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Configuração das fontes no Nativewind/Tailwindcss
      fontFamily: {
        light: "KoHo_300Light",
        regular: "KoHo_400Regular",
        semibold: "KoHo_600SemiBold",
        bold: "KoHo_700Bold",
      },
    },
  },
  plugins: [],
};
