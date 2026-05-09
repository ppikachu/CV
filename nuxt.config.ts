// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/devtools",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxt/fonts",
  ],

  colorMode: {
    preference: "dark",
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  runtimeConfig: {
    public: {
      NAME: "Santiago Toyos",
      DESCRIPTION: "Diseñador con experiencia en contenido multimedia",
      OG_IMAGE: "/OG.png",
      TWITTER_IMAGE: "/twitter.png",
      ICON: "/icon.png",
      // used by useSeoMeta ogUrl:
      HOST:
        process.env.NODE_ENV === "production"
          ? "https://toyos.vercel.app"
          : "http://localhost:3000",
    },
  },

  i18n: {
    vueI18n: '~~/i18n.config.ts',
    locales: ['es', 'en'],
    defaultLocale: 'es',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    bundle: {
      optimizeTranslationDirective: false
    }
  },

  vite: {
    optimizeDeps: {
      include: ['@vercel/analytics']
    }
  },

  nitro: {
    experimental: {
      tasks: true
    }
  }
});