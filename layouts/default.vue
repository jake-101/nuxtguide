<template>
  <div id="app">
    <no-ssr>
      <Reveal class="sidemenu">
        <nuxt-link class="text-brown-700 hover:text-brown-800" to="/" exact>Home</nuxt-link>
        <nuxt-link class="text-brown-700 hover:text-brown-800" to="/modules">Modules</nuxt-link>
                <nuxt-link class="text-brown-700 hover:text-brown-800" to="/showcase">Showcase</nuxt-link>

        <nuxt-link class="text-brown-700 hover:text-brown-800" to="/templates">Templates</nuxt-link>
      </Reveal>
    </no-ssr>

    <main id="page-wrap" class="antialiased bg-gray-100 font-sans">
      <ul class="flex bg-gray-900 p-4 justify-center">
        <li class="flex-1"></li>
        <li class="mx-6 flex items-center flex-1 items-center justify-center">
          <nuxt-link
            class="flex items-center justify-around text-gray-700 text-center text-sm font-light uppercase tracking-widest"
            to="/"
          > NUXT <svg class="h-10 fill-current text-gray-400 mx-3" enable-background="new 0 0 83 97" viewBox="0 0 83 97" xmlns="http://www.w3.org/2000/svg"><path d="m70.19 2.73v4.97c-.33 0-.65 0-.97 0-17.96 0-35.92.02-53.88-.02-2.51-.01-4.65.67-6.29 2.58-.48.56-.9 1.3-1.02 2.01-.2 1.23-.29 2.52-.17 3.75.28 2.98 3.47 5.38 6.68 5.34 4.89-.06 9.78-.02 14.67-.02h39.61 1.37c.02.44.05.79.05 1.14v67.05c0 .7.02 1.4 0 2.1-.05 1.85-1.08 2.88-2.94 2.88-5.95.01-11.91.01-17.86.01-11.27 0-22.55.01-33.82-.01-4.28-.01-7.93-1.53-10.63-4.9-1.78-2.22-2.63-4.79-2.62-7.72.04-22.25.02-44.5.03-66.75 0-1.16-.01-2.36.27-3.47 1.14-4.57 4.98-8.21 9.74-8.67 3.86-.38 7.77-.25 11.65-.26 15-.02 30-.01 45 0 .36-.01.71-.01 1.13-.01zm-62.03 21.93v1.83 56.08c0 1.44.47 2.66 1.39 3.8 1.46 1.83 3.31 2.76 5.59 2.76 16.03.02 32.07.01 48.1.01h1.15c0-21.02 0-41.89 0-62.81-.29-.01-.52-.04-.75-.04-14.47 0-28.94.04-43.41-.02-4.01 0-8.14.67-12.07-1.61z"/><path d="m73 18.87c-4.21 0-8.24 0-12.26 0-14.84 0-29.67-.02-44.51.02-1.74.01-3.09-.65-4.26-1.78-1.32-1.27-1.04-4.04.3-5.31 1.27-1.2 2.68-1.54 4.36-1.54 20.99.02 41.98.01 62.96.01h1.14v77.18c-2.52 0-5.06 0-7.73 0 0-22.8 0-45.63 0-68.58z"/><path d="m43.41 75.93-15.41-22.11v19.58c0 2.83-2.29 5.24-5.18 5.24s-5.18-2.41-5.18-5.24v-29.21c0-3.67 3.01-6.81 6.81-6.81 2.29 0 4.28 1.14 5.54 2.95l14.58 20.72v-18.43c0-2.83 2.35-5.24 5.18-5.24 2.89 0 5.24 2.41 5.24 5.24v29.69c0 3.43-2.83 6.32-6.38 6.32-2.13.01-4.05-1.08-5.2-2.7z"/></svg> GUIDE </nuxt-link>
        </li>
         <!--  <li class="mx-6">
        <vue-autosuggest
            :suggestions="suggestions"
            :input-props="{id:'autosuggest__input', autocomplete: 'off', placeholder:'Search',class: 'text-sm w-full border border-transparent bg-gray-200 focus:outline-none focus:bg-white focus:border-gray-300 text-gray-900 rounded-lg pl-4 pr-4 py-2'}"
            @input="searchQuery"
            @blur="closeBox"
            @focus="openBox"
            v-model="query"
          ></vue-autosuggest> 
          <div
            class="absolute z-50 bg-gray-900 text-gray-200 p-3 pb-0 flex flex-col w-auto"
            v-if="suggestions.length && !closed"
          >
            <div v-for="(s,i) in suggestions" :key="i" class="my-suggestion-item text-sm mb-4">
              <nuxt-link class="w-full block" :to="`/${s.type}/${s.uid}`">
                <img class="w-8 mr-2 rounded-full inline" :src="s.data.post_image.thumb.url">
                {{getTitle(s.data.title)}}
              </nuxt-link>
            </div>
          </div>
        </li> -->
        <li class="flex-1 flex justify-end">
          <nuxt-link
            v-if="!user"
            class="cursor-pointer inline border-gray-700 border text-gray-600 text-xs px-3 py-1 rounded hover:bg-gray-800 hover:text-gray-300"
            to="/login" exact
          >Login</nuxt-link>
          <nuxt-link
            tag="span"
            to="/login" exact 
            v-if="user"
            class="cursor-pointer inline text-gray-600 text-xs rounded hover:text-gray-300"
          >
            <img class="w-8 h-8 rounded-full" :src="user.photoUrl">
          </nuxt-link>
        </li>
      </ul>
      <div class="p-4 md:p-8 lg:p-12 flex justify-center">
        <nuxt/>
      </div>
    </main>
    <footer class="m-12">
      <ul class="flex justify-around text-gray-700 text-xs font-light">
        <li class="mx-2">Made with love by <a class="text-gray-800 hover:underline" href="https://jake101.com">Jake101</a></li>

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
      error: { code: null, message: null, email: null, credential: null }
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },

  mounted() {
    this.getUser();
  },

  methods: {

    getLink(x) {
      this.$router.push(x);
    },
    openBox() {
      this.closed = false;
    },
    closeBox() {
      let _this = this;
      setTimeout(function() {
        _this.closed = true;
        _this.suggestions = [];
        _this.query = "";
      }, 300);
    },
    onSelected(item) {
      console.log(item)
      this.selected = item.item;
    },
    renderSuggestion(suggestion) {
      console.log(suggestion)
      return suggestion.name;
    },
    clickHandler(item) {
      this.closed = true;
      this.query = "";
    },
    getSuggestionValue(suggestion) {
      console.log(suggestion)
      return this.getTitle(suggestion.data.title);
    },
    resetQuery() {
      this.query = "";
    },
    getTitle(q) {
      return this.$prismic.asText(q);
    },
    searchQuery(q) {
      const _this = this;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.$prismic.api
          .query(this.$prismic.predicates.fulltext("document", q), {
            fetch: ["document.data.title", "document.data.post_image"]
          })
          .then(function(response) {
            _this.suggestions = response.results;
          });
      }, this.debounceMilliseconds);
    },
    getUser() {
      const _this = this;
      this.$fireAuth.onAuthStateChanged(user => {
        var obj = {};
        if (user != null) {
          obj.name = user.displayName;
          obj.email = user.email;
          obj.photoUrl = user.photoURL;
          obj.emailVerified = user.emailVerified;
          obj.uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
          // this value to authenticate with your backend server, if
          // you have one. Use User.getToken() instead.
          _this.$store.commit("setUser", obj);
          _this.$store.commit("authenticated");
        }
      });
    }
  }
};
</script>
<style>
</style>

