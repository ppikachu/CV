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
		:badge="project.category ? { label: project.category, variant: 'subtle', color: 'neutral' } : undefined"
		orientation="horizontal"
	/>
</template>
