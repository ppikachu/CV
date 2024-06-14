<script setup lang="ts">
import data from '~/assets/social_links.json'
</script>
<template>
	<section class="not-prose flex gap-1">
		<UButton v-for="item in data"
			:to="item.to"
			target="_blank"
			variant="ghost"
			color="black"
		>
			<UIcon :name="item.icon" dynamic class="w-6 h-6" />
		</UButton>
	</section>
</template>