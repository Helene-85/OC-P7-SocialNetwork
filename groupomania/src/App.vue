<template>
  <div class="bg-gray-900" id="app">
    <header-top></header-top>
    <button @click="test">TEST</button>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header'
import axios from 'axios'

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
  methods: {
    test() {
      axios.get('http://localhost:3000/api/auth/signup').then(res =>{
      alert('FORMIDABLE!')
      console.log(res);
      })
    }
  }
}
</script>

<style></style>
