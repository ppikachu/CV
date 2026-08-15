<template>
	<ClientOnly>
		<div class="flex items-center gap-2">
			<USwitch
				v-model="localeState"
				checked-icon="i-circle-flags-us"
				unchecked-icon="i-circle-flags-es"
				:size="size || 'lg'"
				color="neutral"
				aria-label="Switch language / Cambiar idioma"
				:ui="{
					base: 'data-[state=checked]:bg-muted data-[state=unchecked]:bg-muted',
				}"
			/>
		</div>
	</ClientOnly>
</template>

<script lang="ts" setup>
defineProps<{
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}>()

const { locale, setLocale } = useI18n()

const localeState = computed({
  get: () => locale.value.startsWith('en'),
  set: (val) => setLocale(val ? 'en' : 'es')
})
</script>