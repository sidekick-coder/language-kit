export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  modules: [
    '@nuxtjs/plausible',
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss: {
    configPath: '~/tailwind.config.ts'
  },
  content: {
    experimental: {
      clientDb: true
    }
  },
  app: {
    baseURL: process.env.BASE_URL,
  }
})
