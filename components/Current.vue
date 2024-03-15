
<template>
	<section>
		<ProseH1>{{ $t('proyectos_en_desarrollo') }}</ProseH1>
		<!-- <p>Proyectos en los que estoy involucrado actualmente:</p> -->
		<Card :current="true" />
	</section>
</template>