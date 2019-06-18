<template>
  <section class="flex flex-wrap justify-left md:ml-3">
    <ArticleCard key="first" class="w-full md:w-1/2 lg:w-1/3 xl:max-w-xs md:pr-3 pb-3 flex ">
      <div class="rounded overflow-hidden shadow-lg bg-gray-800 flex items-center flex-row flex-1">
        <div class="px-6 py-4 text-center">
          <h1 class="text-white text-4xl mb-3">{{pagename}}</h1>
          <p
            class="text-gray-600 text-sm"
          >{{pagedesc}}</p>
        </div>
      </div>
    </ArticleCard>
    <ArticleCard
      v-for="m in griditems"
      :key="m.meta.id"
      class="w-full md:w-1/2 lg:w-1/3 xl:max-w-xs md:pr-3 pb-3 flex "
    >
      <div class="rounded overflow-hidden shadow-lg bg-white flex flex-col">
      <nuxt-link :to="`/${m.meta.type}/${m.meta.slug}`">
    <img
          v-if="m.image"
          class="w-full border-b"
          :src="m.image['720p'].url"
          :alt="m.image.alt"
        >
      </nuxt-link>
        <div class="px-6 pt-4 pb-6 border-b flex-grow">
     <nuxt-link tag="h2" class="cursor-pointer font-bold text-xl mb-2" :to="`/${m.meta.type}/${m.meta.slug}`">{{m.title}}</nuxt-link>
          <p class="text-gray-700 text-sm">{{m.short_desc}}</p>
        </div>
        <div class="w-100 bg-gray-200">        <div class="pl-4 pt-3 pb-2 w-max-content">
          <nuxt-link tag="span" :to="`/${m.meta.type}/`" 
            class="cursor-pointer inline-block bg-blue-400 rounded-full px-3 py-1 text-xs font-semibold text-blue-100 shadow-inner mr-1 mb-2"
          >{{m.result.type}}</nuxt-link>
          <span
            class="inline-block bg-white border rounded-full shadow-inner px-3 py-1 text-xs text-gray-700 mr-1 mb-2"
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
  props: ["pagename","pagedesc","griditems"]
};
</script>