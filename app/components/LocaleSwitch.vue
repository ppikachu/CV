<template>
	<!-- //HACK: mode="hover"? -->
	<UDropdown
		:items="items"
		:ui="{ width: 'w-fit' }"
	>
		<UButton
			color="white"
			class="h-fit"
			size="xs"
			variant="ghost"
			:trailing-icon="locale.startsWith('en') ? 'i-circle-flags-us' : 'i-circle-flags-es'"
			:ui="{ rounded: 'rounded-full' }"
		/>
	</UDropdown>
</template>

<script lang="ts" setup>
const { locale, setLocale } = useI18n()

function SwitchLanguage(lang: 'es' | 'en') {
	setLocale(lang)
}

const items = [
	[{
		label: 'Español',
		icon: 'i-circle-flags-es',
		click: () => { SwitchLanguage('es') }
	}, {
		label: 'English',
		icon: 'i-circle-flags-us',
		click: () => { SwitchLanguage('en') }
	}]
]
</script>