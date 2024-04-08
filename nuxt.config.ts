// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/devtools",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@nuxtjs/i18n",
  ],

  googleFonts: {
    families: {
      "JetBrains Mono": [400, 600, 700],
    },
  },

  ui: {
    icons: ["ph", "circle-flags"],
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
});
