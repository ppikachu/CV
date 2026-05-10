<template>
  <div class="not-prose my-4 no-print">
    <UButton
      :to="props.url"
      target="_blank"
      variant="outline"
      block
      icon="i-heroicons-arrow-right-20-solid"
      class="[&>p]:m-0"
    >
      <slot>{{ props.label || $t('ver_proyecto') }}</slot>
    </UButton>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: String,
  url: String
})
</script>