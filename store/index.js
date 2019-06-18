export const state = () => ({
    user: null
  })
  
  export const mutations = {
    getUser (state,data) {
      state.user = data
    }
  }