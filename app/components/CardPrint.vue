<template>
	<div class="flex flex-col">
		<ContentList :path="shortLocale()+'/proyecto'" :where="{current:props.current}" v-slot="{ list }">
			<div
					v-for="article in list"
					:key="article._path"
					class="h-full flex flex-col justify-between prose prose-invert"
			>
				<h2 class="leading-tight mb-2">{{ article.title }}: <span>{{ article.description }}</span></h2>
				<p class="text-sm mb-4">{{ article.url }}</p>
				<ContentDoc :path="article._path" class="text-xs" />
				<ProjectSkills :skills="article.tags" />
			</div>
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

<style scoped>
.no-print {
	display: none !important;
}
</style>