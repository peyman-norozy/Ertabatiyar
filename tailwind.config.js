/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./Index.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        yekan: ['IRANYekanXFaNum-Regular'],
        'yekan-thin': ['IRANYekanXFaNum-Thin'],
        'yekan-light': ['IRANYekanXFaNum-Light'],
        'yekan-bold': ['IRANYekanXFaNum-Bold'],
        'yekan-extrabold': ['IRANYekanXFaNum-ExtraBold'],
        'yekan-semibold': ['IRANYekanXFaNum-DemiBold'],
        'yekan-black': ['IRANYekanXFaNum-Black'],
        'yekan-extrablack': ['IRANYekanXFaNum-ExtraBlack'],
        'yekan-heavy': ['IRANYekanXFaNum-Heavy'],
        'yekan-medium': ['IRANYekanXFaNum-Medium'],
        'yekan-ultralight': ['IRANYekanXFaNum-UltraLight'],
      },
      fontSize: {
        base: '16px',
      },
    },
  },
  plugins: [],
};
