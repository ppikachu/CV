<template>
	<div class="not-prose my-4">
		<UButton
			:to="props.url"
			target="_blank"
			variant="soft"
			size="xs"
		>
			<ContentSlot />
		</UButton>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	text: {
		type: String,
		default: 'Link'
	},
	url: {
		type: String,
		default: '#'
	}
})
</script>