// import en from "./locales/en.json"
// import es from "./locales/es.json"

export default defineI18nConfig(() => ({
	// strategy: 'no_prefix',
	legacy: false,
	locales: ['es', 'en'], // used in URL path prefix
	defaultLocale: 'es', // default locale of your project for Nuxt pages and routings
	fallbackLocale: 'es',
	messages: {
		en: {
			welcome: 'Welcome'
		},
		es: {
			welcome: 'Bienvenido'
		}
	}
}))