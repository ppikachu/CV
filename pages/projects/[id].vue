<template>
	<UCard>
		<ContentQuery :path="$route.path" find="one" v-slot="{ data }">
			<ProseH1>{{ data.title }}</ProseH1>
			<ProseH3>{{ data.description }}</ProseH3>
			<NuxtImg v-if="data.image" :src="data.image" :alt="data.title" class="w-full mb-4" />
			<ContentRenderer :value="data" class="prose prose-sm dark:prose-invert" />
		</ContentQuery>
		<div class="flex justify-center not-prose mt-8">
			<UButton
				icon="i-heroicons-arrow-left-20-solid"
				color="white"
				label="Regresar"
				to="/"
				block
			/>
		</div>
	</UCard>
</template>