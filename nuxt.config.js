
const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  webfontloader: {

    custom: {
      families: ['Inter'],
      urls: ['/fonts/inter.css']
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */


  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/filters','~/plugins/timeago',{src:'~/plugins/menu',mode:'client'}
  ],

  /*
  ** Nuxt.js modules
  */
 devModules: [
  '@nuxtjs/tailwindcss','vue-unorphan/nuxt/module'
],
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    'nuxt-webfontloader',
    ['prismic-nuxt', {
      endpoint: 'https://jake101.cdn.prismic.io/api/v2',
      linkResolver: function(doc, ctx) {
        return '/'
      }
    }]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  generate: {
    fallback:true,

    // See https://github.com/nuxt-community/axios-module#options
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
