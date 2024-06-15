<template>
	<section class="mb-4 flex flex-row gap-4 justify-between not-prose">
		<div class="flex gap-2 items-center">
			<!-- <UAvatar src="/twitter.png" alt="Santiago's avatar" :ui="{ size: { sm: 'w-12 h-12' } }" /> -->
			<div id="title" class="slide-enter-content">
				<ProseH1>Santiago Toyos</ProseH1>
				<ProseH2>{{ $t('role') }}</ProseH2>
			</div>
		</div>
		<div id="switches" class="flex flex-row sm:items-start gap-3 h-fit">
			<LightDarkToggle />
			<!-- <LightDarkSwitch /> -->
			<LocaleToggle />
			<!-- <LocaleSwitch /> -->
		</div>
	</section>
</template>

<style scoped>
h1 {
	@apply text-2xl;
}
h2 {
	@apply text-xl;
}
</style>