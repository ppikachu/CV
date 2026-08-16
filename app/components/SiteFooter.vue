<template>
		<footer class="flex flex-col md:flex-row my-4 h-full justify-center items-center gap-2 md:gap-8 md:items-center text-muted text-xs not-prose">
			<ProseP>
				<UIcon name="i-lucide-copyright" class="align-middle mr-1" />{{ new Date().getFullYear() }} Santiago Toyos
			</ProseP>
			<ProseP>
				<UIcon name="i-lucide-globe" class="align-middle mr-1" />Buenos Aires, Argentina
			</ProseP>
			<Social />
		</footer>
</template>