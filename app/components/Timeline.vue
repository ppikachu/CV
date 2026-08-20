<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'

const { locale } = useI18n()
const shortLoc = computed(() => locale.value.split('-')[0])

const milestones = computed<TimelineItem[]>(() => [
	{
		date: '2000s',
		title: shortLoc.value === 'es' ? 'Multimedia · Animación 3D · Postproducción Broadcast' : 'Multimedia · 3D Animation · Broadcast Post-Production',
		description: shortLoc.value === 'es'
			? 'Rigging de personajes, animación 2D/3D, composición digital VFX y masterización para televisión pública y cine independiente.'
			: 'Character rigging, 2D/3D animation, digital VFX compositing, and broadcast mastering for public TV and indie film.',
		icon: 'i-ph-film-strip'
	},
	{
		date: '2010s',
		title: shortLoc.value === 'es' ? 'Diseño Digital · Identidad de Marca · Plataformas Web' : 'Digital Design · Brand Systems · Web Platforms',
		description: shortLoc.value === 'es'
			? 'Desarrollo de marcas integrales, sitios comerciales de alto rendimiento.'
			: 'Comprehensive brand identity systems, high-performance commercial websites, interactive museum kiosks, and visual art direction.',
		icon: 'i-ph-layout'
	},
	{
		date: '2020s',
		title: shortLoc.value === 'es' ? 'Creative Development · Ecosistema Nuxt · Shaders GLSL' : 'Creative Development · Nuxt Ecosystem · WebGL & GLSL',
		description: shortLoc.value === 'es'
			? 'Ecosistemas de e-commerce completos (Nuxt 4), experiencias 3D interactivas con Three.js, shaders GLSL.'
			: 'End-to-end e-commerce platforms (Nuxt 4), interactive WebGL 3D with Three.js, custom GLSL shaders, and server-side analytics.',
		icon: 'i-ph-code'
	},
	{
		date: shortLoc.value === 'es' ? 'Hoy' : 'Today',
		title: shortLoc.value === 'es' ? 'Ejecución Integral: Concepto → Diseño → Motion → Código' : 'Full-Cycle Execution: Concept → Design → Motion → Code',
		description: shortLoc.value === 'es'
			? 'Uniendo visión estratégica, lenguaje visual e implementación técnica moderna.'
			: 'Unifying strategic vision, refined visual aesthetics, and modern front-end execution without intermediaries.',
		icon: 'i-ph-sparkle'
	}
])
</script>

<template>
	<section id="timeline" class="my-12 not-prose">
		<UPageFeature
			:title="$t('timeline_title')"
			:description="$t('timeline_intro')"
		/>

		<UTimeline 
			:items="milestones" 
			color="primary"
			:default-value="milestones.length - 1"
			size="sm"
			:ui="{
				wrapper: 'space-y-3',
				date: 'text-sm text-primary',
				title: 'font-semibold text-md leading-tight',
				description: 'text-sm text-muted leading-relaxed max-w-2xl mt-1.5'
			}"
		/>
	</section>
</template>
