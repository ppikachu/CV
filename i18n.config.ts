export default defineI18nConfig(() => ({
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
			proyectos_personales: 'Personal projects',
			faqs: 'FAQs',
			ver_proyecto: 'View project',
			web_url: 'Go to website',
			regresar: 'Back',
		},
		es: {
			role: 'Diseñador Multimedia',
			welcome: 'Bienvenido',
			herramientas: 'Herramientas',
			proyectos_en_desarrollo: 'Proyectos en desarrollo',
			proyectos_destacados: 'Proyectos destacados',
			proyectos_personales: 'Proyectos personales',
			faqs: 'Preguntas frecuentes',
			ver_proyecto: 'Ver proyecto',
			web_url: 'Ir al sitio web',
			regresar: 'Regresar',
		}
	}
}))