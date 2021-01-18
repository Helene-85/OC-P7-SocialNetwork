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
  computed: {
  isConnected() {
    if(sessionStorage.getItem('token')) {
      return true;
    }
    return false
    }
  }
}
</script>

<style></style>
