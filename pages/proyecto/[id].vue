<template>
	<UCard>
		<ContentQuery :path="$route.path" find="one" v-slot="{ data }">
			<ProseH1>{{ data.title }}</ProseH1>
			<ProseH3>{{ data.description }}</ProseH3>

			<section class="not-prose">
				<div v-if="data.gallery">
					<carousel>
						<slide v-for="slide in data.gallery" :key="slide">
							<NuxtImg :src="slide.url" :alt="slide.alt" class="w-full" />
						</slide>
						<template #addons>
							<navigation />
							<pagination />
						</template>
					</carousel>
				</div>
				
				<div v-else-if="data.image">
					<NuxtImg :src="data.image" :alt="data.title" class="w-full mb-4" />
				</div>
			</section>

			<ContentRenderer :value="data" class="prose prose-sm dark:prose-invert" />
		</ContentQuery>

		<div class="flex justify-center not-prose mt-8">
			<UButton
				icon="i-heroicons-arrow-left-20-solid"
				color="white"
				label="Regresar"
				@click="$router.back()"
				block
			/>
		</div>
	</UCard>
</template>