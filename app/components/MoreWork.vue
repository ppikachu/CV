<script setup lang="ts">
import type { Project } from '~/components/ProjectCard.vue'

const { locale } = useI18n()

const { data: moreProjects } = await useAsyncData<Project[]>(
	`more-projects-${locale.value}`,
	() => (queryCollection as any)('content')
		.where('path', 'LIKE', `/${locale.value}/proyecto/%`)
		.where('tipo', '=', 'more')
		.select('title', 'description', 'path', 'image', 'video', 'tags', 'tipo', 'category', 'role', 'client', 'year', 'url', 'wip', 'group', 'isGroup')
		.all(),
	{ watch: [locale] }
)
</script>

<template>
	<section id="more-work" class="my-10 not-prose">
		<UPageFeature
			:title="$t('more_work')"
		/>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<ProjectRow
				v-for="item in moreProjects"
				:key="item.path"
				:project="item"
			/>
		</div>
	</section>
</template>
