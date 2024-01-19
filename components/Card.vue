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
					<h3 class="font-bold mb-1 leading-tight">
					<UTooltip
						:close-delay="100"
						:popper="{
							placement: 'top-start',
						}"
						:ui="{
							base: 'h-auto p-0',
						}"
					>
						<NuxtLink v-if="article.url" :to="article.url" target="_blank" class="flex items-center gap-1">
							<span>{{ article.title }}</span>
							<UIcon name="i-heroicons-arrow-top-right-on-square" />
						</NuxtLink>
						<span v-else>{{ article.title }}</span>
						<template #text>
							<NuxtImg :src="article.image" :alt="article.title" class="w-full" />
						</template>
					</UTooltip>
					</h3>
					<p class="text-gray-700 dark:text-gray-400 text-xs mb-4">
						{{ article.description }}
					</p>
				</div>

				<section class="flex gap-2 items-end">
					<div v-if="article.tags" class="flex-grow gap-1">
						<div class="gap-1 flex flex-wrap">
							<UBadge
								v-for="tag in article.tags"
								:key="tag"
								:label="tag"
								color="gray"
								variant="soft"
								size="xs"
								:ui="{
									variant: {
										soft: 'dark:bg-gray-700',
									}
								}"
							/>
						</div>
					</div>
					<UButton
						v-if="article._dir === 'proyecto'"
						color="white"
						size="xs"
						icon="i-heroicons-eye-20-solid"
						:to="article._path"
					/>
				</section>
			</UCard>
		</ContentList>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	list: Object,
	path: String
})
</script>