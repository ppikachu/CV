<script setup lang="ts">
import type { Project } from '~/components/ProjectCard.vue'

defineProps<{
	project: Project
}>()
</script>

<template>
	<UBlogPost
		:title="project.title || project.path.split('/').pop()"
		:description="project.description"
		:to="project.path"
		:image="project.image"
		:badge="{
			label: project.category,
			variant: 'soft',
			ui: { label: 'text-wrap' }
		}"
		:ui="{ description: 'leading-tight' }"
		orientation="horizontal"
	/>
</template>
