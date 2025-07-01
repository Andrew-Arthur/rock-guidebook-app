// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
      extend: {
        fontFamily: {
          // picks up your import('Montserrat')
          header: ['Montserrat', 'sans-serif'],         
          display: ['Bebas Neue', 'cursive'],           
          luxury: ['Playfair Display', 'serif'],        
          script: ['Pacifico', 'cursive'],              
        }
      }
    },
    variants: {
      extend: {
        fontFamily: ['hover', 'focus']  // if you want to change on hover/focus
      }
    }
  }
  