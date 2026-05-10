<template>
  <div class="mx-auto prose dark:prose-invert">
    <div v-if="data">
      <div class="prose-lg prose-a:no-underline my-8 slide-enter-content space-y-4">
        <div class="flex justify-between gap-2 w-full">
          <ProseH1 class="mb-0">{{ data.title }}</ProseH1>
          <UBadge v-if="data.wip" variant="outline" label="Work in progress" class="h-fit mt-1 text-nowrap" />
        </div>
        <ProseH3 class="leading-tight">{{ data.description }}</ProseH3>
        <ProjectSkills v-if="data.tags" :skills="data.tags" />
      </div>
      <ContentRenderer :value="data" class="slide-enter-content" />

      <UButton
        v-if="data.url"
        :to="data.url"
        :label="$t('web_url')"
        variant="outline"
        target="_blank"
        icon="i-heroicons-arrow-top-right-on-square-16-solid"
        block
        class="not-prose my-8"
      />
    </div>

    <UButton
      size="lg"
      icon="i-heroicons-arrow-left-20-solid"
      :label="$t('regresar')"
      variant="outline"
      @click="nuxtApp.$router.options.history.state.back ? nuxtApp.$router.back() : nuxtApp.$router.push('/')"
      block
      class="mt-8 mb-16 cursor-pointer"
    />
  </div>
</template>

<script setup>
const route = useRoute()
const nuxtApp = useNuxtApp()
const { locale } = useI18n()

const shortLoc = computed(() => locale.value.split('-')[0])

const localizedPath = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  if (segments[0] === 'es' || segments[0] === 'en') {
    segments.shift()
  }
  return `/${shortLoc.value}/${segments.join('/')}`
})

const { data } = await useAsyncData(`slug-${localizedPath.value}`, () => {
  return queryCollection('content').path(localizedPath.value).first()
}, { watch: [localizedPath] })

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description
})
</script>