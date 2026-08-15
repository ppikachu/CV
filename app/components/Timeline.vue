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
		icon: 'i-lucide-film'
	},
	{
		date: '2010s',
		title: shortLoc.value === 'es' ? 'Diseño Digital · Identidad de Marca · Plataformas Web' : 'Digital Design · Brand Systems · Web Platforms',
		description: shortLoc.value === 'es'
			? 'Desarrollo de marcas integrales, sitios comerciales de alto rendimiento, quioscos interactivos para museos y dirección visual.'
			: 'Comprehensive brand identity systems, high-performance commercial websites, interactive museum kiosks, and visual art direction.',
		icon: 'i-lucide-layout'
	},
	{
		date: '2020s',
		title: shortLoc.value === 'es' ? 'Creative Development · Ecosistema Nuxt · Shaders GLSL' : 'Creative Development · Nuxt Ecosystem · WebGL & GLSL',
		description: shortLoc.value === 'es'
			? 'Ecosistemas de e-commerce completos (Nuxt 4), experiencias 3D interactivas con Three.js, shaders GLSL y tracking server-side.'
			: 'End-to-end e-commerce platforms (Nuxt 4), interactive WebGL 3D with Three.js, custom GLSL shaders, and server-side analytics.',
		icon: 'i-lucide-code-2'
	},
	{
		date: shortLoc.value === 'es' ? 'Hoy' : 'Today',
		title: shortLoc.value === 'es' ? 'Ejecución Integral: Concepto → Diseño → Motion → Código' : 'Full-Cycle Execution: Concept → Design → Motion → Code',
		description: shortLoc.value === 'es'
			? 'Uniendo visión estratégica, lenguaje visual refinado e implementación técnica moderna de forma directa y fluida.'
			: 'Unifying strategic vision, refined visual aesthetics, and modern front-end execution without intermediaries.',
		icon: 'i-lucide-sparkles'
	}
])
</script>

<template>
	<section id="timeline" class="my-12 not-prose">
		<div class="space-y-6">
			<div class="space-y-1">
				<ProseH2>
					{{ $t('timeline_title') }}
				</ProseH2>
				<ProseP class="text-xs text-muted mb-0">
					{{ $t('timeline_intro') }}
				</ProseP>
			</div>

			<UTimeline 
				:items="milestones" 
				color="primary"
				:default-value="milestones.length - 1"
				size="sm"
				:ui="{
					date: 'text-sm font-mono font-semibold text-primary',
					title: 'font-semibold text-sm text-highlighted',
					description: 'text-xs text-muted leading-relaxed max-w-2xl mt-1.5'
				}"
			/>
		</div>
	</section>
</template>
