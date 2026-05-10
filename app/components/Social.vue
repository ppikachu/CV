<script setup lang="ts">
import data from '~/assets/social_links.json'
</script>
<template>
	<section class="flex gap-1">
		<UButton v-for="item in data"
			:to="item.to"
			target="_blank"
			variant="ghost"
			color="neutral"
		>
			<ClientOnly>
				<UIcon :name="item.icon" dynamic class="w-6 h-6" />
			</ClientOnly>
		</UButton>
	</section>
</template>