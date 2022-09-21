module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'import/first': 'off',
    'no-param-reassign': 'off',
    'no-empty-function': 'off',
    camelcase: 'off',
    'eslint-disable-next-line max-len': 'on',
    'no-return-assign': 'off',
  },
};
