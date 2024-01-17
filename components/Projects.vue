
import type { baseURL } from 'nuxt/dist/core/runtime/nitro/paths';
<template>
	<ProseH1>Proyectos</ProseH1>

	<ContentList path="/projects" v-slot="{ list }">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
			<UCard
				class="not-prose no-underline"
				v-for="article in list"
				:key="article._path"
				:to="article._path"
				:ui="{
					base: 'h-full',
					body: {
						base: 'h-full flex flex-col justify-between',
						padding: 'px-2 py-2 sm:py-3 sm:px-3'
					},
				}"
			>
				<div>
						<h3 class="font-bold mb-1 leading-tight">
							<NuxtLink v-if="article.url" :to="article.url" target="_blank" class="flex items-center gap-1">
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
						<UBadge v-for="tag in article.tags" :key="tag" :label="tag" color="white" />
						<UButton
							color="white"
							icon="i-heroicons-eye-20-solid"
							:to="article._path"
						/>
					</div>
				</div>
			</UCard>
		</div>
	</ContentList>
</template>