<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
useSeoMeta({
	title: runtimeConfig.public.NAME,
  description: runtimeConfig.public.DESCRIPTION,
	ogTitle: runtimeConfig.public.NAME,
	ogDescription: runtimeConfig.public.DESCRIPTION,
	ogImage: runtimeConfig.public.OG_IMAGE,
	ogUrl: runtimeConfig.public.HOST,
	twitterTitle: runtimeConfig.public.NAME,
	twitterDescription: runtimeConfig.public.DESCRIPTION,
	twitterImage: runtimeConfig.public.TWITTER_IMAGE,
	twitterCard: 'summary'
})

useHead({
	htmlAttrs: {
		lang: 'es'
	},
	link: [
		{
			rel: 'icon',
			type: 'image/png',
			href: runtimeConfig.public.ICON
		}
	]
})
</script>
<template>
	<UContainer>
		<NuxtLoadingIndicator color="#a3e635" />
		<main class="prose dark:prose-invert max-w-3xl mx-auto mt-4 sm:mt-8">
			<NuxtPage />
		</main>
	</UContainer>
</template>

<style>
.page-enter-active,
.page-leave-active {
	transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
}
</style>