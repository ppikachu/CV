<script setup lang="ts">
import { Motion } from 'motion-v'

export interface Project {
	title?: string
	description?: string
	path: string
	image?: string
	video?: string
	tags?: string[]
	tipo?: string
	category?: string
	role?: string | string[]
	client?: string
	year?: string
	wip?: boolean
	url?: string
	group?: boolean
	isGroup?: boolean
}

const props = withDefaults(defineProps<{
	project: Project
	featured?: boolean
	group?: boolean
	video?: string
}>(), {
	featured: false,
	group: undefined,
	video: undefined
})

const isGroup = computed(() => {
	if (typeof props.group === 'boolean') {
		return props.group
	}
	return Boolean(props.project.group || props.project.isGroup)
})

const videoSrc = computed(() => props.video || props.project?.video)

const isHovered = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)

watch(isHovered, (hovering) => {
	if (!videoSrc.value || !videoRef.value) return
	if (hovering) {
		videoRef.value.currentTime = 0
		videoRef.value.play().catch(() => {})
	} else {
		videoRef.value.pause()
	}
})
</script>

<template>
	<Motion
		:initial="{ opacity: 0, y: 24 }"
		:while-in-view="{ opacity: 1, y: 0 }"
		:in-view-options="{ once: true, amount: 0.5, margin: '0px 0px -40px 0px' }"
		:transition="{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }"
		class="relative h-full flex flex-col"
		@mouseenter="isHovered = true"
		@mouseleave="isHovered = false"
	>
		<!-- Floating Type Badge on Top Left (only for project collections) -->
		<UBadge
			v-if="isGroup"
			:label="$t('project_group')"
			icon="i-pixelarticons-grid"
			variant="solid"
			class="absolute top-3 left-3 z-20 backdrop-blur"
		/>

		<UBlogPost
			:title="project.title || project.path.split('/').pop()"
			:description="project.description"
			:to="project.path"
			:image="project.image || videoSrc"
			:badge="{
				label: project.category,
				variant: 'soft'
			}"
		>
			<template v-if="project.image || videoSrc" #header="{ ui }">
				<div class="relative w-full h-full overflow-hidden">
					<NuxtImg
						v-if="project.image"
						:src="project.image"
						:alt="project.title || 'Project thumbnail'"
						:class="ui?.image ? ui.image({ to: false, class: 'object-center' }) : 'object-cover object-center w-full h-full'"
					/>
					<video
						v-if="videoSrc"
						ref="videoRef"
						:src="videoSrc"
						muted
						loop
						playsinline
						preload="metadata"
						:class="[
							'object-cover object-center absolute inset-0 pointer-events-none transition-opacity duration-300',
							isHovered ? 'opacity-100' : 'opacity-0'
						]"
					/>
				</div>
			</template>

			<!-- Actions -->
			<template #footer>
				<UButton
					:to="project.path"
					:label="isGroup ? $t('ver_proyectos') : $t('ver_proyecto')"
					icon="i-pixelarticons-arrow-right"
					trailing
					:variant="featured ? 'solid' : 'outline'"
				/>

				<UButton
					v-if="project.url"
					:to="project.url"
					target="_blank"
					:label="$t('see_live')"
					icon="i-pixelarticons-external-link"
					trailing
					variant="outline"
					@click.stop
				/>
			</template>
		</UBlogPost>
	</Motion>
</template>
