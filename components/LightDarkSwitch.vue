<template>
	<ColorScheme>
		<UButton
			v-model="isDark"
			:icon="colorMode.value === 'dark' ? 'i-heroicons-moon-solid' : 'i-heroicons-sun-solid'"
			color="gray"
			class="h-fit"
			size="xs"
			variant="ghost"
			@click="isDark = !isDark"
			:ui="{
				rounded: 'rounded-full',
			}"
		/>
	</ColorScheme>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
	get() {
		return colorMode.value === 'dark'
	},
	set() {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
	}
})
</script>