<template>
	<UCard>
		<ContentQuery :path="$route.path" find="one" v-slot="{ data }">
			<ProseH1 class="mb-0">{{ data.title }}</ProseH1>
			<ProseH2 class="mt-0">{{ data.description }}</ProseH2>

			<section class="not-prose">
				<div v-if="data.gallery" class="my-8">
					<Swiper
						:modules="[SwiperPagination, SwiperNavigation]"
						:auto-height=true
						:pagination="{
							clickable: true,
						}"
						:navigation=true
						:loop=true
					>
						<SwiperSlide v-for="slide in data.gallery" :key="slide">
							<NuxtImg :src="slide.url" :alt="slide.alt" class="w-full" />
						</SwiperSlide>
					</Swiper>
				</div>
				
				<div v-else-if="data.image">
					<NuxtImg :src="data.image" :alt="data.title" class="w-full mb-4" />
				</div>
			</section>

			<ContentRenderer :value="data" class="prose dark:prose-invert mx-auto" />
		</ContentQuery>

		<DevOnly>
			<div class="prose dark:prose-invert prose-sm mx-auto my-4">
				<pre>{{ nuxtApp.$router.options.history.state }}</pre>
			</div>
		</DevOnly>

		<div class="flex justify-center not-prose mt-8">
			<UButton
				icon="i-heroicons-arrow-left-20-solid"
				color="white"
				label="Regresar"
				@click="nuxtApp.$router.options.history.state.back ? nuxtApp.$router.back() : nuxtApp.$router.push('/')"
				block
			/>
		</div>
	</UCard>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()
</script>