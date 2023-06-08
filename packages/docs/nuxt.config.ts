export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  modules: [
    '@nuxtjs/plausible',
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss'
  ],
  content: {
    experimental: {
      clientDb: true
    }
  },
  app: {
    baseURL: process.env.BASE_URL,
  }
})
