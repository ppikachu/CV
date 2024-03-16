<template>
	<div class="flex items-center gap-2">
		<UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
			<UButton
				color="white"
				:trailing-icon="shlocale === 'en' ? 'i-circle-flags-us' : 'i-circle-flags-es'"
				:ui="{ rounded: 'rounded-full' }"
			/>
		</UDropdown>
	</div>
</template>

<script lang="ts" setup>
const { setLocale } = useI18n()
const shlocale = ref(shortLocale())

function SwitchEnglish() {
	setLocale('en')
	shlocale.value = 'en'
}

function SwitchSpanish() {
	setLocale('es')
	shlocale.value = 'es'
}

const items = [
	[{
		label: 'Español',
		icon: 'i-circle-flags-es',
		click: () => { SwitchSpanish() }
	}, {
		label: 'English',
		icon: 'i-circle-flags-us',
		click: () => { SwitchEnglish() }
	}]
]
</script>