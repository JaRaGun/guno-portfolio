// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    preset: 'netlify'
  },
  modules: ['@nuxtjs/tailwindcss', ['@nuxtjs/google-fonts', {
    families: {
      'Exo 2': {
        ital: [700]
      },
      'Space Mono': [400, 700]
    },
    display: 'swap',
    preconnect: true,
    download: true
  }]],
  css: ['~/assets/css/main.css'],

})