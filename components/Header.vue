<template>
	<section>
		<div class="flex gap-4 justify-between mt-8">
			<div class="">
				<ContentDoc path="/head" />
			</div>
			<UAvatar
			src="/images/avatar.png"
			alt="Santiago's avatar"
			size="3xl"
			/>
		</div>
		<Social />
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
	</section>
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