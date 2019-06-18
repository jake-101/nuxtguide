<template>
  <section class="flex flex-wrap justify-left md:ml-3">
    <ArticleCard key="first" class="w-full md:w-1/2 lg:w-1/3 xl:max-w-xs md:pr-3 pb-3 flex">
      <div class="rounded overflow-hidden shadow-lg bg-brown-900 flex items-center flex-row flex-1">
        <div class="px-6 py-4 text-center">
          <h1 class="text-white text-4xl mb-3">{{pagename | capitalize}}</h1>
          <p class="text-brown-600 text-sm">{{pagedesc}}</p>
        </div>
      </div>
    </ArticleCard>
    <ArticleCard
      v-for="m in griditems"
      :key="m.meta.id"
      class="w-full md:w-1/2 lg:w-1/3 xl:max-w-xs md:pr-3 pb-3 flex"
    >
      <div class="rounded overflow-hidden shadow-lg bg-white flex w-full flex-col">
        <nuxt-link :to="`/${m.meta.type}/${m.meta.uid}`">
        <ImageSrcSet sizes="(min-width: 768px) 400px, 600px" :imgobj="m.image" />
        </nuxt-link>
        <div class="px-6 pt-4 pb-6 border-b border-brown-500 shadow-inner flex-grow">
          <nuxt-link
            tag="h2"
            class="cursor-pointer font-bold text-xl mb-2 no-underline hover:underline"
            :to="`/${m.meta.type}/${m.meta.uid}`"
          >{{m.title}}</nuxt-link>
          <p class="text-brown-800 text-sm" v-unorphan>{{m.short_desc}}</p>
        <font-awesome-icon class="text-orange-500 text-xs" :icon="['fas', 'clock']"/>  <timeago class="text-xs text-orange-500" :datetime="m.date"></timeago>
        </div>
        <div class="w-100 bg-brown-300">
          <div class="pl-4 pt-3 pb-2 w-max-content">
            <nuxt-link
              tag="span"
              :to="`/${m.meta.type}/`"
              class="cursor-pointer inline-block bg-brown-800 hover:bg-brown-900 rounded px-3 py-1 text-xs font-semibold text-brown-100 shadow mr-1 mb-2"
            >{{m.result.type | capitalize}}</nuxt-link>
            <span
              class="inline-block bg-white border border-brown-500 rounded shadow px-3 py-1 text-xs text-brown-700 mr-1 mb-2"
              v-for="tag in m.meta.tags"
              :key="tag"
            >{{tag}}</span>
          </div>
        </div>
      </div>
    </ArticleCard>
  </section>
</template>

<script>
import ArticleCard from "~/components/ArticleCard";
import ImageSrcSet from "~/components/ImageSrcSet";
export default {
  components: { ArticleCard,ImageSrcSet },
  props: ["pagename", "pagedesc", "griditems"]
};
</script>