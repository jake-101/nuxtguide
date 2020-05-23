<template>
  <div
    class="articlecard rounded overflow-hidden shadow-lg hover:shadow-2xl bg-white flex w-full flex-col stretch-items"
  >
    <nuxt-link :to="`/${article.type}/${article.slug}`">
      <img :src="article.image" />
    </nuxt-link>
    <div class="px-6 pt-4 pb-6 border-b border-brown-500 shadow-inner flex flex-col flex-grow">
      <nuxt-link
        tag="h2"
        class="cursor-pointer font-bold text-md md:text-xl mb-2 no-underline hover:underline leading-snug"
        v-unorphan
        :to="`/${article.type}/${article.slug}`"
      >{{article.title}}</nuxt-link>
      <p
        class="text-brown-800 md:text-sm text-base self-stretch flex-1"
        v-unorphan
      >{{article.short_desc}}</p>
      <ul class="text-xs flex text-brown-700 flex-initial">
        <li class="mt-3 mr-3">
          <font-awesome-icon class="text-xs" :icon="['fas', 'clock']" />
          <timeago class="text-xs" :datetime="article.updatedAt"></timeago>
        </li>
      </ul>
    </div>
    <div class="w-100 bg-brown-300 overflow-x-auto disable-scrollbars pl-4 pt-3 pb-2">
      <div class="w-max-content related-container">
        <nuxt-link
          tag="span"
          :to="`/${article.type}/`"
          class="cursor-pointer related-item inline-block bg-brown-800 hover:bg-brown-900 rounded px-3 py-1 text-xs font-semibold text-brown-100 shadow mr-1 mb-2"
        >{{article.type | capitalize}}</nuxt-link>
        <nuxt-link
          tag="span"
          :to="`/tagged/${tag}`"
          class="cursor-pointer related-item inline-block bg-white hover:bg-brown-200 border border-brown-500 hover:border-brown-600 rounded shadow px-3 py-1 text-xs text-brown-700 mr-1 mb-2"
          v-for="tag in article.tags"
          :key="tag"
        >{{tag}}</nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";

import ImageSrcSet from "~/components/ImageSrcSet";
export default {
  props: ["article"],
  components: { ImageSrcSet },
  methods: {
    getBg(type) {
      let item = this.$store.state.cats.find(function(elm) {
        return elm.uid === type;
      });
      return `background:${item.data.accent_color}`;
      console.log(item);
    }
  },
  computed: {}
};
</script>
// 
//               
//                if (x) {
//                let data = {views: x[0].views,likes: x[0].likes}
//         return data
//                }