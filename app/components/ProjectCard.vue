<script setup lang="ts">
export interface Project {
	title?: string
	description?: string
	path: string
	image?: string
	tags?: string[]
	tipo?: string
	category?: string
	role?: string | string[]
	client?: string
	year?: string
	featured?: boolean
	wip?: boolean
	url?: string
	group?: boolean
	isGroup?: boolean
}

const props = withDefaults(defineProps<{
	project: Project
	featured?: boolean
	group?: boolean
}>(), {
	featured: false,
	group: undefined
})

const isGroup = computed(() => {
	if (typeof props.group === 'boolean') {
		return props.group
	}
	return Boolean(props.project.group || props.project.isGroup)
})
</script>

<template>
	<div class="relative">
		<!-- Floating Type Badge on Top Left (only for project collections) -->
		<UBadge
			v-if="isGroup"
			:label="$t('project_group')"
			icon="i-ph-squares-four"
			variant="subtle"
			class="absolute top-3 left-3 z-20 backdrop-blur-md"
		/>

		<UBlogPost
			:title="project.title || project.path.split('/').pop()"
			:description="project.description"
			:to="project.path"
			:image="project.image"
			:badge="{
				label: project.category,
				variant: 'soft',
				ui: {
					label: 'text-wrap'
				}
			}"
		>
			<!-- Actions -->
			<template #footer>
				<div class="relative z-10 flex items-center justify-between gap-2 p-3 pt-0 sm:px-4">
					<UButton
						:to="project.path"
						:label="isGroup ? $t('ver_proyectos') : $t('ver_proyecto')"
						icon="i-ph-arrow-right"
						trailing
						:variant="featured ? 'solid' : 'soft'"
						color="primary"
						size="xs"
					/>

					<UButton
						v-if="project.url"
						:to="project.url"
						target="_blank"
						:label="$t('see_live')"
						icon="i-ph-arrow-square-out"
						trailing
						variant="ghost"
						color="neutral"
						size="xs"
						class="text-muted hover:text-highlighted"
						@click.stop
					/>
				</div>
			</template>
		</UBlogPost>
	</div>
</template>
