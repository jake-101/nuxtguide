<template>
  <section class="articlegrid md:ml-3">
    <ArticleCard key="first" class="w-full md:pr-3 pb-3 flex">
      <div class="rounded overflow-hidden shadow-lg bg-brown-900 flex items-center flex-row flex-1">
        <div class="px-6 py-4 text-center">
          <h1 class="text-white text-4xl mb-3">{{pagename | capitalize}}</h1>
          <p v-if="pagedesc" class="text-brown-600 text-sm">{{pagedesc}}</p>
        </div>
      </div>
    </ArticleCard>
    <ArticleCard
      v-for="m in griditems"
      :key="m.meta.id"
      class="w-full md:pr-3 pb-3 flex"
    >
      <div class="rounded overflow-hidden shadow-lg bg-white flex w-full flex-col stretch-items">
        <nuxt-link :to="`/${m.meta.type}/${m.meta.uid}`">
        <ImageSrcSet sizes="(min-width: 768px) 400px, 600px" :imgobj="m.image" />
        </nuxt-link>
        <div class="px-6 pt-4 pb-6 border-b border-brown-500 shadow-inner flex flex-col flex-grow">
          <nuxt-link
            tag="h2"
            class="cursor-pointer font-bold text-md md:text-xl mb-2 no-underline hover:underline leading-snug" v-unorphan
            :to="`/${m.meta.type}/${m.meta.uid}`"
          >{{m.title}}</nuxt-link>
          <p class="text-brown-800 text-sm self-stretch flex-1" v-unorphan>{{m.short_desc}}</p>
             <ul class="text-xs flex text-brown-700 flex-initial">
               <li class="mt-3 mr-3"><font-awesome-icon class="text-xs" :icon="['fas', 'clock']"/>  <timeago class="text-xs" :datetime="m.date"></timeago></li>
        <li class="mt-3 mr-3" v-if="m.views">
          <font-awesome-icon :icon="['fas', 'eye']"/>
          {{m.views}}
        </li>
         <li class="mt-3 mr-2" v-if="m.likes > 0">
          <font-awesome-icon :icon="['fas', 'heart']"/>
          {{m.likes}}
        </li>
      </ul> 
        </div>
        <div class="w-100 bg-brown-300">
          <div class="pl-4 pt-3 pb-2 w-max-content">
            <nuxt-link
              tag="span"
              :to="`/${m.meta.type}/`"
              class="cursor-pointer inline-block bg-brown-800 hover:bg-brown-900 rounded px-3 py-1 text-xs font-semibold text-brown-100 shadow mr-1 mb-2"
            >{{m.result.type | capitalize}}</nuxt-link>
            <nuxt-link tag="span" :to="`/tagged/${tag}`"
              class="cursor-pointer inline-block bg-white hover:bg-brown-200 border border-brown-500 hover:border-brown-600 rounded shadow px-3 py-1 text-xs text-brown-700 mr-1 mb-2"
              v-for="tag in m.meta.tags"
              :key="tag"
            >{{tag}}</nuxt-link>
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
  data() {
    return {
      ref: this.$fireStore.collection("guidedoc"),
      guidedocs: null
    }
  },
  // created() {
  //   this.ref.onSnapshot((querySnapshot) => {
  //     this.guidedocs = [];
  //     querySnapshot.forEach((doc) => {
  //       this.guidedocs.push({
  //         key: doc.id,
  //         likes: doc.data().likes,
  //          views: doc.data().views
  //       });
  //     });
  //   });

  // },
  methods: {
    // async checkDoc(uid) {
    //   const uidRef = .doc(uid);

    //   let getDoc = uidRef
    //     .get()
    //     .then(doc => {
    //       if (!doc.exists) {
    //         this.createDoc(uid);
    //       } else {
    //         this.addView(this.meta.uid);
    //         this.views = doc.data().views;
    //         this.likes = doc.data().likes;
    //       }
    //     })
    //     .catch(err => {
    //       console.log("Error getting document", err);
    //     });
    // },
    // async createDoc(uid) {
    //   const docRef = this.$fireStore.collection("guidedoc").doc(uid);
    //   try {
    //     await docRef.set({
    //       likes: 0,
    //       views: 1
    //     });
    //   } catch (e) {
    //     alert(e);
    //     return;
    //   }
    // },
    // async addView(uid) {
    //   const increment = this.$fireStoreObj.FieldValue.increment(1);
    //   const docRef = this.$fireStore.collection("guidedoc").doc(uid);
    //   try {
    //     await docRef.update({ views: increment });
    //   } catch (e) {
    //     alert(e);
    //     return;
    //   }
    // }
  },
  components: { ArticleCard,ImageSrcSet },
  props: ["pagename", "pagedesc", "griditems"]
};
</script>
<style>
.articlegrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 1rem;
}
</style>