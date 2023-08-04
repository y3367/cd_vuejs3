const DOMGlobals = ["window", "document"];
const NodeGlobals = ["module", "require"];

/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");
const path = require("path");

function resolve(dir) {
  return path.resolve(__dirname, "./packages/*/", dir);
}

module.exports = {
  settings: {
    "import/resolver": {
      node: {
        paths: ["packages"]
      },
      webpack: {
        config: {
          // resolve
          extensions: [".less", ".sass", ".css", ".js", ".jsx", ".mjs", ".ts", ".tsx", ".vue", ".json"],
          alias: {
            // "@": resolve("src")
          }
        }
      }
    }
  },
  root: true,
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/eslint-config-typescript", "@vue/eslint-config-prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["vue", "@typescript-eslint", "jest"],
  rules: {
    "vue/multi-word-component-names": "off",
    "no-debugger": "error",
    "no-unused-vars": [
      "error",
      // we are only using this rule to check for unused arguments since TS
      // catches unused variables but not args.
      { varsIgnorePattern: ".*", args: "none" }
    ],
    // most of the codebase are expected to be env agnostic
    "no-restricted-globals": ["error", ...DOMGlobals, ...NodeGlobals],
    "no-restricted-syntax": [
      "error",
      // since we target ES2015 for baseline support, we need to forbid object
      // rest spread usage in destructure as it compiles into a verbose helper.
      "ObjectPattern > RestElement",
      // tsc compiles assignment spread into Object.assign() calls, but esbuild
      // still generates verbose helpers, so spread assignment is also prohiboted
      "ObjectExpression > SpreadElement",
      "AwaitExpression"
    ]
  },
  overrides: [
    {
      files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"]
    },
    // tests, no restrictions (runs in Node / jest with jsdom)
    {
      files: ["**/__tests__/**", "packages/dts-test/**"],
      rules: {
        "no-restricted-globals": "off",
        "no-restricted-syntax": "off",
        "jest/no-disabled-tests": "error",
        "jest/no-focused-tests": "error"
      }
    },
    // shared, may be used in any env
    {
      files: ["packages/shared/**"],
      rules: {
        "no-restricted-globals": "off"
      }
    },
    // Packages targeting DOM
    {
      files: ["packages/{vue,vue-compat,runtime-dom,helpers}/**"],
      rules: {
        "no-restricted-globals": ["error", ...NodeGlobals]
      }
    },
    // Packages targeting Node
    {
      files: ["packages/{compiler-sfc,compiler-ssr,server-renderer,reactivity-transform}/**"],
      rules: {
        "no-restricted-globals": ["error", ...DOMGlobals],
        "no-restricted-syntax": "off"
      }
    },
    // Private package, browser only + no syntax restrictions
    {
      files: ["packages/template-explorer/**", "packages/sfc-playground/**"],
      rules: {
        "no-restricted-globals": ["error", ...NodeGlobals],
        "no-restricted-syntax": "off"
      }
    },
    // Node scripts
    {
      files: ["scripts/**", "./*.js", "./*.ts", "packages/**/index.js", "packages/**/index.ts", "packages/size-check/**"],
      rules: {
        "no-restricted-globals": "off",
        "no-restricted-syntax": "off"
      }
    },
    {
      files: ["packages/{helpers}/**"],
      rules: {
        "no-restricted-globals": "off",
        "no-restricted-syntax": "off",
        "no-async-promise-executor": "off",
        "no-extra-boolean-cast": "off"
      }
    }
  ]
};
