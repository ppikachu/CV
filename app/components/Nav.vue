<script setup lang="ts">
import { Motion } from 'motion-v'
import { useIntersectionObserver } from '@vueuse/core'
import type { NavigationMenuItem } from '@nuxt/ui'

const { locale, t } = useI18n()
const route = useRoute()
const router = useRouter()

const isHome = computed(() => {
	const path = route.path
	return path === '/' || path === '/es' || path === '/en' || path === '/es/' || path === '/en/'
})

const homePath = computed(() => {
	return locale.value.startsWith('en') ? '/en' : '/'
})

const activeSection = ref('')
const isMenuOpen = ref(false)

let stopObserver: (() => void) | undefined

function onNavClick(id: string) {
	isMenuOpen.value = false
	activeSection.value = id
	if (!import.meta.client) return

	// Update the URL hash
	router.replace({ hash: `#${id}` })

	// Wait for the modal/drawer to close and release body scroll-lock
	setTimeout(() => {
		const target = document.getElementById(id)
		if (target) {
			target.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}, 150)
}

function setupObserver() {
	stopObserver?.()
	if (!import.meta.client || !isHome.value) return

	const sectionIds = ['featured-work', 'what-i-do', 'timeline', 'more-work', 'experiments', 'faqs', 'contact']
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
	if (route.hash) {
		activeSection.value = route.hash.replace('#', '')
	}
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
})

onUnmounted(() => {
	stopObserver?.()
})

const navItems = computed<NavigationMenuItem[]>(() => {
	if (!isHome.value) return []
	return [
		{
			label: t('featured_work'),
			to: '#featured-work',
			active: activeSection.value === 'featured-work',
			onSelect: () => onNavClick('featured-work')
		},
		{
			label: t('what_i_do'),
			to: '#what-i-do',
			active: activeSection.value === 'what-i-do',
			onSelect: () => onNavClick('what-i-do')
		},
		{
			label: t('nav_timeline'),
			to: '#timeline',
			active: activeSection.value === 'timeline',
			onSelect: () => onNavClick('timeline')
		},
		{
			label: t('more_work'),
			to: '#more-work',
			active: activeSection.value === 'more-work',
			onSelect: () => onNavClick('more-work')
		},
		{
			label: t('experiments'),
			to: '#experiments',
			active: activeSection.value === 'experiments',
			onSelect: () => onNavClick('experiments')
		},
		{
			label: t('nav_faqs'),
			to: '#faqs',
			active: activeSection.value === 'faqs',
			onSelect: () => onNavClick('faqs')
		},
		{
			label: t('btn_contact'),
			to: '#contact',
			active: activeSection.value === 'contact',
			onSelect: () => onNavClick('contact')
		},
	]
})
</script>

<template>
	<UHeader v-model:open="isMenuOpen" :to="homePath">
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
		>
			<template #item-label="{ item, index }">
				<Motion
					:initial="{ opacity: 0, y: -8 }"
					:animate="{ opacity: 1, y: 0 }"
					:transition="{ duration: 0.35, delay: index * 0.04, ease: [0.25, 1, 0.5, 1] }"
				>
					<span>{{ item.label }}</span>
				</Motion>
			</template>
		</UNavigationMenu>

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
					link: 'text-primary text-xl font-heading font-extrabold uppercase'
				}"
			>
				<template #item-label="{ item, index }">
					<Motion
						:initial="{ opacity: 0, x: -16 }"
						:animate="{ opacity: 1, x: 0 }"
						:transition="{ duration: 0.35, delay: index * 0.04, ease: [0.25, 1, 0.5, 1] }"
					>
						<span>{{ item.label }}</span>
					</Motion>
				</template>
			</UNavigationMenu>
		</template>
	</UHeader>
</template>
