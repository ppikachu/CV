<script setup lang="ts">
import data from '~/assets/social_links.json'
</script>

<template>
	<section class="not-prose mt-6 flex flex-col gap-2">
		<strong>Links:</strong>
		<UButton
			v-for="item in data"
			:key="item.to"
			:to="item.to"
			:label="item.label"
			:icon="item.icon"
			target="_blank"
			variant="link"
			color="neutral"
		/>
	</section>
</template>