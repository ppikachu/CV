<template>
	<section>
		<ContentQuery path="/skills" find="one" v-slot="{ data }">
			<div class="prose dark:prose-invert my-4">
				<ProseH1 class="font-bold">{{ data.title }}</ProseH1>
			</div>
			<div class="flex flex-wrap gap-2">
				<UBadge
					size="lg"
					variant="soft"
					v-for="skill in data.tags"
					:key="skill"
					:label="skill"
				/>
			</div>
		</ContentQuery>
	</section>
</template>