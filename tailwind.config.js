module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'heroGradient': "linear-gradient(180deg, rgba(66, 228, 206, 0) 0%, #42E4CE 100%)",
      },
      background :{
        'homeGradient': "linear-gradient(180deg, rgba(66, 228, 206, 0.15) 0%, #42E4CE 87.67%), url('Images/background.png')",
      },
      fontFamily:{
        'lato': ['Lato', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif']
      },
      colors: {
        'primary': '#A5F0E6',
        'secondary': '#404642',
        'tertiary': '#A3ADAF',
        'error': '#FF3737',
        'search': '#F1F1F1'
      },
    },
  },
  plugins: [],
}