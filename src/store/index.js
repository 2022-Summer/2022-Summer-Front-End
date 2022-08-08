import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin:false,
    username:'',
    mailbox:'',
    name:'',
    projectid:0,
    wordid:0,
    prototypeid:0,
    chartid:0,
    teamid:'',
    type:0
  },
  getters: {
  },
  mutations: {
    login(state){
      state.islogin = true
    },
    logout(state){
      state.islogin = false
    }
  },
  actions: {
  },
  modules: {
  }
})
