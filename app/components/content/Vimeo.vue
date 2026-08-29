<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
	defineProps<{
		id?: string | number
		url?: string
		title?: string
		autoplay?: boolean
		loop?: boolean
		muted?: boolean
		dnt?: boolean
		responsive?: boolean
	}>(),
	{
		id: undefined,
		url: undefined,
		title: 'Vimeo video player',
		autoplay: false,
		loop: false,
		muted: false,
		dnt: true,
		responsive: true
	}
)

const embedSrc = computed(() => {
	const raw = props.url || (props.id ? props.id.toString() : '')
	if (!raw) return ''

	// Check if it is a showcase / album embed
	const showcaseMatch = raw.match(/vimeo\.com\/showcase\/(\d+)/)
	if (showcaseMatch && showcaseMatch[1]) {
		return `https://vimeo.com/showcase/${showcaseMatch[1]}/embed`
	}

	// Extract standard video ID and optional unlisted privacy hash
	let videoId = ''
	let hash = ''

	if (/^\d+$/.test(raw)) {
		videoId = raw
	} else {
		const videoMatch = raw.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([a-zA-Z0-9]+))?/)
		if (videoMatch && videoMatch[1]) {
			videoId = videoMatch[1]
			if (videoMatch[2]) hash = videoMatch[2]
		}
	}

	if (!videoId) return ''

	const params = new URLSearchParams()
	if (props.dnt) params.set('dnt', '1')
	if (props.autoplay) params.set('autoplay', '1')
	if (props.loop) params.set('loop', '1')
	if (props.muted) params.set('muted', '1')
	if (hash) params.set('h', hash)

	const queryString = params.toString()
	return `https://player.vimeo.com/video/${videoId}${queryString ? `?${queryString}` : ''}`
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
			allow="autoplay; fullscreen; picture-in-picture"
			loading="lazy"
			allowfullscreen
		/>
	</section>
</template>
