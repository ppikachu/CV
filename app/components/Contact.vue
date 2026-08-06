<template>
  <section id="contact" class="flex flex-col items-center justify-center my-12">
    <NuxtImg src="/robot2.png" class="w-32 not-prose" />
    <ProseH1>{{ t('cta') }}</ProseH1>
    <UButton
      icon="i-lucide-mail"
      :label="t('contact')"
      size="xl"
      variant="outline"
      to="mailto:ppikachu@gmail.com"
      class="not-prose"
      :ui="{
        base: 'hover:ring-primary dark:hover:ring-primary hover:bg-transparent transition-all duration-400',
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