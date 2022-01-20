module.exports = {
	// add this section
	purge: ['./src/**/*.html', './src/**/*.svelte'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				avascratch: {
					background: '#E84142',
					border: '#F7DA10',
					scratchBtn: '#F7DA10'
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [require('@tailwindcss/forms')]
};
background:;
