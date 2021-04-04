<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-900">
    <login></login>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'

export default {
  name: 'home',
  components: {
    login: Login
  }
}
</script>