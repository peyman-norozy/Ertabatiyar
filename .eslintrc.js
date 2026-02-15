module.exports = {
  root: true,
  extends: [
    '@react-native', // پایه React Native (شامل rules خوب RN)
    'plugin:react-hooks/recommended', // اضافه کردن rules رسمی React Hooks
    // اگر Prettier داری، این رو اضافه کن تا با Prettier تداخل نکنه
    // 'plugin:prettier/recommended',
  ],
  plugins: [
    'react-hooks', // اگر در extends نباشه، explicit اضافه کن
  ],
  rules: {
    // react-hooks/exhaustive-deps رو به warn تبدیل کن (نه error)
    // اینطوری در VS Code یا CI فقط زرد می‌شه، نه قرمز
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        // برای hookهای Reanimated deps هوشمند اضافه کن
        // این باعث می‌شه ESLint برای useAnimatedStyle و ... deps رو بهتر بفهمه
        additionalHooks: [
          'useAnimatedStyle',
          'useDerivedValue',
          'useAnimatedProps',
          'useAnimatedReaction',
          'useAnimatedGestureHandler',
        ].join('|'),
      },
    ],

    // اگر خیلی شلوغ شد و فقط می‌خوای این rule رو ضعیف‌تر کنی
    // 'react-hooks/exhaustive-deps': 'warn',

    // سایر rules رایج که معمولاً در RN خاموش یا warn می‌شن
    'react/no-unstable-nested-components': 'warn',
    'no-shadow': 'off', // گاهی در RN لازم می‌شه
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // متغیرهای _ignored رو نادیده بگیر
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // اگر TS داری

    // اگر از NativeWind یا Tailwind داری، این‌ها رو می‌تونی اضافه کنی
    // 'tailwindcss/classnames-order': 'warn',
    // 'tailwindcss/no-custom-classname': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
