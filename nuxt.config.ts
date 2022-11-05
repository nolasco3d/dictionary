// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@vueuse/nuxt','@nuxtjs/tailwindcss'],
  tailwindcss: {
    viewer: false
  },
  components: {
    global: true,
    dirs: ['~/components']
  },
  css: ['~/assets/css/global.css']
})
