<template>
<div class="w-full">

  <ArticleGrid :page="page" :pagename="pagename" :pagedesc="pagedesc" :griditems="modules"/>
  </div>
</template>

<script>
import ArticleGrid from '~/components/ArticleGrid'
export default {
      head () {
    return {
      title: this.$route.params.id + ' | Nuxt Guide',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'A collection of modules, plugins, boilerplates, tutorials, and inspiration for Nuxt.js / Vue.js' }
      ]
    }
  },
  data: function () {
    return {
     pagename: this.$route.params.id,
     pagedesc: ""
    }
  },
  components: {ArticleGrid},
  async asyncData({ app, error,params }) {
    let document = await app.$prismic.api.query([app.$prismic.predicates.at('document.type', 'posts'),app.$prismic.predicates.at("document.tags", [params.id])],{ fetchLinks: ['category.title','category.accent_color'],orderings : '[document.last_publication_date desc]' }

    );
    let guidedoc = {}

    return {
        page: {
        results: document.results_size,
        perPage: document.results_per_page,
        totalPages: document.total_pages,
        totalResults: document.total_results_size
      },
      modules: document.results.map(result => {
        return {
          meta: {
            id: result.id,
            uid: result.uid,
            lang: result.lang,
            publicationDate: app.$prismic.asDate(result.first_publication_date),
            tags: result.tags,
            type: result.category.uid,
            slug: result.slugs[0]
          },
          title: app.$prismic.asText(result.data.title),
          short_desc: result.data.short_description,
          image: result.data.post_image,
          result: result,
          date: result.last_publication_date
        };
      }),

    };
  }
};
</script>