<script setup>
const isOpen = ref(false)
const articleBody = ref()
</script>

<template>
	<ProseH1>Proyectos</ProseH1>

	<ContentList path="/projects" v-slot="{ list }">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
			<UCard
				v-for="article in list"
				:key="article._path"
				:ui="{
					body: { padding: 'px-2 py-2 sm:py-3 sm:px-3 h-full' },
				}"
			>
				<div class="flex flex-col justify-between h-full not-prose">
					<div>
						<h3 class="font-bold mb-1 leading-tight">
							<NuxtLink
								v-if="article.url"
								:to="article.url"
								target="_blank"
								class="flex items-center gap-1"
							>
								<span>{{ article.title }}</span>
								<UIcon name="i-heroicons-arrow-top-right-on-square" />
							</NuxtLink>
							<span v-else>{{ article.title }}</span>
						</h3>
						
						<p class="text-gray-700 dark:text-gray-400 text-xs mb-4">
							{{ article.description }}
						</p>
					</div>

					<div>
						<div v-if="article.tags" class="flex flex-wrap gap-2 mt-4">
							<UBadge
								v-for="tag in article.tags"
								:key="tag"
								:label="tag"
								color="white"
							/>
						</div>
							<UButton
								block
								color="white"
								size="xs"
								icon="i-heroicons-eye-20-solid"
								class="mt-4"
								@click="isOpen = true; articleBody = article._path"
							/>
					</div>
				</div>

			</UCard>
		</div>
	</ContentList>

	<UModal v-model="isOpen">
		<UCard>
			<ContentQuery :path="articleBody" find="one" v-slot="{ data }">
				<ProseH1>{{ data.title }}</ProseH1>
				<ProseH3>{{ data.description }}</ProseH3>
				<NuxtImg v-if="data.image" :src="data.image" :alt="data.title" class="w-full mb-4" />
				<ContentRenderer :value="data" class="prose prose-sm dark:prose-invert" />
			</ContentQuery>
		</UCard>
	</UModal>
</template>