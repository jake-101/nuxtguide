
export const state = () => ({
  user: null,
  authenticated: false,
  likes: [],
  cats: null,
  guidedoc: [],
  pageId: ''
});

export const mutations = {
  setUser(state, data) {
    state.user = data;
  },
  setPageId(state,data) {
state.pageId = data
  },
  setCats(state,data) {
state.cats = data
  },
  authenticated(state) {
    state.authenticated = true;
  },

};

export const getters = {
  // getPageLikes: function(state) {
  //   const copy = {...state.likes}
  //     var found = copy.find(o => o.pageId === state.pageId)
  //     return found;
    
  
  // }
};

export const actions = {
   nuxtServerInit({ dispatch }) {
dispatch('getCats')
  },

async getCats({app,commit}) {
  let  document =  await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'categories')

  );
 await console.log(document)
 await commit('setCats',document.results)
},

  fireAuth({ commit, app }) {
    const user = app.$fireAuth.currentUser;
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
      commit("setUser", obj);
      commit("authenticated");
    }
  }
};
