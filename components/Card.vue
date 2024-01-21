<template>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 md:mt-5">
		<ContentList :path="path" v-slot="{ list }">
			<UCard
				class="not-prose no-underline"
				v-for="article in list"
				:key="article._path"
				:to="article._path"
				:ui="{
					base: 'h-full',
					background: 'bg-transparent dark:bg-transparent md:bg-white dark:md:bg-gray-900',
					ring: 'ring-0 md:ring-1',
					shadow: 'shadow-none',
					body: {
						base: 'h-full flex flex-col justify-between',
						padding: 'px-0 py-4 sm:py-3 sm:px-3'
					},
				}"
			>
				<div class="flex-grow">
					<h3 class="mb-1 leading-tight">
					<UTooltip
						:prevent=!article.url
						:popper="{
							placement: 'auto',
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
					<p class="text-gray-700 dark:text-gray-400 text-sm mb-6">
						{{ article.description }}
					</p>
				</div>

				<section class="flex gap-2 items-end">

					<div v-if="article.tags" class="flex flex-grow gap-1 flex-wrap">
						<UBadge
							v-for="tag in article.tags"
							:key="tag"
							:label="tag"
							color="gray"
							variant="soft"
							size="xs"
							:ui="{ variant: { soft: 'dark:bg-gray-700' } }"
						/>
					</div>

					<div v-if="article._dir === 'proyecto'" class="flex p-1">
						<UTooltip :popper="{ placement: 'auto' }" :ui="{ base: 'p-0 h-auto' }">
							<UButton
								color="white"
								size="xs"
								icon="i-heroicons-eye"
								variant="soft"
								:padded=false
								:to="article._path"
							/>
							<template #text>
								<NuxtImg v-if="article.image" :src="article.image" :alt="article.title" class="w-full" />
								<p class="text-gray-700 dark:text-gray-400 text-xs p-2">Click para ver.</p>
							</template>
						</UTooltip>
					</div>

				</section>
			</UCard>
		</ContentList>
	</div>
</template>

<script lang="ts" setup>
// FIXME? 'props' is declared but its value is never read.
const props = defineProps({
	list: Object,
	path: String
})
</script>