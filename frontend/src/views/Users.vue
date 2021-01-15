<template>
  <div class="min-h-screen bg-gray-900 m-6 flex flex-col">
    <h1 class="mt-12 text-2xl  text-center text-white">
    Découvrez les membres de <span class="uppercase text-green-500">Groupo'link</span>
    </h1>
    <user v-for="user in users" :key="user.id"></user>
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
    pseudo: '',
    email: '',
    profilPic: '',
    isAdmin: ''
    }
  },
  created() {
    const user = {
      pseudo: this.pseudo,
      email: this.email,
      profilPic: this.profilPic,
      isAdmin: this.isAdmin
    }
      axios
        .get('http://localhost:3000/api/auth/user', user)
        .then(res => {
          (this.users = res.data.users)
        })
        .catch(() => {
          console.log('Impossible d\'afficher les users')
        })
    }
}


</script>

<style scoped></style>