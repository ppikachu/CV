<script setup lang="ts">
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'

/* Define props */
const props = defineProps<{ video: [] }>()
</script>

<template>
	<!--Videos component-->
	<section v-if="props.video.length > 0" class="space-y-12 md:space-y-24 w-full my-8">
		<LiteYouTubeEmbed
			v-for="(video, i) in props.video"
			:key="i"
			:id="video"
			title="Video"
		/>
	</section>
</template>