<template>
	<div class="flex gap-4 justify-between">
		<ContentDoc path="/head"/>
		<div class="flex-grow">
			<ColorScheme>
				<USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" />
			</ColorScheme>
		</div>
	</div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('page-data', () => queryContent('/hello').findOne())
</script>