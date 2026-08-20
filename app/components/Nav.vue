<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
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

const activeSection = ref('')

let stopObserver: (() => void) | undefined

function setupObserver() {
	stopObserver?.()
	if (!import.meta.client || !isHome.value) return

	const sectionIds = ['featured-work', 'more-work', 'experiments', 'contact']
	const targets = sectionIds
		.map(id => document.getElementById(id))
		.filter((el): el is HTMLElement => Boolean(el))

	if (!targets.length) return

	const { stop } = useIntersectionObserver(
		targets,
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					activeSection.value = entry.target.id
				}
			}
		},
		{
			rootMargin: '-20% 0px -70% 0px'
		}
	)
	stopObserver = stop
}

onMounted(() => {
	nextTick(() => setupObserver())
})

watch(isHome, (val) => {
	if (val) {
		nextTick(() => setupObserver())
	} else {
		stopObserver?.()
		activeSection.value = ''
	}
})

watch(() => route.hash, (hash) => {
	if (hash) {
		activeSection.value = hash.replace('#', '')
	}
}, { immediate: true })

onUnmounted(() => {
	stopObserver?.()
})

const navItems = computed<NavigationMenuItem[]>(() => {
	if (!isHome.value) return []
	return [
		{
			label: t('featured_work'),
			to: '#featured-work',
			active: activeSection.value === 'featured-work'
		},
		{
			label: t('more_work'),
			to: '#more-work',
			active: activeSection.value === 'more-work'
		},
		{
			label: t('experiments'),
			to: '#experiments',
			active: activeSection.value === 'experiments'
		},
		{
			label: t('btn_contact'),
			to: '#contact',
			active: activeSection.value === 'contact'
		},
	]
})
</script>

<template>
	<UHeader :to="homePath">
		<template #title>
			<div class="flex items-center gap-2">
				<NuxtImg
					src="/images/yo.png"
					alt="ST"
					class="rounded-full w-[30px] [image-rendering:pixelated]"
				/>
				<template v-if="!isHome">
					<span class="text-sm font-mono text-muted flex items-center gap-1">
						<UIcon name="i-ph-arrow-left" class="size-3" />
						<span>{{ $t('regresar') }}</span>
					</span>
				</template>
			</div>
		</template>

		<UNavigationMenu
			v-if="isHome"
			:items="navItems"
			highlight
			:ui="{
				item: 'py-0',
				link: 'uppercase after:bottom-0'
			}"
		/>

		<template #right>
			<ClientOnly>
				<LocaleToggle size="sm" />
			</ClientOnly>
		</template>

		<template #body>
			<UNavigationMenu
				v-if="isHome"
				:items="navItems"
				orientation="vertical"
				class="-mx-2.5"
				:ui="{
					link: 'text-primary uppercase'
				}"
			/>
		</template>
	</UHeader>
</template>
