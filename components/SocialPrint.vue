<script setup lang="ts">
import data from '~/assets/social_links.json'
</script>

<template>
	<section class="not-prose mt-6 flex flex-col gap-2">
		<strong>Links:</strong>
		<UButton v-for="item in data"
			:to="item.to"
			:padded="false"
			:label="item.label"
			:icon="item.icon"
			target="_blank"
			variant="link"
			color="white"
		/>
	</section>
</template>