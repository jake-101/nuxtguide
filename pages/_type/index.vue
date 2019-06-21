<template>
<div class="w-full">
  <ArticleGrid :pagename="this.$route.params.type" :pagedesc="pagedesc" :griditems="modules"/>
</div>
</template>

<script>
import ArticleGrid from '~/components/ArticleGrid'
export default {
    head () {
    return {
      title: this.$route.params.type + ' | Nuxt Guide',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'A collection of modules, plugins, boilerplates, tutorials, and inspiration for Nuxt.js / Vue.js' }
      ]
    }
  },
    data: function () {
    return {
     pagename: "",
     pagedesc: ""
    }
  },
  components: {ArticleGrid},
    async asyncData({ app, error, params }) {
    let document = await app.$prismic.api.query(app.$prismic.predicates.at('document.type',params.type),{ orderings : '[document.last_publication_date desc]' });

    return {
      modules: document.results.map(result => {
        return {
          meta: {
            id: result.id,
            uid: result.uid,
            lang: result.lang,
            publicationDate: app.$prismic.asDate(result.first_publication_date),
            tags: result.tags,
            type: result.type,
            slug: result.slugs[0]
          },
          title: app.$prismic.asText(result.data.title),
          short_desc: result.data.short_description,
          image: result.data.post_image,
          result: result,
                     date: result.last_publication_date,

        };
      }),

    };
  }

};
</script>