<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import type { Project } from '~/components/ProjectCard.vue'

const props = withDefaults(defineProps<{
	project: Project
	group?: boolean
}>(), {
	group: undefined
})

const { t } = useI18n()

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greaterOrEqual('md')

const isGroup = computed(() => {
	if (typeof props.group === 'boolean') {
		return props.group
	}
	return Boolean(props.project.group || props.project.isGroup)
})

const badge = computed(() => {
	if (isGroup.value) {
		return {
			label: t('project_group'),
			icon: 'i-ph-squares-four',
			variant: 'outline' as const
		}
	}
	if (!isDesktop.value || !props.project.category) return undefined
	return {
		label: props.project.category,
		variant: 'outline' as const,
		ui: { label: 'text-wrap' }
	}
})
</script>

<template>
	<UBlogPost
		:title="project.title || project.path.split('/').pop()"
		:description="project.description"
		:to="project.path"
		:image="project.image"
		:badge="badge"
		:ui="{ description: 'leading-tight' }"
		orientation="horizontal"
	/>
</template>

