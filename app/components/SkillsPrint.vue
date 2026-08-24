<script setup lang="ts">
const { t } = useI18n()

const disciplines = computed(() => [
	{ title: t('brand_title'), description: t('brand_desc') },
	{ title: t('digital_title'), description: t('digital_desc') },
	{ title: t('motion_title'), description: t('motion_desc') },
	{ title: t('code_title'), description: t('code_desc') }
])

const tools = [
	'Figma', 'TypeScript', 'Nuxt', 'Vue', 'Tailwind CSS', 'Three.js',
	'GLSL', 'Modo 3D', 'Nuke', 'Moho', 'Final Cut Pro', 'Logic Pro'
]
</script>

<template>
	<section class="not-prose">
		<h2 class="text-xl font-heading font-extrabold tracking-tight mt-8 mb-3">
			{{ t('what_i_do') }}
		</h2>
		<div class="flex flex-col gap-1.5 text-sm mb-3.5">
			<div v-for="disc in disciplines" :key="disc.title" class="leading-snug">
				<strong class="font-bold">{{ disc.title }}</strong>
				<span> — {{ disc.description }}</span>
			</div>
		</div>
		<div class="text-sm flex flex-wrap items-center gap-1.5 pt-1">
			<strong class="font-bold mr-1">{{ t('tools_title') }}:</strong>
			<span
				v-for="tool in tools"
				:key="tool"
				class="font-mono font-medium text-xs px-2 py-0.5 rounded-full border border-neutral-400"
			>
				{{ tool }}
			</span>
		</div>
	</section>
</template>
