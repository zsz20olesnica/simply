module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      background: {
        'homeGradiend': 'linear-gradient(180deg, rgba(66, 228, 206, 0.15) 0%, #42E4CE 87.67%)'
      },
      fontFamily:{
        'lato': ['Lato', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif']
      },
      colors: {
        'primary': '#A5F0E6',
        'secondary': '#404642'
      },
    },
  },
  plugins: [],
}