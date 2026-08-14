<script setup lang="ts">
</script>

<template>
	<header class="pb-8 flex flex-col gap-4 not-prose">
		<div class="flex flex-row justify-between items-start">
			<div>
				<ProseH1>
					Santiago Toyos
				</ProseH1>
				<ProseH2 class="text-default leading-none mt-2 sm:mt-3">
					{{ $t('role') }}
				</ProseH2>
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

		<ProseP>
			{{ $t('approach_text') }}
		</ProseP>

		<UFieldGroup>
			<UButton
				to="#selected-work"
				:label="$t('btn_selected_work')"
				icon="i-lucide-layout-grid"
				variant="solid"
				color="primary"
				size="sm"
			/>
			<UButton
				to="#contact"
				:label="$t('btn_contact')"
				icon="i-lucide-mail"
				variant="outline"
				size="sm"
			/>
		</UFieldGroup>
	</header>
</template>