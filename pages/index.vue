<template>
<div>
  <ArticleGrid :pages="page" :pagename="pagename" :pagedesc="pagedesc" :griditems="modules"/>
  
</div>
</template>

<script>
import ArticleGrid from '~/components/ArticleGrid'
export default {
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
  components: {ArticleGrid},
  async asyncData({ app, error }) {
    let document = await app.$prismic.api.query('',{ orderings : '[document.last_publication_date desc]' }

    );
    let guidedoc = {}
let likes = await app.$fireStore.collection("guidedoc")
let query = await likes.get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  

    snapshot.forEach(doc => {
      guidedoc[doc.id] = {likes: doc.data().likes, views: doc.data().views}
    });

  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
    return {
      page: {
      results: document.results_size,
      perPage: document.results_per_page,
      totalPages: document.total_pages,
      },
   
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
          likes: guidedoc[result.uid].likes,
          views: guidedoc[result.uid].views,
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