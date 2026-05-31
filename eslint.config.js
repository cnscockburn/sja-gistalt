// Flat config (ESLint 9). eslint-config-expo/flat is already a fully-formed
// flat config array that registers its own plugins (including `import` and
// `@typescript-eslint`). We spread it and append only `ignores`. Plugin rule
// overrides must live inside a config object that also declares the plugin, so
// to avoid "cannot redefine plugin" we keep overrides out and rely on expo's
// curated rule set plus Prettier for formatting concerns.
const expoConfig = require('eslint-config-expo/flat');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  ...expoConfig,
  eslintConfigPrettier,
  {
    ignores: [
      'dist/*',
      '.expo/*',
      '.export-test/*',
      '.export-web/*',
      'node_modules/*',
      '.agents/*',
      'expo-env.d.ts',
    ],
  },
];
