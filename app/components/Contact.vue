<template>
  <section id="contact" class="flex flex-col items-center justify-center my-12">
    <NuxtImg src="/robot2.png" class="w-32 not-prose" />
    <ProseH1>{{ t('cta') }}</ProseH1>
    <UButton
      icon="i-ph-envelope-simple-bold"
      :label="t('contact')"
      size="xl"
      class="not-prose"
      variant="outline"
      to="mailto:ppikachu@gmail.com"
      :ui="{
        variant: {
          outline: 'ring-lime-700 hover:ring-primary text-lime-700 dark:hover:ring-primary hover:bg-transparent dark:hover:bg-transparent transition-all duration-400',
        }
      }"
    />
  </section>
</template>

<script lang="ts" setup>
const { t } = useI18n({
  useScope: 'local'
})
</script>

<i18n lang="json">
  {
    "en": {
      "cta": "Let's work together",
      "contact": "Contact"
    },
    "es": {
      "cta": "Trabajemos juntos",
      "contact": "Contacto"
    }
  }
</i18n>