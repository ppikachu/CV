<template>
	<section class="not-prose my-8 mx-auto">
		<Swiper
			:modules="[SwiperPagination, SwiperNavigation]"
			:auto-height=true
			:pagination="{
				clickable: true,
			}"
			:navigation=true
			:loop=true
		>
			<SwiperSlide v-for="slide, key in images" :key="key">
				<NuxtImg :src="slide" :alt="slide" class="w-full" />
			</SwiperSlide>
		</Swiper>
	</section>
</template>

<script lang="ts" setup>
const props = defineProps({
	images: Object
})
</script>