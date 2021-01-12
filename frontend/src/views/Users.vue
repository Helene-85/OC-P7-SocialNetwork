<template>
  <div class="min-h-screen bg-gray-900 m-6 flex flex-col">
    <h1 class="mt-12 text-2xl  text-center text-white">
    Découvrez les membres de <span class="uppercase text-green-500">Groupo'link</span>
    </h1>
    <user></user>
  </div>
</template>

<script>
import User from '@/components/User.vue'
export default {
  name: 'users',
  components: {
    user: User
  }
}
</script>

<style scoped></style>
