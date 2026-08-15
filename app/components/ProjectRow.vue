<script setup lang="ts">
import type { Project } from '~/components/ProjectCard.vue'

defineProps<{
	project: Project
}>()
</script>

<template>
	<NuxtLink
		:to="project.path"
		:aria-label="project.title || 'Project details'"
		class="group relative flex items-center gap-3.5 sm:gap-4 p-0 rounded-lg overflow-hidden ring ring-default bg-default transition-all duration-200 hover:ring-primary/50"
	>
		<!-- Video Thumbnail (no padding, flush with left/top/bottom) -->
		<div class="shrink-0 w-28 sm:w-36 md:w-1/3 aspect-video-card overflow-hidden">
			<NuxtImg
				v-if="project.image"
				:src="project.image"
				:alt="project.title || ''"
				width="400"
				class="size-full object-contain object-center"
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
					class="text-[10px]"
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
