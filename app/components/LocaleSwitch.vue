<template>
	<UDropdownMenu
		:items="items"
		:ui="{ content: 'w-fit' }"
	>
		<UButton
			class="h-fit"
			size="xs"
			variant="ghost"
			:trailing-icon="locale.startsWith('en') ? 'i-circle-flags-us' : 'i-circle-flags-es'"
		/>
	</UDropdownMenu>
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
		onSelect: () => SwitchLanguage('es')
	}, {
		label: 'English',
		icon: 'i-circle-flags-us',
		onSelect: () => SwitchLanguage('en')
	}]
]
</script>