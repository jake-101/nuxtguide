<template>
  <div class="w-full">
    <ArticleGrid :pagename="pagename" :pagedesc="pagedesc" :griditems="pages" />

    <!-- <Pagination :page="page" /> -->
  </div>
</template>

<script>
import Pagination from "~/components/Pagination";
import ArticleGrid from "~/components/ArticleGrid";
export default {
  //     fetch ({ store, params,app }) {
  //         const ref = app.$fireStore
  //       .collection('likes')
  // store.dispatch('likesRef',ref)
  //   },
  head() {
    return {
      title: "Home | Nuxt Guide",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content:
            "A collection of modules, plugins, boilerplates, tutorials, and inspiration for Nuxt.js / Vue.js"
        }
      ]
    };
  },
  data: function() {
    return {
      pagename: "Nuxt Guide",
      pagedesc: `A hand-selected collection of modules, plugins, boilerplates, tutorials, inspiration and more for Nuxt.js`,
      pages: []
    };
  },
  mounted() {
    this.$lozad.observe();
  },
  updated() {
    this.$lozad.observe();
  },
  methods: {},
  components: { ArticleGrid, Pagination },

  async fetch() {
    const pages = await this.$content("articles").fetch();

    this.pages = this.pages.concat(pages);
  }
};
</script>