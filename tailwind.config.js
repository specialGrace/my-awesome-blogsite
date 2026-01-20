module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        cursive: ['"Dancing Script"', 'cursive'],
      },
      colors: {
        'site-pink': '#e8c1c5',      // soft pink accent
        'site-beige': '#f8f1e9',
        'site-gold': '#d4af37',
        'text-dark': '#1a1a1a',
        'text-muted': '#666666',
      },
    },
  },
  plugins: [],
}