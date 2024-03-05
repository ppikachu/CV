<template>
	<section class="flex flex-col gap-2 mb-4">
		<div class="flex gap-6 justify-between mt-2 sm:mt-4 not-prose">
			<div class="mb-1">
				<ProseH1>Santiago Toyos</ProseH1>
				<ProseH2>Artista visual</ProseH2>
				<Social />
				<div class="flex gap-8 mt-2">
					<UButton
						icon="i-heroicons-globe-americas-16-solid"
						label="Buenos Aires, Argentina"
						variant="link" color="gray"
						size="xs"
						:padded="false"
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
			<UAvatar
				src="/images/avatar-128x128.png"
				alt="Santiago's avatar"
				:ui="{
					size: {
						sm: 'w-24 h-24',
					}
				}"
			/>
		</div>


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

<style scoped>
h1 {
	@apply text-2xl;
}
h2 {
	@apply text-xl;
}
</style>