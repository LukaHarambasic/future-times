module.exports = {
  // original config from
  // https://cathalmacdonnacha.com/setting-up-eslint-prettier-in-vitejs
  extends: [
    // By extending from a plugin config, we can get recommended rules without having to add them manually.
    'eslint:recommended',
    'plugin:import/recommended',
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    'eslint-config-prettier',
  ],
  settings: {
    // Tells eslint how to resolve imports
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js'],
      },
    },
  },
  rules: {
    'import/default': 'error',
    'import/named': 'error',
    'import/no-named-as-default': 'off',
  },
  globals: {
    window: true,
    document: true,
    console: true,
    localStorage: true,
    process: true,
    exports: true,
    require: true,
    setTimeout: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
  },
}
