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
          <avatar class="h-10 w-10 object-cover rounded-full m-1" :user = "item"/>
          <p class="text-sm tracking-tighter text-gray-900">
            <p class="text-green-700 ml-1 mr-8"></span> {{ item.pseudo }}</p>
            <span class="text-gray-600 text-sm font-light">{{ item.createdAt | moment("dddd, MMMM Do YYYY") }}</span>
          </p>
        </div>
        <p class="mt-4 text-m text-gray-700 px-2 mr-1">
          {{ item.content }}
        </p>
        <div class="flex ml-3 mt-4 mb-4 space-x-3">
          <a href="#"
            @click.prevent="addReaction(1)"
            ><span><i class="far fa-thumbs-up  text-green-700"></i>{{ item.nbReaction_1 }}</span></a
          >
          <a href="#"
            @click.prevent="addReaction(2)"
            ><span><i class="far fa-thumbs-down text-red-600"></i>{{ item.nbReaction_2 }}</span></a
          >
        </div>
        <comment
          v-for="commentaire in item.tabComments"
          :key="commentaire.comment_id"
          :commentaire="commentaire"
          @refresh="refresh"
          class="py-2 relative">
        </comment>
        <newComment
          :message_id="item.id"
          @added="refresh"
        ></newComment>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../http';
import Avatar from './Avatar.vue';
import { mapState } from 'vuex';
import Comment from './Comment.vue';
import NewComment from './NewComment.vue';

export default {
  components: { Avatar, Comment, NewComment },
  name: 'message',
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {}
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
    refresh( ) {
      this.$emit('refresh');
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
          this.refresh();
        })
    },
    deleteMessage() {
      http
        .delete(`/messages/${this.item.id}`)
        .then(res => {
          console.log(res)
          this.refresh();
      })
    }
  }
}
</script>

<style scoped></style>
