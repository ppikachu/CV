<script setup lang="ts">
// @ts-expect-error - vue-md-player lacks type declarations
import { VideoPlayer } from 'vue-md-player'
import 'vue-md-player/dist/style.css'

withDefaults(defineProps<{
	src?: string
	poster?: string
}>(), {
	src: undefined,
	poster: '/video/video_placeholder.png'
})
</script>

<template>
	<section v-if="src" class="not-prose mt-8">
		<VideoPlayer
			:src="src"
			:poster="poster"
			:width="640"
			:height="360"
			playsinline
			class="aspect-video rounded-t-lg"
		/>
	</section>
</template>