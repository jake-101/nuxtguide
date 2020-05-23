<template>
  <div class="w-full">
    <ArticleGrid :page="page" :pagename="pagename" :pagedesc="pagedesc" :griditems="modules" />
  </div>
</template>

<script>
import ArticleGrid from "~/components/ArticleGrid";
export default {
  head() {
    return {
      title: this.$route.params.id + " | Nuxt Guide",
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
      pagename: this.$route.params.id,
      pagedesc: ""
    };
  },
  components: { ArticleGrid },
  mounted() {
    this.$lozad.observe();
  },
  updated() {
    this.$lozad.observe();
  },
  async asyncData({ $content, params }) {
    const pages = await $content("articles")
      .where({ tags: `${params.type}` })
      .fetch();

    return {
      pages
    };
  }
};
</script>