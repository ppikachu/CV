<template>
	<ContentList path="/projects" v-slot="{ list }">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
			<UCard v-for="article in list" :key="article._path" :ui="{ body: { base: 'h-full', padding: 'px-2 py-2 sm:py-3 sm:px-3' } }">
				<div class="flex flex-col justify-between h-full">
					<div>
						<h3 class="font-bold">
							<NuxtLink v-if="article.url" :to="article.url" target="_blank" >{{ article.title }}</NuxtLink>
							<span v-else>{{ article.title }}</span>
						</h3>
						
						<div class="dark:prose-invert">
							<p class="text-gray-400 text-xs sm:text-sm mb-4">{{ article.description }}</p>
							<ContentRendererMarkdown :value="article" class="prose prose-sm text-xs dark:prose-invert" />
						</div>
					</div>
					<div v-if="article.tags" class="flex flex-wrap gap-2 mt-4">
						<UBadge
							v-for="tag in article.tags"
							:key="tag"
							:label="tag"
							color="white"
						/>
					</div>
				</div>
			</UCard>
		</div>
	</ContentList>
</template>