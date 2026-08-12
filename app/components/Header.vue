<script setup lang="ts">
</script>

<template>
	<header class="pt-4 pb-8 flex flex-col gap-6 not-prose border-b border-gray-100 dark:border-gray-800">
		<div class="flex flex-row justify-between items-start">
			<div class="space-y-1">
				<p class="text-xs uppercase tracking-widest text-primary-500 font-semibold">Portfolio & Works</p>
				<h1 class="uppercase text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
					Santiago Toyos
				</h1>
				<h2 class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-medium tracking-wide">
					{{ $t('role') }}
				</h2>
			</div>

			<div class="flex flex-row items-center gap-3">
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
		</div>

		<div class="flex flex-wrap items-center gap-2 text-xs font-mono">
			<span class="text-gray-600 dark:text-gray-400">Design · Motion · Digital · Interactive</span>
			<span class="text-gray-400 dark:text-gray-600">/</span>
			<span class="text-gray-500 dark:text-gray-400">{{ $t('hero_location') }}</span>
		</div>

		<Approach />

		<div class="flex flex-wrap gap-3 pt-2">
			<UButton
				to="#selected-work"
				:label="$t('btn_selected_work')"
				icon="i-lucide-arrow-down-right"
				variant="solid"
				color="primary"
				size="md"
			/>
			<UButton
				to="#contact"
				:label="$t('btn_contact')"
				icon="i-lucide-mail"
				variant="outline"
				size="md"
			/>
		</div>
	</header>
</template>