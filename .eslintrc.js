module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020
  },
  extends: ['standard'],
  rules: {
    'import/no-webpack-loader-syntax': 'off'
  }
}
