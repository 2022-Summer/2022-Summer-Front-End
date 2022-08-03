import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin:false,
    username:'xxx',
    mailbox:'',
    name:'xx',//真实姓名
    projectid:0,
    wordid:0,
    teamid:'',
  },
  getters: {
  },
  mutations: {
    login(state){
      state.islogin = true
    },
    logout(state){
      state.islogin = false
    },
  },
  actions: {
  },
  modules: {
  }
})
