<template>
  <section class=" w-full">
    <div class="w-full py-3 my-3 px-3 bg-gray-300 text-gray-800 rounded">
      <h2>Related</h2>
    </div>
    <div class="grid-4 overflow-x-auto">
    <ArticleCard v-for="m in items" :key="`${m.uid}-related`" class="w-full">
      <div class="rounded overflow-hidden shadow-lg bg-white w-full">
        <nuxt-link :to="`/${m.type}/${m.uid}`">
              <ImageSrcSet class="w-full h-auto border-b rounded rounded-b-none shadow-lg" sizes="(min-width: 1024px) 500px, 650px" :imgobj="m.data.post_image"/>
        </nuxt-link>
        <div class="px-3 pt-3 pb-1 truncate overflow-hidden w-full">
          <nuxt-link
            tag="h2"
            class=" cursor-pointer font-semibold text-sm mb-2 no-underline hover:underline"
            :to="`/${m.type}/${m.uid}`"
          >{{$prismic.asText(m.data.title)}}</nuxt-link>
        </div>
      
      </div>
    </ArticleCard>
    </div>

  </section>
</template>

<script>
import ArticleCard from "~/components/ArticleCard";
import ImageSrcSet from "~/components/ImageSrcSet";

export default {
  components: { ArticleCard,ImageSrcSet },
  props: ["items"]
};
</script>
<style>
.grid-4 {
  display: grid;
  grid-template-columns: repeat(12,minmax(250px, 25%));
  grid-gap: 10px;
  grid-auto-flow: row dense;
}
</style>