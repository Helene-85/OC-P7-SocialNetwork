<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-900"
  >
    <login></login>
    <welcome></welcome>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Welcome from '@/components/Welcome.vue'

export default {
  name: 'home',
  components: {
    login: Login,
    welcome: Welcome
  }
}
</script>

<style scoped></style>
