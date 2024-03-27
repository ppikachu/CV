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
		extend: {
			aspectRatio: {
				auto: 'auto',
				square: '1 / 1',
				video: '16 / 9'
			},
			typography: (theme: any) => ({
				DEFAULT: {
					css: {
						h1: {
							fontSize: theme("fontSize.2xl")[0],
						},
						h2: {
							fontSize: theme("fontSize.xl")[0],
						},
						h3: {
							fontSize: theme("fontSize.lg")[0],
						},
						h4: {
							fontSize: theme("fontSize.base")[0],
						},
						"h1, h2, h3, h4": {
							marginTop: '3rem',
							marginBottom: '1rem',
							fontWeight: 400,
						},
					},
				},
				lg: {
					css: {
						h1: {
							fontSize: theme("fontSize.3xl")[0],
						},
						h2: {
							fontSize: theme("fontSize.2xl")[0],
						},
						h3: {
							fontSize: theme("fontSize.xl")[0],
						},
						h4: {
							fontSize: theme("fontSize.lg")[0],
						},
						"h1, h2, h3, h4": {
							marginTop: 0,
							marginBottom: '1rem',
							fontWeight: 400,
						},
					},
				},
			})
		}
	}
} satisfies Config;
