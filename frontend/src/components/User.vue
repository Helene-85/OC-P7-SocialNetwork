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
          v-if="this.user.isAdmin"
          @click="deactivateOneUser"
          href="#" class="text-green-700 hover:text-green-700"
          aria-label="Désactiver l'utilisateur">
          Désactiver
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../http';
import Avatar from '@/components/Avatar.vue'
import { mapState } from 'vuex';

export default {
  name: 'user',
  components: { Avatar },
  props: {
    member: {
      type: Object
    }
  },
  computed: {
    ...mapState(['user']),
    role() {
      if (this.member.isAdmin) {
        return 'Administrateur'
      }
      return 'Membre'
    }
  },
  methods: {
    deactivateOneUser() {
      http
      .delete("/auth/users/" + this.member.id)
      .then((res) => {
        this.$emit('refresh')
      }) 
      .catch(() => console.log('Impossible de suprimer le user'));
    }
  }
}
</script>