
module.exports = {
	// add this section
	purge: ['./src/**/*.html', './src/**/*.svelte'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				lotto: ["Montserrat Alternates"]
			},
			colors: {
				avascratch: {
					background: '#EF2203',
					border: '#F7DA10',
					scratchBtn: '#F7DA10'
				},
				lotto: {
					purple : '#5046e4',
					black: '#242321'				
				}
			},
			boxShadow: {
				lottoNum: '0px 4px 21px rgba(0, 0, 0, 0.2)'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography')
	]
};
