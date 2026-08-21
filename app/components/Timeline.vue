<script setup lang="ts">
import { Motion } from 'motion-v'
import type { TimelineItem } from '@nuxt/ui'

const { locale } = useI18n()

const milestones = computed<TimelineItem[]>(() => [
	{
		date: '2000s',
		title: locale.value === 'es' ? 'Multimedia · Animación 3D · Postproducción Broadcast' : 'Multimedia · 3D Animation · Broadcast Post-Production',
		description: locale.value === 'es'
			? 'Rigging de personajes, animación 2D/3D, composición digital VFX y masterización para televisión pública y cine independiente.'
			: 'Character rigging, 2D/3D animation, digital VFX compositing, and broadcast mastering for public TV and indie film.',
		icon: 'i-ph-film-strip'
	},
	{
		date: '2010s',
		title: locale.value === 'es' ? 'Diseño Digital · Identidad de Marca · Plataformas Web' : 'Digital Design · Brand Systems · Web Platforms',
		description: locale.value === 'es'
			? 'Desarrollo de marcas integrales, sitios comerciales de alto rendimiento.'
			: 'Comprehensive brand identity systems, high-performance commercial websites, interactive museum kiosks, and visual art direction.',
		icon: 'i-ph-layout'
	},
	{
		date: '2020s',
		title: locale.value === 'es' ? 'Creative Development · Ecosistema Nuxt · Shaders GLSL' : 'Creative Development · Nuxt Ecosystem · WebGL & GLSL',
		description: locale.value === 'es'
			? 'Ecosistemas de e-commerce completos (Nuxt 4), experiencias 3D interactivas con Three.js, shaders GLSL.'
			: 'End-to-end e-commerce platforms (Nuxt 4), interactive WebGL 3D with Three.js, custom GLSL shaders, and server-side analytics.',
		icon: 'i-ph-code'
	},
	{
		date: locale.value === 'es' ? 'Hoy' : 'Today',
		title: locale.value === 'es' ? 'Ejecución Integral: Concepto → Diseño → Motion → Código' : 'Full-Cycle Execution: Concept → Design → Motion → Code',
		description: locale.value === 'es'
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

		<div class="flex flex-col gap-1.5">
			<div
				v-for="(item, index) in milestones"
				:key="index"
				class="group relative flex flex-1 gap-3"
				:data-state="index === milestones.length - 1 ? 'active' : 'completed'"
			>
				<!-- Container: Entire Circle (Animated) + Separator Line -->
				<div class="relative flex flex-col items-center gap-1.5">
					<Motion
						:initial="{ scale: 0, opacity: 0 }"
						:while-in-view="{ scale: 1, opacity: 1 }"
						:in-view-options="{ once: true, amount: 'all', margin: '0px 0px -40px 0px' }"
						:transition="{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }"
					>
						<UAvatar
							size="xl"
							:icon="item.icon"
							class="group-data-[state=completed]:bg-primary group-data-[state=active]:bg-primary group-data-[state=completed]:text-inverted group-data-[state=active]:text-inverted text-muted"
							:ui="{ icon: 'text-inherit size-6', fallback: 'text-inherit' }"
						/>
					</Motion>

					<div
						v-if="index < milestones.length - 1"
						class="w-0.5 flex-1 rounded-full bg-primary"
					/>
				</div>

				<!-- Content Wrapper (Animated) -->
				<Motion
					:initial="{ opacity: 0, x: -32 }"
					:while-in-view="{ opacity: 1, x: 0 }"
					:in-view-options="{ once: true, amount: 'all', margin: '0px 0px -40px 0px' }"
					:transition="{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }"
					class="w-full mt-2.5 pb-7.5 space-y-1"
				>
					<div v-if="item.date" class="text-sm text-primary">
						{{ item.date }}
					</div>
					<div v-if="item.title" class="font-semibold text-md leading-tight">
						{{ item.title }}
					</div>
					<div v-if="item.description" class="text-sm text-muted leading-relaxed max-w-2xl mt-1.5">
						{{ item.description }}
					</div>
				</Motion>
			</div>
		</div>
	</section>
</template>
