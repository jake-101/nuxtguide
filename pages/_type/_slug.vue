<template class="flex justify-center" :data-wio-id="meta.id">
  <section class="flex flex-wrap justify-left flex-col lg:flex-row md:ml-3" >
    <ArticleCard class="w-full lg:w-1/2 lg:pr-3 pb-3 flex flex-col">
      <ImageSrcSet v-if="!embed" class="w-full h-auto  rounded shadow-lg" sizes="(min-width: 1024px) 500px, 650px" :imgobj="image"/>
      <div class="video-container" v-html="embed.html"></div>
          <ul class="text-xs flex  text-gray-700  flex-initial" v-if="likes || views">
     <li class="py-2 my-3 mr-2 px-3 bg-gray-300 rounded" v-if="views"><font-awesome-icon :icon="['fas', 'eye']"/> {{views}}</li>      <li class="py-2 my-3 mr-2 px-3 bg-gray-300 rounded" v-if="likes >= 0"><font-awesome-icon :icon="['fas', 'heart']"/> {{likes}}</li>

    </ul>
    </ArticleCard>
    <ArticleCard class="w-full lg:w-1/2 lg:pr-3 pb-1 flex flex-col">
      <div
        class="rounded overflow-hidden shadow-lg bg-white flex flex-col border-t-8 border-brown-800"
      >
        <div class="px-6 pt-4 pb-4 flex-grow border-b-2 border-brown-300">
          <h2 class="font-bold text-4xl mb-3 inline-block mt-4">{{title}}</h2>
          <p class="text-brown-700 text-lg mb-2">
            <nuxt-link
              tag="span"
              :to="`/${meta.type}/`"
              class="cursor-pointer inline-block bg-brown-800 hover:bg-brown-900 rounded px-3 py-1 text-xs font-semibold text-brown-100 shadow-inner mr-1 mb-2"
            >{{result.type | capitalize}}</nuxt-link>
            <span v-unorphan>{{short_desc}}</span>
          </p>
        </div>
        <div
          class="px-6 pt-8 pb-8 border-b border-brown-400 flex-grow leading-loose description text-brown-800"
          v-html="description"
        ></div>
        <div class="w-100 overflow-x-auto bg-brown-300">
          <div class="pl-4 pt-4 pb-4">
            <a v-if="link" :href="link">
              <button
                class="bg-brown-800 hover:bg-brown-900 text-white font-bold py-2 px-4 rounded"
              ><font-awesome-icon  :icon="['fas', 'home']"/>  Homepage</button>
            </a>
            <a v-if="demolink" :href="demolink">
              <button
                class="bg-brown-800 hover:bg-brown-900 text-white font-bold py-2 px-4 rounded"
              ><font-awesome-icon  :icon="['fas', 'laptop-code']"/> Demo</button>
            </a>
            <a v-if="authorlink" :href="authorlink">
              <button
                class="bg-brown-800 hover:bg-brown-900 text-white font-bold py-2 px-4 rounded"
              >Author</button>
            </a>
          </div>
        </div>
      </div>
      <div class="mt-8 mx-2">
        <span
          class="inline-block bg-white rounded shadow px-3 py-1 text-xs text-gray-700 mr-1 mb-6"
          v-for="tag in meta.tags"
          :key="tag"
        >{{tag}}</span>
        <span class="inline-block pr-3 py-1 text-xs text-xs text-gray-700 mr-1 mb-2">
        <font-awesome-icon  :icon="['fas', 'clock']"/>    Last updated
          <timeago :datetime="date"></timeago>
        </span>
      </div>
      <RelatedItems  v-if="related.length" class="pl-2 pr-2" :items="related"/>
    </ArticleCard>
  </section>
</template>

<script>
import ArticleCard from "~/components/ArticleCard";
import RelatedItems from "~/components/RelatedItems";
import ImageSrcSet from "~/components/ImageSrcSet";

export default {
    head () {
    return {
      title: this.title + ' | Nuxt Guide',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: this.short_desc }
      ]
    }
  },
    data: function () {
    return {
     views: null,
     likes: null
    }
  },
  components: { ArticleCard, RelatedItems, ImageSrcSet },
  async asyncData({ app, error, params }) {
    let document = await app.$prismic.api.getByUID(params.type, params.slug);
    let related = await app.$prismic.api.query(
      app.$prismic.predicates.similar(document.id, 8)
    );

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
       embed: document.data.embed,
      link: app.$prismic.asLink(document.data.link),
      demolink: app.$prismic.asLink(document.data.demo_link),
      authorlink: app.$prismic.asLink(document.data.author_link),
      short_desc: document.data.short_description,
      image: document.data.post_image,
      result: document,
      date: document.last_publication_date,
      related: related.results
    };
  },
  mounted() {
    this.checkDoc(this.meta.uid);
  },
  methods: {
    async checkDoc(uid) {
      const uidRef = this.$fireStore.collection("guidedoc").doc(uid);

      let getDoc = uidRef
        .get()
        .then(doc => {
          if (!doc.exists) {
            this.createDoc(uid);
          } else {
            this.addView(this.meta.uid);
this.views = doc.data().views
this.likes = doc.data().likes
          }
        })
        .catch(err => {
          console.log("Error getting document", err);
        });
    },
    async createDoc(uid) {
      const docRef = this.$fireStore.collection("guidedoc").doc(uid);
      try {
        await docRef.set({
          likes: 0,
          views: 1
        });
      } catch (e) {
        alert(e);
        return;
      }
    },
    async addView(uid) {
      const increment = this.$fireStoreObj.FieldValue.increment(1);
      const docRef = this.$fireStore.collection("guidedoc").doc(uid);
      try {
        await docRef.update({ views: increment });
      } catch (e) {
        alert(e);
        return;
      }
    }
  }
};
</script>
<style>
.description a {
  text-decoration: none;
  font-weight: 600;
  color: #211b18;
}
.description a:hover {
  text-decoration: underline;
}
.video-container {
position: relative;
padding-bottom: 56.25%;
padding-top: 30px; height: 0; overflow: hidden;
}

.video-container iframe,
.video-container object,
.video-container embed {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
}
</style>