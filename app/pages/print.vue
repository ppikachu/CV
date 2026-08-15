<template>
	<div class="light">
		<ProseH1>Santiago Toyos</ProseH1>
		<About />
		<Skills />
		<SocialPrint />
		<section>
			<ProseH1>Proyectos en curso</ProseH1>
			<ProseP>Proyectos en los que estoy involucrado actualmente:</ProseP>
			<CardPrint :current="true" />
		</section>
		<section>
			<ProseH1>Proyectos Destacados</ProseH1>
			<CardPrint :current="false" />
		</section>
	</div>
</template>