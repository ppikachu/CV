<template>
	<div class="prose dark:prose-invert my-8">
		<h1 class="font-bold">Skills</h1>
	</div>
	<ContentQuery path="/skills" find="one" v-slot="{ data }">
		<div class="flex gap-2">
			<UBadge
				v-for="skill in data.tags"
				:key="skill"
				:label="skill"
			/>
		</div>
	</ContentQuery>
</template>