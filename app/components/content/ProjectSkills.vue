<script lang="ts" setup>
defineProps<{
  skills?: string[]
}>()
const route = useRoute()
</script>

<template>
  <section class="select-none flex gap-1 flex-wrap" :class="{ 'my-8': route.path.includes('proyecto') }">
    <UBadge
      v-for="(skill, i) in skills"
      :key="i"
      :label="skill"
      variant="outline"
      color="neutral"
      :ui="{
        base: 'rounded-full',
      }"
    />
  </section>
</template>