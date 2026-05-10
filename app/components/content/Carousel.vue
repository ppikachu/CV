<template>
	<div class="not-prose my-8 mb-12 block w-full no-print">
		<UCarousel
			v-slot="{ item }"
			:items="props.images"
			dots
			arrows
			:prev="{ color: 'neutral', variant: 'outline', icon: 'i-heroicons-chevron-left-16-solid' }"
			:next="{ color: 'neutral', variant: 'outline', icon: 'i-heroicons-chevron-right-16-solid' }"
			:ui="{
				item: 'basis-full',
				viewport: 'rounded-lg overflow-hidden',
			}"
		>
			<NuxtImg :src="'/images/'+item" :alt="item" class="w-full h-auto block" />
		</UCarousel>
	</div>
	<slot />
</template>

<script lang="ts" setup>
const props = defineProps({
	images: Array<string>
})
</script>