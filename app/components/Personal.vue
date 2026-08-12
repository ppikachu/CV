<script setup lang="ts">
import type { Project } from '~/components/ProjectCard.vue'

const { locale } = useI18n()
const shortLoc = computed(() => locale.value.split('-')[0])

const { data: experiments } = await useAsyncData<Project[]>(
	`experiment-projects-${shortLoc.value}`,
	() => (queryCollection as any)('content')
		.where('path', 'LIKE', '/' + shortLoc.value + '/proyecto/%')
		.where('tipo', '=', 'experiment')
		.select('title', 'description', 'path', 'image', 'tags', 'tipo', 'category', 'role', 'client', 'year', 'featured', 'url')
		.all(),
	{ watch: [shortLoc] }
)
</script>

<template>
	<section id="experiments" class="my-10 not-prose">
		<div class="space-y-3">
			<div class="space-y-1">
				<h2 class="text-xs uppercase tracking-widest text-primary-500 font-semibold font-mono">
					{{ $t('experiments') }}
				</h2>
				<p class="text-xs text-muted">
					{{ $t('experiments_intro') }}
				</p>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<ProjectCard
					v-for="item in experiments"
					:key="item.path"
					:project="item"
					variant="compact"
				/>
			</div>
		</div>
	</section>
</template>