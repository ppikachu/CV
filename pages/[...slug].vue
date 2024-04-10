<template>
	<div class="mx-auto prose dark:prose-invert">
		<ContentQuery :path="$route.path" find="one" v-slot="{ data }">
			<div class="prose-lg prose-a:no-underline my-8 slide-enter-content">
				<div v-if="data.url" class="flex justify-between items-center gap-1 w-full">
					<NuxtLink :to="data.url" target="_blank" class="mb-1 flex items-center gap-1">
						<ProseH1 class="mb-0">{{ data.title }}</ProseH1>
						<UIcon name="i-heroicons-arrow-top-right-on-square-16-solid" class="w-7 h-7 text-primary" />
					</NuxtLink>
					<UBadge v-if="data.wip" size="xs" variant="outline" label="Work in progress" class="h-fit" />
				</div>
				<div v-else class="flex justify-between items-center gap-1 w-full">
					<ProseH1 class="mb-0">{{ data.title }}</ProseH1>
					<UBadge v-if="data.wip" size="xs" variant="outline" label="Work in progress" class="h-fit" />
				</div>
				<ProseH2>{{ data.description }}</ProseH2>
				<ProjectSkills v-if="data.tags" :skills="data.tags" />
			</div>
			<ContentRenderer :value="data" class="slide-enter-content" />

			<UButton
				v-if="data.url"
				:to="data.url"
				:label="$t('web_url')"
				target="_blank"
				icon="i-heroicons-arrow-top-right-on-square-16-solid"
				size="lg"
				block
				class="not-prose my-8"
			/>
		</ContentQuery>

		<UButton
			size="lg"
			icon="i-heroicons-arrow-left-20-solid"
			:label="$t('regresar')"
			variant="solid"
			color="gray"
			@click="nuxtApp.$router.options.history.state.back ? nuxtApp.$router.back() : nuxtApp.$router.push('/')"
			block
			class="flex justify-center not-prose my-8"
			:ui="{
				color: {
					gray: {
						solid: 'bg-transparent hover:ring-primary hover:bg-transparent dark:hover:text-primary dark:bg-transparent dark:hover:ring-primary dark:hover:bg-transparent transition-all duration-400',
					},
				}
			}"
		/>
	</div>
</template>

<script setup>
const nuxtApp = useNuxtApp()
</script>