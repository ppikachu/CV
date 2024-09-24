<template>
  <div class="mx-auto prose dark:prose-invert">
    <ContentQuery :path="$route.path" find="one" v-slot="{ data }">
      <div class="prose-lg prose-a:no-underline my-8 slide-enter-content space-y-4">
        <div class="flex justify-between gap-2 w-full">
          <ProseH1 class="mb-0">{{ data.title }}</ProseH1>
          <UBadge v-if="data.wip" size="xs" variant="outline" label="Work in progress" class="h-fit mt-1 text-nowrap" />
        </div>
        <ProseH3 class="leading-tight">{{ data.description }}</ProseH3>
        <ProjectSkills v-if="data.tags" :skills="data.tags" />
      </div>
      <ContentRenderer :value="data" class="slide-enter-content" />

      <UButton
        v-if="data.url"
        :to="data.url"
        :label="$t('web_url')"
        target="_blank"
        icon="i-heroicons-arrow-top-right-on-square-16-solid"
        block
        class="not-prose my-8"
        :ui="{
          variant: {
            solid: 'bg-lime-700'
          }
        }"
      />
    </ContentQuery>

    <UButton
      size="lg"
      icon="i-heroicons-arrow-left-20-solid"
      :label="$t('regresar')"
      variant="solid"
      color="gray"
      @click="nuxtApp.$router.options.history.state.back ? nuxtApp.$router.back() : nuxtApp.$router.push('/')"
      block
      class="flex justify-center not-prose my-8"
      :ui="{
        color: {
          gray: {
            solid: 'bg-transparent hover:ring-lime-700 hover:bg-transparent hover:text-lime-700 dark:hover:text-primary dark:bg-transparent dark:hover:ring-primary dark:hover:bg-transparent transition-all duration-400',
          },
        }
      }"
    />
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp()
</script>