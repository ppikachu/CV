<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { locale, t } = useI18n()
const route = useRoute()

const isHome = computed(() => {
	const path = route.path
	return path === '/' || path === '/es' || path === '/en' || path === '/es/' || path === '/en/'
})

const homePath = computed(() => {
	return locale.value.startsWith('en') ? '/en' : '/'
})

const navItems = computed<NavigationMenuItem[]>(() => {
	if (!isHome.value) return []
	return [
		{ label: t('featured_work'), to: '#featured-work' },
		{ label: t('more_work'), to: '#more-work' },
		{ label: t('experiments'), to: '#experiments' },
		{ label: t('archive_title'), to: '#archive' },
		{ label: t('btn_contact'), to: '#contact' },
	]
})
</script>

<template>
	<UHeader :to="homePath">
		<template #title>
			<span class="text-xs font-mono font-bold uppercase tracking-wider">ST</span>
			<template v-if="!isHome">
				<span class="text-muted text-xs font-mono">/</span>
				<span class="text-[11px] font-mono text-muted flex items-center gap-1 font-normal">
					<UIcon name="i-lucide-arrow-left" class="size-3" />
					<span>{{ $t('regresar') }}</span>
				</span>
			</template>
		</template>

		<UNavigationMenu v-if="isHome" :items="navItems" />

		<template #right>
			<ClientOnly>
				<UColorModeSwitch size="sm" />
				<LocaleToggle size="sm" />
			</ClientOnly>
		</template>

		<template #body>
			<UNavigationMenu v-if="isHome" :items="navItems" orientation="vertical" class="-mx-2.5" />
		</template>
	</UHeader>
</template>
