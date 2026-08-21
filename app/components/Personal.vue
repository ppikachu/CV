<script setup lang="ts">
import type { Project } from '~/components/ProjectCard.vue'

const { locale } = useI18n()

const { data: experiments } = await useAsyncData<Project[]>(
	`experiment-projects-${locale.value}`,
	() => (queryCollection as any)('content')
		.where('path', 'LIKE', `/${locale.value}/proyecto/%`)
		.where('tipo', '=', 'experiment')
		.select('title', 'description', 'path', 'image', 'video', 'tags', 'tipo', 'category', 'role', 'client', 'year', 'url', 'wip', 'group', 'isGroup')
		.all(),
	{ watch: [locale] }
)
</script>

<template>
	<section id="experiments" class="not-prose">
		<UPageFeature
			:title="$t('experiments')"
			:description="$t('experiments_intro')"
		/>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<ProjectRow
				v-for="item in experiments"
				:key="item.path"
				:project="item"
			/>
		</div>
	</section>
</template>