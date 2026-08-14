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
		:ui="{
			body: 'p-4 sm:p-4 px-4 sm:px-4'
		}"
	>
		<template #footer>
			<div class="flex flex-col gap-3 w-full p-4 pt-0">
				<!-- Tags & Year -->
				<div v-if="(project.tags && project.tags.length) || project.year" class="flex items-center justify-between gap-2">
					<div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-1.5">
						<UBadge
							v-for="tag in project.tags.slice(0, featured ? 6 : 4)"
							:key="tag"
							:label="tag"
							size="sm"
							color="neutral"
							variant="subtle"
						/>
					</div>
					<span v-if="project.year" class="text-xs text-muted shrink-0 ml-auto">
						{{ project.year }}
					</span>
				</div>

				<!-- Actions -->
				<div class="flex items-center justify-between gap-2 pt-2 border-t border-default/50 relative z-10">
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
			</div>
		</template>
	</UBlogPost>
</template>
