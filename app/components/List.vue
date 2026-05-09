<script lang="ts" setup>
const props = defineProps({
	tipo: {
		type: String,
		default: 'proyecto'
	}
})

const { locale } = useI18n()
const shortLoc = computed(() => locale.value.split('-')[0])

const { data: proyectos } = await useAsyncData(`list-${props.tipo}-${shortLoc.value}`, () => {
	return queryCollection('content')
	.where('path', 'LIKE', '/' + shortLoc.value + '/proyecto/%')
	.where('tipo','=', props.tipo)
	.all()
}, { watch: [shortLoc] })
</script>

<template>
	<div class="not-prose flex flex-col md:grid md:grid-cols-2 gap-8">
			<div
				v-for="article in proyectos"
				:key="article.path"
				class="flex group/item md:rounded-lg md:outline outline-1 outline-gray-200 dark:outline-gray-900 hover:dark:outline-primary transition-all duration-300 overflow-hidden"
			>
				<NuxtLink :to="article.path" class="w-full relative flex items-center">
					<NuxtImg
						v-if="article.image"
						:src="article.image"
						:alt="article.title"
						width="512"
						height="512"
						class="rounded-lg md:rounded-none aspect-square object-cover object-center w-28 md:h-full"
					/>

					<div class="flex flex-col grow leading-tight m-4 mr-0 gap-2">
						<h2 class="font-bold text-pretty">{{ article.title }}</h2>
						<p class="text-gray-700 dark:text-gray-400 md:text-sm">{{ article.description }}</p>
					</div>
						
					<UIcon name="i-heroicons-chevron-right-16-solid" class="w-8 h-8 self-center shrink-0 dark:md:group-hover/item:text-primary md:group-hover/item:translate-x-0.5 transition-all duration-400 delay-200"/>

				</NuxtLink>
			</div>
	</div>
</template>