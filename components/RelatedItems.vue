<template>
  <section class="">
    <div class="w-full py-6">
      <h2>Related</h2>
    </div>
    <div class="flex flex-row flex-initial flex-wrap">
    <ArticleCard v-for="m in items" :key="`${m.uid}-related`" class="w-1/4 pr-2 pb-2  inline-block">
      <div class="rounded overflow-hidden shadow-lg bg-white w-1/4">
        <nuxt-link :to="`/${m.type}/${m.uid}`">
          <img
            v-if="m.data.post_image"
            class="border-b w-32 h-auto"
            :src="m.data.post_image['720p'].url"
            :alt="m.data.post_image.alt"
          >
        </nuxt-link>
        <div class="px-3 pt-3 pb-1 truncate overflow-hidden w-full">
          <nuxt-link
            tag="h2"
            class=" cursor-pointer font-semibold text-sm mb-2"
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
export default {
  components: { ArticleCard },
  props: ["items"]
};
</script>