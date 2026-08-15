<template>
  <div class="mx-auto prose dark:prose-invert">
    <div v-if="data">
      <div class="not-prose space-y-4 pb-6">
        <div class="flex flex-col gap-2">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span v-if="data.category" class="text-xs uppercase tracking-widest text-primary-500 font-bold">
              {{ data.category }}
            </span>
            <div class="flex items-center gap-2">
              <span v-if="data.year" class="text-xs text-muted">
                {{ data.year }}
              </span>
              <UBadge v-if="data.wip" variant="outline" label="Work in progress" size="xs" />
            </div>
          </div>

          <ProseH1>
            {{ data.title }}
          </ProseH1>

          <p class="text-base sm:text-lg text-toned mt-2">
            {{ data.description }}
          </p>
        </div>

        <!-- Case Study Metadata Spec Bar -->
        <div
          v-if="data.role || data.client || (data.tags && data.tags.length)"
          class="flex flex-wrap items-center gap-x-8 gap-y-3 py-3.5 border-y border-default text-xs"
        >
          <div v-if="data.role" class="flex items-center gap-2">
            <span class="text-[10px] uppercase tracking-wider text-muted font-semibold">{{ $t('role_label') }}:</span>
            <span class="text-highlighted font-medium">{{ Array.isArray(data.role) ? data.role.join(' · ') : data.role }}</span>
          </div>

          <div v-if="data.client" class="flex items-center gap-2">
            <span class="text-[10px] uppercase tracking-wider text-muted font-semibold">{{ $t('client_label') }}:</span>
            <span class="text-highlighted font-medium">{{ data.client }}</span>
          </div>

          <div v-if="data.tags && data.tags.length" class="flex items-center gap-2">
            <span class="text-[10px] uppercase tracking-wider text-muted font-semibold">{{ $t('tech_label') }}:</span>
            <div class="flex flex-wrap gap-1">
              <UBadge
                v-for="tag in data.tags"
                :key="tag"
                :label="tag"
                variant="subtle"
                color="neutral"
                size="xs"
                class="text-[10px]"
              />
            </div>
          </div>
        </div>
      </div>

      <ContentRenderer :value="data" class="slide-enter-content" />

      <div class="not-prose my-10 flex flex-col sm:flex-row items-center gap-3">
        <UButton
          v-if="data.url"
          :to="data.url"
          :label="$t('web_url')"
          variant="solid"
          color="primary"
          target="_blank"
          icon="i-lucide-external-link"
          block
          class="sm:w-auto grow"
        />

        <UButton
          icon="i-lucide-arrow-left"
          :label="$t('regresar')"
          variant="outline"
          :to="homeFallback"
          block
          class="sm:w-auto cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

const shortLoc = computed(() => locale.value.split('-')[0])

const homeFallback = computed(() => {
  return shortLoc.value === 'en' ? '/en' : '/'
})

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
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const runtimeConfig = useRuntimeConfig()

useSeoMeta({
  title: data.value?.title ? `${data.value.title} · ${runtimeConfig.public.NAME}` : runtimeConfig.public.NAME,
  description: data.value?.description || runtimeConfig.public.DESCRIPTION,
  ogTitle: data.value?.title || runtimeConfig.public.NAME,
  ogDescription: data.value?.description || runtimeConfig.public.DESCRIPTION,
  ogImage: data.value?.image || runtimeConfig.public.OG_IMAGE,
  ogUrl: `${runtimeConfig.public.HOST}${route.path}`,
  twitterTitle: data.value?.title || runtimeConfig.public.NAME,
  twitterDescription: data.value?.description || runtimeConfig.public.DESCRIPTION,
  twitterImage: data.value?.image || runtimeConfig.public.TWITTER_IMAGE,
  twitterCard: 'summary_large_image'
})

useHead({
  htmlAttrs: {
    lang: () => locale.value
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: runtimeConfig.public.ICON
    }
  ]
})
</script>