import type { Config } from "tailwindcss";

export default {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
		"./app.vue",
	],
	theme: {
		fontFamily: { sans: ["JetBrains Mono", "sans-serif"] },
		// extend: {
		// 	typography: (theme: any) => ({
		// 		DEFAULT: {
		// 			css: {
		// 				color: theme("colors.pink.700"),
		// 				p: {
		// 					marginTop: 0,
		// 					marginBottom: 0
		// 				},
		// 			},
		// 		},
		// 	}),
		// },
	},
	plugins: [
		// require("@tailwindcss/typography"),
		// require("@tailwindcss/aspect-ratio"),
		// require('@tailwindcss/forms'),
	],
} satisfies Config;
