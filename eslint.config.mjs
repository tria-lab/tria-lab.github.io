import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import betterTailwind from "eslint-plugin-better-tailwindcss"
import { defineConfig } from "eslint/config"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/app/globals.css",
        rootFontSize: 16,
      },
    },
    plugins: {
      "better-tailwindcss": betterTailwind,
    },
    rules: {
      // https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-canonical-classes.md
      "better-tailwindcss/enforce-canonical-classes": "error",
      // https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-duplicate-classes.md
      "better-tailwindcss/no-duplicate-classes": "error",
      // https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-deprecated-classes.md
      "better-tailwindcss/no-deprecated-classes": "error",

      // https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-conflicting-classes.md
      "better-tailwindcss/no-conflicting-classes": "error",
      // https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-restricted-classes.md
      "better-tailwindcss/no-restricted-classes": "error",
    },
  },
])

export default eslintConfig
