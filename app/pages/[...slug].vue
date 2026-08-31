<template>
  <div v-if="data" class="not-prose">
    <div class="mx-auto prose dark:prose-invert">
      <div class="not-prose space-y-4">
        <!-- Metadata -->
        <div class="flex flex-col gap-2 my-8">
          <div class="flex items-start justify-between gap-2 text-xs font-mono font-bold">
            <span v-if="data.category" class="uppercase text-primary/70">
              {{ data.category }}
            </span>
            <span v-if="data.year"class="text-muted shrink-0">
              {{ data.year }}
            </span>
            <UBadge v-if="data.wip"
              :label="$t('currently_badge')"
              size="sm"
              variant="outline"
              class="-mt-0.5"
            />
          </div>

          <div class="flex items-center justify-between gap-4">
            <ProseH1 class="text-balance text-4xl! mt-1 leading-none mt-0">
              {{ data.title }}
            </ProseH1>

            <UButton
              v-if="data.url"
              :to="data.url"
              target="_blank"
              :label="$t('see_live')"
              icon="i-pixelarticons-external-link"
              trailing
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
        container: 'py-4 sm:py-6 lg:py-8 bg-muted/30 rounded-xl my-16',
        headline: 'uppercase text-xl justify-start',
        description: 'text-left text-sm! text-wrap',
        body: 'mt-8',
        features: 'gap-2 sm:gap-4',
        footer: 'mt-6 sm:mt-8'
      }"
    >
      <template #features>
        <UPageFeature
          v-for="(feature, index) in features"
          :key="index"
          v-bind="feature"
          :ui="{
            root: 'my-0',
            wrapper: 'mb-0',
            title: 'text-base! font-mono uppercase mb-1',
            description: 'text-xs mt-0'
          }"
        />
      </template>
    </UPageSection>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import type { ButtonProps, PageFeatureProps } from '@nuxt/ui'

const route = useRoute()
const { locale, t } = useI18n()

const localizedPath = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  if (segments[0] === 'es' || segments[0] === 'en') {
    segments.shift()
  }
  return `/${locale.value}/${segments.join('/')}`
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
          title: t('project_type_label'),
          description: t('project_group')
        }
      ]
    : []),
  ...(data.value?.role
    ? [
        {
          title: t('role_label'),
          description: Array.isArray(data.value.role) ? data.value.role.join(' · ') : data.value.role
        }
      ]
    : []),
  ...(data.value?.client
    ? [
        {
          title: t('client_label'),
          description: data.value.client
        }
      ]
    : []),
  ...(data.value?.tags && data.value.tags.length
    ? [
        {
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
          icon: 'i-pixelarticons-external-link',
          trailing: true,
          color: 'primary' as const,
          variant: 'outline' as const
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
</script>