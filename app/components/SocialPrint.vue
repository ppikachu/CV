<script setup lang="ts">
import data from '~/assets/social_links.json'
</script>

<template>
	<address class="not-prose text-sm font-mono flex flex-wrap gap-x-2">
		<template v-for="(item, index) in data" :key="item.to">
			<a :href="item.to" target="_blank" class="font-medium underline">{{ item.label }}</a>
			<span v-if="index < data.length - 1" class="font-normal opacity-50">·</span>
		</template>
	</address>
</template>