// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      '2xs': '450px',
      'xs': '520px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        mtgreen:'#103F59',
        mtyellow:' #FFA400',
        mterror:'#FF7A7A',
        mtBlue:'#003E5C',
        mtBlueAlt:'#0A70A1',
        outerSpace:'#474747',
        sonicSilver:'#757575',
        skyBlue:'#00AEEF',
        skyBlueLight:'#B9D9EC'
      },
      backgroundImage: {
        'mtLandingBG': "url('/mt-bg.png')",
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    opacity: ({ after }) => after(['disabled']),
    extend: {
      display: ['hover', 'group-hover'],
  },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
  ],
}
