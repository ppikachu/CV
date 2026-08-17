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
}

const props = withDefaults(defineProps<{
	project: Project
	featured?: boolean
}>(), {
	featured: false
})
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
					:label="$t('ver_proyecto')"
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
</template>
