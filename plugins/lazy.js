import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    observerOptions: {
        rootMargin: '0px',
        threshold: 0.1
      },    observer: true
})
