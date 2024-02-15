<script setup>
// import { resolveLygia } from 'resolve-lygia'
import fragment from '~/assets/shaders/sdf1.frag?raw'
import GlslCanvas from 'glslCanvas'

/* Define props */
const props = defineProps({
	colorA: { type: Array, default: [ 1, 0, 0 ] },
	colorB: { type: Array, default: [ 0, 0, 1 ] },
	test: { type: Number, default: 1 },
})

// const fragShader = ref()
const heroCanvas = ref()
const sandbox = ref()
const $img = useImage()
const photo = $img('/images/DSC0787_sq.jpg')
const heroLoading = ref(photo ? true : false)

// Listeners
const { width, height } = useWindowSize()
const { y } = useWindowScroll()

watch([y,width,height], () => {
	// set chroma by scroll
	const pctCanvasScroll = (y.value/heroCanvas.value.clientHeight)*2
	sandbox.value.setUniform("u_scroll", pctCanvasScroll > 1 ?  1 : pctCanvasScroll)
	// set canvas resolution
	sandbox.value.setUniform("u_resolution", [heroCanvas.value.clientHeight, heroCanvas.value.clientWidth])
	}
)

onMounted(() => {
	// setup
	sandbox.value = new GlslCanvas(heroCanvas.value)
	heroCanvas.value.style.width = "50%"
	// heroCanvas.value.style.height = "50%"

	// resolve-lygia package:
	// fragShader.value = resolveLygia(fragment)
	// Load resolved shader:
	// sandbox.value.load(fragShader.value)
	// or load compiled shader:
	sandbox.value.load(fragment)
	// sandbox.value.render()
	heroLoading.value = false
})
</script>

<template>
	<div id="portada" class="absolute h-full top-0 left-0 right-0 z-0">
		<canvas
			ref="heroCanvas"
			width="300"
			height="300"
			class="absolute right-0 aspect-square h-min"
		>
		</canvas>
		<div id="heroLoading" v-show="heroLoading" class="fixed top-0 w-full h-full flex items-center justify-center bg-black text-gray-500 z-40">
			<UIcon name="i-mingcute-loading-3-fill" class="text-4xl animate-spin"/>
		</div>
	</div>
</template>