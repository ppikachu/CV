<template>
	<section class="not-prose my-8 mx-auto no-print">
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
					active: 'bg-gray-200 dark:bg-gray-200',
					inactive: 'bg-opacity-30 dark:bg-opacity-30 mix-blend-normal',
				}
			}"
			class="rounded-lg overflow-hidden"
		>
			<ProseImg :src="'/images/'+item" :alt="item" :show-alt="false" />
		</UCarousel>
	</section>
</template>

<script lang="ts" setup>
const props = defineProps({
	images: Array<string>
})
</script>