<template>
	<section class="mb-4 flex flex-row gap-4 justify-between not-prose">
			<div id="title" class="slide-enter-content">
				<ProseH1>Santiago Toyos</ProseH1>
				<ProseH2>{{ $t('role') }}</ProseH2>
				<UButton
					icon="i-heroicons-globe-americas-16-solid"
					label="Buenos Aires, Argentina"
					variant="link" color="gray"
					size="xs"
					class="mt-2 mb-4"
					:padded="false"
				/>
				<Social />
			</div>
			<div id="switches" class="flex flex-row sm:items-start gap-3 h-fit">
				<!-- <UAvatar src="/images/avatar-128x128.png" alt="Santiago's avatar" :ui="{ size: { sm: 'w-24 h-24' } }" /> -->
				<LightDarkSwitch />
				<LocaleSwitch />
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