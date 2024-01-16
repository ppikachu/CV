<template>
	<div class="flex gap-4 justify-between">
		<div class="flex-grow">
			<ContentDoc path="/head" />
		</div>
		<ColorScheme>
			<UToggle
				v-model="isDark"
				on-icon="i-heroicons-moon-solid"
				off-icon="i-heroicons-sun-solid"
				class="mt-4 md:mt-6"
				@click="isDark = !isDark"
				:ui="{
					active: 'bg-gray-500 dark:bg-gray-700',
					icon: {
						on: 'dark:text-gray-500',
					}
				}"
			/>
		</ColorScheme>
	</div>
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