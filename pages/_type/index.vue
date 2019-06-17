<template class="flex justify-center">
  <section class="flex flex-wrap justify-left">
    <ArticleCard class="w-full md:w-1/2 lg:w-1/4 xl:max-w-xs pr-3 pb-3 flex flex-grow flex-1">
      <div class="rounded overflow-hidden shadow-lg bg-gray-800 flex items-center flex-row flex-1">
        <div class="px-6 py-4 text-center">
          <h1 class="text-white text-4xl mb-3">{{this.$route.params.type}}</h1>
          <p
            class="text-gray-600 text-sm"
          >A hand-selected collection of modules, plugins, boilerplates, tutorials, inspiration and more for Nuxt.js</p>
        </div>
      </div>
    </ArticleCard> 
     <ArticleCard
      v-for="m in modules"
      :key="m.meta.id"
      class="w-full md:w-1/2 lg:w-1/4 xl:max-w-xs pr-3 pb-3 flex"
    >
      <div class="rounded overflow-hidden shadow-lg bg-white flex flex-col">
      <nuxt-link :to="`/${m.meta.type}/${m.meta.slug}`">
        <img
          v-if="m.image"
          class="w-full h-48 object-cover border-b"
          :src="m.image.url"
          :alt="m.image.alt"
        ></nuxt-link>
        <div class="px-6 pt-4 pb-6 border-b flex-grow">
           <nuxt-link :to="`/${m.meta.type}/${m.meta.slug}`"><h2 class="font-bold text-xl mb-2">{{m.title}}</h2></nuxt-link>
          <p class="text-gray-700 text-sm">{{m.short_desc}}</p>
        </div>
        <div class="w-100 overflow-x-auto">        <div class="pl-4 pt-4 pb-2 w-max-content">
          <nuxt-link tag="span" :to="`/${m.meta.type}/`" 
            class="inline-block bg-blue-400 rounded-full px-3 py-1 text-xs font-semibold text-blue-100 shadow-inner mr-1 mb-2"
          >{{m.result.type}}</nuxt-link>
          <span
            class="inline-block bg-gray-200 rounded-full shadow-inner px-3 py-1 text-xs text-gray-700 mr-1 mb-2"
            v-for="tag in m.meta.tags"
            :key="tag"
          >{{tag}}</span>
        </div></div>

      </div>
    </ArticleCard>
  </section>
</template>

<script>
import ArticleCard from '~/components/ArticleCard'
export default {
  components: {ArticleCard},
    async asyncData({ app, error, params }) {
    let document = await app.$prismic.api.query(app.$prismic.predicates.at('document.type',params.type));

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
          result: result
        };
      }),

    };
  }

};
</script>