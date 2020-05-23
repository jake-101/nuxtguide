<template>
  <div class="w-full">
    <ArticleGrid
      v-if="pages"
      :pagename="this.$route.params.type"
      :pagedesc="pagedesc"
      :griditems="pages"
    />
  </div>
</template>

<script>
import ArticleGrid from "~/components/ArticleGrid";
export default {
  head() {
    return {
      title: this.$route.params.type + " | Nuxt Guide",
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
      pagename: "",
      pagedesc: ""
    };
  },
  mounted() {
    this.$lozad.observe();
  },
  updated() {
    this.$lozad.observe();
  },
  components: { ArticleGrid },

  async asyncData({ $content, params }) {
    const pages = await $content("articles")
      .where({ type: `${params.type}` })
      .fetch();

    return {
      pages
    };
  }
};
</script>