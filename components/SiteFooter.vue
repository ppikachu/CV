<template>
	<footer class="w-full flex flex-col justify-between items-center mt-8">

		<div class="flex flex-col md:flex-row h-full items-center gap-4 md:gap-8 md:items-center text-gray-400 text-sm not-prose">
			<p>©️ {{ new Date().getFullYear() }} Santiago Toyos</p>
			<UButton
				icon="i-heroicons-globe-americas-16-solid"
				label="Buenos Aires, Argentina"
				variant="link" color="gray"
				:padded="false"
			/>
			<Social />
		</div>

		<NuxtImg src="/robot2.png" class="w-32 dark:opacity-60 sm:self-end" />

	</footer>
</template>