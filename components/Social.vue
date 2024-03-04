<script setup lang="ts">
import data from '~/assets/social_links.json'
</script>
<template>
	<section class="not-prose mt-4">
		<ul class="flex gap-3">
			<li v-for="item in data">
				<UButton
					:to="item.to"
					target="_blank"
					:icon="item.icon"
					variant="ghost"
					color="gray"
					size="md"
				/>
			</li>
		</ul>
	</section>
</template>