<script setup lang="ts">
definePageMeta({
	layout: 'print',
	colorMode: 'light'
})

const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()

useHead({
	title: `${runtimeConfig.public.NAME} — CV`
})

function printPage() {
	if (import.meta.client) {
		window.print()
	}
}
</script>

<template>
	<div>
		<!-- Print Button (hidden when printing) -->
		<div class="print-no-print flex justify-end mb-6">
			<UButton
				icon="i-pixelarticons-printer"
				:label="t('print_btn')"
				color="neutral"
				variant="subtle"
				:ui="{ label: 'overflow-visible' }"
				@click="printPage"
			/>
		</div>

		<!-- Header: Name + Role + Contact -->
		<header class="not-prose mb-5">
			<h1 class="text-4xl font-extrabold font-heading tracking-tight mb-1">
				Santiago Toyos
			</h1>
			<p class="text-lg font-bold mb-1">{{ t('role') }}</p>
			<p class="text-sm font-mono mb-2">{{ t('contact_location') }}</p>
			<SocialPrint />
		</header>

		<!-- About -->
		<section class="mb-3">
			<About />
		</section>

		<!-- Skills (static, print-friendly) -->
		<SkillsPrint />

		<!-- Current Projects (featured) -->
		<section>
			<h2 class="text-xl font-heading font-extrabold tracking-tight mt-8 mb-4">
				{{ t('print_current_projects') }}
			</h2>
			<CardPrint :tipos="['featured']" />
		</section>

		<!-- Selected Projects (more work) -->
		<section>
			<h2 class="text-xl font-heading font-extrabold tracking-tight mt-8 mb-4">
				{{ t('print_selected_projects') }}
			</h2>
			<CardPrint :tipos="['more']" />
		</section>
	</div>
</template>

<style scoped>
@media print {
	hr {
		border-color: #d4d4d4;
		margin: 0.5rem 0;
	}
}
</style>