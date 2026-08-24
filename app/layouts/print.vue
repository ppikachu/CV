<template>
	<div class="print-layout bg-white text-black min-h-screen">
		<main class="max-w-4xl mx-auto px-8 py-8">
			<slot />
		</main>
	</div>
</template>

<style scoped>
.print-layout {
	--ui-bg: white;
	color-scheme: light;
	color: #000000;
}

.print-layout :deep(a) {
	color: inherit;
	text-decoration: underline;
}
</style>
