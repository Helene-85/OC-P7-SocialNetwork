<template>
  <div class="container mx-auto max-w-sm flex flex-col space-y-4 justify-center items-center">
    <div class="bg-white w-full flex items-center p-2 rounded-xl shadow border">
      <avatar class="h-14 w-14 object-cover rounded-full" :user = "member"/>
      <div class="flex-grow p-3">
        <div class="font-semibold text-gray-700">
          {{ member.pseudo }} 
        </div>
        <div class="text-sm text-gray-500">
          {{ role }}
        </div>
        <a

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
import { mapState } from 'vuex';

export default {
  components: { Avatar },
  name: 'user',
  props: {
    member: {
      type: Object
    }
  },
  computed: {
  ...mapState(['user']),
  isTheAdmin() {
    if (this.user.isAdmin) {
      return true;
    }
    return false
  },
  role() {
    if (this.member.isAdmin) {
      return 'Administrateur'
    }
    return 'Membre'
    }
  },
  methods: {
/*     deleteOneUser() {
      http
        .delete("/auth/users/" + this.user.id)
        .then((res) => {
          this.$emit('deleted', this.user.id)
          console.log(res)
        }) 
        .catch(() => console.log('Impossible de suprimer le user'));
    } */
  }
}
</script>

<style scoped></style>
