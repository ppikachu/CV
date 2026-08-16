<script setup lang="ts">
const { t } = useI18n()

const disciplines = computed(() => [
	{
		title: t('brand_title'),
		desc: t('brand_desc'),
		icon: 'i-lucide-palette'
	},
	{
		title: t('digital_title'),
		desc: t('digital_desc'),
		icon: 'i-lucide-layout'
	},
	{
		title: t('motion_title'),
		desc: t('motion_desc'),
		icon: 'i-lucide-film'
	},
	{
		title: t('code_title'),
		desc: t('code_desc'),
		icon: 'i-lucide-code-2'
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
</script>

<template>
	<section id="what-i-do" class="my-10 not-prose">
		<div class="space-y-6">
			<!-- Section Header -->
			<UPageFeature
				:title="$t('what_i_do')"
				:description="$t('disciplines_tagline')"
			/>

			<!-- Core Expertise Cards -->
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<UCard 
					v-for="disc in disciplines" 
					:key="disc.title"
					:ui="{ body: 'p-4 sm:p-5 space-y-1.5' }"
				>
					<div class="flex items-center gap-2">
						<UIcon :name="disc.icon" class="w-4 h-4 text-primary" />
						<ProseH3 class="text-base font-semibold">{{ disc.title }}</ProseH3>
					</div>
					<ProseP class="text-sm text-muted leading-relaxed mb-0">
						{{ disc.desc }}
					</ProseP>
				</UCard>
			</div>

			<!-- Understated Tools Sub-section -->
			<div class="pt-2">
				<UPageFeature
					:title="$t('tools_title')"
					:description="$t('tools_subtitle')"
					class="mb-3"
				/>
				<div class="flex flex-wrap gap-1.5">
					<UBadge
						v-for="tool in tools"
						:key="tool"
						:label="tool"
						variant="subtle"
						color="neutral"
						size="sm"
						class="text-xs font-mono"
					/>
				</div>
			</div>
		</div>
	</section>
</template>