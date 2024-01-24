<template>
	<NuxtImg
		:src="refinedSrc"
		:alt="alt"
		class="mb-0 w-full rounded-md"
		:width="width"
		:height="height"
	/>
	<p class="mt-2 mb-12 text-sm text-center text-gray-700 dark:text-gray-400">{{ alt }}</p>
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
</script>
