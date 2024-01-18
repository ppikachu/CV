
import { content } from '#tailwind-config';
<template>
	<UContainer>
		<section class="prose dark:prose-invert max-w-3xl mx-auto mt-4 mb-10">
			<NuxtPage />
		</section>
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
	filter: blur(1rem);
}

.carousel__pagination-button::after {
		@apply dark:bg-gray-600;
}
.carousel__pagination-button--active::after {
		@apply dark:bg-gray-400;
}

.carousel__icon {
	@apply dark:text-gray-300 text-gray-300;
}
</style>