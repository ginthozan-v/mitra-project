module.exports = {
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended","next","plugin:@typescript-eslint/recommended", "prettier"],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  rules: {
    "no-unused-vars":"warn",
    "prefer-const": "warn",
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "react/self-closing-comp": "warn",
    "react/jsx-curly-brace-presence": "off",
    "react/jsx-boolean-value":"warn",
    "react/jsx-closing-bracket-location":"warn",
    "react/jsx-no-useless-fragment":"warn"
  },
};
