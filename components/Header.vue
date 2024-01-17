<template>
	<div class="flex gap-4 justify-between items-center">
		<div class="flex-grow">
			<ContentDoc path="/head" />
			<Social />
		</div>
		<div class="flex flex-col gap-4 items-center not-prose">
			<NuxtImg
				src="/images/avatar.png"
				alt="Santiago's avatar"
				class="w-24 h-24 rounded-lg"
			/>
			<ColorScheme>
				<UToggle
					v-model="isDark"
					on-icon="i-heroicons-moon-solid"
					off-icon="i-heroicons-sun-solid"
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