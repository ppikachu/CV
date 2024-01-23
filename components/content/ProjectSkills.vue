<template>
	<section>
		<div v-if="article?.tags" class="flex gap-1 flex-wrap">
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
	</section>
</template>

<script lang="ts" setup>
const props = defineProps({
	article: Object,
})
</script>