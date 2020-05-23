const pkg = require("./package");

module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  webfontloader: {
    custom: {
      families: ["Inter"],
      urls: ["/fonts/inter.css"]
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#FFFFFF" },

  /*
   ** Global CSS
   */
  serverMiddleware: ["~/server-middleware/setcache"],
  /*
   ** Plugins to load before mounting the App
   */
  lozad: {
    polyfill: true,
    observer: {
      rootMargin: "10px 0px", // syntax similar to that of CSS Margin
      threshold: 0.3 // ratio of element convergence
    }
  },
  css: [
    // Load a Node.js module directly (here it's a Sass file)
    "wysiwyg.css",
    "~assets/inter-subset.css"
  ],
  plugins: [
    "~/plugins/filters",
    "~/plugins/timeago",
    { src: "~/plugins/menu", mode: "client" },
    { src: "~/plugins/lazy", mode: "client" }
    // { src: "~/plugins/suggest", mode: "client" }
  ],

  /*
   ** Nuxt.js modules
   */
  devModules: ["@nuxtjs/tailwindcss", "@nuxt/content"],
  modules: [
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-886474-39"
      }
    ],
    "vue-unorphan/nuxt/module",
    "@ax2/lozad-module",
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios",
    [
      "nuxt-fontawesome",
      {
        imports: [
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: [
              "faGlobe",
              "faHome",
              "faSearch",
              "faHeart",
              "faEye",
              "faClock",
              "faLaptopCode"
            ]
          }
        ]
      }
    ],
    "nuxt-webfontloader"
  ],
  purgeCSS: {
    whitelist: [
      "sidemenu",
      "bm-burger-button",
      "bm-menu",
      "bm-burger-bars",
      "bm-cross",
      "lazy",
      "img",
      "lazyimg",
      "svg-inline--fa"
    ]

    // your settings here
  },
  /*
   ** Axios module configuration
   */
  router: {},
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  generate: {
    fallback: true
    // routes,
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
