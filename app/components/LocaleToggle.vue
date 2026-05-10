<template>
	<div class="flex items-center gap-2">
		<USwitch
			v-model="localeState"
			checked-icon="i-circle-flags-us"
			unchecked-icon="i-circle-flags-es"
			size="lg"
			color="neutral"
			:ui="{
				base: 'data-[state=checked]:bg-muted data-[state=unchecked]:bg-muted',
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