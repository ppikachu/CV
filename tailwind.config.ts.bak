import type { Config } from '@types/tailwindcss'

export default <Partial<Config>>{
	content: [
		"./app/components/**/*.{js,vue,ts}",
		"./app/layouts/**/*.vue",
		"./app/pages/**/*.vue",
		"./app/plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
		"./app/app.vue",
		"./app/error.vue",
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
							marginTop: '2rem',
							marginBottom: '2rem',
							fontWeight: 400,
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
						"h2, h3, h4": {
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
}
