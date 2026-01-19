import { defineConfig } from 'eslint/config';
import expoConfig from 'eslint-config-expo/flat';
import { baseConfig } from '../../eslint/base.js';

export default defineConfig([
  ...baseConfig,
  ...expoConfig,
  {
    ignores: ['dist/**'],
  },
]);
