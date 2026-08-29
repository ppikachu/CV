<script setup lang="ts">
const props = withDefaults(defineProps<{
	src?: string
	webm?: string
	mp4?: string
	poster?: string
	controls?: boolean
	autoplay?: boolean
	loop?: boolean
	muted?: boolean
	playsinline?: boolean
}>(), {
	src: undefined,
	webm: undefined,
	mp4: undefined,
	poster: '/video/video_placeholder.png',
	controls: true,
	autoplay: false,
	loop: false,
	muted: false,
	playsinline: true
})

const hasMedia = computed(() => Boolean(props.src || props.webm || props.mp4))
</script>

<template>
	<section v-if="hasMedia" class="not-prose my-8 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl">
		<video
			:poster="poster"
			:controls="controls"
			:autoplay="autoplay"
			:loop="loop"
			:muted="muted"
			:playsinline="playsinline"
			preload="metadata"
			class="w-full aspect-video rounded-xl object-contain bg-black"
		>
			<source v-if="webm" :src="webm" type="video/webm">
			<source v-if="mp4" :src="mp4" type="video/mp4">
			<source v-if="src && !webm && !mp4" :src="src" :type="src.endsWith('.webm') ? 'video/webm' : 'video/mp4'">
		</video>
	</section>
</template>
