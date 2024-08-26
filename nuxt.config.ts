// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/devtools",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxthq/studio",
  ],

  googleFonts: {
    families: {
      "JetBrains Mono": [400, 600, 700],
    },
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
      DEFAULT_LANGUAGE: "es-AR",
      NAME: "Santiago Toyos",
      DESCRIPTION: "Diseñador con experiencia en contenido multimedia",
      OG_IMAGE: "/OG.png",
      TWITTER_IMAGE: "/twitter.png",
      ICON: "/icon.png",
      HOST:
        process.env.NODE_ENV === "production"
          ? "https://toyos.vercel.app"
          : "http://localhost:3000",
    },
  },

  content: {
    contentHead: false,
    markdown: {
      anchorLinks: false,
      // remarkPlugins: ["remark-unwrap-images"],
    },
  },

  i18n: {
    vueI18n: './i18n.config.ts'
  },

  //HACK: https://nuxt.com/docs/api/nuxt-config#compatibilitydate
  compatibilityDate: "2024-07-02",
});