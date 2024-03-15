<template>
	<!-- {{ $i18n.localeProperties.code }} > {{ shortLocale() }} -->
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
		<!-- {{ shortLocale() === 'en' ? 'English' : 'Español' }} -->
	</div>
</template>

<script lang="ts" setup>
const { setLocale } = useI18n()
const toggleLocale = ref(shortLocale() === 'en' ? true : false)
const shlocale = ref(shortLocale())

function functionSwitchLocale() {
	setLocale(shlocale.value === 'en' ? 'es' : 'en')
	shlocale.value = shlocale.value === 'en' ? 'es' : 'en'
}
</script>