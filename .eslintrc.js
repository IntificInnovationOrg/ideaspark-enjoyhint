module.exports = {
  extends: ['cubic-innovation'],
  env: {
    browser: true,
    commonjs: false,
    node: false,
    es6: true,
    jquery: true,
  },
  globals: {
    EnjoyHint: 'writable',
    Kinetic: 'readonly',
  },
};
