<template>
  <div class="min-h-screen bg-gray-900 m-6 flex flex-col">
    <h1 class="mt-12 text-2xl  text-center text-white">
    Découvrez les membres de <span class="uppercase text-green-500">Groupo'link</span>
    </h1>
    <user v-for="user of uers"></user>
  </div>
</template>

<script>
import User from '@/components/User.vue'
import axios from 'axios'

export default {
  name: 'users',
  components: {
    user: User
  },
   data() {
    return {
    user: "",
    users: [],
    }
  },
  created() {
    axios
      .get('http://localhost:3000/api/auth/users')
      .then((res) => {
        (this.users = res.data.users)
      })
      .catch(() => {
        console.log('Impossible d\'afficher les users')
      })
  }
}
</script>

<style scoped></style>