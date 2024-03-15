<template>
	<footer class="w-full flex flex-col justify-between items-center mt-8">

		<div class="flex flex-col md:flex-row h-full sm:justify-center md:gap-8 md:items-center text-gray-400 text-sm">
			<p>©️ {{ new Date().getFullYear() }} Santiago Toyos</p>
			<Social />
		</div>

		<NuxtImg src="/robot2.png" class="w-32 dark:opacity-40 sm:self-end" />

	</footer>
</template>