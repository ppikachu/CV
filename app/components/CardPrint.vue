<script lang="ts" setup>
import type { Project } from '~/components/ProjectCard.vue'

const props = defineProps<{
	tipos: string[]
}>()

const { locale, t } = useI18n()

const { data: list } = await useAsyncData<Project[]>(
	`print-projects-${locale.value}-${props.tipos.join('-')}`,
	() => {
		let query = (queryCollection as any)('content')
			.where('path', 'LIKE', `/${locale.value}/proyecto/%`)
			.where('tipo', 'IN', props.tipos)

		return query.all()
	},
	{ watch: [locale] }
)
</script>

<template>
	<div class="flex flex-col gap-3 divide-y divide-dashed divide-neutral-500">
		<article
			v-for="article in list"
			:key="article.path"
			class="print-card break-inside-avoid not-prose pb-4 last:border-b-0"
		>
			<div class="flex flex-wrap items-baseline justify-between gap-x-2">
				<h3 class="text-base font-bold font-heading">
					{{ article.title }}
					<span v-if="article.category" class="font-normal text-xs ml-1.5">
						({{ article.category }})
					</span>
				</h3>
				<span v-if="article.year" class="text-xs font-mono font-semibold">{{ article.year }}</span>
			</div>

			<p v-if="article.description" class="text-sm my-2">
				{{ article.description }}
			</p>

			<div class="text-xs flex flex-col gap-y-1 mb-3">
				<span v-if="article.client">
					<strong class="font-bold">{{ t('client_label') }}:</strong> {{ article.client }}
				</span>
				<span v-if="article.role">
					<strong class="font-bold">{{ t('role_label') }}:</strong> {{ Array.isArray(article.role) ? article.role.join(', ') : article.role }}
				</span>
				<span v-if="article.url">
					<strong class="font-bold">URL:</strong>
					<a :href="article.url" target="_blank" class="font-mono underline ml-1">{{ article.url }}</a>
				</span>
			</div>

			<div v-if="article.tags?.length" class="flex flex-wrap gap-1.5">
				<span
					v-for="tag in article.tags"
					:key="tag"
					class="text-xs font-mono font-medium px-1.5 py-0.5 rounded-full border border-neutral-400"
				>{{ tag }}</span>
			</div>
		</article>
	</div>
</template>

<style scoped>
.print-card {
	page-break-inside: avoid;
	break-inside: avoid;
}
</style>