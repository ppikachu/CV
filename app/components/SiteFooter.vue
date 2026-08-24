<template>
		<footer class="flex flex-col sm:flex-row mb-12 h-full justify-center items-center gap-2 sm:gap-8 md:items-center text-muted text-xs not-prose">
			<p>
				<UIcon name="i-ph-copyright" class="align-middle mr-0.5" />{{ new Date().getFullYear() }} Santiago Toyos
			</p>
			<p>
				<UIcon name="i-ph-globe" class="align-middle mr-0.5" />Buenos Aires, Argentina
			</p>
			<Social />
		</footer>
</template>