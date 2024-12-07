/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        dmSans: {
          regular: 'DMSans-Regular',
          bold: 'DMSans-Bold',
        }
      },
      colors: {
        primary: {
          dark: '#202020',
          light: '#363636'
        },
        bold: {
          yellow: '#FEF752',
          purple: '#C8A2E5',
          green: '#BCEF4C',
          orange: '#FEA67D'
        },
        secondary: {
          white: '#FFFFFF'
        }
      }
    },
  },
  plugins: [],
}