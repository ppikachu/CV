<template>
	<UApp>
		<Nav />
		<UContainer>
			<NuxtLoadingIndicator color="#a3e635" />
			<main class="prose dark:prose-invert prose-a:no-underline max-w-4xl mx-auto">
				<slot />
			</main>
		</UContainer>
	</UApp>
</template>
