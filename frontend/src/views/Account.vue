<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-900"
  >
    <div class="w-9/12 relative mt-4 my-24 overflow-hidden">
      <div class="top h-64 w-full bg-gray-900 overflow-hidden relative">
        <div
          class="flex flex-col justify-center items-center relative h-full text-white"
        >
          <img
            :src="avatar"
            alt="avatar"
            class="h-24 w-24 mb-4 object-cover rounded-full object-cover"
          />
          <h1 class="text-2xl text-green-500 font-semibold uppercase"> {{ pseudo }} </h1>
          <div class="flex items-center mb-6 -mt-4 mr-3">
              <div class="flex ml-auto">
                <input
                style="display: none"
                class="mt-2"
                type="file" 
                @change=""
                ref="fileInput">
                <button 
                class="flex items-center justify-center mt-6 px-8 focus:outline-none text-white text-sm sm:text-base bg-gray-900 hover:bg-green-500 hover:text-white rounded w-full transition duration-250 ease-in"
                @click="$refs.fileInput.click()">Modifier ma photo
                </button>
              </div>
            </div>
        </div>
      </div>
      <div class="flex justify-center bg-gray-900">
        <div class="col-span-12 h-full pb-12 md:col-span-10">
          <div class="px-4 pt-4">
            <form enctype="multipart/form-data" action="#" class="flex flex-col space-y-8">
              <div>
                <h3 class="text-2xl text-white font-semibold">
                  Mes informations
                </h3>
                <hr class="mt-2 border-green-500" />
              </div>
              <div class="form-item">
                <label class="text-xl text-white">Pseudonyme : <span class="text-green-500">{{ pseudo }}</span></label>
                <input
                  class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-green-400"
                  id="pseudo"
                  type="text"
                  placeholder="Nouveau pseudo"
                />
                <p class="inline-block text-sm text-green-500 align-baseline">
                  Modifier mon pseudo
                </p>
              </div>
            </form>
          </div>
          <div class="m-4 flex justify-center">
            <button
              @click="update()"
              class="flex mt-5 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-green-700 hover:bg-green-900 rounded py-2 w-full transition duration-150 ease-in"
            >
              <span class="mr-2 uppercase">Modifier mon compte</span>
            </button>
          </div>
          <div class="flex justify-center">
          <a
            class="text-sm text-white hover:text-green-300"
            href="./index.html"
          >
            Supprimer mon compte</a
          >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../http'

export default {
  name: 'Account',
  data() {
    return {
      userId: '',
      profilPic: '',
      pseudo: '',
      email: '',
      token: null,
    }
  },
   created() {
    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('userId');
    this.pseudo = sessionStorage.getItem('pseudo');
    this.profilPic = sessionStorage.getItem('profilPic');
    this.email = sessionStorage.getItem('email');
  },
  computed: {
    avatar() {
    if (this.profilPic) {
      return 'http://localhost:3000/images/' + this.profilPic
    }
    return 'profile_pic.png'
    }
  },
  methods: {
    deleteOneUser(user) {
      http
        .delete("/auth/users/" + user.id)
        .then((res) => console.log(res))
        .catch(() => console.log('Impossible de suprimer le user'));
        sessionStorage.clear();
        this.$router.push("/signup");
    },
    update() {
      http
      .put('/auth/profile/' + this.userId, {
        pseudo: this.pseudo
        })
        .then((res) => {
          console.log(res)
        })
        .catch(() => console.log('Mise à jour impossible'));
      }
    }
  }

</script>

<style scoped></style>
