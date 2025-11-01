import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

const eslintConfig = [
    {
        ignores: ["**/node_modules/**", "**/.next/**", "**/dist/**", "**/out/**"],
    },
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        files: ["**/*.{js,ts,jsx,tsx}"],
        rules: {
            semi: ["error", "never"],
            indent: ["error", 4],
        },
    },
]

export default eslintConfig
