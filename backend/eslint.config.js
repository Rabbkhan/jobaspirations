// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended, // base JS rules

  {
    files: ["**/*.js"],
    ignores: ["node_modules", "dist"],

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },

    plugins: {
      prettier: prettierPlugin, // ✅ properly register the plugin
    },

    rules: {
      ...prettierConfig.rules, // ✅ apply Prettier config rules
      "prettier/prettier": [
        "error",
        {
          semi: true,
          singleQuote: false,
          trailingComma: "es5",
          printWidth: 100,
          tabWidth: 2,
        },
      ],
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
