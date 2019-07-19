<template>
<div class="w-full">
  <ArticleGrid v-if="documents" :page="page" :pagename="pagename"  :pagedesc="pagedesc" :griditems="documents"/>

<Pagination :page="page"/>
</div>
</template>

<script>
import Pagination from "~/components/Pagination"
import ArticleGrid from '~/components/ArticleGrid'
export default {
//     fetch ({ store, params,app }) {
//         const ref = app.$fireStore
//       .collection('likes')
// store.dispatch('likesRef',ref)
//   },
      head () {
    return {
      title: 'Home | Nuxt Guide',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'A collection of modules, plugins, boilerplates, tutorials, and inspiration for Nuxt.js / Vue.js' }
      ]
    }
  },
  data: function () {
    return {

     pagename: "Nuxt Guide",
     pagedesc: `A hand-selected collection of modules, plugins, boilerplates, tutorials, inspiration and more for Nuxt.js`
    }
  },
 methods: {

},
  components: {ArticleGrid,Pagination},
  async asyncData({ app, error }) {
    let document = await app.$prismic.api.query(app.$prismic.predicates.at("document.type", 'posts'),{ orderings : '[document.last_publication_date desc]', pageSize : 10 } 


    );
    return {

   
      documents: document.results.map(result => {
        return {
          meta: {
            id: result.id,
            uid: result.uid,
            lang: result.lang,
            publicationDate: app.$prismic.asDate(result.first_publication_date),
            tags: result.tags,
            type: result.type,
          },


          title: app.$prismic.asText(result.data.title),
          short_desc: result.data.short_description,
          image: result.data.post_image,
          date: result.last_publication_date
        };
      }),
      page: {
        prevPage: document.prev_page,
        page: document.page,
        nextPage: document.next_page,
      results: document.results_size,
      perPage: document.results_per_page,
      totalPages: document.total_pages,
      totalResults: document.total_results_size
      }
    };
  }
};
</script>