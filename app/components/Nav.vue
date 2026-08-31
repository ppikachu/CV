<script setup lang="ts">
import { Motion } from 'motion-v'
import type { NavigationMenuItem } from '@nuxt/ui/components/NavigationMenu.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()

const NAV_SECTIONS = [
	{ id: 'what-i-do', labelKey: 'what_i_do' },
	{ id: 'featured-work', labelKey: 'featured_work' },
	{ id: 'experiments', labelKey: 'experiments' },
	{ id: 'faqs', labelKey: 'nav_faqs' },
	{ id: 'contact', labelKey: 'btn_contact' }
] as const

const homePath = computed(() => localePath('/'))
const isHome = computed(() => route.path === homePath.value || route.path === `${homePath.value}/`)

const activeSection = ref('')
const isMenuOpen = ref(false)

let stopObserver: (() => void) | undefined

function onNavClick(id: string) {
	isMenuOpen.value = false
	activeSection.value = id
	if (!import.meta.client) return

	if (!isHome.value) {
		navigateTo(localePath({ path: '/', hash: `#${id}` }))
		return
	}

	// Update the URL hash
	router.replace({ hash: `#${id}` })

	// Wait for the modal/drawer to close and release body scroll-lock
	setTimeout(() => {
		const target = document.getElementById(id)
		target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

const navItems = computed<NavigationMenuItem[]>(() =>
	NAV_SECTIONS.map(({ id, labelKey }) => ({
		label: t(labelKey),
		to: isHome.value ? `#${id}` : localePath({ path: '/', hash: `#${id}` }),
		active: isHome.value && activeSection.value === id,
		onSelect: () => onNavClick(id)
	}))
)
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
