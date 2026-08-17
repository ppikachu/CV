<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
	error: Object as () => NuxtError
})
</script>

<template>
	<UContainer class="flex flex-col gap-4 h-svh items-center justify-center not-prose text-center">
		<span class="text-8xl">🤦🏻‍♂️</span>
		<ProseH2 class="text-6xl text-primary font-mono font-bold">{{ error?.statusCode }}</ProseH2>
		<ProseP class="text-center text-muted">{{ error?.message }}</ProseP>
		<UButton
			variant="link"
			:label="$t('regresar')"
			icon="i-ph-arrow-left"
			@click="navigateTo('/')"
		/>
	</UContainer>
</template>
