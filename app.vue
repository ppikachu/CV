
import { content } from '#tailwind-config';
<template>
	<UContainer>
		<div class="my-10">
			<section class="prose dark:prose-invert mx-auto" >
				<Header />
				<Social />
				<ContentDoc path="/about"/>
				<ContentDoc path="/experience"/>
				<Projects />
				<Skills />
			</section>

		</div>
	</UContainer>
</template>