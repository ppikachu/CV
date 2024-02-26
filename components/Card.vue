<template>
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-4">
		<ContentList path="/proyecto" :where="{current:props.current}" v-slot="{ list }">
			<UCard
				class="not-prose"
				v-for="article in list"
				:key="article._path"
				:to="article._path"
				:ui="{
					background: 'bg-transparent dark:bg-transparent sm:bg-white dark:sm:bg-gray-900',
					ring: 'ring-0 sm:ring-1',
					shadow: 'shadow-none',
					body: {
						base: 'h-full flex flex-col justify-between',
						padding: 'px-0 py-3 sm:p-3 sm:px-3 md:py-3 md:px-3'
					},
				}"
			>
				<h3 class="mb-1 leading-tight">
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
								<UBadge v-if="article.wip" size="xs" color="white" label="WIP" :ui="{ color: { white: { solid: 'text-gray-400 dark:text-gray-500'} } }" />
							</div>
						</UTooltip>
						</NuxtLink>
						<span v-else>{{ article.title }}</span>
				</h3>
				<p class="text-gray-700 dark:text-gray-400 text-sm mb-2 md:mb-4">
					{{ article.description }}
				</p>

				<ProjectSkills :skills="article.tags" />

				<div class="mt-4 sm:mt-3">
					<UTooltip
						:popper="{ placement: 'top-start' }"
						:ui="{ base: 'p-0 h-auto' }"
					>
						<UButton
							size="xs"
							label="Ver proyecto"
							variant="solid"
							color="white"
							:to="article._path"
						>
							<template #trailing>
								<UIcon name="i-heroicons-arrow-right-20-solid" />
							</template>
						</UButton>
						<template #text>
							<NuxtImg v-if="article.image" :src="article.image" :alt="article.title" class="w-full" />
						</template>
					</UTooltip>
				</div>

			</UCard>
		</ContentList>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	current: {
		type: Boolean
	}
})
</script>