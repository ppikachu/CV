<template>
	<div class="not-prose my-8 mb-18 block w-full no-print">
		<ClientOnly>
			<UCarousel
				v-slot="{ item }"
				:items="props.images"
				dots
				arrows
				:ui="{
					viewport: 'rounded-lg overflow-hidden',
				}"
			>
				<NuxtImg
					:src="getImageSrc(item)"
					:alt="cleanAlt(item)"
					class="w-full h-auto block"
					loading="lazy"
				/>
			</UCarousel>
		</ClientOnly>
	</div>
	<slot />
</template>

<script lang="ts" setup>
const props = defineProps({
	images: Array<string>
})

function getImageSrc(item: string) {
	if (!item) return ''
	if (item.startsWith('http://') || item.startsWith('https://') || item.startsWith('/')) {
		return item
	}
	return '/images/' + item
}

function cleanAlt(filename: string) {
	if (!filename) return 'Project slide image'
	return filename
		.replace(/^.*\//, '')
		.replace(/\.\w+$/, '')
		.replace(/-\d+x\d+$/, '')
		.replace(/[-_]/g, ' ')
		.trim()
}
</script>