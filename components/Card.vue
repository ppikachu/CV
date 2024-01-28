<template>
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-4 mt-2 md:mt-5">
		<ContentList path="/proyecto" :where="{current:props.current}" :only="['title','description','image','tags','_path','url']" v-slot="{ list }">
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
				<div class="flex-grow">
					<h3 class="mb-1 leading-tight">
					<UTooltip
						:prevent=!article.url
						:popper="{
							placement: 'top',
							// offsetDistance: 10,
						}"
					>
						<template #text>
							Online. Click para ver.
						</template>
						<NuxtLink v-if="article.url" :to="article.url" target="_blank" class="flex items-center gap-1">
							<span>{{ article.title }}</span>
							<UIcon name="i-heroicons-arrow-top-right-on-square" />
						</NuxtLink>
						<span v-else>{{ article.title }}</span>
					</UTooltip>
					</h3>
					<p class="text-gray-700 dark:text-gray-400 text-sm mb-2 md:mb-4">
						{{ article.description }}
					</p>
				</div>

				<ProjectSkills :skills="article.tags" />

				<div class="mt-4">
					<UTooltip
						:popper="{ placement: 'bottom' }"
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
							<p class="text-gray-700 dark:text-gray-400 text-xs p-2">Click para ver.</p>
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