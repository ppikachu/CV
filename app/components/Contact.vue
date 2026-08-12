<template>
  <section id="contact" class="my-16 not-prose">
    <div class="p-8 sm:p-12 rounded-3xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 text-center flex flex-col items-center justify-center space-y-6">
      <NuxtImg src="/robot2.png" alt="Santiago Toyos Mascot" class="w-28 drop-shadow-md" />
      
      <div class="space-y-2 max-w-lg">
        <p class="text-xs uppercase tracking-widest text-primary-500 font-semibold font-mono">
          {{ t('badge') }}
        </p>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          {{ t('cta_title') }}
        </h2>
        <p class="text-lg text-primary-600 dark:text-primary-400 font-medium">
          {{ t('cta_sub') }}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 pt-1">
          {{ t('cta_desc') }}
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-3">
        <UButton
          icon="i-lucide-mail"
          label="ppikachu@gmail.com"
          size="lg"
          variant="solid"
          color="primary"
          to="mailto:ppikachu@gmail.com"
        />
        <UButton
          icon="i-lucide-linkedin"
          label="LinkedIn"
          size="lg"
          variant="outline"
          color="neutral"
          to="https://www.linkedin.com/in/santiagotoyos/"
          target="_blank"
        />
        <UButton
          icon="i-lucide-github"
          label="GitHub"
          size="lg"
          variant="outline"
          color="neutral"
          to="https://github.com/ppikachu"
          target="_blank"
        />
      </div>

      <div class="text-[11px] font-mono text-gray-600 dark:text-gray-400 pt-2">
        Buenos Aires, Argentina · Available Worldwide
      </div>
    </div>
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
      "cta_desc": "For a new project, design consultation, creative code, or just to say hello:"
    },
    "es": {
      "badge": "Contacto",
      "cta_title": "¿Tenés un proyecto o idea en mente?",
      "cta_sub": "Hagámoslo realidad.",
      "cta_desc": "Para un nuevo proyecto, consultoría de diseño, creative code o simplemente saludar:"
    }
  }
</i18n>