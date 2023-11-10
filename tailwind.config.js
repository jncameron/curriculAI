/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#9d82ed',

					secondary: '#87edd7',

					accent: '#ac3cf2',

					neutral: '#251c26',

					'base-100': '#efecf3',

					info: '#467ac3',

					success: '#43ea9c',

					warning: '#f8cc2a',

					error: '#fb6e5b'
				}
			}
		]
	},
	plugins: [require('daisyui', 'tailwindcss/line-clamp', require('@tailwindcss/typography'))]
};
