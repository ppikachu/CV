import type { Config } from "tailwindcss";

export default {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
	],
	theme: {
		fontFamily: { sans: ["JetBrains Mono", "sans-serif"] },
		extend: {
			typography: (theme) => ({
				md: {
					css: {
						
						color: theme("colors.red.500"),
						
					},
				},
			}),
		},
	},
	plugins: [
		// require("@tailwindcss/typography"),
		// require("@tailwindcss/aspect-ratio"),
		// require('@tailwindcss/forms'),
		// require('tailwindcss-children'),
	],
} satisfies Config;
