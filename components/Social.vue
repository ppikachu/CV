<script setup lang="ts">
const data = [
	{
		icon: 'i-ph-envelope-simple-bold',
		to: 'mailto:ppikachu@gmail.com',
	},
	{
		icon: 'i-ph-github-logo-bold',
		to: 'https://github.com/ppikachu',
	},
	{
		icon: 'i-ph-behance-logo-bold',
		to: 'https://www.behance.net/stoyos',
	},
	{
		icon: 'i-ph-linkedin-logo-bold',
		to: 'https://www.linkedin.com/in/santiago-toyos',
	},
]
</script>
<template>
	<section class="not-prose">
		<ul class="flex gap-2">
			<li v-for="item in data">
				<UButton
					:to="item.to"
					target="_blank"
					:icon="item.icon"
					variant="ghost"
					color="gray"
				/>
			</li>
		</ul>
	</section>
</template>