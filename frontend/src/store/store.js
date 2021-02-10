import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: 0,
      isAdmin: false,
      pseudo: '',
      profilPic: '',
      token: '',
    },
  },
  mutations: {
    initUser(state, data) {
      state.user.id = data.userId;
      state.user.isAdmin = data.isAdmin;
      state.user.pseudo = data.pseudo;
      state.user.profilPic = data.profilPic;
      state.user.token = data.token;
    }
  },
  actions: {},
})
