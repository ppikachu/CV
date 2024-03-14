<template>
	<div class="flex items-center gap-2">
		<UToggle
			v-model="toggleLocale"
			on-icon="i-circle-flags-us"
			off-icon="i-circle-flags-es"
			@click="functionSwitchLocale()"
			:ui="{
				active: 'bg-gray-500 dark:bg-gray-700',
				icon: {
					on: 'dark:text-gray-400',
				}
			}"
		/>
		{{ locale === 'en' ? 'English' : 'Español' }}
	</div>
</template>

<script lang="ts" setup>
const { locale, setLocale } = useI18n()
const toggleLocale = ref(locale.value === 'en' ? true : false)
// const switchLocalePath = useSwitchLocalePath()

function functionSwitchLocale() {
	setLocale(locale.value === 'en' ? 'es' : 'en')
}
</script>