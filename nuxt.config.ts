export default defineNuxtConfig({
  compatibilityDate: '2026-05-09',
  
  experimental: {
    payloadExtraction: false
  },
  
  css: ['~/assets/css/global.css'],

  modules: [
    "@vueuse/nuxt",
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxt/fonts",
  ],

  ui: {
    prose: true
  },

  fonts: {
    families: [
      { name: 'Plus Jakarta Sans', weights: [400, 500, 600, 700, 800], global: true },
      { name: 'JetBrains Mono', weights: [400, 500, 600, 700, 800], global: true }
    ]
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
    fallback: "dark",
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
      DESCRIPTION: "Santiago Toyos — Designer / Creative Developer | Design · Motion · Interactive · Code",
      OG_IMAGE: "/OG.png",
      TWITTER_IMAGE: "/twitter.png",
      ICON: "/icon.png",
      // used by useSeoMeta ogUrl:
      HOST:
        process.env.NODE_ENV === "production"
          ? "https://toyos.vercel.app"
          : "http://localhost:3000",
      i18n: {
        baseUrl:
          process.env.NODE_ENV === "production"
            ? "https://toyos.vercel.app"
            : "http://localhost:3000",
      },
    },
  },

  i18n: {
    baseUrl:
      process.env.NODE_ENV === "production"
        ? "https://toyos.vercel.app"
        : "http://localhost:3000",
    vueI18n: 'i18n.config.ts',
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
    // experimental: {
    //   sqliteConnector: "native"
    // },
    // Habilita el SEO usando meta tags y Open Graph
    renderer: {
      anchorLinks: { h2: false, h3: false, h4: false }
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
