/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    fontFamily: {
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
    },
    extend: {
      colors: {
        gray: {
          '100': '#E2E8E7',
          '200': '#DDE4E3',
          '300': '#D2DEDB',
          '400': '#C2D3CF',
          '500': '#ABC4BE',
          '600': '#90AFA7',
          '700': '#74948A',
          '800': '#374B42',
          '900': '#18211D'
        },
        brown: {
          '100': '#FFFDF8',
          '200': '#FBF8F3',
          '300': '#F3EFE7',
          '400': '#E8E0D4',
          '500': '#D7CCBB',
          '600': '#C0B09E',
          '700': '#A28F7E',
          '800': '#4F423A',
          '900': '#211B18'
        }
      }
    }
  },
  variants: {},
  plugins: []
}
