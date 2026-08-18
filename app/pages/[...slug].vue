<template>
  <div v-if="data" class="not-prose">
    <div class="mx-auto prose dark:prose-invert">
      <div class="not-prose space-y-4 pb-6">
        <!-- Metadata -->
        <div class="flex flex-col gap-2">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span v-if="data.category" class="text-xs uppercase tracking-widest text-primary font-mono font-bold">
              {{ data.category }}
            </span>
            <span v-if="data.year" class="text-xs text-muted font-mono">
              {{ data.year }}
            </span>
            <UBadge v-if="data.wip" size="sm" variant="outline" :label="$t('currently_badge')" />
          </div>

          <div class="flex flex-wrap items-center justify-between gap-4">
            <ProseH1 class="text-balance mt-0">
              {{ data.title }}
            </ProseH1>

            <UButton
              v-if="data.url"
              :to="data.url"
              target="_blank"
              :label="$t('see_live')"
              icon="i-ph-arrow-square-out"
              trailing
              variant="link"
              size="sm"
            />
          </div>
        </div>
      </div>

      <ContentRenderer :value="data" class="slide-enter-content" />
    </div>
    
    <!-- Case Study Details & Navigation Section -->
    <UPageSection
      :headline="data.title"
      :description="data.description"
      :links="links"
      :ui="{
        container: '',
        headline: 'uppercase text-lg justify-start',
        description: 'text-left',
        body: 'my-0',
        footer: 'mt-6'
      }"
    >
      <template #features>
        <UPageFeature
          v-for="(feature, index) in features"
          :key="index"
          v-bind="feature"
          :ui="{
            root: 'mt-8',
            title: 'text-base! font-mono uppercase',
            description: 'text-xs'
          }"
        />
      </template>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
import type { ButtonProps, PageFeatureProps } from '@nuxt/ui'

const route = useRoute()
const { locale, t } = useI18n()

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

const isGroup = computed(() => {
  return Boolean(data.value?.group || data.value?.isGroup)
})

const features = computed<PageFeatureProps[]>(() => [
  ...(isGroup.value
    ? [
        {
          icon: 'i-ph-squares-four',
          title: t('project_type_label'),
          description: t('project_group')
        }
      ]
    : []),
  ...(data.value?.role
    ? [
        {
          icon: 'i-ph-user',
          title: t('role_label'),
          description: Array.isArray(data.value.role) ? data.value.role.join(' · ') : data.value.role
        }
      ]
    : []),
  ...(data.value?.client
    ? [
        {
          icon: 'i-ph-buildings',
          title: t('client_label'),
          description: data.value.client
        }
      ]
    : []),
  ...(data.value?.tags && data.value.tags.length
    ? [
        {
          icon: 'i-ph-tag',
          title: t('tech_label'),
          description: data.value.tags.join(' · ')
        }
      ]
    : [])
])

const links = computed<ButtonProps[]>(() => [
  ...(data.value?.url
    ? [
        {
          label: t('web_url'),
          to: data.value.url,
          target: '_blank',
          icon: 'i-ph-arrow-square-out',
          color: 'primary' as const,
          variant: 'solid' as const
        }
      ]
    : [])
])

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