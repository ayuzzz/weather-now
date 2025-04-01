import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable the exhaustive-deps rule for useEffect
      "react-hooks/exhaustive-deps": "off",

      // Allow unused variables (e.g., in tests or temporary code)
      "@typescript-eslint/no-unused-vars": [
        "warn", 
        { "argsIgnorePattern": "^_" } // Ignore unused args starting with _
      ],

      // Allow `any` type usage with warnings instead of errors
      "@typescript-eslint/no-explicit-any": "off"
      
    },
  },
];

export default eslintConfig;
