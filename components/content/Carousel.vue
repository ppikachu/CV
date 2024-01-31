<template>
	<section class="not-prose my-8 mx-auto">
		<UCarousel
			v-slot="{ item }"
			:items="props.images"
			indicators
			arrows
			:prev-button="{
				color: 'gray',
				// variant: 'outline',
				icon: 'i-heroicons-chevron-left-16-solid',
			}"
			:next-button="{
				color: 'gray',
				// variant: 'outline',
				icon: 'i-heroicons-chevron-right-16-solid',
			}"
			:ui="{
				item: 'basis-full',
				indicators: {
					inactive: 'dark:bg-opacity-30 mix-blend-normal',
				}
			}"
			class="rounded-lg overflow-hidden"
		>
			<NuxtImg :src="'/images/'+item" :alt="item" class="w-full h-auto" />
		</UCarousel>
	</section>
</template>

<script lang="ts" setup>
const props = defineProps({
	images: Array<string>
})
</script>