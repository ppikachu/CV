<template>
	<section class="flex gap-1 flex-wrap" :class="{ 'mb-8': route.path.includes('proyecto') }">
		<UBadge
			v-for="skill, i in skills"
			:key="i"
			:label="skill"
			variant="soft"
			:ui="{ variant: { soft: 'dark:bg-gray-700' } }"
		/>
	</section>
</template>

<script lang="ts" setup>
const props = defineProps({
	skills: Array,
})
const route = useRoute()
</script>