<template>
	<div class="flex items-center gap-2">
		<UToggle
			v-model="localeState"
			on-icon="i-circle-flags-us"
			off-icon="i-circle-flags-es"
			size="lg"
			:ui="{
				active: 'bg-gray-200 dark:bg-gray-900',
				inactive: 'dark:bg-gray-900',
				icon: {
					on: 'dark:text-gray-400',
				}
			}"
		/>
	</div>
</template>

<script lang="ts" setup>
const { locale, setLocale } = useI18n()

const localeState = computed({
  get: () => locale.value.startsWith('en'),
  set: (val) => setLocale(val ? 'en' : 'es')
})
</script>