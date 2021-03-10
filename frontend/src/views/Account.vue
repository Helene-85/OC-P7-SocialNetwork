<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-900"
  >
    <div class="w-9/12 relative mt-4 my-24 overflow-hidden">
      <div class="top h-64 w-full bg-gray-900 overflow-hidden relative">
        <div
          class="flex flex-col justify-center items-center relative h-full text-white"
        >
          <avatar class="h-24 w-24 mb-4 object-cover rounded-full object-cover" :user = "user"/>
          <h1 class="text-2xl text-green-500 font-semibold uppercase"> {{ user.pseudo }} </h1>
        
        </div>
      </div>
      <div class="flex justify-center bg-gray-900">
        <div class="col-span-12 h-full pb-12 md:col-span-10">
          <div class="px-4 pt-4">
            <form @submit.prevent="sendImage" class="flex flex-col space-y-8">
              <div class="flex ml-auto">
                <input
                class="mt-2"
                type="file"
                accept="image/*" 
                @change="uploadImage($event)"
                id="file-input"
                ref="fileInput"/>
              </div>
              <div>
                <h3 class="text-2xl text-white font-semibold">
                  Mes informations
                </h3>
                <hr class="mt-2 border-green-500" />
              </div>
              <div class="form-item">
                <label class="text-xl text-white">Pseudonyme : <span class="text-green-500">{{ user.pseudo }}</span></label>
                <input
                  v-model="newPseudo"
                  class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-green-400"
                  id="pseudo"
                  type="text"
                  placeholder="Nouveau pseudo"
                />
              </div>
                <button
                  @click="sendNewPseudo()"
                  type="submit"
                  class="flex mt-5 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-green-700 hover:bg-green-900 rounded py-2 w-full transition duration-150 ease-in"
                >
                  <span class="mr-2 uppercase">Modifier mon pseudo</span>
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue';
import http from '../http';
import {mapState} from 'vuex';

export default {
  components: { Avatar },
  name: 'Account',
  data() {
    return {
      newPseudo: '',
      newImage: null
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    uploadImage(event) {
      this.newImage = event.target.files[0]
    },
    sendImage(){

    },
    sendNewPseudo() {
      let formData = new FormData();
      //formData.append('profilPic', this.newImage, this.newImage.name)
      formData.append('pseudo', this.newPseudo);
      formData.append('user_id', this.user.id);
      http
      .put('/auth/profile/' + this.user.id, formData)
        .then((res) => {
          console.log(res)
        })
        .catch(() => console.log('Mise à jour impossible'));
      }
    }
  }

</script>

<style scoped></style>
