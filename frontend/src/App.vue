<template>
  <div class="bg-gray-900" id="app">
    <header-top 
    :is-connected="isConnected"
    ></header-top>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    'header-top': Header
  },
  mounted() {
    this.check();
  },
  methods: {
    check() {
      if (this.user.id == 0 &&
      this.$router.currentRoute.path != '/') {
      this.$router.push('/');
      }
    }
  },
  computed: {
    ...mapState(['user']),

    isConnected() {
      return (this.user.id > 0);
    }
  }
}
</script>

<style></style>
