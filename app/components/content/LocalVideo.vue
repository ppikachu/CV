<script setup lang="ts">
withDefaults(defineProps<{
	src?: string
	poster?: string
}>(), {
	src: undefined,
	poster: '/video/video_placeholder.png'
})
</script>

<template>
	<section v-if="src" class="not-prose my-8 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950">
		<video
			:src="src"
			:poster="poster"
			controls
			playsinline
			preload="metadata"
			class="w-full aspect-video rounded-lg object-contain bg-black"
		/>
	</section>
</template>
