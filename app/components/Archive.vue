<script setup lang="ts">
import type { Project } from '~/components/ProjectCard.vue'

const { locale } = useI18n()
const shortLoc = computed(() => locale.value.split('-')[0])

const { data: archive } = await useAsyncData<Project[]>(
	`archive-projects-${shortLoc.value}`,
	() => (queryCollection as any)('content')
		.where('path', 'LIKE', '/' + shortLoc.value + '/proyecto/%')
		.where('tipo', '=', 'archive')
		.select('title', 'description', 'path', 'image', 'tags', 'tipo', 'category', 'role', 'client', 'year', 'featured', 'url')
		.all(),
	{ watch: [shortLoc] }
)
</script>

<template>
	<section id="archive" class="my-10 not-prose">
		<div class="space-y-4">
			<div class="space-y-1">
				<ProseH2>
					{{ $t('archive_title') }}
				</ProseH2>
				<p class="text-xs text-muted">
					{{ $t('archive_intro') }}
				</p>
			</div>

			<div class="space-y-8">
				<ProjectRow
					v-for="item in archive"
					:key="item.path"
					:project="item"
				/>
			</div>
		</div>
	</section>
</template>
