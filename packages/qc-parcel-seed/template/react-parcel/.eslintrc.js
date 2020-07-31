module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "parser": "babel-eslint",
    "plugins": [
        "html",
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "no-unused-vars": 2,
        "no-extra-semi": 2,
        "no-empty": 2,
        "comma-dangle": ["error"],
        "no-irregular-whitespace": 2,
        "no-multi-spaces": 2,
        "default-case": 0,
        "eqeqeq": ["error"],
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": ["error", "never"]
    }
};