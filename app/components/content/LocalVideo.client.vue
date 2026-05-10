<script setup lang="ts">
//@ts-ignore
import { VideoPlayer } from 'vue-md-player'
import 'vue-md-player/dist/style.css'
/* Define props */
const props = defineProps({
	src: {
		type: String,
	},
	poster: {
		type: String,
		default: '/video/video_placeholder.png'
	}
})
</script>

<template>
	<!--videos component-->
	<section v-if="props.src" class="not-prose mt-8">
		<VideoPlayer :src="props.src" :poster="props.poster" :width="640" :height="360" playsinline class="aspect-video rounded-t-lg" />
	</section>
</template>