<template>
  <section class="not-prose text-center flex flex-col items-center">
    <NuxtImg
      src="/robot2.png"
      alt="Santiago Toyos Mascot - Vintage robot watering an organic plant"
      class="w-18 md:w-28 h-auto mb-6"
      loading="lazy"
    />
    
    <div class="space-y-2 max-w-lg">
      <ProseH3 class="font-extrabold text-balanced!">
        {{ t('cta_title') }}
      </ProseH3>
      <ProseP class="text-xl sm:text-xl mb-0 font-bold">
        {{ t('cta_sub') }}
      </ProseP>
      <ProseP class="text-toned">
        {{ t('cta_desc') }}
      </ProseP>
    </div>

    <UButton
      icon="i-ph-envelope-simple"
      label="ppikachu@gmail.com"
      size="lg"
      variant="solid"
      color="primary"
      to="mailto:ppikachu@gmail.com"
    />

    <ProseP class="text-xs text-muted pt-2 font-mono">
      {{ $t('contact_location') }}
    </ProseP>
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
      "badge": "Get in touch",
      "cta_title": "Have something interesting in mind?",
      "cta_sub": "Let's make it.",
      "cta_desc": "For a new project, creative direction, interactive design, or technical execution:"
    },
    "es": {
      "badge": "Contacto",
      "cta_title": "¿Tenés un proyecto o idea en mente?",
      "cta_sub": "Hagámoslo realidad.",
      "cta_desc": "Para un nuevo proyecto, dirección creativa, diseño interactivo o ejecución técnica:"
    }
  }
</i18n>