<script setup lang="ts">
import type { Project } from '~/components/ProjectCard.vue'

defineProps<{
	project: Project
}>()
</script>

<template>
	<NuxtLink
		:to="project.path"
		class="group relative flex items-center gap-3.5 sm:gap-4 p-0 rounded-lg overflow-hidden ring ring-default bg-default hover:bg-elevated/50 transition-all duration-200 hover:ring-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
	>
		<!-- Video Thumbnail (no padding, flush with left/top/bottom) -->
		<div class="shrink-0 w-40 sm:w-52 aspect-video overflow-hidden bg-gray-900">
			<NuxtImg
				v-if="project.image"
				:src="project.image"
				:alt="project.title"
				width="240"
				height="135"
				class="size-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
			/>
			<div v-else class="size-full flex items-center justify-center text-muted">
				<UIcon name="i-lucide-image" class="size-6" />
			</div>
		</div>

		<!-- Content -->
		<div class="flex-1 min-w-0 py-3 pr-3.5 sm:py-3.5 sm:pr-4 flex flex-col justify-center gap-1">
			<div v-if="project.category" class="flex items-center gap-2">
				<UBadge
					:label="project.category"
					variant="subtle"
					color="neutral"
					size="xs"
					class="font-mono text-[10px]"
				/>
			</div>

			<ProseH4 class="truncate group-hover:text-primary transition-colors">
				{{ project.title || project.path.split('/').pop() }}
			</ProseH4>

			<p v-if="project.description" class="text-xs text-muted line-clamp-2 leading-relaxed">
				{{ project.description }}
			</p>
		</div>
	</NuxtLink>
</template>
