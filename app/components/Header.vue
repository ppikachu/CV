<script setup lang="ts">
import { h1 } from '#build/ui/prose';

</script>

<template>
	<section class="mb-4 flex flex-row gap-4 justify-between not-prose">
		<div class="flex gap-2 items-center">
			<div id="title" class="text-primary slide-enter-content">
				<h1 class="uppercase text-2xl">Santiago Toyos</h1>
				<h2 class="text-lg">{{ $t('role') }}</h2>
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