<template>
  <section class="my-8 lg:my-16 flex items-center justify-center">
      <div v-if="!this.$store.state.authenticated" class="max-w-sm">
        <h1 class="mb-8 text-center text-gray-700 text-xl">Sign-In to your Account</h1>

        <form class="px-8 pt-6 pb-8 mb-4">
          {{error}}
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Email</label>
            <input
              required
              @focus="setStatus()"
              v-model="email"
              class="shadow appearance-none border rounded text-lg  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="Email"
            >
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
            <input
              required
              v-model="password"
              class="shadow appearance-none border text-lg rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            >
          </div>
          <div class="flex items-center flex-row flex-wrap justify-between">
            <button
              @click.prevent="loginUser()"
              class="w-full border-gray-700 border-2 text-gray-700 mb-4 bg-gray-200 hover:bg-gray-300 font-semibold py-1 px-2  rounded focus:outline-none shadow"
              type="button"
            >Sign In</button>
            <button
              @click.prevent="signInGoogle"
              class="w-full mb-2 border-gray-700 border-2 text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold py-1 px-2 rounded focus:outline-none shadow"
              type="button"
            >Login with Google 
<svg class="w-auto h-5 ml-1 inline" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg></button>
            <a
              v-if="!status"
              class="cursor-pointer p-2 text-sm"
              @click="resetPassword()"
            >Forgot Password?</a>
          </div>
          <div class="text-xs mt-4 pt-2 border-t text-red-800" v-if="status">{{status}}</div>
        </form>
      </div>
      <div v-else class="w-full max-w-xs">
        <h1
          class="mb-8 text-center  text-md"
        >You are logged in as {{this.$store.state.user.email}}</h1>
        <button
        @click.prevent="logOut"
          class="w-full border-gray-700 border-2 text-gray-700 mb-4 bg-gray-200 hover:bg-gray-300 font-semibold py-1 px-2  rounded focus:outline-none shadow"
          type="button"
        >Log Out</button>
        <nuxt-link
          tag="button"
          to="/"
          class="w-full border-gray-700 border-2 text-gray-700 mb-4 bg-gray-200 hover:bg-gray-300 font-semibold py-1 px-2  rounded focus:outline-none shadow"
          type="button"
        >Home</nuxt-link>
      </div>
  </section>
</template>

<script>
export default {

  data: function() {
    return {
      email: "",
      password: "",
      status: "",
      error: "",
      userobj: {
        name: "",
        email: "",
        photoUrl: "",
        emailVerified: "",
        uid: ""
      }
    };
  },
  components: {},
  mounted() {
    this.googleRedirect();
    this.getUser();
  },
  methods: {
    signInGoogle() {
      var _this = this
      var provider = new this.$fireAuthObj.GoogleAuthProvider();

this.$fireAuth.signInWithPopup(provider).then(function(result) {
    let obj = {}
    obj.token = result.credential.accessToken
    obj.email = result.user.email
    obj.photoUrl = result.user.photoURL
_this.$store.commit('setUser',obj)
_this.$store.commit('authenticated')
}).catch(function(error) {
  console.log(error)
  // Handle Errors here.
  _this.error.code = error.code;
  _this.error.message= error.message;
  // The email of the user's account used.
  _this.error.email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  _this.error.credential = error.credential;
});
    },

    googleRedirect() {
      this.$fireAuth
        .getRedirectResult()
        .then(function(result) {
          if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(token);
            // ...
          }
          // The signed-in user info.
          var user = result.user;
          console.log(user);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
    setStatus() {
      this.status = "";
    },
    async resetPassword() {
      let _this = this;
      await this.$fireAuth
        .sendPasswordResetEmail(this.email)
        .then(function() {
          _this.status = `Password reset email sent to ${_this.email}`;
        })
        .catch(function(error) {
          // An error happened.
          _this.status = error;
        });
    },
    loginGoogle() {
      var provider = new this.$fireAuthObj.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

      this.$fireAuth.signInWithRedirect(provider);
    },
    async loginUser() {
      let _this = this;
      const obj = {};
      await this.$fireAuth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          function(user) {
            console.log(user);
            if (user != null) {
              obj.name = user.displayName;
              obj.email = user.email;
              obj.photoUrl = user.photoURL;
              obj.emailVerified = user.emailVerified;
              obj.uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
              // this value to authenticate with your backend server, if
              // you have one. Use User.getToken() instead.
              _this.$store.commit("setUuser", obj);
              _this.$store.commit("authenticated");
              _this.$router.push({
                path: "/"
              });
            }
          },
          function(err) {
            var errorCode = err.code;
            var errorMessage = err.message;
            this.error = `${errorCode} - ${errorMessage}`;
          }
        );
      await console.log(obj);
      if (obj.email != null) {
      }
    },
        logOut() {
      var _this = this;
      this.$fireAuth.signOut().then(
        function() {
          // Sign-out successful.

          localStorage.removeItem("firebase:host:jake101-96454.firebaseio.com");
          window.location.href = "/";
        },
        function(error) {
          // An error happened.
          console.log(error);
        }
      );
    },
    getUser() {
      var user = this.$fireAuth.currentUser;
      console.log(user);
      if (user != null) {
        this.userobj.name = user.displayName;
        this.userobj.email = user.email;
        this.userobj.photoUrl = user.photoURL;
        this.userobj.emailVerified = user.emailVerified;
        this.userobj.uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        this.$store.commit("addUser", this.userobj);
        this.$store.commit("authenticated");
      }
    }
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>
