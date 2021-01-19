<template>
  <div
    :is-admin="isAdmin"
    class="min-h-screen pb-20 bg-gray-900 m-6 flex flex-col">
    <h1 class="mt-12 text-2xl text-center text-white">
    Découvrez les membres de <span class="uppercase text-green-500">Groupo'link</span>
    </h1>
    <div 
      v-for="user of users"
      :key="user.id"
      class="-my-2 mt-12 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <user :user="user"></user>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import User from '@/components/User.vue'

export default {
  name: 'users',
  components: {
    'user': User
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    user: "",
    users: [],
    }
  },
  computed: {
    isTheAdmin() {
      if(sessionStorage.getItem('isAdmin') == 1) {
        return true;
      }
      return false
    },
  },
  created() {
    axios
      .get('http://localhost:3000/api/auth/users')
      .then((res) => {
        console.log(res.data)
        this.users = res.data
      })
      .catch(() => {
        console.log('Impossible d\'afficher les users')
      })
  }
}
</script>

<style scoped></style>