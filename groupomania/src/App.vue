<template>
  <div class="bg-gray-900" id="app">
    <header-top></header-top>
    <button @click="test">TEST</button>
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
  data() {
    return {
      message: 'abdc'
    }
  },
}
</script>

<style></style>
