<template>
  <div class="not-prose my-4 no-print">
    <UButton
      :to="props.url"
      target="_blank"
      variant="solid"
      color="gray"
      block
      :ui="{
        color: {
          gray: {
            solid: 'bg-transparent dark:text-gray-400 hover:ring-primary hover:bg-transparent dark:hover:text-primary dark:bg-transparent dark:hover:ring-primary dark:hover:bg-transparent transition-all duration-400',
          },
        }
      }"
    >
      <ContentSlot />
      <template #trailing>
        <UIcon name="i-heroicons-arrow-right-20-solid" />
      </template>
    </UButton>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: 'Link'
  },
  url: {
    type: String,
    default: '#'
  }
})
</script>