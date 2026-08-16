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
		:badge="project.category"
	>
		<!-- Actions -->
		<template #footer>
			<div class="flex items-center justify-between gap-2 p-4">
				<UButton
					:to="project.path"
					:label="$t('ver_proyecto')"
					icon="i-lucide-arrow-right"
					trailing
					:variant="featured ? 'solid' : 'ghost'"
					color="primary"
					size="xs"
				/>

				<UButton
					v-if="project.url"
					:to="project.url"
					target="_blank"
					:label="$t('see_live')"
					icon="i-lucide-external-link"
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
