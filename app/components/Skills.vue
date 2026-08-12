<script setup lang="ts">
const { locale, t } = useI18n()
const shortLoc = computed(() => locale.value.split('-')[0])

const { data: page } = await useAsyncData(
	`skills-${shortLoc.value}`,
	() => queryCollection('content').path('/' + shortLoc.value + '/skills').first(),
	{ watch: [shortLoc] }
)

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
</script>

<template>
	<section id="what-i-do" class="my-8 not-prose">
		<div class="space-y-6">
			<div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
				<h2 class="text-xs uppercase tracking-widest text-primary-500 font-semibold font-mono">
					{{ $t('what_i_do') }}
				</h2>
				<span class="text-xs text-gray-500 dark:text-gray-400 font-mono">
					{{ $t('disciplines_tagline') }}
				</span>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<UCard 
					v-for="disc in disciplines" 
					:key="disc.title"
					:ui="{ body: 'p-4 sm:p-4 space-y-1.5' }"
				>
					<div class="flex items-center gap-2">
						<UIcon :name="disc.icon" class="w-4 h-4 text-primary-500" />
						<h3 class="font-bold text-base text-gray-900 dark:text-gray-100">{{ disc.title }}</h3>
					</div>
					<p class="text-xs text-gray-600 dark:text-gray-400 leading-normal">
						{{ disc.desc }}
					</p>
				</UCard>
			</div>
		</div>
	</section>
</template>