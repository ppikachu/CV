// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxt/ui",
		"@nuxt/content",
		"@nuxt/devtools",
		"@nuxtjs/google-fonts",
		"@nuxt/image",
		"vue3-carousel-nuxt",
	],
	googleFonts: {
		families: {
			"JetBrains Mono": [400, 700],
		},
	},
	app: {
		pageTransition: { name: "page", mode: "out-in" },
	},
	devtools: { enabled: false },
});
