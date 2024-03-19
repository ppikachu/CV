<template>
	<div class="mx-auto prose dark:prose-invert">
		<ContentQuery :path="$route.path" find="one" v-slot="{ data }">
			<div class="prose-lg prose-a:no-underline my-8 slide-enter-content">
				<div v-if="data.url" class="flex justify-between items-center gap-1 w-full">
					<NuxtLink :to="data.url" target="_blank" class="mb-1 flex items-center gap-1">
						<ProseH1 class="mb-0">{{ data.title }}</ProseH1>
						<UIcon name="i-heroicons-arrow-top-right-on-square" class="w-7 h-7 text-primary" />
					</NuxtLink>
					<UBadge v-if="data.wip" size="xs" variant="outline" label="Work in progress" class="h-fit" />
				</div>
				<div v-else class="flex justify-between items-center gap-1 w-full">
					<ProseH1 class="mb-1">{{ data.title }}</ProseH1>
					<UBadge v-if="data.wip" size="xs" variant="outline" label="Work in progress" class="h-fit" />
				</div>
				<ProseH2>{{ data.description }}</ProseH2>
				<ProjectSkills v-if="data.tags" :skills="data.tags" />
			</div>
			<ContentRenderer :value="data" class="slide-enter-content" />
			<div class="flex justify-center not-prose my-8">
				<UButton
					size="lg"
					icon="i-heroicons-arrow-left-20-solid"
					:label="$t('regresar')"
					variant="solid"
					color="gray"
					@click="nuxtApp.$router.options.history.state.back ? nuxtApp.$router.back() : nuxtApp.$router.push('/')"
					block
					:ui="{
						color: {
							gray: {
								solid: 'dark:bg-gray-950'
							},
						}
					}"
				/>
			</div>
		</ContentQuery>
	</div>
</template>

<script setup>
const nuxtApp = useNuxtApp()
</script>