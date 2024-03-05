<template>
	<section>
		<ContentQuery path="/skills" find="one" v-slot="{ data }">

			<ContentRenderer :value="data" />

			<div class="prose dark:prose-invert my-4">
				<ProseH1>{{ data.title }}</ProseH1>
			</div>

			<div class="flex flex-wrap gap-2">
				<UBadge
					size="lg"
					variant="outline"
					color="white"
					:ui="{ variant: { outline: 'ring-gray-200 dark:ring-gray-800' } }"
					v-for="skill in data.tags"
					:key="skill"
					:label="skill"
				/>
			</div>
		</ContentQuery>
	</section>
</template>