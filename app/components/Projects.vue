<script setup lang="ts">
import type { Project } from '~/components/ProjectCard.vue'

const { locale } = useI18n()
const shortLoc = computed(() => locale.value.split('-')[0])

const { data: projects } = await useAsyncData<Project[]>(
	`selected-projects-${shortLoc.value}`,
	() => (queryCollection as any)('content')
		.where('path', 'LIKE', '/' + shortLoc.value + '/proyecto/%')
		.where('tipo', '=', 'selected')
		.select('title', 'description', 'path', 'image', 'tags', 'tipo', 'category', 'role', 'client', 'year', 'featured', 'url')
		.all(),
	{ watch: [shortLoc] }
)
</script>

<template>
	<section id="selected-work" class="my-10 not-prose">
		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<ProseH2>
					{{ $t('selected_work') }}
				</ProseH2>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<ProjectCard
					v-for="item in projects"
					:key="item.path"
					:project="item"
				/>
			</div>
		</div>
	</section>
</template>