<script setup lang="ts">
const { locale } = useI18n()
const shortLoc = computed(() => locale.value.split('-')[0])

const { data: page } = await useAsyncData(`about-${shortLoc.value}`, () => queryCollection('content').path('/' + shortLoc.value + '/about').first(), { watch: [shortLoc] })
// const page = computed(() => {
//   return queryCollection('content').path('/' + shortLocale() + '/about').first()
// })
</script>

<template>
	<!-- <ContentRenderer :data="shortLocale()+'/about'"/> -->
	<ContentRenderer v-if="page" :value="page" />
</template>
