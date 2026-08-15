<script setup lang="ts">
</script>

<template>
	<header class="pb-8 flex flex-col gap-2 not-prose">
		<div>
			<ProseH1>
				Santiago Toyos
			</ProseH1>
			<ProseH2 class="text-default font-normal leading-none mt-2 sm:mt-3">
				{{ $t('role') }}
			</ProseH2>
			<span class="text-sm text-primary font-mono tracking-wider font-semibold uppercase">
				{{ $t('hero_tagline') }}
			</span>
		</div>

		<ProseP class="text-toned text-base sm:text-lg leading-relaxed max-w-3xl">
			{{ $t('approach_text') }}
		</ProseP>

		<UFieldGroup>
			<UButton
				to="#featured-work"
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