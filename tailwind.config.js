/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./Index.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        yekan: ['YekanBakhFaNum-Regular'],
        'yekan-thin': ['YekanBakhFaNum-Thin'],
        'yekan-light': ['YekanBakhFaNum-Light'],
        'yekan-bold': ['YekanBakhFaNum-Bold'],
        'yekan-extrabold': ['YekanBakhFaNum-ExtraBold'],
        'yekan-semibold': ['YekanBakhFaNum-SemiBold'],
        'yekan-black': ['YekanBakhFaNum-Black'],
        'yekan-extrablack': ['YekanBakhFaNum-ExtraBlack'],
      },
    },
  },
  plugins: [],
};
