const pkg = require("./package");
const Prismic = require('prismic-javascript');

const prismicEndpoint = 'https://jake101.cdn.prismic.io/api/v2';

// TODO: Factor in Page Size > 100
const routes = () =>
	Prismic.getApi(prismicEndpoint)
		.then(api =>
			api.query('', {
        pageSize: 100
      			}),
		)
		.then(res => {
			if (res.total_pages > 1) {
				console.warn('we have more than 100 pages, fix it');
				process.exit(1);
			}
			return [
				'/',
				...res.results.map(page => `${page.uid.replace(/_/g, '/')}/`),
				'404',
			];
		});
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

  /*
   ** Plugins to load before mounting the App
   */
  lozad: {
    
      threshold: 0.7 // ratio of element convergence
  
  },
  plugins: [
    "~/plugins/filters",
    "~/plugins/timeago",
    { src: "~/plugins/menu", mode: "client" },
    { src: "~/plugins/lazy", mode: "client" }
  ],

  /*
   ** Nuxt.js modules
   */
  devModules: ["@nuxtjs/tailwindcss", "vue-unorphan/nuxt/module"],
  modules: [
    '@ax2/lozad-module',
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
    "nuxt-webfontloader",
    [
      "prismic-nuxt",
      {
        endpoint: "https://jake101.cdn.prismic.io/api/v2",
        deferLoad: true,
        linkResolver: function(doc, ctx) {
          return "/";
        }
      }
    ],
    [
      "nuxt-fire",
      {
        useOnly: ["auth", "firestore"],
        customEnv: false,
        config: {
          development: {
            apiKey: "AIzaSyDDsijKfPhn2xNjPapedWxgP4lkW_ltmdI",
            authDomain: "nuxtguide.firebaseapp.com",
            databaseURL: "https://nuxtguide.firebaseio.com",
            projectId: "nuxtguide",
            storageBucket: "nuxtguide.appspot.com",
            messagingSenderId: "486719329273",
            appId: "1:486719329273:web:18f14c6e6ddc3317"
          },
          production: {
            apiKey: "AIzaSyDDsijKfPhn2xNjPapedWxgP4lkW_ltmdI",
            authDomain: "nuxtguide.firebaseapp.com",
            databaseURL: "https://nuxtguide.firebaseio.com",
            projectId: "nuxtguide",
            storageBucket: "nuxtguide.appspot.com",
            messagingSenderId: "486719329273",
            appId: "1:486719329273:web:18f14c6e6ddc3317"
          }
        }
      }
    ]
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
  // router: {
  //   middleware: 'router-auth'
  // },
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  generate: {
    fallback: 'app.html',
    routes,
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
