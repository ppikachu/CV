<script setup lang="ts">
const { locale } = useI18n()

const { data: page } = await useAsyncData(
	`about-${locale.value}`,
	() => queryCollection('content').path('/' + locale.value + '/about').first(),
	{ watch: [locale] }
)
</script>

<template>
	<ContentRenderer v-if="page" :value="page" />
	<ProseP v-else class="my-4 text-sm leading-relaxed">
		{{ $t('approach_text') }}
	</ProseP>
</template>
