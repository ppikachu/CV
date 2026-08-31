<template>
		<footer class="flex flex-col sm:flex-row h-full justify-center items-center gap-2 sm:gap-8 md:items-center text-muted text-xs not-prose">
			<p class="flex items-center gap-1">
				<UIcon name="i-pixelarticons-letter-c-circle" class="size-6 shrink-0 inline-block align-middle" />
				<span>{{ new Date().getFullYear() }} Santiago Toyos</span>
			</p>
			<p class="flex items-center gap-1">
				<UIcon name="i-pixelarticons-globe" class="size-6 shrink-0 inline-block align-middle" />
				<span>Buenos Aires, Argentina</span>
			</p>
			<Social />
		</footer>
</template>