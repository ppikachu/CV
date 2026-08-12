<script setup lang="ts">
export interface Project {
	title?: string
	description?: string
	path: string
	image?: string
	tags?: string[]
	tipo?: string
	category?: string
	role?: string | string[]
	client?: string
	year?: string
	featured?: boolean
	url?: string
}

const props = withDefaults(defineProps<{
	project: Project
	variant?: 'featured' | 'card' | 'compact' | 'row'
}>(), {
	variant: 'card'
})
</script>

<template>
	<!-- FEATURED / CURRENT FLAGSHIP VARIANT -->
	<UCard
		v-if="variant === 'featured'"
		class="group overflow-hidden transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg"
		:ui="{
			root: 'overflow-hidden',
			body: 'p-0 sm:p-0',
			footer: 'p-4 sm:px-6'
		}"
	>
		<NuxtLink :to="project.path" class="block overflow-hidden aspect-video">
			<NuxtImg
				:src="project.image || '/images/web_kinoto_light-1620x769.png'"
				:alt="project.title"
				width="1620"
				height="769"
				class="w-full h-full object-cover object-center"
			/>
		</NuxtLink>

		<div class="p-6 space-y-4">
			<div class="space-y-1.5">
				<div class="flex flex-wrap items-baseline gap-2">
					<NuxtLink :to="project.path" class="hover:text-primary-500 transition-colors">
						<h3 class="text-2xl font-bold tracking-tight text-highlighted">
							{{ project.title }}
						</h3>
					</NuxtLink>
					<span v-if="project.category" class="text-xs font-mono text-muted">
						— {{ project.category }}
					</span>
				</div>
				<p class="text-sm text-muted leading-relaxed max-w-3xl">
					{{ project.description }}
				</p>
			</div>

			<div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-1.5 pt-1">
				<UBadge
					v-for="tag in project.tags.slice(0, 5)"
					:key="tag"
					:label="tag"
					size="xs"
					variant="outline"
					color="neutral"
					class="font-mono text-[11px]"
				/>
			</div>
		</div>

		<template #footer>
			<div class="flex flex-wrap items-center gap-3">
				<UButton
					:to="project.path"
					:label="$t('view_case_study')"
					icon="i-lucide-arrow-right"
					trailing
					variant="solid"
					color="primary"
					size="sm"
				/>
				<UButton
					v-if="project.url"
					:to="project.url"
					target="_blank"
					:label="$t('web_url')"
					icon="i-lucide-external-link"
					variant="ghost"
					color="neutral"
					size="sm"
				/>
			</div>
		</template>
	</UCard>

	<!-- STANDARD CARD / SELECTED WORK VARIANT -->
	<UCard
		v-else-if="variant === 'card'"
		class="group flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-primary-500/50 hover:shadow-md"
		:ui="{
			root: 'overflow-hidden h-full flex flex-col',
			body: 'p-0 sm:p-0 flex flex-col grow justify-between',
			footer: 'p-4 sm:px-5 flex items-center justify-between text-xs'
		}"
	>
		<div>
			<NuxtLink :to="project.path" class="block overflow-hidden aspect-video">
				<NuxtImg
					v-if="project.image"
					:src="project.image"
					:alt="project.title"
					width="800"
					height="500"
					class="w-full h-full object-cover object-center"
				/>
				<div v-else class="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400">
					<UIcon name="i-lucide-image" class="w-8 h-8" />
				</div>
			</NuxtLink>

			<div class="p-5 space-y-3">
				<div class="flex items-center justify-between gap-2">
					<span v-if="project.category" class="text-[11px] font-mono uppercase tracking-wider text-primary-500 font-semibold truncate">
						{{ project.category }}
					</span>
					<span v-if="project.year" class="text-[11px] font-mono text-muted shrink-0">
						{{ project.year }}
					</span>
				</div>

				<NuxtLink :to="project.path" class="block group-hover:text-primary-500 transition-colors">
					<h3 class="text-xl font-bold tracking-tight text-highlighted">
						{{ project.title || project.path.split('/').pop() }}
					</h3>
				</NuxtLink>

				<p class="text-xs text-muted line-clamp-2 leading-relaxed">
					{{ project.description }}
				</p>
			</div>
		</div>

		<div v-if="project.tags && project.tags.length" class="px-5 pb-4">
			<div class="flex flex-wrap gap-1">
				<UBadge
					v-for="tag in project.tags.slice(0, 4)"
					:key="tag"
					:label="tag"
					size="xs"
					variant="subtle"
					color="neutral"
					class="font-mono text-[10px]"
				/>
			</div>
		</div>

		<template #footer>
			<NuxtLink 
				:to="project.path" 
				class="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 group-hover:underline"
			>
				<span>{{ $t('view_case_study') }}</span>
				<UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
			</NuxtLink>
			
			<a
				v-if="project.url"
				:href="project.url"
				target="_blank"
				rel="noopener"
				class="text-xs text-muted hover:text-primary-500 inline-flex items-center gap-1 font-mono"
				@click.stop
			>
				<span>Live</span>
				<UIcon name="i-lucide-external-link" class="w-3 h-3" />
			</a>
		</template>
	</UCard>

	<!-- COMPACT / PERSONAL EXPERIMENTS VARIANT -->
	<UCard
		v-else-if="variant === 'compact'"
		class="group transition-all duration-300 hover:border-primary-500/50 flex flex-col justify-between"
		:ui="{
			body: 'p-4',
			footer: 'p-3 px-4 flex items-center justify-between text-xs'
		}"
	>
		<div class="flex gap-4 items-start">
			<NuxtLink :to="project.path" class="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-950">
				<NuxtImg
					v-if="project.image"
					:src="project.image"
					:alt="project.title"
					width="160"
					height="160"
					class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
				/>
			</NuxtLink>

			<div class="space-y-1 grow min-w-0">
				<div class="flex items-center justify-between gap-2">
					<NuxtLink :to="project.path" class="font-bold text-base text-highlighted group-hover:text-primary-500 transition-colors truncate">
						{{ project.title }}
					</NuxtLink>
					<span v-if="project.year" class="text-[10px] font-mono text-muted shrink-0">
						{{ project.year }}
					</span>
				</div>
				<p class="text-xs text-muted line-clamp-2 leading-relaxed">
					{{ project.description }}
				</p>
			</div>
		</div>

		<template #footer>
			<NuxtLink :to="project.path" class="text-primary-500 font-semibold inline-flex items-center gap-1 hover:underline">
				<span>{{ $t('ver_proyecto') }}</span>
				<UIcon name="i-lucide-arrow-right" class="w-3 h-3" />
			</NuxtLink>
			<a
				v-if="project.url"
				:href="project.url"
				target="_blank"
				rel="noopener"
				class="text-muted hover:text-primary-500 inline-flex items-center gap-1 font-mono text-[11px]"
			>
				<span>Demo</span>
				<UIcon name="i-lucide-external-link" class="w-3 h-3" />
			</a>
		</template>
	</UCard>

	<!-- ROW / ARCHIVE VARIANT -->
	<NuxtLink
		v-else-if="variant === 'row'"
		:to="project.path"
		class="block focus:outline-none"
	>
		<UCard
			class="group transition-all duration-300 hover:border-primary-500/50 hover:shadow-sm cursor-pointer"
			:ui="{
				body: 'p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3'
			}"
		>
			<div class="flex items-center gap-3 sm:gap-4 min-w-0">
				<span v-if="project.year" class="text-xs font-mono text-muted w-20 shrink-0 hidden sm:inline">
					{{ project.year }}
				</span>

				<!-- Thumbnail -->
				<div class="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-950 border border-default/50">
					<NuxtImg
						v-if="project.image"
						:src="project.image"
						:alt="project.title"
						width="96"
						height="96"
						class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
					/>
					<div v-else class="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
						<UIcon name="i-lucide-folder" class="w-5 h-5" />
					</div>
				</div>

				<div class="space-y-0.5 min-w-0">
					<div class="flex items-center gap-2">
						<span v-if="project.year" class="text-xs font-mono text-muted sm:hidden">
							{{ project.year }} ·
						</span>
						<h4 class="font-bold text-sm text-highlighted group-hover:text-primary-500 transition-colors truncate">
							{{ project.title }}
						</h4>
					</div>
					<p class="text-xs text-muted line-clamp-1">
						{{ project.description }}
					</p>
				</div>
			</div>

			<div class="flex items-center gap-3 self-end sm:self-center shrink-0">
				<UBadge
					v-if="project.category"
					:label="project.category"
					variant="subtle"
					color="neutral"
					size="xs"
					class="font-mono text-[10px] hidden md:inline-flex"
				/>
				<UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-muted group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all" />
			</div>
		</UCard>
	</NuxtLink>
</template>
