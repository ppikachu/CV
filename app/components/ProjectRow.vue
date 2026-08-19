<script setup lang="ts">
import type { Project } from '~/components/ProjectCard.vue'

const props = withDefaults(defineProps<{
	project: Project
	group?: boolean
	video?: string
}>(), {
	group: undefined,
	video: undefined
})

const { t } = useI18n()

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

const badge = computed(() => {
	if (isGroup.value) {
		return {
			label: t('project_group'),
			icon: 'i-ph-squares-four',
			variant: 'outline' as const
		}
	}
	if (!props.project.category) return undefined
	return {
		label: props.project.category,
		variant: 'outline' as const,
		class: 'hidden md:inline-flex',
		ui: { label: 'text-wrap' }
	}
})
</script>

<template>
	<div
		class="relative h-full flex flex-col"
		@mouseenter="isHovered = true"
		@mouseleave="isHovered = false"
	>
		<UBlogPost
			:title="project.title || project.path.split('/').pop()"
			:description="project.description"
			:to="project.path"
			:image="project.image || videoSrc"
			:badge="badge"
			:ui="{
				meta: !isGroup ? 'hidden md:flex' : undefined
			}"
			orientation="horizontal"
			class="h-full flex-1"
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
							'object-cover object-center w-full h-full absolute inset-0 pointer-events-none transition-opacity duration-300',
							isHovered ? 'opacity-100' : 'opacity-0'
						]"
					/>
				</div>
			</template>
		</UBlogPost>
	</div>
</template>

