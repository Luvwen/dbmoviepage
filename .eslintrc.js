module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        indent: 'off',
        'comma-dangle': 'off',
        'space-before-function-paren': 'off',
    },
}
