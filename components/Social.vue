<script setup lang="ts">
import data from '~/assets/social_links.json'
</script>
<template>
	<section class="not-prose flex gap-3">
		<UButton v-for="item in data"
			:to="item.to"
			target="_blank"
			variant="ghost"
			color="black"
			:padded="false"
		>
			<UIcon :name="item.icon" dynamic class="w-5 h-5 sm:w-6 sm:h-6" />
		</UButton>
	</section>
</template>