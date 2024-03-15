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
			role: 'Multimedia Designer',
			welcome: 'Welcome',
			herramientas: 'Tools',
			proyectos_en_desarrollo: 'Projects in development',
			proyectos_destacados: 'Featured projects',
			ver_proyecto: 'View project',
			regresar: 'Back',
		},
		es: {
			role: 'Diseñador Multimedia',
			welcome: 'Bienvenido',
			herramientas: 'Herramientas',
			proyectos_en_desarrollo: 'Proyectos en desarrollo',
			proyectos_destacados: 'Proyectos destacados',
			ver_proyecto: 'Ver proyecto',
			regresar: 'Regresar',
		}
	}
}))