<template>
	<div class="mx-auto prose dark:prose-invert">
		<ContentQuery :path="$route.path" find="one" v-slot="{ data }">
			<div class="prose-lg mb-8">
				<ProseH1 class="mb-1 mt-8">{{ data.title }}</ProseH1>
				<ProseH2>{{ data.description }}</ProseH2>
			</div>
			<NuxtPicture v-if="data.image" :src="data.image" class="w-full rounded-md mt-4" />
			<ContentRenderer :value="data" />
			<ProjectSkills v-if="data.tags && data.current" :skills="data.tags" />
			<div class="flex justify-center not-prose mt-8">
				<UButton
				icon="i-heroicons-arrow-left-20-solid"
				label="Regresar"
				variant="soft"
				@click="nuxtApp.$router.options.history.state.back ? nuxtApp.$router.back() : nuxtApp.$router.push('/')"
				block
				/>
			</div>
		</ContentQuery>
	</div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()
const route = useRoute()
</script>