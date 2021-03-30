<template>
    <div>
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
</template>

<script>
import http from '../http';
import Avatar from './Avatar.vue';

export default {
    components: { Avatar },
    name: 'newComment',
    props: { 
        commentaire : {
            type: Object
        }
    },
    data() {
    return {
      commentInput: '',
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