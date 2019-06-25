import { vuexfireMutations, firestoreAction } from "vuexfire";

export const state = () => ({
  user: null,
  authenticated: false,
  likes: [],
  guidedoc: [],
  pageId: ''
});

export const mutations = {
  ...vuexfireMutations,
  setUser(state, data) {
    state.user = data;
  },
  setPageId(state,data) {
state.pageId = data
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
  nuxtServerInit({ dispatch,app }) {
   
  },

  setLikesRef: firestoreAction(function(context, ref) {
    context.bindFirestoreRef('likes', ref)
  }),
  setGuideDocRef: firestoreAction(function(context, ref) {
    context.bindFirestoreRef('guidedoc', ref)
  }),

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
