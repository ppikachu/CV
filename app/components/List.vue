<script lang="ts" setup>
interface ContentArticle {
	title?: string
	description?: string
	path: string
	image?: string
	tags?: string[]
	tipo?: string
}

const props = defineProps({
	tipo: {
		type: String,
		default: 'proyecto'
	}
})

const { locale } = useI18n()
const shortLoc = computed(() => locale.value.split('-')[0])

const { data: proyectos } = await useAsyncData<ContentArticle[]>(`list-${props.tipo}-${shortLoc.value}`, () => {
	return (queryCollection as any)('content')
	.where('path', 'LIKE', '/' + shortLoc.value + '/proyecto/%')
	.where('tipo','=', props.tipo)
	.select('title', 'description', 'path', 'image', 'tags', 'tipo')
	.all()
}, { watch: [shortLoc] })
</script>

<template>
		<div class="not-prose flex flex-col md:grid md:grid-cols-2 gap-8">
			<NuxtLink 
				v-for="article in proyectos" 
				:key="article.path" 
				:to="article.path"
				class="block group"
			>
				<UCard
					class="transition-all duration-300 hover:ring hover:ring-primary-500"
					:ui="{ root: 'ring-0 shadow-none', body: 'p-0 sm:p-0' }"
				>
					<div class="flex h-full">
						<NuxtImg
							v-if="article.image"
							:src="article.image"
							:alt="article.title"
							width="256"
							height="256"
							class="aspect-square max-w-24 max-h-24 object-cover object-center"
						/>

						<div class="flex flex-col p-3 gap-1 grow">
							<h4 class="font-bold text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
								{{ article.title || article.path.split('/').pop() }}
							</h4>
							<p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
								{{ article.description }}
							</p>
						</div>
						
						<div class="flex items-center pr-4">
							<ClientOnly>
								<UIcon 
									name="i-lucide-chevron-right" 
									class="w-5 h-5 group-hover:text-primary-500 group-hover:translate-x-1 transition-all"
								/>
							</ClientOnly>
						</div>
					</div>
				</UCard>
			</NuxtLink>
		</div>
</template>