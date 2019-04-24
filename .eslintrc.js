module.exports = {
  extends: 'standard',
  env: {
    browser: true,
    'jest/globals': true,
  },
  plugins: ['jest'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
  },
}
