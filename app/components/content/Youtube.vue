<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
	defineProps<{
		id?: string
		url?: string
		list?: string
		title?: string
		autoplay?: boolean
		loop?: boolean
		muted?: boolean
		controls?: boolean
		nocookie?: boolean
		start?: number
	}>(),
	{
		id: undefined,
		url: undefined,
		list: undefined,
		title: 'YouTube video player',
		autoplay: false,
		loop: false,
		muted: false,
		controls: true,
		nocookie: true,
		start: undefined
	}
)

const embedSrc = computed(() => {
	const domain = props.nocookie ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com'
	const raw = props.url || props.id || ''

	if (!raw && !props.list) return ''

	// Check for playlist parameter in URL or prop
	let playlistId = props.list
	if (!playlistId && props.url) {
		const listMatch = props.url.match(/[?&]list=([^&#]+)/)
		if (listMatch && listMatch[1]) {
			playlistId = listMatch[1]
		}
	}

	// Extract standard video ID (11 chars) if available
	let videoId = props.id || ''
	if (!videoId && props.url) {
		const idMatch = props.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)
		if (idMatch && idMatch[1]) {
			videoId = idMatch[1]
		}
	}

	const params = new URLSearchParams()
	if (props.autoplay) params.set('autoplay', '1')
	if (props.muted) params.set('mute', '1')
	if (!props.controls) params.set('controls', '0')
	if (props.start) params.set('start', props.start.toString())
	if (props.loop && videoId) {
		params.set('loop', '1')
		params.set('playlist', videoId)
	}

	if (playlistId && !videoId) {
		params.set('listType', 'playlist')
		params.set('list', playlistId)
		const queryString = params.toString()
		return `${domain}/embed/videoseries${queryString ? `?${queryString}` : ''}`
	}

	if (videoId) {
		if (playlistId) params.set('list', playlistId)
		const queryString = params.toString()
		return `${domain}/embed/${videoId}${queryString ? `?${queryString}` : ''}`
	}

	return ''
})
</script>

<template>
	<section
		v-if="embedSrc"
		class="not-prose my-8 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl"
	>
		<iframe
			:src="embedSrc"
			:title="title"
			class="w-full aspect-video border-0 bg-black"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			loading="lazy"
			allowfullscreen
		/>
	</section>
</template>
