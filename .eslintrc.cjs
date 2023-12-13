module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.cjs', 'tsconfig.json'],
  rules: {
    // formatting
    'indent': ['error', 2],
    'block-spacing': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': 'error',
    'space-infix-ops': 'error',
    'semi': 'error',
    'quotes': ['error', 'single'],
    'brace-style': ['error', 'stroustrup'],
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/type-annotation-spacing': 'error',
    'no-extra-parens': 'error',
    'func-call-spacing': 'error',
    'comma-spacing': 'error',
    'comma-dangle': ['error', 'always-multiline'],

    // extensions
    'default-param-last': 'error',
    'no-array-constructor': 'error',
    'no-dupe-class-members': 'error',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/ban-types": "warn"
  },
};
