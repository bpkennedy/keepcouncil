import zlib from 'zlib'
import { faMeteor, faGamepad } from '@fortawesome/free-solid-svg-icons'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Shockball',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, viewport-fit=cover, initial-scale=1' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { hid: 'description', name: 'description', content: 'Star Wars fantasy sports - shockball!' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    ],
  },

  target: 'server',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // nuxt-compress
    'nuxt-compress',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/chakra
    '@chakra-ui/nuxt',
    // https://go.nuxtjs.dev/emotion
    '@nuxtjs/emotion',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // nuxt-compress for optimal file compression
  'nuxt-compress': {
    gzip: {
      filename: '[path][base].gz',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    },
    brotli: {
      filename: '[path][base].br',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    },
  },

  // Chakra UI Configuration
  chakra: {
    config: {
      autoImport: true,
    },
    icons: {
      // Here we state that we use `fa`
      // icons library for Chakra's
      // internal icon parser
      iconPack: 'fa',
      iconSet: {
        faMeteor,
        faGamepad,
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // analyze: true,  // enable this to show webpack build analyzer
  },
}
