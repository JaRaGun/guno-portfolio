// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  routeRules: {
    '/studio/**': { isr: false, prerender: false },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/google-fonts', {
      families: {
        'Exo 2': {
          ital: [700]
        },
        'Space Mono': [400, 700]
      },
      display: 'swap',
      preconnect: true,
      download: true
    }],
    '@nuxtjs/sanity'
  ],
  css: ['~/assets/css/main.css'],
  sanity: {
    projectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    visualEditing: {
      studioUrl: 'http://localhost:3333',
      stega: true,
    },
  },
})
