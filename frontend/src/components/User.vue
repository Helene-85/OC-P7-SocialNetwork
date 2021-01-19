<template>
    <div class="container mx-auto max-w-sm flex flex-col space-y-4 justify-center items-center">
       <div class="bg-white w-full flex items-center p-2 rounded-xl shadow border">
      <div class="flex items-center space-x-4">
        <img
					class="w-16 h-16 rounded-full"
            :src="profilPic"
            alt="profil-pic" 
            />
      </div>
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
            href="#" class="text-green-500 hover:text-green-700"
            >Supprimer</a
          >
      </div>
    </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'user',
  props: ['user'],
  computed: {
  isTheAdmin() {
    if(sessionStorage.getItem('isAdmin') == 1) {
      return true;
    }
    return false
  },
  profilPic() {
    if (this.user.profilPic) {
      return this.user.profilPic
    }
    return 'profile_pic.png'
  },
  role() {
    if (this.user.isAdmin) {
      return 'Administrateur'
    }
    return 'Membre'
    }
  },
  methods: {
      onFileSelected(event) {
      this.image = event.target.image[0]
    },
    deleteOneUser(user) {
      axios
        .delete("http://localhost:3000/api/auth/users/" + user.id)
        .then((res) => console.log(res))
        .catch(() => console.log('Impossible de suprimer le user'));
        localStorage.clear();
        this.$router.push("/signup");
    }
  }
}
</script>

<style scoped></style>
