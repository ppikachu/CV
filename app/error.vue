<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
	error: Object as () => NuxtError
})
</script>

<template>
	<UContainer class="flex flex-col gap-4 h-svh items-center justify-center">
		<h1 class="text-8xl">🤦🏻‍♂️</h1>
		<h2 class="text-6xl">{{ error?.statusCode }}</h2>
		<p class="text-center">{{ error?.message }}</p>
		<UButton
			variant="link"
			:label="$t('regresar')"
			icon="i-lucide-arrow-left"
			@click="navigateTo('/')"
		/>
	</UContainer>
</template>
