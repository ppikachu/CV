<template>
	<UContainer>
		<div class="my-10">
			<ClientOnly>
				<section class="prose dark:prose-invert" >
					<Header />
					<Social />
					<ContentDoc path="/about"/>
					<h1>Work Experience</h1>
				</section>
			</ClientOnly>

			<ContentList path="/projects" v-slot="{ list }">
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
					<UCard v-for="article in list" :key="article._path" :ui="{ body: { base: 'h-full' } }">
						<div class="flex flex-col justify-between h-full">
							<div class="prose prose-sm dark:prose-invert">
								<h3 class="font-bold mb-4">{{ article.title }}</h3>
								<!-- <p>{{ article.description }}</p> -->
								<ContentRendererMarkdown :value="article" />
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

			<Skills />

		</div>
	</UContainer>
</template>