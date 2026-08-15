<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()

const isHome = computed(() => {
	const path = route.path
	return path === '/' || path === '/es' || path === '/en' || path === '/es/' || path === '/en/'
})

const homePath = computed(() => {
	return locale.value.startsWith('en') ? '/en' : '/'
})

const navLinks = computed(() => [
	{ label: 'featured_work', to: '#featured-work' },
	{ label: 'more_work', to: '#more-work' },
	{ label: 'archive_title', to: '#archive' },
	{ label: 'btn_contact', to: '#contact' },
])
</script>

<template>
	<nav class="sticky top-0 z-50 bg-default/80 backdrop-blur-md border-b border-muted/20 not-prose" aria-label="Main navigation">
		<div class="max-w-4xl mx-auto px-4 flex items-center justify-between h-11">
			<div class="flex items-center gap-3">
				<NuxtLink
					:to="homePath"
					class="text-xs font-mono font-bold text-default uppercase tracking-wider hover:text-primary transition-colors flex items-center gap-1.5"
					aria-label="Santiago Toyos Home"
				>
					<span>ST</span>
				</NuxtLink>
				<span v-if="!isHome" class="text-muted text-xs font-mono">/</span>
				<NuxtLink
					v-if="!isHome"
					:to="homePath"
					class="text-[11px] font-mono text-muted hover:text-primary transition-colors flex items-center gap-1"
				>
					<UIcon name="i-lucide-arrow-left" class="size-3" />
					<span>{{ $t('regresar') }}</span>
				</NuxtLink>
			</div>

			<div v-if="isHome" class="hidden sm:flex items-center gap-4">
				<a
					v-for="link in navLinks"
					:key="link.to"
					:href="link.to"
					class="text-[11px] font-mono text-muted uppercase tracking-wider hover:text-primary transition-colors"
				>
					{{ $t(link.label) }}
				</a>
			</div>

			<div class="flex items-center gap-2">
				<ClientOnly>
					<UColorModeSwitch
						size="sm"
						aria-label="Toggle color mode"
						:ui="{
							base: 'data-[state=checked]:bg-muted data-[state=unchecked]:bg-muted',
							icon: 'group-data-[state=checked]:text-muted group-data-[state=unchecked]:text-muted',
						}"
					/>
					<LocaleToggle size="sm" />
				</ClientOnly>
			</div>
		</div>
	</nav>
</template>
