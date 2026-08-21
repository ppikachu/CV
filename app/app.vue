<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const { locale } = useI18n()

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
	twitterCard: 'summary_large_image'
})

useHead({
	htmlAttrs: {
		lang: () => locale.value
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
	<UApp>
		<Nav />
		<UContainer>
			<NuxtLoadingIndicator color="#a3e635" />
			<main class="prose dark:prose-invert prose-a:no-underline max-w-4xl mx-auto">
				<NuxtPage />
			</main>
		</UContainer>
	</UApp>
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

@keyframes slide-enter {
	0% {
		transform: translateY(10px);
		opacity: 0
	}

	to {
		transform: translateY(0);
		opacity: 100
	}
}

@media (prefers-reduced-motion:no-preference) {
	.slide-enter-content > * {
		--enter-stage: 0;
		--enter-step: 150ms;
		--enter-initial: 0ms;
		animation: slide-enter 1s both 1;
		animation-delay: calc(var(--enter-initial) + var(--enter-stage) * var(--enter-step));
	}

	.slide-enter-content > *:nth-child(1) { --enter-stage: 1; }
	.slide-enter-content > *:nth-child(2) { --enter-stage: 2; }
	.slide-enter-content > *:nth-child(3) { --enter-stage: 3; }
	.slide-enter-content > *:nth-child(4) { --enter-stage: 4; }
	.slide-enter-content > *:nth-child(5) { --enter-stage: 5; }
	.slide-enter-content > *:nth-child(6) { --enter-stage: 6; }
	.slide-enter-content > *:nth-child(7) { --enter-stage: 7; }
	.slide-enter-content > *:nth-child(8) { --enter-stage: 8; }
	.slide-enter-content > *:nth-child(9) { --enter-stage: 9; }
	.slide-enter-content > *:nth-child(10) { --enter-stage: 10; }
}
</style>