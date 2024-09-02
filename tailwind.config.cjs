/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const safeListFile = 'safelist.txt'

// colors.indigo
const SAFELIST_COLORS = 'colors'

module.exports = {
	mode: 'jit',
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		'./safelist.txt'
	],
	darkMode: 'class',
	theme: {
		fontFamily: {
			sans: [
				'Inter',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'"Noto Sans"',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
				'"Noto Color Emoji"',
			],
			serif: [
				'ui-serif',
				'Georgia',
				'Cambria',
				'"Times New Roman"',
				'Times',
				'serif',
			],
			mono: [
				'ui-monospace',
				'SFMono-Regular',
				'Menlo',
				'Monaco',
				'Consolas',
				'"Liberation Mono"',
				'"Courier New"',
				'monospace',
			],
		},
		screens: {
			xs: '576',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
		},
		extend: {
			colors: {
				gestion_azul: {
					50: '#e0e5e9',  // muy claro
					100: '#c1cbd3', // más claro
					200: '#a2b0bc',
					300: '#8395a6',
					400: '#647a8f',
					500: '#4e667a', // tono medio
					600: '#3f5363',
					700: '#31414d',
					800: '#223036',
					900: '#2b3e4c', // color base más oscuro
				},
				gestion_verde: {
					50: '#e6f2e0',  // muy claro
					100: '#cce4c1', // más claro
					200: '#b3d7a3',
					300: '#99c984',
					400: '#80bc66',
					500: '#87b867', // tono medio (color base)
					600: '#6c9b52',
					700: '#517d3e',
					800: '#365e29',
					900: '#1b4015', // más oscuro
				},
				gestion_amarillo: {
					50: '#fff8e7',  // muy claro
					100: '#fef2d8', // más claro
					200: '#fde9c6',
					300: '#fce1b4',
					400: '#fbd8a3',
					500: '#f9d092', // tono medio
					600: '#f7c781',
					700: '#f5be71',
					800: '#f3b460',
					900: '#f4dfb9', // color base más oscuro
				},
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.gray.500'),
						maxWidth: '65ch',
					},
				},
				invert: {
					css: {
						color: theme('colors.gray.400'),
					},
				},
			}),
		},
	},
	plugins: [
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		require('./twSafelistGenerator')({
			path: safeListFile,
			patterns: [
				`text-{${SAFELIST_COLORS}}`,
				`bg-{${SAFELIST_COLORS}}`,
				`dark:bg-{${SAFELIST_COLORS}}`,
				`dark:hover:bg-{${SAFELIST_COLORS}}`,
				`dark:active:bg-{${SAFELIST_COLORS}}`,
				`hover:text-{${SAFELIST_COLORS}}`,
				`hover:bg-{${SAFELIST_COLORS}}`,
				`active:bg-{${SAFELIST_COLORS}}`,
				`ring-{${SAFELIST_COLORS}}`,
				`hover:ring-{${SAFELIST_COLORS}}`,
				`focus:ring-{${SAFELIST_COLORS}}`,
				`focus-within:ring-{${SAFELIST_COLORS}}`,
				`border-{${SAFELIST_COLORS}}`,
				`focus:border-{${SAFELIST_COLORS}}`,
				`focus-within:border-{${SAFELIST_COLORS}}`,
				`dark:text-{${SAFELIST_COLORS}}`,
				`dark:hover:text-{${SAFELIST_COLORS}}`,
				`h-{height}`,
				`w-{width}`,
			],
		}),
		require('@tailwindcss/typography'),
	],
};
