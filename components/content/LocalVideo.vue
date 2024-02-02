<script setup lang="ts">
/* Define props */
const props = defineProps({
	src: {
		type: String,
	},
	poster: {
		type: String,
		default: '/icon.png'
	}
})
</script>

<template>
	<!--videos component-->
	<section v-if="props.src">
		<aside class="my-8">
			<video controls playsinline :data-poster="props.poster" class="my-0" >
				<source :src="props.src" type="video/mp4" />
			</video>
			<div class="video-footer text-sm -mt-2">
				<slot />
			</div>
		</aside>
	</section>
</template>