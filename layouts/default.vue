<template>
  <div id="app">
    <no-ssr>
      <Reveal class="sidemenu">
        <nuxt-link class="text-brown-700 hover:text-brown-800" to="/" exact>Home</nuxt-link>
        <nuxt-link class="text-brown-700 hover:text-brown-800" to="/modules">Modules</nuxt-link>
                <nuxt-link class="text-brown-700 hover:text-brown-800" to="/templates">Templates</nuxt-link>

      </Reveal>
    </no-ssr>

    <main id="page-wrap" class="antialiased bg-gray-100 font-sans">
      <ul class="flex bg-gray-900 p-4 justify-end">
        <li></li>
        <li class="mx-6 flex items-center">
         <nuxt-link class="text-gray-200 hover:text-white text-sm font-light uppercase tracking-widest" to="/">Nuxt Guide</nuxt-link> 
        </li>
                <li class="mx-6">
         <vue-autosuggest
    :suggestions="suggestions"
    :input-props="{id:'autosuggest__input', autocomplete: 'off', placeholder:'Search',class: 'text-sm w-full border border-transparent bg-gray-200 focus:outline-none focus:bg-white focus:border-gray-300 text-gray-900 rounded-lg pl-4 pr-4 py-2'}"
    @input="searchQuery"
  @blur="closeBox"
    @focus="openBox"
    v-model="query"
>  


</vue-autosuggest>
  <div class="absolute z-50 bg-gray-900 text-gray-200 p-3 pb-0 flex flex-col w-auto" v-if="suggestions.length && !closed">
    <div  v-for="(s,i) in suggestions" :key="i" class="my-suggestion-item text-sm mb-4"><nuxt-link  class="w-full block" :to="`/${s.type}/${s.uid}`"> <img class="w-8 mr-2 rounded-full inline" :src="s.data.post_image.thumb.url"> {{getTitle(s.data.title)}}</nuxt-link></div>
 </div> 
        </li>
        <li>
<nuxt-link v-if="!user" class="cursor-pointer border-gray-700 border text-gray-600 text-xs px-3 py-1 rounded hover:bg-gray-800 hover:text-gray-300" to="/login">Login</nuxt-link>
       <nuxt-link tag="div" to="login" v-if="user" class="cursor-pointer  text-gray-600 text-xs rounded hover:text-gray-300" ><img class="w-8 h-8 rounded-full" :src="user.photoUrl">
</nuxt-link>
        </li>
      </ul>
      <div class="p-4 md:p-8 lg:p-12">
        <nuxt/>
      </div>
    </main>
    <footer class="m-12">
      <ul class="flex justify-around text-gray-700 text-xs font-light">
                    <li class="mx-2">Made with love by Jake101</li>

        <li class="mx-2">© 2019 Nuxt Guide.</li>
                <li class="mx-2">Submit</li>
   <li class="mx-2">About</li>
      <li class="mx-2">Colophon</li>
         <li class="mx-2">Twitter</li>
      </ul>
    </footer>
  </div>
</template>
<script>
export default {

  data: function() {
    return {
      timeout: null,
      selected: null,
      closed: true,
      debounceMilliseconds: 100,

      suggestions: [],
      query: null,
error: {code: null,message: null, email: null, credential: null}
    };
  },
  computed: {
user() {
  return this.$store.state.user
}
  },
  mounted() {
 this.getUser()

  },

  methods: {
    getLink(x) {
this.$router.push(x)
    },
    openBox() {
      this.closed = false
    },
    closeBox() {

let _this = this
setTimeout(function(){
  _this.closed = true
 _this.suggestions = []
_this.query = ''
}, 300);

    },
     onSelected(item) {
      this.selected = item.item;
    },
    renderSuggestion(suggestion) {
    return suggestion.name;
},
     clickHandler(item){
       this.closed = true
this.query = ''
      },
       getSuggestionValue(suggestion) {
      return this.getTitle(suggestion.data.title)
    },
    resetQuery() {
this.query = ''
    },
    getTitle(q) {
return this.$prismic.asText(q)
    },
    searchQuery(q) {
      const _this = this
	 clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
this.$prismic.api.query(
this.$prismic.predicates.fulltext('document', q)
).then(function(response) {
  _this.suggestions = response.results
  console.log(response)
});
      }, this.debounceMilliseconds);

    },
    getUser() {
      var user = this.$fireAuth.currentUser
      console.log(user);
      var obj = {};
      if (user != null) {
        obj.name = user.displayName;
        obj.email = user.email;
        obj.photoUrl = user.photoURL;
        obj.emailVerified = user.emailVerified;
        obj.uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        this.$store.commit("setUser", obj);
        this.$store.commit("authenticated");
      }
    }
  }
};
</script>
<style>
</style>

