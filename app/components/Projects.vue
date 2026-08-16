<script setup lang="ts">
import type { Project } from '~/components/ProjectCard.vue'

const { locale } = useI18n()
const shortLoc = computed(() => locale.value.split('-')[0])

const { data: projects } = await useAsyncData<Project[]>(
	`featured-projects-${shortLoc.value}`,
	() => (queryCollection as any)('content')
		.where('path', 'LIKE', '/' + shortLoc.value + '/proyecto/%')
		.where('tipo', '=', 'featured')
		.select('title', 'description', 'path', 'image', 'tags', 'tipo', 'category', 'role', 'client', 'year', 'featured', 'url')
		.all(),
	{ watch: [shortLoc] }
)

const leadProject = computed(() => projects.value?.[0])
const gridProjects = computed(() => projects.value?.slice(1) || [])
</script>

<template>
	<section id="featured-work" class="my-10 not-prose">
		<div class="space-y-6">
			<UPageFeature
				:title="$t('featured_work')"
			/>

			<!-- Flagship Lead Project: Luz Negra Web (Full-width showcase) -->
			<div v-if="leadProject">
				<ProjectCard
					:project="leadProject"
					:featured="true"
				/>
			</div>

			<!-- Secondary Featured Projects: 2-Column Grid -->
			<div v-if="gridProjects.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<ProjectCard
					v-for="item in gridProjects"
					:key="item.path"
					:project="item"
				/>
			</div>
		</div>
	</section>
</template>