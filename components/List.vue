<template>
	<div class="flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-8">
		<ContentList :path="shortLocale()+'/proyecto'" :where="{ tipo:props.tipo }" v-slot="{ list }">
			<UCard
				class="not-prose"
				v-for="article in list"
				:key="article._path"
				:ui="{
					base: 'flex',
					rounded: 'rounded-none md:rounded-lg',
					background: 'bg-transparent dark:bg-transparent',
					divide: 'divide-0 divide-y-0',
					ring: 'ring-0 md:ring-1 dark:ring-gray-900',
					shadow: 'shadow-none',
					body: {
						base: 'w-full flex flex-col justify-center md:justify-start',
						padding: 'pl-0 pr-3 py-0 md:py-3 md:px-3'
					},
					footer: {
						padding: 'px-0 py-0 sm:p-0 sm:px-0 flex-shrink-0'
					}
				}"
			>
				<h2 class="mb-1 leading-tight font-bold">
					<NuxtLink v-if="article.url" :to="article.url" target="_blank">
						<UTooltip
							class="w-full"
							:popper="{
								placement: 'top',
								text: 'Online. Click para ver.'
								// offsetDistance: 10,
							}"
						>
						<template #text>
							Online. Click para ver.
						</template>
							<div class="flex justify-between gap-1 w-full">
								<span class="text-primary space-x-1"><span>{{ article.title }}</span><UIcon name="i-heroicons-arrow-top-right-on-square" class="-mb-0.5" /></span>
								<UBadge v-if="article.wip" size="xs" variant="outline" label="WIP" />
							</div>
						</UTooltip>
					</NuxtLink>
					<span v-else>{{ article.title }}</span>
				</h2>
				<p class="text-gray-700 dark:text-gray-400 md:text-sm leading-snug">{{ article.description }}</p>
				<template #footer v-if="article.image">
					<NuxtLink :to="article._path" class="flex items-center 0w-36 0sm:w-40 h-full border border-transparent hover:border-primary overflow-hidden rounded-r-lg transition-colors duration-400">
						<NuxtImg
							v-if="article.image"
							:src="article.image"
							:alt="article.title"
							class="aspect-square object-cover object-center w-28 h-full"
						/>
						<UIcon name="i-heroicons-chevron-right-16-solid" class="p-4"/>
					</NuxtLink>
				</template>
			</UCard>
		</ContentList>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	tipo: {
		type: String
	}
})
</script>