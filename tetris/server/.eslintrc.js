module.exports = {
  env: {
    browser: false,
    es6: true,
    node: 1
  },
  extends: [
    "eslint:recommended", 
    "plugin:jest/recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: false,
    codeFrame: true
  },
  rules: {
    semi: ["error", "always"]
  },
};