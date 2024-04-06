<template>
	<div class="flex flex-col md:grid md:grid-cols-2 md:gap-8 divide-dotted divide-y-2 divide-primary-950 md:divide-none">
		<ContentList :path="shortLocale()+'/proyecto'" :where="{current:props.current}" v-slot="{ list }">
			<UCard
				class="not-prose"
				v-for="article in list"
				:key="article._path"
				:ui="{
					base: 'flex py-10 md:py-0 overflow-hidden',
					rounded: 'rounded-none md:rounded-lg',
					background: 'bg-transparent dark:bg-transparent',
					divide: 'divide-0 divide-y-0',
					ring: 'ring-0 md:ring-1 dark:ring-gray-900',
					shadow: 'shadow-none',
					body: {
						base: 'w-full flex flex-col justify-between',
						padding: 'pl-0 pr-3 py-0 md:py-3 md:px-3'
					},
					footer: {
						padding: 'px-0 py-0 sm:p-0 sm:px-0'
					}
				}"
			>
				
						<div>
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
							<!-- <ProjectSkills :skills="article.tags" /> -->
						</div>
						<UButton
							size="xs"
							:label="$t('ver_proyecto')"
							variant="solid"
							color="gray"
							class="mt-3 w-fit"
							:to="article._path"
							:ui="{
								color: {
									gray: {
										solid: 'dark:bg-gray-950'
									},
								}
							}"
						>
							<template #trailing>
								<UIcon name="i-heroicons-arrow-right-20-solid" />
							</template>
						</UButton>
				
				<template #footer v-if="article.image">
					<NuxtImg
						v-if="article.image"
						:src="article.image"
						:alt="article.title"
						class="w-36 sm:w-40 h-full object-cover object-center"
					/>
				</template>
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