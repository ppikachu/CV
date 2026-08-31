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
	aspect?: string | number
	aspectRatio?: string | number
}>(), {
	src: undefined,
	webm: undefined,
	mp4: undefined,
	poster: '/videos/video_placeholder.png',
	controls: true,
	autoplay: false,
	loop: false,
	muted: false,
	playsinline: true,
	aspect: undefined,
	aspectRatio: undefined
})

const hasMedia = computed(() => Boolean(props.src || props.webm || props.mp4))

const computedAspectRatio = computed(() => {
	const val = props.aspect ?? props.aspectRatio
	if (!val) return '16 / 9'
	const str = String(val).trim()
	if (str.includes(':')) {
		return str.replace(':', ' / ')
	}
	if (str.includes('/')) {
		return str.replace('/', ' / ')
	}
	return str
})
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
			:style="{ aspectRatio: computedAspectRatio }"
			class="w-full rounded-xl object-contain bg-black"
		>
			<source v-if="webm" :src="webm" type="video/webm">
			<source v-if="mp4" :src="mp4" type="video/mp4">
			<source v-if="src && !webm && !mp4" :src="src" :type="src.endsWith('.webm') ? 'video/webm' : 'video/mp4'">
		</video>
	</section>
</template>
