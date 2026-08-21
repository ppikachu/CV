<script lang="ts" setup>
const props = defineProps({
	current: {
		type: Boolean,
		default: false
	}
})

const { locale } = useI18n()

const { data: list } = await useAsyncData(
	`print-projects-${locale.value}-${props.current ? 'current' : 'all'}`,
	() => {
		let query = (queryCollection as any)('content')
			.where('path', 'LIKE', `/${locale.value}/proyecto/%`)

		if (props.current) {
			query = query.where('tipo', '=', 'featured')
		}

		return query.all()
	},
	{ watch: [locale] }
)
</script>

<template>
	<div class="flex flex-col gap-6 my-4">
		<div
			v-for="article in list"
			:key="article.path"
			class="h-full flex flex-col justify-between prose dark:prose-invert"
		>
			<ProseH2>{{ article.title }}: <span class="font-normal">{{ article.description }}</span></ProseH2>
			<ProseP v-if="article.url" class="text-sm mb-2 font-mono text-muted">{{ article.url }}</ProseP>
			<ContentRenderer :value="article" class="text-xs" />
			<ProjectSkills v-if="article.tags?.length" :skills="article.tags" />
		</div>
	</div>
</template>

<style scoped>
.no-print {
	display: none !important;
}
</style>