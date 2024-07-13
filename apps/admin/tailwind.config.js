module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mtgreen: '#103F59',
        mtyellow: ' #FFA400',
        mterror: '#FF7A7A',
        mtBlue: '#003E5C',
        mtBlueAlt: '#0A70A1',
        outerSpace: '#474747',
        sonicSilver: '#757575',
        skyBlue: '#00AEEF',
        "cms-base": {
          900: "#091E42",
          800: "#172B4D",
          700: "#253858",
          600: "#344563",
          500: "#42526E",
          400: "#505F79",
          300: "#5E6C84",
          200: "#6B778C",
          100: "#7A869A",
          90: "#8993A4",
          80: "#97A0AF",
          70: "#A5ADBA",
          60: "#B3BAC5",
          50: "#C1C7D0",
          40: "#DFE1E6",
          30: "#EBECF0",
          20: "#F4F5F7",
          10: "#FAFBFC",
          0: "#FFFFFF",
        },
        "cms-blue": {
          500: "#0747A6",
          400: "#0052CC",
          300: "#0065FF",
          200: "#2684FF",
          100: "#4C9AFF",
          75: "#B3D4FF",
          50: "#DEEBFF",
        }
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  plugins: [],
};