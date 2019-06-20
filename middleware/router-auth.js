export default function({ app,store }) {
    let fireuser = app.$fireAuth.currentUser;
    console.log("fireuser", fireuser);
    var obj = {};
    if (fireuser && !store.user) {
      obj.name = fireuser.displayName;
      obj.email = fireuser.email;
      obj.photoUrl = fireuser.photoURL;
      obj.emailVerified = fireuser.emailVerified;
      obj.uid = fireuser.uid; // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      store.commit("setUser", obj);
      store.commit("authenticated");
    }

  }

// export default function({ app, redirect, store,error }) {
//    const user = app.$fireAuth.currentUser;
//    if(user && user.email) {
// store.commit('setUser',user)
// store.commit('authenticated',user)
//    }
//     if (!store.state.authenticated) {
//       return redirect('/login')
//     }
  
   
//   }