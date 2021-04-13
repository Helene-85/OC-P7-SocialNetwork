import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: 0,
      isAdmin: false,
      pseudo: '',
      profilPic: '',
    },
  },
  mutations: {
    initUser(state, data) {
      state.user.id = data.userId;
      state.user.isAdmin = data.isAdmin;
      state.user.pseudo = data.pseudo;
      state.user.profilPic = data.profilPic;
    },
    updatePseudo(state, newPseudo) {
      state.user.pseudo = newPseudo;
    },
    updateProfilPic(state, newProfilPic) {
      state.user.profilPic = newProfilPic;
    }
  },
  actions: {},
  plugins: [createPersistedState()],
})
