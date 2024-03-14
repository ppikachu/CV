<template>
	<section class="flex flex-col gap-2 mb-4">
		<div class="flex gap-6 justify-between mt-2 sm:mt-4 not-prose">
			<div>
				<ProseH1>Santiago Toyos</ProseH1>
				<ProseH2>Artista visual</ProseH2>
				<UButton
				icon="i-heroicons-globe-americas-16-solid"
				label="Buenos Aires, Argentina"
				variant="link" color="gray"
				size="xs"
				class="mt-2"
				:padded="false"
				/>
			</div>
			<div class="flex flex-col sm:flex-row mt-1.5 items-end sm:items-center gap-3 sm:gap-4 h-fit">
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
							on: 'dark:text-gray-400',
						}
					}"
					/>
				</ColorScheme>
				<LocaleSwitch />
			</div>
			<!-- <UAvatar
				src="/images/avatar-128x128.png"
				alt="Santiago's avatar"
				:ui="{
					size: {
						sm: 'w-24 h-24',
					}
				}"
			/> -->
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