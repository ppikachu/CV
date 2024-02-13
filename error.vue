<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
	error: Object as () => NuxtError
})
</script>

<template>
	<UContainer class="flex flex-col gap-4 h-svh items-center justify-center">
		<span class="text-8xl" v-if="error.statusCode === 404">🤦🏻‍♂️</span>
		<span class="text-8xl" v-else>{{ error.statusCode }}</span>
		<UButton
			variant="link"
			label="Volver al inicio"
			icon="i-ph-arrow-fat-lines-left-bold"
			@click="navigateTo('/')"
		/>
	</UContainer>
</template>
