<template>
  <div class="bg-gray-900" id="app">
    <header-top 
    :is-connected="isConnected"
    ></header-top>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    'header-top': Header
  },
/*    created() {
    this.userId = JSON.parse(sessionStorage.getItem('userId'));
    this.pseudo = sessionStorage.getItem('pseudo');
    this.profilPic = sessionStorage.getItem('profilPic');
    this.token = sessionStorage.getItem('token');
  },
  data() {
    return {
      userId: '',
      pseudo: '',
      profilPic: '',
      token: null,
    }
  }, */
  computed: {
    isConnected() {
    if(sessionStorage.getItem('token')) {
      return true;
    }
    return false
    },
    /* user() {
      return {
        userId: this.userId,
        profilPic : this.profilPic
      }
    } */
  }
}
</script>

<style></style>
