module.exports = {
    tabWidth: 4,
    singleQuote: true,
    // Plugins are automatically loaded from the package.json
    // See https://prettier.io/docs/en/plugins.html#using-plugins for documentation.
    svelteBracketNewLine: true,
    overrides: [
        {
            files: ['*.yaml', '*.yml'],
            options: {
                tabWidth: 2,
            },
        },
    ],
    svelteSortOrder: 'options-scripts-styles-markup',
};
