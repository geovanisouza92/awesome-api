module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'prettier',
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['src/infrastructure/database/repositories/*.ts'],
      rules: {
        'prefer-template': 'error',
        'no-restricted-syntax': ['error', 'TemplateLiteral'],
      },
    },
  ],
};
