/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: ['winter']
	},
	plugins: [require('daisyui', 'tailwindcss/line-clamp')]
};
