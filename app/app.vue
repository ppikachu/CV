<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const { t, locale } = useI18n()
const route = useRoute()

const siteUrl = computed(() => (runtimeConfig.public.HOST || 'https://toyos.vercel.app').replace(/\/$/, ''))
const ogImageUrl = computed(() => `${siteUrl.value}${runtimeConfig.public.OG_IMAGE}`)
const twitterImageUrl = computed(() => `${siteUrl.value}${runtimeConfig.public.TWITTER_IMAGE}`)

const title = computed(() => t('seo_title'))
const description = computed(() => t('seo_description'))

useServerSeoMeta({
	title,
	description,
	ogTitle: title,
	ogDescription: description,
	ogImage: ogImageUrl,
	ogUrl: computed(() => `${siteUrl.value}${route.path}`),
	twitterTitle: title,
	twitterDescription: description,
	twitterImage: twitterImageUrl,
	twitterCard: 'summary_large_image'
})

const i18nHead = useLocaleHead({
	addSeoAttributes: true
})

const schemaGraph = computed(() => {
	const isEn = locale.value === 'en'
	const base = siteUrl.value
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': `${base}/#website`,
				'url': base,
				'name': 'Santiago Toyos',
				'description': isEn
					? 'Portfolio of Santiago Toyos: Graphic Designer and Creative Developer'
					: 'Portfolio de Santiago Toyos: Diseñador Gráfico y Creative Developer',
				'inLanguage': ['es-AR', 'en-US']
			},
			{
				'@type': ['Person', 'ProfessionalService'],
				'@id': `${base}/#person`,
				'name': 'Santiago Toyos',
				'url': base,
				'image': ogImageUrl.value,
				'jobTitle': isEn ? 'Graphic Designer & Creative Developer' : 'Diseñador Gráfico y Creative Developer',
				'address': {
					'@type': 'PostalAddress',
					'addressLocality': 'Buenos Aires',
					'addressRegion': 'CABA',
					'addressCountry': 'AR'
				},
				'geo': {
					'@type': 'GeoCoordinates',
					'latitude': -34.6037,
					'longitude': -58.3816
				},
				'priceRange': '$$',
				'sameAs': [
					'https://github.com/ppikachu',
					'https://www.behance.net/stoyos',
					'https://www.linkedin.com/in/santiago-toyos'
				],
				'knowsAbout': [
					'Graphic Design',
					'Creative Development',
					'Three.js',
					'WebGL',
					'GLSL',
					'Nuxt',
					'Vue',
					'Brand Identity',
					'Motion Graphics',
					'Front-End Engineering',
					'Artificial Intelligence',
					'AI-Assisted Development',
					'Generative AI',
					'Model Context Protocol'
				]
			}
		]
	}
})

useHead({
	htmlAttrs: {
		lang: () => i18nHead.value.htmlAttrs?.lang || (locale.value === 'es' ? 'es-AR' : 'en-US'),
		dir: () => i18nHead.value.htmlAttrs?.dir || 'ltr'
	},
	link: () => [
		...(i18nHead.value.link || [])
	],
	meta: () => [
		...(i18nHead.value.meta || [])
	],
	script: [
		{
			type: 'application/ld+json',
			innerHTML: () => JSON.stringify(schemaGraph.value)
		}
	]
})
</script>
<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
	transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
}

@keyframes slide-enter {
	0% {
		transform: translateY(10px);
		opacity: 0
	}

	to {
		transform: translateY(0);
		opacity: 100
	}
}

@media (prefers-reduced-motion:no-preference) {
	.slide-enter-content > * {
		--enter-stage: 0;
		--enter-step: 150ms;
		--enter-initial: 0ms;
		animation: slide-enter 1s both 1;
		animation-delay: calc(var(--enter-initial) + var(--enter-stage) * var(--enter-step));
	}

	.slide-enter-content > *:nth-child(1) { --enter-stage: 1; }
	.slide-enter-content > *:nth-child(2) { --enter-stage: 2; }
	.slide-enter-content > *:nth-child(3) { --enter-stage: 3; }
	.slide-enter-content > *:nth-child(4) { --enter-stage: 4; }
	.slide-enter-content > *:nth-child(5) { --enter-stage: 5; }
	.slide-enter-content > *:nth-child(6) { --enter-stage: 6; }
	.slide-enter-content > *:nth-child(7) { --enter-stage: 7; }
	.slide-enter-content > *:nth-child(8) { --enter-stage: 8; }
	.slide-enter-content > *:nth-child(9) { --enter-stage: 9; }
	.slide-enter-content > *:nth-child(10) { --enter-stage: 10; }
}
</style>