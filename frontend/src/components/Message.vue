<template>
  <div class="mx-auto px-4 py-8 max-w-xl my-2">
    <div class="bg-white rounded-lg mb-6 relative tracking-wide">
       <a 
        v-if="isTheAdmin" 
        class="text-red-600 absolute top-2 right-3" 
        href="#"
        @click.prevent="deleteMessage()"
        ><i class="fas fa-times"></i>
        </a>
      <div class="md:flex-shrink-0">
        <img v-if="(item.image != null)"
          :src="item.image"
          alt="image"
          class="w-full h-64 rounded-lg rounded-b-none object-cover"
        />
      </div>
      <div class="px-4 py-2 mt-2">
        <div class="author flex items-center -ml-3 my-3">
          <avatar class="h-10 w-10 object-cover rounded-full m-1" :user = "user"/>
          <p class="text-sm tracking-tighter text-gray-900">
            <a class="text-green-700 mr-2" href="/profile/:id"><span class="text-gray-900"></span> {{ item.pseudo }}</a>
            <span class="text-gray-600">{{ item.createdAt | moment("dddd, MMMM Do YYYY") }}</span>
          </p>
        </div>
        <p class="mt-4 text-m text-gray-700 px-2 mr-1">
          {{ item.content }}
        </p>
        <div class="flex ml-3 mt-4 mb-4 space-x-3">
          <a href="#"
            @click.prevent="addReaction(1)"
            ><span><i class="far fa-thumbs-up  text-green-700"></i></span></a
          >
          <a href="#"
            @click.prevent="addReaction(2)"
            ><span><i class="far fa-thumbs-down text-red-600"></i></span></a
          >
        </div>
        <div
          v-for="commentaire in item.tabComments"
          :key="commentaire.comment_id"
          class="py-2 relative">
            <p class="text-green-700">{{ commentaire.comment_pseudo }}</p>
            <p class="w-full md:w-full flex items-start md:w-full px-3 rounded py-2 bg-gray-100">{{ commentaire.comment_content }}</p>
            <a 
              v-if="isTheAdmin" 
              class="text-red-600 absolute top-10 right-2" 
              href="#"
              @click.prevent="deleteComment(commentaire.comment_id)"
              ><i class="fas fa-times"></i>
            </a>
        </div>
        <form class="w-full max-w-xl bg-white rounded-lg px-4">
          <div class="w-full md:w-full px-3 mb-2 mt-2">
            <textarea
              v-model="commentInput"
              class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
              name="body"
              placeholder="Écrivez un commentaire"
              required
            ></textarea>
          </div>
          <div class="w-full md:w-full flex items-start md:w-full px-3 mb-2">
            <button
              @click="postComment"
              type="button"
              class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-green-700 hover:bg-green-900 rounded py-2 w-full transition duration-150 ease-in"
            >
              <span class="mr-2 uppercase">Envoyer</span>
              <span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import http from '../http';
import Avatar from './Avatar.vue';

export default {
  components: { Avatar },
  name: 'message',
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      commentInput: '',
    }
  },
  computed: {
    ...mapState(['user']),
    isTheAdmin() {
      if(this.user.isAdmin) {
        return true;
      }
      return false
      }
  },
  methods: {
    postComment() {
      if(this.commentInput.trim() == '') {
        alert('Merci de remplir le champs commentaire')
        return
      }
      const payload = {
        commentInput: this.commentInput,
        user_id: this.user.id,
        message_id: this.item.id,
      }
      http     
        .post('/comments/', payload)
        .then(res => {
          this.$emit('added', res.data)
          this.commentInput = ''
        })
        .catch(() => {
          alert('Impossible de poster le message :/')
        })
    },
    addReaction(reactionId) {
      const payload = {
        user_id: this.user.id,
        message_id: this.item.id,
        reaction_id: reactionId
      }
      http
        .post(`/messages/${this.user.id}/reactions`, payload)
        .then(res => {
          console.log(res)
          this.$emit('refresh')
        })
    },
    deleteMessage() {
      http
        .delete(`/messages/${this.item.id}`)
        .then(res => {
          console.log(res)
          this.$emit('refresh')
      })
    },
    deleteComment(id) {
      http
        .delete(`/comments/${id}`)
        .then(res => {
          console.log(res)
          this.$emit('refresh')
      })
    }
  }
}
</script>

<style scoped></style>
