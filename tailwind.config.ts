import type { Config } from 'tailwindcss'

export default {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
	],
	theme: {
		fontFamily: {
			sans: ['JetBrains Mono', 'sans-serif'],
		},
		extend: {},
	},
	plugins: [],
} satisfies Config

