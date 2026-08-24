<script setup lang="ts">
import type { SpringOptions } from "motion-v";
import { motion, useMotionValue, useSpring } from "motion-v";
import { useMouse, useWindowSize, useElementVisibility, useMounted } from "@vueuse/core";

interface StarsBackgroundProps {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColor?: string;
  class?: string;
}

const props = withDefaults(defineProps<StarsBackgroundProps>(), {
  factor: 0.05,
  speed: 50,
  transition: () => ({ stiffness: 50, damping: 20 }),
  starColor: "#fff",
});

// For slot content
defineSlots();

const isMounted = useMounted();
const containerRef = ref<HTMLElement | null>(null);
const isVisible = useElementVisibility(containerRef);

const { x: mouseX, y: mouseY } = useMouse();
const { width: windowWidth, height: windowHeight } = useWindowSize();

function generateStars(count: number, starColor: string) {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(", ");
}

const offsetX = useMotionValue(0);
const offsetY = useMotionValue(0);

const springX = useSpring(offsetX, props.transition);
const springY = useSpring(offsetY, props.transition);

// Reactively calculate parallax offset when visible using VueUse
watch([mouseX, mouseY, isVisible], () => {
  if (!isVisible.value) return;
  const centerX = windowWidth.value / 2;
  const centerY = windowHeight.value / 2;
  offsetX.set(-(mouseX.value - centerX) * props.factor);
  offsetY.set(-(mouseY.value - centerY) * props.factor);
});

const boxShadow1 = ref("");
const boxShadow2 = ref("");
const boxShadow3 = ref("");
let generated = false;

function ensureStarsGenerated() {
  if (!generated) {
    boxShadow1.value = generateStars(1000, props.starColor);
    boxShadow2.value = generateStars(400, props.starColor);
    boxShadow3.value = generateStars(200, props.starColor);
    generated = true;
  }
}

watch(
  isMounted,
  (mounted) => {
    if (mounted) {
      ensureStarsGenerated();
    }
  },
  { immediate: true },
);

// Watch for starColor changes if already generated
watch(
  () => props.starColor,
  (newColor) => {
    if (generated) {
      boxShadow1.value = generateStars(1000, newColor);
      boxShadow2.value = generateStars(400, newColor);
      boxShadow3.value = generateStars(200, newColor);
    }
  },
);

const starLayer1Transition = computed(() => ({
  repeat: Infinity,
  duration: props.speed,
  ease: "linear",
}));

const starLayer2Transition = computed(() => ({
  repeat: Infinity,
  duration: props.speed * 2,
  ease: "linear",
}));

const starLayer3Transition = computed(() => ({
  repeat: Infinity,
  duration: props.speed * 3,
  ease: "linear",
}));
</script>

<template>
  <div
    ref="containerRef"
    :class="[
      'overflow-hidden bg-radial-[ellipse_55%_40%_at_50%_35%] from-slate-700 to-black',
      $attrs.class?.toString().includes('absolute') ? '' : 'relative',
      props.class,
    ]"
  >
    <motion.div
      v-if="isMounted"
      class="absolute inset-0 pointer-events-none"
      :style="{ x: springX, y: springY }"
    >
      <!-- Star Layer 1 -->
      <motion.div
        class="absolute top-0 left-0 h-[2000px] w-full pointer-events-none will-change-transform"
        :animate="{ y: [0, -2000] }"
        :transition="starLayer1Transition"
      >
        <div
          class="absolute rounded-full bg-transparent"
          :style="{
            width: '1px',
            height: '1px',
            boxShadow: boxShadow1,
          }"
        />
        <div
          class="absolute top-[2000px] rounded-full bg-transparent"
          :style="{
            width: '1px',
            height: '1px',
            boxShadow: boxShadow1,
          }"
        />
      </motion.div>

      <!-- Star Layer 2 -->
      <motion.div
        class="absolute top-0 left-0 h-[2000px] w-full pointer-events-none will-change-transform"
        :animate="{ y: [0, -2000] }"
        :transition="starLayer2Transition"
      >
        <div
          class="absolute rounded-full bg-transparent"
          :style="{
            width: '2px',
            height: '2px',
            boxShadow: boxShadow2,
          }"
        />
        <div
          class="absolute top-[2000px] rounded-full bg-transparent"
          :style="{
            width: '2px',
            height: '2px',
            boxShadow: boxShadow2,
          }"
        />
      </motion.div>

      <!-- Star Layer 3 -->
      <motion.div
        class="absolute top-0 left-0 h-[2000px] w-full pointer-events-none will-change-transform"
        :animate="{ y: [0, -2000] }"
        :transition="starLayer3Transition"
      >
        <div
          class="absolute rounded-full bg-transparent"
          :style="{
            width: '3px',
            height: '3px',
            boxShadow: boxShadow3,
          }"
        />
        <div
          class="absolute top-[2000px] rounded-full bg-transparent"
          :style="{
            width: '3px',
            height: '3px',
            boxShadow: boxShadow3,
          }"
        />
      </motion.div>
    </motion.div>

    <!-- Slot for child content -->
    <slot />
  </div>
</template>
