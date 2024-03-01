<template>
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-4">
		<ContentList path="/proyecto" :where="{current:props.current}" v-slot="{ list }">
			<UCard
				class="not-prose"
				v-for="article in list"
				:key="article._path"
				:ui="{
					background: 'bg-transparent dark:bg-transparent sm:bg-white dark:sm:bg-gray-900',
					ring: 'ring-0 sm:ring-1',
					shadow: 'shadow-none',
					body: {
						base: 'h-full',
						padding: 'px-0 py-3 sm:p-3 sm:px-3 md:py-3 md:px-3'
					},
				}"
			>
				<div class="h-full flex flex-col justify-between">
					<div>
						<h2 class="mb-2 leading-tight">
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
						</h2>
						<p class="text-gray-700 dark:text-gray-400 mb-4 leading-snug">
							{{ article.description }}
						</p>
						<ProjectSkills :skills="article.tags" />
					</div>
					<UButton
						size="xs"
						label="Ver proyecto"
						variant="solid"
						color="white"
						class="mt-5"
						block
						:to="article._path"
					>
						<template #trailing>
							<UIcon name="i-heroicons-arrow-right-20-solid" />
						</template>
					</UButton>
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