<template>
  <section class="flex gap-1 flex-wrap" :class="{ 'my-8': route.path.includes('proyecto') }">
    <UBadge
      v-for="skill, i in skills"
      :key="i"
      :label="skill"
      variant="outline"
      color="gray"
      :ui="{
        variant: { outline: 'ring-gray-200 dark:ring-gray-800' },
        rounded: 'rounded-full'
      }"
    />
  </section>
</template>

<script lang="ts" setup>
const props = defineProps({ skills: Array<string> })
const route = useRoute()
</script>