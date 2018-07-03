// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
       parser: "babel-eslint",
  ecmaVersion: 2017,
  sourceType: "module"
  },
  env: {
    browser: true,
    jest: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  "extends": ["standard", "eslint:recommended", "plugin:vue/recommended"],
  // required to lint *.vue files
  plugins: [
    "vue"
  ],
  // add your custom rules here
  'rules': {
    "vue/require-prop-types": 1,
    "vue/max-attributes-per-line": 0,
    "object-curly-spacing": [2,"always"],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
