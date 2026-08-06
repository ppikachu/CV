export default defineNuxtConfig({
  compatibilityDate: '2026-05-09',
  
  experimental: {
    payloadExtraction: false
  },
  
  css: ['~/assets/css/global.css'],

  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/devtools",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxt/fonts",
  ],

  ui: {
    prose: true
  },

  icon: {
    clientBundle: {
      scan: {
        globInclude: ['**/*.{vue,jsx,tsx,md,mdc,mdx,json}']
      }
    },
    serverBundle: {
      collections: ['ph', 'circle-flags', 'lucide']
    }
  },

  colorMode: {
    preference: "dark",
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  devtools: {
    enabled: false,
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
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
    },
  },

  vite: {
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
    },
    optimizeDeps: {
      include: ['@vercel/analytics'],
      exclude: [
        '@nuxtjs/mdc > remark-gfm',
        '@nuxtjs/mdc > remark-emoji',
        '@nuxtjs/mdc > remark-mdc',
        '@nuxtjs/mdc > remark-rehype',
        '@nuxtjs/mdc > rehype-raw',
        '@nuxtjs/mdc > parse5',
        '@nuxtjs/mdc > unist-util-visit',
        '@nuxtjs/mdc > unified',
        '@nuxtjs/mdc > debug',
        '@nuxtjs/mdc > extend'
      ]
    }
  },

  content: {
    experimental: {
      sqliteConnector: "native"
    }
  },

  nitro: {
    experimental: {
      tasks: true
    },
    externals: {
      external: ['sharp']
    }
  }
});