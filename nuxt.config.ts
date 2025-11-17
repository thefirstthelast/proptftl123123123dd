// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  typescript: {
    shim: false,
  },

  compatibilityDate: "2025-07-15",

  devtools: { enabled: false },

  ssr: false,

  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/ui"],

  css: ["@/assets/styles/main.scss", "swiper/css", "@/assets/styles/main.css"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/utils/mixins.scss" as *;\n',
        },
      },
    },
  },
  
  app: {
    head: {
      charset: "utf-8",
      title: "Propozly",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "theme-color",
          content: "#0e0e0e",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          property: "og:image:width",
          content: "600",
        },
        {
          property: "og:image:height",
          content: "314",
        },
        {
          property: "og:image:type",
          content: "image/jpeg",
        },
        {
          property: "og:site_name",
          content: "Propozly",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "title",
          content: "Propozly",
        },
        {
          name: "description",
          content: "Description",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  runtimeConfig: {
    public: {
      dev_mode: Boolean(process.env.DEV_MODE),
      // Если бэкенд на том же домене, используем относительные пути или полный URL
      // По умолчанию ВСЕГДА используем пустую строку (относительные пути)
      // localhost используется ТОЛЬКО если явно задана переменная NUXT_PUBLIC_API_BASE=http://localhost:8000
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
      api_url: process.env.API_URL || process.env.NUXT_PUBLIC_API_BASE || '',
    },
  },
});
