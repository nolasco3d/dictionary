// import { BASE_URL_WORD_API } from './composables/utils';
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt', 
    '@nuxtjs/tailwindcss'],
  tailwindcss: {
    viewer: false
  },
  components: {
    global: true,
    dirs: ['~/components']
  },
  css: ['~/assets/css/global.css'],
  runtimeConfig: {
    public: {
      BASE_URL_WORD_API: 'https://api.dictionaryapi.dev/api/v2/entries/en/'
    }
  }
})
