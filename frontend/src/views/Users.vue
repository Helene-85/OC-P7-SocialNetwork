<template>
  <div
    :is-admin="this.user.isAdmin"
    class="min-h-screen pb-20 -mb-20 bg-gray-900 m-6 flex flex-col">
    <h1 class="mt-12 text-2xl text-center text-white">
    Découvrez les membres de <span class="uppercase text-green-500">Groupo'link</span>
    </h1>
    <div 
      v-for="user of users"
      :key="user.id"
      class="-my-2 mt-12 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <user :member="user" @refresh="refresh"></user>
    </div>
  </div>
</template>

<script>
import User from '@/components/User.vue'
import http from '../http'

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
  mounted() {
    this.refresh();
  },
  data() {
    return {
    user: "",
    users: [],
    }
  },
  methods: {
    refresh() {
      http
      .get('/auth/users')
      .then((res) => {
        this.users = res.data
      })
      .catch(() => {
        console.log('Impossible d\'afficher les users');
      })
    }
  }
}
</script>