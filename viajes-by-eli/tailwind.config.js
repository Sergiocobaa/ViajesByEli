/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Redefine tus colores personalizados aquí
        eliCoral: '#1D4ED8', // Ahora es un Azul más oscuro (ej. blue-700)
        eliBlue: '#1E293B',  // Ahora es un color Gris oscuro (ej. slate-900)
        // Puedes añadir más si lo necesitas
        eliSuccess: '#10B981', // emerald-500
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
