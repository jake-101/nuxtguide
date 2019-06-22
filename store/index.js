import { vuexfireMutations, firestoreAction } from "vuexfire";

export const state = () => ({
  user: null,
  authenticated: false,
  likes: []
});

export const mutations = {
  ...vuexfireMutations,
  setUser(state, data) {
    state.user = data;
  },
  authenticated(state) {
    state.authenticated = true;
  },
      async likeMe() {
      let _this = this;
      let data = {
        pageId: this.meta.uid
      };
      data[`${this.user.uid}`] = this.user.name;

      const likeRef = await this.$fireStore.collection("likes");
      let mylike = await likeRef.where(this.user.uid, "==", this.user.uid);
await mylike.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
       _this.mylikes.push(doc.data())
    });
});


    
      // if (found) {
        mylike
          .doc()
          .delete()
          .then(function() {
            console.log("Document successfully deleted!");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      // } else {
      //   likeRef.doc().set(data);
      // }
    },
};

export const getters = {
  getMyLikes: function(state) {
    if (state.user.uid) {
      var found = state.likes.find(function(element) {
        return (element = state.user.uid);
      });
      return found;
    }
  
  }
};

export const actions = {
  nuxtServerInit({ dispatch }) {
    dispatch('INIT_POSTS')
  },
  likesRef: firestoreAction(function(context, ref) {
    context.bindFirestoreRef("likes", ref);
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
