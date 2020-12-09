<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <login></login>
    </div>
</template>

<script>
import Login from './Login'

export default {
    name: 'home',
      components: {
    'login' : Login,
  }
}
</script>

<style scoped>

</style>