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
				<NuxtImg :src="'/images/'+item" :alt="item" class="w-full h-auto block" />
			</UCarousel>
		</ClientOnly>
	</div>
	<slot />
</template>

<script lang="ts" setup>
const props = defineProps({
	images: Array<string>
})
</script>