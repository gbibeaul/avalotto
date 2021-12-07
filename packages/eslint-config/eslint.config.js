const ts = require('typescript');

module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
    },
    extends: ['airbnb/base', 'eslint:recommended', 'prettier'],
    plugins: ['@typescript-eslint', '@babel', 'jest', 'cypress'],
    env: {
        browser: true,
        es2017: true,
        'jest/globals': true,
        'cypress/globals': true,
    },
    reportUnusedDisableDirectives: true,
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts', '.svelte'],
            },
        },
    },
    rules: {
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '**/jest.config.js',
                    '**/svelte.config.js',
                    '**/stylelint.config.js',
                    '**/prettier.config.js',
                    '**/.eslintrc.js',
                    '**/*.test.ts',
                    '**/*.test.js',
                ],
            },
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                ts: 'never',
            },
        ],
    },
    overrides: [
        {
            files: ['**/*.json'],
            extends: ['prettier', 'plugin:json/recommended'],
            rules: {
                'json/*': [
                    'error',
                    {
                        allowComments: true,
                    },
                ],
            },
        },
        {
            files: ['*.ts'],
            extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
            rules: {
                'no-useless-constructor': 'off',
                '@typescript-eslint/no-useless-constructor': ['error'],
                'no-shadow': 'off',
                '@typescript-eslint/no-shadow': 'error',
            },
        },
        {
            files: ['*.svelte'],
            extends: ['plugin:@typescript-eslint/recommended'],
            processor: 'svelte3/svelte3',
            rules: {
                // Svelte files use Prettier on the command line
                // See https://github.com/sveltejs/prettier-plugin-svelte/issues/57
                'prettier/prettier': ['off'],
                // See https://github.com/sveltejs/eslint-plugin-svelte3/blob/master/OTHER_PLUGINS.md#eslint-plugin-import
                'import/first': 'off',
                'import/no-duplicates': 'off',
                'import/no-mutable-exports': 'off',
                'import/no-unresolved': 'off',
                'import/prefer-default-export': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    {
                        // Using $ prefix for setting store values sometimes triggers this rule if the store is not being accessed elsewhere in the file
                        // See https://svelte.dev/docs#4_Prefix_stores_with_$_to_access_their_values
                        varsIgnorePattern: '^\\$.+',
                        ignoreRestSiblings: true,
                    },
                ],
                // For performance reasons, turning off all Import Plugin rules.  Instead relying on TypeScript to catch anything dealign with imports.
                'import/no-cycle': 'off',
                'import/no-extraneous-dependencies': 'off',
                'import/extensions': 'off',
                'import/no-useless-path-segments': 'off',
                'import/named': 'off',
                'import/no-self-import': 'off',
                'import/order': 'off',
                'import/no-named-as-default-member': 'off',
                'import/no-named-as-default': 'off',
                'import/export': 'off',
            },
            settings: {
                'svelte3/typescript': ts, // pass the TypeScript package to the Svelte plugin
                // Styling linted by Stylelint instead.
                // ESLint, currently, has issues trying to parse PostCSS in Svelte.
                'svelte3/ignore-styles': () => true,
            },
            plugins: ['svelte3'],
        },
    ],
};
