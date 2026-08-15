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
		<!-- Video Thumbnail (flush with left/top/bottom) -->
		<div class="shrink-0 w-28 sm:w-36 md:w-1/3 aspect-video-card overflow-hidden bg-muted/10">
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
			<div class="flex items-center justify-between gap-2">
				<div class="flex items-center gap-1.5 flex-wrap">
					<UBadge
						v-if="project.category"
						:label="project.category"
						variant="subtle"
						color="neutral"
						size="xs"
						class="text-[10px]"
					/>
					<UBadge
						v-if="project.wip"
						variant="outline"
						:label="$t('currently_badge')"
						size="xs"
						color="primary"
						class="text-[10px]"
					/>
				</div>
				<span v-if="project.year" class="text-[11px] text-muted shrink-0 font-mono">
					{{ project.year }}
				</span>
			</div>

			<ProseH4 class="truncate group-hover:text-primary transition-colors">
				{{ project.title || project.path.split('/').pop() }}
			</ProseH4>

			<ProseP v-if="project.description" class="text-xs text-muted line-clamp-2 leading-relaxed mb-0">
				{{ project.description }}
			</ProseP>
		</div>
	</NuxtLink>
</template>
