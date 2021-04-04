<template>
  <div class="w-full">
    <div class="mx-auto px-4 py-8 max-w-xl mt-5 w-full">
      <div class="bg-white rounded-lg tracking-wide">
        <div class="px-4 py-2 mt-2">
          <div class="author flex items-center -ml-3 my-3">
            <avatar class="w-12 h-12 object-cover rounded-full mx-4 object-cover shadow" :user = "user"/>
            <h2 class="text-sm tracking-tighter text-gray-900">
              <a class="text-gray-900 uppercase" href="/profile/:id">{{ user.pseudo }}</a>
            </h2>
          </div>
          <form class="w-full max-w-xl bg-white rounded-lg px-4 py-1">
            <div class="w-full md:w-full px-3 mb-3 mt-3">
              <textarea
                class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                name="body"
                placeholder="Écrivez votre message"
                v-model="content"
                required
                aria-label="Écrivez un message">
              </textarea>
            </div>
            <div class="flex items-center mb-6 -mt-4 mr-3">
              <div class="flex ml-auto">
                <input
                class="mt-2"
                type="file"
                accept="image/*" 
                @change="uploadImage($event)"
                id="file-input"
                ref="fileInput"
                aria-label="Ajouter une image">
              </div>
            </div>
            <div class="w-full md:w-full flex items-start md:w-full px-3 mb-2">
              <button
                type="button"
                aria-label="Poster le message"
                @click.prevent="postMessage"
                class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-green-700 hover:bg-green-900 rounded py-2 w-full transition duration-150 ease-in">
                <span class="mr-2 uppercase">Envoyer</span>
                <span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../http';
import Avatar from '@/components/Avatar.vue';
import {mapState} from 'vuex';

export default {
  components: { Avatar },
  name: 'NewMessage',
   data() {
    return {
      content: '',
      file: ''
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    postMessage() {
      if(this.file) {
        const formData = new FormData();
        formData.append('content', this.content);
        formData.append('user_id', this.user.id);
        formData.append('file', this.file, this.file.name);

        http
        .post('/messages/', formData)
        .then(res => {
        this.$emit('added', res.data)
        this.content = ''
        this.file = ''
        })
        .catch(() => {
          console.log('Impossible de poster le message');
          alert('Impossible de poster le message :/')
        })
      }  else {
        const payload = {
          content: this.content,
          user_id: this.user.id
        }
        http     
        .post('/messages/', payload)
        .then(res => {
          this.$emit('added', res.data)
          this.content = ''
        })
        .catch(() => {
          console.log('Impossible de poster le message');
          alert('Impossible de poster le message :/')
        })
      } 
    },
    uploadImage(e) {
      this.file = e.target.files[0];
    }
  }
}
</script>