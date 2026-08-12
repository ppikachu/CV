
<script setup lang="ts">
const { locale, t } = useI18n()
const shortLoc = computed(() => locale.value.split('-')[0])

const { data: kinoto } = await useAsyncData(
	`flagship-kinoto-${shortLoc.value}`,
	() => (queryCollection as any)('content')
		.where('path', 'LIKE', '/' + shortLoc.value + '/proyecto/%')
		.where('title', '=', 'Kinoto')
		.first(),
	{ watch: [shortLoc] }
)
</script>

<template>
	<section id="currently" class="my-10 not-prose">
		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<h2 class="text-xs uppercase tracking-widest text-primary-500 font-semibold font-mono">
					{{ $t('currently') }}
				</h2>
				<UBadge variant="subtle" color="primary" size="sm" class="font-mono text-[11px]">
					Featured Case Study
				</UBadge>
			</div>

			<ProjectCard 
				v-if="kinoto"
				:project="kinoto"
				variant="featured"
			/>
		</div>
	</section>
</template>