<template>
  <div class="container mx-auto max-w-sm flex flex-col space-y-4 justify-center items-center">
    <div class="bg-white w-full flex items-center p-2 rounded-xl shadow border">
      <avatar :user = "user"/>
      <div class="flex-grow p-3">
        <div class="font-semibold text-gray-700">
          {{ user.pseudo }} 
        </div>
        <div class="text-sm text-gray-500">
          {{ role }}
        </div>
        <a
          @click="deleteOneUser"
          v-if="isTheAdmin"
          href="#" class="text-green-700 hover:text-green-700"
          >Supprimer</a>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../http';
import Avatar from '@/components/Avatar.vue'

export default {
  name: 'user',
  props: ['user'],
   components: {
    'avatar': Avatar
  },
  computed: {
  isTheAdmin() {
    if(sessionStorage.getItem('isAdmin') == 1) {
      return true;
    }
    return false
  },
  avatar() {
    if (this.user.profilPic) {
      return 'http://localhost:3000/images/' + this.user.profilPic
    }
    return '/profile_pic.png'
  },
  role() {
    if (this.user.isAdmin) {
      return 'Administrateur'
    }
    return 'Membre'
    }
  },
  methods: {
    deleteOneUser() {
      http
        .delete("/auth/users/" + this.user.id)
        .then((res) => {
          this.$emit('deleted', this.user.id)
          console.log(res)
        }) 
        .catch(() => console.log('Impossible de suprimer le user'));
    }
  }
}
</script>

<style scoped></style>
