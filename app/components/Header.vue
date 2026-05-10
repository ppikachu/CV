<template>
	<section class="mb-4 flex flex-row gap-4 justify-between not-prose">
		<div class="flex gap-2 items-center">
			<div id="title" class="slide-enter-content">
				<ProseH1 class="!my-0">Santiago Toyos</ProseH1>
				<ProseH2 class="!capitalize">{{ $t('role') }}</ProseH2>
			</div>
		</div>
		<div id="switches" class="flex flex-row sm:items-start gap-3 h-fit">
			<ClientOnly>
				<UColorModeSwitch
					size="lg"
					:ui="{
						base: 'data-[state=checked]:bg-muted data-[state=unchecked]:bg-muted',
						icon: 'group-data-[state=checked]:text-muted group-data-[state=unchecked]:text-muted',
					}"
				/>
				<LocaleToggle />
			</ClientOnly>
		</div>
	</section>
</template>