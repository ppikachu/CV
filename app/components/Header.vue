<script setup lang="ts">
import sdf1Frag from '~/assets/sdf1.frag';
</script>

<template>
	<header class="not-prose relative h-[calc(100dvh-var(--ui-header-height))] flex flex-col justify-center">
		<div class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen -z-10">
			<ShaderToy 
				:shaderCode="sdf1Frag" />
		</div>
		<ProseH1 class="">
			Santiago Toyos
		</ProseH1 >
		<ProseH2 class="text-default font-normal uppercase mt-1 sm:mt-2">
			{{ $t('role') }}
		</ProseH2>

<!-- 			<span class="text-sm text-primary font-mono leading-none font-semibold uppercase">
				{{ $t('hero_tagline') }}
			</span>
 -->

		<ProseP class="md:max-w-3/4 my-8">
			{{ $t('approach_text') }}
		</ProseP>

		<UTheme :props="{
			button: {
				color: 'secondary',
				variant: 'solid',
				size: 'lg'
			},
		}">
			<div class="flex flex-wrap gap-2">
				<UButton
					to="#featured-work"
					:label="$t('btn_selected_work')"
					icon="i-ph-squares-four"
				/>
				<UButton
					to="#contact"
					:label="$t('btn_contact')"
					icon="i-ph-envelope-simple"
				/>
			</div>
		</UTheme>
	</header>
</template>