module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': [2, 'always'],
    'max-len': 'off',
    'import/no-cycle': 'off',
    'no-param-reassign': 'off',
  },
};
