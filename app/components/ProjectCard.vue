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
	<UCard
		class="group flex flex-col justify-between overflow-hidden transition-all duration-300 hover:ring-primary hover:shadow-md"
		:class="{ 'hover:shadow-lg': featured }"
		:ui="{
			root: 'overflow-hidden h-full flex flex-col',
			body: 'p-0 sm:p-0 flex flex-col grow justify-between',
			footer: featured ? 'p-4 sm:px-6' : 'p-4 sm:px-5 flex items-center justify-between text-xs'
		}"
	>
		<div>
			<!-- Media Banner -->
			<NuxtLink :to="project.path" class="block overflow-hidden aspect-video relative">
				<NuxtImg
					v-if="project.image"
					:src="project.image"
					:alt="project.title"
					:width="featured ? 1620 : 800"
					:height="featured ? 769 : 500"
					class="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
				/>
				<div v-else class="w-full h-full flex items-center justify-center bg-gray-800 dark:bg-gray-900 text-muted">
					<UIcon name="i-lucide-image" class="w-8 h-8" />
				</div>
			</NuxtLink>

			<!-- Content Area -->
			<div :class="featured ? 'p-6 space-y-4' : 'p-5 space-y-3'">
				<div class="flex items-center justify-between gap-2">
					<span v-if="project.category" class="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold truncate">
						{{ project.category }}
					</span>
					<span v-if="project.year" class="text-[11px] font-mono text-muted shrink-0">
						{{ project.year }}
					</span>
				</div>

				<NuxtLink :to="project.path" class="block group-hover:text-primary-500 transition-colors">
					<ProseH3>
						{{ project.title || project.path.split('/').pop() }}
					</ProseH3>
				</NuxtLink>

				<p :class="['text-muted leading-relaxed', featured ? 'text-sm max-w-3xl' : 'text-xs line-clamp-2']">
					{{ project.description }}
				</p>
			</div>
		</div>

		<!-- Tags -->
		<div v-if="project.tags && project.tags.length" :class="featured ? 'px-6 pb-4' : 'px-5 pb-4'">
			<div class="flex flex-wrap gap-1.5">
				<UBadge
					v-for="tag in project.tags.slice(0, featured ? 6 : 4)"
					:key="tag"
					:label="tag"
					size="xs"
					:variant="featured ? 'outline' : 'subtle'"
					color="neutral"
					class="font-mono text-[10px]"
				/>
			</div>
		</div>

		<!-- Footer Actions -->
		<template #footer>
			<template v-if="featured">
				<div class="flex flex-wrap items-center gap-3">
					<UButton
						:to="project.path"
						:label="$t('view_case_study')"
						icon="i-lucide-arrow-right"
						trailing
						variant="solid"
						color="primary"
						size="sm"
					/>
					<UButton
						v-if="project.url"
						:to="project.url"
						target="_blank"
						:label="$t('web_url')"
						icon="i-lucide-external-link"
						variant="ghost"
						color="neutral"
						size="sm"
					/>
				</div>
			</template>
			<template v-else>
				<NuxtLink 
					:to="project.path" 
					class="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 group-hover:underline"
				>
					<span>{{ $t('view_case_study') }}</span>
					<UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
				</NuxtLink>
				
				<a
					v-if="project.url"
					:href="project.url"
					target="_blank"
					rel="noopener"
					class="text-xs text-muted hover:text-primary-500 inline-flex items-center gap-1 font-mono"
					@click.stop
				>
					<span>Live</span>
					<UIcon name="i-lucide-external-link" class="w-3 h-3" />
				</a>
			</template>
		</template>
	</UCard>
</template>
