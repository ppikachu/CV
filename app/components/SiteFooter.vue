<template>
		<footer class="flex flex-col md:flex-row my-4 h-full justify-center items-center gap-2 md:gap-8 md:items-center text-muted text-xs not-prose">
			<p>
				<UIcon name="i-ph-copyright" class="align-middle mr-1" />{{ new Date().getFullYear() }} Santiago Toyos
			</p>
			<p>
				<UIcon name="i-ph-globe" class="align-middle mr-1" />Buenos Aires, Argentina
			</p>
			<Social />
		</footer>
</template>