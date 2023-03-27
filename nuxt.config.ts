export default defineNuxtConfig({
  /*
  * Build config
  */
  typescript: {
    strict: true,
  },

  css: ['~/assets/scss/main.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  /*
   * App config
   */
  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'active-exact',
    },
  },

  /*
   * Modules config
   */
  modules: [
    'nuxt-icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n-edge',
    '@vueuse/nuxt',

    // perfomance
    '@nuxtjs/critters',
    '@nuxtjs/fontaine',
  ],

  components: [
    '~/components',
    '~/components/_layouts',
  ],

  i18n: {
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        name: 'en',
        file: 'en-US.yml',
        iso: 'en-US',
      },
    ],
    vueI18n: './i18n.config.mjs',
    strategy: 'prefix_and_default',
    lazy: true,
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n',
    },
  },
})
