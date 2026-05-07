import { requireOpengraph } from "./src/lib/eslint-rules/require-opengraph.ts"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import betterTailwind from "eslint-plugin-better-tailwindcss"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"

const eslintConfig = defineConfig([
  {
    ignores: ["src/lib/eslint-rules/**/*"],
  },
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
      "tria-lab": {
        rules: {
          "require-opengraph": requireOpengraph,
        },
      },
    },
    languageOptions: {
      parser: tseslint.parser,
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

      "tria-lab/require-opengraph": "error",
    },
  },
])

export default eslintConfig
