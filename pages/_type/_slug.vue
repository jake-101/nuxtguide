<template class="flex justify-center items-center">
  <section class="flex flex-wrap justify-left flex-row lg:flex-row md:ml-3 w-full lg:max-w-6xl">
    <ArticleCard
      index="0"
      key="top"
      class="w-full flex flex-col mb-8 rounded overflow-hidden rounded shadow-lg"
    >
      <div>
        <img :src="this.page.image" class="in w-full h-full object-center object-cover" />
      </div>
    </ArticleCard>
    <ArticleCard index="1" key="main" class="w-full pb-1 flex flex-row flex-wrap">
      <div
        class="rounded overflow-hidden shadow-lg bg-white flex flex-col border-t-8 w-full lg:w-3/4 xl:w-2/3 border-brown-800 mb-8"
      >
        <div class="px-6 pt-4 pb-4 border-b-2 border-brown-300">
          <h2
            style="--animation-order: 2;"
            class="in font-bold text-3xl md:text-4xl mb-3 inline-block mt-4"
            v-unorphan
          >{{this.page.title}}</h2>
          <p class="text-brown-700 text-lg mb-2 leading-relaxed">
            <nuxt-link
              style="--animation-order: 3;"
              tag="span"
              :to="`/${this.page.type}/`"
              class="in cursor-pointer inline bg-brown-800 hover:bg-brown-900 rounded px-3 py-1 text-xs font-semibold text-brown-100 shadow-inner mr-1 mb-2"
            >{{this.page.type | capitalize}}</nuxt-link>
            <span style="--animation-order: 4;" class="in" v-unorphan>{{this.page.short_desc}}</span>
          </p>
        </div>
        <div
          style="--animation-order: 5;"
          class="in px-6 pt-8 pb-8 border-b border-brown-400 flex-grow leading-loose description text-brown-800 wysiwyg"
        >
          <nuxt-content :document="page" />
        </div>
        <div class="w-100 overflow-x-auto bg-brown-300">
          <!-- <div style="--animation-order: 6;" class="in pl-4 pt-4 pb-4">
            <span v-if="links">
              <a
                v-for="l in links"
                :key="l.link_url.url"
                :target="l.link_url.target"
                :href="l.link_url.url"
              >
                <button
                  class="bg-brown-800 hover:bg-brown-900 text-white font-bold py-2 px-4 mr-1 rounded"
                >{{l.link_type}}</button>
              </a>
            </span>
            <a v-if="link" :href="link">
              <button
                class="bg-brown-800 hover:bg-brown-900 text-white font-bold py-2 px-4 rounded"
              >
                <font-awesome-icon :icon="['fas', 'home']" />Homepage
              </button>
            </a>
            <a v-if="demolink" :href="demolink">
              <button
                class="bg-brown-800 hover:bg-brown-900 text-white font-bold py-2 px-4 rounded"
              >
                <font-awesome-icon :icon="['fas', 'laptop-code']" />Demo
              </button>
            </a>
            <a v-if="authorlink" :href="authorlink">
              <button
                class="bg-brown-800 hover:bg-brown-900 text-white font-bold py-2 px-4 rounded"
              >Author</button>
            </a>
          </div>-->
        </div>
      </div>
      <ArticleCard
        index="2"
        key="meta"
        class="w-full md:w-1/3 lg:w-1/4 xl:w-1/3 pb-1 flex flex-col order-3 md:order-none"
      >
        <div class="lg:pl-3">
          <!-- <div class="w-full py-3 mb-3 px-3 bg-gray-300 text-gray-800 rounded">
            <h2>Meta</h2>
          </div>-->
          <!-- <ul class="text-xs flex text-gray-700 flex-initial mb-4" v-if="pageLikes || views">
            <li
              class="h-16 flex items-center justify-center w-1/2 py-2 mb-3 mr-2 px-3 bg-white rounded"
              v-if="views"
            >
              <font-awesome-icon class="mr-1" :icon="['fas', 'eye']"/>
              {{views}}
            </li>
            <li @click="toggleLike" v-bind:class="{ liked: isLiked }"
              class="cursor-pointer h-16 items-center justify-center flex w-1/2 py-2 mb-3 px-3 bg-white rounded"
            
            >
              <font-awesome-icon class="mr-1" :icon="['fas', 'heart']"/>

              {{pageLikes}}
            </li>
          </ul>-->
          <div
            style="--animation-order: 7;"
            class="w-full py-3 mb-3 px-3 bg-gray-300 text-gray-800 rounded"
          >
            <h2>Tag</h2>
          </div>
          <div style="--animation-order: 8;" class="mt-2 mb-4">
            <n-link
              tag="span"
              :to="`/tagged/${tag}`"
              class="cursor-pointer inline-block bg-white rounded shadow px-3 py-1 text-xs text-gray-700 mr-1 mb-1"
              v-for="tag in this.page.tags"
              :key="tag"
            >{{tag}}</n-link>
          </div>
          <span class="inline-block pr-3 py-1 text-xs text-xs text-gray-700 mr-1 mb-2">
            <font-awesome-icon :icon="['fas', 'clock']" />Last updated
            <timeago :datetime="this.page.updatedAt"></timeago>
          </span>
        </div>
      </ArticleCard>
      <!-- <RelatedItems
        v-if="related.length"
        class="md:pl-2 md:pr-2 lg:pr-0 xl:w-2/3 md:w-2/3 lg:w-3/4 order-last md:order-none"
        :items="related"
      />-->
    </ArticleCard>
  </section>
</template>

<script>
import ArticleCard from "~/components/ArticleCard";
import RelatedItems from "~/components/RelatedItems";
import ImageSrcSet from "~/components/ImageSrcSet";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
export default {
  transition: {
    name: "slugfade",
    mode: "out-in"
  },
  head() {
    return {
      title: this.page.title + " | Nuxt Guide",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.page.short_desc
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.page.short_desc
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `https://nuxtguide.site/${this.page.type}/${this.page.slug}`
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.page.image
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.page.title
        },
        {
          hid: "twitter:site",
          name: "twitter:site",
          content: "@nuxtguide"
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.page.short_desc
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.page.image
        }
      ]
    };
  },
  data: function() {
    return {
      mylikes: []
    };
  },
  components: { ArticleCard, RelatedItems, ImageSrcSet },

  async asyncData({ $content, params }) {
    const page = await $content("articles", params.slug).fetch();

    return {
      page
    };
  },
  mounted() {
    this.$lozad.observe();
  },

  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    // getBg(type) {
    //   let item = this.$store.state.cats.find(function(elm) {
    //     return elm.uid === type;
    //   });
    //   return `background:${item.data.accent_color}`;
    //   console.log(item);
    // }
  }
};
</script>
<style>
.liked svg path {
  fill: red;
}
.description a {
  text-decoration: none;
  font-weight: 600;
  color: #211b18;
}
.description a:hover {
  text-decoration: underline;
}
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
}

.video-container iframe,
.video-container object,
.video-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>