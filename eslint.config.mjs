import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import { defineConfig } from "eslint/config"

const eslintConfig = defineConfig([...nextVitals, ...nextTs])

export default eslintConfig
