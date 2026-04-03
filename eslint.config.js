import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";

export default [
    // 1. Ignore patterns
    {
        ignores: ["dist", "build", "node_modules", ".git", "*.min.js"],
    },

    // 2. Base ESLint recommended
    js.configs.recommended,

    // 3. React & JavaScript config
    {
        files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2025,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            import: importPlugin,
        },
        settings: {
            react: {
                version: "detect",
            },
            "import/resolver": {
                node: {
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                },
            },
        },
        rules: {
            // React core rules
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "react/no-unknown-property": ["error", { ignore: [] }],
            "react/prop-types": "off",
            "react/jsx-key": "error",
            "react/jsx-no-duplicate-props": "error",
            "react/jsx-no-undef": "error",
            "react/jsx-pascal-case": "error",
            "react/no-array-index-key": "warn",
            "react/no-direct-mutation-state": "error",
            "react/no-unsafe": "error",
            "react/self-closing-comp": "error",
            "react/display-name": "warn",
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],

            // React Hooks rules
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",

            // Import rules
            "import/no-unresolved": "error",
            "import/named": "error",
            "import/default": "error",
            "import/no-duplicates": "error",
            "import/no-cycle": "warn",

            // General JavaScript rules
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "no-debugger": "warn",
            "prefer-const": "error",
            eqeqeq: ["error", "always", { null: "ignore" }],
            "no-var": "error",
            "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
        },
    },

    // 4. Config files - keep import resolution checks off (must come after general config)
    {
        files: ["*.config.js", "*.config.ts", "vitest.config.*"],
        rules: {
            "import/no-unresolved": "off",
            "import/named": "off",
            "import/default": "off",
        },
    },
];
