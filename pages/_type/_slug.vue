<template class="flex justify-center">
  <section class="flex flex-wrap justify-left flex-col lg:flex-row">
    <ArticleCard class="w-full lg:w-1/2 pr-3 pb-3 flex flex-col">
      <img
        v-if="image"
        class="w-full h-auto border-b rounded shadow-lg"
        :src="image.url"
        :alt="image.alt"
      >
    </ArticleCard>
    <ArticleCard class="w-full lg:w-1/2 pr-3 pb-3 flex flex-col">
      <div class="rounded overflow-hidden shadow-lg bg-white flex flex-col mb-4">
        
      </div>
      <div class="rounded overflow-hidden shadow-lg bg-white flex flex-col">
        <div class="px-6 pt-4 pb-4 flex-grow border-b">
            <h2 class="font-bold text-4xl mb-0 inline-block mt-4">{{title}}</h2>
                 <nuxt-link
              tag="span"
              :to="`/${meta.type}/`"
              class="inline-block bg-blue-400 rounded-full px-3 py-1 text-xs font-semibold text-blue-100 shadow-inner mr-1 mb-2"
            >{{result.type}}</nuxt-link> <p class="inline-block text-gray-700 text-lg mb-4">
    
            {{short_desc}}
          </p>
        </div>
        <div class="px-6 pt-8 pb-8 border-b flex-grow leading-loose">
          <p v-html="description"></p>
        </div>
        <div class="w-100 overflow-x-auto">
          <div class="pl-4 pt-4 pb-2">
            <a v-if="link" :href="link"><button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >{{title}} Homepage</button></a>
             <a v-if="demolink" :href="demolink"><button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Demo</button></a>
              <a v-if="authorlink" :href="authorlink"><button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Author</button></a>
     
          </div>
        </div>
      </div>
      <div class="my-6 mx-4">       <span
              class="inline-block  pr-3 py-1 text-xs text-gray-700 mr-1 mb-2"
     
            >Tagged:</span> <span
              class="inline-block bg-gray-200 rounded-full shadow-inner px-3 py-1 text-xs text-gray-700 mr-1 mb-2"
              v-for="tag in meta.tags"
              :key="tag"
            >{{tag}}</span></div>
      
    </ArticleCard>
  </section>
</template>

<script>
import ArticleCard from "~/components/ArticleCard";
export default {
  components: {ArticleCard},
  async asyncData({ app, error,params }) {
    let document = await app.$prismic.api.getByUID(params.type, params.slug);


        return {
          meta: {
            id: document.id,
            uid: document.uid,
            lang: document.lang,
            publicationDate: app.$prismic.asDate(document.first_publication_date),
            tags: document.tags,
            type: document.type,
            slug: document.slugs[0]
          },
          title: app.$prismic.asText(document.data.title),
           description: app.$prismic.asHtml(document.data.content),
                      link: app.$prismic.asLink(document.data.link),
    demolink: app.$prismic.asLink(document.data.demo_link),
        authorlink: app.$prismic.asLink(document.data.author_link),
          short_desc: document.data.short_description,
          image: document.data.post_image,
          result: document
        };
    
  }
};
</script>