
<script setup lang="ts">
import type { Project } from '~/components/ProjectCard.vue'

const { locale, t } = useI18n()
const shortLoc = computed(() => locale.value.split('-')[0])

const { data: kinoto } = await useAsyncData<Project | null>(
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
				<ProseH2>
					{{ $t('currently') }}
				</ProseH2>
				<UBadge variant="subtle" color="primary" size="sm" class="font-mono text-[11px]">
					Featured Case Study
				</UBadge>
			</div>

			<ProjectCard 
				v-if="kinoto"
				:project="kinoto"
				:featured="true"
			/>
		</div>
	</section>
</template>