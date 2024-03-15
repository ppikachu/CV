<template>
	<ColorScheme>
		<UToggle
			v-model="isDark"
			on-icon="i-heroicons-moon-solid"
			off-icon="i-heroicons-sun-solid"
			size="lg"
			@click="isDark = !isDark"
			:ui="{
				active: 'bg-gray-500 dark:bg-gray-700',
				icon: {
					on: 'dark:text-gray-400'
				}
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