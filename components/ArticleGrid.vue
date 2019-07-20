<template>
<div>
  <transition-group :duration="{  leave: 1300 }" appear name="gridfade" tag="section" class="articlegrid md:ml-3">
    <ArticleCard style="--animation-order: 0;" index="99" key="first" class="w-full md:pr-3 pb-3 flex">
      <div class="rounded overflow-hidden shadow-lg bg-brown-900 flex  h-full items-center justify-between flex-col flex-1">
        <p></p>
        <div class="px-6 py-4 text-center">
          <h1 class="text-white text-4xl mb-3">{{pagename | capitalize}}</h1>
          <p v-if="pagedesc" class="text-brown-600 text-sm">{{pagedesc}}</p>
        </div>
                  <p v-if="page.totalResults" class="mb-4 text-xs text-teal-700 justify-end">Showing {{page.results}} of {{page.totalResults}} Results</p>

      </div>
    </ArticleCard>
    <ArticleCard :style="`--animation-order: ${i};`" v-for="(m,i) in griditems" :index="i" :key="m.meta.id" class="w-full md:pr-3 pb-3 flex">
     <ArticleCardBody :article="m"/>
    </ArticleCard>
  </transition-group>
  <!-- <div class="border-white border my-2 p-6 mx-3 mt-8 rounded"><ul class="flex"><li>{{page.total}}</li></ul></div> -->
  </div>
</template>

<script>
import ArticleCardBody from "~/components/ArticleCardBody";
import ArticleCard from "~/components/ArticleCard";
export default {
  data() {
    return {
    };
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

  computed: {

  },

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
    mounted () {
    this.$lozad.observe();
  },
    
  components: { ArticleCard,ArticleCardBody },
  props: ["pagename", "pagedesc", "griditems","page"]
};
</script>
<style lang="scss">


.articlecard {
  transition: .5s box-shadow;

}
.articlecard:hover {
  transition: .5s box-shadow;

}
.articlegrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 1rem;
}

</style>