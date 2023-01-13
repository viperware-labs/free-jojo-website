/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anon: ['AnonPro'],
        scope: ['Scope'],
        norm: ['Norm'],
        archivo: ['Archivo'],
        archivobold: ['ArchivoBold'],
      }
    }, 
  },
  plugins: [],
}