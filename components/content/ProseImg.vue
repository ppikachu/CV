<template>
	<NuxtImg
		:src="refinedSrc"
		:alt="alt"
		class="mb-0 w-full h-auto rounded-md"
		:width="dimensionedSrc.width"
		:height="dimensionedSrc.height"
		placeholder
	/>
	<p v-if="alt!=='' && showAlt" class="mt-2 mb-4 text-sm text-center text-gray-700 dark:text-gray-400">{{ alt }}</p>
</template>

<script setup lang="ts">
import { withBase } from 'ufo'

const props = defineProps({
	src: {
		type: String,
		default: ''
	},
	alt: {
		type: String,
		default: ''
	},
	showAlt: {
		type: Boolean,
		default: true
	},
	width: {
		type: [String, Number],
		default: undefined
	},
	height: {
		type: [String, Number],
		default: undefined
	},
	class: {
		type: String,
		default: ''
	}
})

const refinedSrc = computed(() => {
	if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
		return withBase(props.src, useRuntimeConfig().app.baseURL)
	}
	return props.src
})

const dimensionedSrc = computed(() => {
	// Extracting dimensions from the filename
	var filename = props.src.split('/').pop()
	var dimensions = filename?.match(/(\d+)x(\d+)/)
	if (dimensions) {
		return { width: dimensions[1], height: dimensions[2] }
	} else {
		return { width: props.width, height: props.height }
	}
})
</script>
