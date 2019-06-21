import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
    user: null,
    authenticated: false,
    likes: []
  })
  
  export const mutations = {
    ...vuexfireMutations,
    setUser (state,data) {
      state.user = data
    },
    authenticated (state) {
      state.authenticated = true
    },
  }

  export const getters = {

      getMyLikes: function (state) { 
        var found =  state.likes.find(function(element) {
          return element = state.user.uid;
        });
        return found }
    
  }
 
  export const actions = {

    likesRef: firestoreAction(function(context, ref) {
      
      context.bindFirestoreRef('likes', ref)

    }),
    fireAuth ({ commit, app }) {

     const user = this.$fireAuth.currentUser;
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
        commit('setUser', obj)
     commit("authenticated");
      }


    }
  }