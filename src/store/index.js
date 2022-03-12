import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 属性
    token: '',
    userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
  },
  mutations: {
    // 类似java中的set 修改state
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token", token)
    },

    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state) => {
      state.token = '',
      state.userInfo = {},
      localStorage.setItem("token", '')
      sessionStorage.setItem("userinfo", JSON.stringify(''))
    }
  },
  getters: {
    // 类似java中的get 
    getUser: state => {
      return state.userInfo
    }
    
  },
  actions: {
  },
  modules: {
  }
})
