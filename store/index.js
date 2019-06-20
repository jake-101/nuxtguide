export const state = () => ({
    user: null,
    authenticated: false
  })
  
  export const mutations = {
    setUser (state,data) {
      state.user = data
    },
    authenticated (state) {
      state.authenticated = true
    },
  }

  export const actions = {


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