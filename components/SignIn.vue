<template>              
<div>
<div v-if="user" class="cursor-pointer  text-gray-600 text-xs rounded hover:text-gray-300" ><img class="w-8 h-8 rounded-full" :src="user.photoUrl">
</div><div v-else class="cursor-pointer border-gray-700 border text-gray-600 text-xs px-3 py-1 rounded hover:bg-gray-800 hover:text-gray-300" @click="signInGoogle" to="/">Sign in with Google</div>
              </div>

</template>
<script>
export default {
  data: function() {
    return {
error: {code: null,message: null, email: null, credential: null}
    };
  },
  computed: {
user() {
    return this.$store.state.user
}
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
_this.$store.commit('getUser',obj)
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
    }
  }
};
</script>
