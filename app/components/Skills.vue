<script setup lang="ts">
	const { locale } = useI18n()
	const shortLoc = computed(() => locale.value.split('-')[0])

	const { data: page } = await useAsyncData(`skills-${shortLoc.value}`, () => queryCollection('content').path('/' + shortLoc.value + '/skills').first(), { watch: [shortLoc] })
</script>

<template>
	<section>
			<ContentRenderer v-if="page" :value="page" />

			<!-- TODO mostrar o no mostrar skills?-->
			<!-- <div class="prose dark:prose-invert my-4">
				<ProseH1>{{ data.title }}</ProseH1>
			</div>

			<div class="flex flex-wrap gap-2">
				<UBadge
					size="lg"
					variant="outline"
					color="white"
					:ui="{ variant: { outline: 'ring-gray-200 dark:ring-gray-800' } }"
					v-for="skill in data.tags"
					:key="skill"
					:label="skill"
				/>
			</div> -->
	</section>
</template>