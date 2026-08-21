<script setup lang="ts">
import { Motion } from 'motion-v'

const { t } = useI18n()

const disciplines = computed(() => [
	{
		title: t('brand_title'),
		description: t('brand_desc'),
		icon: 'i-ph-palette'
	},
	{
		title: t('digital_title'),
		description: t('digital_desc'),
		icon: 'i-ph-layout'
	},
	{
		title: t('motion_title'),
		description: t('motion_desc'),
		icon: 'i-ph-film-strip'
	},
	{
		title: t('code_title'),
		description: t('code_desc'),
		icon: 'i-ph-code'
	}
])

const tools = [
	'Figma',
	'TypeScript',
	'Nuxt',
	'Vue',
	'Tailwind CSS',
	'Three.js',
	'GLSL',
	'Modo 3D',
	'Nuke',
	'Moho',
	'Final Cut Pro',
	'Logic Pro'
]

const toolsWithSpectrum = computed(() => {
	const total = tools.length
	return tools.map((tool, index) => {
		// Infrared (0° deep crimson) across the visible spectrum to Ultraviolet (315° violet/magenta)
		const hue = Math.round((index / (total - 1)) * 315)
		return {
			name: tool,
			style: {
				backgroundColor: `hsla(${hue}, 85%, 55%, 0.15)`,
				color: `hsl(${hue}, 90%, 80%)`,
				boxShadow: `inset 0 0 0 1px hsla(${hue}, 85%, 60%, 0.35)`
			}
		}
	})
})
</script>

<template>
	<section id="what-i-do">
		<!-- Section Header -->
		<UPageFeature
			:title="$t('what_i_do')"
			:description="$t('disciplines_tagline')"
		/>

		<!-- Core Expertise Cards -->
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
			<UPageCard 
				v-for="disc in disciplines" 
				:key="disc.title"
				:title="disc.title"
				:description="disc.description"
				:icon="disc.icon"
				variant="ghost"
				spotlight
				:ui="{
					leading: 'mb-0',
					leadingIcon: 'size-8',
					title: 'text-primary font-heading font-extrabold text-2xl',
					description: 'mb-0 font-bold text-lg leading-tight'
				}"
			/>
		</div>

		<!-- Understated Tools Sub-section -->
		<div class="pt-2">
			<UPageFeature
				:title="$t('tools_title')"
				:description="$t('tools_subtitle')"
				class="mb-3"
			/>
			<div class="flex flex-wrap gap-1.5">
				<Motion
					v-for="(tool, index) in toolsWithSpectrum"
					:key="tool.name"
					:initial="{ scale: 0, opacity: 0 }"
					:while-in-view="{ scale: 1, opacity: 1 }"
					:in-view-options="{ once: true, amount: 'all', margin: '0px 0px -30px 0px' }"
					:transition="{ duration: 0.35, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }"
				>
					<UBadge
						:label="tool.name"
						:style="tool.style"
						class="rounded-full"
					/>
				</Motion>
			</div>
		</div>
	</section>
</template>