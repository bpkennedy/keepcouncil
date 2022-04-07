module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "window": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
        {
            "files": ['*.ts', '*.tsx'],
            "parserOptions": {
                "project": ['./tsconfig.json'],
                "sourceType": "module"
            },
        }
    ],
    "parser": '@typescript-eslint/parser',
    "plugins": ["@typescript-eslint"],
    "rules": {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-var-requires": "off",
    }
};
