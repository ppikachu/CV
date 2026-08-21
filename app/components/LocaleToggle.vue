<template>
	<ClientOnly>
		<div class="inline-flex items-center rounded-lg border border-neutral-800 bg-neutral-900/60 p-0.5 font-mono">
			<UButton
				label="ES"
				:color="isEs ? 'primary' : 'neutral'"
				:variant="isEs ? 'soft' : 'ghost'"
				:size="size || 'xs'"
				class="font-mono text-xs font-semibold px-2 py-1 rounded-md transition-colors"
				aria-label="Español"
				@click="setLocale('es')"
			/>
			<UButton
				label="EN"
				:color="isEn ? 'primary' : 'neutral'"
				:variant="isEn ? 'soft' : 'ghost'"
				:size="size || 'xs'"
				class="font-mono text-xs font-semibold px-2 py-1 rounded-md transition-colors"
				aria-label="English"
				@click="setLocale('en')"
			/>
		</div>
	</ClientOnly>
</template>

<script lang="ts" setup>
defineProps<{
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}>()

const { locale, setLocale } = useI18n()

const isEs = computed(() => locale.value.startsWith('es'))
const isEn = computed(() => locale.value.startsWith('en'))
</script>