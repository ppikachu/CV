// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		"@nuxt/ui",
		"@nuxt/content",
		"@nuxt/devtools",
		"@nuxtjs/google-fonts",
	],
	googleFonts: {
		families: {
			'JetBrains Mono': [400, 700]
		}
	},
});
