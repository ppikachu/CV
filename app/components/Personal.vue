<script setup lang="ts">
import type { Project } from '~/components/ProjectCard.vue'

const { locale } = useI18n()
const shortLoc = computed(() => locale.value.split('-')[0])

const { data: experiments } = await useAsyncData<Project[]>(
	`experiment-projects-${shortLoc.value}`,
	() => (queryCollection as any)('content')
		.where('path', 'LIKE', '/' + shortLoc.value + '/proyecto/%')
		.where('tipo', '=', 'experiment')
		.select('title', 'description', 'path', 'image', 'tags', 'tipo', 'category', 'role', 'client', 'year', 'featured', 'url', 'wip', 'group', 'isGroup')
		.all(),
	{ watch: [shortLoc] }
)
</script>

<template>
	<section id="experiments" class="my-10 not-prose space-y-4">
		<UPageFeature
			:title="$t('experiments')"
			:description="$t('experiments_intro')"
		/>
		<div class="space-y-4">
			<ProjectRow
				v-for="item in experiments"
				:key="item.path"
				:project="item"
			/>
		</div>
	</section>
</template>