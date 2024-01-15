
import { content } from '#tailwind-config';
<template>
	<UContainer>
		<div class="my-10">
			<section class="prose dark:prose-invert" >
				<Header />
				<Social />
				<ContentDoc path="/about"/>
				<ContentDoc path="/experience"/>
				<ProseH1>Proyectos</ProseH1>
			</section>

			<Projects />

			<Skills />

		</div>
	</UContainer>
</template>