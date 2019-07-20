<template class="flex justify-center items-center">
  <section  class="flex flex-wrap justify-left flex-row lg:flex-row md:ml-3 w-full lg:max-w-6xl">
   
    <ArticleCard  index="1" key="main" class="w-full pb-1 flex flex-row flex-wrap">
      <div
        class="rounded overflow-hidden shadow-lg lg:my-16  mx-auto bg-white flex flex-col border-t-8 w-full lg:w-3/4 xl:w-2/3 border-brown-800 mb-8"
      >
        <div class="px-6 pt-4 pb-4 border-b-2 border-brown-300">
          <h1 style="--animation-order: 2;" class="in font-bold text-3xl md:text-4xl mb-3 inline-block mt-4" v-unorphan>{{title}}</h1>
 
        </div>
        <div style="--animation-order: 5;"
          class="in px-6 pt-8 pb-8 border-b border-brown-400 flex-grow leading-loose description text-brown-800 wysiwyg"
          v-html="description"
        ></div>
   
      </div>


    </ArticleCard> 
  </section>
</template>

<script>
import ArticleCard from "~/components/ArticleCard";
export default {
transition: {
    name: 'slugfade',
    mode: 'out-in'
  },
  head() {
    return {
      title: this.title + " | Nuxt Guide",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: "description", name: "description", content: this.description},
        {
          hid: "og:description",
          property: "og:description",
          content: this.description
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `https://nuxtguide.site/pages/${this.meta.uid}`
        },
    

        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.title
        },
        {
          hid: "twitter:site",
          name: "twitter:site",
          content: "@nuxtguide"
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.description
        },
      
      ]
    };
  },
  data: function() {
    return {
      mylikes: []
    };
  },
  components: { ArticleCard, RelatedItems, ImageSrcSet },
  async asyncData({ app, error, params, store }) {
    let document = await app.$prismic.api.getByUID('page', params.slug);
    // let related = await app.$prismic.api.query(
    //   app.$prismic.predicates.similar(document.id, 8)
    // );


    // const likeRef = await app.$fireStore.collection("likes");
    // let queryRef = await likeRef.where("pageId", "==", params.slug);
    // await queryRef.get().then(function(querySnapshot) {
    //   let arr = [];
    //   console.warn(querySnapshot.size);
    //   obj["likes"] = querySnapshot.size;
    //   querySnapshot.forEach(function(doc) {
    //     arr.push(doc.data());
    //     // doc.data() is never undefined for query doc snapshots
    //   });
    //   obj["likedata"] = arr;
    // });

    return {
  meta: {
        id: document.id,
  uid: document.uid,
      //   lang: document.lang,
      //   publicationDate: app.$prismic.asDate(document.first_publication_date),
      //   tags: document.tags,
      //   type: document.data.category.uid,
      //   slug: document.slugs[0]
     },
      // likes: count,
      // likedata: obj["likedata"],
      // views: obj["views"],
      title: app.$prismic.asText(document.data.page_title),
       description: app.$prismic.asHtml(document.data.content),
      // embed: document.data.embed,
      // links: document.data.links,
      // link: app.$prismic.asLink(document.data.link),
      // demolink: app.$prismic.asLink(document.data.demo_link),
      // authorlink: app.$prismic.asLink(document.data.author_link),
      // short_desc: document.data.short_description,
      // image: document.data.post_image,
      result: document,
   
      // related: related.results
    };
  },
    mounted () {
    this.$lozad.observe();
  },

  computed: {
  




    user() {
      return this.$store.state.user;
    }
  },
  methods:  {


    
}
};
</script>
