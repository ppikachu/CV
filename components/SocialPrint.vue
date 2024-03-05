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
			target="_blank"
			variant="link"
			color="white"
		>
			<template #leading>
				<UIcon :name="item.icon" dynamic class="w-5 h-5" />
			</template>
		</UButton>
	</section>
</template>