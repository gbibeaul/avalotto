const sveltePreprocess = require('svelte-preprocess');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');

function createPreprocessors() {
    return sveltePreprocess({
        /* sveltePreprocess options */
        postcss: {
            plugins: [postcssImport, postcssNested],
        },

        babel: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        loose: true,
                        // No need for babel to resolve modules
                        modules: false,
                        // ! Very important. Target es6+
                        targets: 'defaults, not ie <= 11',
                    },
                ],
            ],
        },
    });
}

function webpackLoaderConfig(isProduction) {
    return {
        dev: !isProduction,
        emitCss: true,
        hotReload: false,
        preprocess: createPreprocessors(),
    };
}

module.exports = {
    preprocess: createPreprocessors(),
    createPreprocessors,
    webpackLoaderConfig,
};
