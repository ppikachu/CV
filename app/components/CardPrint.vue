<template>
	<div class="flex flex-col">
		<ContentList :path="shortLocale()+'/proyecto'" :where="{current:props.current}" v-slot="{ list }">
			<div
					v-for="article in list"
					:key="article._path"
					class="h-full flex flex-col justify-between prose prose-invert"
			>
				<ProseH2>{{ article.title }}: <span>{{ article.description }}</span></ProseH2>
				<ProseP class="text-sm mb-4">{{ article.url }}</ProseP>
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