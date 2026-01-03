// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],


  css: ['~/assets/css/main.css'],
  debug: true,

  vite: {
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
    }
  },
})