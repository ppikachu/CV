<script setup lang="ts">
import type { Project } from '~/components/ProjectCard.vue'

const { locale } = useI18n()
const shortLoc = computed(() => locale.value.split('-')[0])

const { data: moreProjects } = await useAsyncData<Project[]>(
	`more-projects-${shortLoc.value}`,
	() => (queryCollection as any)('content')
		.where('path', 'LIKE', '/' + shortLoc.value + '/proyecto/%')
		.where('tipo', '=', 'more')
		.select('title', 'description', 'path', 'image', 'tags', 'tipo', 'category', 'role', 'client', 'year', 'featured', 'url', 'wip')
		.all(),
	{ watch: [shortLoc] }
)
</script>

<template>
	<section id="more-work" class="my-10 not-prose">
		<div class="space-y-4">
			<UPageFeature
				:title="$t('more_work')"
			/>

			<div class="space-y-4">
				<ProjectRow
					v-for="item in moreProjects"
					:key="item.path"
					:project="item"
				/>
			</div>
		</div>
	</section>
</template>
