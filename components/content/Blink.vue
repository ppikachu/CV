<template>
	<div class="not-prose my-4 no-print">
		<UButton
			:to="props.url"
			target="_blank"
			variant="solid"
			color="gray"
			size="xs"
			block
			:ui="{
				color: {
					gray: {
						solid: 'dark:bg-gray-950'
					},
				}
			}"
		>
			<ContentSlot />
			<template #trailing>
				<UIcon name="i-heroicons-arrow-right-20-solid" />
			</template>
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